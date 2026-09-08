import type { Reading } from "@/lib/types";
import { demoReading } from "@/lib/mock-data";
import { createSupabaseBrowserClient } from "@/lib/supabase";
const STORE = "qdl.readings";
export function loadReadings(): Reading[] { if (typeof window === "undefined") return [demoReading]; const raw = localStorage.getItem(STORE); return raw ? JSON.parse(raw) : [demoReading]; }
export function saveReading(reading: Reading) { const readings = loadReadings().filter((item) => item.chartHash !== reading.chartHash); localStorage.setItem(STORE, JSON.stringify([reading, ...readings])); }
export function findReading(id: string) { return loadReadings().find((reading) => reading.id === id); }
export async function persistRemoteReading(reading: Reading) {
  const db = createSupabaseBrowserClient();
  if (!db || typeof window === "undefined" || process.env.NEXT_PUBLIC_CASTING_MODE !== "remote") return;
  const { data: persisted, error } = await db.from("readings").insert({ chart_hash: reading.chartHash, question: reading.request.question, question_type: reading.request.questionType, method: reading.request.method, cast_time: reading.request.castTime, location: reading.request.location, timezone: reading.request.timezone, longitude: reading.request.longitude ?? null, true_solar_time: reading.request.useTrueSolarTime, engine_name: reading.engine, engine_version: reading.chart.ruleset }).select("id").single();
  if (error || !persisted) return;
  const sourceResponse = reading.chart.kind === "qimen" ? reading.chart.raw ?? null : reading.chart.payload;
  await Promise.all([db.from("charts").insert({ reading_id: persisted.id, ruleset: reading.chart.ruleset, raw_summary: reading.chart.rawSummary, chart_json: reading.chart, source_response: sourceResponse }), db.from("interpretations").insert({ reading_id: persisted.id, overall: reading.interpretation.overall, core_judgment: reading.interpretation.coreJudgment, key_signals: reading.interpretation.keySignals, favorable_direction: reading.interpretation.favorableDirection, timing: reading.interpretation.timing, risks: reading.interpretation.risks, actions: reading.interpretation.actions, confidence: reading.interpretation.confidence, model_name: "pending-ai-integration", prompt_version: "v1" })]);
}

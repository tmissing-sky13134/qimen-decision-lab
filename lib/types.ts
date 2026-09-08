export type Method = "qimen" | "zhouyi" | "liuren" | "huican";
export type QuestionType = "career" | "wealth" | "relation" | "health" | "timing" | "decision" | "other";

export interface CastRequest { question: string; questionType: QuestionType; location: string; timezone: string; longitude?: number; castTime: string; useTrueSolarTime: boolean; method: Method; }
export interface QimenChartMeta { dun: "阳遁" | "阴遁" | null; yuan: "上元" | "中元" | "下元" | null; ju: number | null; xun: string | null; xunkong: string[]; zhifuStar: string | null; zhifuPalace: number | null; zhishiDoor: string | null; zhishiPalace: number | null; }
export interface QimenPalace { palace: number; name: string; direction: string; heavenStem: string | null; earthStem: string | null; star: string | null; starStrength: string | null; door: string | null; god: string | null; isEmpty: boolean; isHorse: boolean; isDoorPress: boolean; isStemTomb: boolean; marks: string[]; }
export interface QimenChart { kind: "qimen"; ruleset: string; chartMeta?: QimenChartMeta; palaces?: QimenPalace[]; rawSummary: string; raw?: Record<string, unknown>; }
export interface GenericChart { kind: Exclude<Method, "qimen">; ruleset: string; rawSummary: string; payload: Record<string, unknown>; }
export type Chart = QimenChart | GenericChart;
export function hasCompleteQimenGrid(chart: QimenChart): chart is QimenChart & { palaces: QimenPalace[] } { return chart.palaces?.length === 9 && new Set(chart.palaces.map((palace) => palace.palace)).size === 9 && chart.palaces.every((palace) => palace.palace >= 1 && palace.palace <= 9) ? true : false; }
export interface Interpretation { overall: string; coreJudgment: string; keySignals: { label: string; detail: string; tone: "favorable" | "caution" | "neutral" }[]; favorableDirection: string; timing: string; risks: string[]; actions: string[]; confidence: "Low" | "Moderate" | "High"; }
export interface Reading { id: string; chartHash: string; request: CastRequest; chart: Chart; interpretation: Interpretation; createdAt: string; engine: string; }
export interface Followup { id: string; readingId: string; question: string; answer: string; createdAt: string; }
export interface EngineComparison { field: string; engineA: string; engineB: string; status: "match" | "conflict"; }

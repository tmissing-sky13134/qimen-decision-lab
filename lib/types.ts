export type Method = "qimen" | "zhouyi" | "liuren" | "huican";
export type QuestionType = "career" | "wealth" | "relation" | "health" | "timing" | "decision" | "other";

export interface CastRequest { question: string; questionType: QuestionType; location: string; timezone: string; longitude?: number; castTime: string; useTrueSolarTime: boolean; method: Method; }
export interface Palace { number: number; name: string; direction: string; earthStem: string; skyStem: string; star: string | null; door: string | null; deity: string | null; void?: boolean; markers?: string[]; }
export interface QimenChart { kind: "qimen"; ruleset: string; dunType?: "阳遁" | "阴遁"; ju?: number; xunshou?: string; kongwang?: string[]; zhifu?: string; zhishi?: string; palaces?: Palace[]; rawSummary: string; raw?: Record<string, unknown>; }
export interface GenericChart { kind: Exclude<Method, "qimen">; ruleset: string; rawSummary: string; payload: Record<string, unknown>; }
export type Chart = QimenChart | GenericChart;
export interface Interpretation { overall: string; coreJudgment: string; keySignals: { label: string; detail: string; tone: "favorable" | "caution" | "neutral" }[]; favorableDirection: string; timing: string; risks: string[]; actions: string[]; confidence: "Low" | "Moderate" | "High"; }
export interface Reading { id: string; chartHash: string; request: CastRequest; chart: Chart; interpretation: Interpretation; createdAt: string; engine: string; }
export interface Followup { id: string; readingId: string; question: string; answer: string; createdAt: string; }
export interface EngineComparison { field: string; engineA: string; engineB: string; status: "match" | "conflict"; }

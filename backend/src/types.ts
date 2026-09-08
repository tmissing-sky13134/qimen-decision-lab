export const methods = ["qimen", "zhouyi", "liuren", "huican"] as const;
export type Method = (typeof methods)[number];
export type QuestionType = "decision" | "career" | "wealth" | "relation" | "health" | "timing" | "other";
export interface CastInput { question: string; questionType: QuestionType; datetime: string | null; timezone: string; city: string; longitude: number; trueSolar: boolean; }
export interface EngineRunResult { stdout: string; stderr: string; exitCode: number; }
export interface EngineRunner { run(binary: string, args: string[], timeoutMs: number): Promise<EngineRunResult>; }

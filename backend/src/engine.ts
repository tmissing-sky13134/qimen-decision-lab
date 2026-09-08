import { spawn } from "node:child_process";
import type { CastInput, EngineRunResult, EngineRunner, Method } from "./types.js";

export class EngineTimeoutError extends Error {}
export class SpawnEngineRunner implements EngineRunner {
  run(binary: string, args: string[], timeoutMs: number): Promise<EngineRunResult> {
    return new Promise((resolve, reject) => {
      const child = spawn(binary, args, { shell: false, windowsHide: true });
      let stdout = ""; let stderr = ""; let timedOut = false;
      const timer = setTimeout(() => { timedOut = true; child.kill("SIGTERM"); }, timeoutMs);
      child.stdout.on("data", (chunk: Buffer) => { stdout += chunk.toString(); });
      child.stderr.on("data", (chunk: Buffer) => { stderr += chunk.toString(); });
      child.on("error", (error) => { clearTimeout(timer); reject(error); });
      child.on("close", (exitCode) => { clearTimeout(timer); if (timedOut) reject(new EngineTimeoutError("Calculation engine timed out.")); else resolve({ stdout, stderr, exitCode: exitCode ?? 1 }); });
    });
  }
}

export function buildEngineArgs(method: Method, input: CastInput): string[] {
  const args = ["cast", "-m", method, "-q", input.question, "-t", input.questionType];
  if (input.datetime) args.push("--time", input.datetime);
  if (input.trueSolar) args.push("--lon", String(input.longitude)); else args.push("--no-truesolar");
  return args;
}

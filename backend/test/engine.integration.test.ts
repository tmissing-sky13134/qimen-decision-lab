import { describe, expect, it } from "vitest";
import { SpawnEngineRunner, buildEngineArgs } from "../src/engine.js";

const binary = process.env.ZHOUYI_BIN_PATH;
const runWhenBinaryAvailable = binary ? describe : describe.skip;

runWhenBinaryAvailable("zhouyi Linux engine integration", () => {
  it("honors UTF-8 question text and the explicit RFC3339 --time instant", async () => {
    const requested = "2026-09-09T05:02:00+08:00";
    const question = "测试线上奇门排盘是否正常";
    const result = await new SpawnEngineRunner().run(binary!, buildEngineArgs("qimen", { question, questionType: "decision", datetime: requested, timezone: "Asia/Kuala_Lumpur", city: "Kuala Lumpur", longitude: 101.6869, trueSolar: true }), 15_000);
    expect(result.exitCode).toBe(0);
    const output = JSON.parse(result.stdout) as { ok: boolean; question?: string; time?: string };
    expect(output.ok).toBe(true);
    expect(output.question).toBe(question);
    expect(output.time).toBeDefined();
    expect(new Date(output.time!).getTime()).toBe(new Date(requested).getTime());
  });
});

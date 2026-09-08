import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { normalizeQimenEngineResult, parseQimenPrompt } from "../../lib/qimen-normalizer.ts";
import { hasCompleteQimenGrid, type QimenChart } from "../../lib/types.ts";

const fixture = JSON.parse(readFileSync(new URL("../../railway-qimen-response.json", import.meta.url), "utf8").replace(/^\uFEFF/, "")) as {
  raw: { engineResult: unknown };
};

describe("Railway qimen prompt normalizer", () => {
  it("normalizes the observed engineResult prompt into exactly nine source-backed palaces", () => {
    const chart = normalizeQimenEngineResult(fixture.raw.engineResult);

    expect(chart.chartMeta).toMatchObject({
      dun: "阴遁",
      yuan: "中元",
      ju: 3,
      xun: "甲申",
      xunkong: ["午", "未"],
      zhifuStar: "天蓬",
      zhifuPalace: 1,
      zhishiDoor: "休门",
      zhishiPalace: 3
    });
    expect(chart.palaces).toHaveLength(9);
    expect(chart.palaces?.find((palace) => palace.palace === 1)).toMatchObject({ name: "坎一宫", earthStem: "庚", heavenStem: "庚", star: "天蓬", door: "伤门", god: "值符" });
    expect(chart.palaces?.find((palace) => palace.palace === 3)?.door).toBe("休门");
    expect(chart.palaces?.find((palace) => palace.palace === 2)).toMatchObject({ isEmpty: true, isHorse: true });
    expect(chart.palaces?.find((palace) => palace.palace === 6)).toMatchObject({ isDoorPress: true, isStemTomb: true });
    expect(chart.palaces?.map((palace) => palace.palace).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const qimen: QimenChart = { kind: "qimen", ruleset: "zhouyi-divination", rawSummary: "fixture", ...chart };
    expect(hasCompleteQimenGrid(qimen)).toBe(true);
    expect(qimen.palaces?.find((palace) => palace.palace === 5)).toMatchObject({ door: null, god: null, star: "天禽" });
  });

  it("does not create a grid when the required nine-palace table is absent", () => {
    expect(parseQimenPrompt("## 九宫逐格详情\n| 宫位 | 地干 |\n|---|---|\n| 坎一宫 | 庚 |").palaces).toBeUndefined();
  });

  it("does not treat an incomplete palace collection as a renderable grid", () => {
    const incomplete: QimenChart = { kind: "qimen", ruleset: "test", rawSummary: "test", palaces: [{ palace: 5, name: "中五宫", direction: "中宫", heavenStem: null, earthStem: "丙", star: null, starStrength: null, door: null, god: null, isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: [] }] };
    expect(hasCompleteQimenGrid(incomplete)).toBe(false);
  });
});

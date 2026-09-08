import type { Chart, Interpretation, Palace, Reading } from "@/lib/types";

const palaceData: Palace[] = [
  { number: 4, name: "巽", direction: "东南", earthStem: "辛", skyStem: "乙", star: "天辅", door: "杜门", deity: "六合", markers: ["文书"] },
  { number: 9, name: "离", direction: "正南", earthStem: "丙", skyStem: "己", star: "天英", door: "景门", deity: "朱雀", markers: ["显名"] },
  { number: 2, name: "坤", direction: "西南", earthStem: "壬", skyStem: "庚", star: "天芮", door: "死门", deity: "白虎", void: true },
  { number: 3, name: "震", direction: "正东", earthStem: "癸", skyStem: "丙", star: "天冲", door: "伤门", deity: "玄武", markers: ["驿马"] },
  { number: 5, name: "中", direction: "中宫", earthStem: "戊", skyStem: "戊", star: "天禽", door: null, deity: null, markers: ["寄坤"] },
  { number: 7, name: "兑", direction: "正西", earthStem: "丁", skyStem: "辛", star: "天柱", door: "惊门", deity: "九地" },
  { number: 8, name: "艮", direction: "东北", earthStem: "己", skyStem: "壬", star: "天任", door: "生门", deity: "九天", markers: ["值符"] },
  { number: 1, name: "坎", direction: "正北", earthStem: "庚", skyStem: "癸", star: "天蓬", door: "休门", deity: "螣蛇", markers: ["值使"] },
  { number: 6, name: "乾", direction: "西北", earthStem: "乙", skyStem: "丁", star: "天心", door: "开门", deity: "太阴" }
];

export const sampleInterpretation: Interpretation = { overall: "盘面更支持稳步推进：先把关键信息落实清楚，再进行直接而坦诚的沟通，会更容易打开局面。", coreJudgment: "可以推进，但下一步宜小而可逆。当前最有利的是准备与试探性接触，而非仓促做出重大承诺。", keySignals: [{ label: "生门 · 艮八宫", detail: "生长之气落在务实行动中，适合先打基础、补细节。", tone: "favorable" }, { label: "开门 · 乾六宫", detail: "通过资深人士、正式渠道或清晰表达，可获得有用的开口。", tone: "favorable" }, { label: "坤二宫空亡", detail: "对尚未写清的承诺与模糊信息，需要保留判断。", tone: "caution" }], favorableDirection: "东北方利于调研与务实准备；西北方利于关键沟通或正式提出请求。", timing: "未来 7–14 天适合收集信息并进行首次沟通；收到明确反馈后再复盘判断。", risks: ["在细节尚未确认前，将口头承诺当成正式结论。", "被紧迫感推动，在信息不足时做不可逆决定。"], actions: ["在下次沟通前，先写下自己的决策标准。", "提出一个直接的问题，确认范围、责任或时间安排。", "选择可回转的第一步，并为复盘设定日期。"], confidence: "Moderate" };

export const sampleChart: Chart = { kind: "qimen", ruleset: "mainline-cn-v1", dunType: "阳遁", ju: 6, xunshou: "甲子戊", kongwang: ["寅", "卯"], zhifu: "天任 · 艮八宫", zhishi: "休门 · 坎一宫", palaces: palaceData, rawSummary: "阳遁六局 · 甲子戊旬 · 旬空寅卯 · 值符天任落艮八宫 · 值使休门落坎一宫" };
export const demoReading: Reading = { id: "demo-reading", chartHash: "qdl_demo483", request: { question: "这份合作方案是否适合继续推进？", questionType: "decision", location: "马来西亚·吉隆坡", timezone: "Asia/Kuala_Lumpur", longitude: 101.6869, castTime: "2026-09-09T10:30:00+08:00", useTrueSolarTime: false, method: "qimen" }, chart: sampleChart, interpretation: sampleInterpretation, createdAt: "2026-09-09T10:31:00+08:00", engine: "模拟奇门排盘引擎 · mainline-cn-v1" };

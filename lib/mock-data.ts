import type { Chart, Interpretation, QimenPalace, Reading } from "@/lib/types";

const palaceData: QimenPalace[] = [
  { palace: 4, name: "巽四宫", direction: "东南", earthStem: "辛", heavenStem: "乙", star: "天辅", starStrength: null, door: "杜门", god: "六合", isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: ["文书"] },
  { palace: 9, name: "离九宫", direction: "正南", earthStem: "丙", heavenStem: "己", star: "天英", starStrength: null, door: "景门", god: "朱雀", isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: ["显名"] },
  { palace: 2, name: "坤二宫", direction: "西南", earthStem: "壬", heavenStem: "庚", star: "天芮", starStrength: null, door: "死门", god: "白虎", isEmpty: true, isHorse: false, isDoorPress: false, isStemTomb: false, marks: [] },
  { palace: 3, name: "震三宫", direction: "正东", earthStem: "癸", heavenStem: "丙", star: "天冲", starStrength: null, door: "伤门", god: "玄武", isEmpty: false, isHorse: true, isDoorPress: false, isStemTomb: false, marks: [] },
  { palace: 5, name: "中五宫", direction: "中宫", earthStem: "戊", heavenStem: "戊", star: "天禽", starStrength: null, door: null, god: null, isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: ["寄坤"] },
  { palace: 7, name: "兑七宫", direction: "正西", earthStem: "丁", heavenStem: "辛", star: "天柱", starStrength: null, door: "惊门", god: "九地", isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: [] },
  { palace: 8, name: "艮八宫", direction: "东北", earthStem: "己", heavenStem: "壬", star: "天任", starStrength: null, door: "生门", god: "九天", isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: ["值符"] },
  { palace: 1, name: "坎一宫", direction: "正北", earthStem: "庚", heavenStem: "癸", star: "天蓬", starStrength: null, door: "休门", god: "螣蛇", isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: ["值使"] },
  { palace: 6, name: "乾六宫", direction: "西北", earthStem: "乙", heavenStem: "丁", star: "天心", starStrength: null, door: "开门", god: "太阴", isEmpty: false, isHorse: false, isDoorPress: false, isStemTomb: false, marks: [] }
];

export const sampleInterpretation: Interpretation = { overall: "盘面更支持稳步推进：先把关键信息落实清楚，再进行直接而坦诚的沟通，会更容易打开局面。", coreJudgment: "可以推进，但下一步宜小而可逆。当前最有利的是准备与试探性接触，而非仓促做出重大承诺。", keySignals: [{ label: "生门 · 艮八宫", detail: "生长之气落在务实行动中，适合先打基础、补细节。", tone: "favorable" }, { label: "开门 · 乾六宫", detail: "通过资深人士、正式渠道或清晰表达，可获得有用的开口。", tone: "favorable" }, { label: "坤二宫空亡", detail: "对尚未写清的承诺与模糊信息，需要保留判断。", tone: "caution" }], favorableDirection: "东北方利于调研与务实准备；西北方利于关键沟通或正式提出请求。", timing: "未来 7–14 天适合收集信息并进行首次沟通；收到明确反馈后再复盘判断。", risks: ["在细节尚未确认前，将口头承诺当成正式结论。", "被紧迫感推动，在信息不足时做不可逆决定。"], actions: ["在下次沟通前，先写下自己的决策标准。", "提出一个直接的问题，确认范围、责任或时间安排。", "选择可回转的第一步，并为复盘设定日期。"], confidence: "Moderate" };

export const sampleChart: Chart = { kind: "qimen", ruleset: "mainline-cn-v1", chartMeta: { dun: "阳遁", yuan: null, ju: 6, xun: "甲子戊", xunkong: ["寅", "卯"], zhifuStar: "天任", zhifuPalace: 8, zhishiDoor: "休门", zhishiPalace: 1 }, palaces: palaceData, rawSummary: "阳遁六局 · 甲子戊旬 · 旬空寅卯 · 值符天任落艮八宫 · 值使休门落坎一宫" };
export const demoReading: Reading = { id: "demo-reading", chartHash: "qdl_demo483", request: { question: "这份合作方案是否适合继续推进？", questionType: "decision", location: "马来西亚·吉隆坡", timezone: "Asia/Kuala_Lumpur", longitude: 101.6869, castTime: "2026-09-09T10:30:00+08:00", useTrueSolarTime: false, method: "qimen" }, chart: sampleChart, interpretation: sampleInterpretation, createdAt: "2026-09-09T10:31:00+08:00", engine: "模拟奇门排盘引擎 · mainline-cn-v1" };

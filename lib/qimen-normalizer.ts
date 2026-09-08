import type { QimenChartMeta, QimenPalace } from "./types";

type UnknownRecord = Record<string, unknown>;

export interface NormalizedQimenFields {
  chartMeta?: QimenChartMeta;
  palaces?: QimenPalace[];
}

const palaceNumbers: Record<string, number> = { 坎: 1, 坤: 2, 震: 3, 巽: 4, 中: 5, 乾: 6, 兑: 7, 艮: 8, 离: 9 };
const directions: Record<string, string> = { 坎: "正北", 坤: "西南", 震: "正东", 巽: "东南", 中: "中宫", 乾: "西北", 兑: "正西", 艮: "东北", 离: "正南" };
const palaceCell = /^(坎|坤|震|巽|中|乾|兑|艮|离)[一二三四五六七八九]宫$/;

function asRecord(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : null;
}

function valueOrNull(value: string): string | null {
  const normalized = value.trim();
  return normalized === "—" || normalized === "-" ? null : normalized;
}

function starName(value: string): string | null {
  const raw = valueOrNull(value);
  return raw ? raw.replace(/\([^)]*\)/g, "").trim() : null;
}

function parseMarkers(value: string): Pick<QimenPalace, "isEmpty" | "isHorse" | "isStemTomb" | "marks"> {
  const tokens = value.split("/").map((token) => token.trim()).filter((token) => token && token !== "—");
  const isEmpty = tokens.some((token) => token === "空" || token === "空亡");
  const isHorse = tokens.some((token) => token === "马" || token === "驿马");
  const isStemTomb = tokens.some((token) => token === "天干墓" || token === "地干墓" || token === "入墓");
  const marks = tokens.filter((token) => !["空", "空亡", "马", "驿马", "天干墓", "地干墓", "入墓"].includes(token));
  return { isEmpty, isHorse, isStemTomb, marks };
}

function palaceFromLabel(value: string): number | null { const match = value.match(/(坎|坤|震|巽|中|乾|兑|艮|离)[一二三四五六七八九]宫/); return match ? palaceNumbers[match[1]] : null; }

/**
 * Parses only the stable, machine-produced Markdown table in the Railway engine's
 * `prompt`. The current engine response has no structured palace array. Returning
 * undefined is intentional when the complete nine-palace table is not present.
 */
export function parseQimenPrompt(prompt: string): NormalizedQimenFields {
  const meta: QimenChartMeta = { dun: null, yuan: null, ju: null, xun: null, xunkong: [], zhifuStar: null, zhifuPalace: null, zhishiDoor: null, zhishiPalace: null };
  const result: NormalizedQimenFields = { chartMeta: meta };
  const dun = prompt.match(/^- 阴阳遁：\s*(阳遁|阴遁)\s*·[^\n]*?第\s*(\d+)\s*局/m);
  if (dun) { meta.dun = dun[1] as "阳遁" | "阴遁"; meta.ju = Number(dun[2]); const yuan = dun[0].match(/·\s*(上元|中元|下元)\s*·/); meta.yuan = (yuan?.[1] as QimenChartMeta["yuan"]) ?? null; }

  const xunshou = prompt.match(/^- 时柱旬首：\s*([^\s（(]+)/m);
  if (xunshou) meta.xun = xunshou[1];

  const kongwang = prompt.match(/^- 旬空：\s*([^\n]+)/m);
  if (kongwang) {
    const branches = kongwang[1].split(/[、，,\s]+/).map((branch) => branch.trim()).filter(Boolean);
    if (branches.length) meta.xunkong = branches;
  }

  const zhifu = prompt.match(/^- 值符星：\s*\*\*([^*]+)\*\*\s*落\s*\*\*([^*]+)\*\*/m);
  if (zhifu) { meta.zhifuStar = zhifu[1].trim(); meta.zhifuPalace = palaceFromLabel(zhifu[2]); }

  const zhishi = prompt.match(/^- 值使门：\s*\*\*([^*]+)\*\*\s*落\s*\*\*([^*]+)\*\*/m);
  if (zhishi) { meta.zhishiDoor = zhishi[1].trim(); meta.zhishiPalace = palaceFromLabel(zhishi[2]); }

  const section = prompt.match(/## 九宫逐格详情[^\n]*\n([\s\S]*?)(?=\n##\s|$)/);
  if (!section) return result;

  const palaces: QimenPalace[] = [];
  for (const line of section[1].split(/\r?\n/)) {
    if (!line.startsWith("|")) continue;
    const columns = line.split("|").slice(1, -1).map((column) => column.trim());
    if (columns.length !== 8 || !palaceCell.test(columns[0])) continue;

    const name = columns[0][0];
    const number = palaceNumbers[name];
    if (!number || palaces.some((palace) => palace.palace === number)) return result;
    const markers = parseMarkers(columns[7]);
    palaces.push({
      palace: number,
      name: columns[0],
      direction: directions[name],
      earthStem: valueOrNull(columns[1]),
      heavenStem: valueOrNull(columns[2]),
      star: starName(columns[3]),
      starStrength: columns[3].match(/\(([^)]*)\)/)?.[1] ?? null,
      door: valueOrNull(columns[4]),
      god: valueOrNull(columns[5]),
      isDoorPress: columns[6].includes("迫"),
      ...markers
    });
  }

  if (palaces.length === 9 && new Set(palaces.map((palace) => palace.palace)).size === 9) result.palaces = palaces;
  return result;
}

/** Normalizes the observed Railway `raw.engineResult` object without inventing fields. */
export function normalizeQimenEngineResult(engineResult: unknown): NormalizedQimenFields {
  const raw = asRecord(engineResult);
  if (!raw || typeof raw.prompt !== "string") return {};
  return parseQimenPrompt(raw.prompt);
}

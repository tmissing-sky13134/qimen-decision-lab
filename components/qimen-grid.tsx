import type { QimenChartMeta, QimenPalace } from "@/lib/types";

export const qimenDisplayOrder = [4, 9, 2, 3, 5, 7, 8, 1, 6] as const;

export function QimenGrid({ palaces, chartMeta }: { palaces: QimenPalace[]; chartMeta?: QimenChartMeta }) {
  const byPalace = new Map(palaces.map((palace) => [palace.palace, palace]));
  return <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-[#bfcabe] bg-[#bfcabe] gap-px">{qimenDisplayOrder.map((number) => {
    const palace = byPalace.get(number);
    if (!palace) return null;
    const isValueStar = chartMeta?.zhifuPalace === number;
    const isValueDoor = chartMeta?.zhishiPalace === number;
    const isFavorableDoor = palace.door === "开门" || palace.door === "休门" || palace.door === "生门";
    return <article className={`palace p-3 ${isValueStar || isValueDoor ? "bg-[#f5f9f2]" : ""}`} key={number}><div className="flex items-start justify-between gap-2"><div><span className="font-serif text-xl">{palace.name}</span><p className="mt-0.5 text-[10px] tracking-wider text-slate-400">{palace.direction}</p></div><div className="flex flex-wrap justify-end gap-1">{isValueStar && <Badge label="值符" emphasis />}{isValueDoor && <Badge label="值使" emphasis />}</div></div><p className="mt-3 text-xs text-slate-600"><span>{palace.god ?? "—"}</span><span className="mx-1 text-slate-300">·</span><span>{palace.star ?? "—"}</span><span className="mx-1 text-slate-300">·</span><span className={isFavorableDoor ? "font-medium text-moss" : ""}>{palace.door ?? "—"}</span></p><div className="mt-3 grid grid-cols-2 gap-2 text-xs"><div><p className="text-[10px] text-slate-400">天盘干</p><p className="font-serif text-lg text-moss">{palace.heavenStem ?? "—"}</p></div><div><p className="text-[10px] text-slate-400">地盘干</p><p className="font-serif text-lg text-clay">{palace.earthStem ?? "—"}</p></div></div><div className="mt-2 flex min-h-4 flex-wrap gap-1">{palace.isEmpty && <Badge label="空亡" />}{palace.isHorse && <Badge label="驿马" />}{palace.isDoorPress && <Badge label="门迫" />}{palace.isStemTomb && <Badge label="入墓" />}{palace.marks.map((mark) => <Badge key={mark} label={mark} />)}</div></article>;
  })}</div>;
}

function Badge({ label, emphasis = false }: { label: string; emphasis?: boolean }) { return <span className={`rounded px-1.5 py-0.5 text-[10px] ${emphasis ? "bg-moss/10 text-moss" : "bg-mist text-slate-600"}`}>{label}</span>; }

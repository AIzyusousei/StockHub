"use client";

import { heatmapItems } from "@/features/watchlist/mocks/heatmapCheck";
import { HeatmapRank } from "./HeatmapRank";

export function HeatmapSummary() {
  const up = heatmapItems
    .filter((item) => item.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 5);
  const down = heatmapItems
    .filter((item) => item.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 5);
  return (
    <aside className="rounded-xl border border-slate-200 p-4">
      <h2 className="border-b border-slate-200 pb-3 font-semibold">
        ヒートマップのサマリー
      </h2>
      <HeatmapRank title="上昇上位" items={up} green />
      <HeatmapRank title="下落上位" items={down} />
      <h3 className="mt-5 border-t border-slate-200 pt-4 font-semibold">
        セクター分布{" "}
        <span className="text-xs font-normal text-slate-500">
          (上昇/下落/横ばい)
        </span>
      </h3>
      {["電気機器", "輸送用機器", "情報・通信", "金融", "医薬品", "その他"].map(
        (sector) => (
          <div key={sector} className="mt-3 flex items-center gap-2 text-sm">
            <span className="w-24">{sector}</span>
            <div className="h-1.5 flex-1 rounded-full bg-green-600" />
            <span>6 / 0 / 1</span>
          </div>
        ),
      )}
    </aside>
  );
}

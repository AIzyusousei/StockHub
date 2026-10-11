"use client";

import { ChevronDown } from "lucide-react";
import { HeatmapChart } from "./HeatmapChart";
import { HeatmapMetric } from "./HeatmapMetric";

export function HeatmapMain() {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row">
        <div className="flex h-11 flex-1 items-center rounded-lg border border-slate-200 px-4 font-semibold">
          日本株
        </div>
        <button
          type="button"
          className="flex h-11 items-center justify-between rounded-lg border border-slate-200 px-5 sm:w-44"
        >
          日本株 <ChevronDown className="size-4" />
        </button>
        <button
          type="button"
          className="flex h-11 items-center justify-between rounded-lg border border-slate-200 px-5 sm:w-36"
        >
          1日 <ChevronDown className="size-4" />
        </button>
        <button
          type="button"
          className="h-11 rounded-lg border border-slate-200 px-6 font-semibold"
        >
          検索
        </button>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-8 rounded-xl border border-slate-200 p-4">
        <div>
          <p className="text-sm text-slate-500">🔖 選択中のウォッチリスト</p>
          <b className="text-xl">日本株</b>
        </div>
        <HeatmapMetric label="登録銘柄数" value="46 銘柄" />
        <HeatmapMetric label="平均前日比" value="+0.68%" green />
        <HeatmapMetric label="更新日" value="2026/08/15 21:26（JST）" />
      </div>
      <HeatmapChart />
    </section>
  );
}

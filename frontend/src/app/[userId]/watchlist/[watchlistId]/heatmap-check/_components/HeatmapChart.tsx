"use client";

import { ResponsiveContainer, Treemap } from "recharts";
import { heatmapItems } from "@/features/watchlist/mocks/heatmapCheck";
import { HeatmapContent } from "./HeatmapContent";

export function HeatmapChart() {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <h2 className="mb-3 font-semibold">ヒートマップ（1日騰落率）</h2>
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={heatmapItems}
            dataKey="size"
            nameKey="name"
            isAnimationActive={false}
            content={<HeatmapContent />}
          />
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3 text-sm">
        <span className="font-semibold text-red-600">下落</span>
        <div className="h-3 w-3/5 rounded-full bg-gradient-to-r from-red-600 via-white to-green-600" />
        <span className="font-semibold text-green-700">上昇</span>
      </div>
      <div className="mt-1 flex justify-center text-xs text-slate-500">
        -3%　　　　　　　　　-1%　　　　　　　　0%　　　　　　　　+1%　　　　　　　　+3%
      </div>
    </div>
  );
}

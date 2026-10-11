"use client";

import type { IChartApi, LogicalRange } from "lightweight-charts";
import { Settings } from "lucide-react";
import { useCallback, useRef } from "react";
import type { ChartCheckData } from "@/features/watchlist/mocks/chartCheck";
import type { WatchlistCheckItem } from "@/features/watchlist/mocks/watchlistCheck";
import { CandleChart } from "./CandleChart";
import { MacdChart } from "./MacdChart";
import { VolumeChart } from "./VolumeChart";

export function ChartPanel({
  item,
  data,
}: {
  item: WatchlistCheckItem;
  data: ChartCheckData;
}) {
  const charts = useRef<IChartApi[]>([]);
  const syncing = useRef(false);
  const registerChart = useCallback((instance: IChartApi) => {
    const currentRange = charts.current[0]
      ?.timeScale()
      .getVisibleLogicalRange();
    charts.current.push(instance);
    if (currentRange) {
      instance.timeScale().setVisibleLogicalRange(currentRange);
    } else {
      instance.timeScale().fitContent();
    }

    const syncRange = (range: LogicalRange | null) => {
      if (!range || syncing.current) return;
      syncing.current = true;
      try {
        for (const other of charts.current) {
          if (other === instance) continue;
          const visible = other.timeScale().getVisibleLogicalRange();
          if (visible?.from !== range.from || visible?.to !== range.to) {
            other.timeScale().setVisibleLogicalRange(range);
          }
        }
      } finally {
        syncing.current = false;
      }
    };
    instance.timeScale().subscribeVisibleLogicalRangeChange(syncRange);
    return () => {
      instance.timeScale().unsubscribeVisibleLogicalRangeChange(syncRange);
      charts.current = charts.current.filter((chart) => chart !== instance);
    };
  }, []);

  return (
    <section className="min-w-0 rounded-xl border border-slate-200 p-4 shadow-[0_4px_14px_rgba(15,36,68,0.03)]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {item.symbol}{" "}
          <span className="text-base font-normal text-slate-500">
            / {item.symbol === "NVDA" ? "NVIDIA" : item.symbol}
          </span>
        </h2>
        <div className="flex items-center gap-3 text-slate-500">
          <Settings className="size-5" />
          <span>⋮</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span>
          2026/08/15　始値 132.45　高値 136.28　安値 131.55　終値 135.88
        </span>
        <span className="font-semibold text-[#009c50]">+2.82 (+2.12%)</span>
      </div>
      <div className="mt-2 flex justify-end">
        <div className="flex overflow-hidden rounded-lg border border-slate-200 text-sm">
          <span className="bg-blue-50 px-4 py-2 text-[#075cdf]">1D</span>
          <span className="border-l px-4 py-2">5D</span>
          <span className="border-l px-4 py-2">1M</span>
          <span className="border-l px-4 py-2">3M</span>
          <span className="border-l px-4 py-2">1Y</span>
        </div>
      </div>
      <CandleChart candles={data.candles} registerChart={registerChart} />
      <div className="mt-1 border-t border-slate-200 pt-2">
        <div className="mb-1 text-sm font-semibold">
          出来高{" "}
          <span className="ml-3 font-normal text-slate-500">233.45M</span>
        </div>
        <VolumeChart data={data.volumes} registerChart={registerChart} />
      </div>
      <div className="mt-2 border-t border-slate-200 pt-3">
        <div className="text-sm">
          <b>MACD</b> (12, 26, close)　
          <span className="text-[#0878ff]">MACD 2.34</span>　
          <span className="text-orange-500">Signal 2.11</span>　
          <span className="text-[#009c50]">Histogram 0.23</span>
        </div>
        <MacdChart candles={data.candles} registerChart={registerChart} />
      </div>
    </section>
  );
}

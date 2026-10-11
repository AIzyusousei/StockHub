"use client";

import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export function CandleChart({
  candles,
  registerChart,
}: {
  candles: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  registerChart: (chart: IChartApi) => () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const instance = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 285,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { color: "#e2e8f0" },
        horzLines: { color: "#e2e8f0" },
      },
      rightPriceScale: { borderVisible: false, minimumWidth: 70 },
      timeScale: { borderVisible: false },
    });
    const series = instance.addSeries(CandlestickSeries, {
      upColor: "#ef4444",
      downColor: "#1f2937",
      borderUpColor: "#ef4444",
      borderDownColor: "#1f2937",
      wickUpColor: "#ef4444",
      wickDownColor: "#1f2937",
    });
    series.setData(
      candles.map((candle) => ({ ...candle, time: candle.date as Time })),
    );
    const unregister = registerChart(instance);
    const observer = new ResizeObserver(([entry]) =>
      instance.applyOptions({ width: entry.contentRect.width }),
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      unregister();
      instance.remove();
    };
  }, [candles, registerChart]);
  return <div ref={ref} className="mt-2 h-[285px] w-full" />;
}

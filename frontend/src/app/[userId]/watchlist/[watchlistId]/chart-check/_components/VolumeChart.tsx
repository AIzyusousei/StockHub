"use client";

import {
  ColorType,
  createChart,
  HistogramSeries,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export function VolumeChart({
  data,
  registerChart,
}: {
  data: { date: string; value: number; up: boolean }[];
  registerChart: (chart: IChartApi) => () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const instance = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 80,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { color: "#e2e8f0" },
        horzLines: { visible: false },
      },
      rightPriceScale: { borderVisible: false, minimumWidth: 70 },
      timeScale: { borderVisible: false, visible: false },
    });
    const series = instance.addSeries(HistogramSeries, {
      priceLineVisible: false,
      lastValueVisible: false,
      priceFormat: { type: "volume" },
    });
    series.setData(
      data.map((point) => ({
        time: point.date as Time,
        value: point.value,
        color: point.up ? "#ef4444" : "#64748b",
      })),
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
  }, [data, registerChart]);
  return <div ref={ref} className="h-20 w-full" />;
}

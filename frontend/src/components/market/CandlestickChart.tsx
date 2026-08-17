"use client";

import {
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import type { MarketCandle } from "@/types/marketOverview";

type CandlestickChartProps = {
  candles: MarketCandle[];
};

export function CandlestickChart({ candles }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const chart = createChart(container, {
      width: container.clientWidth,
      height: 175,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
        fontSize: 12,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#dbe3ee", style: 2 },
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: { top: 0.1, bottom: 0.12 },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
        secondsVisible: false,
        rightOffset: 1,
      },
      handleScale: false,
      handleScroll: false,
      crosshair: {
        vertLine: { visible: false, labelVisible: false },
        horzLine: { visible: false, labelVisible: false },
      },
    });
    chartRef.current = chart;

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#10a987",
      downColor: "#ef4e3a",
      borderUpColor: "#10a987",
      borderDownColor: "#ef4e3a",
      wickUpColor: "#10a987",
      wickDownColor: "#ef4e3a",
      priceLineVisible: false,
      lastValueVisible: false,
    });
    series.setData(
      candles.map((candle) => ({
        time: candle.date as Time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      })),
    );
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(([entry]) => {
      chart.applyOptions({ width: entry.contentRect.width });
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [candles]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="日足ローソク足チャート"
      className="h-[175px] w-full"
    />
  );
}

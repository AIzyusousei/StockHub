"use client";

import {
  ColorType,
  createChart,
  HistogramSeries,
  type IChartApi,
  LineSeries,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

export function MacdChart({
  candles,
  registerChart,
}: {
  candles: { date: string; close: number }[];
  registerChart: (chart: IChartApi) => () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const instance = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 118,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#64748b",
      },
      grid: {
        vertLines: { color: "#e2e8f0" },
        horzLines: { color: "#e2e8f0" },
      },
      rightPriceScale: { borderVisible: false, minimumWidth: 70 },
      timeScale: { borderVisible: false, visible: false },
    });
    const macd = calculateMacd(candles);
    const histogram = instance.addSeries(HistogramSeries, {
      priceLineVisible: false,
      lastValueVisible: false,
      base: 0,
    });
    histogram.setData(
      macd.map((point) => ({
        time: point.date as Time,
        value: point.histogram,
        color: point.histogram >= 0 ? "#16a36a" : "#ef4444",
      })),
    );
    const macdLine = instance.addSeries(LineSeries, {
      color: "#0878ff",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    macdLine.setData(
      macd.map((point) => ({ time: point.date as Time, value: point.macd })),
    );
    const signalLine = instance.addSeries(LineSeries, {
      color: "#f97316",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    signalLine.setData(
      macd.map((point) => ({ time: point.date as Time, value: point.signal })),
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
  return <div ref={ref} className="mt-2 h-[118px] w-full" />;
}

function calculateMacd(candles: { date: string; close: number }[]) {
  let fast = candles[0]?.close ?? 0;
  let slow = fast;
  let signal = 0;
  return candles.map((candle) => {
    fast = fast * (1 - 2 / 13) + candle.close * (2 / 13);
    slow = slow * (1 - 2 / 27) + candle.close * (2 / 27);
    const macd = fast - slow;
    signal = signal * (1 - 2 / 10) + macd * (2 / 10);
    return { date: candle.date, macd, signal, histogram: macd - signal };
  });
}

"use client";

import {
  CandlestickSeries,
  ColorType,
  createChart,
  HistogramSeries,
  type IChartApi,
  LineSeries,
  type Time,
} from "lightweight-charts";
import {
  Bell,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  Settings,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Header } from "@/components/layout/Header";
import { WatchlistPageLayout } from "@/components/watchlist/WatchlistPageLayout";
import { WatchlistSidebar } from "@/components/watchlist/WatchlistSidebar";
import { WatchlistStockSearch } from "@/components/watchlist/WatchlistStockSearch";
import { chartCheckData } from "@/mocks/chartCheck";
import { watchlistCheckItems } from "@/mocks/watchlistCheck";

export default function ChartCheckPage() {
  const { userId, watchlistId } = useParams<{
    userId: string;
    watchlistId: string;
  }>();
  const [selected, setSelected] = useState("NVDA");
  const item =
    watchlistCheckItems.find((row) => row.symbol === selected) ??
    watchlistCheckItems[0];
  const chartData = chartCheckData[selected] ?? chartCheckData.NVDA;
  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#10294c]">
      <Header
        activeSection="watchlist"
        userId={userId}
        homeHref={`/${userId}/hub`}
        watchlistHref={`/${userId}/watchlist/${watchlistId}/watchlist-check`}
      />
      <main className="mx-2 mb-2 min-h-[calc(100vh-90px)] rounded-b-xl bg-white px-5 pb-10 pt-7 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10">
        <div className="mx-auto max-w-[1580px]">
          <WatchlistPageLayout
            userId={userId}
            watchlistId={watchlistId}
            currentTab="chart"
            sidebar={<WatchlistSidebar />}
          >
            <div className="hidden mb-5 flex items-center gap-5">
              <span className="h-11 w-1.5 rounded-full bg-[#246bfe]" />
              <div>
                <h1 className="text-[29px] font-bold">ウォッチリスト</h1>
                <p className="mt-1 text-[17px] text-slate-500">
                  2026-8-15（土）21:26（JST）
                </p>
              </div>
            </div>
            <div className="hidden mb-7 flex justify-end border-b border-slate-200">
              <Tab label="ウォッチリストチェック" icon={<List />} />
              <Tab
                label="チャートチェック"
                icon={<ChartNoAxesCombined />}
                active
              />
              <Tab label="ヒートマップチェック" icon={<Grid3X3 />} />
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[410px_minmax(500px,1fr)]">
              <StockList selected={selected} onSelect={setSelected} />
              <div className="xl:mt-[69px]">
                <ChartPanel item={item} data={chartData} />
              </div>
            </div>
          </WatchlistPageLayout>
        </div>
      </main>
    </div>
  );
}

function _Sidebar() {
  return (
    <aside>
      <div className="mb-3 flex h-12 overflow-hidden rounded-lg border border-slate-200">
        <div className="flex flex-1 items-center gap-3 px-4 text-slate-400">
          <Search className="size-5" />
          リストを検索
        </div>
        <button
          type="button"
          className="border-l border-slate-200 px-5 font-semibold"
        >
          検索
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 p-4">
        <h2 className="flex items-center gap-3 font-semibold">
          <CalendarDays className="size-5 text-[#1760ed]" />
          週次ウォッチリスト
        </h2>
        {["#26/08/17 week", "#26/08/10 week", "#26/08/03 week"].map((name) => (
          <div
            key={name}
            className="flex items-center gap-4 py-1.5 pl-1 text-slate-600"
          >
            <List className="size-4 text-slate-400" />
            {name}
          </div>
        ))}
        <div className="mt-1 flex justify-center gap-2 text-[#075cdf]">
          もっと見る <ChevronRight className="size-4" />
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-slate-200 p-4">
        <h2 className="flex items-center gap-3 font-semibold">
          <BookmarkIcon />
          ウォッチリスト
        </h2>
        {[
          "検索履歴ウォッチリスト",
          "#本日注目",
          "#明日注目",
          "なんとなく注目テック",
          "memory & light",
          "日本バリュー株",
          "セクター代表銘柄",
          "日本株優良",
          "米国成長株",
          "セクター別etf",
        ].map((name) => (
          <div
            key={name}
            className="flex items-center gap-4 py-1 text-[15px] text-slate-600"
          >
            <List className="size-4 text-slate-400" />
            {name}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-slate-200 p-4">
        <h2 className="flex items-center gap-3 font-semibold">
          <Bell className="size-5 text-[#1760ed]" />
          検索履歴ウォッチリスト
        </h2>
        <p className="mt-3 pl-8 text-sm text-slate-500">
          最近の検索履歴（最大20件）
        </p>
      </div>
    </aside>
  );
}
function BookmarkIcon() {
  return <span className="text-[#1760ed]">▱</span>;
}
function StockList({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (symbol: string) => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200">
      <div className="border-b border-slate-200 p-3">
        <WatchlistStockSearch showMarketFilter={false} />
      </div>
      <div className="hidden flex h-12 items-center gap-3 border-b border-slate-200 px-4">
        <input className="min-w-0 flex-1 outline-none" defaultValue="日東紡" />
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-4 py-2 font-semibold"
        >
          検索
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-sm">
          <tr className="h-12">
            <th className="w-14" />
            <th>銘柄名</th>
            <th>前日比</th>
            <th>5日前比</th>
          </tr>
        </thead>
        <tbody>
          {watchlistCheckItems.map((row) => (
            <tr
              key={row.symbol}
              className={`h-[66px] border-t border-slate-200 ${selected === row.symbol ? "bg-blue-50 ring-1 ring-inset ring-[#7faeff]" : ""}`}
            >
              <td className="text-center text-slate-400">
                <List className="mx-auto size-4" />
              </td>
              <th>
                <button
                  type="button"
                  onClick={() => onSelect(row.symbol)}
                  className="font-semibold text-[#075cdf]"
                >
                  {row.symbol}
                </button>
              </th>
              <td
                className={
                  row.dailyChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"
                }
              >
                {row.dailyChange > 0 ? "+" : ""}
                {row.dailyChange.toFixed(1)}%
              </td>
              <td
                className={
                  row.fiveDayChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"
                }
              >
                {row.fiveDayChange > 0 ? "+" : ""}
                {row.fiveDayChange.toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
function ChartPanel({
  item,
  data,
}: {
  item: (typeof watchlistCheckItems)[number];
  data: typeof chartCheckData.NVDA;
}) {
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
      <CandleChart candles={data.candles} />
      <div className="mt-1 border-t border-slate-200 pt-2">
        <div className="mb-1 text-sm font-semibold">
          出来高{" "}
          <span className="ml-3 font-normal text-slate-500">233.45M</span>
        </div>
        <VolumeChart data={data.volumes} />
      </div>
      <div className="mt-2 border-t border-slate-200 pt-3">
        <div className="text-sm">
          <b>MACD</b> (12, 26, close)　
          <span className="text-[#0878ff]">MACD 2.34</span>　
          <span className="text-orange-500">Signal 2.11</span>　
          <span className="text-[#009c50]">Histogram 0.23</span>
        </div>
        <MacdChart candles={data.candles} />
      </div>
    </section>
  );
}
function CandleChart({
  candles,
}: {
  candles: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const chart = useRef<IChartApi | null>(null);
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
      rightPriceScale: { borderVisible: false },
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
    instance.timeScale().fitContent();
    chart.current = instance;
    const observer = new ResizeObserver(([entry]) =>
      instance.applyOptions({ width: entry.contentRect.width }),
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      instance.remove();
      chart.current = null;
    };
  }, [candles]);
  return <div ref={ref} className="mt-2 h-[285px] w-full" />;
}
function VolumeChart({
  data,
}: {
  data: { date: string; value: number; up: boolean }[];
}) {
  return (
    <div className="h-20 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false}>
            {data.map((entry) => (
              <Cell key={entry.date} fill={entry.up ? "#ef4444" : "#64748b"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
function MacdChart({
  candles,
}: {
  candles: { date: string; close: number }[];
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
      rightPriceScale: { borderVisible: false },
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
    instance.timeScale().fitContent();
    const observer = new ResizeObserver(([entry]) =>
      instance.applyOptions({ width: entry.contentRect.width }),
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      instance.remove();
    };
  }, [candles]);
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
function Tab({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={`border-b-2 px-7 pb-3 font-semibold ${active ? "border-[#246bfe] text-[#075cdf]" : "border-transparent text-slate-600"}`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );
}

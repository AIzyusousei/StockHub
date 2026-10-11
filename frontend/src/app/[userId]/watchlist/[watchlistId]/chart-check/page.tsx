"use client";

import {
  CandlestickSeries,
  ColorType,
  createChart,
  HistogramSeries,
  type IChartApi,
  LineSeries,
  type LogicalRange,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "@/components/common/Header";
import { WatchlistPageLayout } from "@/features/watchlist/components/WatchlistPageLayout";
import { WatchlistSidebar } from "@/features/watchlist/components/WatchlistSidebar";
import { WatchlistStockSearch } from "@/features/watchlist/components/WatchlistStockSearch";
import { useWatchlists } from "@/features/watchlist/components/WatchlistStore";
import {
  hasWatchlistDrag,
  readWatchlistDrag,
  startWatchlistDrag,
} from "@/features/watchlist/components/watchlistDrag";
import { chartCheckData } from "@/features/watchlist/mocks/chartCheck";
import type { WatchlistCheckItem } from "@/features/watchlist/mocks/watchlistCheck";

export default function ChartCheckPage() {
  const { userId, watchlistId } = useParams<{
    userId: string;
    watchlistId: string;
  }>();
  const { getStocks, reorderStocks } = useWatchlists();
  const items = getStocks(watchlistId);
  const [selected, setSelected] = useState("NVDA");
  const item = items.find((row) => row.symbol === selected) ?? items[0];
  const chartData = item
    ? (chartCheckData[item.symbol] ?? chartCheckData.NVDA)
    : null;
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
              <StockList
                items={items}
                watchlistId={watchlistId}
                selected={item?.symbol ?? ""}
                onSelect={setSelected}
                onReorder={(source, target, after) =>
                  reorderStocks(watchlistId, source, target, after)
                }
              />
              <div className="xl:mt-[69px]">
                {item && chartData ? (
                  <ChartPanel key={item.symbol} item={item} data={chartData} />
                ) : (
                  <p className="rounded-xl border border-slate-200 p-6 text-slate-500">
                    銘柄をウォッチリストに追加してください。
                  </p>
                )}
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
  items,
  watchlistId,
  selected,
  onSelect,
  onReorder,
}: {
  items: WatchlistCheckItem[];
  watchlistId: string;
  selected: string;
  onSelect: (symbol: string) => void;
  onReorder: (source: string, target: string, after: boolean) => void;
}) {
  const [dropTarget, setDropTarget] = useState<{
    symbol: string;
    after: boolean;
  } | null>(null);
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
            <th>銘柄名</th>
            <th>前日比</th>
            <th>5日前比</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr
              key={row.symbol}
              draggable
              onDragStart={(event) =>
                startWatchlistDrag(event, {
                  kind: "stock",
                  sourceId: watchlistId,
                  symbol: row.symbol,
                })
              }
              onDragEnd={() => setDropTarget(null)}
              onDragOver={(event) => {
                if (!hasWatchlistDrag(event)) return;
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                const rect = event.currentTarget.getBoundingClientRect();
                setDropTarget({
                  symbol: row.symbol,
                  after: event.clientY > rect.top + rect.height / 2,
                });
              }}
              onDrop={(event) => {
                event.preventDefault();
                const drag = readWatchlistDrag(event);
                if (drag?.kind === "stock" && drag.sourceId === watchlistId) {
                  const rect = event.currentTarget.getBoundingClientRect();
                  onReorder(
                    drag.symbol,
                    row.symbol,
                    event.clientY > rect.top + rect.height / 2,
                  );
                }
                setDropTarget(null);
              }}
              className={`h-[66px] cursor-grab border-t border-slate-200 active:cursor-grabbing ${selected === row.symbol ? "bg-blue-50 ring-1 ring-inset ring-[#7faeff]" : ""} ${dropTarget?.symbol === row.symbol ? (dropTarget.after ? "border-b-2 border-b-[#1760ed]" : "border-t-2 border-t-[#1760ed]") : ""}`}
            >
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
  item: WatchlistCheckItem;
  data: typeof chartCheckData.NVDA;
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
function CandleChart({
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
function VolumeChart({
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
function MacdChart({
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

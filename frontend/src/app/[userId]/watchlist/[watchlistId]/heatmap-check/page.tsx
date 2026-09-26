"use client";

import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Grid3X3,
  List,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ResponsiveContainer, Treemap } from "recharts";
import { Header } from "@/components/common/Header";
import { WatchlistPageLayout } from "@/features/watchlist/components/WatchlistPageLayout";
import { WatchlistSidebar } from "@/features/watchlist/components/WatchlistSidebar";
import {
  type HeatmapItem,
  heatmapItems,
} from "@/features/watchlist/mocks/heatmapCheck";

const lists = [
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
];
const colorFor = (change: number) =>
  change >= 0
    ? `rgb(${Math.max(50, 210 - change * 32)}, ${Math.min(190, 175 + change * 15)}, ${Math.max(75, 125 - change * 12)})`
    : `rgb(${Math.min(255, 235 + Math.abs(change) * 8)}, ${Math.max(110, 190 - Math.abs(change) * 25)}, ${Math.max(125, 190 - Math.abs(change) * 10)})`;
const formatChange = (change: number) =>
  `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;

export default function HeatmapCheckPage() {
  const { userId, watchlistId } = useParams<{
    userId: string;
    watchlistId: string;
  }>();
  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#10294c]">
      <Header
        activeSection="watchlist"
        userId={userId}
        homeHref={`/${userId}/hub`}
        watchlistHref={`/${userId}/watchlist/${watchlistId}/watchlist-check`}
      />
      <main className="mx-2 mb-2 min-h-[calc(100vh-90px)] rounded-b-xl bg-white px-5 pb-8 pt-7 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10">
        <div className="mx-auto max-w-[1580px]">
          <WatchlistPageLayout
            userId={userId}
            watchlistId={watchlistId}
            currentTab="heatmap"
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
            <div className="hidden mb-4 flex justify-end gap-10 border-b border-slate-200">
              <Tab
                href={`/${userId}/watchlist/${watchlistId}/watchlist-check`}
                icon={<List />}
                label="ウォッチリストチェック"
              />
              <Tab
                href={`/${userId}/watchlist/${watchlistId}/chart-check`}
                icon={<span>▥</span>}
                label="チャートチェック"
              />
              <Tab
                href={`/${userId}/watchlist/${watchlistId}/heatmap-check`}
                icon={<Grid3X3 />}
                label="ヒートマップチェック"
                active
              />
            </div>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(600px,1fr)_294px]">
              <HeatmapMain />
              <Summary />
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
          <SideRow key={name} text={name} />
        ))}
        <div className="mt-1 flex justify-center gap-2 text-[#075cdf]">
          もっと見る <ChevronRight className="size-4" />
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-slate-200 p-4">
        <h2 className="mb-2 flex items-center gap-3 font-semibold">
          <span className="text-[#1760ed]">♧</span>ウォッチリスト
        </h2>
        {lists.map((name) => (
          <SideRow key={name} text={name} />
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-slate-200 p-4">
        <h2 className="flex items-center gap-3 font-semibold">
          <span className="text-[#1760ed]">◷</span>検索履歴ウォッチリスト
        </h2>
        <p className="mt-3 pl-8 text-sm text-slate-500">
          最近の検索履歴（最大20件）
        </p>
      </div>
    </aside>
  );
}
function SideRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 py-1 pl-1 text-[15px] text-slate-600">
      <List className="size-4 text-slate-400" />
      {text}
    </div>
  );
}
function HeatmapMain() {
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
        <Metric label="登録銘柄数" value="46 銘柄" />
        <Metric label="平均前日比" value="+0.68%" green />
        <Metric label="更新日" value="2026/08/15 21:26（JST）" />
      </div>
      <div className="rounded-xl border border-slate-200 p-3">
        <h2 className="mb-3 font-semibold">ヒートマップ（1日騰落率）</h2>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={heatmapItems}
              dataKey="size"
              nameKey="name"
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
    </section>
  );
}
function Metric({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="border-l border-slate-200 pl-8">
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold ${green ? "text-[#009c50]" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
function HeatmapContent({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  name = "",
  change = 0,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  change?: number;
}) {
  if (width < 4 || height < 4) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={colorFor(change)}
        stroke="#fff"
        strokeWidth={3}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 4}
        textAnchor="middle"
        fill={Math.abs(change) > 1.8 ? "#fff" : "#10294c"}
        fontSize={Math.min(18, Math.max(10, width / 9))}
        fontWeight="600"
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 18}
        textAnchor="middle"
        fill={Math.abs(change) > 1.8 ? "#fff" : "#10294c"}
        fontSize={Math.min(16, Math.max(10, width / 10))}
      >
        {formatChange(change)}
      </text>
    </g>
  );
}
function Summary() {
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
      <Rank title="上昇上位" items={up} green />
      <Rank title="下落上位" items={down} />
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
function Rank({
  title,
  items,
  green = false,
}: {
  title: string;
  items: HeatmapItem[];
  green?: boolean;
}) {
  return (
    <div className="mt-4">
      <h3
        className={`font-semibold ${green ? "text-green-700" : "text-red-600"}`}
      >
        {title}
      </h3>
      {items.map((item, index) => (
        <div key={item.name} className="flex justify-between py-1 text-sm">
          <span>
            {index + 1}　{item.name}
          </span>
          <span className={green ? "text-green-700" : "text-red-600"}>
            {formatChange(item.change)}
          </span>
        </div>
      ))}
    </div>
  );
}
function Tab({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 border-b-2 px-5 pb-3 font-semibold whitespace-nowrap ${active ? "border-[#246bfe] text-[#075cdf]" : "border-transparent text-slate-600"}`}
    >
      {icon}
      {label}
    </Link>
  );
}

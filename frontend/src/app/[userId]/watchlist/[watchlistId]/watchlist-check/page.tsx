/* biome-ignore-all lint/a11y/noStaticElementInteractions: native drag handle */
"use client";

import { Clock3, Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { WatchlistPageLayout } from "@/components/watchlist/WatchlistPageLayout";
import { WatchlistSidebar } from "@/components/watchlist/WatchlistSidebar";
import { WatchlistStockSearch } from "@/components/watchlist/WatchlistStockSearch";
import { watchlistCheckItems } from "@/mocks/watchlistCheck";

const weekly = ["#26/08/17 week", "#26/08/10 week", "#26/08/03 week"];
const permanent = [
  "検索履歴ウォッチリスト",
  "#本日注目",
  "#明日注目",
  "なんとなく注目テック",
  "memory & light",
  "日本バリュー株",
  "セクター代表銘柄",
  "日本高配当",
  "米国成長株",
  "セクター別etf",
];
const changeText = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

export default function WatchlistCheckPage() {
  const { userId, watchlistId } = useParams<{
    userId: string;
    watchlistId: string;
  }>();
  const [items, setItems] = useState(watchlistCheckItems);
  const [selected, setSelected] = useState("NVDA");
  const [dragged, setDragged] = useState<string | null>(null);
  const reorder = (target: string) => {
    if (!dragged) return;
    setItems((current) => {
      const from = current.findIndex((item) => item.symbol === dragged);
      const to = current.findIndex((item) => item.symbol === target);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
    setDragged(null);
  };
  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#10294c]">
      <Header
        activeSection="watchlist"
        userId={userId}
        homeHref={`/${userId}/hub`}
      />
      <main className="mx-2 mb-2 min-h-[calc(100vh-90px)] rounded-b-xl bg-white px-5 pb-16 pt-8 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10 lg:px-10">
        <div className="mx-auto max-w-[1580px]">
          <WatchlistPageLayout
            userId={userId}
            watchlistId={watchlistId}
            currentTab="watchlist"
            sidebar={<WatchlistSidebar weekly={weekly} permanent={permanent} />}
          >
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_190px]">
              <div className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 shadow-[0_4px_14px_rgba(15,36,68,0.03)] xl:flex-row xl:items-start">
                <WatchlistStockSearch />
              </div>
              <div className="flex shrink-0 flex-col gap-2 xl:w-[190px]">
                <button
                  type="button"
                  className="flex h-11 items-center justify-center rounded-lg bg-[#1760ed] font-semibold text-white"
                >
                  <Plus className="mr-2 size-5" />
                  リストを新規作成
                </button>
                <button
                  type="button"
                  className="flex h-11 items-center justify-center rounded-lg border border-slate-200 font-semibold text-[#f52222]"
                >
                  <Trash2 className="mr-2 size-5" />
                  リストを削除
                </button>
                <button
                  type="button"
                  className="flex h-11 items-center justify-center rounded-lg border border-slate-200 font-semibold"
                >
                  <Clock3 className="mr-2 size-5" />
                  リストを一時化
                </button>
              </div>
              <div className="xl:col-span-2">
                <StockTable
                  items={items}
                  selected={selected}
                  dragged={dragged}
                  onSelect={setSelected}
                  onDragStart={setDragged}
                  onDrop={reorder}
                  onDelete={(symbol) =>
                    setItems((current) =>
                      current.filter((item) => item.symbol !== symbol),
                    )
                  }
                />
              </div>
            </div>
          </WatchlistPageLayout>
        </div>
      </main>
    </div>
  );
}

function StockTable({
  items,
  selected,
  dragged,
  onSelect,
  onDragStart,
  onDrop,
  onDelete,
}: {
  items: typeof watchlistCheckItems;
  selected: string;
  dragged: string | null;
  onSelect: (symbol: string) => void;
  onDragStart: (symbol: string) => void;
  onDrop: (symbol: string) => void;
  onDelete: (symbol: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[1000px] text-left">
        <thead className="bg-slate-50">
          <tr className="h-12 text-sm font-semibold">
            <th className="w-14" />
            <th>銘柄名</th>
            <th>価格</th>
            <th>前日比</th>
            <th>5日前比</th>
            <th>PEG</th>
            <th>決算日</th>
            <th>メモ</th>
            <th className="w-16" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              key={item.symbol}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => onDrop(item.symbol)}
              className={`h-[66px] border-t border-slate-200 ${dragged === item.symbol ? "bg-blue-50" : ""}`}
            >
              <td className="text-center text-slate-400">
                <span
                  draggable
                  onDragStart={() => onDragStart(item.symbol)}
                  className="inline-block cursor-grab select-none text-lg active:cursor-grabbing"
                >
                  ☷
                </span>
              </td>
              <th className="font-semibold text-[#075cdf]">
                <button
                  type="button"
                  onClick={() => onSelect(item.symbol)}
                  className={selected === item.symbol ? "underline" : ""}
                >
                  {item.symbol}
                </button>
              </th>
              <td>{item.price}</td>
              <td
                className={
                  item.dailyChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"
                }
              >
                {changeText(item.dailyChange)}
              </td>
              <td
                className={
                  item.fiveDayChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"
                }
              >
                {changeText(item.fiveDayChange)}
              </td>
              <td>{item.peg}</td>
              <td>{item.earningsDate}</td>
              <td>{item.memo}</td>
              <td>
                <button
                  type="button"
                  aria-label={`${item.symbol}を削除`}
                  onClick={() => onDelete(item.symbol)}
                  className="text-[#f52222]"
                >
                  <Trash2 className="size-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";

import { Clock3, Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
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
import type { WatchlistCheckItem } from "@/features/watchlist/mocks/watchlistCheck";

const changeText = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

export default function WatchlistCheckPage() {
  const { userId, watchlistId } = useParams<{
    userId: string;
    watchlistId: string;
  }>();
  const { getStocks, reorderStocks, removeStock } = useWatchlists();
  const items = getStocks(watchlistId);
  const [selected, setSelected] = useState("NVDA");
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
            sidebar={<WatchlistSidebar />}
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
                  onSelect={setSelected}
                  watchlistId={watchlistId}
                  onDrop={(source, target, after) =>
                    reorderStocks(watchlistId, source, target, after)
                  }
                  onDelete={(symbol) => removeStock(watchlistId, symbol)}
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
  watchlistId,
  onSelect,
  onDrop,
  onDelete,
}: {
  items: WatchlistCheckItem[];
  selected: string;
  watchlistId: string;
  onSelect: (symbol: string) => void;
  onDrop: (source: string, target: string, after: boolean) => void;
  onDelete: (symbol: string) => void;
}) {
  const [dragged, setDragged] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    symbol: string;
    after: boolean;
  } | null>(null);
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[1000px] text-left">
        <thead className="bg-slate-50">
          <tr className="h-12 text-sm font-semibold">
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
              draggable
              onDragStart={(event) => {
                setDragged(item.symbol);
                startWatchlistDrag(event, {
                  kind: "stock",
                  sourceId: watchlistId,
                  symbol: item.symbol,
                });
              }}
              onDragEnd={() => {
                setDragged(null);
                setDropTarget(null);
              }}
              onDragOver={(event) => {
                if (!hasWatchlistDrag(event)) return;
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                const rect = event.currentTarget.getBoundingClientRect();
                setDropTarget({
                  symbol: item.symbol,
                  after: event.clientY > rect.top + rect.height / 2,
                });
              }}
              onDrop={(event) => {
                event.preventDefault();
                const drag = readWatchlistDrag(event);
                if (drag?.kind === "stock" && drag.sourceId === watchlistId) {
                  const rect = event.currentTarget.getBoundingClientRect();
                  onDrop(
                    drag.symbol,
                    item.symbol,
                    event.clientY > rect.top + rect.height / 2,
                  );
                }
                setDropTarget(null);
              }}
              className={`h-[66px] cursor-grab border-t border-slate-200 active:cursor-grabbing ${dragged === item.symbol ? "opacity-50" : ""} ${dropTarget?.symbol === item.symbol ? (dropTarget.after ? "border-b-2 border-b-[#1760ed]" : "border-t-2 border-t-[#1760ed]") : ""}`}
            >
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

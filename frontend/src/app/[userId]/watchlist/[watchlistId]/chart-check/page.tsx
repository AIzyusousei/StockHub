"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { WatchlistPageLayout } from "@/features/watchlist/components/WatchlistPageLayout";
import { useWatchlists } from "@/features/watchlist/components/WatchlistStore";
import { chartCheckData } from "@/features/watchlist/mocks/chartCheck";
import { ChartPanel } from "./_components/ChartPanel";
import { StockList } from "./_components/StockList";

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
          >
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[410px_minmax(500px,1fr)]">
              <StockList
                items={items}
                userId={userId}
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

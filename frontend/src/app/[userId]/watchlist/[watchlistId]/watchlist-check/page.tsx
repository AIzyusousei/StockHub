"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { WatchlistPageLayout } from "@/features/watchlist/components/WatchlistPageLayout";
import { WatchlistStockSearch } from "@/features/watchlist/components/WatchlistStockSearch";
import { useWatchlists } from "@/features/watchlist/components/WatchlistStore";
import { StockTable } from "./_components/StockTable";
import { WatchlistActions } from "./_components/WatchlistActions";

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
          >
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_190px]">
              <div className="flex flex-col gap-3 rounded-xl border border-slate-200 p-3 shadow-[0_4px_14px_rgba(15,36,68,0.03)] xl:flex-row xl:items-start">
                <WatchlistStockSearch />
              </div>
              <WatchlistActions />
              <div className="xl:col-span-2">
                <StockTable
                  items={items}
                  selected={selected}
                  onSelect={setSelected}
                  userId={userId}
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

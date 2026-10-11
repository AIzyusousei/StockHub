"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/common/Header";
import { WatchlistPageLayout } from "@/features/watchlist/components/WatchlistPageLayout";
import { HeatmapMain } from "./_components/HeatmapMain";
import { HeatmapSummary } from "./_components/HeatmapSummary";

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
          >
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(600px,1fr)_294px]">
              <HeatmapMain />
              <HeatmapSummary />
            </div>
          </WatchlistPageLayout>
        </div>
      </main>
    </div>
  );
}

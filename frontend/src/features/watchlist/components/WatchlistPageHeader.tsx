"use client";

import { WatchlistCheckTabs } from "@/features/watchlist/components/WatchlistCheckTabs";
import { WatchlistPageTitle } from "@/features/watchlist/components/WatchlistPageTitle";
import {
  listId,
  useWatchlists,
} from "@/features/watchlist/components/WatchlistStore";

export type WatchlistPageHeaderProps = {
  userId: string;
  watchlistId: string;
  currentTab?: "watchlist" | "chart" | "heatmap";
  watchlistName?: string;
};

export function WatchlistPageHeader({
  userId,
  watchlistId,
  currentTab,
  watchlistName,
}: WatchlistPageHeaderProps) {
  const { state } = useWatchlists();
  const selectedName =
    watchlistName ??
    [...state.weekly, ...state.permanent].find(
      (name) => listId(name) === watchlistId,
    ) ??
    "日本株";
  return (
    <div className="flex items-start gap-10">
      <div className="w-[360px] shrink-0">
        <WatchlistPageTitle watchlistName={selectedName} />
      </div>
      {currentTab && (
        <div className="min-w-0 flex-1">
          <WatchlistCheckTabs
            userId={userId}
            watchlistId={watchlistId}
            currentTab={currentTab}
          />
        </div>
      )}
    </div>
  );
}

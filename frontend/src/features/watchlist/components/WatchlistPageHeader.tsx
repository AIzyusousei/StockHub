import { WatchlistCheckTabs } from "@/features/watchlist/components/WatchlistCheckTabs";
import { WatchlistPageTitle } from "@/features/watchlist/components/WatchlistPageTitle";

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
  watchlistName = "日本株",
}: WatchlistPageHeaderProps) {
  return (
    <div className="flex items-start gap-10">
      <div className="w-[360px] shrink-0">
        <WatchlistPageTitle watchlistName={watchlistName} />
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

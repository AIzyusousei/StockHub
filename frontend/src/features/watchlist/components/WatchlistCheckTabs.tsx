import { ChartNoAxesCombined, Grid3X3, List } from "lucide-react";
import Link from "next/link";

type WatchlistCheckTab = "watchlist" | "chart" | "heatmap";
type WatchlistCheckTabsProps = {
  userId: string;
  watchlistId: string;
  currentTab: WatchlistCheckTab;
  className?: string;
};

export function WatchlistCheckTabs({
  userId,
  watchlistId,
  currentTab,
  className = "",
}: WatchlistCheckTabsProps) {
  const basePath = `/${userId}/watchlist/${watchlistId}`;
  const tabs = [
    {
      key: "watchlist" as const,
      label: "ウォッチリストチェック",
      icon: List,
      href: `${basePath}/watchlist-check`,
    },
    {
      key: "chart" as const,
      label: "チャートチェック",
      icon: ChartNoAxesCombined,
      href: `${basePath}/chart-check`,
    },
    {
      key: "heatmap" as const,
      label: "ヒートマップチェック",
      icon: Grid3X3,
      href: `${basePath}/heatmap-check`,
    },
  ];
  return (
    <nav
      aria-label="ウォッチリスト画面切り替え"
      className={`flex justify-end border-b border-slate-200 ${className}`}
    >
      <div className="flex items-center gap-10 lg:gap-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex h-12 items-center gap-3 border-b-2 px-3 font-semibold whitespace-nowrap ${tab.key === currentTab ? "border-[#246bfe] text-[#246bfe]" : "border-transparent text-slate-600 hover:text-[#246bfe]"}`}
            >
              <Icon aria-hidden="true" />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

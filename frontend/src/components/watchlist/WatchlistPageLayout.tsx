import {
  WatchlistPageHeader,
  type WatchlistPageHeaderProps,
} from "@/components/watchlist/WatchlistPageHeader";
import { WatchlistSidebar } from "@/components/watchlist/WatchlistSidebar";

type WatchlistPageLayoutProps = WatchlistPageHeaderProps & {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function WatchlistPageLayout({
  children,
  sidebar,
  ...headerProps
}: WatchlistPageLayoutProps) {
  return (
    <>
      <WatchlistPageHeader {...headerProps} />
      <div className="mt-6 grid grid-cols-1 gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
        {sidebar ?? <WatchlistSidebar />}
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}

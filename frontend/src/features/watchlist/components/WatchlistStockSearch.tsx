import { ChevronDown, Search } from "lucide-react";

type WatchlistStockSearchProps = {
  market?: string;
  className?: string;
  showMarketFilter?: boolean;
};

export function WatchlistStockSearch({
  market = "米国株",
  className = "",
  showMarketFilter = true,
}: WatchlistStockSearchProps) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col gap-3 sm:flex-row ${className}`}
    >
      <div className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-lg border border-slate-200 px-4 text-slate-400">
        <Search className="size-5" />
        銘柄検索
      </div>
      {showMarketFilter && (
        <button
          type="button"
          className="flex h-11 items-center justify-between rounded-lg border border-slate-200 px-5 sm:w-36"
        >
          {market}
          <ChevronDown className="size-4" />
        </button>
      )}
      <button
        type="button"
        className="h-11 rounded-lg border border-slate-200 px-7 font-semibold"
      >
        検索
      </button>
    </div>
  );
}

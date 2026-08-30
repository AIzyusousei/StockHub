type WatchlistPageTitleProps = { watchlistName?: string; dateText?: string };

export function WatchlistPageTitle({
  watchlistName = "",
  dateText = "2026-8-15（土）21:26（JST）",
}: WatchlistPageTitleProps) {
  return (
    <div className="flex items-center gap-5">
      <span className="h-11 w-1.5 shrink-0 rounded-full bg-[#246bfe]" />
      <div>
        <h1 className="whitespace-nowrap text-[29px] font-bold tracking-tight">
          ウォッチリスト{watchlistName}
        </h1>
        <p className="mt-1 text-[18px] text-slate-500">{dateText}</p>
      </div>
    </div>
  );
}

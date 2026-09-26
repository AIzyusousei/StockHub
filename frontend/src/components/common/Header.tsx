import { Bell, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { currentWeeklyWatchlistId } from "@/features/watchlist/mocks/watchlistCheck";

const navigation = [
  { key: "home", label: "ホーム", href: "/" },
  { key: "watchlist", label: "ウォッチリスト", href: "/watchlist" },
  { key: "indexes", label: "自作Index", href: "/indexes" },
  { key: "heatmap", label: "ヒートマップ", href: "/heatmap" },
  { key: "charts", label: "チャート", href: "/charts" },
  { key: "journal", label: "投資日記", href: "/journal" },
  { key: "screening", label: "スクリーニング", href: "/screening" },
];

type HeaderProps = {
  homeHref?: string;
  activeSection?: string;
  watchlistHref?: string;
  userId?: string;
};

export function Header({
  homeHref = "/",
  activeSection = "home",
  watchlistHref = "/watchlist",
  userId,
}: HeaderProps) {
  const resolvedWatchlistHref = userId
    ? `/${userId}/watchlist/${currentWeeklyWatchlistId}/watchlist-check`
    : watchlistHref;
  return (
    <header className="relative z-10 border-b border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,36,68,0.04)]">
      <div className="flex h-[82px] items-stretch gap-6 px-5 sm:px-8 lg:gap-10 lg:px-10">
        <Link
          href={homeHref}
          className="flex shrink-0 items-center text-[32px] font-bold tracking-[-0.055em] text-[#16335c] lg:text-[34px]"
        >
          StockHub
        </Link>
        <nav
          aria-label="メインナビゲーション"
          className="min-w-0 flex-1 overflow-x-auto lg:pl-16"
        >
          <ul className="flex h-full min-w-max items-stretch justify-start gap-7 lg:gap-12">
            {navigation.map((item) => {
              const active = item.key === activeSection;
              const href =
                item.key === "home"
                  ? homeHref
                  : item.key === "watchlist"
                    ? resolvedWatchlistHref
                    : item.href;
              return (
                <li key={item.key} className="flex items-stretch">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center border-b-[3px] px-1 pt-[3px] text-[15px] font-semibold whitespace-nowrap transition-colors lg:text-[16px] ${active ? "border-[#246bfe] text-[#246bfe]" : "border-transparent text-slate-600 hover:text-[#246bfe]"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-5 text-slate-500">
          <button
            type="button"
            aria-label="通知を開く"
            className="hidden rounded-full p-1 hover:bg-slate-100 sm:block"
          >
            <Bell className="size-7" strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="ユーザーメニューを開く"
            className="rounded-full"
          >
            <CircleUserRound
              className="size-10 text-slate-400"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

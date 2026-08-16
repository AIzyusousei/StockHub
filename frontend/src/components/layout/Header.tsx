import Link from "next/link";

const navigation = [
  { label: "ホーム", href: "/", active: true },
  { label: "ウォッチリスト", href: "/watchlist" },
  { label: "自作index", href: "/indexes" },
  { label: "ヒートマップ", href: "/heatmap" },
  { label: "チャート", href: "/charts" },
  { label: "投資日記", href: "/journal" },
  { label: "スクリーニング", href: "/screening" },
];

function NotificationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-7">
      <path
        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <span className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="size-9"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4.6 20a7.4 7.4 0 0 1 14.8 0A10 10 0 0 1 12 23a10 10 0 0 1-7.4-3Z" />
      </svg>
    </span>
  );
}

export function Header() {
  return (
    <header className="relative z-10 border-b border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,36,68,0.04)]">
      <div className="flex h-[82px] items-stretch gap-6 px-5 sm:px-8 lg:gap-10 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center text-[32px] font-bold tracking-[-0.055em] text-[#16335c] lg:text-[34px]"
        >
          StockHub
        </Link>

        <nav
          aria-label="メインナビゲーション"
          className="min-w-0 flex-1 overflow-x-auto lg:pl-16"
        >
          <ul className="flex h-full min-w-max items-stretch justify-start gap-7 lg:gap-12">
            {navigation.map((item) => (
              <li key={item.href} className="flex items-stretch">
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`flex items-center border-b-[3px] px-1 pt-[3px] text-[15px] font-semibold whitespace-nowrap transition-colors lg:text-[16px] ${
                    item.active
                      ? "border-[#246bfe] text-[#246bfe]"
                      : "border-transparent text-slate-600 hover:text-[#246bfe]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-5 text-slate-500">
          <button
            type="button"
            aria-label="通知を開く"
            className="hidden rounded-full p-1 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:block"
          >
            <NotificationIcon />
          </button>
          <button
            type="button"
            aria-label="ユーザーメニューを開く"
            className="rounded-full"
          >
            <UserIcon />
          </button>
        </div>
      </div>
    </header>
  );
}

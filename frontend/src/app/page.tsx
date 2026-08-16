import { Header } from "@/components/layout/Header";
import { MarketCard } from "@/components/market/MarketCard";
import { WeeklyWatchlist } from "@/components/watchlist/WeeklyWatchlist";
import { marketOverview } from "@/mocks/marketOverview";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f3f6fa] text-[#10294c]">
      <Header />
      <main className="mx-2 mb-2 flex-1 rounded-b-xl bg-white px-5 pb-9 pt-10 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1544px]">
          <section aria-labelledby="welcome-title">
            <div className="flex items-center gap-5">
              <span className="h-14 w-1.5 rounded-full bg-[#2c73ff] shadow-[0_0_10px_rgba(44,115,255,0.25)]" />
              <h1
                id="welcome-title"
                className="text-[29px] font-bold tracking-tight text-[#10294c] sm:text-[36px]"
              >
                StockHubへようこそ
              </h1>
            </div>
            <p className="ml-[26px] mt-3 text-[15px] font-medium text-slate-500 sm:text-[18px]">
              2026-8-15 (土) 21:26 (JST)
            </p>
          </section>

          <section aria-labelledby="market-overview-title" className="mt-8">
            <h2
              id="market-overview-title"
              className="mb-3 text-[20px] font-medium tracking-tight text-[#10294c]"
            >
              Market Overview
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-6">
              {marketOverview.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </section>
          <WeeklyWatchlist />
        </div>
      </main>
    </div>
  );
}

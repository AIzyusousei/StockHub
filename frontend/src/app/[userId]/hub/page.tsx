import { Header } from "@/components/layout/Header";
import { MarketCard } from "@/components/market/MarketCard";
import { WeeklyWatchlist } from "@/components/watchlist/WeeklyWatchlist";
import { fetchMarketOverview } from "@/lib/api/marketOverviewApi";
import { mapMarketOverviewItems } from "@/lib/mapper/marketOverviewMapper";
import type { MarketOverviewItem } from "@/types/marketOverview";

type HubPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function HubPage({ params }: HubPageProps) {
  const { userId } = await params;
  const welcomeTitleId = `${userId}-welcome-title`;
  const marketOverviewTitleId = `${userId}-market-overview-title`;
  let marketOverview: MarketOverviewItem[] = [];
  let marketOverviewLoadFailed = false;

  try {
    const response = await fetchMarketOverview();
    marketOverview = mapMarketOverviewItems(response);
  } catch (error) {
    console.error("Market Overview APIの取得に失敗しました。", error);
    marketOverviewLoadFailed = true;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f3f6fa] text-[#10294c]">
      <Header homeHref={`/${userId}/hub`} />
      <main className="mx-2 mb-2 flex-1 rounded-b-xl bg-white px-5 pb-9 pt-10 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1544px]">
          <section aria-labelledby={welcomeTitleId}>
            <div className="flex items-center gap-5">
              <span className="h-14 w-1.5 rounded-full bg-[#2c73ff] shadow-[0_0_10px_rgba(44,115,255,0.25)]" />
              <h1
                id={welcomeTitleId}
                className="text-3xl font-bold tracking-tight text-[#10294c] sm:text-4xl"
              >
                StockHubへようこそ
              </h1>
            </div>
            <p className="ml-[26px] mt-3 text-[15px] font-medium text-slate-500 sm:text-[18px]">
              2026-8-15 (土) 21:26 (JST)
            </p>
          </section>

          <section aria-labelledby={marketOverviewTitleId} className="mt-8">
            <h2
              id={marketOverviewTitleId}
              className="mb-3 text-xl font-medium tracking-tight text-[#10294c]"
            >
              Market Overview
            </h2>
            {marketOverviewLoadFailed ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                Backend
                APIから市場データを取得できませんでした。BackendとPostgreSQLの起動・接続設定を確認してください。
              </div>
            ) : marketOverview.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
                保存済みの市場データがありません。日次更新バッチを実行してください。
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-6">
                {marketOverview.map((market) => (
                  <MarketCard key={market.id} market={market} />
                ))}
              </div>
            )}
          </section>
          <WeeklyWatchlist />
        </div>
      </main>
    </div>
  );
}

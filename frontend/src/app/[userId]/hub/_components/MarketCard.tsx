import type { MarketOverviewItem } from "@/types/marketOverview";
import { CandlestickChart } from "./CandlestickChart";

type MarketCardProps = {
  market: MarketOverviewItem;
};

export function MarketCard({ market }: MarketCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white px-7 pb-5 pt-6 shadow-[0_8px_22px_rgba(15,36,68,0.08)] sm:px-8">
      <h3 className="text-[20px] font-bold tracking-tight text-[#10294c] sm:text-[22px]">
        {market.title}
      </h3>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-8 gap-y-1">
        <p className="text-[24px] font-semibold leading-none tracking-tight text-[#10294c] sm:text-[26px]">
          {market.value}
        </p>
        <p
          className={`text-[14px] font-semibold sm:text-[15px] ${
            market.direction === "up" ? "text-[#079348]" : "text-[#ef3535]"
          }`}
        >
          {market.change}&nbsp; {market.changeRate}
        </p>
      </div>
      <div className="mt-3">
        <CandlestickChart candles={market.candles} />
      </div>
    </article>
  );
}

import { Pencil } from "lucide-react";
import { weeklyWatchlist } from "@/mocks/weeklyWatchlist";
import { Sparkline } from "./Sparkline";

const formatChange = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

export function WeeklyWatchlist() {
  return (
    <section aria-labelledby="weekly-watchlist-title" className="mt-14 pb-4">
      <div className="mb-5 flex items-center gap-10">
        <h2
          id="weekly-watchlist-title"
          className="text-[20px] font-semibold text-[#10294c]"
        >
          This week
        </h2>
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-7 text-[15px] font-medium text-[#10294c] shadow-sm transition-colors hover:bg-slate-50"
        >
          <Pencil aria-hidden="true" className="size-4" strokeWidth={1.8} />
          リストを編集
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,36,68,0.08)]">
        <table className="w-full min-w-[980px] border-collapse text-left text-[#10294c]">
          <thead className="bg-slate-50/70">
            <tr className="h-[58px] border-b border-slate-200 text-[15px] font-semibold">
              <th scope="col" className="w-[14%] px-10">
                銘柄名
              </th>
              <th scope="col" className="w-[11%] px-5">
                価格
              </th>
              <th scope="col" className="w-[11%] px-5">
                前日比
              </th>
              <th scope="col" className="w-[11%] px-5">
                5日間比
              </th>
              <th scope="col" className="w-[24%] px-5">
                チャート概観
              </th>
              <th scope="col" className="px-5">
                メモ
              </th>
            </tr>
          </thead>
          <tbody>
            {weeklyWatchlist.map((item) => (
              <tr
                key={item.symbol}
                className="h-[88px] border-b border-slate-200 last:border-b-0"
              >
                <th
                  scope="row"
                  className="px-10 text-[15px] font-medium whitespace-nowrap"
                >
                  {item.symbol}
                </th>
                <td className="px-5 text-[15px] font-medium whitespace-nowrap">
                  {item.price}
                </td>
                <td
                  className={`px-5 text-[15px] font-medium ${item.dailyChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"}`}
                >
                  {formatChange(item.dailyChange)}
                </td>
                <td
                  className={`px-5 text-[15px] font-medium ${item.weeklyChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"}`}
                >
                  {formatChange(item.weeklyChange)}
                </td>
                <td className="px-5">
                  <Sparkline
                    values={item.trend}
                    positive={item.weeklyChange >= 0}
                  />
                </td>
                <td className="px-5 text-[14px] font-medium whitespace-nowrap">
                  {item.memo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

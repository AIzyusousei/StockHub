"use client";

import {
  CalendarDays,
  ChevronRight,
  FileText,
  List,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { WatchlistPageTitle } from "@/features/watchlist/components/WatchlistPageTitle";
import { WatchlistSidebar } from "@/features/watchlist/components/WatchlistSidebar";

const initialBaseLists = ["なんとなく注目テック", "memory & light"];
const savedLists = [
  "検索履歴ウォッチリスト",
  "#本日注目",
  "#明日注目",
  "なんとなく注目テック",
  "memory & light",
  "日本バリュー株",
  "セクター代表銘柄",
  "日本高配当",
  "米国成長株",
  "セクター別etf",
];

export default function CreateWatchlistPage() {
  const { userId } = useParams<{ userId: string }>();
  const [name, setName] = useState("宇宙");
  const [kind, setKind] = useState("temporary");
  const [baseLists, setBaseLists] = useState(initialBaseLists);
  const [created, setCreated] = useState(false);

  const addBaseList = () => {
    const next = savedLists.find((item) => !baseLists.includes(item));
    if (next) setBaseLists([...baseLists, next]);
  };

  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#10294c]">
      <Header
        activeSection="watchlist"
        userId={userId}
        homeHref={`/${userId}/hub`}
      />
      <main className="mx-2 mb-2 min-h-[calc(100vh-90px)] rounded-b-xl bg-white px-5 pb-12 pt-8 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10 lg:px-10">
        <div className="mx-auto max-w-[1580px]">
          <WatchlistPageTitle />
          <div className="hidden flex items-start justify-between">
            <div className="flex items-center gap-5">
              <span className="h-11 w-1.5 rounded-full bg-[#246bfe]" />
              <div>
                <h1 className="text-[29px] font-bold">ウォッチリスト</h1>
                <p className="mt-1 text-[18px] text-slate-500">
                  2026-8-15（土）21:26（JST）
                </p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-600 hover:bg-slate-50"
            >
              リスト作成をやめる
            </button>
          </div>
          <div className="mt-6 flex flex-col gap-8 xl:flex-row">
            <WatchlistSidebar permanent={savedLists} />
            <aside className="hidden w-full shrink-0 xl:w-[354px]">
              <div className="flex h-12 overflow-hidden rounded-lg border border-slate-200">
                <div className="flex flex-1 items-center gap-3 px-4 text-slate-500">
                  <Search className="size-5" />
                  リストを検索
                </div>
                <button type="button" className="bg-[#1760ed] px-5 text-white">
                  <Search className="size-5" />
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <SideTitle icon={<CalendarDays />} title="週次ウォッチリスト" />
                <div className="border-t border-slate-200 px-5 py-3">
                  <SideRow text="#26/08/17 week" />
                  <SideRow text="#26/08/10 week" />
                  <SideRow text="#26/08/03 week" />
                  <div className="mt-2 flex items-center justify-center gap-2 text-[#075cdf]">
                    もっと見る <ChevronRight className="size-4" />
                  </div>
                </div>
                <SideTitle icon={<List />} title="ウォッチリスト" />
                <div className="border-t border-slate-200 px-5 py-3">
                  {savedLists.map((item) => (
                    <SideRow key={item} text={item} />
                  ))}
                </div>
              </div>
            </aside>
            <section className="min-w-0 flex-1 rounded-xl border border-slate-200 p-7 shadow-[0_4px_14px_rgba(15,36,68,0.03)] lg:px-11 lg:py-10">
              <div className="grid max-w-[1080px] grid-cols-[150px_1fr] items-center gap-x-12 gap-y-10">
                <FieldLabel label="リスト名" required />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-14 rounded-lg border border-slate-300 px-5 text-xl outline-none focus:border-[#1760ed]"
                />
                <FieldLabel label="リスト種別" required />
                <div className="flex gap-10">
                  <Radio
                    label="一時的"
                    value="temporary"
                    checked={kind === "temporary"}
                    onChange={setKind}
                  />
                  <Radio
                    label="恒久的"
                    value="permanent"
                    checked={kind === "permanent"}
                    onChange={setKind}
                  />
                </div>
                <FieldLabel label="ベースリスト" />
                <div>
                  <p className="mb-4 text-slate-600">
                    既存のウォッチリストをベースとして利用できます。
                  </p>
                  <div className="space-y-3">
                    {baseLists.map((item) => (
                      <div
                        key={item}
                        className="flex h-16 items-center justify-between rounded-lg border border-slate-200 px-7 text-xl shadow-sm"
                      >
                        <span>{item}</span>
                        <button
                          type="button"
                          aria-label={`${item}を削除`}
                          onClick={() =>
                            setBaseLists(
                              baseLists.filter((base) => base !== item),
                            )
                          }
                          className="text-[#f52222]"
                        >
                          <Trash2 className="size-6" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addBaseList}
                      className="flex h-16 w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 text-lg font-semibold text-[#075cdf] hover:bg-blue-50"
                    >
                      <Plus className="size-6" />
                      ベースリストを追加
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-16 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCreated(true)}
                  disabled={!name.trim()}
                  className="h-16 w-full max-w-[470px] rounded-xl bg-[#1760ed] text-xl font-bold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {created ? "作成しました" : "リストを作成"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function SideTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <h2 className="flex items-center gap-3 px-5 py-4 font-semibold">
      <span className="text-[#1760ed]">{icon}</span>
      {title}
    </h2>
  );
}
function SideRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 py-1 text-[15px] text-slate-600">
      <FileText className="size-4 text-slate-500" />
      {text}
    </div>
  );
}
function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-xl font-semibold">
      {label}
      {required && (
        <span className="rounded border border-[#5d9aff] px-1.5 py-0.5 text-sm text-[#075cdf]">
          必須
        </span>
      )}
    </div>
  );
}
function Radio({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xl">
      <input
        type="radio"
        name="watchlist-kind"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-6 accent-[#1760ed]"
      />
      {label}
    </label>
  );
}

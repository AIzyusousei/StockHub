"use client";

import { Plus, Search, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/common/Header";
import { WatchlistPageTitle } from "@/features/watchlist/components/WatchlistPageTitle";
import { WatchlistSidebar } from "@/features/watchlist/components/WatchlistSidebar";
import {
  listId,
  useWatchlists,
} from "@/features/watchlist/components/WatchlistStore";

const initialBaseLists = ["なんとなく注目テック", "memory & light"];
export default function CreateWatchlistPage() {
  const { userId } = useParams<{ userId: string }>();
  const { state } = useWatchlists();
  const availableLists = [...state.weekly, ...state.permanent];
  const [name, setName] = useState("宇宙");
  const [kind, setKind] = useState("temporary");
  const [baseLists, setBaseLists] = useState(initialBaseLists);
  const [isListPickerOpen, setIsListPickerOpen] = useState(false);
  const [listSearch, setListSearch] = useState("");
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [created, setCreated] = useState(false);
  const listPickerButtonRef = useRef<HTMLButtonElement>(null);
  const listSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isListPickerOpen) listSearchRef.current?.focus();
  }, [isListPickerOpen]);

  const addBaseList = () => {
    setBaseLists((current) => [
      ...current,
      ...availableLists.filter(
        (item) =>
          selectedListIds.includes(listId(item)) && !current.includes(item),
      ),
    ]);
    setSelectedListIds([]);
    setListSearch("");
    setIsListPickerOpen(false);
    listPickerButtonRef.current?.focus();
  };

  const closeListPicker = () => {
    setSelectedListIds([]);
    setListSearch("");
    setIsListPickerOpen(false);
    listPickerButtonRef.current?.focus();
  };

  const toggleSelectedList = (id: string) => {
    setSelectedListIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  const matchesSearch = (item: string) =>
    item.toLocaleLowerCase().includes(listSearch.trim().toLocaleLowerCase());
  const visibleWeekly = state.weekly.filter(matchesSearch);
  const visiblePermanent = state.permanent.filter(matchesSearch);

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
            <WatchlistSidebar />
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
                      ref={listPickerButtonRef}
                      type="button"
                      onClick={() =>
                        isListPickerOpen
                          ? closeListPicker()
                          : setIsListPickerOpen(true)
                      }
                      aria-expanded={isListPickerOpen}
                      aria-controls="base-list-picker"
                      className="flex h-16 w-full items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 text-lg font-semibold text-[#075cdf] hover:bg-blue-50"
                    >
                      <Plus className="size-6" />
                      ベースリストを追加
                    </button>
                    {isListPickerOpen && (
                      <div
                        id="base-list-picker"
                        role="dialog"
                        aria-label="追加するベースリストを選択"
                        onKeyDown={(event) => {
                          if (event.key === "Escape") closeListPicker();
                        }}
                        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <label
                          htmlFor="base-list-search"
                          className="mb-2 block text-sm font-semibold"
                        >
                          追加するウォッチリストを選択
                        </label>
                        <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 focus-within:border-[#1760ed]">
                          <Search
                            className="size-4 text-slate-400"
                            aria-hidden="true"
                          />
                          <input
                            ref={listSearchRef}
                            id="base-list-search"
                            type="search"
                            value={listSearch}
                            onChange={(event) =>
                              setListSearch(event.target.value)
                            }
                            placeholder="リスト名で検索"
                            className="h-11 min-w-0 flex-1 outline-none"
                          />
                        </div>
                        <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-slate-200">
                          {(
                            [
                              ["週次ウォッチリスト", visibleWeekly],
                              ["ウォッチリスト", visiblePermanent],
                            ] as const
                          ).map(([groupName, lists]) =>
                            lists.length > 0 ? (
                              <div key={groupName}>
                                <h3 className="bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                                  {groupName}
                                </h3>
                                {lists.map((item) => {
                                  const id = listId(item);
                                  const alreadyAdded = baseLists.includes(item);
                                  return (
                                    <label
                                      key={id}
                                      className={`flex items-center gap-3 border-t border-slate-100 px-3 py-2 text-sm ${alreadyAdded ? "text-slate-400" : "cursor-pointer hover:bg-blue-50"}`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={
                                          alreadyAdded ||
                                          selectedListIds.includes(id)
                                        }
                                        disabled={alreadyAdded}
                                        onChange={() => toggleSelectedList(id)}
                                        className="size-4 accent-[#1760ed]"
                                      />
                                      <span className="min-w-0 flex-1 truncate">
                                        {item}
                                      </span>
                                      {alreadyAdded && <span>追加済み</span>}
                                    </label>
                                  );
                                })}
                              </div>
                            ) : null,
                          )}
                          {visibleWeekly.length === 0 &&
                            visiblePermanent.length === 0 && (
                              <p className="px-3 py-5 text-center text-sm text-slate-500">
                                一致するウォッチリストはありません。
                              </p>
                            )}
                        </div>
                        <div className="mt-4 flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={closeListPicker}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold"
                          >
                            キャンセル
                          </button>
                          <button
                            type="button"
                            onClick={addBaseList}
                            disabled={selectedListIds.length === 0}
                            className="rounded-lg bg-[#1760ed] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                          >
                            選択した{selectedListIds.length}件を追加
                          </button>
                        </div>
                      </div>
                    )}
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

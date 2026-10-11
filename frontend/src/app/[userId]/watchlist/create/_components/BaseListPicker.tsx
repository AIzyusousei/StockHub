"use client";

import { Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  listId,
  useWatchlists,
} from "@/features/watchlist/components/WatchlistStore";

export function BaseListPicker({
  baseLists,
  onChange,
}: {
  baseLists: string[];
  onChange: (lists: string[]) => void;
}) {
  const { state } = useWatchlists();
  const availableLists = [...state.weekly, ...state.permanent];
  const [isListPickerOpen, setIsListPickerOpen] = useState(false);
  const [listSearch, setListSearch] = useState("");
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const listPickerButtonRef = useRef<HTMLButtonElement>(null);
  const listSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isListPickerOpen) listSearchRef.current?.focus();
  }, [isListPickerOpen]);

  const addBaseList = () => {
    onChange([
      ...baseLists,
      ...availableLists.filter(
        (item) =>
          selectedListIds.includes(listId(item)) && !baseLists.includes(item),
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
                onChange(baseLists.filter((base) => base !== item))
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
            isListPickerOpen ? closeListPicker() : setIsListPickerOpen(true)
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
              <Search className="size-4 text-slate-400" aria-hidden="true" />
              <input
                ref={listSearchRef}
                id="base-list-search"
                type="search"
                value={listSearch}
                onChange={(event) => setListSearch(event.target.value)}
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
                              alreadyAdded || selectedListIds.includes(id)
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
              {visibleWeekly.length === 0 && visiblePermanent.length === 0 && (
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
  );
}

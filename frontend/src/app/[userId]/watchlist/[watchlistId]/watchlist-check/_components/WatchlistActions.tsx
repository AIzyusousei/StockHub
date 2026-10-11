"use client";

import { Clock3, Plus, Trash2 } from "lucide-react";

export function WatchlistActions() {
  return (
    <div className="flex shrink-0 flex-col gap-2 xl:w-[190px]">
      <button
        type="button"
        className="flex h-11 items-center justify-center rounded-lg bg-[#1760ed] font-semibold text-white"
      >
        <Plus className="mr-2 size-5" />
        リストを追加
      </button>
      <button
        type="button"
        className="flex h-11 items-center justify-center rounded-lg border border-slate-200 font-semibold text-[#f52222]"
      >
        <Trash2 className="mr-2 size-5" />
        リストを削除
      </button>
      <button
        type="button"
        className="flex h-11 items-center justify-center rounded-lg border border-slate-200 font-semibold"
      >
        <Clock3 className="mr-2 size-5" />
        リストを一時化
      </button>
    </div>
  );
}

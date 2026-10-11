"use client";

import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  History,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type DragEvent, useState } from "react";
import {
  listId,
  useWatchlists,
  type WatchlistGroup,
} from "@/features/watchlist/components/WatchlistStore";
import {
  hasWatchlistDrag,
  readWatchlistDrag,
  startWatchlistDrag,
} from "@/features/watchlist/components/watchlistDrag";

export function WatchlistSidebar() {
  const { userId, watchlistId } = useParams<{
    userId: string;
    watchlistId?: string;
  }>();
  const { state, copyStock, copyListStocks, reorderLists } = useWatchlists();
  const [draggedList, setDraggedList] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    id: string;
    mode: "copy" | "before" | "after";
  } | null>(null);

  const dropMode = (event: DragEvent, id: string, group: WatchlistGroup) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const sameGroup = state[group].some((name) => listId(name) === draggedList);
    if (!draggedList || draggedList === id || !sameGroup) return "copy";
    if (event.clientY < rect.top + rect.height * 0.25) return "before";
    if (event.clientY > rect.bottom - rect.height * 0.25) return "after";
    return "copy";
  };
  const onDragOver = (event: DragEvent, id: string, group: WatchlistGroup) => {
    if (!hasWatchlistDrag(event)) return;
    event.preventDefault();
    const mode = dropMode(event, id, group);
    event.dataTransfer.dropEffect = mode === "copy" ? "copy" : "move";
    setDropTarget({ id, mode });
  };
  const onDrop = (event: DragEvent, id: string, group: WatchlistGroup) => {
    event.preventDefault();
    const drag = readWatchlistDrag(event);
    const mode = dropMode(event, id, group);
    if (drag?.kind === "stock") copyStock(drag.sourceId, drag.symbol, id);
    if (drag?.kind === "list") {
      if (mode !== "copy")
        reorderLists(drag.sourceId, id, group, mode === "after");
      else copyListStocks(drag.sourceId, id);
    }
    setDropTarget(null);
    setDraggedList(null);
  };

  const rows = (names: string[], group: WatchlistGroup) =>
    names.map((name) => {
      const id = listId(name);
      return (
        // Native drag events are attached to the whole watchlist row.
        // biome-ignore lint/a11y/noStaticElementInteractions: native drag target
        <div
          key={id}
          draggable
          onDragStart={(event) => {
            setDraggedList(id);
            startWatchlistDrag(event, { kind: "list", sourceId: id });
          }}
          onDragEnd={() => {
            setDraggedList(null);
            setDropTarget(null);
          }}
          onDragOver={(event) => onDragOver(event, id, group)}
          onDrop={(event) => onDrop(event, id, group)}
          className={`cursor-grab rounded px-2 py-1 text-[15px] text-slate-600 active:cursor-grabbing ${
            dropTarget?.id === id
              ? dropTarget.mode === "before"
                ? "border-t-2 border-[#1760ed]"
                : dropTarget.mode === "after"
                  ? "border-b-2 border-[#1760ed]"
                  : "bg-blue-100 ring-1 ring-[#1760ed]"
              : ""
          }`}
          title="上下端にドロップで並べ替え、中央にドロップで銘柄をコピー"
        >
          <Link
            draggable={false}
            href={`/${userId}/watchlist/${encodeURIComponent(id)}/watchlist-check`}
            className={`block truncate hover:text-[#075cdf] ${watchlistId === id ? "font-semibold text-[#075cdf]" : ""}`}
          >
            {name}
          </Link>
        </div>
      );
    });

  return (
    <aside className="w-full shrink-0 xl:w-[300px]">
      <div className="flex h-12 overflow-hidden rounded-lg border border-slate-200">
        <div className="flex flex-1 items-center gap-3 px-4 text-slate-400">
          <Search className="size-5" />
          リストを検索
        </div>
        <button
          type="button"
          className="border-l border-slate-200 px-4 font-semibold"
        >
          <Search className="mr-2 inline size-4" />
          検索
        </button>
      </div>
      <SideCard icon={<CalendarDays />} title="週次ウォッチリスト">
        {rows(state.weekly, "weekly")}
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          もっと見る <ChevronRight className="size-4" />
        </div>
      </SideCard>
      <SideCard icon={<Bookmark />} title="ウォッチリスト">
        {rows(state.permanent, "permanent")}
      </SideCard>
      <SideCard icon={<History />} title="検索履歴ウォッチリスト">
        <p className="pl-2 text-sm text-slate-500">
          最近の検索履歴（最大20件）
        </p>
      </SideCard>
    </aside>
  );
}

function SideCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 p-4">
      <h2 className="mb-2 flex items-center gap-3 font-semibold">
        <span className="text-[#1760ed]">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

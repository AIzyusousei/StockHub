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
  const { state, copyStock, moveList } = useWatchlists();
  const [draggedList, setDraggedList] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    id: string;
    mode: "copy" | "before" | "after";
  } | null>(null);

  const dropMode = (event: DragEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!draggedList) return "copy";
    return event.clientY > rect.top + rect.height / 2 ? "after" : "before";
  };
  const onDragOver = (event: DragEvent, id: string) => {
    if (!hasWatchlistDrag(event)) return;
    event.preventDefault();
    const mode = dropMode(event);
    event.dataTransfer.dropEffect = mode === "copy" ? "copy" : "move";
    setDropTarget({ id, mode });
  };
  const onDrop = (event: DragEvent, id: string, group: WatchlistGroup) => {
    event.preventDefault();
    const drag = readWatchlistDrag(event);
    const mode = dropMode(event);
    if (drag?.kind === "stock") copyStock(drag.sourceId, drag.symbol, id);
    if (drag?.kind === "list") {
      moveList(drag.sourceId, id, group, mode === "after");
    }
    setDropTarget(null);
    setDraggedList(null);
  };

  const rows = (names: string[], group: WatchlistGroup) =>
    names.map((name, index) => {
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
          onDragOver={(event) => onDragOver(event, id)}
          onDrop={(event) => onDrop(event, id, group)}
          className={`cursor-grab px-2 py-1.5 text-[15px] text-slate-600 active:cursor-grabbing ${
            dropTarget?.id === id
              ? dropTarget.mode === "before"
                ? "border-t-[5px] border-t-[#075cdf]"
                : dropTarget.mode === "after"
                  ? "border-b-[5px] border-b-[#075cdf]"
                  : "bg-blue-100 ring-1 ring-[#1760ed]"
              : index < names.length - 1
                ? "border-b border-slate-200/70"
                : ""
          }`}
          title="ウォッチリストを移動、銘柄をコピー"
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
      <SideCard
        icon={<Bookmark />}
        title="ウォッチリスト"
        action={
          <Link
            href={`/${userId}/watchlist/create`}
            className="rounded-md border border-[#1760ed] px-3 py-1 text-sm font-semibold text-[#075cdf] hover:bg-blue-50"
          >
            作成
          </Link>
        }
      >
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
  action,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 font-semibold">
          <span className="text-[#1760ed]">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

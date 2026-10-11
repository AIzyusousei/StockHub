"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { ColumnResizeHandle } from "@/features/watchlist/components/ColumnResizeHandle";
import { useResizableStockColumns } from "@/features/watchlist/hooks/useResizableStockColumns";
import type { WatchlistCheckItem } from "@/features/watchlist/mocks/watchlistCheck";
import {
  hasWatchlistDrag,
  readWatchlistDrag,
  startWatchlistDrag,
} from "@/features/watchlist/utils/watchlistDrag";

const changeText = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
const columnLabels = [
  "銘柄名",
  "価格",
  "前日比",
  "5日前比",
  "PEG",
  "決算日",
  "メモ",
  "操作",
];
const minimumColumnWidths = [120, 90, 90, 90, 70, 120, 170, 60];
type SortState = { column: number; direction: "asc" | "desc" } | null;

function compareStocks(
  first: WatchlistCheckItem,
  second: WatchlistCheckItem,
  column: number,
) {
  if (column === 0) return first.symbol.localeCompare(second.symbol, "ja");
  if (column === 1) {
    const price = (value: string) => Number(value.replace(/[^0-9.-]/g, ""));
    return price(first.price) - price(second.price);
  }
  if (column === 2) return first.dailyChange - second.dailyChange;
  if (column === 3) return first.fiveDayChange - second.fiveDayChange;
  if (column === 4) return Number(first.peg) - Number(second.peg);
  if (column === 5)
    return first.earningsDate.localeCompare(second.earningsDate);
  return first.memo.localeCompare(second.memo, "ja");
}

export function StockTable({
  items,
  selected,
  userId,
  watchlistId,
  onSelect,
  onDrop,
  onDelete,
}: {
  items: WatchlistCheckItem[];
  selected: string;
  userId: string;
  watchlistId: string;
  onSelect: (symbol: string) => void;
  onDrop: (source: string, target: string, after: boolean) => void;
  onDelete: (symbol: string) => void;
}) {
  const [dragged, setDragged] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    symbol: string;
    after: boolean;
  } | null>(null);
  const [sort, setSort] = useState<SortState>(null);
  const storageKey = `stockhub-watchlist-column-widths-${userId}`;
  const columns = useResizableStockColumns(storageKey, minimumColumnWidths);
  const { columnWidths, tableRef, tableWidth } = columns;
  const sortedItems = sort
    ? [...items].sort((first, second) => {
        const result = compareStocks(first, second, sort.column);
        return sort.direction === "asc" ? result : -result;
      })
    : items;
  const toggleSort = (column: number) => {
    setSort((current) => {
      if (current?.column !== column) return { column, direction: "asc" };
      if (current.direction === "asc") return { column, direction: "desc" };
      return null;
    });
  };

  return (
    <div className="overflow-x-auto">
      {sort && (
        <button
          type="button"
          onClick={() => setSort(null)}
          className="mb-2 text-sm font-semibold text-[#075cdf] hover:underline"
        >
          並び替えを解除して手動順に戻す
        </button>
      )}
      <div
        className="overflow-hidden rounded-xl border border-slate-200"
        style={
          tableWidth
            ? { width: tableWidth + 2 }
            : { width: "100%", minWidth: 1000 }
        }
      >
        <table
          ref={tableRef}
          className={
            columnWidths ? "table-fixed text-left" : "w-full text-left"
          }
          style={tableWidth ? { width: tableWidth } : undefined}
        >
          {columnWidths && (
            <colgroup>
              {columnWidths.map((width, index) => (
                <col key={columnLabels[index]} style={{ width }} />
              ))}
            </colgroup>
          )}
          <thead className="bg-slate-50">
            <tr className="h-12 text-sm font-semibold">
              {columnLabels.map((label, index) => (
                <th
                  key={label}
                  scope="col"
                  aria-label={
                    index === columnLabels.length - 1 ? label : undefined
                  }
                  aria-sort={
                    sort?.column === index
                      ? sort.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`relative pr-4 ${index === 0 ? "pl-5" : "pl-4"} ${index === columnLabels.length - 1 && !columnWidths ? "w-16" : ""}`}
                >
                  {index < columnLabels.length - 1 && (
                    <button
                      type="button"
                      onClick={() => toggleSort(index)}
                      title="クリックで昇順・降順・手動順を切り替え"
                      className="inline-flex items-center gap-1 whitespace-nowrap hover:text-[#075cdf]"
                    >
                      {label}
                      <span aria-hidden="true" className="text-[#1760ed]">
                        {sort?.column === index
                          ? sort.direction === "asc"
                            ? "▲"
                            : "▼"
                          : ""}
                      </span>
                    </button>
                  )}
                  <ColumnResizeHandle
                    label={label}
                    index={index}
                    columns={columns}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr
                key={item.symbol}
                draggable={!sort}
                title={
                  sort
                    ? "手動で並べ替えるには列の並び替えを解除してください"
                    : undefined
                }
                onDragStart={(event) => {
                  setDragged(item.symbol);
                  startWatchlistDrag(event, {
                    kind: "stock",
                    sourceId: watchlistId,
                    symbol: item.symbol,
                  });
                }}
                onDragEnd={() => {
                  setDragged(null);
                  setDropTarget(null);
                }}
                onDragOver={(event) => {
                  if (sort || !hasWatchlistDrag(event)) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  const rect = event.currentTarget.getBoundingClientRect();
                  setDropTarget({
                    symbol: item.symbol,
                    after: event.clientY > rect.top + rect.height / 2,
                  });
                }}
                onDrop={(event) => {
                  if (sort) return;
                  event.preventDefault();
                  const drag = readWatchlistDrag(event);
                  if (drag?.kind === "stock" && drag.sourceId === watchlistId) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    onDrop(
                      drag.symbol,
                      item.symbol,
                      event.clientY > rect.top + rect.height / 2,
                    );
                  }
                  setDropTarget(null);
                }}
                className={`h-[66px] border-t border-slate-200 ${sort ? "" : "cursor-grab active:cursor-grabbing"} ${dragged === item.symbol ? "opacity-50" : ""} ${dropTarget?.symbol === item.symbol ? (dropTarget.after ? "border-b-2 border-b-[#1760ed]" : "border-t-2 border-t-[#1760ed]") : ""}`}
              >
                <th className="px-5 font-semibold text-[#075cdf]">
                  <button
                    type="button"
                    onClick={() => onSelect(item.symbol)}
                    className={selected === item.symbol ? "underline" : ""}
                  >
                    {item.symbol}
                  </button>
                </th>
                <td className="px-4">{item.price}</td>
                <td
                  className={`px-4 ${item.dailyChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"}`}
                >
                  {changeText(item.dailyChange)}
                </td>
                <td
                  className={`px-4 ${item.fiveDayChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"}`}
                >
                  {changeText(item.fiveDayChange)}
                </td>
                <td className="px-4">{item.peg}</td>
                <td className="px-4">{item.earningsDate}</td>
                <td className="px-4">{item.memo}</td>
                <td className="px-4 text-center">
                  <button
                    type="button"
                    aria-label={`${item.symbol}を削除`}
                    onClick={() => onDelete(item.symbol)}
                    className="text-[#f52222]"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

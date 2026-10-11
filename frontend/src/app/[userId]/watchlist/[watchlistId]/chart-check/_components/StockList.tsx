"use client";

import { useState } from "react";
import { ColumnResizeHandle } from "@/features/watchlist/components/ColumnResizeHandle";
import { WatchlistStockSearch } from "@/features/watchlist/components/WatchlistStockSearch";
import { useResizableStockColumns } from "@/features/watchlist/hooks/useResizableStockColumns";
import type { WatchlistCheckItem } from "@/features/watchlist/mocks/watchlistCheck";
import {
  hasWatchlistDrag,
  readWatchlistDrag,
  startWatchlistDrag,
} from "@/features/watchlist/utils/watchlistDrag";

const stockColumnLabels = ["銘柄名", "前日比", "5日前比"];
const minimumStockColumnWidths = [140, 110, 110];

export function StockList({
  items,
  userId,
  watchlistId,
  selected,
  onSelect,
  onReorder,
}: {
  items: WatchlistCheckItem[];
  userId: string;
  watchlistId: string;
  selected: string;
  onSelect: (symbol: string) => void;
  onReorder: (source: string, target: string, after: boolean) => void;
}) {
  const [dropTarget, setDropTarget] = useState<{
    symbol: string;
    after: boolean;
  } | null>(null);
  const columns = useResizableStockColumns(
    `stockhub-chart-check-column-widths-${userId}`,
    minimumStockColumnWidths,
  );
  const { columnWidths, tableRef, tableWidth } = columns;
  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200">
      <div className="border-b border-slate-200 p-3">
        <WatchlistStockSearch showMarketFilter={false} />
      </div>
      <div className="overflow-x-auto">
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
                <col key={stockColumnLabels[index]} style={{ width }} />
              ))}
            </colgroup>
          )}
          <thead className="bg-slate-50 text-sm">
            <tr className="h-12">
              {stockColumnLabels.map((label, index) => (
                <th key={label} scope="col" className="relative px-4">
                  {label}
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
            {items.map((row) => (
              <tr
                key={row.symbol}
                draggable
                onDragStart={(event) =>
                  startWatchlistDrag(event, {
                    kind: "stock",
                    sourceId: watchlistId,
                    symbol: row.symbol,
                  })
                }
                onDragEnd={() => setDropTarget(null)}
                onDragOver={(event) => {
                  if (!hasWatchlistDrag(event)) return;
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  const rect = event.currentTarget.getBoundingClientRect();
                  setDropTarget({
                    symbol: row.symbol,
                    after: event.clientY > rect.top + rect.height / 2,
                  });
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  const drag = readWatchlistDrag(event);
                  if (drag?.kind === "stock" && drag.sourceId === watchlistId) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    onReorder(
                      drag.symbol,
                      row.symbol,
                      event.clientY > rect.top + rect.height / 2,
                    );
                  }
                  setDropTarget(null);
                }}
                className={`h-[66px] border-t border-slate-200 active:cursor-grabbing ${selected === row.symbol ? "bg-blue-50 ring-1 ring-inset ring-[#7faeff]" : ""} ${dropTarget?.symbol === row.symbol ? (dropTarget.after ? "border-b-2 border-b-[#1760ed]" : "border-t-2 border-t-[#1760ed]") : ""}`}
              >
                <th scope="row" className="p-0">
                  <button
                    type="button"
                    onClick={() => onSelect(row.symbol)}
                    className="flex h-[66px] w-full cursor-pointer items-center px-4 text-left font-semibold text-[#075cdf]"
                  >
                    {row.symbol}
                  </button>
                </th>
                <td
                  className={
                    row.dailyChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"
                  }
                >
                  <button
                    type="button"
                    aria-label={`${row.symbol}のチャートを表示`}
                    onClick={() => onSelect(row.symbol)}
                    className="flex h-[66px] w-full cursor-pointer items-center px-4 text-left"
                  >
                    {row.dailyChange > 0 ? "+" : ""}
                    {row.dailyChange.toFixed(1)}%
                  </button>
                </td>
                <td
                  className={
                    row.fiveDayChange >= 0 ? "text-[#009c50]" : "text-[#ff3131]"
                  }
                >
                  <button
                    type="button"
                    aria-label={`${row.symbol}のチャートを表示`}
                    onClick={() => onSelect(row.symbol)}
                    className="flex h-[66px] w-full cursor-pointer items-center px-4 text-left"
                  >
                    {row.fiveDayChange > 0 ? "+" : ""}
                    {row.fiveDayChange.toFixed(1)}%
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

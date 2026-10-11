"use client";

import type { useResizableStockColumns } from "@/features/watchlist/hooks/useResizableStockColumns";

export function ColumnResizeHandle({
  label,
  index,
  columns,
}: {
  label: string;
  index: number;
  columns: ReturnType<typeof useResizableStockColumns>;
}) {
  return (
    <button
      type="button"
      aria-label={`${label}列の幅を変更`}
      title="ドラッグして列幅を変更。ダブルクリックで幅をリセット"
      onPointerDown={(event) => columns.onPointerDown(index, event)}
      onPointerMove={(event) => columns.onPointerMove(index, event)}
      onPointerUp={columns.onPointerUp}
      onPointerCancel={columns.onPointerCancel}
      onKeyDown={(event) => columns.onKeyDown(index, event)}
      onDoubleClick={columns.reset}
      className="group absolute -right-1 top-0 flex h-full w-3 cursor-col-resize touch-none items-center justify-center"
    >
      <span className="h-5 w-px bg-slate-300 group-hover:w-0.5 group-hover:bg-[#1760ed]" />
    </button>
  );
}

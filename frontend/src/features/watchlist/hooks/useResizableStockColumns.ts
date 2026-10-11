"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

export function useResizableStockColumns(
  storageKey: string,
  minimumWidths: number[],
) {
  const [columnWidths, setColumnWidths] = useState<number[] | null>(null);
  const [loadedStorageKey, setLoadedStorageKey] = useState<string | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const resizeStart = useRef<{
    index: number;
    x: number;
    width: number;
    widths: number[];
  } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const widths: unknown = saved ? JSON.parse(saved) : null;
      if (
        Array.isArray(widths) &&
        widths.length === minimumWidths.length &&
        widths.every(
          (width, index) =>
            typeof width === "number" &&
            Number.isFinite(width) &&
            width >= minimumWidths[index],
        )
      ) {
        setColumnWidths(widths);
      } else {
        setColumnWidths(null);
      }
    } catch {
      setColumnWidths(null);
    }
    setLoadedStorageKey(storageKey);
  }, [storageKey, minimumWidths]);

  useEffect(() => {
    if (loadedStorageKey !== storageKey) return;
    try {
      if (columnWidths) {
        localStorage.setItem(storageKey, JSON.stringify(columnWidths));
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch {
      // Keep resizing available when browser storage is unavailable.
    }
  }, [columnWidths, loadedStorageKey, storageKey]);

  const measuredWidths = () =>
    Array.from(tableRef.current?.querySelectorAll("thead th") ?? []).map(
      (cell) => Math.round(cell.getBoundingClientRect().width),
    );
  const setColumnWidth = (widths: number[], index: number, width: number) => {
    const next = [...widths];
    next[index] = Math.max(minimumWidths[index], Math.round(width));
    setColumnWidths(next);
  };

  const onPointerDown = (
    index: number,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const widths = columnWidths ?? measuredWidths();
    if (widths.length !== minimumWidths.length) return;
    resizeStart.current = {
      index,
      x: event.clientX,
      width: widths[index],
      widths,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (
    index: number,
    event: PointerEvent<HTMLButtonElement>,
  ) => {
    const start = resizeStart.current;
    if (!start || start.index !== index) return;
    setColumnWidth(start.widths, index, start.width + event.clientX - start.x);
  };
  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    resizeStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const onKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const widths = columnWidths ?? measuredWidths();
    if (widths.length !== minimumWidths.length) return;
    setColumnWidth(
      widths,
      index,
      widths[index] + (event.key === "ArrowRight" ? 10 : -10),
    );
  };

  return {
    columnWidths,
    tableRef,
    tableWidth: columnWidths?.reduce((sum, width) => sum + width, 0),
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: () => {
      resizeStart.current = null;
    },
    onKeyDown,
    reset: () => setColumnWidths(null),
  };
}

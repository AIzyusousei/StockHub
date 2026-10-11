import type { DragEvent } from "react";

export type WatchlistDrag =
  | { kind: "stock"; sourceId: string; symbol: string }
  | { kind: "list"; sourceId: string };

const dragType = "application/x-stockhub-watchlist";

export function startWatchlistDrag(event: DragEvent, data: WatchlistDrag) {
  event.dataTransfer.setData(dragType, JSON.stringify(data));
  event.dataTransfer.effectAllowed = "copyMove";
}

export function readWatchlistDrag(event: DragEvent): WatchlistDrag | null {
  try {
    const value = JSON.parse(event.dataTransfer.getData(dragType));
    if (typeof value.sourceId !== "string") return null;
    if (value.kind === "list") return value;
    if (value.kind === "stock" && typeof value.symbol === "string")
      return value;
  } catch {
    return null;
  }
  return null;
}

export function hasWatchlistDrag(event: DragEvent) {
  return Array.from(event.dataTransfer.types).includes(dragType);
}

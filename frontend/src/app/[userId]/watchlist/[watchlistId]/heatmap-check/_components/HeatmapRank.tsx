"use client";

import type { HeatmapItem } from "@/features/watchlist/mocks/heatmapCheck";
import { formatChange } from "../_utils/formatChange";

export function HeatmapRank({
  title,
  items,
  green = false,
}: {
  title: string;
  items: HeatmapItem[];
  green?: boolean;
}) {
  return (
    <div className="mt-4">
      <h3
        className={`font-semibold ${green ? "text-green-700" : "text-red-600"}`}
      >
        {title}
      </h3>
      {items.map((item, index) => (
        <div key={item.name} className="flex justify-between py-1 text-sm">
          <span>
            {index + 1}　{item.name}
          </span>
          <span className={green ? "text-green-700" : "text-red-600"}>
            {formatChange(item.change)}
          </span>
        </div>
      ))}
    </div>
  );
}

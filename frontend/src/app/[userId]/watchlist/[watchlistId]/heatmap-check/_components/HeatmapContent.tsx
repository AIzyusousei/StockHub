"use client";

import { formatChange } from "../_utils/formatChange";

const colorFor = (change: number) =>
  change >= 0
    ? `rgb(${Math.max(50, 210 - change * 32)}, ${Math.min(190, 175 + change * 15)}, ${Math.max(75, 125 - change * 12)})`
    : `rgb(${Math.min(255, 235 + Math.abs(change) * 8)}, ${Math.max(110, 190 - Math.abs(change) * 25)}, ${Math.max(125, 190 - Math.abs(change) * 10)})`;

export function HeatmapContent({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  name = "",
  change = 0,
}: {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  change?: number;
}) {
  if (width < 4 || height < 4) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={4}
        fill={colorFor(change)}
        stroke="#fff"
        strokeWidth={3}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 - 4}
        textAnchor="middle"
        fill={Math.abs(change) > 1.8 ? "#fff" : "#10294c"}
        fontSize={Math.min(18, Math.max(10, width / 9))}
        fontWeight="600"
      >
        {name}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 18}
        textAnchor="middle"
        fill={Math.abs(change) > 1.8 ? "#fff" : "#10294c"}
        fontSize={Math.min(16, Math.max(10, width / 10))}
      >
        {formatChange(change)}
      </text>
    </g>
  );
}

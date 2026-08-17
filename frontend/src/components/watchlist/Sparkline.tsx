"use client";

import { Line, LineChart, ReferenceLine, YAxis } from "recharts";

type SparklineProps = {
  values: number[];
  positive: boolean;
};

export function Sparkline({ values, positive }: SparklineProps) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const padding = (max - min) * 0.12 || 1;
  const data = values.map((value, index) => ({ index, value }));

  return (
    <div
      role="img"
      aria-label={positive ? "上昇トレンド" : "下降トレンド"}
      className="h-12 w-[210px]"
    >
      <LineChart
        width={210}
        height={48}
        data={data}
        margin={{ top: 3, right: 1, bottom: 3, left: 1 }}
      >
        <YAxis hide domain={[min - padding, max + padding]} />
        <ReferenceLine
          y={min - padding * 0.65}
          stroke="#d8e1ec"
          strokeDasharray="3 3"
        />
        <Line
          type="linear"
          dataKey="value"
          stroke={positive ? "#06a653" : "#ff3535"}
          strokeWidth={1.8}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </div>
  );
}

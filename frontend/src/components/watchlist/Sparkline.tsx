type SparklineProps = {
  values: number[];
  positive: boolean;
};

export function Sparkline({ values, positive }: SparklineProps) {
  const width = 210;
  const height = 48;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - 5 - ((value - min) / range) * (height - 10);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={positive ? "上昇トレンド" : "下降トレンド"}
      className="h-12 w-[210px]"
    >
      <line
        x1="0"
        x2={width}
        y1={height - 4}
        y2={height - 4}
        stroke="#d8e1ec"
        strokeDasharray="3 3"
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#06a653" : "#ff3535"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

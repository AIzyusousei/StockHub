import type { MarketCandle } from "@/mocks/marketOverview";

type CandlestickChartProps = {
  candles: MarketCandle[];
  ticks: string[];
};

const PLOT_LEFT = 6;
const PLOT_RIGHT = 397;
const PLOT_TOP = 10;
const PLOT_BOTTOM = 135;

export function CandlestickChart({ candles, ticks }: CandlestickChartProps) {
  const values = candles.flatMap(({ high, low }) => [high, low]);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const padding = (dataMax - dataMin) * 0.08 || 1;
  const min = dataMin - padding;
  const max = dataMax + padding;
  const xStep = (PLOT_RIGHT - PLOT_LEFT) / Math.max(candles.length - 1, 1);
  const candleWidth = Math.max(3, Math.min(6, xStep * 0.58));
  const y = (value: number) =>
    PLOT_TOP + ((max - value) / (max - min)) * (PLOT_BOTTOM - PLOT_TOP);
  const labels = ["6/16", "6/30", "7/15", "7/31", "8/15"];

  return (
    <svg
      viewBox="0 0 460 175"
      role="img"
      aria-label="日足ローソク足チャート"
      className="h-auto w-full overflow-visible"
    >
      {ticks.map((tick, index) => {
        const gridY = PLOT_TOP + (index * (PLOT_BOTTOM - PLOT_TOP)) / 3;
        return (
          <g key={tick}>
            <line
              x1="0"
              x2={PLOT_RIGHT + 2}
              y1={gridY}
              y2={gridY}
              stroke="#dbe3ee"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text
              x="452"
              y={gridY + 4}
              textAnchor="end"
              className="fill-slate-500 text-[12px]"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {candles.map((candle, index) => {
        const x = PLOT_LEFT + index * xStep;
        const rising = candle.close >= candle.open;
        const color = rising ? "#10a987" : "#ef4e3a";
        const bodyTop = Math.min(y(candle.open), y(candle.close));
        const bodyHeight = Math.max(
          2,
          Math.abs(y(candle.close) - y(candle.open)),
        );

        return (
          <g key={`${candle.close}-${index}`}>
            <line
              x1={x}
              x2={x}
              y1={y(candle.high)}
              y2={y(candle.low)}
              stroke={color}
              strokeWidth="1.2"
            />
            <rect
              x={x - candleWidth / 2}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              rx="0.7"
              fill={color}
            />
          </g>
        );
      })}

      {labels.map((label, index) => (
        <text
          key={label}
          x={PLOT_LEFT + (index * (PLOT_RIGHT - PLOT_LEFT)) / 4}
          y="168"
          textAnchor={index === 0 ? "start" : index === 4 ? "end" : "middle"}
          className="fill-slate-500 text-[12px]"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

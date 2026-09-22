import type { MarketCandle } from "@/types/marketOverview";

export type ChartCheckData = {
  candles: MarketCandle[];
  volumes: { date: string; value: number; up: boolean }[];
};

function createChartData(seed: number): ChartCheckData {
  let close = 96 + seed;
  const candles: MarketCandle[] = [];
  const volumes: ChartCheckData["volumes"] = [];
  for (let index = 0; index < 65; index += 1) {
    const date = new Date(Date.UTC(2026, 5, 15 + index))
      .toISOString()
      .slice(0, 10);
    const open = close;
    close = Math.max(70, close + Math.sin(index * 0.65 + seed) * 2.6 + 0.55);
    const high = Math.max(open, close) + 1.2 + (index % 3) * 0.4;
    const low = Math.min(open, close) - 1.1 - (index % 2) * 0.3;
    candles.push({ date, open, high, low, close });
    volumes.push({
      date,
      value:
        90 +
        Math.round(Math.abs(Math.sin(index * 1.4 + seed)) * 220) +
        (index === 51 ? 130 : 0),
      up: close >= open,
    });
  }
  return { candles, volumes };
}

export const chartCheckData: Record<string, ChartCheckData> = {
  NVDA: createChartData(2),
  AVGO: createChartData(5),
  LITE: createChartData(8),
  トヨタ自動車: createChartData(11),
  三菱重工業: createChartData(14),
};

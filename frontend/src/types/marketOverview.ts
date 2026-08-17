export type MarketCandle = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type MarketOverviewItem = {
  id: string;
  title: string;
  value: string;
  change: string;
  changeRate: string;
  direction: "up" | "down";
  candles: MarketCandle[];
};

export type MarketOverviewApiItem = {
  code: string;
  displayName: string;
  latestClose: number;
  priceChange: number;
  changeRate: number;
  candles: MarketCandle[];
};

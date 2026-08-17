import type {
  MarketOverviewApiItem,
  MarketOverviewItem,
} from "@/types/marketOverview";
import {
  formatMarketNumber,
  formatMarketPercentage,
  formatSignedMarketNumber,
} from "@/utils/marketDisplay";

export const mapMarketOverviewItem = (
  item: MarketOverviewApiItem,
): MarketOverviewItem => ({
  id: item.code,
  title: `${item.displayName}日足チャート`,
  value: formatMarketNumber(item.latestClose),
  change: formatSignedMarketNumber(item.priceChange),
  changeRate: formatMarketPercentage(item.changeRate),
  direction: item.priceChange >= 0 ? "up" : "down",
  candles: item.candles,
});

export const mapMarketOverviewItems = (
  items: MarketOverviewApiItem[],
): MarketOverviewItem[] => items.map(mapMarketOverviewItem);

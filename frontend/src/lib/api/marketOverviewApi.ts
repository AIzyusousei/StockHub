import type { MarketOverviewApiItem } from "@/types/marketOverview";

const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:8080";

export async function fetchMarketOverview(): Promise<MarketOverviewApiItem[]> {
  const response = await fetch(`${BACKEND_API_URL}/api/market-overview`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Market Overview API returned ${response.status}`);
  }

  return (await response.json()) as MarketOverviewApiItem[];
}

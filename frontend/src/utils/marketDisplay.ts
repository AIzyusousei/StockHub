export const formatMarketNumber = (value: number) =>
  new Intl.NumberFormat("ja-JP", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const formatSignedMarketNumber = (value: number) =>
  `${value >= 0 ? "+" : ""}${formatMarketNumber(value)}`;

export const formatMarketPercentage = (value: number) =>
  `(${value >= 0 ? "+" : ""}${value.toFixed(2)}%)`;

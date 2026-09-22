export type WeeklyWatchlistItem = {
  symbol: string;
  price: string;
  dailyChange: number;
  weeklyChange: number;
  memo: string;
  trend: number[];
};

export const weeklyWatchlist: WeeklyWatchlistItem[] = [
  {
    symbol: "NVDA",
    price: "$ 500",
    dailyChange: 2.1,
    weeklyChange: 3.2,
    memo: "500を割ればin",
    trend: [
      42, 45, 43, 48, 46, 52, 49, 38, 35, 43, 47, 45, 50, 46, 51, 49, 54, 52,
      57, 54, 59, 55, 46, 45, 50, 53, 60, 58, 63, 61, 68, 66, 72,
    ],
  },
  {
    symbol: "AVGO",
    price: "$ 200",
    dailyChange: 2.5,
    weeklyChange: 7.2,
    memo: "三角持ち合い上抜けなら in",
    trend: [
      30, 34, 31, 37, 35, 40, 44, 41, 36, 38, 35, 40, 37, 45, 43, 49, 47, 53,
      50, 52, 47, 45, 49, 44, 42, 48, 47, 52, 60, 58, 66, 64,
    ],
  },
  {
    symbol: "LITE",
    price: "$ 600",
    dailyChange: -1.1,
    weeklyChange: 7.5,
    memo: "",
    trend: [
      40, 45, 43, 48, 44, 46, 53, 49, 51, 47, 51, 48, 52, 48, 50, 47, 49, 46,
      48, 44, 46, 43, 36, 25, 28, 42, 47, 43, 52, 49, 55, 53, 58,
    ],
  },
  {
    symbol: "トヨタ自動車",
    price: "¥650",
    dailyChange: -2.0,
    weeklyChange: -2.5,
    memo: "",
    trend: [
      60, 62, 57, 59, 52, 48, 44, 47, 39, 42, 40, 34, 37, 35, 36, 31, 34, 32,
      35, 33, 31, 35, 33, 28, 30, 34, 31, 26, 29, 35, 33, 43,
    ],
  },
  {
    symbol: "三菱重工業",
    price: "¥2500",
    dailyChange: 1.0,
    weeklyChange: 3.2,
    memo: "",
    trend: [
      35, 39, 36, 42, 39, 47, 45, 50, 47, 48, 44, 49, 46, 51, 47, 50, 54, 51,
      55, 53, 62, 58, 55, 57, 61, 55, 59, 57, 64, 60, 67, 64, 72,
    ],
  },
];

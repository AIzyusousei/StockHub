export type WatchlistCheckItem = {
  symbol: string;
  price: string;
  dailyChange: number;
  fiveDayChange: number;
  peg: string;
  earningsDate: string;
  memo: string;
};

export const currentWeeklyWatchlistId = "26-08-17-week";

export const watchlistCheckItems: WatchlistCheckItem[] = [
  {
    symbol: "NVDA",
    price: "$ 500",
    dailyChange: 2.1,
    fiveDayChange: 3.2,
    peg: "1.2",
    earningsDate: "26/08/21",
    memo: "500を割ればin",
  },
  {
    symbol: "AVGO",
    price: "$ 200",
    dailyChange: 2.5,
    fiveDayChange: 7.2,
    peg: "0.7",
    earningsDate: "26/09/03",
    memo: "三角持ち合い上放れなら in",
  },
  {
    symbol: "LITE",
    price: "$ 600",
    dailyChange: -1.1,
    fiveDayChange: 7.5,
    peg: "0.5",
    earningsDate: "26/08/31",
    memo: "",
  },
  {
    symbol: "トヨタ自動車",
    price: "¥650",
    dailyChange: -2.0,
    fiveDayChange: -2.5,
    peg: "1.3",
    earningsDate: "26/10/01",
    memo: "",
  },
  {
    symbol: "三菱重工業",
    price: "¥2500",
    dailyChange: 1.0,
    fiveDayChange: 3.2,
    peg: "1.1",
    earningsDate: "26/09/05",
    memo: "",
  },
];

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  currentWeeklyWatchlistId,
  type WatchlistCheckItem,
  watchlistCheckItems,
} from "@/features/watchlist/mocks/watchlistCheck";

export type WatchlistGroup = "weekly" | "permanent";

export const initialWeekly = [
  "#26/08/17 week",
  "#26/08/10 week",
  "#26/08/03 week",
];
export const initialPermanent = [
  "検索履歴ウォッチリスト",
  "#本日注目",
  "#明日注目",
  "なんとなく注目テック",
  "memory & light",
  "日本バリュー株",
  "セクター代表銘柄",
  "日本高配当",
  "米国成長株",
  "セクター別etf",
];

export function listId(name: string) {
  return name === initialWeekly[0] ? currentWeeklyWatchlistId : name;
}

type WatchlistState = {
  weekly: string[];
  permanent: string[];
  stocks: Record<string, WatchlistCheckItem[]>;
};

const initialState: WatchlistState = {
  weekly: initialWeekly,
  permanent: initialPermanent,
  stocks: { [currentWeeklyWatchlistId]: watchlistCheckItems },
};

type WatchlistStore = {
  state: WatchlistState;
  getStocks: (id: string) => WatchlistCheckItem[];
  reorderStocks: (
    id: string,
    source: string,
    target: string,
    after: boolean,
  ) => void;
  removeStock: (id: string, symbol: string) => void;
  copyStock: (sourceId: string, symbol: string, targetId: string) => void;
  moveList: (
    sourceId: string,
    targetId: string,
    group: WatchlistGroup,
    after: boolean,
  ) => void;
};

const Context = createContext<WatchlistStore | null>(null);

function moveItem<T>(items: T[], source: T, target: T, after: boolean) {
  const from = items.indexOf(source);
  const to = items.indexOf(target);
  if (from < 0 || to < 0 || from === to) return items;
  const next = [...items];
  next.splice(from, 1);
  next.splice(next.indexOf(target) + (after ? 1 : 0), 0, source);
  return next;
}

export function WatchlistProvider({
  userId,
  children,
}: {
  userId: string;
  children: React.ReactNode;
}) {
  const [state, setState] = useState<WatchlistState>(initialState);
  const [loaded, setLoaded] = useState(false);
  const storageKey = `stockhub-watchlists-${userId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as WatchlistState;
        if (
          Array.isArray(parsed.weekly) &&
          Array.isArray(parsed.permanent) &&
          parsed.stocks &&
          typeof parsed.stocks === "object"
        ) {
          setState(parsed);
        }
      }
    } catch {
      // Keep the initial mock data if storage is unavailable or invalid.
    }
    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Drag and drop still works for this session when storage is unavailable.
    }
  }, [loaded, state, storageKey]);

  const getStocks = (id: string) => state.stocks[id] ?? [];
  const reorderStocks = (
    id: string,
    source: string,
    target: string,
    after: boolean,
  ) => {
    setState((current) => {
      const stocks = current.stocks[id] ?? [];
      const sourceItem = stocks.find((item) => item.symbol === source);
      const targetItem = stocks.find((item) => item.symbol === target);
      if (!sourceItem || !targetItem) return current;
      return {
        ...current,
        stocks: {
          ...current.stocks,
          [id]: moveItem(stocks, sourceItem, targetItem, after),
        },
      };
    });
  };
  const removeStock = (id: string, symbol: string) => {
    setState((current) => ({
      ...current,
      stocks: {
        ...current.stocks,
        [id]: (current.stocks[id] ?? []).filter(
          (item) => item.symbol !== symbol,
        ),
      },
    }));
  };
  const copyStock = (sourceId: string, symbol: string, targetId: string) => {
    if (sourceId === targetId) return;
    setState((current) => {
      const source = current.stocks[sourceId]?.find(
        (item) => item.symbol === symbol,
      );
      const target = current.stocks[targetId] ?? [];
      if (!source || target.some((item) => item.symbol === symbol))
        return current;
      return {
        ...current,
        stocks: { ...current.stocks, [targetId]: [...target, { ...source }] },
      };
    });
  };
  const moveList = (
    sourceId: string,
    targetId: string,
    group: WatchlistGroup,
    after: boolean,
  ) => {
    setState((current) => {
      const sourceGroup: WatchlistGroup | null = current.weekly.some(
        (name) => listId(name) === sourceId,
      )
        ? "weekly"
        : current.permanent.some((name) => listId(name) === sourceId)
          ? "permanent"
          : null;
      if (!sourceGroup || sourceId === targetId) return current;
      const source = current[sourceGroup].find(
        (name) => listId(name) === sourceId,
      );
      const target = current[group].find((name) => listId(name) === targetId);
      if (!source || !target) return current;
      if (sourceGroup === group) {
        return {
          ...current,
          [group]: moveItem(current[group], source, target, after),
        };
      }
      const destination = [...current[group]];
      destination.splice(
        destination.indexOf(target) + (after ? 1 : 0),
        0,
        source,
      );
      return {
        ...current,
        [sourceGroup]: current[sourceGroup].filter((name) => name !== source),
        [group]: destination,
      };
    });
  };

  return (
    <Context.Provider
      value={{
        state,
        getStocks,
        reorderStocks,
        removeStock,
        copyStock,
        moveList,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useWatchlists() {
  const store = useContext(Context);
  if (!store) throw new Error("WatchlistProvider is missing");
  return store;
}

"use client";

import { useParams } from "next/navigation";
import { WatchlistProvider } from "@/features/watchlist/components/WatchlistStore";

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useParams<{ userId: string }>();
  return <WatchlistProvider userId={userId}>{children}</WatchlistProvider>;
}

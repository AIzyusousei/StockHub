"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/common/Header";
import { WatchlistPageTitle } from "@/features/watchlist/components/WatchlistPageTitle";
import { WatchlistSidebar } from "@/features/watchlist/components/WatchlistSidebar";
import { CreateWatchlistForm } from "./_components/CreateWatchlistForm";

export default function CreateWatchlistPage() {
  const { userId } = useParams<{ userId: string }>();
  return (
    <div className="min-h-screen bg-[#f3f6fa] text-[#10294c]">
      <Header
        activeSection="watchlist"
        userId={userId}
        homeHref={`/${userId}/hub`}
      />
      <main className="mx-2 mb-2 min-h-[calc(100vh-90px)] rounded-b-xl bg-white px-5 pb-12 pt-8 shadow-[0_8px_30px_rgba(15,36,68,0.05)] sm:px-10 lg:px-10">
        <div className="mx-auto max-w-[1580px]">
          <WatchlistPageTitle />
          <div className="mt-6 flex flex-col gap-8 xl:flex-row">
            <WatchlistSidebar />
            <CreateWatchlistForm />
          </div>
        </div>
      </main>
    </div>
  );
}

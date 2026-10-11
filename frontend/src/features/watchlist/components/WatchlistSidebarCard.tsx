"use client";

export function WatchlistSidebarCard({
  icon,
  title,
  children,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 font-semibold">
          <span className="text-[#1760ed]">{icon}</span>
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  );
}

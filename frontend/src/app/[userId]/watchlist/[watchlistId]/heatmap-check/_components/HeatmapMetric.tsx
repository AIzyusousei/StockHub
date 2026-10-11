"use client";

export function HeatmapMetric({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="border-l border-slate-200 pl-8">
      <p className="text-sm text-slate-500">{label}</p>
      <p
        className={`mt-1 text-lg font-semibold ${green ? "text-[#009c50]" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

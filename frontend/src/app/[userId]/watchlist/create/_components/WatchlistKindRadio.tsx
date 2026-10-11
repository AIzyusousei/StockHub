"use client";

export function WatchlistKindRadio({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-xl">
      <input
        type="radio"
        name="watchlist-kind"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="size-6 accent-[#1760ed]"
      />
      {label}
    </label>
  );
}

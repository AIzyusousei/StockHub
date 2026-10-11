"use client";

export function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-xl font-semibold">
      {label}
      {required && (
        <span className="rounded border border-[#5d9aff] px-1.5 py-0.5 text-sm text-[#075cdf]">
          必須
        </span>
      )}
    </div>
  );
}

/* biome-ignore-all lint/a11y/noStaticElementInteractions: drag handles intentionally use native HTML drag events */
import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  History,
  List,
  Search,
} from "lucide-react";

type WatchlistSidebarProps = {
  weekly?: string[];
  permanent?: string[];
  onDragStart?: (name: string) => void;
  onDrop?: (name: string, group: "weekly" | "permanent") => void;
};

const defaultWeekly = ["#26/08/17 week", "#26/08/10 week", "#26/08/03 week"];
const defaultPermanent = [
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

export function WatchlistSidebar({
  weekly = defaultWeekly,
  permanent = defaultPermanent,
  onDragStart,
  onDrop,
}: WatchlistSidebarProps) {
  const draggable = Boolean(onDragStart && onDrop);
  return (
    <aside className="w-full shrink-0 xl:w-[300px]">
      <div className="flex h-12 overflow-hidden rounded-lg border border-slate-200">
        <div className="flex flex-1 items-center gap-3 px-4 text-slate-400">
          <Search className="size-5" />
          リストを検索
        </div>
        <button
          type="button"
          className="border-l border-slate-200 px-4 font-semibold"
        >
          <Search className="mr-2 inline size-4" />
          検索
        </button>
      </div>
      <SideCard icon={<CalendarDays />} title="週次ウォッチリスト">
        {weekly.map((name) => (
          <SideRow
            key={name}
            text={name}
            draggable={draggable}
            onDragStart={() => onDragStart?.(name)}
            onDrop={() => onDrop?.(name, "weekly")}
          />
        ))}
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          もっと見る <ChevronRight className="size-4" />
        </div>
      </SideCard>
      <SideCard icon={<Bookmark />} title="ウォッチリスト">
        {permanent.map((name) => (
          <SideRow
            key={name}
            text={name}
            draggable={draggable}
            onDragStart={() => onDragStart?.(name)}
            onDrop={() => onDrop?.(name, "permanent")}
          />
        ))}
      </SideCard>
      <SideCard icon={<History />} title="検索履歴ウォッチリスト">
        <p className="pl-8 text-sm text-slate-500">
          最近の検索履歴（最大20件）
        </p>
      </SideCard>
    </aside>
  );
}

function SideCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 rounded-xl border border-slate-200 p-4">
      <h2 className="mb-2 flex items-center gap-3 font-semibold">
        <span className="text-[#1760ed]">{icon}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}
function SideRow({
  text,
  draggable,
  onDragStart,
  onDrop,
}: {
  text: string;
  draggable: boolean;
  onDragStart: () => void;
  onDrop: () => void;
}) {
  return (
    <div
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
      className="flex items-center gap-3 py-0.5 pl-1 text-[15px] text-slate-600"
    >
      <span
        draggable={draggable}
        onDragStart={onDragStart}
        className={draggable ? "cursor-grab active:cursor-grabbing" : ""}
        title={draggable ? "ドラッグして並べ替え" : undefined}
      >
        <List className="size-4 text-slate-400" />
      </span>
      {text}
    </div>
  );
}

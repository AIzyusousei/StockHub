"use client";

import { useState } from "react";
import { BaseListPicker } from "./BaseListPicker";
import { FieldLabel } from "./FieldLabel";
import { WatchlistKindRadio } from "./WatchlistKindRadio";

const initialBaseLists = ["なんとなく注目テック", "memory & light"];

export function CreateWatchlistForm() {
  const [name, setName] = useState("宇宙");
  const [kind, setKind] = useState("temporary");
  const [baseLists, setBaseLists] = useState(initialBaseLists);
  const [created, setCreated] = useState(false);

  return (
    <section className="min-w-0 flex-1 rounded-xl border border-slate-200 p-7 shadow-[0_4px_14px_rgba(15,36,68,0.03)] lg:px-11 lg:py-10">
      <div className="grid max-w-[1080px] grid-cols-[150px_1fr] items-center gap-x-12 gap-y-10">
        <FieldLabel label="リスト名" required />
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-14 rounded-lg border border-slate-300 px-5 text-xl outline-none focus:border-[#1760ed]"
        />
        <FieldLabel label="リスト種別" required />
        <div className="flex gap-10">
          <WatchlistKindRadio
            label="一時的"
            value="temporary"
            checked={kind === "temporary"}
            onChange={setKind}
          />
          <WatchlistKindRadio
            label="恒久的"
            value="permanent"
            checked={kind === "permanent"}
            onChange={setKind}
          />
        </div>
        <FieldLabel label="ベースリスト" />
        <BaseListPicker baseLists={baseLists} onChange={setBaseLists} />
      </div>
      <div className="mt-16 flex justify-center">
        <button
          type="button"
          onClick={() => setCreated(true)}
          disabled={!name.trim()}
          className="h-16 w-full max-w-[470px] rounded-xl bg-[#1760ed] text-xl font-bold text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {created ? "作成しました" : "リストを作成"}
        </button>
      </div>
    </section>
  );
}

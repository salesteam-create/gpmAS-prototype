import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "../lib/utils";
import { schedule } from "../data/mock";
import WeekGrid, { typeStyle } from "../components/WeekGrid";

export default function Calendar() {
  const [squadFilter, setSquadFilter] = useState<string>("All");
  const squadOptions = ["All", "Senior", "U19", "U17", "U15"];
  const visible = schedule.filter((e) => squadFilter === "All" || e.squad === squadFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-eyebrow">Week of 16 June</div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Training Calendar</h1>
          <p className="mt-1 text-sm text-fg-muted">Every squad, venue and match — one synchronized schedule.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl border border-line bg-ink-800/60 p-0.5">
            <button className="grid h-8 w-8 place-items-center rounded-lg text-fg-muted hover:text-fg"><ChevronLeft className="h-4 w-4" /></button>
            <span className="px-2 text-sm font-semibold">This week</span>
            <button className="grid h-8 w-8 place-items-center rounded-lg text-fg-muted hover:text-fg"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <button className="btn-volt"><Plus className="h-4 w-4" /> Add event</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {squadOptions.map((s) => (
            <button key={s} onClick={() => setSquadFilter(s)} className={cn("chip", squadFilter === s && "chip-active")}>{s}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-fg-muted">
          {Object.entries(typeStyle).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded" style={{ background: v.bar }} /> {k}</span>
          ))}
        </div>
      </div>

      <WeekGrid events={visible} />
    </div>
  );
}

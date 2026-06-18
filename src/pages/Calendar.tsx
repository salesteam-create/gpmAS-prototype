import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, MapPin } from "lucide-react";
import { cn } from "../lib/utils";
import { schedule, type ScheduleEvent } from "../data/mock";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayNums = [16, 17, 18, 19, 20, 21, 22];
const START = 9;
const END = 20;
const hours = Array.from({ length: END - START }, (_, i) => START + i);

const typeStyle: Record<ScheduleEvent["type"], { bg: string; bar: string; text: string }> = {
  Training: { bg: "rgba(198,242,78,0.12)", bar: "#C6F24E", text: "#C6F24E" },
  Match: { bg: "rgba(255,94,108,0.14)", bar: "#FF5E6C", text: "#FF8A95" },
  Gym: { bg: "rgba(154,123,255,0.14)", bar: "#9A7BFF", text: "#B6A0FF" },
  Recovery: { bg: "rgba(52,215,198,0.14)", bar: "#34D7C6", text: "#5FE6D8" },
  Analysis: { bg: "rgba(91,140,255,0.14)", bar: "#5B8CFF", text: "#8FB0FF" },
};

const ROW_H = 56;

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

      {/* Squad filter + legend */}
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

      {/* Grid */}
      <div className="panel overflow-hidden p-0">
        <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-line">
          <div />
          {days.map((d, i) => (
            <div key={d} className={cn("border-l border-line px-3 py-3 text-center", (i === 4 || i === 5) && "bg-volt/[0.03]")}>
              <div className="text-xs font-semibold text-fg">{d}</div>
              <div className="stat-num text-lg font-bold text-fg-muted">{dayNums[i]}</div>
            </div>
          ))}
        </div>

        <div className="relative grid grid-cols-[56px_repeat(7,1fr)]" style={{ height: hours.length * ROW_H }}>
          {/* Hour labels */}
          <div className="relative">
            {hours.map((h, i) => (
              <div key={h} className="absolute right-2 -translate-y-1/2 text-[10px] text-fg-dim" style={{ top: i * ROW_H }}>
                {h}:00
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((d, di) => (
            <div key={d} className={cn("relative border-l border-line", (di === 4 || di === 5) && "bg-volt/[0.02]")}>
              {hours.map((_, i) => (
                <div key={i} className="absolute inset-x-0 border-t border-line/60" style={{ top: i * ROW_H }} />
              ))}
              {visible
                .filter((e) => e.day === di)
                .map((e) => {
                  const st = typeStyle[e.type];
                  const top = (e.start - START) * ROW_H;
                  const height = e.duration * ROW_H - 4;
                  return (
                    <div
                      key={e.id}
                      className="absolute inset-x-1 cursor-pointer overflow-hidden rounded-lg border-l-2 px-2 py-1.5 transition hover:brightness-125"
                      style={{ top, height, background: st.bg, borderColor: st.bar }}
                    >
                      <div className="text-[11px] font-semibold leading-tight" style={{ color: st.text }}>{e.title}</div>
                      <div className="mt-0.5 truncate text-[10px] text-fg-muted">{e.squad}</div>
                      {height > 50 && (
                        <div className="mt-1 flex items-center gap-1 text-[9px] text-fg-dim">
                          <MapPin className="h-2.5 w-2.5" /> {e.location}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { MapPin } from "lucide-react";
import { cn } from "../lib/utils";
import type { ScheduleEvent } from "../data/mock";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayNums = [16, 17, 18, 19, 20, 21, 22];
const START = 9;
const END = 20;
const hours = Array.from({ length: END - START }, (_, i) => START + i);
const ROW_H = 56;

export const typeStyle: Record<ScheduleEvent["type"], { bg: string; bar: string; text: string }> = {
  Training: { bg: "rgba(198,242,78,0.12)", bar: "#C6F24E", text: "#C6F24E" },
  Match: { bg: "rgba(255,94,108,0.14)", bar: "#FF5E6C", text: "#FF8A95" },
  Gym: { bg: "rgba(154,123,255,0.14)", bar: "#9A7BFF", text: "#B6A0FF" },
  Recovery: { bg: "rgba(52,215,198,0.14)", bar: "#34D7C6", text: "#5FE6D8" },
  Analysis: { bg: "rgba(91,140,255,0.14)", bar: "#5B8CFF", text: "#8FB0FF" },
};

type Placed = { ev: ScheduleEvent; lane: number; cols: number };

/**
 * Interval-partition a day's events into side-by-side lanes so concurrent
 * events never render on top of one another. Events that don't overlap span
 * the full width; clusters of overlapping events split the width evenly.
 */
function layoutDay(events: ScheduleEvent[]): Placed[] {
  const sorted = [...events].sort((a, b) => a.start - b.start || b.duration - a.duration);
  const result: Placed[] = [];
  let cluster: { ev: ScheduleEvent; lane: number; end: number }[] = [];
  let clusterEnd = -Infinity;

  const flush = () => {
    const cols = Math.max(...cluster.map((c) => c.lane)) + 1;
    cluster.forEach((c) => result.push({ ev: c.ev, lane: c.lane, cols }));
    cluster = [];
    clusterEnd = -Infinity;
  };

  for (const ev of sorted) {
    const start = ev.start;
    const end = ev.start + ev.duration;
    if (cluster.length && start >= clusterEnd) flush();

    const laneEnds: Record<number, number> = {};
    cluster.forEach((c) => {
      laneEnds[c.lane] = Math.max(laneEnds[c.lane] ?? -Infinity, c.end);
    });
    let lane = 0;
    while ((laneEnds[lane] ?? -Infinity) > start) lane++;

    cluster.push({ ev, lane, end });
    clusterEnd = Math.max(clusterEnd, end);
  }
  if (cluster.length) flush();
  return result;
}

export default function WeekGrid({ events }: { events: ScheduleEvent[] }) {
  return (
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
        <div className="relative">
          {hours.map((h, i) => (
            <div key={h} className="absolute right-2 -translate-y-1/2 text-[10px] text-fg-dim" style={{ top: i * ROW_H }}>
              {h}:00
            </div>
          ))}
        </div>

        {days.map((d, di) => {
          const placed = layoutDay(events.filter((e) => e.day === di));
          return (
            <div key={d} className={cn("relative border-l border-line", (di === 4 || di === 5) && "bg-volt/[0.02]")}>
              {hours.map((_, i) => (
                <div key={i} className="absolute inset-x-0 border-t border-line/60" style={{ top: i * ROW_H }} />
              ))}
              {placed.map(({ ev, lane, cols }) => {
                const st = typeStyle[ev.type];
                const top = (ev.start - START) * ROW_H;
                const height = ev.duration * ROW_H - 4;
                const widthPct = 100 / cols;
                return (
                  <div
                    key={ev.id}
                    className="absolute cursor-pointer overflow-hidden rounded-lg border-l-2 px-2 py-1.5 transition hover:z-10 hover:brightness-125"
                    style={{
                      top,
                      height,
                      left: `calc(${lane * widthPct}% + 2px)`,
                      width: `calc(${widthPct}% - 4px)`,
                      background: st.bg,
                      borderColor: st.bar,
                    }}
                  >
                    <div className="truncate text-[11px] font-semibold leading-tight" style={{ color: st.text }}>{ev.title}</div>
                    <div className="mt-0.5 truncate text-[10px] text-fg-muted">{ev.squad}</div>
                    {height > 50 && cols < 3 && (
                      <div className="mt-1 flex items-center gap-1 truncate text-[9px] text-fg-dim">
                        <MapPin className="h-2.5 w-2.5 shrink-0" /> {ev.location}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

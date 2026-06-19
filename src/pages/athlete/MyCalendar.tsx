import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { schedule, players } from "../../data/mock";
import { useRole } from "../../context/role";
import WeekGrid, { typeStyle } from "../../components/WeekGrid";

export default function MyCalendar() {
  const { athleteId } = useRole();
  const me = players.find((p) => p.id === athleteId)!;
  // Personal view: only the athlete's own squad sessions — never other squads.
  const squadKey = me.squad.replace("Senior Squad", "Senior").split(" ")[0];
  const mine = schedule.filter((e) => e.squad === squadKey || e.squad === me.squad);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-eyebrow">Week of 16 June</div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">My Calendar</h1>
          <p className="mt-1 text-sm text-fg-muted">Your personal training and match schedule.</p>
        </div>
        <div className="flex items-center rounded-xl border border-line bg-ink-800/60 p-0.5">
          <button className="grid h-8 w-8 place-items-center rounded-lg text-fg-muted hover:text-fg"><ChevronLeft className="h-4 w-4" /></button>
          <span className="px-2 text-sm font-semibold">This week</span>
          <button className="grid h-8 w-8 place-items-center rounded-lg text-fg-muted hover:text-fg"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-fg-muted">
          <Info className="h-3.5 w-3.5 text-volt" /> Showing your sessions only ({me.squad}).
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-fg-muted">
          {Object.entries(typeStyle).map(([k, v]) => (
            <span key={k} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded" style={{ background: v.bar }} /> {k}</span>
          ))}
        </div>
      </div>

      <WeekGrid events={mine} />
    </div>
  );
}

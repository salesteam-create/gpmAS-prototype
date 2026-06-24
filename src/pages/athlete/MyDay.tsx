import { Link } from "react-router-dom";
import { PlayCircle, Clock, Flame, CheckCircle2, Circle, Trophy, Calendar, ChevronRight, ArrowRight } from "lucide-react";
import { Avatar, Ring, StatBar } from "../../components/ui";
import { drills, assignedSessions, categoryMeta, intensityColor, players } from "../../data/mock";
import { useRole } from "../../context/role";
import { useStore, reachesAthlete } from "../../context/store";

const weekPlan = [
  { day: "Mon", label: "Possession & Build-Up", done: true },
  { day: "Tue", label: "Strength · Lower Body", done: true },
  { day: "Wed", label: "Recovery + Analysis", done: true },
  { day: "Thu", label: "Matchday –1 Activation", done: false, today: true },
  { day: "Fri", label: "Team Activation", done: false },
  { day: "Sat", label: "League Match", done: false, match: true },
  { day: "Sun", label: "Recovery & Mobility", done: false },
];

export default function MyDay() {
  const { athleteId } = useRole();
  const { assignments } = useStore();
  const me = players.find((p) => p.id === athleteId)!;
  const today = assignedSessions.find((s) => s.status === "Today") ?? assignedSessions[0];
  const todayDrills = today.blocks.map((b) => ({ drill: drills.find((d) => d.id === b.drillId)!, minutes: b.minutes }));
  const newFromCoach = assignments.filter((a) => reachesAthlete(a.targetType, a.targetId, athleteId));

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="panel relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-volt/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <Avatar name={me.name} size={64} />
            <div>
              <div className="label-eyebrow">My Day · Thu 19 Jun</div>
              <h1 className="font-display text-2xl font-bold tracking-tight">Hi {me.name.split(" ")[0]} 👋</h1>
              <p className="mt-0.5 text-sm text-fg-muted">{me.position} · {me.squad} · #{me.number}</p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <Ring value={me.readiness} size={72} color="#C6F24E" label="Ready" />
            <div className="hidden sm:block">
              <div className="text-[11px] text-fg-dim">Your form</div>
              <div className="stat-num text-2xl font-bold text-good">+{me.form}</div>
              <div className="text-[11px] text-fg-dim">trending up</div>
            </div>
          </div>
        </div>
      </div>

      {newFromCoach.length > 0 && (
        <Link
          to="/app/sessions"
          className="flex items-center gap-3 rounded-2xl border border-volt/30 bg-gradient-to-r from-volt/10 to-transparent p-4 transition hover:border-volt/50"
        >
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-volt/15 text-volt">
            <PlayCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold">
              {newFromCoach.length} new {newFromCoach.length === 1 ? "item" : "items"} assigned by your coach
            </div>
            <div className="text-[12px] text-fg-muted">
              {newFromCoach.slice(0, 2).map((a) => a.title).join(", ")}
              {newFromCoach.length > 2 ? ` +${newFromCoach.length - 2} more` : ""} — tap to review
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-volt" />
        </Link>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's session */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <div className="label-eyebrow">Assigned for today</div>
              <h2 className="mt-1 font-display text-lg font-semibold">{today.name}</h2>
            </div>
            <Link to="/app/sessions" className="chip transition hover:border-volt/40 hover:text-volt">
              <Clock className="h-3.5 w-3.5" /> {todayDrills.reduce((s, t) => s + t.minutes, 0)} min · open
            </Link>
          </div>

          <div className="space-y-3">
            {todayDrills.map(({ drill, minutes }, i) => {
              const cat = categoryMeta[drill.category];
              return (
                <div key={i} className="panel group flex items-center gap-4 overflow-hidden p-3 transition hover:border-line2">
                  <div className="relative grid h-16 w-24 shrink-0 place-items-center overflow-hidden rounded-lg" style={{ background: `linear-gradient(150deg, ${cat.color}30, #0F121A)` }}>
                    <PlayCircle className="h-7 w-7 transition group-hover:scale-110" style={{ color: cat.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{drill.title}</div>
                    <div className="mt-0.5 flex items-center gap-3 text-[11px] text-fg-dim">
                      <span style={{ color: cat.color }}>{drill.category}</span>
                      <span className="flex items-center gap-1"><Flame className="h-3 w-3" style={{ color: intensityColor[drill.intensity] }} /> {drill.intensity}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {minutes}m</span>
                    </div>
                  </div>
                  <button className="btn-ghost px-3 py-2 text-xs"><PlayCircle className="h-4 w-4" /> Watch</button>
                </div>
              );
            })}
          </div>

          <Link to="/app/sessions" className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-volt/30 bg-volt/10 py-3 text-sm font-semibold text-volt transition hover:bg-volt/15">
            Adjust or start this session <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Side: week + goals */}
        <div className="space-y-6">
          <div className="panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-volt" />
                <h3 className="font-display font-semibold">My week</h3>
              </div>
              <Link to="/app/calendar" className="text-[11px] font-semibold text-volt">Full calendar <ChevronRight className="inline h-3 w-3" /></Link>
            </div>
            <div className="space-y-1.5">
              {weekPlan.map((d) => (
                <div key={d.day} className={`flex items-center gap-3 rounded-lg px-2.5 py-2 ${d.today ? "border border-volt/30 bg-volt/10" : ""}`}>
                  {d.done ? <CheckCircle2 className="h-4 w-4 text-good" /> : d.match ? <Trophy className="h-4 w-4 text-bad" /> : <Circle className="h-4 w-4 text-fg-dim" />}
                  <span className="w-9 text-xs font-semibold text-fg-dim">{d.day}</span>
                  <span className={`flex-1 text-sm ${d.done ? "text-fg-dim line-through" : d.today ? "font-semibold text-volt" : "text-fg-muted"}`}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <h3 className="mb-3 font-display font-semibold">My development goals</h3>
            <div className="space-y-4">
              {[
                { l: "Finishing conversion", v: 88, t: "Target 90%" },
                { l: "Sprint distance / match", v: 76, t: "Building" },
                { l: "Press recovery time", v: 82, t: "On track" },
              ].map((g) => (
                <div key={g.l}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-fg-muted">{g.l}</span>
                    <span className="text-[11px] text-fg-dim">{g.t}</span>
                  </div>
                  <StatBar value={g.v} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

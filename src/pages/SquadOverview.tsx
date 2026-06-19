import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  HeartPulse,
  ShieldAlert,
  Users,
  CalendarClock,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "../lib/utils";
import { Avatar, Badge, Ring, Sparkline, Stagger } from "../components/ui";
import { players, squads } from "../data/mock";

function statusTone(s: string) {
  return s === "Available" ? "good" : s === "Injured" ? "bad" : s === "Rest" ? "plasma" : "warn";
}
function acwrTone(v: number) {
  if (v > 1.5) return "#FF5E6C";
  if (v > 1.3) return "#FBBF3C";
  if (v < 0.8) return "#5B8CFF";
  return "#3FD79A";
}

export default function SquadOverview() {
  const { id } = useParams();
  const squad = squads.find((s) => s.id === id) ?? squads[0];
  const roster = players.filter((p) => p.squad === squad.name);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => roster.filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.position.toLowerCase().includes(query.toLowerCase())),
    [roster, query]
  );

  const available = roster.filter((p) => p.status === "Available").length;
  const flags = roster.filter((p) => p.status === "Injured" || p.status === "Monitor" || p.acwr > 1.3).length;
  const avgAtt = roster.length ? Math.round(roster.reduce((s, p) => s + p.attendance, 0) / roster.length) : 0;

  return (
    <div className="space-y-6">
      <Link to="/app/squads" className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition hover:text-fg">
        <ArrowLeft className="h-4 w-4" /> All squads
      </Link>

      {/* Squad header */}
      <div className="panel relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full blur-3xl" style={{ background: `${squad.color}22` }} />
        <div className="relative flex flex-wrap items-center gap-5">
          <Ring value={squad.avgReadiness} color={squad.color} size={84} stroke={7} label="Ready" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: squad.color }} />
              <h1 className="font-display text-2xl font-bold tracking-tight">{squad.name}</h1>
            </div>
            <div className="mt-1 text-sm text-fg-muted">{squad.level} · {squad.players} players · Coach {squad.coach}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip"><CalendarClock className="h-3.5 w-3.5" /> Next · {squad.nextSession}</span>
            </div>
          </div>
          <Link to="/app/sessions" className="btn-volt">Plan a session</Link>
        </div>
      </div>

      {/* Squad KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: HeartPulse, l: "Avg readiness", v: `${squad.avgReadiness}%`, c: squad.color },
          { icon: Users, l: "Available", v: `${available}/${roster.length}`, c: "#3FD79A" },
          { icon: ShieldAlert, l: "Risk flags", v: `${flags}`, c: flags ? "#FBBF3C" : "#3FD79A" },
          { icon: CalendarClock, l: "Attendance", v: `${avgAtt}%`, c: "#5B8CFF" },
        ].map((m, i) => (
          <Stagger key={m.l} i={i}>
            <div className="panel p-4">
              <div className="flex items-center gap-2 text-fg-dim">
                <m.icon className="h-4 w-4" style={{ color: m.c }} />
                <span className="text-[11px] uppercase tracking-wide">{m.l}</span>
              </div>
              <div className="stat-num mt-2 text-2xl font-bold" style={{ color: m.c }}>{m.v}</div>
            </div>
          </Stagger>
        ))}
      </div>

      {/* Roster */}
      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="label-eyebrow">Roster</div>
            <h2 className="mt-1 font-display text-lg font-semibold">Players · {roster.length}</h2>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-line bg-ink-800/60 px-3 py-2 text-sm md:w-64">
            <Search className="h-4 w-4 text-fg-dim" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search this squad…" className="w-full bg-transparent outline-none placeholder:text-fg-dim" />
          </div>
        </div>

        <div className="panel overflow-hidden p-0">
          <div className="hidden grid-cols-[2fr_1fr_1fr_1.2fr_1fr] gap-4 border-b border-line px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-fg-dim md:grid">
            <div>Player</div>
            <div>Readiness</div>
            <div>Workload</div>
            <div>Form (12w)</div>
            <div className="text-right">Status</div>
          </div>
          <div className="divide-y divide-line">
            {filtered.map((p) => (
              <Link
                key={p.id}
                to={`/app/players/${p.id}`}
                className="grid grid-cols-2 items-center gap-4 px-5 py-3.5 transition hover:bg-white/[0.03] md:grid-cols-[2fr_1fr_1fr_1.2fr_1fr]"
              >
                <div className="flex items-center gap-3">
                  <Avatar name={p.name} size={40} />
                  <div>
                    <div className="text-sm font-semibold">{p.name}</div>
                    <div className="text-[11px] text-fg-dim">#{p.number} · {p.position} · {p.age}y</div>
                  </div>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <div className="h-1.5 w-12 overflow-hidden rounded-full bg-white/[0.08]">
                    <div className="h-full rounded-full" style={{ width: `${p.readiness}%`, background: p.readiness > 80 ? "#C6F24E" : p.readiness > 60 ? "#FBBF3C" : "#FF5E6C" }} />
                  </div>
                  <span className="stat-num text-sm font-semibold">{p.readiness}</span>
                </div>
                <div className="hidden md:block">
                  <span className="stat-num rounded-md px-2 py-0.5 text-sm font-semibold" style={{ background: `${acwrTone(p.acwr)}1a`, color: acwrTone(p.acwr) }}>
                    {p.acwr.toFixed(2)}
                  </span>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <Sparkline data={p.trend} color={p.form >= 0 ? "#3FD79A" : "#FF5E6C"} width={72} height={24} />
                  <span className={cn("flex items-center text-xs font-semibold", p.form >= 0 ? "text-good" : "text-bad")}>
                    {p.form >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{Math.abs(p.form)}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Badge tone={statusTone(p.status) as any}>{p.status}</Badge>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  ArrowLeft,
  Activity,
  HeartPulse,
  TrendingUp,
  CalendarCheck,
  Check,
  X,
  Minus,
  Target,
  ChevronRight,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar, Badge, Ring, StatBar } from "../components/ui";
import {
  players,
  squads,
  categoryMeta,
  getDailyLog,
  getTrainingHistory,
  getBenchmarks,
} from "../data/mock";

const TABS = ["Overview", "Activity Log", "Training History", "Benchmarks"] as const;
type Tab = (typeof TABS)[number];

export default function PlayerProfile() {
  const { id } = useParams();
  const p = players.find((x) => x.id === id) ?? players[0];
  const squad = squads.find((s) => s.name === p.squad);
  const [tab, setTab] = useState<Tab>("Overview");

  const trendData = p.trend.map((v, i) => ({ week: `W${i + 1}`, idx: v }));
  const acwrColor = p.acwr > 1.5 ? "#FF5E6C" : p.acwr > 1.3 ? "#FBBF3C" : "#3FD79A";

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm text-fg-muted">
        <Link to="/app/squads" className="transition hover:text-fg">Squads</Link>
        <ChevronRight className="h-3.5 w-3.5 text-fg-dim" />
        {squad ? (
          <Link to={`/app/squads/${squad.id}`} className="transition hover:text-fg">{squad.name}</Link>
        ) : (
          <span>{p.squad}</span>
        )}
        <ChevronRight className="h-3.5 w-3.5 text-fg-dim" />
        <span className="text-fg">{p.name}</span>
      </div>

      {/* Hero */}
      <div className="panel relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-volt/10 blur-3xl" />
        <div className="relative flex flex-wrap items-center gap-5">
          <div className="relative">
            <Avatar name={p.name} size={80} />
            <span className="stat-num absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-ink-800 bg-volt text-sm font-bold text-base">
              {p.number}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight">{p.name}</h1>
              <Badge tone={p.status === "Available" ? "good" : p.status === "Injured" ? "bad" : "warn"}>{p.status}</Badge>
            </div>
            <div className="mt-1 text-sm text-fg-muted">{p.position} · {p.squad} · {p.age} years</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="chip">Top attribute · <span className="ml-1 font-semibold text-volt">{p.topAttribute}</span></span>
              <span className="chip">Attendance · <span className="ml-1 font-semibold text-fg">{p.attendance}%</span></span>
            </div>
          </div>
          <Ring value={p.readiness} size={84} color="#C6F24E" label="Readiness" />
        </div>
      </div>

      {/* Metric tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: HeartPulse, l: "Readiness", v: `${p.readiness}%`, c: "#C6F24E" },
          { icon: Activity, l: "Workload (ACWR)", v: p.acwr.toFixed(2), c: acwrColor },
          { icon: TrendingUp, l: "Form trend", v: `${p.form >= 0 ? "+" : ""}${p.form}`, c: p.form >= 0 ? "#3FD79A" : "#FF5E6C" },
          { icon: CalendarCheck, l: "7-day load", v: `${p.load7d}`, c: "#5B8CFF" },
        ].map((m) => (
          <div key={m.l} className="panel p-4">
            <div className="flex items-center gap-2 text-fg-dim">
              <m.icon className="h-4 w-4" style={{ color: m.c }} />
              <span className="text-[11px] uppercase tracking-wide">{m.l}</span>
            </div>
            <div className="stat-num mt-2 text-2xl font-bold" style={{ color: m.c }}>{m.v}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-line no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition",
              tab === t ? "text-volt" : "text-fg-muted hover:text-fg"
            )}
          >
            {t}
            {tab === t && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-volt" />}
          </button>
        ))}
      </div>

      {tab === "Overview" && <OverviewTab p={p} trendData={trendData} />}
      {tab === "Activity Log" && <ActivityTab p={p} />}
      {tab === "Training History" && <HistoryTab p={p} />}
      {tab === "Benchmarks" && <BenchmarksTab p={p} />}
    </div>
  );
}

function OverviewTab({ p, trendData }: { p: (typeof players)[number]; trendData: { week: string; idx: number }[] }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-5">
          <div className="label-eyebrow mb-1">Attribute profile</div>
          <h3 className="mb-2 font-display text-lg font-semibold">Player DNA</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={p.attributes} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="label" tick={{ fill: "#9AA2B4", fontSize: 11 }} />
                <Radar dataKey="value" stroke="#C6F24E" strokeWidth={2} fill="#C6F24E" fillOpacity={0.25} />
                <Tooltip contentStyle={{ background: "#0B0D12", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 12 }} labelStyle={{ color: "#EDF0F5" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-5">
          <div className="label-eyebrow mb-1">Last 12 weeks</div>
          <h3 className="mb-2 font-display text-lg font-semibold">Performance index</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="#646B7D" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#646B7D" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "#0B0D12", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 12 }} labelStyle={{ color: "#EDF0F5" }} />
                <Line type="monotone" dataKey="idx" name="Index" stroke="#C6F24E" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="panel p-5">
        <div className="label-eyebrow mb-3">Detailed attributes</div>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {p.attributes.map((a) => (
            <div key={a.label}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-fg-muted">{a.label}</span>
                <span className="stat-num font-semibold">{a.value}</span>
              </div>
              <StatBar value={a.value} color={a.value >= 85 ? "#C6F24E" : a.value >= 75 ? "#5B8CFF" : "#9A7BFF"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const actStatusIcon = {
  Completed: <Check className="h-3.5 w-3.5 text-good" />,
  Assigned: <Minus className="h-3.5 w-3.5 text-fg-dim" />,
  Missed: <X className="h-3.5 w-3.5 text-bad" />,
};

function ActivityTab({ p }: { p: (typeof players)[number] }) {
  const log = getDailyLog(p);
  return (
    <div className="space-y-3">
      <p className="text-sm text-fg-muted">Day-by-day record of everything assigned and completed.</p>
      {log.slice().reverse().map((d, i) => (
        <div key={i} className="panel p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-ink-700/60 text-center">
                <div className="text-[9px] uppercase text-fg-dim leading-none">{d.weekday}</div>
                <div className="stat-num text-sm font-bold leading-tight">{d.date.split(" ")[0]}</div>
              </div>
              <div className="flex gap-4 text-[11px]">
                <div><span className="text-fg-dim">Readiness</span> <span className="stat-num ml-1 font-semibold text-volt">{d.readiness}%</span></div>
                <div><span className="text-fg-dim">Load</span> <span className="stat-num ml-1 font-semibold text-plasma">{d.load}</span></div>
              </div>
            </div>
            <Badge tone={d.compliance >= 90 ? "good" : d.compliance >= 60 ? "warn" : "bad"}>{d.compliance}% complete</Badge>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {d.activities.map((a, j) => {
              const cat = categoryMeta[a.category];
              return (
                <div key={j} className="flex items-center gap-2.5 rounded-lg bg-ink-700/40 px-3 py-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cat.color }} />
                  <span className="flex-1 truncate text-sm">{a.label}</span>
                  <span className="flex items-center gap-1 text-[11px] text-fg-dim">{actStatusIcon[a.status]} {a.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoryTab({ p }: { p: (typeof players)[number] }) {
  const hist = getTrainingHistory(p);
  const tone = (s: string) => (s === "Completed" ? "good" : s === "Partial" ? "warn" : "bad");
  return (
    <div className="panel overflow-hidden p-0">
      <div className="hidden grid-cols-[1fr_2fr_1fr_1fr_1.4fr_1fr] gap-4 border-b border-line px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-fg-dim md:grid">
        <div>Date</div><div>Session</div><div>Load</div><div>Duration</div><div>Compliance</div><div className="text-right">Status</div>
      </div>
      <div className="divide-y divide-line">
        {hist.map((h, i) => (
          <div key={i} className="grid grid-cols-2 items-center gap-4 px-5 py-3.5 md:grid-cols-[1fr_2fr_1fr_1fr_1.4fr_1fr]">
            <div className="stat-num text-sm text-fg-muted">{h.date}</div>
            <div className="text-sm font-medium">{h.session} <span className="ml-1 text-[11px] text-fg-dim">· {h.type}</span></div>
            <div className="stat-num hidden text-sm text-fg-muted md:block">{h.load}</div>
            <div className="stat-num hidden text-sm text-fg-muted md:block">{h.duration}m</div>
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.08]">
                <div className="h-full rounded-full" style={{ width: `${h.compliance}%`, background: h.compliance >= 90 ? "#3FD79A" : h.compliance >= 50 ? "#FBBF3C" : "#FF5E6C" }} />
              </div>
              <span className="stat-num text-xs text-fg-muted">{h.compliance}%</span>
            </div>
            <div className="flex justify-end"><Badge tone={tone(h.status) as any}>{h.status}</Badge></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BenchmarksTab({ p }: { p: (typeof players)[number] }) {
  const benchmarks = getBenchmarks(p);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {benchmarks.map((b) => {
        const hit = b.lowerIsBetter ? b.actual <= b.target : b.actual >= b.target;
        const pct = b.lowerIsBetter
          ? Math.max(10, Math.min(100, (b.target / b.actual) * 100))
          : Math.max(10, Math.min(100, (b.actual / b.target) * 100));
        const improved = b.lowerIsBetter ? b.delta < 0 : b.delta > 0;
        return (
          <div key={b.metric} className="panel p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-volt" />
                <span className="text-sm font-semibold">{b.metric}</span>
              </div>
              <Badge tone={hit ? "good" : "warn"}>{hit ? "On target" : "Building"}</Badge>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="stat-num text-3xl font-bold">{b.actual}<span className="ml-1 text-sm font-normal text-fg-dim">{b.unit}</span></div>
                <div className="text-[11px] text-fg-dim">Target {b.target}{b.unit}</div>
              </div>
              <div className={cn("flex items-center gap-1 text-xs font-semibold", improved ? "text-good" : "text-bad")}>
                <TrendingUp className={cn("h-3.5 w-3.5", !improved && "rotate-180")} />
                {b.delta > 0 ? "+" : ""}{b.delta}{b.unit}
              </div>
            </div>
            <div className="mt-3">
              <StatBar value={pct} color={hit ? "#C6F24E" : "#FBBF3C"} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

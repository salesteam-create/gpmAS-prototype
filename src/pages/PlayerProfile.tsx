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
import { ArrowLeft, Activity, HeartPulse, TrendingUp, CalendarCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Avatar, Badge, Ring, StatBar } from "../components/ui";
import { players } from "../data/mock";

export default function PlayerProfile() {
  const { id } = useParams();
  const p = players.find((x) => x.id === id) ?? players[0];

  const trendData = p.trend.map((v, i) => ({ week: `W${i + 1}`, idx: v }));
  const acwrColor = p.acwr > 1.5 ? "#FF5E6C" : p.acwr > 1.3 ? "#FBBF3C" : "#3FD79A";

  return (
    <div className="space-y-6">
      <Link to="/app/players" className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition hover:text-fg">
        <ArrowLeft className="h-4 w-4" /> All players
      </Link>

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
          <div className="flex gap-3">
            <Ring value={p.readiness} size={84} color="#C6F24E" label="Readiness" />
          </div>
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

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attribute radar */}
        <div className="panel p-5">
          <div className="label-eyebrow mb-1">Attribute profile</div>
          <h3 className="mb-2 font-display text-lg font-semibold">Player DNA</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={p.attributes} outerRadius="72%">
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="label" tick={{ fill: "#9AA2B4", fontSize: 11 }} />
                <Radar dataKey="value" stroke="#C6F24E" strokeWidth={2} fill="#C6F24E" fillOpacity={0.25} />
                <Tooltip
                  contentStyle={{ background: "#0B0D12", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "#EDF0F5" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance trend */}
        <div className="panel p-5">
          <div className="label-eyebrow mb-1">Last 12 weeks</div>
          <h3 className="mb-2 font-display text-lg font-semibold">Performance index</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="week" stroke="#646B7D" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#646B7D" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: "#0B0D12", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "#EDF0F5" }}
                />
                <Line type="monotone" dataKey="idx" name="Index" stroke="#C6F24E" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Attribute bars */}
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

      {/* Development note */}
      <div className="panel relative overflow-hidden p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-volt/15 text-volt">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display font-semibold">Development focus</div>
            <p className="mt-1 text-sm text-fg-muted">
              {p.name.split(" ")[0]}'s {p.topAttribute.toLowerCase()} is a clear strength. The development plan prioritizes
              {p.form >= 0 ? " maintaining load while sharpening decision-making under pressure." : " managing workload and rebuilding match fitness before reintroducing high-intensity blocks."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

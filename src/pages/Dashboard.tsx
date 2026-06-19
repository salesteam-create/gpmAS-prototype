import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  HeartPulse,
  ShieldAlert,
  TrendingUp,
  Users,
  ChevronRight,
} from "lucide-react";
import { Avatar, Badge, Ring, SectionTitle, Stagger, StatBar } from "../components/ui";
import { club, loadTrend, players, squads } from "../data/mock";

function Kpi({
  label,
  value,
  unit,
  delta,
  icon: Icon,
  color,
  i,
}: {
  label: string;
  value: string;
  unit?: string;
  delta: number;
  icon: any;
  color: string;
  i: number;
}) {
  const up = delta >= 0;
  return (
    <Stagger i={i}>
      <div className="panel relative overflow-hidden p-5">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl" style={{ background: `${color}22` }} />
        <div className="flex items-center justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${color}1a`, color }}>
            <Icon className="h-5 w-5" />
          </div>
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? "text-good" : "text-bad"}`}>
            {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        </div>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="stat-num text-3xl font-bold">{value}</span>
          {unit && <span className="text-sm text-fg-dim">{unit}</span>}
        </div>
        <div className="mt-1 text-sm text-fg-muted">{label}</div>
      </div>
    </Stagger>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line2 bg-ink-900/95 px-3 py-2 text-xs shadow-float backdrop-blur">
      <div className="mb-1 font-semibold text-fg">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 text-fg-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="font-semibold text-fg">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const alerts = players.filter((p) => p.status === "Injured" || p.status === "Monitor" || p.acwr > 1.3);
  const topPerformers = [...players].sort((a, b) => b.form - a.form).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-eyebrow">{club.name} · {club.season}</div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">
            Good afternoon, Henrik 👋
          </h1>
          <p className="mt-1 text-sm text-fg-muted">
            Here's how your academy is performing across all squads today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="good"><span className="h-1.5 w-1.5 rounded-full bg-good" /> 3 squads training</Badge>
          <Badge tone="warn"><AlertTriangle className="h-3 w-3" /> {alerts.length} to monitor</Badge>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi i={0} label="Squad readiness" value="84" unit="%" delta={3} icon={HeartPulse} color="#C6F24E" />
        <Kpi i={1} label="Avg workload (ACWR)" value="1.08" delta={-4} icon={Activity} color="#5B8CFF" />
        <Kpi i={2} label="Active athletes" value="100" delta={2} icon={Users} color="#9A7BFF" />
        <Kpi i={3} label="Injury risk flags" value="2" delta={-33} icon={ShieldAlert} color="#FF5E6C" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main chart */}
        <Stagger i={1}>
          <div className="panel p-5 lg:col-span-2">
            <SectionTitle
              eyebrow="Last 8 weeks"
              title="Load vs Readiness"
              action={
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-fg-muted"><span className="h-2 w-2 rounded-full bg-volt" /> Load</span>
                  <span className="flex items-center gap-1.5 text-fg-muted"><span className="h-2 w-2 rounded-full bg-plasma" /> Readiness</span>
                </div>
              }
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loadTrend} margin={{ left: -16, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="gLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C6F24E" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#C6F24E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gRead" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5B8CFF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#5B8CFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="week" stroke="#646B7D" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#646B7D" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="load" name="Load" stroke="#C6F24E" strokeWidth={2.5} fill="url(#gLoad)" />
                  <Area type="monotone" dataKey="readiness" name="Readiness" stroke="#5B8CFF" strokeWidth={2.5} fill="url(#gRead)" yAxisId={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Stagger>

        {/* Risk / alerts */}
        <Stagger i={2}>
          <div className="panel flex h-full flex-col p-5">
            <SectionTitle eyebrow="Needs attention" title="Risk monitor" />
            <div className="space-y-2.5">
              {alerts.map((p) => (
                <Link
                  key={p.id}
                  to={`/app/players/${p.id}`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-ink-700/40 p-2.5 transition hover:border-line2 hover:bg-ink-600/50"
                >
                  <Avatar name={p.name} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{p.name}</div>
                    <div className="text-[11px] text-fg-dim">{p.position} · {p.squad}</div>
                  </div>
                  <div className="text-right">
                    <Badge tone={p.status === "Injured" ? "bad" : "warn"}>{p.status}</Badge>
                    <div className="mt-1 text-[10px] text-fg-dim">ACWR {p.acwr.toFixed(2)}</div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/app/players" className="mt-auto flex items-center justify-center gap-1 pt-4 text-xs font-semibold text-volt">
              View all athletes <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Stagger>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Squads */}
        <Stagger i={3}>
          <div className="lg:col-span-2">
            <SectionTitle
              eyebrow="Across the academy"
              title="Squads overview"
              action={<Link to="/app/squads" className="text-xs font-semibold text-volt">Manage squads →</Link>}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {squads.map((s) => (
                <Link
                  key={s.id}
                  to={`/app/squads/${s.id}`}
                  className="panel group flex items-center gap-4 p-4 transition hover:border-line2"
                >
                  <Ring value={s.avgReadiness} color={s.color} size={56} stroke={5} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                      <span className="font-display font-semibold">{s.name}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-fg-dim">{s.level} · {s.players} players</div>
                    <div className="mt-1 text-[11px] text-fg-muted">{s.coach}</div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="text-fg-dim">Next</div>
                    <div className="font-semibold text-fg">{s.nextSession}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Stagger>

        {/* Top performers */}
        <Stagger i={4}>
          <div className="panel p-5">
            <SectionTitle eyebrow="In form" title="Top performers" action={<TrendingUp className="h-4 w-4 text-volt" />} />
            <div className="space-y-1">
              {topPerformers.map((p, idx) => (
                <Link key={p.id} to={`/app/players/${p.id}`} className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.04]">
                  <span className="stat-num w-4 text-center text-sm font-bold text-fg-dim">{idx + 1}</span>
                  <Avatar name={p.name} size={34} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{p.name}</div>
                    <div className="text-[11px] text-fg-dim">{p.topAttribute}</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-good">
                    <ArrowUpRight className="h-3.5 w-3.5" /> {p.form}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-line bg-ink-700/40 p-3">
              <div className="mb-2 flex items-center justify-between text-[11px]">
                <span className="text-fg-dim">Attendance this week</span>
                <span className="font-semibold text-volt">96%</span>
              </div>
              <StatBar value={96} />
            </div>
          </div>
        </Stagger>
      </div>
    </div>
  );
}

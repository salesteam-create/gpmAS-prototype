import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar, Badge, Sparkline } from "../components/ui";
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

export default function Players() {
  const [query, setQuery] = useState("");
  const [squad, setSquad] = useState("All");

  const filtered = useMemo(
    () =>
      players.filter(
        (p) =>
          (squad === "All" || p.squad === squad) &&
          (!query || p.name.toLowerCase().includes(query.toLowerCase()) || p.position.toLowerCase().includes(query.toLowerCase()))
      ),
    [query, squad]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-eyebrow">Athlete database</div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Players</h1>
          <p className="mt-1 text-sm text-fg-muted">Readiness, workload and form for every athlete across the academy.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-ink-800/60 px-3 py-2 text-sm md:w-64">
          <Search className="h-4 w-4 text-fg-dim" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search players…" className="w-full bg-transparent outline-none placeholder:text-fg-dim" />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {["All", ...squads.map((s) => s.name)].map((s) => (
          <button key={s} onClick={() => setSquad(s)} className={cn("chip whitespace-nowrap", squad === s && "chip-active")}>{s}</button>
        ))}
      </div>

      {/* Table */}
      <div className="panel overflow-hidden p-0">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1.2fr_1fr] gap-4 border-b border-line px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-fg-dim md:grid">
          <div>Player</div>
          <div>Squad</div>
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
              className="grid grid-cols-2 items-center gap-4 px-5 py-3.5 transition hover:bg-white/[0.03] md:grid-cols-[2fr_1fr_1fr_1fr_1.2fr_1fr]"
            >
              <div className="flex items-center gap-3">
                <Avatar name={p.name} size={40} />
                <div>
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-[11px] text-fg-dim">#{p.number} · {p.position} · {p.age}y</div>
                </div>
              </div>
              <div className="hidden text-sm text-fg-muted md:block">{p.squad}</div>
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
  );
}

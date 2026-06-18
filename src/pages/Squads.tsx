import { Link } from "react-router-dom";
import { Users, ChevronRight, Trophy } from "lucide-react";
import { Avatar, Badge, Ring, Stagger, StatBar } from "../components/ui";
import { players, squads } from "../data/mock";

export default function Squads() {
  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">Academy structure</div>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Squads & Divisions</h1>
        <p className="mt-1 text-sm text-fg-muted">From foundation to first team — the full development pathway in one view.</p>
      </div>

      {/* Pathway strip */}
      <div className="panel flex items-center gap-2 overflow-x-auto p-4 no-scrollbar">
        {squads.slice().reverse().map((s, i, arr) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-ink-700/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <div>
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-[11px] text-fg-dim">{s.level}</div>
              </div>
            </div>
            {i < arr.length - 1 && <ChevronRight className="h-4 w-4 shrink-0 text-fg-dim" />}
          </div>
        ))}
        <div className="ml-2 flex items-center gap-2 rounded-xl border border-volt/30 bg-volt/10 px-4 py-2.5">
          <Trophy className="h-4 w-4 text-volt" />
          <div className="text-sm font-semibold text-volt">Pro contract</div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {squads.map((s, idx) => {
          const roster = players.filter((p) => p.squad === s.name);
          return (
            <Stagger key={s.id} i={idx}>
              <div className="panel p-5">
                <div className="flex items-center gap-4">
                  <Ring value={s.avgReadiness} color={s.color} size={64} stroke={6} label="Ready" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                      <h3 className="font-display text-lg font-bold">{s.name}</h3>
                    </div>
                    <div className="mt-0.5 text-xs text-fg-dim">{s.level}</div>
                    <div className="mt-1.5 flex items-center gap-3 text-[11px] text-fg-muted">
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {s.players} players</span>
                      <span>Coach · {s.coach}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-line bg-ink-700/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between text-[11px]">
                    <span className="text-fg-dim">Next session</span>
                    <span className="font-semibold text-fg">{s.nextSession}</span>
                  </div>
                  <StatBar value={s.avgReadiness} color={s.color} />
                </div>

                {/* Roster preview */}
                <div className="mt-4">
                  <div className="label-eyebrow mb-2">Squad members</div>
                  <div className="space-y-1">
                    {roster.length > 0 ? (
                      roster.map((p) => (
                        <Link key={p.id} to={`/app/players/${p.id}`} className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-white/[0.04]">
                          <span className="stat-num w-6 text-center text-xs font-bold text-fg-dim">#{p.number}</span>
                          <Avatar name={p.name} size={30} />
                          <span className="flex-1 truncate text-sm">{p.name}</span>
                          <span className="text-[11px] text-fg-dim">{p.position}</span>
                          <Badge tone={p.status === "Available" ? "good" : p.status === "Injured" ? "bad" : "warn"}>{p.status}</Badge>
                        </Link>
                      ))
                    ) : (
                      <div className="px-2 py-3 text-xs text-fg-dim">Roster managed in full athlete database.</div>
                    )}
                  </div>
                </div>
              </div>
            </Stagger>
          );
        })}
      </div>
    </div>
  );
}

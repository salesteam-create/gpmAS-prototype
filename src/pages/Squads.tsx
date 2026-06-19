import { Link } from "react-router-dom";
import { Users, ChevronRight, Trophy, ArrowRight } from "lucide-react";
import { Ring, Stagger, StatBar } from "../components/ui";
import { players, squads } from "../data/mock";

export default function Squads() {
  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">Academy structure</div>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Squads & Divisions</h1>
        <p className="mt-1 text-sm text-fg-muted">Pick a squad to open its dashboard, roster and players.</p>
      </div>

      {/* Pathway strip */}
      <div className="panel flex items-center gap-2 overflow-x-auto p-4 no-scrollbar">
        {squads.slice().reverse().map((s, i, arr) => (
          <div key={s.id} className="flex items-center gap-2">
            <Link to={`/app/squads/${s.id}`} className="flex items-center gap-3 rounded-xl border border-line bg-ink-700/40 px-4 py-2.5 transition hover:border-line2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
              <div>
                <div className="text-sm font-semibold">{s.name}</div>
                <div className="text-[11px] text-fg-dim">{s.level}</div>
              </div>
            </Link>
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
          const available = roster.filter((p) => p.status === "Available").length;
          return (
            <Stagger key={s.id} i={idx}>
              <Link
                to={`/app/squads/${s.id}`}
                className="panel group block p-5 transition hover:border-line2"
              >
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
                  <ArrowRight className="h-5 w-5 text-fg-dim transition group-hover:translate-x-1 group-hover:text-volt" />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                    <div className="stat-num text-lg font-bold text-good">{available}</div>
                    <div className="text-[10px] uppercase tracking-wide text-fg-dim">Available</div>
                  </div>
                  <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                    <div className="stat-num text-lg font-bold" style={{ color: s.color }}>{s.avgReadiness}%</div>
                    <div className="text-[10px] uppercase tracking-wide text-fg-dim">Readiness</div>
                  </div>
                  <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                    <div className="stat-num text-lg font-bold text-fg">{roster.length}</div>
                    <div className="text-[10px] uppercase tracking-wide text-fg-dim">Tracked</div>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-line bg-ink-700/40 p-3">
                  <div className="mb-1.5 flex items-center justify-between text-[11px]">
                    <span className="text-fg-dim">Next session</span>
                    <span className="font-semibold text-fg">{s.nextSession}</span>
                  </div>
                  <StatBar value={s.avgReadiness} color={s.color} />
                </div>
              </Link>
            </Stagger>
          );
        })}
      </div>
    </div>
  );
}

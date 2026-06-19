import { useMemo, useState } from "react";
import {
  PlayCircle,
  Clock,
  Flame,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  Dumbbell,
} from "lucide-react";
import { cn } from "../../lib/utils";
import {
  drills,
  assignedSessions,
  categoryMeta,
  intensityColor,
  type Intensity,
} from "../../data/mock";

const intensityWeight: Record<Intensity, number> = { Low: 1, Moderate: 2, High: 3, Max: 4 };

const statusTone = (s: string) => (s === "Completed" ? "good" : s === "Today" ? "volt" : "plasma");

export default function MySessions() {
  // Editable block lists keyed by session id (+ a personal one).
  const [blocksById, setBlocksById] = useState<Record<string, string[]>>(() => {
    const init: Record<string, string[]> = { personal: [] };
    assignedSessions.forEach((s) => (init[s.id] = s.blocks.map((b) => b.drillId)));
    return init;
  });
  const [selected, setSelected] = useState<string>(assignedSessions.find((s) => s.status === "Today")?.id ?? assignedSessions[0].id);
  const [completed, setCompleted] = useState<Set<string>>(new Set(assignedSessions.filter((s) => s.status === "Completed").map((s) => s.id)));
  const [query, setQuery] = useState("");

  const isPersonal = selected === "personal";
  const session = assignedSessions.find((s) => s.id === selected);
  const editable = isPersonal || !!session?.editable;
  const blockIds = blocksById[selected] ?? [];
  const blocks = blockIds.map((id) => drills.find((d) => d.id === id)!).filter(Boolean);
  const totalMin = blocks.reduce((s, d) => s + d.duration, 0);
  const loadScore = blocks.reduce((s, d) => s + d.duration * intensityWeight[d.intensity], 0);
  const loadPct = Math.min(100, Math.round((loadScore / 600) * 100));

  const palette = useMemo(() => drills.filter((d) => !query || d.title.toLowerCase().includes(query.toLowerCase())), [query]);

  const setBlocks = (fn: (b: string[]) => string[]) => setBlocksById((m) => ({ ...m, [selected]: fn(m[selected] ?? []) }));
  const add = (id: string) => setBlocks((b) => [...b, id]);
  const remove = (i: number) => setBlocks((b) => b.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) =>
    setBlocks((b) => {
      const j = i + dir;
      if (j < 0 || j >= b.length) return b;
      const copy = [...b];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });

  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">My training</div>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">My Sessions</h1>
        <p className="mt-1 text-sm text-fg-muted">View what your coach planned, adjust where allowed, or build your own.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Session list */}
        <div className="space-y-2">
          <div className="label-eyebrow px-1">Assigned to me</div>
          {assignedSessions.map((s) => {
            const done = completed.has(s.id);
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={cn(
                  "panel w-full p-4 text-left transition",
                  selected === s.id ? "border-volt/50 shadow-[inset_0_0_0_1px_rgba(198,242,78,0.3)]" : "hover:border-line2"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">{s.name}</span>
                  <span className={cn("chip", `chip-active`)} style={{ opacity: 0.95 }}>
                    {done ? <CheckCircle2 className="h-3 w-3" /> : s.editable ? null : <Lock className="h-3 w-3" />}
                    {done ? "Done" : s.status}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-fg-dim">{s.date} · {s.focus}</div>
              </button>
            );
          })}

          <button
            onClick={() => setSelected("personal")}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border border-dashed p-4 text-left text-sm font-semibold transition",
              selected === "personal" ? "border-volt/50 bg-volt/5 text-volt" : "border-line2 text-fg-muted hover:text-fg"
            )}
          >
            <Plus className="h-4 w-4" /> Build a personal session
          </button>
        </div>

        {/* Detail / builder */}
        <div className="space-y-4">
          <div className="panel p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl font-bold tracking-tight">{isPersonal ? "My personal session" : session!.name}</h2>
                  {!editable && <span className="chip"><Lock className="h-3 w-3" /> Locked</span>}
                </div>
                <div className="mt-1 text-sm text-fg-muted">{isPersonal ? "Build something for yourself" : session!.focus}</div>
              </div>
              {!isPersonal && (
                <button
                  onClick={() => setCompleted((c) => { const n = new Set(c); n.has(selected) ? n.delete(selected) : n.add(selected); return n; })}
                  className={cn("btn", completed.has(selected) ? "border border-good/40 bg-good/15 text-good" : "btn-volt")}
                >
                  <CheckCircle2 className="h-4 w-4" /> {completed.has(selected) ? "Completed" : "Mark complete"}
                </button>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                <div className="stat-num text-2xl font-bold text-volt">{totalMin}</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-dim">Minutes</div>
              </div>
              <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                <div className="stat-num text-2xl font-bold text-plasma">{blocks.length}</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-dim">Drills</div>
              </div>
              <div className="rounded-xl border border-line bg-ink-700/40 p-3">
                <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wide text-fg-dim">
                  <span>Load</span><span className="text-fg">{loadPct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full" style={{ width: `${loadPct}%`, background: loadPct > 80 ? "#FF5E6C" : loadPct > 55 ? "#FBBF3C" : "#3FD79A" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Blocks */}
          <div className="space-y-2">
            {blocks.map((d, idx) => {
              const cat = categoryMeta[d.category];
              return (
                <div key={`${d.id}-${idx}`} className="panel flex items-center gap-3 p-3">
                  <div className="stat-num grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-xs font-bold text-fg-muted">{idx + 1}</div>
                  <div className="h-10 w-1 rounded-full" style={{ background: cat.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{d.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-fg-dim">
                      <span style={{ color: cat.color }}>{d.category}</span>
                      <span className="flex items-center gap-1"><Flame className="h-3 w-3" style={{ color: intensityColor[d.intensity] }} /> {d.intensity}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {d.duration}m</span>
                    </div>
                  </div>
                  <button className="btn-ghost px-2.5 py-1.5 text-xs"><PlayCircle className="h-4 w-4" /> Watch</button>
                  {editable && (
                    <div className="flex flex-col">
                      <button onClick={() => move(idx, -1)} className="grid h-5 w-6 place-items-center text-fg-dim hover:text-fg"><ChevronUp className="h-3.5 w-3.5" /></button>
                      <button onClick={() => move(idx, 1)} className="grid h-5 w-6 place-items-center text-fg-dim hover:text-fg"><ChevronDown className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                  {editable && (
                    <button onClick={() => remove(idx)} className="grid h-8 w-8 place-items-center rounded-lg text-fg-dim transition hover:bg-bad/15 hover:text-bad"><Trash2 className="h-4 w-4" /></button>
                  )}
                </div>
              );
            })}
            {blocks.length === 0 && (
              <div className="grid place-items-center rounded-2xl border border-dashed border-line2 bg-ink-800/30 py-8 text-sm text-fg-dim">
                {editable ? "Add drills from the library below." : "No drills in this session."}
              </div>
            )}
          </div>

          {/* Add drills (editable only) */}
          {editable && (
            <div className="panel p-4">
              <div className="mb-3 flex items-center gap-2 rounded-xl border border-line bg-ink-700/50 px-3 py-2 text-sm">
                <Search className="h-4 w-4 text-fg-dim" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Add a drill from the library…" className="w-full bg-transparent outline-none placeholder:text-fg-dim" />
              </div>
              <div className="grid max-h-64 grid-cols-1 gap-2 overflow-y-auto pr-1 no-scrollbar sm:grid-cols-2">
                {palette.map((d) => {
                  const cat = categoryMeta[d.category];
                  return (
                    <button key={d.id} onClick={() => add(d.id)} className="group flex items-center gap-2.5 rounded-xl border border-line bg-ink-700/40 p-2.5 text-left transition hover:border-volt/40">
                      <Dumbbell className="h-4 w-4" style={{ color: cat.color }} />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{d.title}</div>
                        <div className="text-[11px] text-fg-dim">{d.category} · {d.duration}m</div>
                      </div>
                      <Plus className="h-4 w-4 text-fg-dim transition group-hover:text-volt" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {!editable && (
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-ink-800/40 p-4 text-sm text-fg-muted">
              <Sparkles className="h-4 w-4 shrink-0 text-volt" />
              This session is locked by your coach. You can watch the drills, but edits aren't allowed — open today's or an upcoming session to adjust it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  GripVertical,
  Trash2,
  Clock,
  Flame,
  Save,
  Send,
  Sparkles,
  Search,
} from "lucide-react";
import { cn } from "../lib/utils";
import AssignDialog from "../components/AssignDialog";
import {
  drills,
  categoryMeta,
  intensityColor,
  sessionTemplate,
  squads,
  type Intensity,
} from "../data/mock";

const intensityWeight: Record<Intensity, number> = { Low: 1, Moderate: 2, High: 3, Max: 4 };

export default function SessionBuilder() {
  const [blockIds, setBlockIds] = useState<string[]>(sessionTemplate.blocks.map((b) => b.drillId));
  const [query, setQuery] = useState("");
  const [squad, setSquad] = useState("Senior Squad");
  const [assignOpen, setAssignOpen] = useState(false);

  const palette = useMemo(
    () => drills.filter((d) => !query || d.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const blocks = blockIds.map((id) => drills.find((d) => d.id === id)!).filter(Boolean);
  const totalMin = blocks.reduce((s, d) => s + d.duration, 0);
  const loadScore = blocks.reduce((s, d) => s + d.duration * intensityWeight[d.intensity], 0);
  const loadPct = Math.min(100, Math.round((loadScore / 600) * 100));

  function add(id: string) {
    setBlockIds((b) => [...b, id]);
  }
  function remove(idx: number) {
    setBlockIds((b) => b.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-eyebrow">Plan an elite session</div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Session Builder</h1>
          <p className="mt-1 text-sm text-fg-muted">Drop drills into the timeline. Save as a template any coach can run.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost"><Save className="h-4 w-4" /> Save template</button>
          <button onClick={() => setAssignOpen(true)} className="btn-volt"><Send className="h-4 w-4" /> Assign session</button>
        </div>
      </div>

      <AnimatePresence>
        {assignOpen && (
          <AssignDialog
            open
            onClose={() => setAssignOpen(false)}
            title={sessionTemplate.name}
            drillIds={blockIds}
            kind="session"
          />
        )}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Palette */}
        <div className="panel flex flex-col p-4">
          <div className="mb-3 flex items-center gap-2 rounded-xl border border-line bg-ink-700/50 px-3 py-2 text-sm">
            <Search className="h-4 w-4 text-fg-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a drill to add…"
              className="w-full bg-transparent outline-none placeholder:text-fg-dim"
            />
          </div>
          <div className="label-eyebrow mb-2 px-1">Library · tap to add</div>
          <div className="flex max-h-[560px] flex-col gap-2 overflow-y-auto pr-1 no-scrollbar">
            {palette.map((d) => {
              const cat = categoryMeta[d.category];
              return (
                <button
                  key={d.id}
                  onClick={() => add(d.id)}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-ink-700/40 p-2.5 text-left transition hover:border-volt/40 hover:bg-ink-600/50"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg" style={{ background: `${cat.color}1a` }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: cat.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">{d.title}</div>
                    <div className="flex items-center gap-2 text-[11px] text-fg-dim">
                      <span>{d.category}</span>·<span>{d.duration}m</span>
                    </div>
                  </div>
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.04] text-fg-muted transition group-hover:bg-volt group-hover:text-base">
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {/* Session header */}
          <div className="panel p-5">
            <input
              defaultValue={sessionTemplate.name}
              className="w-full bg-transparent font-display text-xl font-bold tracking-tight outline-none"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <select
                value={squad}
                onChange={(e) => setSquad(e.target.value)}
                className="rounded-lg border border-line bg-ink-700/60 px-3 py-1.5 text-fg-muted outline-none"
              >
                {squads.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
              <span className="flex items-center gap-1.5 text-fg-muted"><Clock className="h-4 w-4" /> {sessionTemplate.date}</span>
            </div>

            {/* Load meter */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                <div className="stat-num text-2xl font-bold text-volt">{totalMin}</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-dim">Total minutes</div>
              </div>
              <div className="rounded-xl border border-line bg-ink-700/40 p-3 text-center">
                <div className="stat-num text-2xl font-bold text-plasma">{blocks.length}</div>
                <div className="text-[10px] uppercase tracking-wide text-fg-dim">Blocks</div>
              </div>
              <div className="rounded-xl border border-line bg-ink-700/40 p-3">
                <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wide text-fg-dim">
                  <span>Session load</span><span className="text-fg">{loadPct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${loadPct}%`, background: loadPct > 80 ? "#FF5E6C" : loadPct > 55 ? "#FBBF3C" : "#3FD79A" }}
                  />
                </div>
                <div className="mt-1 text-[10px] text-fg-dim">{loadPct > 80 ? "High — schedule recovery" : loadPct > 55 ? "Balanced" : "Light"}</div>
              </div>
            </div>
          </div>

          {/* Blocks */}
          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {blocks.map((d, idx) => {
                const cat = categoryMeta[d.category];
                return (
                  <motion.div
                    key={`${d.id}-${idx}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="panel group flex items-center gap-3 p-3"
                  >
                    <GripVertical className="h-4 w-4 cursor-grab text-fg-dim" />
                    <div className="stat-num grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-xs font-bold text-fg-muted">
                      {idx + 1}
                    </div>
                    <div className="h-10 w-1 rounded-full" style={{ background: cat.color }} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{d.title}</div>
                      <div className="flex items-center gap-2 text-[11px] text-fg-dim">
                        <span style={{ color: cat.color }}>{d.category}</span>
                        <span className="flex items-center gap-1"><Flame className="h-3 w-3" style={{ color: intensityColor[d.intensity] }} /> {d.intensity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-white/[0.04] px-2 py-1 text-xs text-fg-muted">
                      <Clock className="h-3 w-3" /> {d.duration}m
                    </div>
                    <button
                      onClick={() => remove(idx)}
                      className="grid h-8 w-8 place-items-center rounded-lg text-fg-dim opacity-0 transition hover:bg-bad/15 hover:text-bad group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Drop hint */}
            <div className="grid place-items-center rounded-2xl border border-dashed border-line2 bg-ink-800/30 py-6 text-center text-sm text-fg-dim">
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Tap a drill on the left to add it here
              </div>
            </div>

            {/* Copilot suggestion */}
            <div className="relative overflow-hidden rounded-2xl border border-volt/20 bg-gradient-to-r from-volt/10 to-transparent p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 shrink-0 text-volt" />
                <div>
                  <div className="text-sm font-semibold">Copilot suggestion</div>
                  <p className="mt-0.5 text-[13px] text-fg-muted">
                    Senior Squad readiness is 84% with a match in 2 days. Consider trimming the high-intensity block and adding <span className="font-semibold text-volt">Active Recovery Flow</span>.
                  </p>
                  <button
                    onClick={() => add("d8")}
                    className="mt-2 rounded-lg bg-volt/15 px-3 py-1.5 text-xs font-semibold text-volt transition hover:bg-volt/25"
                  >
                    Apply suggestion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Star,
  Clock,
  Users2,
  Flame,
  PlayCircle,
  X,
  Plus,
  Check,
  Sparkles,
  SlidersHorizontal,
  Send,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Badge } from "../components/ui";
import AssignDialog from "../components/AssignDialog";
import {
  drills,
  categoryMeta,
  intensityColor,
  type Drill,
  type DrillCategory,
} from "../data/mock";

const categories: (DrillCategory | "All")[] = [
  "All",
  "Technical",
  "Tactical",
  "Strength & Conditioning",
  "Speed & Agility",
  "Cardio",
  "Recovery",
  "Goalkeeping",
];

function DifficultyDots({ level, color }: { level: number; color: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: d <= level ? color : "rgba(255,255,255,0.12)" }}
        />
      ))}
    </div>
  );
}

function DrillCard({ drill, onOpen }: { drill: Drill; onOpen: () => void }) {
  const cat = categoryMeta[drill.category];
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      onClick={onOpen}
      className="panel group overflow-hidden text-left transition hover:border-line2"
    >
      {/* Thumbnail */}
      <div
        className="relative aspect-video overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${cat.color}26, #0F121A 65%)` }}
      >
        <div className="absolute inset-0 bg-grid-faint [background-size:22px_22px] opacity-40" />
        {drill.signature && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-base/60 px-2 py-1 text-[10px] font-semibold text-volt backdrop-blur">
            <Sparkles className="h-3 w-3" /> Signature
          </span>
        )}
        <span
          className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold"
          style={{ background: `${cat.color}22`, color: cat.color }}
        >
          {drill.category}
        </span>
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur transition group-hover:scale-110 group-hover:border-white/40">
          <PlayCircle className="h-7 w-7" style={{ color: cat.color }} />
        </div>
        <div className="absolute bottom-2 right-3 flex items-center gap-1 rounded-md bg-base/60 px-1.5 py-0.5 text-[10px] text-fg backdrop-blur">
          <Clock className="h-3 w-3" /> {drill.duration}m
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[15px] font-semibold leading-tight">{drill.title}</h3>
          <span className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-warn">
            <Star className="h-3.5 w-3.5 fill-warn" /> {drill.rating}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {drill.focus.slice(0, 2).map((f) => (
            <span key={f} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-fg-muted">{f}</span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <div className="flex items-center gap-1.5 text-[11px] text-fg-dim">
            <Flame className="h-3.5 w-3.5" style={{ color: intensityColor[drill.intensity] }} />
            {drill.intensity}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-fg-dim">
            <Users2 className="h-3.5 w-3.5" /> {drill.players}
          </div>
          <DifficultyDots level={drill.difficulty} color={cat.color} />
        </div>
      </div>
    </motion.button>
  );
}

function DrillModal({ drill, onClose }: { drill: Drill; onClose: () => void }) {
  const cat = categoryMeta[drill.category];
  const [added, setAdded] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="panel relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto no-scrollbar"
      >
        {/* Video */}
        <div
          className="relative aspect-video overflow-hidden rounded-t-2xl"
          style={{ background: `linear-gradient(150deg, ${cat.color}30, #0B0D12 70%)` }}
        >
          <div className="absolute inset-0 bg-grid-faint [background-size:26px_26px] opacity-40" />
          <button onClick={onClose} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-base/60 text-fg backdrop-blur transition hover:bg-base">
            <X className="h-4.5 w-4.5" />
          </button>
          <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center">
            <button className="grid h-16 w-16 place-items-center rounded-full border border-white/25 bg-black/40 backdrop-blur transition hover:scale-105">
              <PlayCircle className="h-9 w-9" style={{ color: cat.color }} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-4 pb-3">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-1/3 rounded-full" style={{ background: cat.color }} />
            </div>
            <span className="text-[10px] text-white/70">02:14 / {drill.duration}:00</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: `${cat.color}22`, color: cat.color }}>
              {drill.category}
            </span>
            {drill.signature && <Badge tone="volt"><Sparkles className="h-3 w-3" /> Signature curriculum</Badge>}
            <span className="flex items-center gap-1 text-xs font-semibold text-warn">
              <Star className="h-3.5 w-3.5 fill-warn" /> {drill.rating} · {drill.uses} uses
            </span>
          </div>

          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">{drill.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{drill.description}</p>

          {/* Quick facts */}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Duration", v: `${drill.duration} min` },
              { l: "Intensity", v: drill.intensity, c: intensityColor[drill.intensity] },
              { l: "Group size", v: drill.players },
              { l: "Difficulty", v: `${drill.difficulty}/5` },
            ].map((f) => (
              <div key={f.l} className="rounded-xl border border-line bg-ink-700/40 p-3">
                <div className="text-[10px] uppercase tracking-wide text-fg-dim">{f.l}</div>
                <div className="mt-1 font-display font-semibold" style={{ color: f.c }}>{f.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <div className="label-eyebrow mb-2">Coaching points</div>
              <ul className="space-y-2">
                {drill.coachingPoints.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-volt" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-5">
              <div>
                <div className="label-eyebrow mb-2">Tracked metrics</div>
                <div className="flex flex-wrap gap-1.5">
                  {drill.metrics.map((m) => (
                    <span key={m} className="chip">{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="label-eyebrow mb-2">Equipment</div>
                <div className="flex flex-wrap gap-1.5">
                  {drill.equipment.map((e) => (
                    <span key={e} className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-fg-muted">{e}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="label-eyebrow mb-2">Age groups</div>
                <div className="flex flex-wrap gap-1.5">
                  {drill.ageGroups.map((a) => (
                    <span key={a} className="rounded-md border border-line px-2 py-1 text-[11px] text-fg-muted">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setAdded((v) => !v)}
              className={cn("btn flex-1", added ? "border border-good/40 bg-good/15 text-good" : "btn-volt")}
            >
              {added ? <><Check className="h-4 w-4" /> Added to session</> : <><Plus className="h-4 w-4" /> Add to session</>}
            </button>
            <button onClick={() => setAssignOpen(true)} className="btn-ghost">
              <Send className="h-4 w-4" /> Assign
            </button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {assignOpen && (
          <AssignDialog open onClose={() => setAssignOpen(false)} title={drill.title} drillIds={[drill.id]} kind="drill" />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Library() {
  const [active, setActive] = useState<(DrillCategory | "All")>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Drill | null>(null);

  const filtered = useMemo(() => {
    return drills.filter((d) => {
      const matchCat = active === "All" || d.category === active;
      const matchQ =
        !query ||
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.focus.some((f) => f.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQ;
    });
  }, [active, query]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="label-eyebrow">The competitive edge</div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Drill & Exercise Library</h1>
          <p className="mt-1 text-sm text-fg-muted">
            {drills.length} curated drills · video, coaching points & tracked metrics for every session.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-ink-800/60 px-3 py-2 text-sm md:w-72">
          <Search className="h-4 w-4 text-fg-dim" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drills, focus…"
            className="w-full bg-transparent text-fg outline-none placeholder:text-fg-dim"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <SlidersHorizontal className="h-4 w-4 shrink-0 text-fg-dim" />
        {categories.map((c) => {
          const meta = c !== "All" ? categoryMeta[c] : null;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn("chip whitespace-nowrap", active === c && "chip-active")}
            >
              {meta && <span className="h-2 w-2 rounded-full" style={{ background: meta.color }} />}
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((d) => (
            <DrillCard key={d.id} drill={d} onOpen={() => setSelected(d)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="panel grid place-items-center py-16 text-center text-fg-muted">
          No drills match your filters.
        </div>
      )}

      <AnimatePresence>
        {selected && <DrillModal drill={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}

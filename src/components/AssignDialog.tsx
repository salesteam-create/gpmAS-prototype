import { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Users, Check, CalendarClock } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar } from "./ui";
import { players, squads } from "../data/mock";
import { useStore, type TargetType } from "../context/store";

const dateOptions = ["Today · Thu 19 Jun", "Fri 20 Jun", "Sat 21 Jun", "Mon 23 Jun", "Next week"];

export default function AssignDialog({
  open,
  onClose,
  title,
  drillIds,
  kind,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  drillIds: string[];
  kind: "drill" | "session";
}) {
  const { addAssignment } = useStore();
  const [targetType, setTargetType] = useState<TargetType>("player");
  const [playerId, setPlayerId] = useState(players[0].id);
  const [squadId, setSquadId] = useState(squads[0].id);
  const [date, setDate] = useState(dateOptions[0]);
  const [note, setNote] = useState("");

  if (!open) return null;

  const confirm = () => {
    addAssignment({
      kind,
      title,
      drillIds,
      targetType,
      targetId: targetType === "player" ? playerId : squadId,
      date: date.replace("Today · ", ""),
      note: note.trim() || undefined,
    });
    onClose();
  };

  return (
    <motion.div className="fixed inset-0 z-[60] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="panel relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto no-scrollbar p-6"
      >
        <button onClick={onClose} className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-ink-700/60 text-fg-muted transition hover:text-fg">
          <X className="h-4 w-4" />
        </button>

        <div className="label-eyebrow">Assign {kind}</div>
        <h2 className="mt-1 font-display text-xl font-bold tracking-tight">{title}</h2>

        {/* Target toggle */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          {([
            { t: "player" as const, icon: User, label: "Individual player" },
            { t: "squad" as const, icon: Users, label: "Whole squad" },
          ]).map((o) => (
            <button
              key={o.t}
              onClick={() => setTargetType(o.t)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold transition",
                targetType === o.t ? "border-volt/50 bg-volt/10 text-volt" : "border-line bg-ink-700/40 text-fg-muted hover:text-fg"
              )}
            >
              <o.icon className="h-4 w-4" /> {o.label}
            </button>
          ))}
        </div>

        {/* Picker */}
        <div className="mt-4">
          <div className="label-eyebrow mb-2">{targetType === "player" ? "Select player" : "Select squad"}</div>
          {targetType === "player" ? (
            <div className="grid max-h-52 grid-cols-1 gap-1.5 overflow-y-auto pr-1 no-scrollbar">
              {players.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlayerId(p.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-3 py-2 text-left transition",
                    playerId === p.id ? "border-volt/40 bg-volt/5" : "border-line bg-ink-700/40 hover:border-line2"
                  )}
                >
                  <Avatar name={p.name} size={32} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{p.name}</div>
                    <div className="text-[11px] text-fg-dim">{p.position} · {p.squad}</div>
                  </div>
                  {playerId === p.id && <Check className="h-4 w-4 text-volt" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {squads.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSquadId(s.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition",
                    squadId === s.id ? "border-volt/40 bg-volt/5" : "border-line bg-ink-700/40 hover:border-line2"
                  )}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{s.name}</div>
                    <div className="text-[11px] text-fg-dim">{s.players} players</div>
                  </div>
                  {squadId === s.id && <Check className="h-4 w-4 text-volt" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Schedule + note */}
        <div className="mt-4 grid gap-3">
          <label className="block">
            <span className="label-eyebrow mb-1.5 flex items-center gap-1.5"><CalendarClock className="h-3.5 w-3.5" /> Schedule</span>
            <select value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-line bg-ink-700/60 px-3 py-2.5 text-sm outline-none">
              {dateOptions.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="label-eyebrow mb-1.5 block">Note (optional)</span>
            <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. focus on weak foot, 80% intensity…" className="w-full rounded-xl border border-line bg-ink-700/60 px-3 py-2.5 text-sm outline-none placeholder:text-fg-dim" />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
          <button onClick={confirm} className="btn-volt flex-1"><Check className="h-4 w-4" /> Assign</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

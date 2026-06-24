import { useState } from "react";
import { MessageSquare, Megaphone, FileText, Send, Paperclip, User, Users, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar, Badge } from "../components/ui";
import { players, squads } from "../data/mock";
import { useStore, targetLabel, type MsgType, type TargetType } from "../context/store";

const typeMeta: Record<MsgType, { icon: typeof MessageSquare; tone: "volt" | "warn" | "plasma"; hint: string }> = {
  Message: { icon: MessageSquare, tone: "volt", hint: "Direct message to a player or squad" },
  Announcement: { icon: Megaphone, tone: "warn", hint: "Broadcast news to a whole squad" },
  Information: { icon: FileText, tone: "plasma", hint: "Share notes or a document/clip" },
};

export default function Messages() {
  const { messages, sendMessage, markRead } = useStore();
  const [type, setType] = useState<MsgType>("Message");
  const [targetType, setTargetType] = useState<TargetType>("squad");
  const [playerId, setPlayerId] = useState(players[0].id);
  const [squadId, setSquadId] = useState(squads[0].id);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [attach, setAttach] = useState(false);

  const canSend = body.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    sendMessage(
      {
        type,
        targetType,
        targetId: targetType === "player" ? playerId : squadId,
        subject: subject.trim() || undefined,
        body: body.trim(),
        attachment: type === "Information" && attach ? "Opposition_Analysis.pdf" : undefined,
      },
      "coach"
    );
    setBody("");
    setSubject("");
    setAttach(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">Communicate with your athletes</div>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Messages</h1>
        <p className="mt-1 text-sm text-fg-muted">Message a player, broadcast to a squad, or share information & resources.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Composer */}
        <div className="panel h-fit p-5">
          <div className="label-eyebrow mb-2">New</div>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(typeMeta) as MsgType[]).map((t) => {
              const m = typeMeta[t];
              return (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-semibold transition",
                    type === t ? "border-volt/50 bg-volt/10 text-volt" : "border-line bg-ink-700/40 text-fg-muted hover:text-fg"
                  )}
                >
                  <m.icon className="h-4 w-4" /> {t}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-fg-dim">{typeMeta[type].hint}</p>

          {/* Recipient */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {([{ t: "player" as const, icon: User, l: "Player" }, { t: "squad" as const, icon: Users, l: "Squad" }]).map((o) => (
              <button
                key={o.t}
                onClick={() => setTargetType(o.t)}
                className={cn("flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition", targetType === o.t ? "border-volt/40 bg-volt/5 text-volt" : "border-line bg-ink-700/40 text-fg-muted hover:text-fg")}
              >
                <o.icon className="h-4 w-4" /> {o.l}
              </button>
            ))}
          </div>
          <select
            value={targetType === "player" ? playerId : squadId}
            onChange={(e) => (targetType === "player" ? setPlayerId(e.target.value) : setSquadId(e.target.value))}
            className="mt-2 w-full rounded-xl border border-line bg-ink-700/60 px-3 py-2.5 text-sm outline-none"
          >
            {targetType === "player"
              ? players.map((p) => <option key={p.id} value={p.id}>{p.name} · {p.position}</option>)
              : squads.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          {type !== "Message" && (
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="mt-2 w-full rounded-xl border border-line bg-ink-700/60 px-3 py-2.5 text-sm outline-none placeholder:text-fg-dim" />
          )}
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Write your message…" className="mt-2 w-full resize-none rounded-xl border border-line bg-ink-700/60 px-3 py-2.5 text-sm outline-none placeholder:text-fg-dim" />

          {type === "Information" && (
            <button onClick={() => setAttach((a) => !a)} className={cn("mt-2 flex w-full items-center gap-2 rounded-xl border border-dashed px-3 py-2.5 text-sm transition", attach ? "border-volt/40 bg-volt/5 text-volt" : "border-line2 text-fg-muted hover:text-fg")}>
              <Paperclip className="h-4 w-4" /> {attach ? "Opposition_Analysis.pdf attached" : "Attach a file / clip"}
              {attach && <Check className="ml-auto h-4 w-4" />}
            </button>
          )}

          <button onClick={send} disabled={!canSend} className="btn-volt mt-4 w-full"><Send className="h-4 w-4" /> Send {type.toLowerCase()}</button>
        </div>

        {/* Activity feed */}
        <div>
          <div className="label-eyebrow mb-3">Recent activity</div>
          <div className="space-y-2.5">
            {messages.map((m) => {
              const meta = typeMeta[m.type];
              const fromAthlete = m.fromRole === "athlete";
              return (
                <div
                  key={m.id}
                  onClick={() => fromAthlete && markRead(m.id)}
                  className={cn("panel p-4", fromAthlete && !m.read && "cursor-pointer border-volt/40")}
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={m.from} size={38} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{m.from}</span>
                        <span className="text-[11px] text-fg-dim">
                          {fromAthlete ? "→ you" : `→ ${targetLabel(m.targetType, m.targetId)}`}
                        </span>
                        <Badge tone={meta.tone}><meta.icon className="h-3 w-3" /> {m.type}</Badge>
                        {fromAthlete && !m.read && <span className="h-1.5 w-1.5 rounded-full bg-volt" />}
                      </div>
                      {m.subject && <div className="mt-1 text-sm font-medium">{m.subject}</div>}
                      <p className="mt-0.5 text-sm text-fg-muted">{m.body}</p>
                      {m.attachment && (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-lg border border-line bg-ink-700/50 px-2.5 py-1.5 text-[11px] text-fg-muted">
                          <Paperclip className="h-3 w-3 text-plasma" /> {m.attachment}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { MessageSquare, Megaphone, FileText, Paperclip, Send, Users } from "lucide-react";
import { cn } from "../../lib/utils";
import { Avatar, Badge } from "../../components/ui";
import { useStore, reachesAthlete, squadName, type MsgType } from "../../context/store";
import { useRole } from "../../context/role";
import { players } from "../../data/mock";

const typeMeta: Record<MsgType, { icon: typeof MessageSquare; tone: "volt" | "warn" | "plasma" }> = {
  Message: { icon: MessageSquare, tone: "volt" },
  Announcement: { icon: Megaphone, tone: "warn" },
  Information: { icon: FileText, tone: "plasma" },
};

export default function Inbox() {
  const { messages, markRead, sendMessage } = useStore();
  const { athleteId } = useRole();
  const me = players.find((p) => p.id === athleteId)!;
  const [reply, setReply] = useState("");

  const mine = messages
    .filter((m) => m.fromRole === "coach" && reachesAthlete(m.targetType, m.targetId, athleteId))
    .sort((a, b) => b.seq - a.seq);

  const send = () => {
    if (!reply.trim()) return;
    sendMessage({ type: "Message", targetType: "player", targetId: "coach", body: reply.trim() }, "athlete");
    setReply("");
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">From your coach</div>
        <h1 className="mt-1 font-display text-2xl font-bold tracking-tight md:text-3xl">Inbox</h1>
        <p className="mt-1 text-sm text-fg-muted">Messages, announcements and information from your coaching staff.</p>
      </div>

      {/* Reply to coach */}
      <div className="panel flex items-center gap-3 p-3">
        <Avatar name={me.name} size={36} />
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message your coach…"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-fg-dim"
        />
        <button onClick={send} disabled={!reply.trim()} className="btn-volt px-3 py-2 text-xs"><Send className="h-4 w-4" /> Send</button>
      </div>

      <div className="space-y-2.5">
        {mine.map((m) => {
          const meta = typeMeta[m.type];
          const toSquad = m.targetType === "squad";
          return (
            <div
              key={m.id}
              onClick={() => !m.read && markRead(m.id)}
              className={cn("panel p-4 transition", !m.read && "cursor-pointer border-volt/40 shadow-[inset_0_0_0_1px_rgba(198,242,78,0.2)]")}
            >
              <div className="flex items-start gap-3">
                <Avatar name={m.from} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{m.from}</span>
                    <span className="text-[11px] text-fg-dim">Coach</span>
                    <Badge tone={meta.tone}><meta.icon className="h-3 w-3" /> {m.type}</Badge>
                    {toSquad && (
                      <span className="flex items-center gap-1 text-[11px] text-fg-dim"><Users className="h-3 w-3" /> {squadName(m.targetId)}</span>
                    )}
                    {!m.read && <span className="ml-auto h-2 w-2 rounded-full bg-volt" />}
                  </div>
                  {m.subject && <div className="mt-1 font-display text-sm font-semibold">{m.subject}</div>}
                  <p className="mt-0.5 text-sm text-fg-muted">{m.body}</p>
                  {m.attachment && (
                    <button className="mt-2 inline-flex items-center gap-2 rounded-lg border border-line bg-ink-700/50 px-2.5 py-1.5 text-[11px] text-fg-muted transition hover:border-line2 hover:text-fg">
                      <Paperclip className="h-3 w-3 text-plasma" /> {m.attachment} · download
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {mine.length === 0 && (
          <div className="panel grid place-items-center py-16 text-center text-fg-muted">No messages yet.</div>
        )}
      </div>
    </div>
  );
}

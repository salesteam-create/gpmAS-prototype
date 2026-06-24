import { createContext, useContext, useState, type ReactNode } from "react";
import { players, squads } from "../data/mock";

// ─────────────────────────────────────────────────────────────────────────
// In-memory app store — the coach→athlete loop. No backend: state lives for
// the session so that coach actions (assigning drills, messaging) reflect
// live when you switch to the athlete role. Resets on page refresh.
// ─────────────────────────────────────────────────────────────────────────

export type MsgType = "Message" | "Announcement" | "Information";
export type TargetType = "player" | "squad";

export interface Assignment {
  id: string;
  kind: "drill" | "session";
  title: string;
  drillIds: string[];
  targetType: TargetType;
  targetId: string; // player id or squad id
  date: string;
  note?: string;
  from: string;
  seq: number;
}

export interface Message {
  id: string;
  type: MsgType;
  from: string;
  fromRole: "coach" | "athlete";
  targetType: TargetType;
  targetId: string; // player id or squad id
  subject?: string;
  body: string;
  attachment?: string;
  read: boolean;
  seq: number;
}

export interface Toast {
  id: string;
  text: string;
  tone: "volt" | "good" | "plasma";
}

let _seq = 100;
const nextSeq = () => ++_seq;
const uid = () => `x${nextSeq()}`;

const COACH = "Henrik Sørensen";

const seedAssignments: Assignment[] = [
  { id: uid(), kind: "drill", title: "Finishing Carousel", drillIds: ["d6"], targetType: "squad", targetId: "sen", date: "Thu 19 Jun", note: "Focus on first-time finishes", from: COACH, seq: nextSeq() },
];

const seedMessages: Message[] = [
  { id: uid(), type: "Announcement", from: COACH, fromRole: "coach", targetType: "squad", targetId: "sen", subject: "Saturday match — logistics", body: "Meet at the stadium for 13:00, kickoff 15:00. Bring both kits. Recovery session moved to Sunday 11:00.", read: false, seq: nextSeq() },
  { id: uid(), type: "Information", from: COACH, fromRole: "coach", targetType: "player", targetId: "p1", subject: "Opposition analysis", body: "Their left-back pushes very high — look to spin in behind early. Clip and notes attached.", attachment: "Opposition_Analysis.pdf", read: false, seq: nextSeq() },
  { id: uid(), type: "Message", from: "Eskil Hauge", fromRole: "athlete", targetType: "player", targetId: "coach", body: "Felt a bit of tightness in my hamstring after Tuesday's session — managing it with the physio.", read: false, seq: nextSeq() },
];

interface StoreState {
  assignments: Assignment[];
  messages: Message[];
  toasts: Toast[];
  addAssignment: (a: Omit<Assignment, "id" | "seq" | "from">) => void;
  sendMessage: (m: Omit<Message, "id" | "seq" | "read" | "from" | "fromRole">, fromRole: "coach" | "athlete") => void;
  markRead: (id: string) => void;
  markAllRead: (forRole: "coach" | "athlete", athleteId: string) => void;
  pushToast: (text: string, tone?: Toast["tone"]) => void;
}

const StoreContext = createContext<StoreState | null>(null);

export const squadIdForPlayer = (squadName: string) => squads.find((s) => s.name === squadName)?.id ?? "";
export const squadName = (id: string) => squads.find((s) => s.id === id)?.name ?? id;
export const playerName = (id: string) => players.find((p) => p.id === id)?.name ?? id;
export const targetLabel = (t: TargetType, id: string) => (t === "squad" ? squadName(id) : playerName(id));

/** Does a message/assignment reach the given athlete? */
export function reachesAthlete(targetType: TargetType, targetId: string, athleteId: string) {
  if (targetType === "player") return targetId === athleteId;
  const p = players.find((x) => x.id === athleteId);
  return !!p && squadIdForPlayer(p.squad) === targetId;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [assignments, setAssignments] = useState<Assignment[]>(seedAssignments);
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast: StoreState["pushToast"] = (text, tone = "volt") => {
    const id = uid();
    setToasts((t) => [...t, { id, text, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  };

  const addAssignment: StoreState["addAssignment"] = (a) => {
    setAssignments((list) => [{ ...a, id: uid(), seq: nextSeq(), from: COACH }, ...list]);
    pushToast(`Assigned "${a.title}" to ${targetLabel(a.targetType, a.targetId)}`, "good");
  };

  const sendMessage: StoreState["sendMessage"] = (m, fromRole) => {
    const from = fromRole === "coach" ? COACH : playerName("p1");
    setMessages((list) => [{ ...m, id: uid(), seq: nextSeq(), read: false, from, fromRole }, ...list]);
    pushToast(`${m.type} sent to ${targetLabel(m.targetType, m.targetId)}`, "plasma");
  };

  const markRead: StoreState["markRead"] = (id) =>
    setMessages((list) => list.map((m) => (m.id === id ? { ...m, read: true } : m)));

  const markAllRead: StoreState["markAllRead"] = (forRole, athleteId) =>
    setMessages((list) =>
      list.map((m) => {
        const forMe =
          forRole === "coach"
            ? m.fromRole === "athlete"
            : m.fromRole === "coach" && reachesAthlete(m.targetType, m.targetId, athleteId);
        return forMe ? { ...m, read: true } : m;
      })
    );

  return (
    <StoreContext.Provider
      value={{ assignments, messages, toasts, addAssignment, sendMessage, markRead, markAllRead, pushToast }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

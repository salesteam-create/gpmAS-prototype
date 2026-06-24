import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Dumbbell,
  CalendarDays,
  ClipboardList,
  Trophy,
  Search,
  Bell,
  Plus,
  ChevronsUpDown,
  Sparkles,
  Sun,
  Flame,
  MessageSquare,
  Inbox as InboxIcon,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar } from "./ui";
import { club, players } from "../data/mock";
import { useRole, type Role } from "../context/role";
import { useStore, reachesAthlete } from "../context/store";

type NavItem = { to: string; label: string; icon: LucideIcon; end?: boolean };

const coachNav: NavItem[] = [
  { to: "/app", label: "Command Center", icon: LayoutDashboard, end: true },
  { to: "/app/squads", label: "Squads", icon: Trophy },
  { to: "/app/library", label: "Drill Library", icon: Dumbbell },
  { to: "/app/sessions", label: "Session Builder", icon: ClipboardList },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/messages", label: "Messages", icon: MessageSquare },
];

const athleteNav: NavItem[] = [
  { to: "/app", label: "My Day", icon: Sun, end: true },
  { to: "/app/sessions", label: "My Sessions", icon: ClipboardList },
  { to: "/app/calendar", label: "My Calendar", icon: CalendarDays },
  { to: "/app/library", label: "Drill Library", icon: Dumbbell },
  { to: "/app/inbox", label: "Inbox", icon: InboxIcon },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-volt font-display text-lg font-bold text-base shadow-glow">
        G
      </div>
      <div className="leading-none">
        <div className="font-display text-base font-bold tracking-tight">GPM</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-fg-dim">Performance OS</div>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { role, setRole, athleteId } = useRole();
  const { messages, toasts } = useStore();
  const athlete = players.find((p) => p.id === athleteId)!;
  const isCoach = role === "coach";
  const nav = isCoach ? coachNav : athleteNav;

  const unread = messages.filter((m) =>
    isCoach
      ? m.fromRole === "athlete" && !m.read
      : m.fromRole === "coach" && !m.read && reachesAthlete(m.targetType, m.targetId, athleteId)
  ).length;

  function switchRole(next: Role) {
    setRole(next);
    navigate("/app"); // land on the role's home so we never sit on a route it can't see
  }

  return (
    <div className="flex min-h-screen bg-base">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-ink-900/70 px-4 py-5 backdrop-blur-xl lg:flex">
        <NavLink to="/" className="px-2">
          <Logo />
        </NavLink>

        {/* Context switcher: club for coach, squad for athlete */}
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-ink-700/60 p-2.5 text-left">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-plasma to-viol font-display text-sm font-bold text-white">
            {isCoach ? "N" : athlete.number}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{isCoach ? club.name : athlete.name}</div>
            <div className="text-[11px] text-fg-dim">
              {isCoach ? `${club.season} · ${club.sport}` : `${athlete.position} · ${athlete.squad}`}
            </div>
          </div>
          {isCoach && <ChevronsUpDown className="h-4 w-4 text-fg-dim" />}
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <div className="label-eyebrow px-3 pb-2">{isCoach ? "Workspace" : "My Training"}</div>
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-volt/10 text-volt shadow-[inset_0_0_0_1px_rgba(198,242,78,0.25)]"
                    : "text-fg-muted hover:bg-white/[0.04] hover:text-fg"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <n.icon className={cn("h-[18px] w-[18px] transition", isActive && "drop-shadow-[0_0_6px_rgba(198,242,78,0.6)]")} />
                  {n.label}
                </>
              )}
            </NavLink>
          ))}

          <div className="mt-auto">
            {isCoach ? (
              <div className="relative overflow-hidden rounded-2xl border border-volt/20 bg-gradient-to-br from-volt/10 to-transparent p-4">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-volt/20 blur-2xl" />
                <Sparkles className="h-5 w-5 text-volt" />
                <div className="mt-2 text-sm font-semibold">GPM Copilot</div>
                <p className="mt-1 text-[11px] leading-relaxed text-fg-muted">
                  Auto-build a periodized week from your squad's readiness.
                </p>
                <button className="mt-3 w-full rounded-lg bg-volt/15 py-1.5 text-xs font-semibold text-volt transition hover:bg-volt/25">
                  Generate plan
                </button>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-volt/20 bg-gradient-to-br from-volt/10 to-transparent p-4">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-volt/20 blur-2xl" />
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-volt" />
                  <span className="stat-num text-lg font-bold text-volt">12</span>
                </div>
                <div className="mt-1 text-sm font-semibold">Day training streak</div>
                <p className="mt-1 text-[11px] leading-relaxed text-fg-muted">
                  3 sessions completed this week. Keep it going 🔥
                </p>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-base/80 px-5 py-3.5 backdrop-blur-xl">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-ink-800/60 px-3 py-2 text-sm text-fg-dim md:max-w-md">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">
              {isCoach ? "Search drills, players, sessions…" : "Search drills…"}
            </span>
            <kbd className="ml-auto hidden rounded border border-line px-1.5 py-0.5 text-[10px] text-fg-dim md:inline">⌘K</kbd>
          </div>

          {/* Role switcher */}
          <div className="flex items-center rounded-xl border border-line bg-ink-800/60 p-0.5 text-xs font-semibold">
            {(["coach", "athlete"] as const).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={cn(
                  "rounded-lg px-3 py-1.5 capitalize transition",
                  role === r ? "bg-volt text-base" : "text-fg-muted hover:text-fg"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          {isCoach && (
            <button onClick={() => navigate("/app/sessions")} className="btn-volt hidden sm:inline-flex">
              <Plus className="h-4 w-4" /> New session
            </button>
          )}
          <button
            onClick={() => navigate(isCoach ? "/app/messages" : "/app/inbox")}
            className="relative grid h-9 w-9 place-items-center rounded-xl border border-line bg-ink-800/60 text-fg-muted transition hover:text-fg"
          >
            <Bell className="h-[18px] w-[18px]" />
            {unread > 0 && (
              <span className="stat-num absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-volt px-1 text-[10px] font-bold text-base">
                {unread}
              </span>
            )}
          </button>
          <Avatar name={isCoach ? "Henrik Sørensen" : athlete.name} size={36} />
        </header>

        <main className="flex-1 px-5 py-6 md:px-7">{children}</main>
      </div>

      {/* Toast viewport */}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[80] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto flex items-center gap-2.5 rounded-xl border border-line2 bg-ink-800/95 px-4 py-3 text-sm shadow-float backdrop-blur"
            >
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: t.tone === "good" ? "#3FD79A" : t.tone === "plasma" ? "#5B8CFF" : "#C6F24E" }}
              />
              <span className="font-medium text-fg">{t.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

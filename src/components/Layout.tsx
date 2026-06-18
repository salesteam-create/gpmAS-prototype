import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  CalendarDays,
  Users,
  ClipboardList,
  Trophy,
  Search,
  Bell,
  Plus,
  ChevronsUpDown,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Avatar } from "./ui";
import { club } from "../data/mock";

const nav: { to: string; label: string; icon: LucideIcon; end?: boolean }[] = [
  { to: "/app", label: "Command Center", icon: LayoutDashboard, end: true },
  { to: "/app/library", label: "Drill Library", icon: Dumbbell },
  { to: "/app/sessions", label: "Session Builder", icon: ClipboardList },
  { to: "/app/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/app/squads", label: "Squads", icon: Trophy },
  { to: "/app/players", label: "Players", icon: Users },
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
  const [role, setRole] = useState<"Coach" | "Athlete">("Coach");

  function switchRole(next: "Coach" | "Athlete") {
    setRole(next);
    navigate(next === "Athlete" ? "/app/athlete" : "/app");
  }

  return (
    <div className="flex min-h-screen bg-base">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-line bg-ink-900/70 px-4 py-5 backdrop-blur-xl lg:flex">
        <NavLink to="/" className="px-2">
          <Logo />
        </NavLink>

        {/* Club switcher */}
        <button className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-ink-700/60 p-2.5 text-left transition hover:bg-ink-600/60">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-plasma to-viol font-display text-sm font-bold text-white">
            N
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{club.name}</div>
            <div className="text-[11px] text-fg-dim">{club.season} · {club.sport}</div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-fg-dim" />
        </button>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <div className="label-eyebrow px-3 pb-2">Workspace</div>
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
            {/* AI assistant teaser */}
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
          </div>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-line bg-base/80 px-5 py-3.5 backdrop-blur-xl">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-ink-800/60 px-3 py-2 text-sm text-fg-dim md:max-w-md">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search drills, players, sessions…</span>
            <kbd className="ml-auto hidden rounded border border-line px-1.5 py-0.5 text-[10px] text-fg-dim md:inline">⌘K</kbd>
          </div>

          {/* Role switcher */}
          <div className="flex items-center rounded-xl border border-line bg-ink-800/60 p-0.5 text-xs font-semibold">
            {(["Coach", "Athlete"] as const).map((r) => (
              <button
                key={r}
                onClick={() => switchRole(r)}
                className={cn(
                  "rounded-lg px-3 py-1.5 transition",
                  role === r ? "bg-volt text-base" : "text-fg-muted hover:text-fg"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <button className="btn-volt hidden sm:inline-flex">
            <Plus className="h-4 w-4" /> New session
          </button>
          <button className="relative grid h-9 w-9 place-items-center rounded-xl border border-line bg-ink-800/60 text-fg-muted transition hover:text-fg">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-volt" />
          </button>
          <Avatar name="Henrik Sørensen" size={36} />
        </header>

        <main className="flex-1 px-5 py-6 md:px-7">{children}</main>
      </div>
    </div>
  );
}

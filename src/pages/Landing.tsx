import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  LineChart,
  CalendarDays,
  Network,
  ShieldCheck,
  PlayCircle,
  Sparkles,
  Trophy,
  Globe,
} from "lucide-react";
import { club } from "../data/mock";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-volt font-display text-lg font-bold text-base shadow-glow">
            G
          </div>
          <span className="font-display text-lg font-bold tracking-tight">GPM</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-fg-muted md:flex">
          <a href="#platform" className="transition hover:text-fg">Platform</a>
          <a href="#content" className="transition hover:text-fg">The Content</a>
          <a href="#features" className="transition hover:text-fg">Features</a>
          <a href="#sports" className="transition hover:text-fg">Any Sport</a>
        </nav>
        <Link to="/app" className="btn-volt text-sm">
          Launch demo <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      {/* ambient glow + grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-volt/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-[360px] w-[360px] rounded-full bg-plasma/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-line bg-ink-800/60 px-4 py-1.5 text-xs font-medium text-fg-muted backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
            </span>
            Powered by the {club.name} elite curriculum
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mx-auto mt-7 max-w-4xl text-center font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-7xl"
        >
          The training brain of an
          <br />
          <span className="gradient-text">elite academy</span>, as software.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-fg-muted text-balance"
        >
          GPM turns world-class training IP — the drills, the periodization, the
          methodology that develops pro players — into one platform any club, in
          any sport, can run. Plan, coach, and track every athlete from a single
          command center.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to="/app" className="btn-volt px-6 py-3 text-base">
            Enter the platform <ArrowRight className="h-4.5 w-4.5" />
          </Link>
          <a href="#content" className="btn-ghost px-6 py-3 text-base">
            <PlayCircle className="h-5 w-5" /> See the drill library
          </a>
        </motion.div>

        {/* Hero product shot */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-x-10 -top-6 bottom-0 rounded-[2rem] bg-gradient-to-b from-volt/20 to-transparent blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-line2 bg-ink-900 shadow-float">
            <div className="flex items-center gap-2 border-b border-line bg-ink-800/80 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-bad/60" />
                <span className="h-3 w-3 rounded-full bg-warn/60" />
                <span className="h-3 w-3 rounded-full bg-good/60" />
              </div>
              <div className="mx-auto rounded-md bg-ink-700 px-3 py-1 text-[11px] text-fg-dim">app.gpm.io / command-center</div>
            </div>
            <HeroMock />
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          {[
            { v: "38", l: "Players developed" },
            { v: "12", l: "Signed professional" },
            { v: "1,300+", l: "Curriculum drills" },
            { v: "9", l: "Sports supported" },
          ].map((s) => (
            <div key={s.l} className="bg-ink-900 px-6 py-6 text-center">
              <div className="stat-num text-3xl font-bold text-volt">{s.v}</div>
              <div className="mt-1 text-xs text-fg-muted">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="grid grid-cols-12 gap-3 bg-ink-900 p-4">
      <div className="col-span-3 hidden flex-col gap-2 md:flex">
        {["Command Center", "Drill Library", "Session Builder", "Calendar", "Squads", "Players"].map((s, i) => (
          <div
            key={s}
            className={`rounded-lg px-3 py-2 text-xs ${i === 0 ? "bg-volt/10 text-volt" : "text-fg-dim"}`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="col-span-12 grid grid-cols-3 gap-3 md:col-span-9">
        {[
          { l: "Squad Readiness", v: "84%", c: "#C6F24E" },
          { l: "Avg Load (ACWR)", v: "1.08", c: "#5B8CFF" },
          { l: "Sessions this week", v: "14", c: "#9A7BFF" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-line bg-ink-800 p-3">
            <div className="text-[10px] text-fg-dim">{k.l}</div>
            <div className="stat-num mt-1 text-2xl font-bold" style={{ color: k.c }}>{k.v}</div>
          </div>
        ))}
        <div className="col-span-3 rounded-xl border border-line bg-ink-800 p-4">
          <div className="mb-3 flex items-end gap-1">
            {[40, 55, 48, 65, 58, 72, 68, 82, 75, 88, 80, 92].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-volt/30 to-volt" style={{ height: h }} />
            ))}
          </div>
          <div className="text-[10px] text-fg-dim">Team performance index · last 12 weeks</div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: Dumbbell, title: "Elite Drill Library", body: "1,300+ video-backed drills with coaching points and tracked metrics — categorized by technical, tactical, S&C, speed, recovery and more.", accent: "text-volt" },
  { icon: Network, title: "Session & Plan Builder", body: "Drag drills into periodized sessions, save templates, and assign to any squad so every coach delivers an elite session.", accent: "text-plasma" },
  { icon: LineChart, title: "Performance Analytics", body: "Per-athlete readiness, workload (ACWR), wellness and form trends. Spot injury risk before it costs you a player.", accent: "text-viol" },
  { icon: CalendarDays, title: "Smart Scheduling", body: "Org-wide calendar across squads, venues, matches and gym — with conflict resolution built in.", accent: "text-good" },
  { icon: Trophy, title: "Multi-Squad Command", body: "U15 to first team in one view. Every division, every player, every drill — managed from a single command center.", accent: "text-warn" },
  { icon: ShieldCheck, title: "Athlete Development", body: "Individual development plans, attribute radars and skill progressions that turn raw talent into pro contracts.", accent: "text-volt" },
];

function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <div className="label-eyebrow">Everything in one platform</div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance">
            The best of every coaching tool — finally under one roof.
          </h2>
          <p className="mt-4 text-fg-muted">
            We studied the leaders — TeamBuildr, TrainHeroic, Kitman Labs,
            Smartabase — and built the platform they wish they were.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              className="group relative overflow-hidden rounded-2xl border border-line bg-ink-800/60 p-6 transition hover:border-line2 hover:bg-ink-700/60"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/[0.03] blur-2xl transition group-hover:bg-volt/10" />
              <f.icon className={`h-7 w-7 ${f.accent}`} />
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContentSpotlight() {
  return (
    <section id="content" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma/5 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <div className="label-eyebrow">The real moat</div>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance">
            The content is the competitive edge.
          </h2>
          <p className="mt-4 text-fg-muted">
            Any platform can give you a calendar. GPM gives you the actual
            training methodology that built champions — every drill filmed, with
            the coaching points, progressions and metrics that matter. This is
            the IP clubs can't build themselves.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Full-motion video for every drill and exercise",
              "Coaching points, constraints & progressions",
              "Tagged by category, intensity, age group & equipment",
              "Tracked metrics feed straight into player analytics",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-volt/15 text-volt">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="text-fg-muted">{t}</span>
              </li>
            ))}
          </ul>
          <Link to="/app/library" className="btn-volt mt-8">
            Explore the library <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { t: "Rondo Pressure Cooker", c: "Technical", col: "#C6F24E" },
            { t: "Vertical Transition Wave", c: "Tactical", col: "#5B8CFF" },
            { t: "Nordic Power Complex", c: "Strength", col: "#9A7BFF" },
            { t: "Reactive Agility Ladder", c: "Speed", col: "#3FD79A" },
          ].map((d, i) => (
            <motion.div
              key={d.t}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className={`group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line ${i % 2 ? "translate-y-6" : ""}`}
              style={{ background: `linear-gradient(160deg, ${d.col}22, #0F121A 60%)` }}
            >
              <div className="absolute inset-0 bg-grid-faint [background-size:24px_24px] opacity-40" />
              <div className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold" style={{ background: `${d.col}22`, color: d.col }}>
                {d.c}
              </div>
              <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/30 backdrop-blur transition group-hover:scale-110">
                <PlayCircle className="h-6 w-6" style={{ color: d.col }} />
              </div>
              <div className="absolute inset-x-3 bottom-3">
                <div className="text-sm font-semibold">{d.t}</div>
                <div className="text-[11px] text-fg-dim">Signature curriculum</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SportAgnostic() {
  const sports = ["Football", "Basketball", "Tennis", "Rugby", "Hockey", "Athletics", "Swimming", "Handball", "Volleyball"];
  return (
    <section id="sports" className="py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Globe className="mx-auto h-8 w-8 text-plasma" />
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance">
          Built once. Ready for every sport.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-fg-muted">
          GPM is sport-agnostic by design. Swap the curriculum, keep the
          platform — the same command center runs a football academy or a tennis
          program.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {sports.map((s, i) => (
            <span
              key={s}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${i === 0 ? "border-volt/40 bg-volt/10 text-volt" : "border-line bg-ink-800/60 text-fg-muted hover:border-line2 hover:text-fg"}`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-volt/20 bg-gradient-to-br from-volt/10 via-ink-800 to-ink-900 p-12 text-center">
        <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-[600px] -translate-x-1/2 rounded-full bg-volt/20 blur-[100px]" />
        <h2 className="relative font-display text-4xl font-bold tracking-tight text-balance">
          See the platform your academy deserves.
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-fg-muted">
          Step into the live demo — built sport-agnostic, designed for elite
          development.
        </p>
        <Link to="/app" className="btn-volt relative mt-8 px-7 py-3.5 text-base">
          Launch the demo <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <ContentSpotlight />
      <SportAgnostic />
      <CTA />
      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-fg-dim md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-volt font-display text-sm font-bold text-base">G</div>
            <span className="font-display font-semibold text-fg">GPM</span>
            <span>· Performance OS</span>
          </div>
          <div>Prototype · Concept demo · {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}

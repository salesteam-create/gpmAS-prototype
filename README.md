# GPM · Performance OS — Prototype

A high-fidelity, sport-agnostic training platform prototype for an elite sports
academy. Built as a pitch/demo artifact: every screen is interactive and seeded
with realistic data, with no backend required.

> **Concept:** Take the world-class training IP of an elite academy — the
> drills, the periodization, the methodology — and package it as software any
> club, in any sport, can run. The drill library *is* the product's moat.

## What's inside

| Screen | What it shows |
| --- | --- |
| **Landing** | The pitch — value proposition, the content moat, sport-agnostic story |
| **Command Center** | Org-wide dashboard: readiness, workload (ACWR), risk monitor, squads, top performers |
| **Drill Library** | The centerpiece — filterable, video-backed drills with coaching points & tracked metrics |
| **Session Builder** | Build a periodized session from the library, with a live load meter + AI copilot |
| **Calendar** | Weekly timetable across all squads, venues and matches |
| **Squads** | The development pathway (U15 → first team) with rosters |
| **Players / Profile** | Athlete database + per-player radar, performance trend and attributes |
| **Athlete View** | The player's "my week" experience (toggle role in the top bar) |

## Tech

React + TypeScript + Vite · Tailwind CSS · Framer Motion · Recharts. Routing is
hash-based so it deploys to any static host with no server config.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deploy

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes
to **GitHub Pages** on every push. Enable Pages once under
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

The Vite `base` is relative (`./`) and routing is hash-based, so the build works
unchanged on a project-pages subpath, a custom domain, Netlify, or S3.

---

*Prototype only — demo data, no backend. Sport vertical shown: football.*

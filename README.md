# PestiGuard — Demo App

Presentation-grade, click-through demo of the PestiGuard smart-agriculture concept
(IoT sensors + AI pest/disease detection + automated targeted spraying for
chili/vegetable farms). Built to be reached by a QR code on any phone browser —
no login, no backend, no real hardware. All "live" sensor data, risk scoring,
and the pest-attack scenario are simulated entirely client-side.

## Stack

- React + Vite, React Router (hash-based routing so it works from a static host)
- Tailwind CSS v4
- Recharts for the admin trend chart
- lucide-react for icons

## Running locally

```bash
npm install
npm run dev       # dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## What's in the demo

- **Entry** — pick "Saya Petani" or "Saya Koperasi/Admin", optional cosmetic farm name.
- **Petani app** — live-drifting dashboard (suhu/kelembapan/tanah + risk gauge),
  a "Simulasikan Serangan Ulat" demo trigger, a full-screen critical alert with
  animated auto-response (valve opens → risk falls → resolved), a manual
  override screen, detection log, and history/timeline.
- **Koperasi/Admin app** — overview grid of 5 demo plots (one pre-seeded
  critical), drill-down into any plot's dashboard, and an aggregate impact
  stats screen.

All simulation logic lives in `src/lib/simulation.js` and `src/context/DemoContext.jsx`.
State is in-memory per tab/session — nothing persists across visits, matching
the demo's "fresh world per reviewer" scope.

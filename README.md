# Doctor Dashboard UI

A clinician-facing dashboard and schedule calendar built with React 19, TypeScript, Vite and Tailwind CSS.

## Features

**Dashboard**
- At-a-glance metrics: patients, appointments, reports, total visitors
- Patients Statistics bar chart and a Consultation Focus radar chart
- Quick Actions: virtual visit, patient search, e-prescribe, referral, AI scribe, schedule
- Next Appointment with an AI pre-visit summary (BP, LDL, adherence)
- Clinical Alerts with per-patient severity and chart shortcuts
- Pending lab reviews and pending clinical tasks
- AI patient queue, today's schedule, and a message inbox

**Schedule Calendar**
- Day / Week / Month / Agenda views
- Week grid from 7 AM to 8 PM with colour-coded appointment chips
- Search and visit-type filtering
- Sidebar: provider status, daily overview, active prescriptions, AI scheduling insights, patient queue

**Responsive**
- Verified from 320px to 2560px
- Phones open the calendar in a single-day view with a day picker, so the grid never scrolls sideways
- Touch targets are at least 36px on phones

## Getting started

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Tech stack

React 19 · TypeScript · Vite 8 · Tailwind CSS 3 · lucide-react

## Notes

All clinical data in this project is mock data in `src/mockData/` — no backend, no real patient records.

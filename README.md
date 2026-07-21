# Shoaib — AI Solutions Architect Portfolio

## Local development
```
npm install
npm run dev
```

## Build
```
npm run build
```
Output goes to `dist/`.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite (auto-detected). No config needed — `npm run build`
   and output directory `dist` are Vercel's defaults for Vite.
4. Deploy.

No Base44, no Emergent, no Lovable required — this is a standalone project.

## Known issues / not yet done
- JS bundle is ~628KB (mostly Three.js). Flagged, not optimized. If mobile
  load time matters, next step is code-splitting the Hero3D component with
  `React.lazy()` so it doesn't block initial paint.
- Photo background removal uses a color-threshold mask, not proper matting.
  Fine for a working version, not final-polish quality on hair edges.
- Diagnostic form is step 1 of 4 visually, but only step 1 is wired up — no
  actual multi-step logic or submission handler yet.
- Systems / case studies section from the original site (the "Loading…"
  placeholder for live case studies) is not rebuilt — there was no real
  content behind it to port.
- Operator credentials section (also "Loading…" in the original) — same,
  not rebuilt, no content existed to port.

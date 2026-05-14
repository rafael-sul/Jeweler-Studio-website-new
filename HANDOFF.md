# JewelerStudio Website — Session Handoff

Last updated: 2026-05-13

This document is the briefing for picking up work on this project in a new
Claude Code session or on a new machine. Read it top to bottom.

## Repository

- **GitHub:** https://github.com/rafael-sul/Jeweler-Studio-website-new
- **Branch:** `main`
- **Visibility:** should be **private** (verify in repo Settings → Danger Zone if
  you haven't already)
- Local path on the current dev machine: `C:\Users\avata\Desktop\website project`

To start fresh on a new machine:

```bash
git clone https://github.com/rafael-sul/Jeweler-Studio-website-new.git
cd Jeweler-Studio-website-new
npm install
npm run dev   # → http://localhost:5173
```

## What this project is

A marketing site for **JewelerStudio**, an AI-custom-jewelry platform. Vite +
React 18 + TypeScript + Tailwind, deployed as a static SPA. There is also a
small amount of Shopify theme content (Liquid templates, settings, sections)
checked in alongside the site, plus PowerShell helper scripts the owner uses
for image generation / GCS uploads.

### Tech stack

| Concern | Choice |
|---|---|
| Bundler / dev | Vite 5 |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS 3 |
| Routing | react-router-dom v7 |
| Icons | lucide-react |
| Backend | Supabase (lead capture) |
| Lint | ESLint 9 + typescript-eslint |

### Pages

- `/` — Home (`src/pages/Home.tsx`). Composed of section components:
  Hero, VideoReveal, TrustedBy, SocialProof, ProductSolution, FeatureBreakdown,
  TheDifference, HowItWorks, DashboardPreview, RenderGallery, PricingPreview,
  FAQ, FinalCTA.
- `/products` — Products page (`src/pages/ProductsPage.tsx`). Big single file
  (~1k lines) with the StudioAiSection and RingProSection demos.
- `/pricing` — Pricing page (`src/pages/PricingPage.tsx`).
- `/contact` — Contact page (`src/pages/ContactPage.tsx`).

Global chrome: `Navigation`, `Footer`, `LeadModal` mount in `App.tsx`. There's
also a floating "Video ON/OFF" dev toggle in the bottom-right that flips
`localStorage` `jsd-video-reveal`.

## Important conventions / quirks

- **Strict Mode is on** (`src/main.tsx`). Effects double-invoke in dev — relevant
  if anything you build touches WebGL or other singletons.
- **Brand image policy (user-level):** all jewelry product images must use pure
  white `#FFFFFF` backgrounds, no props or surfaces. Don't generate or pick
  images that violate this.
- **Inline `<style>` keyframes** are kept in the ProductsPage component (`pp-*`
  prefixed) for the demo animations. There's no global CSS-in-JS solution; just
  Tailwind + occasional inline styles.

## ⚠️ Three.js viewer was tried and rejected — don't redo it without buy-in

The Ring Pro section on `/products` previously had a 3D ring viewer using
react-three-fiber + drei's `MeshRefractionMaterial` + a BVH-traced diamond
shader. It was **completely removed** because of repeated GPU process crashes
on the owner's machine. The Ring Pro section is now a CSS-only stylized ring
(conic-gradient band + radial-gradient stone, live swatches still work).

### What was tried (so you don't repeat any of it)

1. Imperative `THREE.WebGLRenderer` + custom BVH `ShaderMaterial` — worked
   visually but had perf/iteration issues.
2. drei's `MeshRefractionMaterial` class instantiated imperatively — Chrome
   anti-abuse blocked the origin after enough HMR/StrictMode mount/unmount
   cycles ("Web page caused context loss and was blocked").
3. Singleton renderer pattern with try/catch fallback — same Chrome block.
4. Full R3F port (`<Canvas>` + drei `<Environment>` + `<Bounds>` + `<Center>`)
   — diamonds showed "Mismatch between texture format and sampler type"
   because drei's MeshRefractionMaterial requires an explicit `bvh` uniform
   that we weren't passing.
5. R3F with `bvh` uniform bound from `three-mesh-bvh@0.9.9` — caused the
   renderer process to **crash the moment the model first drew**.
6. Discovered **two versions of `three-mesh-bvh` were in node_modules**:
   `0.9.9` (project direct dep) vs `0.7.8` (bundled inside `@react-three/drei`).
   drei's shader was compiled against 0.7.8 and the uniform texture layout
   differs between versions, so the GPU got a malformed texture and TDR'd.
7. Pinned `three-mesh-bvh@0.7.8` to dedupe — still crashed for the owner.
   At that point we gave up and tore the whole thing out.

### If you ever revisit a 3D viewer

- Keep `three-mesh-bvh` pinned to the version drei was compiled against.
  Check `npm ls three-mesh-bvh` before doing anything — if it shows two
  entries it'll silently break.
- Always wrap the `<Canvas>` in an error boundary so a refused GPU context
  doesn't blank the whole page.
- Use `import.meta.hot.decline()` in any file that creates a WebGL renderer
  — HMR cycles burn through Chrome's context-loss tolerance fast.
- Gate the canvas behind an IntersectionObserver. Don't initialize WebGL
  until the section is visible.
- The model `website-ring.glb` (≈7 MB, 5 indexed meshes: Diamond_Marquise,
  Diamond_Pear, Diamond_Round, object_2, object_2.001) and the HDR
  `photo_studio_01_1k.hdr` were both DELETED from the repo. Restore them from
  the owner's source if you re-attempt.

## Current ship-readiness

- `npm run build` produces a clean bundle (~541 KB / 143 KB gzipped, single
  chunk — Vite warns about the >500 KB chunk, can be split later if needed).
- `npx tsc --noEmit` passes.
- Dev server runs smoothly with no GPU work.
- Initial commit is `f83ec24` on `main`.

## Known follow-ups

| Item | Priority | Notes |
|---|---|---|
| Make GitHub repo private | High | If not done yet, repo Settings → Danger Zone |
| **Rotate the Google API key** | **High — security** | `gemini_key.txt` was on disk (excluded from git). Rotate at https://console.cloud.google.com/apis/credentials |
| Code-split the main bundle | Low | Single 541 KB chunk. Use `manualChunks` in `vite.config.ts` if it grows. |
| Make `.claude/` truly per-user | Low | Already in `.gitignore`. |

## File layout cheat sheet

```
src/
  App.tsx                    Routes + global modals + dev toggle
  main.tsx                   ReactDOM root, StrictMode wrapper
  pages/
    Home.tsx                 Composes home sections
    ProductsPage.tsx         ⭐ Big file — Studio AI + Ring Pro demos
    PricingPage.tsx
    ContactPage.tsx
  components/                Section components (Hero, FAQ, Footer, etc.)
  hooks/useScrollTrigger.ts  IntersectionObserver wrapper for reveal effects
  lib/supabase.ts            Supabase client (lead capture)
public/
  Static images, videos, logo
images/                      Jewelry catalog images (large)
supabase/migrations/         Database schema (leads table)
.bolt/                       Bolt project config (do not modify)
brand-kit.html               Brand reference page
policies/                    Privacy / refund / shipping / terms HTML
theme_*.json/liquid          Shopify theme assets
gen_*.ps1                    Local image-generation PowerShell scripts
```

## Where to point a fresh Claude session

When you start a new session, paste this whole document into the first prompt
(or save it under `~/.claude/projects/.../memory/` if you want it auto-loaded).
Then state what you want to work on. Don't relitigate the Three.js path
without explicit buy-in.

## How to commit + push from here on

```bash
git add -A
git commit -m "what changed in one line"
git push
```

Branches for risky work:

```bash
git checkout -b feature/whatever
# ... edits ...
git commit -am "..."
git push -u origin feature/whatever
# open PR on github.com
```

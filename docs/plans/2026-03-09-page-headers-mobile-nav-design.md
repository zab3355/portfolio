# Design: Page Hero Banners & Mobile Nav Redesign
**Date:** 2026-03-09

## Overview

Two related UI improvements to extend the splash page aesthetic across the rest of the portfolio:

1. A reusable `PageHeroBanner` component for all page/section headers
2. A full-screen animated mobile nav overlay replacing the current MUI Drawer

---

## 1. PageHeroBanner Component

### Purpose
Replace the inconsistent section headers across About, Portfolio, Blog, Contact, and subpages with a unified, visually rich banner that ties back to the splash page design language.

### Props
```ts
interface PageHeroBannerProps {
  title: string;
  filePath: string;       // e.g. "pages/about.tsx"
  subtitle?: string;
}
```

### Visual Structure (layers, bottom to top)
1. **Binary rain canvas** — full-width, reuses existing `BinaryRain` component with `opacity: 0.20` wrapper so text remains readable
2. **Gradient orbs** — two orbs reused from `GradientBackground`, scaled down, ~25% opacity; one top-left, one bottom-right; no mouse parallax (static positions)
3. **Code comment label** — `// pages/about.tsx` in monospace font, `deepOrange[400]`, 13px, letter-spaced, rendered above the title
4. **Title** — staggered per-letter spring animation (matching splash) + shimmer gradient cycling every 4s; ~52px bold Poppins
5. **Bottom divider** — thin horizontal line fading from `deepOrange[600]` to transparent

### Dimensions & Background
- Height: ~320px
- Width: 100vw (full bleed)
- Background: `#07070f` (same as splash) — creates a visual anchor at the top of each page before transitioning into the page background

### Usage
Replace current headers on:
- `Portfolio.tsx` — replaces banner image overlay
- `pages/blog/blog.tsx` — replaces `SectionHeader` at top of page
- `Contact.tsx` — replaces current `SectionDivider` at top of page
- `shared/components/about.tsx` — replaces `SectionHeader` at top of about section
- `pages/blog/blogDetail.tsx` — replaces any existing post title header

The existing `SectionHeader` component remains in use for _in-page_ section dividers (e.g. within the Home page sections).

---

## 2. Mobile Nav Redesign

### Purpose
Replace the current MUI Drawer (orange background, plain list) with a full-screen Framer Motion overlay that matches the dramatic aesthetic of the splash page.

### Hamburger → X Morph
- Three CSS bars animate via transforms:
  - Top bar: `rotate(45deg) translateY(...)`
  - Middle bar: `opacity: 0, scaleX: 0`
  - Bottom bar: `rotate(-45deg) translateY(...)`
- Spring physics, ~200ms

### Overlay
- `position: fixed`, `top: 0`, `left: 0`, `width: 100vw`, `height: 100vh`
- Background: `#07070f`
- One large gradient orb at low opacity, top-right corner, static (no parallax)
- Binary rain at ~10% opacity running behind content
- `z-index` above all page content

### Navigation Links
- 4 links: Home, Portfolio, Blog, Contact
- Font: Poppins bold, ~56px
- Enter animation: `y: 40 → 0`, `opacity: 0 → 1`, spring physics
- Stagger: 80ms between each link
- Active route: `deepOrange[600]` color
- Hover: orange underline slides in from left (`scaleX: 0 → 1` on a pseudo-element)
- Click: closes overlay

### Theme Toggle
- Appears below last link with same stagger delay (+80ms after last link)

### Close Behaviour
- X button or any link tap closes overlay
- Exit: `opacity: 1 → 0` + `y: 0 → -20`, ~200ms

### Scope
- Mobile only (below MUI `sm` breakpoint, 600px)
- Desktop nav unchanged

---

## Files to Create / Modify

| File | Action |
|------|--------|
| `src/shared/components/PageHeroBanner.tsx` | Create new component |
| `src/pages/Portfolio.tsx` | Replace banner with `PageHeroBanner` |
| `src/pages/blog/blog.tsx` | Replace `SectionHeader` with `PageHeroBanner` |
| `src/pages/Contact.tsx` | Replace `SectionDivider` with `PageHeroBanner` |
| `src/shared/components/about.tsx` | Replace `SectionHeader` with `PageHeroBanner` |
| `src/pages/blog/blogDetail.tsx` | Add `PageHeroBanner` |
| `src/components/Navbar.tsx` | Redesign mobile section; keep desktop unchanged |

---

## Non-Goals
- Desktop navbar changes
- Changes to the splash page itself
- Changes to in-page `SectionHeader` usage (within Home page sections)
- Changes to the custom cursor or progress bar

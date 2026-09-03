# Task 2 - Frontend Task: Dark/Light Mode Toggle

## Task Description
Technical Assessment for Frontend Developer
Time: 30 mins

Demo Project: https://bitbucket.org/workspace860819/real_estate_platform_mvp_v1

## Requirements

### 1. Dark/Light Mode Toggle
- Add a toggle switch in the navigation bar (sun/moon icon)
- UI updates consistently across all components on the landing page

### 2. Smooth Transition
- Smooth visual transition (300ms) when switching between light and dark modes

### 3. Responsive Design
- Desktop, Tablet, Mobile — fully responsive

### 4. Code Quality
- Clean, maintainable, well-structured code
- Modern frontend best practices

## Implementation Summary

### Files Changed
- `tailwind.config.js` — Added `darkMode: 'class'`
- `src/index.css` — Added `transition-colors duration-300` globally + dark body override
- `src/App.jsx` — Added `darkMode` state with `localStorage` persistence + `useEffect` to toggle `.dark` on `<html>`
- `src/components/layout/Navbar.jsx` — Added `FiSun/FiMoon` toggle button (desktop + mobile), dark mode Tailwind classes
- `src/pages/Home.jsx` — Added `dark:` classes to all major sections (hero, steps, properties, advantages, blog, FAQ)

### How it works
1. State stored in `App.jsx`, passed as props to `Navbar`
2. `useEffect` adds/removes `dark` class on `document.documentElement`
3. `localStorage` persists user preference across sessions
4. Tailwind `darkMode: 'class'` applies `dark:` variants
5. All transitions use `transition-colors duration-300` for smooth effect

## Deliverables
- [ ] Record video of how it works (Loom / Google Drive)

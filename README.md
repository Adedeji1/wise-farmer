# Wise Farmer (Demo)

A **React + Vite** demo storefront / educational landing site built with **Tailwind**, **Radix UI**, and other modern UI primitives.

This repo contains the frontend for a sample “Wise Farmer” project and is meant to be used as a starting point for exploration, prototyping, or design handoff.

---

## 🚀 Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

Then open the URL shown in your terminal (typically http://localhost:5173).

---

## 🧱 Available scripts

- `npm run dev` — start local dev server (fast refresh + HMR)
- `npm run build` — build production output (dist/)

> ⚠️ Note: This repo uses Vite and expects Node.js 18+.

---

## 🗂 Project structure

- `src/` — app source code
  - `app/components/` — shared UI components (navbar, footer, etc.)
  - `app/pages/` — route pages (Home, Shop, Blog, etc.)
  - `assets/` — static assets (logo, icons)

---

## 🔧 Updating the logo asset

The site currently loads the logo from `src/assets/LogoImg.png`. If you replace the logo, keep the file name the same or update the imports in:

- `src/app/components/Navbar.tsx`
- `src/app/components/Footer.tsx`

---

## 📌 Notes

This project was originally created from a Figma-to-code export and has been adapted for local development.

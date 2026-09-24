# FitLog — Workout Library & Planner

A dark, no-nonsense gym companion built with Next.js. Browse a library of workouts, view detailed exercise instructions, and build your daily training plan — all tracked live with toast notifications and persistent local storage.

## 🚀 Live Demo

[https://b14-a6-fit-log-three.vercel.app/]

## 📖 Description

FitLog lets users explore a curated library of workouts (chest, back, legs, core, and more), dive into detailed instructions for each lift, and organize their training day by adding exercises to **Today's Plan** or **Saved for later**. The navbar tracks live counts of planned and saved workouts, and the My Plan page lets users mark workouts as done or remove them — all backed by a REST API and persisted across page reloads.

## 🛠️ Technologies Used

- **Next.js (App Router)** — routing, dynamic pages (`/workout/[id]`), and layouts
- **React** — component architecture, Context API for global state
- **TypeScript** — type-safe components and data models
- **Tailwind CSS** — utility-first responsive styling
- **REST API** — live workout data fetched from an external Cloudflare Worker endpoint
- **localStorage** — persists the user's plan and saved list across reloads
- **Vercel / Netlify** — deployment

## ✨ Key Features

1. **Dynamic Workout Library** — All workouts are fetched live from an API and displayed as responsive cards (3-column grid on desktop, collapsing gracefully on tablet and mobile), each showing image, category tags, equipment, duration, calories, and rating.

2. **Detailed Workout Pages** — Clicking any card navigates to a dedicated details page (`/workout/[id]`) with a full spec table (equipment, difficulty, sets, reps, duration, calories, rating) and step-by-step instructions.

3. **Today's Plan & Saved System** — Users can add any workout to their daily plan or save it for later with one click. Both actions instantly update the navbar's live counter badges and show a toast confirmation. Today's Plan is capped at 5 lifts to keep daily sessions focused.

4. **My Plan Dashboard** — A dedicated page summarizing total exercises, minutes, and calories for the day, with tabs to switch between Today's Plan and Saved, a sort dropdown (Duration / Calories / Rating), and per-workout actions: View Details, Mark as Done, and Remove — each with toast feedback.

5. **Fully Responsive & Persistent** — The entire UI (navbar, hero, library grid, details page, and plan dashboard) adapts across mobile, tablet, and desktop. All plan/saved data is stored in `localStorage`, so a user's progress survives page reloads. A custom 404 page and loading states handle edge cases gracefully.

## 📂 Project Structure

```
src/app/
├── components/
│   ├── shared/Navbar.tsx
│   └── homepage/
│       ├── Banner.tsx
│       ├── WorkoutCard.tsx
│       └── Footer.tsx
├── context/
│   ├── PlanContext.tsx
│   └── ToastContext.tsx
├── lib/
│   └── api.ts
├── workout/[id]/page.tsx
├── my-plan/page.tsx
├── not-found.tsx
├── layout.tsx
└── page.tsx
```

## 🏃 Getting Started

```bash
# Clone the repository
git clone <https://github.com/ProgrammingHero1/B14-A6-Fit-Log>
cd fit-log

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

This project is deployed on **[Vercel / Netlify / Cloudflare Pages]**. Live link: [add link]

## 👤 Author

Khalid — Full-Stack Web Developer

# NovaLearn - Student Dashboard 🚀

Welcome to **NovaLearn**, a next-gen,  educational dashboard built with modern web technologies. This project is my submission for the Frontend Intern Challenge. It focuses on zero layout shifts, buttery-smooth animations, and server-rendered data!

## 📸 Overview
NovaLearn is built with a sleek "Bento Grid" layout, utilizing deep background tones and subtle, glowing gradients. The dashboard is fully responsive, gracefully degrading from a multi-column desktop layout to a stacked, scrollable mobile experience.

### 🛠 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS V4
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 🧠 Architectural Choices

### Server/Client Component Split
One of the biggest requirements was correctly mixing server-side data fetching with highly interactive, animated UI components. Here's how I handled it:

1. **Server Components (RSC):** The main `page.tsx` is kept as a Server Component. It connects directly to Supabase using `@supabase/ssr` to fetch the courses securely on the server. This means we don't need an intermediate API route, and we don't expose any database keys to the browser.
2. **Suspense Boundaries:** I wrapped the course list in a React `<Suspense>` boundary. While the server is fetching the data, the user instantly sees pulsing skeleton loaders.
3. **Client Components:** Any component that requires interactivity (like `framer-motion` animations, `useState` for sidebar tabs) is extracted into its own file with the `"use client"` directive. This ensures our JavaScript bundle stays minimal and focused.

### Zero Layout Shifts & Animation Strategy
To achieve the buttery-smooth feel:
- **Transforms & Opacity:** I exclusively used `transform` (scale, translate) and `opacity` for hover states. This prevents costly browser repaints.
- **Spring Physics:** Framer Motion's spring physics gives the hover elevations and the progress bars a very natural, bouncy feel (stiffness: 300, damping: 20).
- **Layout Animations:** The sidebar uses Framer Motion's `layoutId` to snap the active indicator smoothly between tabs.

## 🚀 Getting Started

1. **Clone the repository.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Supabase:**
   - Create a Supabase project.
   - Run the SQL script found in `supabase_setup.sql` in your Supabase SQL Editor to create the `courses` table and seed data.
4. **Environment Variables:**
   - Rename `.env.example` to `.env` and fill in your Supabase details:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```

## 🚧 Challenges Faced
The main challenge was ensuring that the staggered entrance animations worked perfectly with the asynchronous data from Supabase. By isolating the `DashboardGrid` as a client-side wrapper that utilizes `staggerChildren`, and letting the Server Component pass the loaded children into it, we achieved a perfect, sequential fade-in effect once the data resolves!

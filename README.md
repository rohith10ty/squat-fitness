# AURA // Minimal Performance & Fitness Tracker

A modern, responsive, and minimalist Fitness Tracker web application developed with **React + Vite + Tailwind CSS**, featuring an editorial aesthetic inspired by high-end minimal design systems and the interactive GSAP scroll animation from sample `61`.

---

## ✦ Live Features & Architectural Overview

### 1. The Pinned Typographic & Reveal Landing Effect (Adapted from Sample 61)
- **5/7 Minimal Portrait Card**: Clean athletic portrait hero card with subtle border frames and editorial coordinates.
- **Progressive Text Reveal Scrub**: Custom GSAP ScrollTrigger animating CSS `--clip-value` inset scrub from 100% to 0%, dynamically revealing text on scroll.
- **3-Layer Parallax Slide-in**: Triple-stacked typography layer that slides in from alternating directions (`+100%`, `-100%`, `+100%`).
- **Pinned Convergence & Scaling**: Pinned scroll animation where header 0 descends, header 2 ascends, and all layers scale down smoothly (`scale: 1 -> 0.1`) on scroll, transitioning seamlessly into the live app telemetry.
- **Vector Typographic Banner**: Pure SVG vector path rendition of `FITNESS` matching sample geometry.

### 2. Daily Fitness Dashboard
- **Telemetry Indicators**:
  - **Daily Steps**: Live counter (e.g. 8,450 / 10,000) with animated progress bar and `+500` / `+1,000` step increment controls.
  - **Active Burn**: Caloric expenditure counter (640 / 800 kcal) with basal metabolic rate summary.
  - **Workout Duration**: Active minutes tracker (48 / 60 min) with quick `+10m` / `+20m` log buttons.
  - **Heart Rate Monitor**: Live simulated BPM fluctuation and continuous ECG pulse wave animation with `Resting` / `Training` state toggling.
- **7-Day Weekly Activity Bar Chart**: Visual daily step comparison (Mon - Sun) with clickable day inspection tooltips.

### 3. Modular Workouts & Regimens
- **Category Filter Tabs**: Cardio, Strength Training, Yoga, and HIIT.
- **Detailed Exercise Cards**: High-res visual covers, difficulty badges (`Beginner`, `Intermediate`, `Advanced`), duration, calories, and progress percentage.
- **Interactive Workout Modal & Timer**:
  - Live countdown interval timer with Play, Pause, and Reset controls.
  - Step-by-step movement checklist with rest periods.
  - Confetti celebration upon session completion (`canvas-confetti`).
  - Direct "Mark Complete" toggle.

### 4. Progress Tracking & Performance Curves
- **Load Progression Chart**: Interactive SVG line & area chart visualizing caloric burn and active training hours across cycles.
- **Data Point Inspection**: Dynamic hover tooltips displaying exact timestamped workout telemetry.
- **Muscle Load Distribution**: Visual percentage bars tracking load balance across Lower Body, Posterior Chain, Chest/Deltoids, and Core Stability.
- **Milestone Cards**: Consecutive streak counter, total 30-day burn, VO2 max estimate, and compliance rates.

### 5. Precision BMI Calculator
- **Dual Unit Support**: Metric (`cm`, `kg`) and Imperial (`ft/in`, `lbs`) with smooth real-time conversion.
- **Interactive Sliders & Numeric Controls**: Live dynamic recalculation on every slider change.
- **Visual Multi-Zone Gauge**: Color-coded spectrum with a dynamic marker indicating Underweight, Optimal, Overweight, and Obese brackets.
- **Coach Recommendations**: Tailored clinical and training advice based on calculated body composition.

### 6. Targeted Nutrition & Hydration
- **Macronutrient Precision**: Daily target bars for Protein (`2.0g/kg`), Complex Carbohydrates, and Essential Fats.
- **Meal Plans by Course**: Filterable meal suggestions for Breakfast, Lunch, Dinner, and Snacks with macro breakdowns and ingredient tags.
- **Interactive Hydration Tracker**: Daily water intake gauge (e.g. 2.50L / 3.2L) with `+250ml`, `+500ml`, and `-250ml` controls.

### 7. Personal Fitness Objectives (Goals Section)
- **Active Objectives**: Weekly distance, strength sessions, hydration consistency, and sleep recovery.
- **Interactive Completion**: Checkbox toggle that triggers celebratory confetti and updates overall completion metrics.
- **Custom Goal Creation Modal**: Add custom titles, target metrics, categories, and deadlines.

### 8. Coach Inquiries (Contact Section)
- **Direct Form**: Name, email, inquiry focus, and message fields with validation and animated transmission feedback.
- **HQ Telemetry**: Email, phone support, physical flagship address, and operating hours.

### 9. Modern Navbar & Minimal Footer
- **Fixed Blur Header**: Floating glassmorphism navbar with active scroll section indicator.
- **Mobile Drawer**: Responsive slide-down navigation menu for screens under 1024px.
- **Footer**: Quick navigation links, module indexes, social icon links, and back-to-top button.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Typography**: [Google Fonts: Manrope](https://fonts.google.com/specimen/Manrope)
- **Animations**: [GSAP 3](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Micro-Interactions**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm or pnpm or yarn

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <your-repository-url>
cd "FITNESS TRACKER"
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/` to view the application with Hot Module Replacement (HMR).

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment

The project is pre-configured for one-click deployment:

### Deploy to Vercel
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and import the repository.
3. Vercel will automatically detect `vercel.json` and Vite configuration.
4. Click **Deploy**.

### Deploy to Netlify
1. Push your repository to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and import the repository.
3. The included `netlify.toml` automatically configures:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - SPA Redirects: `/* /index.html 200`
4. Click **Deploy Site**.

---

## 📂 Project Structure

```
FITNESS TRACKER/
├── public/
│   ├── favicon.svg
│   ├── _redirects
│   └── img/
│       ├── fitness.svg            # Pure vector letter banner for GSAP pinned animation
│       ├── fitness-hero.jpg       # Hero 5/7 portrait image
│       ├── fitness-outro.jpg      # Outro 5/7 portrait image
│       ├── cardio.jpg             # Workout & meal imagery
│       ├── strength.jpg
│       ├── yoga.jpg
│       ├── hiit.jpg
│       ├── breakfast.jpg
│       ├── lunch.jpg
│       ├── dinner.jpg
│       └── snack.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Sleek minimal navigation with active section tracker
│   │   ├── LandingHeroEffect.jsx  # Exact 61 pinned 3-layer parallax & text scrub
│   │   ├── FitnessDashboard.jsx   # Live steps, calories, time, ECG BPM & 7-day chart
│   │   ├── WorkoutsSection.jsx    # Category filter tabs & exercise cards
│   │   ├── WorkoutModal.jsx       # Interactive countdown timer & exercise checklist
│   │   ├── ProgressTracking.jsx   # SVG load trajectory curves & muscle load distribution
│   │   ├── BmiCalculator.jsx      # Metric/Imperial interactive BMI gauge & advice
│   │   ├── NutritionSection.jsx   # Macro target bars, meal cards & hydration tracker
│   │   ├── GoalsSection.jsx       # Objective progress, custom goal creator & confetti
│   │   ├── ContactSection.jsx     # Coach inquiry form & HQ support
│   │   └── Footer.jsx             # Minimalist footer with quick links & social buttons
│   ├── data/
│   │   └── fitnessData.js         # Comprehensive datasets for regimens, macros & trends
│   ├── App.jsx                    # Root application component with scroll observer
│   ├── index.css                  # Tailwind styles + sample 61 text reveal clip-path
│   └── main.jsx                   # React root entrypoint
├── netlify.toml                   # Netlify build & rewrite configuration
├── vercel.json                    # Vercel deployment configuration
├── tailwind.config.js             # Minimal dark fitness theme tokens
└── package.json
```

---

## 📝 License
MIT License. Built with clarity, discipline, and intention.

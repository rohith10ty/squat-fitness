# Squat Fitness // Performance & Athletic Conditioning Platform

A modern, responsive, and high-performance Fitness Tracking web application built with **React + Vite + Tailwind CSS**, featuring an editorial aesthetic, smooth **Lenis** scrolling, and an interactive **3D kinetic arch & tumbling cubes** landing experience powered by **GSAP ScrollTrigger**.

---

## ✦ Live Features & Architectural Overview

### 1. Interactive 3D Arch & Kinetic Cubes Landing Experience
- **Centered Arch Logo**: Clean 6-block geometric arch hero logo centered with mathematical precision.
- **True 3D Cube Perspective Fly-in**: 6 3D cubes emerge seamlessly from the arch geometry, tumbling and rotating across 3 axes (`X`, `Y`, `Z`) under a `10,000px` 3D perspective viewport.
- **36 Authentic Fitness Textures**: Every single face of the 6 cubes is mapped to authentic high-resolution fitness training photography—capturing barbell back squats, deadlifts, dumbbell racks, overhead presses, battle ropes, and athletic conditioning.
- **Phase 2 Precision Framing**: As scroll progresses, the cubes smoothly arrange around the centered statement *"Where innovation meets precision"*.

### 2. Kinetic Typographic Convergence ("FITNESS")
- **3-Layer Parallax Slide-in**: Triple-stacked `FITNESS` typography slides in smoothly from alternating horizontal trajectories.
- **Seamless Merge & Lift**: Layers merge into a single solid wordmark at 50% scroll and dynamically elevate `-18vh` to align cleanly above the manifesto statement without any overlap.
- **Dynamic Luminance-Aware Navbar**: Floating navigation automatically adapts its typography and border contrast when crossing between the warm cream hero (`#F5F1E8`) and the deep jet black downstream sections (`#0A0A0A`).

### 3. Comprehensive Fitness Tracking Modules

#### 🏋️ Workouts & Regimens
- **Category Filter Tabs**: Strength Training, Cardio, HIIT, and Yoga.
- **Exercise Cards**: High-definition cover imagery, difficulty ratings (`Beginner`, `Intermediate`, `Advanced`), estimated burn, duration, and completion indicators.
- **Interactive Workout Modal & Timer**:
  - Live countdown interval timer with Play, Pause, and Reset controls.
  - Step-by-step movement checklist with rest periods.
  - Confetti celebration upon session completion (`canvas-confetti`).

#### 📊 Daily Performance Dashboard
- **Live Telemetry Counters**:
  - **Daily Steps**: Real-time counter (8,450 / 10,000) with quick `+500` / `+1,000` step controls.
  - **Active Burn**: Caloric expenditure gauge (640 / 800 kcal).
  - **Workout Duration**: Active minutes tracker (48 / 60 min) with `+10m` / `+20m` log shortcuts.
  - **Dynamic Heart Rate Monitor**: Simulated BPM fluctuation and continuous ECG pulse wave animation with `Resting` / `Training` state toggling.
- **7-Day Activity Chart**: Interactive daily volume and step comparison (Mon - Sun) with hover tooltips.

#### 📈 Progress Analytics & Load Curves
- **Load Progression Chart**: Interactive SVG curve visualizing caloric burn and active training load across cycles.
- **Muscle Load Distribution**: Visual percentage indicators tracking volume across Lower Body, Posterior Chain, Chest/Deltoids, and Core Stability.
- **Milestone Metrics**: Streak tracking, 30-day burn totals, and consistency scoring.

#### ⚖️ Precision BMI & Composition Calculator
- **Dual Unit Support**: Metric (`cm`, `kg`) and Imperial (`ft/in`, `lbs`) with dynamic real-time conversion.
- **Visual Gauge**: Interactive slider controls with a multi-zone gauge indicating Underweight, Optimal, Overweight, and Obese brackets with personalized recommendations.

#### 🥗 Targeted Nutrition & Hydration
- **Macronutrient Tracking**: Daily target bars for Protein, Complex Carbohydrates, and Healthy Fats.
- **Course-Based Meal Plans**: Filterable meals for Breakfast, Lunch, Dinner, and Snacks with ingredient tags and macro breakdowns.
- **Interactive Hydration Gauge**: Daily water intake counter with `+250ml`, `+500ml`, and `-250ml` quick-log buttons.

#### 🎯 Objectives & Inquiries
- **Interactive Goals**: Target checklist with progress bars, status toggles, and celebratory animations.
- **Coach Consultations**: Contact and inquiry form with validation and direct HQ support telemetry.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) |
| **Animations** | [GSAP 3](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) |
| **Smooth Scroll** | [@studio-freight/lenis](https://github.com/darkroomengineering/lenis) |
| **Typography** | [Outfit (Google Fonts)](https://fonts.google.com/specimen/Outfit) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Micro-Interactions** | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm, pnpm, or yarn

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/rohith10ty/squat-fitness.git
cd squat-fitness
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/` (or the port indicated in your terminal) to explore the live application with Hot Module Replacement (HMR).

### 3. Production Build
```bash
npm run build
```
The optimized production bundle will be output to the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Deployment

The application is fully configured for deployment on any modern hosting platform:

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Vercel automatically detects `vercel.json` and the Vite build settings.
4. Click **Deploy**.

### Deploy to Netlify
1. Import the repository in [Netlify](https://www.netlify.com/).
2. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - SPA redirects: `/* /index.html 200`
3. Click **Deploy Site**.

---

## 📂 Project Structure

```
squat-fitness/
├── public/
│   ├── favicon.svg            # Arch logo geometric favicon
│   ├── _redirects             # SPA static routing rule
│   └── img/
│       ├── cubes/             # 36 high-resolution fitness textures for 3D cubes
│       ├── cardio.jpg         # Regimen cover assets
│       ├── strength.jpg
│       ├── hiit.jpg
│       ├── yoga.jpg
│       ├── breakfast.jpg      # Nutrition meal cards
│       ├── lunch.jpg
│       ├── dinner.jpg
│       └── snack.jpg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Sleek luminance-aware floating navbar & mobile drawer
│   │   ├── Hero3DSection.jsx        # Reference 42 3D kinetic arch & tumbling cubes
│   │   ├── FitnessLinesSection.jsx  # Pinned 3-layer parallax & single wordmark convergence
│   │   ├── WorkoutsSection.jsx      # Regimen catalog with filter tabs
│   │   ├── WorkoutModal.jsx         # Live interval timer & exercise checklist
│   │   ├── FitnessDashboard.jsx     # Live steps, calories, time, ECG BPM & 7-day chart
│   │   ├── ProgressTracking.jsx     # SVG load trajectory curves & muscle load distribution
│   │   ├── BmiCalculator.jsx        # Dual-unit interactive BMI calculator & gauge
│   │   ├── NutritionSection.jsx     # Macronutrient targets, meal cards & hydration tracker
│   │   ├── GoalsSection.jsx         # Performance objectives & milestone tracker
│   │   ├── ContactSection.jsx       # Consultation inquiry form & HQ support
│   │   └── Footer.jsx               # Minimalist footer with quick navigation links
│   ├── data/
│   │   ├── cubesData.js             # 3D spatial coordinates & rotations for all 6 cubes
│   │   └── fitnessData.js           # Datasets for workouts, metrics, meals & goals
│   ├── App.jsx                      # App root with section observer & Lenis smooth scroll
│   ├── index.css                    # Tailwind setup & 3D perspective transforms
│   └── main.jsx                     # Vite React entry point
├── netlify.toml                     # Netlify build & rewrite configuration
├── vercel.json                      # Vercel deployment configuration
├── tailwind.config.js               # Tailwind design system tokens
└── package.json
```

---

## 📝 License
MIT License. Built with discipline, precision, and performance.

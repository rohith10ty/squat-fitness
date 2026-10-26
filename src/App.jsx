import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero3DSection from './components/Hero3DSection';
import FitnessLinesSection from './components/FitnessLinesSection';
import FitnessDashboard from './components/FitnessDashboard';
import WorkoutsSection from './components/WorkoutsSection';
import ProgressTracking from './components/ProgressTracking';
import BmiCalculator from './components/BmiCalculator';
import NutritionSection from './components/NutritionSection';
import GoalsSection from './components/GoalsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Scroll section observer
    const handleScroll = () => {
      const sections = ['home', 'dashboard', 'workouts', 'progress', 'nutrition', 'bmi', 'goals', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -60, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#241105] text-[#ffe9d9] overflow-x-hidden selection:bg-[#ff7e36] selection:text-white font-sans">
      {/* Centered Minimal Floating Navbar in Luxury 42 Palette */}
      <Navbar activeSection={activeSection} />

      {/* Part 1: Exact 3D Cubes Scroll Hero from Sample 42 with Fitness Photos & Color Changing */}
      <Hero3DSection />

      {/* Part 2: The 3 "FITNESS" Parallax Lines & Progressive Text Reveal from Sample 61 */}
      <FitnessLinesSection
        onExploreWorkouts={() => scrollTo('workouts')}
        onOpenDashboard={() => scrollTo('dashboard')}
      />

      {/* Section Divider Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(255,233,217,0.18)] to-transparent" />
      </div>

      {/* Fitness Dashboard */}
      <FitnessDashboard />

      {/* Modular Workouts & Regimens */}
      <WorkoutsSection />

      {/* Performance Progress & Analytics */}
      <ProgressTracking />

      {/* Precision BMI Calculator */}
      <BmiCalculator />

      {/* Targeted Nutrition & Hydration */}
      <NutritionSection />

      {/* Goals & Objectives */}
      <GoalsSection />

      {/* Coach Inquiries & Contact */}
      <ContactSection />

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

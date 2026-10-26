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
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Scroll section observer using accurate getBoundingClientRect
    const handleScroll = () => {
      // 1. If within Hero section (top 3.8 viewports), active is ALWAYS 'home'
      const heroThreshold = window.innerHeight * 3.8;
      if (window.scrollY < heroThreshold) {
        setActiveSection('home');
        return;
      }

      // 2. Check each downstream section in reverse order so the lowest reached section wins
      const navOrder = [
        { id: 'workouts', nav: 'workouts' },
        { id: 'dashboard', nav: 'dashboard' },
        { id: 'progress', nav: 'progress' },
        { id: 'nutrition', nav: 'nutrition' },
        { id: 'contact', nav: 'contact' },
      ];

      const thresholdY = window.innerHeight * 0.45;
      let matched = null;

      for (let i = navOrder.length - 1; i >= 0; i--) {
        const item = navOrder[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= thresholdY) {
            matched = item.nav;
            break;
          }
        }
      }

      setActiveSection(matched || 'home');
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
    <div className="min-h-screen bg-[#F5F1E8] text-[#1E1B18] overflow-x-hidden selection:bg-[#1E1B18] selection:text-[#F5F1E8] font-sans">
      {/* 42 Minimal Edge-to-Edge Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Part 1: Exact 3D Cubes Scroll Hero from Reference 42 in Luxury Cream / Beige Aesthetic */}
      <Hero3DSection />

      {/* Part 2: The 3 "FITNESS" Parallax Lines & Progressive Text Reveal from Reference 61 */}
      <FitnessLinesSection
        onExploreWorkouts={() => scrollTo('workouts')}
        onOpenDashboard={() => scrollTo('dashboard')}
      />

      {/* Downstream Black Theme Container with Warm Cream Cards */}
      <div className="bg-[#0A0A0A] text-[#F5F1E8] relative">
        {/* Section Divider Bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#333333] to-transparent" />
        </div>

        {/* Modular Workouts & Regimens (1st after Home, matching Navbar) */}
        <WorkoutsSection />

        {/* Fitness Dashboard (2nd after Home, matching Navbar) */}
        <FitnessDashboard />

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
    </div>
  );
}

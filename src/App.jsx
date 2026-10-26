import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import LandingHeroEffect from './components/LandingHeroEffect';
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
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden selection:bg-[#ccff00] selection:text-black font-sans">
      {/* Centered Minimal Floating Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Landing with Left/Right Hero & Centered 61 Parallax Effect */}
      <LandingHeroEffect
        onExploreWorkouts={() => scrollTo('workouts')}
        onOpenDashboard={() => scrollTo('dashboard')}
      />

      {/* Subtle Divider */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent" />
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

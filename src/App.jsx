import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white overflow-x-hidden selection:bg-[#ccff00] selection:text-black">
      {/* Navbar with active highlight */}
      <Navbar activeSection={activeSection} />

      {/* Main Landing with Exact 61 Parallax & Scroll Reveal Effect */}
      <LandingHeroEffect
        onExploreWorkouts={() => scrollTo('workouts')}
        onOpenDashboard={() => scrollTo('dashboard')}
      />

      {/* Section Divider Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="h-px bg-gradient-to-r from-transparent via-[#2e2e2e] to-transparent" />
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

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Zap } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Workouts', href: '#workouts' },
  { name: 'Progress', href: '#progress' },
  { name: 'Nutrition', href: '#nutrition' },
  { name: 'BMI Calc', href: '#bmi' },
  { name: 'Goals', href: '#goals' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Centered Minimal Floating Pill */}
      <div
        className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full border transition-all duration-300 max-w-5xl w-full ${
          scrolled
            ? 'bg-[#161616]/95 backdrop-blur-xl border-[#333333] shadow-2xl shadow-black/80 py-2'
            : 'bg-[#181818]/85 backdrop-blur-lg border-[#2e2e2e] shadow-xl py-2.5'
        }`}
      >
        {/* Brand Logo - Squat Fitness */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="w-7 h-7 rounded bg-[#202020] border border-[#333] flex items-center justify-center group-hover:border-[#ccff00] transition-colors">
            <span className="w-2 h-2 bg-[#ccff00] rounded-sm group-hover:scale-125 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-white leading-none font-sans">
              SQUAT
            </span>
            <span className="text-[8px] font-mono tracking-widest text-[#ccff00] uppercase leading-none mt-0.5">
              FITNESS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Centered) */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2a2a2a] text-[#ccff00] font-semibold shadow-inner'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#222222]/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href="#workouts"
            onClick={(e) => scrollToSection(e, '#workouts')}
            className="px-4 py-1.5 rounded-full bg-[#ccff00] text-black font-bold text-xs tracking-wider uppercase hover:bg-white transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-[#ccff00]/20 cursor-pointer"
          >
            <span>Start Training</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-full text-[#a1a1aa] hover:text-white hover:bg-[#252525] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 bg-[#181818]/95 backdrop-blur-xl border border-[#2e2e2e] rounded-2xl p-5 shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200 max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium tracking-wide flex items-center justify-between ${
                    isActive
                      ? 'bg-[#242424] text-[#ccff00] font-bold'
                      : 'text-[#a1a1aa] hover:bg-[#202020] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3 h-3 text-[#52525b]" />
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2a2a2a] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#71717a] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
              SQUAT TELEMETRY 2.6
            </span>
            <a
              href="#workouts"
              onClick={(e) => scrollToSection(e, '#workouts')}
              className="px-4 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs tracking-wider uppercase"
            >
              Start Session
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

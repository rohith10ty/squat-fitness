import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';

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
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      {/* Centered Minimal Floating Pill in Luxury Espresso 42 Palette */}
      <div
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2 rounded-full border transition-all duration-300 max-w-5xl w-full ${
          scrolled
            ? 'bg-[#2b1307]/95 backdrop-blur-xl border-[rgba(255,233,217,0.2)] shadow-2xl shadow-black/80'
            : 'bg-[#331707]/90 backdrop-blur-lg border-[rgba(255,233,217,0.15)] shadow-xl'
        }`}
      >
        {/* Brand Logo - Squat Fitness */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="group cursor-pointer shrink-0"
        >
          <Logo size="sm" showText={true} />
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
                    ? 'bg-[#4a220d] text-[#ffe9d9] font-bold shadow-inner'
                    : 'text-[#cdb9ab] hover:text-[#ffe9d9] hover:bg-[#3f1d0b]/60'
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
            className="px-4 py-1.5 rounded-full bg-[#ffe9d9] text-[#331707] font-extrabold text-xs tracking-wider uppercase hover:bg-white transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-black/30 cursor-pointer"
          >
            <span>Start Training</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 rounded-full text-[#cdb9ab] hover:text-[#ffe9d9] hover:bg-[#431e0c] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-16 left-4 right-4 bg-[#2b1307]/95 backdrop-blur-xl border border-[rgba(255,233,217,0.2)] rounded-2xl p-5 shadow-2xl lg:hidden animate-in fade-in slide-from-top-4 duration-200 max-w-md mx-auto">
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
                      ? 'bg-[#431e0c] text-[#ffe9d9] font-bold'
                      : 'text-[#cdb9ab] hover:bg-[#381909] hover:text-[#ffe9d9]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3 h-3 text-[#cdb9ab]/60" />
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[rgba(255,233,217,0.12)] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#cdb9ab] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f3a675]" />
              SQUAT TELEMETRY 2.6
            </span>
            <a
              href="#workouts"
              onClick={(e) => scrollToSection(e, '#workouts')}
              className="px-4 py-2 rounded-full bg-[#ffe9d9] text-[#331707] font-bold text-xs tracking-wider uppercase"
            >
              Start Session
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

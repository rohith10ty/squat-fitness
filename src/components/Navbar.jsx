import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Flame, Shield, ChevronRight } from 'lucide-react';

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
      setScrolled(window.scrollY > 40);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#141414]/90 backdrop-blur-md border-b border-[#262626] py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-sm bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center group-hover:border-[#ccff00] transition-colors">
            <span className="w-2.5 h-2.5 bg-[#ccff00] rounded-[2px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-widest text-white leading-none">AURA</span>
            <span className="text-[9px] font-mono tracking-widest text-[#71717a] uppercase">KINETICS</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#1a1a1a]/80 p-1.5 rounded-full border border-[#262626]">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2a2a2a] text-[#ccff00] shadow-sm'
                    : 'text-[#a1a1aa] hover:text-white hover:bg-[#222222]/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Status */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-[#71717a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
            <span>BIO-SYNC ACTIVE</span>
          </div>
          <a
            href="#dashboard"
            onClick={(e) => scrollToSection(e, '#dashboard')}
            className="px-4 py-2 rounded-full bg-[#ccff00] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-[#ccff00]/10"
          >
            <span>Live Stats</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-md text-[#a1a1aa] hover:text-white hover:bg-[#222] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#161616] border-b border-[#262626] px-4 pt-4 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide flex items-center justify-between ${
                    isActive
                      ? 'bg-[#262626] text-[#ccff00]'
                      : 'text-[#a1a1aa] hover:bg-[#1e1e1e] hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3 h-3 text-[#52525b]" />
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#71717a] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
              SYSTEM 2026.1
            </span>
            <a
              href="#workouts"
              onClick={(e) => scrollToSection(e, '#workouts')}
              className="px-4 py-2 rounded-full bg-[#ccff00] text-black font-semibold text-xs tracking-wider uppercase"
            >
              Start Session
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

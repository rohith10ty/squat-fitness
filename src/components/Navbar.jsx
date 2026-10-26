import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ArchLogo from './ArchLogo';

export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Workouts', href: '#workouts' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Progress', href: '#progress' },
  { name: 'Nutrition', href: '#nutrition' },
  { name: 'BMI Calc', href: '#bmi' },
  { name: 'Goals', href: '#goals' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between bg-transparent border-none shadow-none pointer-events-none select-none">
      {/* Brand: Minimalist Geometric Arch Icon + Bold Squat Fitness */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        className="flex items-center gap-3 group cursor-pointer pointer-events-auto"
      >
        <ArchLogo className="w-6 sm:w-7 h-auto shrink-0 text-[#E5FBD4]" />
        <span className="text-lg sm:text-xl font-bold tracking-tight text-[#E5FBD4] font-sans">
          Squat Fitness
        </span>
      </a>

      {/* Desktop Navigation Links (Bold Letters, Slightly Larger, Plane & Right-Aligned) */}
      <nav className="hidden lg:flex items-center gap-7 xl:gap-9 pointer-events-auto">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-sm tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#E5FBD4] border-b-2 border-[#E5FBD4] pb-0.5'
                  : 'text-[#E5FBD4]/75 hover:text-[#E5FBD4]'
              }`}
            >
              {link.name}
            </a>
          );
        })}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden p-2 rounded-lg text-[#E5FBD4] hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#080D02]/95 backdrop-blur-xl border-b border-[rgba(229,251,212,0.15)] shadow-2xl py-6 px-6 lg:hidden flex flex-col gap-4 pointer-events-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-base font-bold py-1.5 border-b border-[rgba(229,251,212,0.08)] ${
                  isActive ? 'text-[#E5FBD4]' : 'text-[#E5FBD4]/75 hover:text-[#E5FBD4]'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}

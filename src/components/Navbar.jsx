import React, { useState, useEffect } from 'react';
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
  const [inWhiteSection, setInWhiteSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is 4x viewport height
      // By the time the user scrolls ~2.5 to 3 viewport heights, it has transitioned to white
      setInWhiteSection(window.scrollY > window.innerHeight * 2.8);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 px-6 sm:px-10 lg:px-14 py-5 flex items-center justify-between ${
        inWhiteSection
          ? 'bg-white/85 backdrop-blur-md border-b border-gray-200/60 shadow-xs'
          : 'bg-transparent'
      }`}
    >
      {/* Brand: Minimalist Geometric Arch Icon + Squat Fitness */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        className="flex items-center gap-2.5 group cursor-pointer select-none"
      >
        <ArchLogo
          className={`w-5 sm:w-6 h-auto shrink-0 transition-colors duration-300 ${
            inWhiteSection ? 'text-[#1D2B04]' : 'text-[#E5FBD4]'
          }`}
        />
        <span
          className={`text-sm sm:text-base font-normal tracking-tight transition-colors duration-300 font-sans ${
            inWhiteSection ? 'text-gray-900' : 'text-[#E5FBD4]'
          }`}
        >
          Squat Fitness
        </span>
      </a>

      {/* Desktop Navigation Links (Small, Minimal, Right-Aligned like Reference Video) */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-xs tracking-wider font-light transition-all duration-200 cursor-pointer ${
                inWhiteSection
                  ? isActive
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600 hover:text-black'
                  : isActive
                  ? 'text-white font-medium'
                  : 'text-white/75 hover:text-white'
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
        className={`lg:hidden p-1.5 rounded-md transition-colors cursor-pointer ${
          inWhiteSection
            ? 'text-gray-900 hover:bg-gray-100'
            : 'text-white hover:bg-white/10'
        }`}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`absolute top-full left-0 right-0 border-b shadow-xl py-5 px-6 lg:hidden flex flex-col gap-3.5 ${
            inWhiteSection
              ? 'bg-white/95 backdrop-blur-xl border-gray-200 text-gray-900'
              : 'bg-[#1D2B04]/95 backdrop-blur-xl border-white/10 text-[#E5FBD4]'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-normal py-1 ${
                  isActive ? 'font-semibold' : 'opacity-80 hover:opacity-100'
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

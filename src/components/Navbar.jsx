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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between ${
        scrolled
          ? 'bg-[#1D2B04]/90 backdrop-blur-md border-b border-[rgba(229,251,212,0.12)] shadow-xl'
          : 'bg-transparent'
      }`}
    >
      {/* Brand: 42 Minimalist Geometric Arch Icon + Squat Fitness */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        className="flex items-center gap-3.5 group cursor-pointer select-none"
      >
        <ArchLogo className="w-7 h-auto text-[#E5FBD4] shrink-0" />
        <span className="text-xl font-medium tracking-tight text-[#E5FBD4] font-sans">
          Squat Fitness
        </span>
      </a>

      {/* Desktop Navigation Links (Edge-to-Edge Minimalist Reference Style) */}
      <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-sm tracking-wide font-normal transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-[#E5FBD4] font-medium border-b border-[#E5FBD4] pb-0.5'
                  : 'text-[#E5FBD4]/85 hover:text-[#E5FBD4] hover:opacity-100'
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
        className="lg:hidden p-2 rounded-lg text-[#E5FBD4] hover:bg-[#283b07] transition-colors cursor-pointer"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#172303]/98 backdrop-blur-xl border-b border-[rgba(229,251,212,0.15)] shadow-2xl py-6 px-6 lg:hidden flex flex-col gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-base font-normal py-2 border-b border-[rgba(229,251,212,0.08)] ${
                  isActive ? 'text-[#E5FBD4] font-semibold' : 'text-[#E5FBD4]/80'
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

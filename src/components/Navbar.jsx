import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ArchLogo from './ArchLogo';

// Exactly 6 key navlinks matching the clean reference specification
export const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'Workouts', href: '#workouts' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Progress', href: '#progress' },
  { name: 'Nutrition', href: '#nutrition' },
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-14 py-7 flex items-center justify-between bg-transparent border-none shadow-none pointer-events-none select-none">
      {/* Inverted Container: Automatically inverts to Black over light backgrounds, and White over dark backgrounds */}
      <div className="flex items-center justify-between w-full navbar-inverted text-white">
        {/* Brand: Minimalist Geometric Arch Icon + Bold Squat Fitness on the Left */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-3 group cursor-pointer pointer-events-auto text-white transition-opacity duration-200 hover:opacity-80"
        >
          <ArchLogo className="w-6 sm:w-7 h-auto shrink-0 fill-current text-white" color="currentColor" />
          <span className="text-lg sm:text-xl font-bold tracking-tight font-sans text-white">
            Squat Fitness
          </span>
        </a>

        {/* Top Right Desktop Navigation: Exactly 6 Important Navlinks */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 pointer-events-auto ml-auto">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm tracking-wider font-semibold transition-all duration-200 cursor-pointer text-white ${
                  isActive
                    ? 'border-b-2 border-white pb-0.5 opacity-100 font-bold'
                    : 'opacity-80 hover:opacity-100'
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
          className="lg:hidden p-2 rounded-lg transition-opacity cursor-pointer pointer-events-auto text-white hover:opacity-80"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (Solid background without mix-blend for crisp readability) */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-2xl py-6 px-6 lg:hidden flex flex-col gap-4 pointer-events-auto transition-colors duration-300 bg-[#0A0A0A]/98 border-[#262626] text-white">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-base font-semibold py-1.5 border-b border-white/10 transition-colors ${
                  isActive ? 'text-white font-bold' : 'text-[#D4C9B7]/80 hover:text-white'
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

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ArchLogo from './ArchLogo';

// Exactly 6 key navlinks as requested
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
  const [isDarkNavbar, setIsDarkNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition navbar colors when entering the black section
      setIsDarkNavbar(window.scrollY > window.innerHeight * 1.5);
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-14 py-7 flex items-center justify-between bg-transparent border-none shadow-none pointer-events-none select-none">
      {/* Brand: Minimalist Geometric Arch Icon + Bold Squat Fitness on the Left */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        className={`flex items-center gap-3 group cursor-pointer pointer-events-auto transition-colors duration-300 ${
          isDarkNavbar ? 'text-[#F5F1E8]' : 'text-[#1E1B18]'
        }`}
      >
        <ArchLogo className="w-6 sm:w-7 h-auto shrink-0" />
        <span className="text-lg sm:text-xl font-bold tracking-tight font-sans">
          Squat Fitness
        </span>
      </a>

      {/* Top Right Desktop Navigation: Exactly 6 Important Navlinks with Reference 42 Spacing */}
      <nav className="hidden lg:flex items-center gap-7 xl:gap-9 pointer-events-auto ml-auto">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-sm tracking-wider font-semibold transition-all duration-300 cursor-pointer ${
                isDarkNavbar
                  ? isActive
                    ? 'text-white border-b-2 border-white pb-0.5'
                    : 'text-[#D4C9B7]/75 hover:text-white'
                  : isActive
                  ? 'text-[#1E1B18] border-b-2 border-[#1E1B18] pb-0.5'
                  : 'text-[#1E1B18]/70 hover:text-[#1E1B18]'
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
        className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer pointer-events-auto ${
          isDarkNavbar ? 'text-[#F5F1E8] hover:bg-white/10' : 'text-[#1E1B18] hover:bg-black/5'
        }`}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`absolute top-full left-0 right-0 backdrop-blur-xl border-b shadow-2xl py-6 px-6 lg:hidden flex flex-col gap-4 pointer-events-auto transition-colors duration-300 ${
            isDarkNavbar
              ? 'bg-[#0A0A0A]/98 border-[#262626] text-[#F5F1E8]'
              : 'bg-[#F5F1E8]/98 border-[#D8CFBF] text-[#1E1B18]'
          }`}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-base font-semibold py-1.5 border-b border-black/5 transition-colors ${
                  isDarkNavbar
                    ? isActive
                      ? 'text-white font-bold'
                      : 'text-[#D4C9B7]/75 hover:text-white'
                    : isActive
                    ? 'text-[#1E1B18] font-bold'
                    : 'text-[#1E1B18]/70 hover:text-[#1E1B18]'
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

import React, { useState, useEffect } from 'react';
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
  const [isDarkNavbar, setIsDarkNavbar] = useState(false);

  // Exact dynamic theme detection: BLACK in white/cream screens, WHITE in black screens
  useEffect(() => {
    const checkTheme = () => {
      const darkTrigger = document.getElementById('dark-theme-trigger');
      if (darkTrigger) {
        const rect = darkTrigger.getBoundingClientRect();
        // The navbar is fixed at top: 0 with ~75px height.
        // As soon as the dark section touches the top viewport boundary, switch to white.
        setIsDarkNavbar(rect.top <= 75);
      } else {
        setIsDarkNavbar(window.scrollY > window.innerHeight * 5.2);
      }
    };

    window.addEventListener('scroll', checkTheme, { passive: true });
    window.addEventListener('resize', checkTheme, { passive: true });
    checkTheme();

    return () => {
      window.removeEventListener('scroll', checkTheme);
      window.removeEventListener('resize', checkTheme);
    };
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
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-14 py-7 flex items-center justify-between bg-transparent border-none shadow-none pointer-events-none select-none transition-colors duration-300">
      {/* Brand: Minimalist Geometric Arch Icon + Bold Squat Fitness on the Left */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        className="flex items-center gap-3 group cursor-pointer pointer-events-auto transition-colors duration-300"
      >
        <ArchLogo
          className="w-6 sm:w-7 h-auto shrink-0 transition-colors duration-300"
          color={isDarkNavbar ? '#FFFFFF' : '#1E1B18'}
        />
        <span
          className={`text-lg sm:text-xl font-bold tracking-tight font-sans transition-colors duration-300 ${
            isDarkNavbar ? 'text-white' : 'text-[#1E1B18]'
          }`}
        >
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
                    : 'text-[#D4C9B7]/80 hover:text-white'
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
          isDarkNavbar ? 'text-white hover:bg-white/10' : 'text-[#1E1B18] hover:bg-black/5'
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
              ? 'bg-[#0A0A0A]/98 border-[#262626] text-white'
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
                      : 'text-[#D4C9B7]/80 hover:text-white'
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

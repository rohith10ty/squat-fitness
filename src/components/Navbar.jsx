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
  // Default to false: Home screen is cream (#F5F1E8), so navbar starts BLACK (#1E1B18)
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkBrightness = () => {
      // 1. If at top of page or within hero section, always light screen (Cream #F5F1E8)
      const currentScroll = window.scrollY;
      const heroHeight = window.innerHeight * 4.0;

      if (currentScroll < heroHeight) {
        setIsOverDark(false);
        ticking = false;
        return;
      }

      // 2. Check the services section transition where background turns from Cream to Black
      const servicesSection = document.getElementById('services-section');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        // Before services section reaches top, we are still on the cream intro
        if (rect.top > 0) {
          setIsOverDark(false);
          ticking = false;
          return;
        }

        // Inside the pinned section: it transitions to black at around 40% of viewport height scrub
        const scrolledInside = -rect.top;
        if (scrolledInside < window.innerHeight * 0.4) {
          setIsOverDark(false); // Still cream screen -> BLACK navbar
          ticking = false;
          return;
        }
      }

      // 3. For all downstream screens (FITNESS coming together, Dashboard, Workouts, Progress, etc.):
      // The screen is Pure Jet Black (#0A0A0A) -> WHITE navbar
      setIsOverDark(true);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkBrightness);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    checkBrightness();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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

  const textColor = isOverDark ? 'text-white' : 'text-[#1E1B18]';
  const logoColor = isOverDark ? '#FFFFFF' : '#1E1B18';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 lg:px-14 py-6 flex items-center justify-between bg-transparent border-none shadow-none pointer-events-none select-none">
      <div className="flex items-center justify-between w-full">
        {/* Brand: Minimalist Geometric Arch Icon + Bold Squat Fitness on the Left */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-3 group cursor-pointer pointer-events-auto transition-opacity duration-200 hover:opacity-80"
        >
          <ArchLogo className="w-6 sm:w-7 h-auto shrink-0 transition-colors duration-200" color={logoColor} />
          <span className={`text-lg sm:text-xl font-bold tracking-tight font-sans transition-colors duration-200 ${textColor}`}>
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
                className={`text-[15px] tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? `${textColor} border-b-2 ${isOverDark ? 'border-white' : 'border-[#1E1B18]'} pb-0.5 opacity-100`
                    : `${textColor} opacity-75 hover:opacity-100`
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
          className={`lg:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer pointer-events-auto ${textColor} hover:opacity-80`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
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

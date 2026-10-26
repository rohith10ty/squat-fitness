import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkBrightness = () => {
      setHasScrolled(window.scrollY > 30);

      // 1. If at the top of the page / within hero, always light screen (Cream #F5F1E8) -> BLACK navbar
      if (window.scrollY < window.innerHeight * 3.5) {
        setIsOverDark(false);
        ticking = false;
        return;
      }

      // 2. If body has dark-nav marker class set by GSAP ScrollTrigger -> WHITE navbar
      if (document.body.classList.contains('dark-nav')) {
        setIsOverDark(true);
        ticking = false;
        return;
      }

      // 3. If user has scrolled into any downstream section (Workouts, Dashboard, Progress, Nutrition, Contact) -> WHITE navbar
      if (activeSection && activeSection !== 'home') {
        setIsOverDark(true);
        ticking = false;
        return;
      }

      // 4. Check services section pinned background or position
      const services = document.getElementById('services-section');
      if (services) {
        const bg = window.getComputedStyle(services).backgroundColor;
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const lum = 0.299 * parseInt(match[1], 10) + 0.587 * parseInt(match[2], 10) + 0.114 * parseInt(match[3], 10);
          const rect = services.getBoundingClientRect();
          // If services is pinned at top and its background has turned dark -> WHITE navbar
          if (rect.top <= 10 && lum < 130) {
            setIsOverDark(true);
            ticking = false;
            return;
          }
        }
      }

      // 5. Fallback: Check dark theme trigger element
      const darkTrigger = document.getElementById('dark-theme-trigger');
      if (darkTrigger) {
        const rect = darkTrigger.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8) {
          setIsOverDark(true);
          ticking = false;
          return;
        }
      }

      setIsOverDark(false);
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

    // Sync with GSAP ticker so scroll scrub animations smoothly update navbar brightness
    const tickerUpdate = () => {
      checkBrightness();
    };
    gsap.ticker.add(tickerUpdate);

    checkBrightness();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      gsap.ticker.remove(tickerUpdate);
    };
  }, [activeSection]);

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
  const headerBg = hasScrolled
    ? (isOverDark
        ? 'backdrop-blur-md bg-[#0A0A0A]/85 border-b border-white/10 shadow-lg'
        : 'backdrop-blur-md bg-[#F5F1E8]/85 border-b border-[#1E1B18]/10 shadow-sm')
    : 'bg-transparent border-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-14 py-3 sm:py-4 lg:py-6 flex items-center justify-between transition-all duration-300 pointer-events-none select-none ${headerBg}`}>
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
                className={`relative text-[15px] tracking-wider font-bold transition-all duration-200 cursor-pointer py-1 border-b-2 inline-flex items-center justify-center leading-normal ${textColor} ${
                  isActive
                    ? `${isOverDark ? 'border-white' : 'border-[#1E1B18]'} opacity-100`
                    : 'border-transparent opacity-75 hover:opacity-100'
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

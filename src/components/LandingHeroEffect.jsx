import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Flame, Activity, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function LandingHeroEffect({ onExploreWorkouts, onOpenDashboard }) {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text fill scrub reveal for all .animate-text elements
      const textElements = containerRef.current.querySelectorAll('.animate-text');
      textElements.forEach((el) => {
        const text = el.textContent.trim();
        el.setAttribute('data-text', text);

        ScrollTrigger.create({
          trigger: el,
          start: 'top 65%',
          end: 'bottom 45%',
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            el.style.setProperty('--clip-value', `${clipValue}%`);
          },
        });
      });

      // 2. Services Parallax Entrance: Horizontal Slide-In (from top-bottom to top-top)
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
        onUpdate: (self) => {
          const headers = servicesRef.current.querySelectorAll('.services-header');
          if (headers.length >= 3) {
            gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
            gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
            gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
          }
        },
      });

      // 3. Services Pinning and Vertical Slide + Scale Effect
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 1,
        pinSpacing: false,
        onUpdate: (self) => {
          const headers = servicesRef.current.querySelectorAll('.services-header');
          if (headers.length < 3) return;

          if (self.progress <= 0.5) {
            const yProgress = self.progress / 0.5;
            gsap.set(headers[0], { y: `${yProgress * 100}%` });
            gsap.set(headers[2], { y: `${yProgress * -100}%` });
          } else {
            gsap.set(headers[0], { y: '100%' });
            gsap.set(headers[2], { y: '-100%' });

            const scaleProgress = (self.progress - 0.5) / 0.5;
            const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
            const scale = 1 - scaleProgress * (1 - minScale);

            headers.forEach((header) => gsap.set(header, { scale }));
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#141414] text-white selection:bg-[#ccff00] selection:text-black">
      {/* ===== SECTION 1: HERO ===== */}
      <section ref={heroRef} id="home" className="relative w-full min-h-screen h-[100svh] px-4 md:px-8 flex flex-col justify-between items-center py-8 overflow-hidden">
        {/* Subtle top indicator */}
        <div className="pt-20 md:pt-24 flex items-center gap-3 text-xs tracking-[0.25em] text-[#8e8e93] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
          <span>AURA // 01 ARCHITECTURE OF DISCIPLINE</span>
        </div>

        {/* Minimalist 5/7 Portrait Card with subtle corner brackets */}
        <div className="relative group my-auto">
          <div className="relative w-[260px] sm:w-[300px] md:w-[320px] aspect-[5/7] rounded-sm overflow-hidden bg-[#1e1e1e] border border-[#2a2a2a] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img
              src="/img/fitness-hero.jpg"
              alt="Fitness Athlete in focus"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            
            {/* Inner portrait details */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[10px] tracking-widest text-[#ccff00] uppercase font-mono">PHASE I</p>
                <h3 className="text-sm font-semibold tracking-wide text-white">FOUNDATIONAL CAPACITY</h3>
              </div>
              <span className="text-[11px] font-mono text-[#a1a1aa]">EST. 2026</span>
            </div>
          </div>

          {/* Minimalist Floating Accent Tags */}
          <div className="hidden sm:flex absolute -left-20 top-1/3 -rotate-90 origin-center text-[10px] tracking-[0.3em] text-[#71717a] uppercase select-none">
            FOCUS // REPETITION
          </div>
          <div className="hidden sm:flex absolute -right-20 bottom-1/3 rotate-90 origin-center text-[10px] tracking-[0.3em] text-[#71717a] uppercase select-none">
            ENDURANCE // CLARITY
          </div>
        </div>

        {/* Minimal Hero Bottom Controls & CTA */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
          <div className="flex items-center gap-6">
            <button
              onClick={onExploreWorkouts}
              className="px-6 py-2.5 rounded-full bg-[#ccff00] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-lg shadow-[#ccff00]/10 flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Explore Protocols</span>
            </button>
            <button
              onClick={onOpenDashboard}
              className="px-6 py-2.5 rounded-full bg-transparent text-white border border-[#333] hover:border-[#ccff00] hover:text-[#ccff00] font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Open Dashboard</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#71717a] font-mono">
            <span>SCROLL TO ENGAGE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#ccff00]" />
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: ABOUT (Progressive Text Reveal) ===== */}
      <section className="relative w-full min-h-[85vh] h-[85svh] px-6 md:px-12 flex justify-center items-center overflow-hidden bg-[#141414]">
        <h1
          ref={text1Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.15] select-none"
        >
          A space for training shaped with clarity and intention. Each protocol follows a simple path from discipline to strength, from strength to longevity.
        </h1>
      </section>

      {/* ===== SECTION 3: SERVICES / FITNESS 3-LAYER PINNED EFFECT ===== */}
      <section
        ref={servicesRef}
        className="services relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#141414]"
      >
        {/* Layer 1: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-4 md:px-8 bg-[#141414] will-change-transform z-10"
          style={{ transform: 'translateX(100%) translateY(0%)' }}
        >
          <img src="/img/fitness.svg" alt="FITNESS BANNER LAYER 1" className="w-full max-h-[28vh] object-contain select-none pointer-events-none" />
        </div>

        {/* Layer 2: Starts translateX(-100%), z-index 2 */}
        <div
          className="services-header relative w-full px-4 md:px-8 bg-[#141414] will-change-transform z-20"
          style={{ transform: 'translateX(-100%) translateY(0%)' }}
        >
          <img src="/img/fitness.svg" alt="FITNESS BANNER LAYER 2" className="w-full max-h-[28vh] object-contain select-none pointer-events-none" />
        </div>

        {/* Layer 3: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-4 md:px-8 bg-[#141414] will-change-transform z-10"
          style={{ transform: 'translateX(100%) translateY(0%)' }}
        >
          <img src="/img/fitness.svg" alt="FITNESS BANNER LAYER 3" className="w-full max-h-[28vh] object-contain select-none pointer-events-none" />
        </div>
      </section>

      {/* ===== SECTION 4: SERVICES-COPY (Second Progressive Text Reveal) ===== */}
      <section className="services-copy relative w-full mt-[140svh] md:mt-[155svh] px-6 md:px-12 pb-[20svh] text-center bg-[#141414]">
        <h1
          ref={text2Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.15] select-none"
        >
          We engineer fitness tracking that values clarity above excess. Through minimal form, precise biometrics, and quiet order, we turn daily habits into lifelong mastery.
        </h1>
      </section>

      {/* ===== SECTION 5: OUTRO PORTRAIT ===== */}
      <section className="relative w-full min-h-[90vh] h-[90svh] px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden bg-[#141414]">
        <div className="relative group">
          <div className="relative w-[260px] sm:w-[300px] md:w-[320px] aspect-[5/7] rounded-sm overflow-hidden bg-[#1e1e1e] border border-[#2a2a2a] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img
              src="/img/fitness-outro.jpg"
              alt="Athlete finishing session"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[10px] tracking-widest text-[#ccff00] uppercase font-mono">PHASE II</p>
                <h3 className="text-sm font-semibold tracking-wide text-white">THE ARENA AWAITS</h3>
              </div>
              <span className="text-[11px] font-mono text-[#a1a1aa]">READY</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#71717a]">
            CONTINUE DOWN TO LIVE METRICS &amp; WORKOUTS
          </p>
          <ArrowDown className="w-4 h-4 text-[#ccff00] animate-bounce" />
        </div>
      </section>
    </div>
  );
}

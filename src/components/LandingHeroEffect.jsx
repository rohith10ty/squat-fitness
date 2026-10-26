import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Flame, Activity, ShieldCheck, Dumbbell } from 'lucide-react';

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
          start: 'top 70%',
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
            const minScale = window.innerWidth <= 1000 ? 0.3 : 0.15;
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
      {/* ===== SECTION 1: HERO (Split Layout: Left Text / Right Photo) ===== */}
      <section
        ref={heroRef}
        id="home"
        className="relative w-full min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-12 flex flex-col justify-between overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Strong Typography & Justified Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
            {/* Minimalist Top Tag */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1c1c1c] border border-[#2e2e2e] w-fit text-[11px] font-mono tracking-widest text-[#a1a1aa] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span>SQUAT FITNESS // 01 ARCHITECTURE OF DISCIPLINE</span>
            </div>

            {/* Main Headline in Outfit */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase">
              Discipline <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#71717a]">
                Shaped With
              </span> <br />
              <span className="text-[#ccff00]">Clarity.</span>
            </h1>

            {/* Minimal Description */}
            <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-xl font-sans">
              Squat Fitness is a minimalist performance intelligence platform engineered for athletes who prioritize quiet consistency. Track daily loads, macro periodization, and biometric progression without excess noise.
            </p>

            {/* Justified Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreWorkouts}
                className="px-7 py-3 rounded-full bg-[#ccff00] text-black font-extrabold text-xs tracking-wider uppercase hover:bg-white transition-all duration-300 shadow-lg shadow-[#ccff00]/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-black" />
                <span>Explore Protocols</span>
              </button>

              <button
                onClick={onOpenDashboard}
                className="px-7 py-3 rounded-full bg-[#1c1c1c] text-white border border-[#333333] hover:border-[#ccff00] hover:text-[#ccff00] font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Activity className="w-4 h-4" />
                <span>Open Dashboard</span>
              </button>
            </div>

            {/* Telemetry Stats Row */}
            <div className="pt-4 border-t border-[#262626] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">12.5K</span>
                <p className="text-[10px] font-mono text-[#71717a] uppercase mt-0.5">Active Athletes</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#ccff00]">99.4%</span>
                <p className="text-[10px] font-mono text-[#71717a] uppercase mt-0.5">Telemetry Uptime</p>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#00f0ff]">0%</span>
                <p className="text-[10px] font-mono text-[#71717a] uppercase mt-0.5">Fluff or Clutter</p>
              </div>
            </div>
          </div>

          {/* Right Column: 5/7 Athletic Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* The 5/7 Card */}
              <div className="relative w-[280px] sm:w-[320px] md:w-[340px] xl:w-[360px] aspect-[5/7] rounded-xl overflow-hidden bg-[#1c1c1c] border border-[#2e2e2e] shadow-2xl shadow-black/80 transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src="/img/fitness-hero.jpg"
                  alt="Squat Fitness Athlete in Training"
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />

                {/* Corner tags */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono text-white/70">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 uppercase">
                    SQUAT LABS
                  </span>
                  <span className="text-[#ccff00] font-bold">2026.1</span>
                </div>

                {/* Bottom Card Coordinates */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] tracking-widest text-[#ccff00] uppercase font-mono font-bold">
                      PHASE I
                    </p>
                    <h3 className="text-sm font-bold tracking-wide text-white uppercase font-sans">
                      Foundational Capacity
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-[#a1a1aa]">EST. 2026</span>
                </div>
              </div>

              {/* Floating Vertical Subtle Tag */}
              <div className="hidden xl:flex absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] font-mono tracking-[0.3em] text-[#52525b] uppercase select-none whitespace-nowrap">
                PRECISION // OVERLOAD
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Centered Scroll Prompt */}
        <div className="w-full flex justify-center items-center gap-2 pt-8 text-xs text-[#71717a] font-mono">
          <span>SCROLL TO ENGAGE EFFECT</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#ccff00]" />
        </div>
      </section>

      {/* ===== SECTION 2: ABOUT (Progressive Text Reveal) ===== */}
      <section className="relative w-full min-h-[85vh] h-[85svh] px-6 md:px-12 flex justify-center items-center overflow-hidden bg-[#141414]">
        <h1
          ref={text1Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.15] select-none uppercase font-sans"
        >
          A space for training shaped with clarity and intention. Each protocol follows a simple path from discipline to strength, from strength to longevity.
        </h1>
      </section>

      {/* ===== SECTION 3: SERVICES / FITNESS 3-LAYER PINNED EFFECT (PERFECTLY CENTERED) ===== */}
      <section
        ref={servicesRef}
        className="services relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#141414]"
      >
        {/* Layer 1: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#141414] will-change-transform z-10 flex justify-center items-center text-center"
          style={{ transform: 'translateX(100%) translateY(0%)' }}
        >
          <svg
            viewBox="0 0 3600 520"
            className="w-full max-h-[26vh] object-contain select-none pointer-events-none mx-auto"
          >
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-black"
              style={{
                fontFamily: "'Outfit', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: '440px',
                letterSpacing: '0.12em',
              }}
            >
              FITNESS
            </text>
          </svg>
        </div>

        {/* Layer 2: Starts translateX(-100%), z-index 2 */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#141414] will-change-transform z-20 flex justify-center items-center text-center"
          style={{ transform: 'translateX(-100%) translateY(0%)' }}
        >
          <svg
            viewBox="0 0 3600 520"
            className="w-full max-h-[26vh] object-contain select-none pointer-events-none mx-auto"
          >
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-black"
              style={{
                fontFamily: "'Outfit', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: '440px',
                letterSpacing: '0.12em',
              }}
            >
              FITNESS
            </text>
          </svg>
        </div>

        {/* Layer 3: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#141414] will-change-transform z-10 flex justify-center items-center text-center"
          style={{ transform: 'translateX(100%) translateY(0%)' }}
        >
          <svg
            viewBox="0 0 3600 520"
            className="w-full max-h-[26vh] object-contain select-none pointer-events-none mx-auto"
          >
            <text
              x="50%"
              y="52%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-black"
              style={{
                fontFamily: "'Outfit', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: '440px',
                letterSpacing: '0.12em',
              }}
            >
              FITNESS
            </text>
          </svg>
        </div>
      </section>

      {/* ===== SECTION 4: SERVICES-COPY (Second Progressive Text Reveal) ===== */}
      <section className="services-copy relative w-full mt-[140svh] md:mt-[155svh] px-6 md:px-12 pb-[20svh] text-center bg-[#141414]">
        <h1
          ref={text2Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.15] select-none uppercase font-sans"
        >
          Squat Fitness engineers training that values clarity above excess. Through minimal form, precise biometrics, and quiet order, we turn daily habits into lifelong mastery.
        </h1>
      </section>

      {/* ===== SECTION 5: OUTRO PORTRAIT ===== */}
      <section className="relative w-full min-h-[90vh] h-[90svh] px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden bg-[#141414]">
        <div className="relative group">
          <div className="relative w-[260px] sm:w-[300px] md:w-[320px] aspect-[5/7] rounded-xl overflow-hidden bg-[#1c1c1c] border border-[#2e2e2e] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img
              src="/img/fitness-outro.jpg"
              alt="Squat Fitness athlete post-session"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <div>
                <p className="text-[10px] tracking-widest text-[#ccff00] uppercase font-mono font-bold">PHASE II</p>
                <h3 className="text-sm font-bold tracking-wide text-white uppercase">THE ARENA AWAITS</h3>
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

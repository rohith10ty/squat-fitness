import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Flame, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FitnessLinesSection({ onExploreWorkouts, onOpenDashboard }) {
  const containerRef = useRef(null);
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
    <div ref={containerRef} className="relative bg-[#1D2B04] text-[#E5FBD4] font-sans selection:bg-[#E5FBD4] selection:text-[#1D2B04]">
      {/* ===== SECTION 1: ABOUT (Progressive Text Reveal) ===== */}
      <section className="relative w-full min-h-[85vh] h-[85svh] px-6 md:px-12 flex justify-center items-center overflow-hidden bg-[#1D2B04]">
        <h1
          ref={text1Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.15] select-none uppercase font-sans text-[#435e12]"
        >
          A space for training shaped with clarity and intention. Each protocol follows a simple path from discipline to strength, from strength to longevity.
        </h1>
      </section>

      {/* ===== SECTION 2: SERVICES / 3 FITNESS LINES PINNED EFFECT ===== */}
      <section
        ref={servicesRef}
        className="services relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#1D2B04]"
      >
        {/* Layer 1: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#1D2B04] will-change-transform z-10 flex justify-center items-center text-center"
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
              className="fill-[#E5FBD4] font-black"
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
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#1D2B04] will-change-transform z-20 flex justify-center items-center text-center"
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
              className="fill-[#E5FBD4] font-black"
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
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#1D2B04] will-change-transform z-10 flex justify-center items-center text-center"
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
              className="fill-[#E5FBD4] font-black"
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

      {/* ===== SECTION 3: SERVICES-COPY (Second Progressive Text Reveal) ===== */}
      <section className="services-copy relative w-full mt-[140svh] md:mt-[155svh] px-6 md:px-12 pb-[20svh] text-center bg-[#1D2B04]">
        <h1
          ref={text2Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.15] select-none uppercase font-sans text-[#435e12]"
        >
          Squat Fitness engineers training that values clarity above excess. Through minimal form, precise biometrics, and quiet order, we turn daily habits into lifelong mastery.
        </h1>
      </section>

      {/* ===== SECTION 4: OUTRO PORTRAIT WITH ACTION BUTTONS ===== */}
      <section className="relative w-full min-h-[90vh] h-[90svh] px-4 md:px-8 flex flex-col justify-center items-center overflow-hidden bg-[#182403]">
        <div className="relative group mb-6">
          <div className="relative w-[240px] sm:w-[270px] md:w-[290px] aspect-[5/7] rounded-xl overflow-hidden bg-[#243506] border border-[rgba(229,251,212,0.2)] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img
              src="/img/fitness-outro.jpg"
              alt="Squat Fitness athlete post-session"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#E5FBD4] uppercase font-mono font-bold">PHASE II</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">THE ARENA AWAITS</h3>
              </div>
              <span className="text-[10px] font-mono text-[#E5FBD4]/70">READY</span>
            </div>
          </div>
        </div>

        {/* Action Controls to Explore Modules */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <button
            onClick={onExploreWorkouts}
            className="px-6 py-2.5 rounded-full bg-[#E5FBD4] text-[#1D2B04] font-extrabold text-xs tracking-wider uppercase hover:bg-white transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-black/40"
          >
            <Flame className="w-3.5 h-3.5 fill-[#1D2B04]" />
            <span>Explore Regimens</span>
          </button>
          <button
            onClick={onOpenDashboard}
            className="px-6 py-2.5 rounded-full bg-[#243506] text-[#E5FBD4] border border-[rgba(229,251,212,0.25)] hover:border-[#E5FBD4] font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-[#E5FBD4]" />
            <span>Open Dashboard</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5FBD4]/70">
            CONTINUE DOWN TO LIVE TELEMETRY
          </p>
          <ArrowDown className="w-4 h-4 text-[#E5FBD4] animate-bounce" />
        </div>
      </section>
    </div>
  );
}

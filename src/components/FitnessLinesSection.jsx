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

      // Helper for color interpolation (Cream #F5F1E8 to Deep Sleek Black #050801)
      const interpolateBg = (progress) => {
        const p = Math.max(0, Math.min(progress, 1));
        const r = Math.round(245 + (5 - 245) * p);
        const g = Math.round(241 + (8 - 241) * p);
        const b = Math.round(232 + (1 - 232) * p);
        return `rgb(${r}, ${g}, ${b})`;
      };

      // Helper for SVG text fill interpolation (#1E1B18 rgb(30,27,24) to #E5FBD4 rgb(229,251,212))
      const interpolateText = (progress) => {
        const p = Math.max(0, Math.min(progress, 1));
        const r = Math.round(30 + (229 - 30) * p);
        const g = Math.round(27 + (251 - 27) * p);
        const b = Math.round(24 + (212 - 24) * p);
        return `rgb(${r}, ${g}, ${b})`;
      };

      // 3. Services Pinning, Coming Together & Background Conversion (Cream -> Black)
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 1,
        pinSpacing: false,
        onUpdate: (self) => {
          const headers = servicesRef.current.querySelectorAll('.services-header');
          const svgTexts = servicesRef.current.querySelectorAll('.fitness-svg-text');
          if (headers.length < 3) return;

          if (self.progress <= 0.5) {
            const yProgress = self.progress / 0.5;
            gsap.set(headers[0], { y: `${yProgress * 100}%` });
            gsap.set(headers[2], { y: `${yProgress * -100}%` });

            // Smooth background transition from Cream to Black as FITNESS comes together
            const currentBg = interpolateBg(yProgress);
            const currentTextFill = interpolateText(yProgress);

            servicesRef.current.style.backgroundColor = currentBg;
            headers.forEach((h) => {
              h.style.backgroundColor = currentBg;
            });
            svgTexts.forEach((t) => {
              t.style.fill = currentTextFill;
            });
          } else {
            gsap.set(headers[0], { y: '100%' });
            gsap.set(headers[2], { y: '-100%' });

            // Fully lock to Deep Sleek Black and Mint White
            servicesRef.current.style.backgroundColor = '#050801';
            headers.forEach((h) => {
              h.style.backgroundColor = '#050801';
            });
            svgTexts.forEach((t) => {
              t.style.fill = '#E5FBD4';
            });

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
    <div ref={containerRef} className="relative bg-[#F5F1E8] font-sans selection:bg-[#E5FBD4] selection:text-[#050801]">
      {/* ===== SECTION 1: ABOUT (Progressive Text Reveal on Warm Cream) ===== */}
      <section className="relative w-full min-h-[85vh] h-[85svh] px-6 md:px-12 flex justify-center items-center overflow-hidden bg-[#F5F1E8]">
        <h1
          ref={text1Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.18] select-none uppercase font-sans"
        >
          A space for training shaped with clarity and intention. Each protocol follows a simple path from discipline to strength, from strength to longevity.
        </h1>
      </section>

      {/* ===== SECTION 2: SERVICES / 3 FITNESS LINES PINNED EFFECT WITH COLOR CONVERSION ===== */}
      <section
        ref={servicesRef}
        className="services relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#F5F1E8] transition-colors"
      >
        {/* Layer 1: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#F5F1E8] will-change-transform z-10 flex justify-center items-center text-center"
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
              className="fitness-svg-text fill-[#1E1B18] font-black"
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
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#F5F1E8] will-change-transform z-20 flex justify-center items-center text-center"
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
              className="fitness-svg-text fill-[#1E1B18] font-black"
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
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-[#F5F1E8] will-change-transform z-10 flex justify-center items-center text-center"
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
              className="fitness-svg-text fill-[#1E1B18] font-black"
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

      {/* ===== SECTION 3: SERVICES-COPY (Second Progressive Text Reveal on Deep Black) ===== */}
      <section className="services-copy relative w-full mt-[140svh] md:mt-[155svh] px-6 md:px-12 pb-[20svh] text-center bg-[#050801] text-[#E5FBD4]">
        <h1
          ref={text2Ref}
          className="animate-text font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.18] select-none uppercase font-sans"
        >
          Squat Fitness engineers training that values clarity above excess. Through minimal form, precise biometrics, and quiet order, we turn daily habits into lifelong mastery.
        </h1>
      </section>

      {/* ===== SECTION 4: OUTRO TRIPTYCH GALLERY (Left, Center, Right 3 Photos) ===== */}
      <section className="relative w-full min-h-[95vh] py-16 px-4 sm:px-8 flex flex-col justify-center items-center overflow-hidden bg-[#050801] border-t border-[rgba(229,251,212,0.15)] text-[#E5FBD4]">
        {/* 3 Photos Triptych Layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 mb-10 w-full max-w-5xl">
          {/* Card 1: Left Photo (Phase I) */}
          <div className="relative group w-[230px] sm:w-[260px] md:w-[275px] aspect-[5/7] rounded-2xl overflow-hidden bg-[#0D1403] border border-[rgba(229,251,212,0.2)] shadow-xl transition-all duration-500 hover:scale-[1.03] hover:border-[rgba(229,251,212,0.4)]">
            <img
              src="/img/strength.jpg"
              alt="Squat Fitness athletic strength protocol"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#E5FBD4] uppercase font-mono font-bold">PHASE I</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">ATHLETIC LOAD</h3>
              </div>
              <span className="text-[10px] font-mono text-[#E5FBD4]/80 font-bold">ACTIVE</span>
            </div>
          </div>

          {/* Card 2: Center Featured Photo (Phase II, Attachment 2) */}
          <div className="relative group w-[245px] sm:w-[275px] md:w-[295px] aspect-[5/7] rounded-2xl overflow-hidden bg-[#0D1403] border-2 border-[rgba(229,251,212,0.4)] shadow-2xl transition-all duration-500 hover:scale-[1.04] md:-translate-y-2">
            <img
              src="/img/fitness-outro.jpg"
              alt="Squat Fitness athlete post-session arena"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#E5FBD4] uppercase font-mono font-bold">PHASE II</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">THE ARENA AWAITS</h3>
              </div>
              <span className="text-[10px] font-mono text-[#E5FBD4] font-black">READY</span>
            </div>
          </div>

          {/* Card 3: Right Photo (Phase III) */}
          <div className="relative group w-[230px] sm:w-[260px] md:w-[275px] aspect-[5/7] rounded-2xl overflow-hidden bg-[#0D1403] border border-[rgba(229,251,212,0.2)] shadow-xl transition-all duration-500 hover:scale-[1.03] hover:border-[rgba(229,251,212,0.4)]">
            <img
              src="/img/hiit.jpg"
              alt="Squat Fitness metabolic recovery and telemetry"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#E5FBD4] uppercase font-mono font-bold">PHASE III</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">LONGEVITY MATRIX</h3>
              </div>
              <span className="text-[10px] font-mono text-[#E5FBD4]/80 font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Action Controls to Explore Modules */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <button
            onClick={onExploreWorkouts}
            className="px-6 py-2.5 rounded-full bg-[#E5FBD4] text-[#050801] font-bold text-xs tracking-wider uppercase hover:bg-white transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#E5FBD4]/15"
          >
            <Flame className="w-3.5 h-3.5 text-[#050801]" />
            <span>Explore Regimens</span>
          </button>
          <button
            onClick={onOpenDashboard}
            className="px-6 py-2.5 rounded-full bg-[#182405] text-[#E5FBD4] border border-[rgba(229,251,212,0.25)] hover:border-[#E5FBD4] font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Activity className="w-3.5 h-3.5 text-[#E5FBD4]" />
            <span>Open Dashboard</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E5FBD4]/70 font-semibold">
            CONTINUE DOWN TO LIVE TELEMETRY
          </p>
          <ArrowDown className="w-4 h-4 text-[#E5FBD4]/70 animate-bounce" />
        </div>
      </section>
    </div>
  );
}

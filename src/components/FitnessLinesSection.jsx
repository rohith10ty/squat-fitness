import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Activity, ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FitnessLinesSection({ onExploreWorkouts, onOpenDashboard }) {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveal scrub animation for both text sections
      [text1Ref.current, text2Ref.current].forEach((textElement) => {
        if (!textElement) return;
        textElement.setAttribute('data-text', textElement.textContent.trim());

        ScrollTrigger.create({
          trigger: textElement,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
          onUpdate: (self) => {
            const clipValue = Math.max(0, 100 - self.progress * 100);
            textElement.style.setProperty('--clip-value', `${clipValue}%`);
          },
        });
      });

      // 2. Initial Horizontal Slide-in of 3 FITNESS Lines
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

      // Helper for color interpolation (Cream #F5F1E8 rgb(245,241,232) to Pure Jet Black #0A0A0A rgb(10,10,10))
      const interpolateBg = (progress) => {
        const p = Math.max(0, Math.min(progress, 1));
        const r = Math.round(245 + (10 - 245) * p);
        const g = Math.round(241 + (10 - 241) * p);
        const b = Math.round(232 + (10 - 232) * p);
        return `rgb(${r}, ${g}, ${b})`;
      };

      // Helper for SVG text fill interpolation (Deep Black #1E1B18 rgb(30,27,24) to Warm Cream #F5F1E8 rgb(245,241,232))
      const interpolateText = (progress) => {
        const p = Math.max(0, Math.min(progress, 1));
        const r = Math.round(30 + (245 - 30) * p);
        const g = Math.round(27 + (241 - 27) * p);
        const b = Math.round(24 + (232 - 24) * p);
        return `rgb(${r}, ${g}, ${b})`;
      };

      // 3. Services Pinning, Coming Together & Background Conversion (Cream -> Pure Black)
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

          // Headers are ALWAYS completely transparent - NO background rectangles
          headers.forEach((h) => {
            h.style.backgroundColor = 'transparent';
          });

          // Notify navbar when background enters dark phase
          const isDark = self.progress >= 0.25;
          document.body.classList.toggle('dark-nav', isDark);

          if (self.progress <= 0.5) {
            const yProgress = self.progress / 0.5;
            gsap.set(headers[0], { y: `${yProgress * 100}%`, scale: 1 });
            gsap.set(headers[1], { y: '0%', scale: 1 });
            gsap.set(headers[2], { y: `${yProgress * -100}%`, scale: 1 });

            // Smooth background transition from Cream to Pure Black as FITNESS comes together
            const currentBg = interpolateBg(yProgress);
            const currentTextFill = interpolateText(yProgress);

            servicesRef.current.style.backgroundColor = currentBg;
            svgTexts.forEach((t) => {
              t.style.fill = currentTextFill;
            });
          } else {
            // Fully lock to Pure Jet Black and Warm Cream
            servicesRef.current.style.backgroundColor = '#0A0A0A';
            svgTexts.forEach((t) => {
              t.style.fill = '#F5F1E8';
            });

            const scaleProgress = (self.progress - 0.5) / 0.5;
            const minScale = window.innerWidth <= 1000 ? 0.28 : 0.14;
            const scale = 1 - scaleProgress * (1 - minScale);

            // Smoothly lift FITNESS upward as it scales so it sits directly above the incoming paragraph
            const yLift = scaleProgress * 20; // 20vh upward lift

            gsap.set(headers[0], { y: `calc(100% - ${yLift}vh)`, scale });
            gsap.set(headers[1], { y: `calc(0% - ${yLift}vh)`, scale });
            gsap.set(headers[2], { y: `calc(-100% - ${yLift}vh)`, scale });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#F5F1E8] font-sans selection:bg-[#1E1B18] selection:text-[#F5F1E8]">
      {/* ===== SECTION 1: ABOUT (Progressive Text Reveal on Warm Cream - PURE BLACK TEXT) ===== */}
      <section className="relative w-full min-h-[85vh] h-[85svh] px-6 md:px-12 flex justify-center items-center overflow-hidden bg-[#F5F1E8]">
        <h1
          ref={text1Ref}
          className="animate-text font-black text-xl sm:text-3xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.22] select-none uppercase font-sans"
        >
          A space for training shaped with clarity and intention. Each protocol follows a simple path from discipline to strength, from strength to longevity.
        </h1>
      </section>

      {/* ===== SECTION 2: SERVICES / 3 FITNESS LINES PINNED EFFECT WITH COLOR CONVERSION ===== */}
      <section
        ref={servicesRef}
        id="services-section"
        className="services relative w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#F5F1E8] transition-colors"
      >
        {/* Layer 1: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-transparent will-change-transform z-10 flex justify-center items-center text-center"
          style={{ transform: 'translateX(100%) translateY(0%)', backgroundColor: 'transparent' }}
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
              className="fitness-svg-text font-black"
              style={{
                fontFamily: "'Outfit', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: '440px',
                letterSpacing: '0.12em',
                fill: '#1E1B18',
              }}
            >
              FITNESS
            </text>
          </svg>
        </div>

        {/* Layer 2: Starts translateX(-100%), z-index 2 */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-transparent will-change-transform z-20 flex justify-center items-center text-center"
          style={{ transform: 'translateX(-100%) translateY(0%)', backgroundColor: 'transparent' }}
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
              className="fitness-svg-text font-black"
              style={{
                fontFamily: "'Outfit', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: '440px',
                letterSpacing: '0.12em',
                fill: '#1E1B18',
              }}
            >
              FITNESS
            </text>
          </svg>
        </div>

        {/* Layer 3: Starts translateX(+100%) */}
        <div
          className="services-header relative w-full px-2 sm:px-6 md:px-12 bg-transparent will-change-transform z-10 flex justify-center items-center text-center"
          style={{ transform: 'translateX(100%) translateY(0%)', backgroundColor: 'transparent' }}
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
              className="fitness-svg-text font-black"
              style={{
                fontFamily: "'Outfit', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: '440px',
                letterSpacing: '0.12em',
                fill: '#1E1B18',
              }}
            >
              FITNESS
            </text>
          </svg>
        </div>
      </section>

      {/* ===== SECTION 3: SERVICES-COPY (Second Progressive Text Reveal on Pure Jet Black) ===== */}
      <section id="dark-theme-trigger" className="services-copy relative w-full mt-[105vh] md:mt-[112vh] pt-12 md:pt-16 pb-20 px-6 md:px-12 text-center bg-[#0A0A0A] text-[#F5F1E8]">
        <h1
          ref={text2Ref}
          className="animate-text-dark font-black text-xl sm:text-3xl md:text-5xl lg:text-6xl text-center tracking-tight leading-[1.22] select-none uppercase font-sans"
        >
          Squat Fitness engineers training that values clarity above excess. Through minimal form, precise biometrics, and quiet order, we turn daily habits into lifelong mastery.
        </h1>
      </section>

      {/* ===== SECTION 4: OUTRO TRIPTYCH GALLERY (Left, Center, Right 3 Full-Color Photos) ===== */}
      <section className="relative w-full min-h-[90vh] py-16 px-4 sm:px-8 flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A] border-t border-[#262626] text-[#F5F1E8]">
        {/* 3 Photos Triptych Layout: Pure Full Color, No Filters or Effects */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 mb-10 w-full max-w-5xl">
          {/* Card 1: Left Photo (Phase I) */}
          <div className="relative w-[230px] sm:w-[260px] md:w-[275px] aspect-[5/7] rounded-2xl overflow-hidden bg-[#141414] border border-[#333333] shadow-xl">
            <img
              src="/img/strength.jpg"
              alt="Squat Fitness athletic strength protocol"
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#D4C9B7] uppercase font-mono font-bold">PHASE I</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">ATHLETIC LOAD</h3>
              </div>
              <span className="text-[10px] font-mono text-[#D4C9B7] font-bold">ACTIVE</span>
            </div>
          </div>

          {/* Card 2: Center Featured Photo (Phase II) */}
          <div className="relative w-[245px] sm:w-[275px] md:w-[295px] aspect-[5/7] rounded-2xl overflow-hidden bg-[#141414] border-2 border-[#D8CFBF] shadow-2xl md:-translate-y-2">
            <img
              src="/img/fitness-outro.jpg"
              alt="Squat Fitness athlete post-session arena"
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#F5F1E8] uppercase font-mono font-bold">PHASE II</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">THE ARENA AWAITS</h3>
              </div>
              <span className="text-[10px] font-mono text-[#F5F1E8] font-black">READY</span>
            </div>
          </div>

          {/* Card 3: Right Photo (Phase III) */}
          <div className="relative w-[230px] sm:w-[260px] md:w-[275px] aspect-[5/7] rounded-2xl overflow-hidden bg-[#141414] border border-[#333333] shadow-xl">
            <img
              src="/img/hiit.jpg"
              alt="Squat Fitness metabolic recovery and telemetry"
              className="w-full h-full object-cover block"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div>
                <p className="text-[9px] tracking-widest text-[#D4C9B7] uppercase font-mono font-bold">PHASE III</p>
                <h3 className="text-xs font-bold tracking-wide text-white uppercase">LONGEVITY MATRIX</h3>
              </div>
              <span className="text-[10px] font-mono text-[#D4C9B7] font-bold">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Action Controls to Explore Modules */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <button
            onClick={onExploreWorkouts}
            className="px-6 py-2.5 rounded-full bg-[#F5F1E8] text-[#1E1B18] font-bold text-xs tracking-wider uppercase hover:bg-white transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5"
          >
            <Flame className="w-3.5 h-3.5 text-[#1E1B18]" />
            <span>Explore Regimens</span>
          </button>
          <button
            onClick={onOpenDashboard}
            className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-[#F5F1E8] border border-[#444444] hover:border-[#F5F1E8] font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Activity className="w-3.5 h-3.5 text-[#F5F1E8]" />
            <span>Open Dashboard</span>
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-1.5">
          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4C9B7]/70 font-semibold">
            CONTINUE DOWN TO LIVE TELEMETRY
          </p>
          <ArrowDown className="w-4 h-4 text-[#D4C9B7]/70 animate-bounce" />
        </div>
      </section>
    </div>
  );
}

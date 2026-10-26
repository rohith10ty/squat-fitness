import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cubesData } from '../data/cubesData';

gsap.registerPlugin(ScrollTrigger);

// 36 Fitness Images for the 6 Cubes x 6 Faces
const CUBE_IMAGES = [
  '/img/cubes/fit1.jpg', '/img/cubes/fit2.jpg', '/img/cubes/fit3.jpg', '/img/cubes/fit4.jpg', '/img/cubes/fit5.jpg', '/img/cubes/fit6.jpg',
  '/img/cubes/fit7.jpg', '/img/cubes/fit8.jpg', '/img/cubes/fit9.jpg', '/img/cubes/fit10.jpg', '/img/cubes/fit11.jpg', '/img/cubes/fit12.jpg',
  '/img/cubes/strength.jpg', '/img/cubes/cardio.jpg', '/img/cubes/hiit.jpg', '/img/cubes/yoga.jpg', '/img/cubes/fitness-hero.jpg', '/img/cubes/fitness-outro.jpg',
  '/img/cubes/fit2.jpg', '/img/cubes/fit5.jpg', '/img/cubes/fit8.jpg', '/img/cubes/fit1.jpg', '/img/cubes/fit4.jpg', '/img/cubes/fit7.jpg',
  '/img/cubes/strength.jpg', '/img/cubes/hiit.jpg', '/img/cubes/fit10.jpg', '/img/cubes/fit12.jpg', '/img/cubes/fit3.jpg', '/img/cubes/fit6.jpg',
  '/img/cubes/fit9.jpg', '/img/cubes/fit11.jpg', '/img/cubes/cardio.jpg', '/img/cubes/fitness-hero.jpg', '/img/cubes/yoga.jpg', '/img/cubes/fitness-outro.jpg'
];

export default function Hero3DSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const logoRef = useRef(null);
  const cubesRef = useRef(null);
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stickySection = stickyRef.current;
      const logo = logoRef.current;
      const cubesContainer = cubesRef.current;
      const header1 = header1Ref.current;
      const header2 = header2Ref.current;

      const stickyHeight = window.innerHeight * 4;

      const interpolate = (start, end, progress) => {
        return start + (end - start) * progress;
      };

      // Helper for color interpolation (from #331707 to #cdb9ab)
      // #331707 is rgb(51, 23, 7)
      // #cdb9ab is rgb(205, 185, 171)
      const interpolateColor = (progress) => {
        const r = Math.round(51 + (205 - 51) * progress);
        const g = Math.round(23 + (185 - 23) * progress);
        const b = Math.round(7 + (171 - 7) * progress);
        return `rgb(${r}, ${g}, ${b})`;
      };

      ScrollTrigger.create({
        trigger: stickySection,
        start: 'top top',
        end: `+=${stickyHeight}px`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          // 1. Logo Blur & Fade Out
          const initialProgress = Math.min(self.progress * 20, 1);
          if (logo) {
            logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
            const logoOpacityProgress =
              self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
            logo.style.opacity = `${1 - logoOpacityProgress}`;
          }

          // 2. Cubes Fade In
          if (cubesContainer) {
            const cubesOpacityProgress =
              self.progress >= 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
            cubesContainer.style.opacity = `${cubesOpacityProgress}`;
          }

          // 3. Header 1: Scale, Blur, Fade Out
          if (header1) {
            const header1Progress = Math.min(self.progress * 2.5, 1);
            header1.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`;
            header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
            header1.style.opacity = `${1 - header1Progress}`;
          }

          // 4. Header 2: Scale, Blur, Fade In
          if (header2) {
            const header2StartProgress = (self.progress - 0.4) * 10;
            const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
            const header2Scale = interpolate(0.75, 1, header2Progress);
            const header2Blur = interpolate(10, 0, header2Progress);

            header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
            header2.style.filter = `blur(${header2Blur}px)`;
            header2.style.opacity = `${header2Progress}`;
          }

          // 5. 3D Cubes Interpolation
          const firstPhaseProgress = Math.min(self.progress * 2, 1);
          const secondPhaseProgress =
            self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

          Object.entries(cubesData).forEach(([cubeClass, data]) => {
            const cube = cubesContainer ? cubesContainer.querySelector(`.${cubeClass}`) : null;
            if (!cube) return;
            const { initial, final } = data;

            const currentTop = interpolate(initial.top, final.top, firstPhaseProgress);
            const currentLeft = interpolate(initial.left, final.left, firstPhaseProgress);
            const currentRotateX = interpolate(initial.rotateX, final.rotateX, firstPhaseProgress);
            const currentRotateY = interpolate(initial.rotateY, final.rotateY, firstPhaseProgress);
            const currentRotateZ = interpolate(initial.rotateZ, final.rotateZ, firstPhaseProgress);
            const currentZ = interpolate(initial.z, final.z, firstPhaseProgress);

            let additionalRotation = 0;
            if (cubeClass === 'cube-2') {
              additionalRotation = interpolate(0, 180, secondPhaseProgress);
            } else if (cubeClass === 'cube-4') {
              additionalRotation = interpolate(0, -180, secondPhaseProgress);
            }

            cube.style.top = `${currentTop}%`;
            cube.style.left = `${currentLeft}%`;
            cube.style.transform = `
              translate3d(-50%, -50%, ${currentZ}px)
              rotateX(${currentRotateX}deg)
              rotateY(${currentRotateY + additionalRotation}deg)
              rotateZ(${currentRotateZ}deg)
            `;
          });

          // 6. Color Changing Transition on Scroll (Between progress 0.65 and 1.0)
          if (self.progress >= 0.65) {
            const colorProgress = (self.progress - 0.65) / 0.35;
            stickySection.style.backgroundColor = interpolateColor(colorProgress);
            if (header2) {
              // Smoothly transition text color toward deep contrast as bg lightens
              const textColorProgress = Math.min(colorProgress * 1.5, 1);
              const tr = Math.round(255 - (255 - 51) * textColorProgress);
              const tg = Math.round(233 - (233 - 23) * textColorProgress);
              const tb = Math.round(217 - (217 - 7) * textColorProgress);
              header2.style.color = `rgb(${tr}, ${tg}, ${tb})`;
            }
          } else {
            stickySection.style.backgroundColor = '#331707';
            if (header2) {
              header2.style.color = '#ffe9d9';
            }
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Pinned Sticky 3D Cubes Section */}
      <section
        ref={stickyRef}
        id="home"
        className="sticky-hero relative w-full h-[100vh] overflow-hidden flex items-center justify-center select-none"
      >
        {/* 42 Geometric 6-Block Logo (Top 25%) */}
        <div ref={logoRef} className="hero-42-logo">
          <div className="hero-42-col">
            <div className="hero-42-block hero-42-block-1" />
            <div className="hero-42-block mt-4" />
          </div>
          <div className="hero-42-col">
            <div className="hero-42-block mb-3" />
            <div className="hero-42-block" />
          </div>
          <div className="hero-42-col">
            <div className="hero-42-block hero-42-block-5" />
            <div className="hero-42-block mt-4" />
          </div>
        </div>

        {/* 3D Cubes Viewport Container */}
        <div ref={cubesRef} className="cubes-viewport" style={{ opacity: 0 }}>
          {[1, 2, 3, 4, 5, 6].map((num, cubeIdx) => {
            const imgStart = cubeIdx * 6;
            return (
              <div key={num} className={`cube-3d cube-${num}`}>
                <div className="face-front">
                  <img src={CUBE_IMAGES[imgStart]} alt={`Face 1`} />
                </div>
                <div className="face-back">
                  <img src={CUBE_IMAGES[imgStart + 1]} alt={`Face 2`} />
                </div>
                <div className="face-right">
                  <img src={CUBE_IMAGES[imgStart + 2]} alt={`Face 3`} />
                </div>
                <div className="face-left">
                  <img src={CUBE_IMAGES[imgStart + 3]} alt={`Face 4`} />
                </div>
                <div className="face-top">
                  <img src={CUBE_IMAGES[imgStart + 4]} alt={`Face 5`} />
                </div>
                <div className="face-bottom">
                  <img src={CUBE_IMAGES[imgStart + 5]} alt={`Face 6`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Header 1 (Initial Hero Statement) */}
        <div
          ref={header1Ref}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[75%] md:w-[65%] text-center z-10 pointer-events-none"
        >
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#cdb9ab] uppercase mb-4">
            SQUAT FITNESS // ATHLETIC TELEMETRY
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight text-[#ffe9d9] font-sans">
            The premier performance ecosystem crafted for the disciplined generation.
          </h1>
        </div>

        {/* Header 2 (Reveals in Phase 2 in the Center) */}
        <div
          ref={header2Ref}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[60%] md:w-[45%] text-center z-20 pointer-events-none opacity-0"
          style={{ filter: 'blur(10px)', transform: 'translate(-50%, -50%) scale(0.75)' }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal tracking-tight mb-4 font-sans leading-tight">
            Where discipline meets precision.
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed opacity-90 max-w-xl mx-auto">
            Squat Fitness unites strength science, progressive overload, and intelligent metabolic telemetry, collaborating seamlessly to transform potential into enduring power.
          </p>
        </div>
      </section>
    </div>
  );
}

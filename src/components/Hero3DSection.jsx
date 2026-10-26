import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cubesData } from '../data/cubesData';
import ArchLogo from './ArchLogo';

gsap.registerPlugin(ScrollTrigger);

// 36 High-Energy Fitness Images for the 6 Cubes x 6 Faces
const CUBE_IMAGES = [
  '/img/cubes/strength.jpg', '/img/cubes/fit1.jpg', '/img/cubes/cardio.jpg', '/img/cubes/fit2.jpg', '/img/cubes/hiit.jpg', '/img/cubes/fit3.jpg',
  '/img/cubes/fit4.jpg', '/img/cubes/yoga.jpg', '/img/cubes/fit5.jpg', '/img/cubes/fitness-hero.jpg', '/img/cubes/fit6.jpg', '/img/cubes/fit7.jpg',
  '/img/cubes/fit8.jpg', '/img/cubes/fit9.jpg', '/img/cubes/fit10.jpg', '/img/cubes/fit11.jpg', '/img/cubes/fit12.jpg', '/img/cubes/fitness-outro.jpg',
  '/img/cubes/fit1.jpg', '/img/cubes/strength.jpg', '/img/cubes/fit3.jpg', '/img/cubes/hiit.jpg', '/img/cubes/fit5.jpg', '/img/cubes/cardio.jpg',
  '/img/cubes/fit7.jpg', '/img/cubes/yoga.jpg', '/img/cubes/fit9.jpg', '/img/cubes/fitness-hero.jpg', '/img/cubes/fit11.jpg', '/img/cubes/fitness-outro.jpg',
  '/img/cubes/fit2.jpg', '/img/cubes/fit4.jpg', '/img/cubes/fit6.jpg', '/img/cubes/fit8.jpg', '/img/cubes/fit10.jpg', '/img/cubes/fit12.jpg',
];

export default function Hero3DSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const logoRef = useRef(null);
  const cubesRef = useRef(null);
  const header1Ref = useRef(null);
  const header2Ref = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stickySection = stickyRef.current;
      const logo = logoRef.current;
      const cubesContainer = cubesRef.current;
      const header1 = header1Ref.current;
      const header2 = header2Ref.current;
      const arrow = arrowRef.current;

      const stickyHeight = window.innerHeight * 4;

      const interpolate = (start, end, progress) => {
        return start + (end - start) * progress;
      };

      // Helper for color interpolation (from forest green #1D2B04 to clean pure white #FFFFFF)
      // #1D2B04 is rgb(29, 43, 4)
      // #FFFFFF is rgb(255, 255, 255)
      const interpolateColor = (progress) => {
        const r = Math.round(29 + (255 - 29) * progress);
        const g = Math.round(43 + (255 - 43) * progress);
        const b = Math.round(4 + (255 - 4) * progress);
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
          // 1. Logo & Arrow Blur & Fade Out
          const initialProgress = Math.min(self.progress * 20, 1);
          if (logo) {
            logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
            const logoOpacityProgress =
              self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
            logo.style.opacity = `${1 - logoOpacityProgress}`;
          }
          if (arrow) {
            arrow.style.opacity = `${Math.max(0, 1 - self.progress * 20)}`;
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
            header1.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.4, header1Progress)})`;
            header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
            header1.style.opacity = `${1 - header1Progress}`;
          }

          // 4. Header 2: Scale, Blur, Fade In (Compact, perfectly centered inside the arch)
          if (header2) {
            const header2StartProgress = (self.progress - 0.4) * 10;
            const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
            const header2Scale = interpolate(0.8, 1, header2Progress);
            const header2Blur = interpolate(10, 0, header2Progress);

            header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
            header2.style.filter = `blur(${header2Blur}px)`;
            header2.style.opacity = `${header2Progress}`;
          }

          // 5. 3D Cubes Interpolation into the Proper Arch
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

          // 6. Smooth Transition to White Background (progress 0.65 to 1.0)
          if (self.progress >= 0.65) {
            const colorProgress = (self.progress - 0.65) / 0.35;
            stickySection.style.backgroundColor = interpolateColor(colorProgress);
            if (header2) {
              // Transition text color from mint white #E5FBD4 to dark charcoal #111827
              const textColorProgress = Math.min(colorProgress * 1.5, 1);
              const tr = Math.round(229 - (229 - 17) * textColorProgress);
              const tg = Math.round(251 - (251 - 24) * textColorProgress);
              const tb = Math.round(212 - (212 - 39) * textColorProgress);
              header2.style.color = `rgb(${tr}, ${tg}, ${tb})`;
            }
          } else {
            stickySection.style.backgroundColor = '#1D2B04';
            if (header2) {
              header2.style.color = '#E5FBD4';
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
        className="sticky-hero relative w-full h-[100vh] overflow-hidden flex items-center justify-center select-none bg-[#1D2B04] text-[#E5FBD4]"
      >
        {/* Exact Geometric Arch Logo (Top 26%, Scaled Down & Centered) */}
        <div
          ref={logoRef}
          className="absolute top-[26%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <ArchLogo className="w-20 sm:w-24 md:w-28 h-auto text-[#E5FBD4]" />
        </div>

        {/* 3D Cubes Viewport Container (150px Sized Cubes Framing Center) */}
        <div ref={cubesRef} className="cubes-viewport" style={{ opacity: 0 }}>
          {[1, 2, 3, 4, 5, 6].map((num, cubeIdx) => {
            const imgStart = cubeIdx * 6;
            return (
              <div key={num} className={`cube-3d cube-${num}`}>
                <div className="face-front">
                  <img src={CUBE_IMAGES[imgStart]} alt="Fitness 1" />
                </div>
                <div className="face-back">
                  <img src={CUBE_IMAGES[imgStart + 1]} alt="Fitness 2" />
                </div>
                <div className="face-right">
                  <img src={CUBE_IMAGES[imgStart + 2]} alt="Fitness 3" />
                </div>
                <div className="face-left">
                  <img src={CUBE_IMAGES[imgStart + 3]} alt="Fitness 4" />
                </div>
                <div className="face-top">
                  <img src={CUBE_IMAGES[imgStart + 4]} alt="Fitness 5" />
                </div>
                <div className="face-bottom">
                  <img src={CUBE_IMAGES[imgStart + 5]} alt="Fitness 6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Header 1 (Initial Statement: Clean, Centered, Proportional) */}
        <div
          ref={header1Ref}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[75%] md:w-[60%] max-w-2xl text-center z-10 pointer-events-none"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] tracking-tight text-[#E5FBD4] font-sans">
            The first performance company built for the disciplined generation.
          </h1>
        </div>

        {/* Header 2 (Phase 2 Statement: Compact, Perfectly Centered, Zero Overlap with Cubes) */}
        <div
          ref={header2Ref}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[88%] sm:w-[420px] max-w-md text-center z-20 pointer-events-none opacity-0"
          style={{ filter: 'blur(10px)', transform: 'translate(-50%, -50%) scale(0.8)' }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight mb-2.5 font-sans leading-snug">
            We've engineered the ultimate protocols for lasting strength.
          </h2>
          <p className="text-xs sm:text-sm font-light leading-relaxed opacity-85 mx-auto">
            Squat Fitness unites strength science, progressive overload, and intelligent metabolic telemetry—collaborating seamlessly to deliver tailored regimens that drive human performance.
          </p>
        </div>

        {/* Bottom Scroll Down Arrow */}
        <div
          ref={arrowRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xl text-[#E5FBD4] animate-bounce pointer-events-none font-light"
        >
          ↓
        </div>
      </section>
    </div>
  );
}

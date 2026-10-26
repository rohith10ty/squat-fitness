import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cubesData } from '../data/cubesData';

gsap.registerPlugin(ScrollTrigger);

// 36 dynamic cube face images (fitness high quality)
const CUBE_IMAGES = [
  '/img/cubes/cardio.jpg',
  '/img/cubes/fit1.jpg',
  '/img/cubes/fit2.jpg',
  '/img/cubes/fit3.jpg',
  '/img/cubes/strength.jpg',
  '/img/cubes/fit4.jpg',
  '/img/cubes/fit5.jpg',
  '/img/cubes/yoga.jpg',
  '/img/cubes/fit6.jpg',
  '/img/cubes/fit7.jpg',
  '/img/cubes/hiit.jpg',
  '/img/cubes/fit8.jpg',
  '/img/cubes/fit9.jpg',
  '/img/cubes/fitness-hero.jpg',
  '/img/cubes/fit10.jpg',
  '/img/cubes/fit11.jpg',
  '/img/cubes/fit12.jpg',
  '/img/cubes/breakfast.jpg',
  '/img/cubes/fit1.jpg',
  '/img/cubes/lunch.jpg',
  '/img/cubes/fit2.jpg',
  '/img/cubes/dinner.jpg',
  '/img/cubes/fit3.jpg',
  '/img/cubes/fitness-outro.jpg',
  '/img/cubes/snack.jpg',
  '/img/cubes/fit4.jpg',
  '/img/cubes/fit5.jpg',
  '/img/cubes/fit6.jpg',
  '/img/cubes/cardio.jpg',
  '/img/cubes/fit7.jpg',
  '/img/cubes/fit8.jpg',
  '/img/cubes/strength.jpg',
  '/img/cubes/fit9.jpg',
  '/img/cubes/fit10.jpg',
  '/img/cubes/fit11.jpg',
  '/img/cubes/fit12.jpg',
];

export default function Hero3DSection() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const openerGroupRef = useRef(null);
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

      // Set initial styles for cubes (deep in space, opacity 0)
      if (cubesContainer) {
        cubesContainer.style.opacity = '0';
        Object.entries(cubesData).forEach(([cubeClass, data]) => {
          const cube = cubesContainer.querySelector(`.${cubeClass}`);
          if (!cube) return;
          const { initial } = data;
          cube.style.top = `${initial.top}%`;
          cube.style.left = `${initial.left}%`;
          cube.style.transform = `
            translate3d(-50%, -50%, ${initial.z}px)
            rotateX(${initial.rotateX}deg)
            rotateY(${initial.rotateY}deg)
            rotateZ(${initial.rotateZ}deg)
          `;
        });
      }

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
          if (logo) logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;

          const logoOpacityProgress =
            self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
          if (logo) logo.style.opacity = `${1 - logoOpacityProgress}`;

          // 2. Cubes Container Fade In (starts only after scroll begins)
          const cubesOpacityProgress =
            self.progress >= 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
          if (cubesContainer) cubesContainer.style.opacity = `${cubesOpacityProgress}`;

          // 3. Header 1 (The first performance company...) Scale & Blur Out
          const header1Progress = Math.min(self.progress * 2.5, 1);
          if (header1) {
            header1.style.transform = `scale(${interpolate(1, 1.5, header1Progress)})`;
            header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
            header1.style.opacity = `${1 - header1Progress}`;
          }

          // 4. Arrow Fade Out
          if (arrow) {
            arrow.style.opacity = `${Math.max(0, 1 - self.progress * 8)}`;
          }

          // 5. Header 2 Fade In & Unblur (starts at progress 0.4)
          const header2StartProgress = (self.progress - 0.4) * 10;
          const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
          const header2Scale = interpolate(0.75, 1, header2Progress);
          const header2Blur = interpolate(10, 0, header2Progress);

          if (header2) {
            header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
            header2.style.filter = `blur(${header2Blur}px)`;
            header2.style.opacity = `${header2Progress}`;
          }

          // 6. 3D Cubes Interpolation into the Exact Arch from Reference 42
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
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Pinned Sticky 3D Cubes Section in Luxury Cream / Beige */}
      <section
        ref={stickyRef}
        id="home"
        className="sticky-hero relative w-full h-[100vh] overflow-hidden flex items-center justify-center select-none bg-[#F5F1E8] text-[#1E1B18]"
      >
        {/* Opener Group: Enlarged Arch Logo & Headline Centered Together as One Unit */}
        <div
          ref={openerGroupRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[72%] max-w-4xl flex flex-col items-center justify-center text-center pointer-events-none select-none z-10"
        >
          {/* Enlarged 6-Block Geometric Arch Logo Centered Right Above the Headline */}
          <div ref={logoRef} className="hero-logo mb-8 sm:mb-10 transition-all">
            <div className="hero-col">
              <div className="hero-block hero-block-1" />
              <div className="hero-block hero-block-2" />
            </div>
            <div className="hero-col">
              <div className="hero-block hero-block-3" />
              <div className="hero-block hero-block-4" />
            </div>
            <div className="hero-col">
              <div className="hero-block hero-block-5" />
              <div className="hero-block hero-block-6" />
            </div>
          </div>

          {/* Header 1 Headline Centered with the Arch Logo */}
          <div ref={header1Ref} className="w-full">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-[#1E1B18] font-sans">
              The first performance company built for the disciplined generation.
            </h1>
          </div>
        </div>

        {/* 3D Cubes Viewport Container (Hidden Initially with Opacity 0) */}
        <div ref={cubesRef} className="cubes-viewport" style={{ opacity: 0 }}>
          {[1, 2, 3, 4, 5, 6].map((num, cubeIdx) => {
            const imgStart = cubeIdx * 6;
            return (
              <div key={num} className={`cube-3d cube-${num}`}>
                <div className="face-front">
                  <img src={CUBE_IMAGES[imgStart % CUBE_IMAGES.length]} alt="Fitness 1" />
                </div>
                <div className="face-back">
                  <img src={CUBE_IMAGES[(imgStart + 1) % CUBE_IMAGES.length]} alt="Fitness 2" />
                </div>
                <div className="face-right">
                  <img src={CUBE_IMAGES[(imgStart + 2) % CUBE_IMAGES.length]} alt="Fitness 3" />
                </div>
                <div className="face-left">
                  <img src={CUBE_IMAGES[(imgStart + 3) % CUBE_IMAGES.length]} alt="Fitness 4" />
                </div>
                <div className="face-top">
                  <img src={CUBE_IMAGES[(imgStart + 4) % CUBE_IMAGES.length]} alt="Fitness 5" />
                </div>
                <div className="face-bottom">
                  <img src={CUBE_IMAGES[(imgStart + 5) % CUBE_IMAGES.length]} alt="Fitness 6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Header 2 (Phase 2 Statement: Sized at 32% Width Centered Inside Cubes Arch) */}
        <div
          ref={header2Ref}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[86%] sm:w-[460px] md:w-[500px] max-w-xl text-center z-20 pointer-events-none opacity-0 select-none"
          style={{ filter: 'blur(10px)', transform: 'translate(-50%, -50%) scale(0.75)' }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-3 font-sans leading-snug text-[#1E1B18]">
            We've engineered the ultimate protocols for lasting strength.
          </h2>
          <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed mx-auto text-[#6A6055]">
            Squat Fitness unites strength science, progressive overload, and intelligent metabolic telemetry—collaborating seamlessly to deliver tailored regimens that drive human performance.
          </p>
        </div>

        {/* Bottom Scroll Down Arrow */}
        <div
          ref={arrowRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xl text-[#1E1B18]/60 animate-bounce pointer-events-none font-light"
        >
          ↓
        </div>
      </section>
    </div>
  );
}

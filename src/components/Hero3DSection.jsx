import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cubesData } from '../data/cubesData';

gsap.registerPlugin(ScrollTrigger);

// 36 cube face images using original Reference 42 crisp textures
const CUBE_IMAGES = Array.from({ length: 36 }, (_, i) => `/assets/img${(i % 33) + 1}.jpeg`);

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

      // Set initial state: cubes container 100% hidden at scroll = 0
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
          // At the very top, ensure clean initial state
          if (self.progress <= 0.002) {
            if (cubesContainer) cubesContainer.style.opacity = '0';
            if (logo) {
              logo.style.filter = 'blur(0px)';
              logo.style.opacity = '1';
            }
            if (header1) {
              header1.style.transform = 'translate(-50%, -50%) scale(1)';
              header1.style.filter = 'blur(0px)';
              header1.style.opacity = '1';
            }
            if (header2) {
              header2.style.opacity = '0';
              header2.style.filter = 'blur(10px)';
            }
            if (arrow) arrow.style.opacity = '1';
            return;
          }

          // 1. Logo Blur & Fade Out (Reference 42 exact formula)
          const initialProgress = Math.min(self.progress * 20, 1);
          if (logo) {
            logo.style.filter = `blur(${interpolate(0, 20, initialProgress)}px)`;
            const logoOpacityProgress =
              self.progress >= 0.02 ? Math.min((self.progress - 0.02) * 100, 1) : 0;
            logo.style.opacity = `${1 - logoOpacityProgress}`;
          }

          // 2. Cubes Opacity (Reference 42 exact formula)
          const cubesOpacityProgress =
            self.progress >= 0.01 ? Math.min((self.progress - 0.01) * 100, 1) : 0;
          if (cubesContainer) {
            cubesContainer.style.opacity = `${cubesOpacityProgress}`;
          }

          // 3. Header 1 Scale & Blur Out (Reference 42 exact formula)
          const header1Progress = Math.min(self.progress * 2.5, 1);
          if (header1) {
            header1.style.transform = `translate(-50%, -50%) scale(${interpolate(1, 1.5, header1Progress)})`;
            header1.style.filter = `blur(${interpolate(0, 20, header1Progress)}px)`;
            header1.style.opacity = `${1 - header1Progress}`;
          }

          // 4. Arrow Fade Out
          if (arrow) {
            arrow.style.opacity = `${Math.max(0, 1 - self.progress * 8)}`;
          }

          // 5. Header 2 Fade In & Unblur (Reference 42 exact formula)
          const header2StartProgress = (self.progress - 0.4) * 10;
          const header2Progress = Math.max(0, Math.min(header2StartProgress, 1));
          const header2Scale = interpolate(0.75, 1, header2Progress);
          const header2Blur = interpolate(10, 0, header2Progress);

          if (header2) {
            header2.style.transform = `translate(-50%, -50%) scale(${header2Scale})`;
            header2.style.filter = `blur(${header2Blur}px)`;
            header2.style.opacity = `${header2Progress}`;
          }

          // 6. 3D Perspective Cubes Interpolation (Reference 42 exact formula)
          const firstPhaseProgress = Math.min(self.progress * 2, 1);
          const secondPhaseProgress =
            self.progress >= 0.5 ? (self.progress - 0.5) * 2 : 0;

          Object.entries(cubesData).forEach(([cubeClass, data]) => {
            const cube = cubesContainer ? cubesContainer.querySelector(`.${cubeClass}`) : null;
            if (!cube) return;
            const { initial, final } = data;

            // Responsive final coordinates: on mobile/tablets, push cubes outward to cleanly frame Header 2
            const isMobile = window.innerWidth <= 768;
            let targetFinalTop = final.top;
            let targetFinalLeft = final.left;

            if (isMobile) {
              const mobileCoords = {
                'cube-1': { top: 50, left: 13 },
                'cube-2': { top: 78, left: 14 },
                'cube-3': { top: 22, left: 14 },
                'cube-4': { top: 78, left: 86 },
                'cube-5': { top: 22, left: 86 },
                'cube-6': { top: 50, left: 87 },
              };
              if (mobileCoords[cubeClass]) {
                targetFinalTop = mobileCoords[cubeClass].top;
                targetFinalLeft = mobileCoords[cubeClass].left;
              }
            }

            const currentTop = interpolate(initial.top, targetFinalTop, firstPhaseProgress);
            const currentLeft = interpolate(initial.left, targetFinalLeft, firstPhaseProgress);
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
      <section
        ref={stickyRef}
        id="home"
        className="hero-sticky relative w-full h-[100vh] overflow-hidden flex items-center justify-center select-none bg-[#F5F1E8] text-[#1E1B18]"
      >
        {/* Centered Arch Logo */}
        <div ref={logoRef} className="hero-logo">
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

        {/* 3D Cubes Viewport Container: True 3D perspective fly-in */}
        <div ref={cubesRef} className="cubes" style={{ opacity: 0 }}>
          {[1, 2, 3, 4, 5, 6].map((num, cubeIdx) => {
            const imgStart = cubeIdx * 6;
            return (
              <div key={num} className={`cube cube-${num}`}>
                <div className="front">
                  <img src={CUBE_IMAGES[imgStart % CUBE_IMAGES.length]} alt="Cube Face Front" />
                </div>
                <div className="back">
                  <img src={CUBE_IMAGES[(imgStart + 1) % CUBE_IMAGES.length]} alt="Cube Face Back" />
                </div>
                <div className="right">
                  <img src={CUBE_IMAGES[(imgStart + 2) % CUBE_IMAGES.length]} alt="Cube Face Right" />
                </div>
                <div className="left">
                  <img src={CUBE_IMAGES[(imgStart + 3) % CUBE_IMAGES.length]} alt="Cube Face Left" />
                </div>
                <div className="top">
                  <img src={CUBE_IMAGES[(imgStart + 4) % CUBE_IMAGES.length]} alt="Cube Face Top" />
                </div>
                <div className="bottom">
                  <img src={CUBE_IMAGES[(imgStart + 5) % CUBE_IMAGES.length]} alt="Cube Face Bottom" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Header 1 (Disciplined generation headline) Centered below Arch */}
        <div ref={header1Ref} className="hero-header-1">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-[#1E1B18] font-sans">
            The first performance company built for the disciplined generation.
          </h1>
        </div>

        {/* Header 2 (Phase 2 Statement Centered Inside Cubes Arch) */}
        <div ref={header2Ref} className="hero-header-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight mb-3 font-sans leading-snug text-[#1E1B18]">
            Where innovation meets precision.
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

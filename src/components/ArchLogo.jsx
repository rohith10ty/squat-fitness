import React from 'react';

/**
 * Geometric 6-block Arch Logo matching the exact reference geometry from Sample 42:
 * 3 base squares on a uniform baseline, 2 angled diamond blocks at 45°/-45°,
 * and 1 top-center keystone square, creating a symmetric arch with an open portal.
 */
export default function ArchLogo({ className = 'w-36 h-auto', color = 'currentColor' }) {
  return (
    <svg
      viewBox="0 0 247.2 151.6"
      className={className}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Squat Fitness Arch Logo"
    >
      {/* 1. Left bottom square */}
      <rect x="0" y="95.598" width="56" height="56" />

      {/* 2. Left angled diamond block (rotated 45°) */}
      <polygon points="56,95.598 95.598,56 56,16.402 16.402,56" />

      {/* 3. Top-center keystone square */}
      <rect x="95.598" y="0" width="56" height="56" />

      {/* 4. Right angled diamond block (rotated -45°) */}
      <polygon points="151.598,56 191.196,95.598 230.794,56 191.196,16.402" />

      {/* 5. Right bottom square */}
      <rect x="191.196" y="95.598" width="56" height="56" />

      {/* 6. Center bottom pedestal square */}
      <rect x="95.598" y="95.598" width="56" height="56" />
    </svg>
  );
}

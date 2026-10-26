import React from 'react';
import ArchLogo from './ArchLogo';

export default function Logo({ size = 'md', showText = true, className = '', color = 'currentColor' }) {
  const iconSizes = {
    sm: 'w-6 h-auto',
    md: 'w-8 h-auto',
    lg: 'w-10 h-auto',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ArchLogo className={`${iconSizes[size]} shrink-0`} color={color} />
      {showText && (
        <span className="text-base font-bold tracking-tight leading-tight font-sans">
          Squat Fitness
        </span>
      )}
    </div>
  );
}

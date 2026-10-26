import React from 'react';
import ArchLogo from './ArchLogo';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const iconSizes = {
    sm: 'w-6 h-auto',
    md: 'w-8 h-auto',
    lg: 'w-10 h-auto',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <ArchLogo className={`${iconSizes[size]} text-[#1E1B18] shrink-0`} />
      {showText && (
        <span className="text-base font-bold tracking-tight text-[#1E1B18] leading-tight font-sans">
          Squat Fitness
        </span>
      )}
    </div>
  );
}

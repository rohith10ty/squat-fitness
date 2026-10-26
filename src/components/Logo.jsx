import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 6-Block Arch Icon */}
      <div className={`${iconSizes[size]} flex items-end justify-center gap-1 shrink-0`}>
        <div className="flex flex-col justify-end">
          <div className="w-2 h-2 bg-[#E5FBD4] origin-bottom-right rotate-[42deg]" />
          <div className="w-2 h-2 bg-[#E5FBD4] mt-1" />
        </div>
        <div className="flex flex-col justify-end gap-1">
          <div className="w-2 h-2 bg-[#E5FBD4]" />
          <div className="w-2 h-2 bg-[#E5FBD4]" />
        </div>
        <div className="flex flex-col justify-end">
          <div className="w-2 h-2 bg-[#E5FBD4] origin-bottom-left -rotate-[42deg]" />
          <div className="w-2 h-2 bg-[#E5FBD4] mt-1" />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-base font-semibold tracking-tight text-[#E5FBD4] leading-tight font-sans">
            Squat Fitness
          </span>
        </div>
      )}
    </div>
  );
}

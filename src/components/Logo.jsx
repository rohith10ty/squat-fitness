import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Iconic Barbell Squat Crest in Luxury 42 Palette */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#401e0c] to-[#261005] border border-[rgba(255,233,217,0.22)] shadow-md shadow-black/60 group-hover:border-[#ffe9d9] transition-all duration-300 shrink-0 overflow-hidden`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Outer angled barbell plates */}
          <rect x="5" y="11" width="3.5" height="18" rx="1.5" fill="#ffe9d9" />
          <rect x="10" y="14" width="2" height="12" rx="1" fill="#cdb9ab" />
          
          {/* Main barbell shaft */}
          <path d="M7 20H33" stroke="#cdb9ab" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right angled barbell plates */}
          <rect x="28" y="14" width="2" height="12" rx="1" fill="#cdb9ab" />
          <rect x="31.5" y="11" width="3.5" height="18" rx="1.5" fill="#ffe9d9" />

          {/* Central Bold Kinetic 'S' in Warm Champagne */}
          <path
            d="M24 13.5H16.5C15.1 13.5 14 14.6 14 16C14 17.4 15.1 18.5 16.5 18.5H23.5C24.9 18.5 26 19.6 26 21C26 22.4 24.9 23.5 23.5 23.5H16"
            stroke="#ffe9d9"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Kinetic Energy Sparks in Copper Gold */}
          <circle cx="20" cy="8" r="1.5" fill="#f3a675" />
          <circle cx="20" cy="32" r="1.5" fill="#f3a675" />
        </svg>

        {/* Ambient warm glow inside */}
        <div className="absolute inset-0 bg-[#ffe9d9]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-sm font-black tracking-wider text-[#ffe9d9] leading-none font-sans uppercase">
            SQUAT
          </span>
          <span className="text-[8.5px] font-mono tracking-[0.22em] text-[#f3a675] uppercase leading-none mt-1 font-bold">
            FITNESS
          </span>
        </div>
      )}
    </div>
  );
}

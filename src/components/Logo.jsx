import React from 'react';

export default function Logo({ size = 'md', showText = true, className = '' }) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Iconic Barbell Squat Crest */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#242424] to-[#161616] border border-[#333333] shadow-md shadow-black/60 group-hover:border-[#ccff00] transition-all duration-300 shrink-0 overflow-hidden`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
        >
          {/* Outer angled barbell plates */}
          <rect x="5" y="11" width="3.5" height="18" rx="1.5" fill="#ffffff" />
          <rect x="10" y="14" width="2" height="12" rx="1" fill="#71717a" />
          
          {/* Main barbell shaft */}
          <path d="M7 20H33" stroke="#a1a1aa" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right angled barbell plates */}
          <rect x="28" y="14" width="2" height="12" rx="1" fill="#71717a" />
          <rect x="31.5" y="11" width="3.5" height="18" rx="1.5" fill="#ffffff" />

          {/* Central Bold Kinetic 'S' in Volt Lime */}
          <path
            d="M24 13.5H16.5C15.1 13.5 14 14.6 14 16C14 17.4 15.1 18.5 16.5 18.5H23.5C24.9 18.5 26 19.6 26 21C26 22.4 24.9 23.5 23.5 23.5H16"
            stroke="#ccff00"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Kinetic Energy Dots */}
          <circle cx="20" cy="8" r="1.5" fill="#ccff00" />
          <circle cx="20" cy="32" r="1.5" fill="#ccff00" />
        </svg>

        {/* Ambient volt glow inside */}
        <div className="absolute inset-0 bg-[#ccff00]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="text-sm font-black tracking-wider text-white leading-none font-sans uppercase">
            SQUAT
          </span>
          <span className="text-[8.5px] font-mono tracking-[0.22em] text-[#ccff00] uppercase leading-none mt-1 font-bold">
            FITNESS
          </span>
        </div>
      )}
    </div>
  );
}

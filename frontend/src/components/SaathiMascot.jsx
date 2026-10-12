import React from 'react';

export default function SaathiMascot({ mood = 'happy', size = 80, waving = true }) {
  return (
    <div className="relative inline-flex items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-md ${waving ? 'animate-bounce-gentle' : ''}`}
      >
        {/* Antenna */}
        <line x1="50" y1="20" x2="50" y2="8" stroke="#37474F" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="7" r="5" fill="#FF7043" className="animate-pulse" />

        {/* Head/Body - Friendly Sky Blue Robot */}
        <rect
          x="15"
          y="20"
          width="70"
          height="62"
          rx="31"
          fill="#4FC3F7"
          stroke="#29B6F6"
          strokeWidth="2.5"
        />

        {/* Belly/Screen Light */}
        <ellipse cx="50" cy="53" rx="26" ry="22" fill="#E1F5FE" />

        {/* Ears */}
        <circle cx="12" cy="48" r="4.5" fill="#29B6F6" />
        <circle cx="88" cy="48" r="4.5" fill="#29B6F6" />

        {/* Eyes */}
        {mood === 'sleepy' ? (
          <>
            <path d="M 37 46 Q 42 50 47 46" stroke="#1F2A44" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 53 46 Q 58 50 63 46" stroke="#1F2A44" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'thinking' ? (
          <>
            <circle cx="43" cy="44" r="3.5" fill="#1F2A44" />
            <circle cx="59" cy="44" r="3.5" fill="#1F2A44" />
            <path d="M 39 39 L 47 41" stroke="#1F2A44" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            {/* Happy smiling eyes */}
            <ellipse cx="41" cy="46" rx="4" ry="4.5" fill="#1F2A44" />
            <circle cx="42.5" cy="44" r="1.5" fill="#FFFFFF" />
            
            <ellipse cx="59" cy="46" rx="4" ry="4.5" fill="#1F2A44" />
            <circle cx="60.5" cy="44" r="1.5" fill="#FFFFFF" />

            {/* Cheeks */}
            <circle cx="34" cy="52" r="3" fill="#FF8A80" opacity="0.6" />
            <circle cx="66" cy="52" r="3" fill="#FF8A80" opacity="0.6" />
          </>
        )}

        {/* Mouth */}
        {mood === 'thinking' ? (
          <ellipse cx="50" cy="56" rx="3" ry="2" fill="#1F2A44" />
        ) : (
          <path
            d="M 44 54 Q 50 60 56 54"
            stroke="#1F2A44"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Waving Right Hand */}
        {waving && (
          <g className="origin-bottom-left animate-wave">
            <path
              d="M 82 50 C 93 42, 95 35, 92 33 C 88 31, 84 40, 81 48"
              fill="#4FC3F7"
              stroke="#29B6F6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

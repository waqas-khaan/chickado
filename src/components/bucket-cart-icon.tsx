'use client';

import React, { useId } from 'react';

interface BucketCartIconProps {
  count?: number;
  className?: string;
  size?: number; // size in pixels, default 42
}

export default function BucketCartIcon({
  count = 0,
  className = '',
  size = 44,
}: BucketCartIconProps) {
  const rawId = useId();
  const clipId = `bucketBodyClip_${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  // Format count display (max 99)
  const displayCount = count > 99 ? '99+' : count.toString();
  const fontSize = displayCount.length === 1 ? '22' : displayCount.length === 2 ? '17' : '13';

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}
      style={{ width: size, height: Math.round(size * 1.15) }}
    >
      <svg
        viewBox="0 0 64 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Clip path for the tapered bucket body */}
          <clipPath id={clipId}>
            <path
              d="M 12 24
                 L 17 62
                 C 17 64, 47 64, 47 62
                 L 52 24
                 C 52 22, 12 22, 12 24 Z"
            />
          </clipPath>
        </defs>

        {/* 1. Subtle Floating Shadow Under Bucket */}
        <ellipse
          cx="32"
          cy="70"
          rx="18"
          ry="3.5"
          fill="#D1D5DB"
          opacity="0.8"
        />

        {/* 2. Chicken Drumstick (Poking out of the bucket towards top-right) */}
        <g stroke="#111827" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Drumstick Bone Handle with Two Knob Joints at Top-Right */}
          {/* Bone Shaft */}
          <path
            d="M 33 17 L 42 7"
            fill="none"
          />
          {/* Bone Knobs */}
          <path
            d="M 41.5 5.5 C 41 3.5, 43 2, 45 3 C 47 4, 46.5 6, 45 7 C 46.5 8, 45.5 10, 43.5 9.5 C 42 9, 41.5 7.5, 42 7"
            fill="#FFFFFF"
          />

          {/* Drumstick Meat Body */}
          <path
            d="M 24 24
               C 21 19, 25 14, 30 13.5
               C 34 13, 36 15, 37.5 18
               C 39 20, 37 24, 36 24 Z"
            fill="#FFFFFF"
          />
        </g>

        {/* 3. Bucket Outer Shell (with clipping for red side flanks) */}
        <g clipPath={`url(#${clipId})`}>
          {/* Full White Base */}
          <rect x="10" y="20" width="44" height="46" fill="#FFFFFF" />

          {/* Left Red Flank */}
          <path
            d="M 12 22 L 20 22 L 21 64 L 16 64 Z"
            fill="#E4002B"
          />

          {/* Right Red Flank */}
          <path
            d="M 44 22 L 52 22 L 48 64 L 43 64 Z"
            fill="#E4002B"
          />
        </g>

        {/* 4. Bucket Black Outlines & Rims */}
        {/* Bucket Outline */}
        <path
          d="M 12 24
             L 17 62
             C 17 64.5, 47 64.5, 47 62
             L 52 24"
          fill="none"
          stroke="#111827"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Top Rim Ellipse */}
        <ellipse
          cx="32"
          cy="24"
          rx="20"
          ry="4"
          fill="#FFFFFF"
          stroke="#111827"
          strokeWidth="2.6"
        />

        {/* Interior Rim Line for 3D Opening */}
        <path
          d="M 15 24 C 18 26.5, 46 26.5, 49 24"
          fill="none"
          stroke="#111827"
          strokeWidth="2.2"
        />

        {/* 5. Center Item Count Number */}
        <text
          x="32"
          y="46"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={fontSize}
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          fill="#000000"
          letterSpacing="-0.5px"
          suppressHydrationWarning
        >
          {displayCount}
        </text>
      </svg>
    </div>
  );
}

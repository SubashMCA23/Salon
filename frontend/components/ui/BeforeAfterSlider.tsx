'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  category?: string;
  description?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title,
  category,
  description,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-white border border-luxe-border shadow-subtle p-3.5 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-card w-full">
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden select-none cursor-ew-resize bg-stone-100 touch-pan-y"
      >
        {/* After Image (Full background) */}
        <Image
          src={afterImage}
          alt={`${title} - After`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="relative h-full w-full"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          >
            <Image
              src={beforeImage}
              alt={`${title} - Before`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white shadow-lg z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Badge with touch area */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-luxe-charcoal border-2 border-luxe-gold shadow-gold flex items-center justify-center text-luxe-gold text-[10px] font-bold tracking-tighter">
            ⇄
          </div>
        </div>

        {/* Badges */}
        <span className="absolute top-2.5 left-2.5 bg-luxe-charcoal/85 text-luxe-ivory text-[8px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 z-10 font-semibold backdrop-blur-xs">
          Before
        </span>
        <span className="absolute top-2.5 right-2.5 bg-luxe-gold text-luxe-charcoal text-[8px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 z-10 font-semibold shadow-xs">
          After
        </span>
      </div>

      <div className="mt-3 sm:mt-4">
        {category && (
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
            {category} Transformation
          </span>
        )}
        <h4 className="text-lg sm:text-xl font-serif text-luxe-charcoal mt-0.5 line-clamp-1">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-luxe-muted font-light mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

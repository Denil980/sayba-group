import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { companyInfo } from '../../data/company';

export const LifeAtSaybaCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pillars = companyInfo.lifestylePillars;
  const total = pillars.length;

  // Track window width for responsive 3D card spacing so cards never overlap
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous smooth auto-scroll to the left every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      // Advance forward: cards scroll to the left
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Brief pause on user interaction before resuming auto-scroll
  const handleUserInteraction = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4500);
  };

  const handlePrev = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Responsive non-overlapping horizontal offsets
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  const step1X = isMobile ? 180 : isTablet ? 240 : 295;
  const step2X = isMobile ? 320 : isTablet ? 440 : 560;

  // 3D Perspective Cover Flow: Cards are visible side-by-side with gaps (NO hiding behind)
  const getCardTransform = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Center Active Card
    if (diff === 0) {
      return {
        x: 0,
        z: 0,
        rotateY: 0,
        scale: 1.06,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
      };
    }

    // Step 1 Left (Visible at left, angled inward in 3D, NO overlap)
    if (diff === -1) {
      return {
        x: -step1X,
        z: -60,
        rotateY: 20,
        scale: 0.88,
        zIndex: 20,
        opacity: 0.9,
        filter: 'brightness(0.88)',
        pointerEvents: 'auto' as const,
      };
    }

    // Step 2 Left (Visible further at far left, NO overlap)
    if (diff === -2) {
      return {
        x: -step2X,
        z: -140,
        rotateY: 32,
        scale: 0.74,
        zIndex: 10,
        opacity: 0.5,
        filter: 'brightness(0.7)',
        pointerEvents: 'auto' as const,
      };
    }

    // Step 1 Right (Visible at right, angled inward in 3D, NO overlap)
    if (diff === 1) {
      return {
        x: step1X,
        z: -60,
        rotateY: -20,
        scale: 0.88,
        zIndex: 20,
        opacity: 0.9,
        filter: 'brightness(0.88)',
        pointerEvents: 'auto' as const,
      };
    }

    // Step 2 Right (Visible further at far right, NO overlap)
    if (diff === 2) {
      return {
        x: step2X,
        z: -140,
        rotateY: -32,
        scale: 0.74,
        zIndex: 10,
        opacity: 0.5,
        filter: 'brightness(0.7)',
        pointerEvents: 'auto' as const,
      };
    }

    // Outer Hidden Cards
    return {
      x: diff > 0 ? step2X + 220 : -(step2X + 220),
      z: -260,
      rotateY: diff > 0 ? -45 : 45,
      scale: 0.6,
      zIndex: 0,
      opacity: 0,
      filter: 'brightness(0.5)',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section className="py-20 bg-[#0A1715] text-white relative overflow-hidden border-y border-[#1A2E2A]">
      {/* Decorative ambient background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-brand-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-gold block mb-2">
            LIFE AT SAYBA
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            More Than Homes <br />
            <span className="text-[#DFC995] italic font-normal">We Build Lifestyles</span>
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4" />
        </div>

        {/* 3D Perspective Stage: cards visible side-by-side scrolling smoothly to the left */}
        <div
          className="relative h-[410px] sm:h-[450px] flex items-center justify-center select-none"
          style={{ perspective: '1200px' }}
        >
          {pillars.map((item, index) => {
            const transform = getCardTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.title}
                animate={transform}
                transition={{
                  type: 'spring',
                  stiffness: 75,
                  damping: 17,
                  mass: 0.85,
                }}
                onClick={() => {
                  handleUserInteraction();
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-[230px] sm:w-[260px] md:w-[270px] h-[340px] sm:h-[380px] md:h-[400px] rounded-[28px] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 ${
                  isActive
                    ? 'border-2 border-[#DFCA95] ring-4 ring-brand-gold/25 shadow-[0_25px_60px_rgba(0,0,0,0.65)]'
                    : 'border border-white/10'
                }`}
                style={{
                  transformOrigin: 'center center',
                  transformStyle: 'preserve-3d',
                  zIndex: transform.zIndex,
                }}
              >
                {/* Full-bleed Pillar Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Bottom Card Content */}
                <div className="absolute bottom-5 inset-x-5 z-10 text-white">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight drop-shadow-md mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-sans line-clamp-3 leading-relaxed drop-shadow">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 max-w-3xl mx-auto px-4">
          {/* Left Counter */}
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl sm:text-2xl font-bold text-brand-gold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
              | {String(total).padStart(2, '0')} Lifestyle Pillars
            </span>
          </div>

          {/* Center Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous lifestyle pillar"
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next lifestyle pillar"
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white hover:bg-brand-gold hover:text-brand-dark flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Capsule Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {pillars.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  handleUserInteraction();
                  setActiveIndex(dotIdx);
                }}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === activeIndex
                    ? 'w-6 h-1.5 bg-gradient-to-r from-[#DFCA95] to-[#B59353]'
                    : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

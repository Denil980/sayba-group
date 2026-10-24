import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';
import { useModal } from '../../context/ModalContext';

export const VideoTestimonialsSection: React.FC = () => {
  const { openVideo } = useModal();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = testimonialsData.length;

  // Seamless auto-scroll: advances every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Brief pause on manual interaction, then resumes automatically
  const handleUserInteraction = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000);
  };

  const handlePrev = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    handleUserInteraction();
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Circular calculation for smooth 3D carousel positioning
  const getCardTransform = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Center card (active)
    if (diff === 0) {
      return {
        x: 0,
        rotate: 0,
        scale: 1.04,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
      };
    }

    // 1 step left
    if (diff === -1) {
      return {
        x: -145,
        rotate: -6.5,
        scale: 0.9,
        zIndex: 20,
        opacity: 0.88,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto' as const,
      };
    }

    // 2 steps left
    if (diff === -2) {
      return {
        x: -265,
        rotate: -12.5,
        scale: 0.8,
        zIndex: 10,
        opacity: 0.55,
        filter: 'brightness(0.7)',
        pointerEvents: 'auto' as const,
      };
    }

    // 1 step right
    if (diff === 1) {
      return {
        x: 145,
        rotate: 6.5,
        scale: 0.9,
        zIndex: 20,
        opacity: 0.88,
        filter: 'brightness(0.85)',
        pointerEvents: 'auto' as const,
      };
    }

    // 2 steps right
    if (diff === 2) {
      return {
        x: 265,
        rotate: 12.5,
        scale: 0.8,
        zIndex: 10,
        opacity: 0.55,
        filter: 'brightness(0.7)',
        pointerEvents: 'auto' as const,
      };
    }

    // Hidden outer cards
    return {
      x: diff > 0 ? 380 : -380,
      rotate: diff > 0 ? 16 : -16,
      scale: 0.68,
      zIndex: 0,
      opacity: 0,
      filter: 'brightness(0.5)',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF7F2] border-t border-[#E5DFD1] overflow-hidden relative">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-gold/6 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-gold-dark block mb-2">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">
            Real Stories, Real Happiness
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-2.5 font-normal">
            Watch authentic video experiences directly from families who made Sayba Group their lifelong home.
          </p>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-3.5" />
        </div>

        {/* 3D Fanned Card Deck Container (Compact, reduced height & width) */}
        <div className="relative h-[370px] sm:h-[410px] flex items-center justify-center select-none">
          {testimonialsData.map((item, index) => {
            const transform = getCardTransform(index);
            const isActive = index === activeIndex;

            return (
              <motion.div
                key={item.id}
                animate={transform}
                transition={{
                  type: 'spring',
                  stiffness: 85,
                  damping: 18,
                  mass: 0.85,
                }}
                onClick={() => {
                  handleUserInteraction();
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-[220px] sm:w-[250px] md:w-[260px] h-[330px] sm:h-[370px] md:h-[390px] rounded-[26px] overflow-hidden cursor-pointer shadow-xl transition-shadow duration-500 ${
                  isActive
                    ? 'border-2 border-[#DFCA95] ring-4 ring-brand-gold/25 shadow-[0_20px_50px_rgba(0,0,0,0.35)]'
                    : 'border border-black/10'
                }`}
                style={{
                  transformOrigin: 'bottom center',
                  zIndex: transform.zIndex,
                }}
              >
                {/* Full-bleed Video Frame Thumbnail */}
                <img
                  src={item.videoThumbnail}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                {/* Film grain vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

                {/* Top Bar (Clean Location & Duration) */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  {/* Left Location Pill */}
                  <div className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-white/90 flex items-center gap-1 shadow-md">
                    <MapPin className="w-2.5 h-2.5 text-brand-gold" />
                    <span className="uppercase tracking-wider truncate max-w-[120px]">
                      {item.location || item.projectName}
                    </span>
                  </div>

                  {/* Video Duration Badge */}
                  {item.duration && (
                    <div className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-sm text-[9px] font-medium text-white/90 flex items-center gap-1 border border-white/10 shadow-md">
                      <Volume2 className="w-2.5 h-2.5 text-brand-gold" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>

                {/* Middle Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserInteraction();
                      openVideo(`${item.name} — Customer Video Story (${item.projectName})`);
                    }}
                    className={`pointer-events-auto rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl group ${
                      isActive
                        ? 'w-13 h-13 sm:w-14 sm:h-14 bg-white/95 hover:bg-white text-brand-dark hover:scale-110 border-2 border-brand-gold ring-4 ring-black/40'
                        : 'w-10 h-10 bg-black/50 text-white/80 border border-white/20'
                    }`}
                    aria-label={`Play testimonial video of ${item.name}`}
                  >
                    <Play
                      className={`fill-current ml-0.5 transition-transform group-hover:scale-110 ${
                        isActive ? 'w-5 h-5 sm:w-6 sm:h-6 text-brand-dark' : 'w-4 h-4 text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Video Card Content (Compact & Elegant) */}
                <div className="absolute bottom-4 inset-x-4 z-10 text-white">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white tracking-tight drop-shadow truncate">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-neutral-300 font-sans mt-0.5 drop-shadow truncate">
                        {item.storyTitle || `${item.unit} • ${item.projectName}`}
                      </p>
                    </div>

                    {/* Watch Video Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserInteraction();
                        openVideo(`${item.name} — Customer Video Story (${item.projectName})`);
                      }}
                      className="shrink-0 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] hover:brightness-110 active:scale-95 text-[#0A1715] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md transition-all cursor-pointer"
                    >
                      <span>Watch</span>
                      <Play className="w-2 h-2 fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Bar: Counter on Left + Capsule Pagination Dots on Right */}
        <div className="mt-7 flex items-center justify-between border-t border-[#E5DFD1] pt-5 max-w-3xl mx-auto px-4">
          {/* Left Counter */}
          <div className="flex items-center gap-2.5">
            <span className="font-serif text-xl sm:text-2xl font-bold text-brand-dark">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-medium">
              | {String(total).padStart(2, '0')} Client Stories
            </span>
          </div>

          {/* Center Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-8 h-8 rounded-full bg-white border border-[#E5DFD1] text-brand-dark hover:bg-brand-dark hover:text-brand-gold flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next story"
              className="w-8 h-8 rounded-full bg-white border border-[#E5DFD1] text-brand-dark hover:bg-brand-dark hover:text-brand-gold flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Capsule Pagination Dots */}
          <div className="flex items-center gap-1.5">
            {testimonialsData.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  handleUserInteraction();
                  setActiveIndex(dotIdx);
                }}
                aria-label={`Go to story ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === activeIndex
                    ? 'w-6 h-1.5 bg-[#0A1715]'
                    : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

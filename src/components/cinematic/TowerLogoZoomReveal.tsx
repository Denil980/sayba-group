import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, RotateCcw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TowerLogoZoomRevealProps {
  onComplete?: () => void;
}

export const TowerLogoZoomReveal: React.FC<TowerLogoZoomRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Detect reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // 2. Preload high-res assets
  useEffect(() => {
    const images = [
      '/assets/cinematic/scene1-tower-hd.jpg',
      '/assets/sayba-logo-transparent.png',
      '/assets/sayba-logo.svg',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 3. GSAP ScrollTrigger setup
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6, // Silky smooth scroll drag
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 4. Calculate zoom & position dynamics
  // As user scrolls:
  // - Camera zooms into the top of the building where the logo is placed
  // - The logo expands in width & height until it is fully visible, grand and prominent
  const p = scrollProgress;
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  // Scene zoom: scales from 1.0 up to 2.85 toward the top crown of the building
  const sceneScale = 1.0 + clamp01(p) * 1.85;

  // Camera pan: adjusts vertical centering so the top of the tower moves toward screen center
  const sceneTranslateY = clamp01(p) * 32; // Moves down so top of tower centers in viewport

  // Logo dynamics:
  // Starts at the top of the building, slightly elevated above the crown
  // As zoom progresses, logo scale increases and becomes massive, fully visible
  const logoScale = 1.0 + clamp01(p) * 1.6;
  const logoGlowOpacity = clamp01((p - 0.2) / 0.6);

  // Tower background subtle fade at peak zoom (75% to 100%) so the giant logo takes complete center stage
  const towerOpacity = 1.0 - clamp01((p - 0.75) / 0.25) * 0.45;

  // Handle Skip to Content
  const handleSkip = () => {
    if (onComplete) {
      onComplete();
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + rect.height,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320vh] sm:h-[380vh] bg-[#0C0E10]"
    >
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0C0E10]">
        {/* ========================================================
            ZOOM CONTAINER (Focuses on the top of the building & logo)
            ======================================================== */}
        <div
          className="relative w-full h-full will-change-transform flex items-center justify-center"
          style={{
            transformOrigin: '50% 10%', // Zoom directly into the crown/top of building
            transform: `scale(${sceneScale}) translateY(${sceneTranslateY}%)`,
            transition: 'transform 0.08s linear',
          }}
        >
          {/* 1. Tower in Cityscape Background */}
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{ opacity: towerOpacity }}
          >
            <img
              src="/assets/cinematic/scene1-tower-hd.jpg"
              alt="Sayba Luxury Skyscraper Tower"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* 2. Soft Horizon Aura Glow behind the Logo */}
          <div
            className="absolute top-[3%] left-1/2 -translate-x-1/2 w-[65vw] max-w-3xl h-[40vh] rounded-full bg-gradient-to-b from-[#80B3AD]/35 via-[#FFE5B4]/25 to-transparent blur-3xl pointer-events-none transition-opacity duration-500"
            style={{ opacity: logoGlowOpacity }}
          />

          {/* 3. The SAYBA GROUP Logo (Positioned at the top of the building) */}
          <div
            className="absolute top-[2.5%] sm:top-[3%] left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center justify-center w-[75vw] max-w-2xl sm:max-w-3xl will-change-transform z-20"
            style={{
              transform: `scale(${logoScale})`,
              transition: 'transform 0.08s linear',
            }}
          >
            {/* Soft Backplate for supreme readability at all zoom levels */}
            <div className="relative px-6 py-4 rounded-3xl backdrop-blur-md bg-white/20 border border-white/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex items-center justify-center">
              <img
                src="/assets/sayba-logo-transparent.png"
                alt="SAYBA GROUP"
                className="w-full h-auto max-h-[16vh] sm:max-h-[22vh] object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)] filter brightness-[1.08] contrast-[1.05]"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* ========================================================
            DISCRETE CORNER UI CONTROLS (Zero Center Clutter)
            ======================================================== */}
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-5 sm:p-7 flex items-center justify-between">
          {/* Subtle Tag */}
          <div className="pointer-events-auto flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#80B3AD] shadow-[0_0_8px_#80B3AD]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-white">
              {p < 0.3 ? 'Architectural Skyline' : 'Sayba Group'}
            </span>
          </div>

          {/* Right Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Restart Button if scrolled past 95% */}
            {p >= 0.95 && (
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1.5 bg-black/60 hover:bg-black/90 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/20 text-white text-xs transition-all cursor-pointer shadow-xl active:scale-95"
                title="Back to Top"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#80B3AD]" />
              </button>
            )}

            {/* Skip to Content Button */}
            <button
              type="button"
              onClick={handleSkip}
              className="bg-[#80B3AD] hover:bg-[#609A93] text-[#0A0B0C] px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xl active:scale-95"
            >
              Skip
            </button>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none p-5 sm:p-7 flex items-center justify-between">
          {/* Scroll Down Prompt */}
          <div
            className={`pointer-events-auto flex items-center gap-2.5 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold transition-opacity duration-500 shadow-2xl ${
              p > 0.08 ? 'opacity-30 hover:opacity-100' : 'opacity-100'
            }`}
          >
            <span>Scroll down to zoom in</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#80B3AD] animate-bounce" />
          </div>

          {/* Timeline Progress Bar */}
          <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-xl">
            <div className="w-24 sm:w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#609A93] to-[#80B3AD] transition-all duration-150 rounded-full shadow-[0_0_8px_#80B3AD]"
                style={{ width: `${Math.round(p * 100)}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-white w-9 text-right">
              {Math.round(p * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

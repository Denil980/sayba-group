import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Play, Pause, RotateCcw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PhotorealisticCinematicExperienceProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const PhotorealisticCinematicExperience: React.FC<PhotorealisticCinematicExperienceProps> = ({
  onComplete,
  standalone = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isAutoPlayingRef = useRef(isAutoPlaying);
  isAutoPlayingRef.current = isAutoPlaying;

  // 1. Detect reduced motion
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // 2. Preload layered assets
  useEffect(() => {
    const images = [
      '/assets/cinematic/start-tower.png',
      '/assets/cinematic/tower-foreground-mask.png',
      '/assets/cinematic/end-sky-dramatic.jpg',
      '/assets/sayba-logo-transparent.png',
    ];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // 3. Subtle camera perspective parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 4. GSAP ScrollTrigger Setup
  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.65, // Smooth, reversible scroll synchronization
        onUpdate: (self) => {
          if (!isAutoPlayingRef.current) {
            setScrollProgress(self.progress);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 5. Automated 14-second flythrough playback
  useEffect(() => {
    if (!isAutoPlaying) return;

    const startTime = performance.now();
    const duration = 14000; // 14 seconds
    const startProgress = scrollProgress >= 0.99 ? 0 : scrollProgress;
    let animFrame: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth cubic easeInOut curve
      const eased =
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const newProgress = startProgress + (1 - startProgress) * eased;
      setScrollProgress(newProgress);

      if (t < 1) {
        animFrame = requestAnimationFrame(tick);
      } else {
        setIsAutoPlaying(false);
      }
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [isAutoPlaying]);

  // 6. Kinematic Calculations:
  // - 0%: Matches START IMAGE (logo hidden behind building/horizon)
  // - 20%: Forward push begins, subtle horizon glow, logo starts emerging
  // - 40%: Logo visibly rising behind tower
  // - 60%: Most of logo visible
  // - 80%: Logo nearly fully revealed
  // - 100%: Matches END IMAGE (monumental logo held steady behind tower)
  const p = scrollProgress;
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  // Global Camera Movement: Forward push (1.0 -> 1.09) and slight tilt
  const cameraScale = 1.0 + clamp01(p) * 0.085;
  const cameraTranslateY = clamp01(p) * -3.5;

  // Background Sky Crossfade: Calm morning -> Dramatic golden sunrise clouds
  const dramaticSkyOpacity = clamp01((p - 0.15) / 0.7);

  // Logo Vertical Emergence:
  // Starts completely hidden at translateY(115%), rises to translateY(0%) at 100%
  const logoTranslateY = (1 - clamp01(p)) * 125;
  const logoOpacity = clamp01((p - 0.08) / 0.35);
  const logoHaloOpacity = clamp01((p - 0.25) / 0.65);

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
      className={`relative w-full ${
        standalone ? 'h-screen' : 'h-[500vh] sm:h-[600vh]'
      } bg-[#0A0B0C]`}
    >
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0A0B0C]">
        {/* Parallax Camera Container */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transform: `scale(${cameraScale}) translateY(${cameraTranslateY}%) translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`,
            transition: 'transform 0.08s linear',
          }}
        >
          {/* ========================================================
              LAYER 1 (BACKGROUND): Distant Sky & Atmosphere
              ======================================================== */}
          {/* Base Morning Sky (Start Image Sky) */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
              src="/assets/cinematic/start-tower.png"
              alt="Sayba Morning Skyline"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* Dramatic Golden Sunrise Clouds (Interpolating in as user scrolls) */}
          <div
            className="absolute inset-0 w-full h-full z-[1] transition-opacity duration-300"
            style={{ opacity: dramaticSkyOpacity }}
          >
            <img
              src="/assets/cinematic/end-sky-dramatic.jpg"
              alt="Dramatic Sunrise Sky"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* ========================================================
              LAYER 2 (MIDGROUND): Monumental Rising SAYBA GROUP Logo
              Physically situated BEHIND the building in 3D depth
              ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full z-[5] pointer-events-none flex items-start justify-center pt-10 sm:pt-14"
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoTranslateY}%)`,
              willChange: 'transform, opacity',
            }}
          >
            {/* Luminous Volumetric Halo Glow behind Logo */}
            <div
              className="absolute -top-10 w-[70vw] max-w-4xl h-[45vh] rounded-full bg-gradient-to-b from-[#80B3AD]/30 via-[#FFE4B5]/25 to-transparent blur-3xl pointer-events-none transition-opacity duration-500"
              style={{ opacity: logoHaloOpacity }}
            />

            {/* Authoritative Authentic SAYBA GROUP Logo */}
            <div className="relative z-10 w-[85vw] max-w-4xl px-4 flex items-center justify-center">
              <img
                src="/assets/sayba-logo-transparent.png"
                alt="SAYBA GROUP"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] filter brightness-[1.12] contrast-[1.05]"
                loading="eager"
              />
            </div>
          </div>

          {/* ========================================================
              LAYER 3 (FOREGROUND): Precision Tower & Cityscape Mask
              Physically OCCLUDES the logo wherever they overlap
              ======================================================== */}
          <div className="absolute inset-0 w-full h-full z-[10] pointer-events-none">
            <img
              src="/assets/cinematic/tower-foreground-mask.png"
              alt="Sayba Tower Foreground Occlusion"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>
        </div>

        {/* ========================================================
            SLEEK, DISCRETE CONTROLS (Corner Docked, Zero Clutter)
            ======================================================== */}
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-5 sm:p-7 flex items-center justify-between">
          {/* Chapter / Reveal Progress Badge */}
          <div className="pointer-events-auto flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#80B3AD] shadow-[0_0_8px_#80B3AD]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-white">
              {p < 0.25
                ? 'Architectural Skyline'
                : p < 0.8
                ? 'Cinematic Reveal'
                : 'Sayba Group'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 bg-black/60 hover:bg-black/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 hover:border-[#80B3AD] text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-xl active:scale-95"
              title={isAutoPlaying ? 'Pause Reveal' : 'Play Cinematic Reveal'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#80B3AD]" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#80B3AD] fill-[#80B3AD]" />
                  <span className="hidden sm:inline">Play Reveal</span>
                </>
              )}
            </button>

            {/* Restart Button */}
            {p >= 0.95 && (
              <button
                type="button"
                onClick={() => {
                  setScrollProgress(0);
                  setIsAutoPlaying(true);
                }}
                className="flex items-center gap-1.5 bg-black/60 hover:bg-black/90 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/20 text-white text-xs transition-all cursor-pointer shadow-xl active:scale-95"
                title="Restart Reveal"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#80B3AD]" />
              </button>
            )}

            {/* Skip to Content Button */}
            {!standalone && (
              <button
                type="button"
                onClick={handleSkip}
                className="bg-[#80B3AD] hover:bg-[#609A93] text-[#0A0B0C] px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xl active:scale-95"
              >
                Skip Intro
              </button>
            )}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none p-5 sm:p-7 flex items-center justify-between">
          {/* Scroll Down Prompt */}
          <div
            className={`pointer-events-auto flex items-center gap-2.5 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold transition-opacity duration-500 shadow-2xl ${
              p > 0.08 && !isAutoPlaying ? 'opacity-30 hover:opacity-100' : 'opacity-100'
            }`}
          >
            <span>{isAutoPlaying ? 'Cinematic in progress' : 'Scroll down to reveal'}</span>
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

import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Play, Pause, RotateCcw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface TowerLogoCinematicRevealProps {
  onComplete?: () => void;
  standalone?: boolean;
}

export const TowerLogoCinematicReveal: React.FC<TowerLogoCinematicRevealProps> = ({
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

  // 1. Detect reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // 2. Preload all essential assets
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

  // 3. Subtle architectural camera perspective parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
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
        scrub: 0.65, // Smooth scrubbed response
        onUpdate: (self) => {
          if (!isAutoPlayingRef.current) {
            setScrollProgress(self.progress);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 5. Automated Exact 10-Second Cinematic Playback
  useEffect(() => {
    if (!isAutoPlaying) return;

    const startTime = performance.now();
    const duration = 10000; // Exactly 10.0 seconds
    const startProgress = scrollProgress >= 0.99 ? 0 : scrollProgress;
    let animFrame: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Smooth cinematic easeInOut curve
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

  // 6. Kinematic Calculations for the 10-Second Reveal
  // Pacing:
  // 0–2s (0.00 – 0.20): Opening shot - tower centered, logo hidden
  // 2–4s (0.20 – 0.40): Anticipation - camera pushes forward, horizon glow begins
  // 4–7s (0.40 – 0.70): Giant logo rises vertically from ground behind building
  // 7–9s (0.70 – 0.90): Full reveal - complete logo visible behind tower in dramatic sky
  // 9–10s (0.90 – 1.00): Final hold - stable composition holding on tower & giant logo
  const p = scrollProgress;
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  // Camera forward push and upward tilt (One continuous cinematic motion)
  const cameraScale = 1.0 + clamp01(p) * 0.085;
  const cameraTranslateY = clamp01(p) * -3.2;

  // Sky transition: Calm morning sky -> Dramatic golden sunrise clouds
  const dramaticSkyOpacity = clamp01((p - 0.2) / 0.65);

  // Horizon anticipatory glow (emerges at 2-4s)
  const horizonGlowOpacity = clamp01((p - 0.18) / 0.4);

  // Giant Logo Vertical Translation:
  // - 0.00 to 0.25: Hidden completely below the horizon (translateY: 130%)
  // - 0.25 to 0.85: Rises majestically from translateY(130%) up to translateY(0%)
  // - 0.85 to 1.00: Holds stable final position
  const logoProgress = clamp01((p - 0.22) / 0.63);
  const logoTranslateY = (1 - logoProgress) * 128;
  const logoOpacity = clamp01((p - 0.18) / 0.25);
  const logoAuraOpacity = clamp01((p - 0.35) / 0.55);

  // Exact Second Timer (0.0s to 10.0s)
  const currentSeconds = (p * 10).toFixed(1);

  // Stage narrative description
  const currentStage = useMemo(() => {
    if (p < 0.2) {
      return {
        phase: '01 / OPENING SHOT (0–2s)',
        title: 'Original Skyline Architecture',
        sub: 'Tower centered beneath calm morning sky',
      };
    } else if (p < 0.4) {
      return {
        phase: '02 / ANTICIPATION (2–4s)',
        title: 'Dawn Radiance & Anticipation',
        sub: 'Warm golden sunlight emerges along horizon',
      };
    } else if (p < 0.7) {
      return {
        phase: '03 / GIANT LOGO RISES (4–7s)',
        title: 'Monumental Vertical Emergence',
        sub: 'Logo ascends from ground behind the tower',
      };
    } else if (p < 0.9) {
      return {
        phase: '04 / FULL REVEAL (7–9s)',
        title: 'Complete Brand Reveal',
        sub: 'Original logo framed against dramatic sunrise',
      };
    } else {
      return {
        phase: '05 / FINAL HOLD (9–10s)',
        title: 'Sayba Group',
        sub: 'Building Better Tomorrows',
      };
    }
  }, [p]);

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
        standalone ? 'h-screen' : 'h-[460vh] sm:h-[540vh]'
      } bg-[#0A0B0C]`}
    >
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0A0B0C]">
        {/* Parallax Camera Container */}
        <div
          className="relative w-full h-full will-change-transform"
          style={{
            transform: `scale(${cameraScale}) translateY(${cameraTranslateY}%) translate3d(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px, 0)`,
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

          {/* Dramatic Golden Sunrise Clouds (Interpolating in from 2s to 10s) */}
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

          {/* Volumetric Horizon Sunlight Glow (Anticipation 2–4s) */}
          <div
            className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-[85vw] max-w-5xl h-[35vh] rounded-full bg-gradient-to-t from-[#FFA726]/30 via-[#FFE082]/20 to-transparent blur-3xl z-[3] pointer-events-none transition-opacity duration-500"
            style={{ opacity: horizonGlowOpacity }}
          />

          {/* ========================================================
              LAYER 2 (MIDGROUND): Monumental Rising SAYBA GROUP Logo
              Physically situated BEHIND the building in 3D depth
              ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full z-[5] pointer-events-none flex items-start justify-center pt-8 sm:pt-12"
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoTranslateY}%)`,
              willChange: 'transform, opacity',
            }}
          >
            {/* Luminous Volumetric Halo & Teal Rim Glow around Logo */}
            <div
              className="absolute -top-10 w-[75vw] max-w-4xl h-[48vh] rounded-full bg-gradient-to-b from-[#80B3AD]/35 via-[#FFE082]/25 to-transparent blur-3xl pointer-events-none transition-opacity duration-500"
              style={{ opacity: logoAuraOpacity }}
            />

            {/* Authoritative Authentic SAYBA GROUP Logo Graphic */}
            <div className="relative z-10 w-[84vw] max-w-4xl px-4 flex items-center justify-center">
              <img
                src="/assets/sayba-logo-transparent.png"
                alt="SAYBA GROUP"
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] filter brightness-[1.12] contrast-[1.05]"
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
            DISCRETE CINEMATIC CONTROLS (Corner-Docked, Zero Clutter)
            ======================================================== */}
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none p-5 sm:p-7 flex items-center justify-between">
          {/* Phase & Timecode Badge */}
          <div className="pointer-events-auto flex items-center gap-3 bg-black/65 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#80B3AD] shadow-[0_0_8px_#80B3AD]" />
            <span className="text-xs font-mono text-[#80B3AD] font-bold">
              {currentSeconds}s / 10.0s
            </span>
            <span className="text-xs text-white/30">|</span>
            <span className="text-xs uppercase tracking-wider font-semibold text-white">
              {currentStage.title}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* 10-Second Auto-Play Button */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 bg-black/65 hover:bg-black/90 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 hover:border-[#80B3AD] text-white text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-xl active:scale-95"
              title={isAutoPlaying ? 'Pause 10s Reveal' : 'Play 10-Second Cinematic Reveal'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#80B3AD]" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#80B3AD] fill-[#80B3AD]" />
                  <span className="hidden sm:inline">Play 10s Reveal</span>
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
                className="flex items-center gap-1.5 bg-black/65 hover:bg-black/90 backdrop-blur-xl px-3.5 py-2 rounded-full border border-white/20 text-white text-xs transition-all cursor-pointer shadow-xl active:scale-95"
                title="Replay 10s Reveal"
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
            className={`pointer-events-auto flex items-center gap-2.5 bg-black/65 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold transition-opacity duration-500 shadow-2xl ${
              p > 0.08 && !isAutoPlaying ? 'opacity-30 hover:opacity-100' : 'opacity-100'
            }`}
          >
            <span>{isAutoPlaying ? 'Playing 10s reveal' : 'Scroll down to reveal'}</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#80B3AD] animate-bounce" />
          </div>

          {/* Timeline Progress Bar */}
          <div className="flex items-center gap-3 bg-black/65 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-xl">
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

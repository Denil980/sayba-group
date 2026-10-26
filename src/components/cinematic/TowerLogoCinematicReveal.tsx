import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Reduced motion preference
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handler);
    return () => motionQuery.removeEventListener('change', handler);
  }, []);

  // 2. Preload assets
  useEffect(() => {
    const images = [
      '/assets/cinematic/start-tower.png',
      '/assets/sayba-logo-authentic.svg',
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
        scrub: 0.6, // Silky smooth response
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 4. Logo Kinematics: Ground (bottom) -> Center of screen
  const p = scrollProgress;
  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

  // Camera subtle push-in (very restrained and realistic)
  const cameraScale = 1.0 + clamp01(p) * 0.05;

  // Logo rises from bottom (ground) to the center/middle-top of the screen
  // - Starts at translateY: 75vh (bottom of screen)
  // - Ascends smoothly to translateY: 0vh (center of screen) by p = 0.72
  // - Holds in the center through p = 1.0
  const progressToCenter = clamp01(p / 0.72);
  // Cubic ease-out curve for natural, elegant rise
  const easedRise = 1 - Math.pow(1 - progressToCenter, 3);
  const logoTranslateY = (1 - easedRise) * 75; // in vh
  const logoOpacity = clamp01(p * 3.5); // fades in smoothly from the bottom
  const logoScale = 0.96 + easedRise * 0.22; // scales into a bigger, bolder presence

  // Handle Skip
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
        standalone ? 'h-screen' : 'h-[230vh] sm:h-[260vh]'
      } bg-[#0A0B0C]`}
    >
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none bg-[#0A0B0C]">
        {/* ========================================================
            1. TOWER BACKGROUND (Just the genuine building photograph)
            ======================================================== */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform z-0"
          style={{
            transform: `scale(${cameraScale})`,
            transition: 'transform 0.1s linear',
          }}
        >
          <img
            src="/assets/cinematic/start-tower.png"
            alt="Sayba Tower Architecture"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Subtle natural vignette to enhance contrast and focus */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/45 pointer-events-none" />
        </div>

        {/* ========================================================
            2. THE LOGO (Appears from ground to center on scroll, transparent, bigger)
            ======================================================== */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-4 sm:px-8">
          <div
            className="relative w-[92vw] max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl flex items-center justify-center will-change-transform"
            style={{
              transform: `translateY(${logoTranslateY}vh) scale(${logoScale})`,
              opacity: prefersReducedMotion ? 1 : logoOpacity,
              transition: 'transform 0.08s linear, opacity 0.15s ease-out',
            }}
          >
            {/* 100% Mathematically Smooth Vector SVG: Zero blur, exact triangle & S placement, zero background */}
            <svg
              viewBox="0 0 208 75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto select-none filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            >
              {/* Architectural Triangle Roof: Exactly placed as roof above S */}
              <polygon points="36.5,7 66,36.5 7,36.5" fill="#B3B3B3" />

              {/* Bold Teal Monogram S: 100% mathematical vector Bézier curves with flush horizontal baseline cut at y=36.5, zero crack/notch, unbroken continuous curves */}
              <path
                d="M 37.202 65.624 Q 33.562 65.624 30.364 64.298 Q 27.166 62.972 24.852 60.528 Q 22.538 58.084 21.394 54.756 L 27.998 51.792 Q 29.454 54.964 32.028 56.784 Q 34.602 58.604 37.722 58.604 Q 39.386 58.604 40.582 58.084 Q 41.778 57.564 42.454 56.654 Q 43.13 55.744 43.13 54.496 Q 43.13 53.144 42.298 52.182 Q 41.466 51.22 39.698 50.648 L 32.106 48.152 Q 27.478 46.644 25.138 43.862 Q 22.798 41.08 22.798 37.18 Q 22.798 33.748 24.488 31.148 Q 26.178 28.548 29.22 27.092 Q 32.262 25.636 36.214 25.636 Q 39.698 25.636 42.662 26.832 Q 45.626 28.028 47.784 30.212 Q 49.942 32.396 51.403 36.5 L 43.466 36.5 Q 42.54 35.127 41.206 34.19 Q 39.022 32.656 36.214 32.656 Q 34.602 32.656 33.354 33.176 Q 32.106 33.696 31.43 34.658 Q 30.754 35.62 30.754 36.868 Q 30.754 38.22 31.638 39.234 Q 32.522 40.248 34.29 40.82 L 41.726 43.212 Q 46.406 44.72 48.72 47.424 Q 51.034 50.128 51.034 54.028 Q 51.034 57.408 49.266 60.034 Q 47.498 62.66 44.404 64.142 Q 41.31 65.624 37.202 65.624 Z"
                fill="#80B3AD"
              />

              {/* Typography: SAYBA (Bold Luxury Geometric) */}
              <text
                x="71"
                y="35"
                fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
                fontSize="27"
                fontWeight="800"
                letterSpacing="0.22em"
                fill="#141515"
              >
                SAYBA
              </text>

              {/* Typography: GROUP (Refined Geometric) */}
              <text
                x="71"
                y="58"
                fontFamily="'Plus Jakarta Sans', Arial, Helvetica, sans-serif"
                fontSize="19"
                fontWeight="700"
                letterSpacing="0.42em"
                fill="#211F1F"
              >
                GROUP
              </text>
            </svg>
          </div>
        </div>

        {/* ========================================================
            3. DISCREET CONTROLS (Zero clutter, just skip and scroll hint)
            ======================================================== */}
        {/* Top Right Skip Button */}
        {!standalone && (
          <div className="absolute top-0 right-0 z-30 p-5 sm:p-7 pointer-events-auto">
            <button
              type="button"
              onClick={handleSkip}
              className="bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/20 hover:border-[#80B3AD] text-white px-5 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xl active:scale-95"
            >
              Skip Intro
            </button>
          </div>
        )}

        {/* Bottom Scroll Prompt (fades away as logo reaches center) */}
        <div
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500"
          style={{ opacity: p > 0.4 ? 0 : 1 }}
        >
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-widest uppercase font-semibold shadow-xl">
            <span>Scroll down</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#80B3AD] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

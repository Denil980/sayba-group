import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

interface CinematicFallbackProps {
  onSkip?: () => void;
}

export const CinematicFallback: React.FC<CinematicFallbackProps> = ({ onSkip }) => {
  return (
    <section className="relative min-h-screen bg-[#101112] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Slideshow / Visuals */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/cinematic/scene4-logowall.jpg"
          alt="Sayba Group Headquarters Feature Wall"
          className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101112] via-[#101112]/70 to-[#101112]/90" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#80B3AD] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-neutral-300 font-medium">
            Cinematic Reveal
          </span>
        </div>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-xs uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-md"
          >
            Skip Intro
          </button>
        )}
      </div>

      {/* Center Logo Showcase */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center my-auto py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-block relative p-8 sm:p-12 rounded-3xl bg-white shadow-2xl border border-white/20 mb-8 max-w-md w-full"
        >
          {/* Subtle Backlight Glow */}
          <div className="absolute -inset-1 rounded-3xl bg-[#80B3AD]/20 blur-xl -z-10" />
          
          <img
            src="/assets/sayba-logo-transparent.png"
            alt="Sayba Group"
            className="w-full max-w-[280px] sm:max-w-[320px] h-auto mx-auto object-contain"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4"
        >
          Architectural Distinction
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-neutral-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          Welcome to the world of Sayba Group. Where visionary engineering meets
          timeless Mumbai skyline landmarks.
        </motion.p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pb-8 w-full flex justify-center">
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-[#80B3AD] transition-colors cursor-pointer group"
        >
          <span>Scroll down to continue</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, type Variants } from 'framer-motion';
import {
  Waves,
  Dumbbell,
  Building2,
  Trees,
  Gamepad2,
  ArrowRight,
} from 'lucide-react';

interface Amenity {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const AMENITIES_LIST: Amenity[] = [
  {
    id: 'swimming-pool',
    name: 'Swimming Pool',
    category: 'Wellness & Spa',
    icon: Waves,
    description: 'Temperature-controlled infinity pool with dedicated kids wading pool and poolside sundeck.',
  },
  {
    id: 'gymnasium',
    name: 'Gymnasium',
    category: 'Fitness & Health',
    icon: Dumbbell,
    description: 'State-of-the-art cardio suite, Olympic free weights, and certified personal wellness guidance.',
  },
  {
    id: 'club-house',
    name: 'Club House',
    category: 'Community & Leisure',
    icon: Building2,
    description: 'Grand double-height banquet hall, resident social lounge, and executive leisure spaces.',
  },
  {
    id: 'landscaped-garden',
    name: 'Landscaped Garden',
    category: 'Botanical Greens',
    icon: Trees,
    description: 'Lush tropical flora, serene water cascades, pergola cabanas, and reflexology walking paths.',
  },
  {
    id: 'indoor-games',
    name: 'Indoor Games',
    category: 'Sports & Arcade',
    icon: Gamepad2,
    description: 'Full-size 8-ball billiards, tournament table tennis, chess tables, and console gaming hub.',
  },
];

export const ModernAmenitiesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Trigger animation ONLY when the user has scrolled to the cards container and it is clearly visible in screen
  const isCardsInView = useInView(scrollContainerRef, { amount: 0.45, once: true });

  // 10-Second Showcase State for subtle spotlight cycle
  const [activeHighlightIndex, setActiveHighlightIndex] = useState<number>(0);

  // 10-second showcase timer: cycles through each of the 5 cards for 2 seconds each (total 10 seconds)
  useEffect(() => {
    if (!isCardsInView) return;

    // Start cycling spotlight after cards have finished their entrance animation
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveHighlightIndex((prev) => (prev + 1) % AMENITIES_LIST.length);
      }, 2000);

      return () => clearInterval(interval);
    }, 1800);

    return () => clearTimeout(startDelay);
  }, [isCardsInView]);

  const shouldAnimate = isCardsInView;

  // Staggered Container Variant (cards appear one by one right when the user arrives)
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.25, // Noticeable pause so the user sees the start
        staggerChildren: 0.22, // Distinct one-by-one sequential card entrance
      },
    },
  };

  // Individual Card Spring Entrance Variant (pronounced slide & reveal)
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 70, // Clear upward rise so the animation is visually prominent
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 18,
        stiffness: 75,
        mass: 0.9,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#F4EFE6] border-y border-[#E5DFD1] relative overflow-hidden"
    >
      {/* Decorative ambient background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-gold/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-gold-dark block mb-2">
            MODERN AMENITIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">
            A Better Way of Living
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 font-normal max-w-lg mx-auto leading-relaxed">
            Thoughtfully curated luxury lifestyle spaces designed for wellness, relaxation, and memorable moments.
          </p>
        </div>

        {/* Amenities Cards Grid & Track (Cards appear one by one) */}
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar"
        >
            {AMENITIES_LIST.map((amenity, idx) => {
              const Icon = amenity.icon;
              const isSpotlighted = shouldAnimate && activeHighlightIndex === idx;

              return (
                <motion.div
                  key={amenity.id}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className={`relative rounded-2xl p-7 sm:p-8 flex flex-col items-center text-center transition-all duration-500 group border cursor-default ${
                    isSpotlighted
                      ? 'bg-white border-brand-gold shadow-[0_15px_35px_rgba(197,164,103,0.22)] -translate-y-2 ring-1 ring-brand-gold/50'
                      : 'bg-white border-[#E5DFD1] shadow-[0_6px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-brand-gold/60'
                  }`}
                  style={{ minHeight: '320px' }}
                >
                  {/* Top Gold Accent Bar */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-full transition-all duration-500 ${
                      isSpotlighted
                        ? 'w-20 bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353]'
                        : 'w-8 bg-transparent group-hover:w-16 group-hover:bg-brand-gold/60'
                    }`}
                  />

                  {/* Category Pill */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold-dark mb-4">
                    {amenity.category}
                  </span>

                  {/* Much Bigger, Premium Icon Emblem */}
                  <div
                    className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center transition-all duration-500 mb-5 border-2 ${
                      isSpotlighted
                        ? 'bg-gradient-to-br from-[#FAF7F2] to-[#F1E8D9] border-brand-gold text-brand-dark scale-110 shadow-md ring-4 ring-brand-gold/20'
                        : 'bg-[#FAF7F2] border-brand-gold/30 text-brand-gold-dark group-hover:bg-brand-gold group-hover:text-brand-dark group-hover:scale-105 group-hover:border-brand-gold shadow-sm'
                    }`}
                  >
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Amenity Title (Larger & Clearer) */}
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-dark mb-2.5 tracking-tight">
                    {amenity.name}
                  </h4>

                  {/* Feature Description (Gives substance and clear visibility) */}
                  <p className="text-xs text-neutral-500 leading-relaxed max-w-[210px] font-sans">
                    {amenity.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        {/* Explore Dedicated Amenities Page CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/amenities"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-brand-dark hover:text-brand-gold text-brand-dark border border-brand-gold/40 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-lg group"
          >
            <span>Explore Dedicated Amenities Page</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

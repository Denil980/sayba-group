import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Waves,
  Dumbbell,
  Building2,
  Trees,
  Gamepad2,
  Smile,
  Sparkles,
  ShieldCheck,
  Check,
  ArrowRight,
} from 'lucide-react';
import { amenitiesData } from '../data/amenities';
import { useModal } from '../context/ModalContext';
import { AmenityItem } from '../types';

interface AmenityCurtainCardProps {
  amenity: AmenityItem;
  index: number;
  getAmenityIcon: (iconName: string) => React.ComponentType<{ className?: string }>;
}

/**
 * Individual Amenity Card with sequential vertical entrance and window curtain reveal:
 * Each card appears strictly in place (pure vertical rise, zero horizontal collision),
 * one by one in order. Once a card settles in its position, its luxury curtain
 * glides smoothly aside to the left, revealing the window view.
 */
const AmenityCurtainCard: React.FC<AmenityCurtainCardProps> = ({
  amenity,
  index,
  getAmenityIcon,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // Trigger when 15% of this card enters the viewport while scrolling
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });
  const Icon = getAmenityIcon(amenity.iconName);

  // Sequential order: Card 0 starts at 0s, Card 1 at 0.28s, Card 2 at 0.56s, etc.
  const cardDelay = index * 0.28;

  return (
    <div ref={cardRef} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 45 }
        }
        transition={{
          opacity: { duration: 0.5, ease: 'easeOut' },
          y: { duration: 0.55, ease: 'easeOut' },
          delay: cardDelay,
        }}
        className="h-full"
      >
        <div className="relative h-full bg-white rounded-2xl overflow-hidden border border-[#DCE1DF] hover:border-[#80B3AD] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col sm:flex-row group">
          {/* Top Teal Accent Bar on Hover */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#80B3AD] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

          {/* ========================================================
              WINDOW CURTAIN UNVEIL OVERLAY
              Opens smoothly aside to the left once card arrives
              ======================================================== */}
          <motion.div
            initial={{ x: '0%' }}
            animate={isInView ? { x: '-110%' } : { x: '0%' }}
            transition={{
              duration: 0.85,
              ease: [0.77, 0, 0.175, 1], // Smooth curtain pull
              delay: cardDelay + 0.22, // Opens right after the card settles in place
            }}
            className="absolute inset-0 z-30 pointer-events-none flex overflow-hidden shadow-2xl"
            style={{
              background:
                'linear-gradient(135deg, #101112 0%, #191B1D 50%, #232528 100%)',
            }}
          >
            {/* Vertical curtain fold pleats texture */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 14px, transparent 14px, transparent 28px)',
              }}
            />

            {/* Architectural Silver & White Satin Hem */}
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/30 via-[#B3B3B3] to-white/30 shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
          </motion.div>

          {/* Photo Side (Window View) */}
          <div className="sm:w-1/2 relative min-h-[240px] sm:min-h-full overflow-hidden bg-neutral-900">
            <img
              src={amenity.image}
              alt={amenity.name}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Gradient shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

            {/* Category Tag Badge */}
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-[#141515]/90 text-[#80B3AD] backdrop-blur-md border border-[#80B3AD]/30 shadow-sm">
                {amenity.category}
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4 bg-white">
            <div>
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-full bg-brand-cream border border-[#80B3AD]/30 flex items-center justify-center text-[#80B3AD] shrink-0 group-hover:bg-[#141515] group-hover:text-[#80B3AD] group-hover:border-[#80B3AD] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-[#80B3AD] transition-colors duration-300 line-clamp-1">
                  {amenity.name}
                </h3>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                {amenity.description}
              </p>
            </div>

            {/* Bullet features */}
            <div className="space-y-2 pt-3 border-t border-neutral-100">
              {amenity.features.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-700">
                  <Check className="w-3.5 h-3.5 text-[#80B3AD] shrink-0" />
                  <span className="line-clamp-1">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const AmenitiesPage: React.FC = () => {
  const { openSiteVisit } = useModal();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { key: 'All', label: 'All', count: amenitiesData.length },
    {
      key: 'Wellness & Fitness',
      label: 'Wellness & Fitness',
      count: amenitiesData.filter((a) => a.category === 'Wellness & Fitness').length,
    },
    {
      key: 'Recreation',
      label: 'Recreation',
      count: amenitiesData.filter((a) => a.category === 'Recreation').length,
    },
    {
      key: 'Community',
      label: 'Community',
      count: amenitiesData.filter((a) => a.category === 'Community').length,
    },
    {
      key: 'Safety & Security',
      label: 'Safety & Security',
      count: amenitiesData.filter((a) => a.category === 'Safety & Security').length,
    },
  ];

  const filteredAmenities = useMemo(() => {
    if (selectedCategory === 'All') {
      return amenitiesData;
    }
    return amenitiesData.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves':
        return Waves;
      case 'Dumbbell':
        return Dumbbell;
      case 'Building2':
        return Building2;
      case 'Trees':
        return Trees;
      case 'Gamepad2':
        return Gamepad2;
      case 'Smile':
        return Smile;
      case 'Sparkles':
        return Sparkles;
      case 'ShieldCheck':
        return ShieldCheck;
      default:
        return Sparkles;
    }
  };

  // Hero Animation Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative bg-[#141515] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2000&q=85"
            alt="Sayba World Class Amenities"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141515] via-[#141515]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="show"
            className="max-w-3xl space-y-4"
          >
            {/* Breadcrumb */}
            <motion.div
              variants={heroItemVariants}
              className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest"
            >
              <Link to="/" className="hover:text-[#80B3AD] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#80B3AD] font-medium">Amenities</span>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white"
            >
              World Class Amenities
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed"
            >
              Thoughtfully designed to elevate everyday lifestyles with unmatched recreation,
              wellness, and community leisure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          FILTER CATEGORIES & AMENITIES SHOWCASE
          ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Pills with Smooth Sliding Active Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-14"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer select-none ${
                  isActive ? 'text-[#141515]' : 'text-neutral-600 hover:text-brand-dark'
                }`}
              >
                {/* Sliding Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeAmenityCategoryPill"
                    className="absolute inset-0 bg-[#80B3AD] rounded-full shadow-md -z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-2">
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-bold transition-colors ${
                      isActive
                        ? 'bg-[#141515] text-white'
                        : 'bg-white text-neutral-500 border border-[#DCE1DF]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Amenities Cards Grid with Per-Card Sequential Vertical Entrance */}
        <div
          key={selectedCategory}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredAmenities.map((amenity, idx) => (
            <AmenityCurtainCard
              key={`${selectedCategory}-${amenity.id}`}
              amenity={amenity}
              index={idx}
              getAmenityIcon={getAmenityIcon}
            />
          ))}
        </div>
      </section>

      {/* ========================================================
          CTA BANNER
          ======================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="bg-[#141515] rounded-3xl p-8 sm:p-12 text-white border border-[#262828] text-center space-y-4 shadow-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Experience World-Class Living Firsthand
          </h2>
          <p className="text-sm text-neutral-300 max-w-xl mx-auto">
            Schedule an exclusive private tour with our relationship team to walk through our
            completed clubhouses, sports complexes, and rooftop sundecks.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openSiteVisit()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-semibold text-xs tracking-wider uppercase shadow-xl active:scale-95 transition-all cursor-pointer"
            >
              <span>Book a Site Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

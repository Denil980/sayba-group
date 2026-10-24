import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { companyInfo } from '../../data/company';

interface MilestoneData {
  year: string;
  title: string;
  description: string;
  x: number;
  y: number;
  pinDirection: 'down' | 'up';
}

const ROAD_PATH =
  'M 20 160 C 50 160, 80 160, 110 160 C 170 160, 230 70, 300 70 C 380 70, 420 240, 500 240 C 540 240, 580 155, 610 155 C 640 155, 680 240, 720 240 C 800 240, 850 70, 920 70 C 990 70, 1050 160, 1100 160 C 1130 160, 1160 160, 1180 160';

export const OurJourneyRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });

  // Map company journey milestones to our coordinates matching the wavy road
  const milestones: MilestoneData[] = [
    {
      year: companyInfo.journeyMilestones[0]?.year || '2002',
      title: companyInfo.journeyMilestones[0]?.title || 'Our Beginning',
      description: companyInfo.journeyMilestones[0]?.description || '',
      x: 110,
      y: 160,
      pinDirection: 'down',
    },
    {
      year: companyInfo.journeyMilestones[1]?.year || '2008',
      title: companyInfo.journeyMilestones[1]?.title || 'First Landmark',
      description: companyInfo.journeyMilestones[1]?.description || '',
      x: 300,
      y: 70,
      pinDirection: 'down', // high peak: sits above road, points down
    },
    {
      year: companyInfo.journeyMilestones[2]?.year || '2014',
      title: companyInfo.journeyMilestones[2]?.title || 'Expanding Corridors',
      description: companyInfo.journeyMilestones[2]?.description || '',
      x: 500,
      y: 240,
      pinDirection: 'up', // valley: sits below road, points up
    },
    {
      year: companyInfo.journeyMilestones[3]?.year || '2018',
      title: companyInfo.journeyMilestones[3]?.title || 'Growing Stronger',
      description: companyInfo.journeyMilestones[3]?.description || '',
      x: 720,
      y: 240,
      pinDirection: 'up', // valley: sits below road, points up
    },
    {
      year: companyInfo.journeyMilestones[4]?.year || '2021',
      title: companyInfo.journeyMilestones[4]?.title || 'New Milestones',
      description: companyInfo.journeyMilestones[4]?.description || '',
      x: 920,
      y: 70,
      pinDirection: 'down', // high peak: sits above road, points down
    },
    {
      year: companyInfo.journeyMilestones[5]?.year || '2024',
      title: companyInfo.journeyMilestones[5]?.title || 'Building the Future',
      description: companyInfo.journeyMilestones[5]?.description || '',
      x: 1100,
      y: 160,
      pinDirection: 'down',
    },
  ];

  // Animation states: revealedIndex controls one-by-one sequential appearance (0 to 5)
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Trigger sequential animation when scrolled into view
  useEffect(() => {
    if (isInView && revealedCount === 0 && !isPlaying) {
      startSequentialAnimation();
    }
  }, [isInView]);

  const startSequentialAnimation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPlaying(true);
    setRevealedCount(1);
    setActiveMilestone(0);

    let current = 1;
    intervalRef.current = setInterval(() => {
      current += 1;
      setRevealedCount(current);
      setActiveMilestone(current - 1);

      if (current >= milestones.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsPlaying(false);
      }
    }, 850);
  };


  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header with Title and Replay Control */}
      <div className="flex flex-col items-center justify-center text-center relative mb-12 sm:mb-16">

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark">
          Our Journey
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-dark to-brand-gold mx-auto mt-3 rounded-full" />
        <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto mt-3">
          Follow our progressive evolution from our maiden development in 2002 to becoming one of
          Mumbai's most trusted real estate icons in 2024.
        </p>


      </div>

      {/* ========================================================
          WAVY ROADMAP DISPLAY (DESKTOP & TABLET VIEW)
          ======================================================== */}
      <div className="hidden md:block relative w-full mb-12">
        <div className="relative w-full overflow-hidden bg-gradient-to-b from-[#F7FAFA] to-white rounded-3xl p-4 sm:p-6 border border-[#DCE1DF] shadow-sm">
          {/* Subtle background luxury pattern / grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#141515 1px, transparent 1px), radial-gradient(#141515 1px, #F7FAFA 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <svg
            viewBox="0 0 1200 320"
            className="w-full h-auto overflow-visible select-none"
            fill="none"
          >
            <defs>
              {/* Road Drop Shadow */}
              <filter id="road-shadow" x="-5%" y="-10%" width="110%" height="130%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#141515" floodOpacity="0.25" />
              </filter>

              {/* Pin Drop Shadow */}
              <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#141515" floodOpacity="0.3" />
              </filter>

              {/* Road Pavement Asphalt Gradient */}
              <linearGradient id="road-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2A2D2C" />
                <stop offset="25%" stopColor="#141515" />
                <stop offset="50%" stopColor="#232625" />
                <stop offset="75%" stopColor="#141515" />
                <stop offset="100%" stopColor="#2A2D2C" />
              </linearGradient>

              {/* Pin Teal Gradients */}
              <linearGradient id="pin-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CBE5E1" />
                <stop offset="50%" stopColor="#80B3AD" />
                <stop offset="100%" stopColor="#4A857E" />
              </linearGradient>

              <linearGradient id="pin-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#262828" />
                <stop offset="100%" stopColor="#141515" />
              </linearGradient>
            </defs>

            {/* 1. Road Outer Curb / Border */}
            <path
              d={ROAD_PATH}
              stroke="#B3B3B3"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.6"
              filter="url(#road-shadow)"
            />

            {/* 2. Road Asphalt Pavement */}
            <path
              d={ROAD_PATH}
              stroke="url(#road-gradient)"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 3. Center Dashed Lane Divider */}
            <path
              d={ROAD_PATH}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeDasharray="10 9"
              strokeLinecap="round"
              strokeOpacity="0.85"
            />

            {/* 4. Active Road Progress Glow (Draws along the road up to revealed milestones) */}
            <motion.path
              d={ROAD_PATH}
              stroke="#80B3AD"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.95"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: Math.min(1, (revealedCount - 0.2) / (milestones.length - 1)) }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* 5. Pins for Each Milestone */}
            {milestones.map((m, idx) => {
              const isRevealed = idx < revealedCount;
              const isActive = idx === activeMilestone;
              const isPeak = m.pinDirection === 'down';

              return (
                <g
                  key={idx}
                  transform={`translate(${m.x}, ${m.y})`}
                  onClick={() => setActiveMilestone(idx)}
                  className="cursor-pointer transition-all duration-200 hover:brightness-110 select-none"
                >
                  {/* Radar Ripple Animation when milestone is newly revealed or active */}
                  {isRevealed && (
                    <motion.circle
                      cx="0"
                      cy="0"
                      r="16"
                      fill="none"
                      stroke="#80B3AD"
                      strokeWidth="2.5"
                      className="pointer-events-none"
                      initial={{ scale: 0.6, opacity: 1 }}
                      animate={
                        isActive
                          ? { scale: [0.8, 2.2, 0.8], opacity: [0.9, 0, 0.9] }
                          : { scale: 1, opacity: 0 }
                      }
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}

                  {/* Road Anchor Dot */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isActive ? '5.5' : '4'}
                    fill={isRevealed ? '#80B3AD' : '#8A8F8E'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />

                  {/* Pin Teardrop Body (Reveals sequentially with spring pop) */}
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={
                      isRevealed
                        ? { scale: isActive ? 1.15 : 1, opacity: 1 }
                        : { scale: 0, opacity: 0 }
                    }
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 18,
                      delay: 0.1,
                    }}
                    filter="url(#pin-shadow)"
                  >
                    {isPeak ? (
                      /* Pin pointing DOWN to the crest */
                      <g>
                        {/* Teardrop path pointing down */}
                        <path
                          d="M 0,0 C -5,-9 -24,-24 -24,-38 A 24,24 0 1,1 24,-38 C 24,-24 5,-9 0,0 Z"
                          fill={isActive ? 'url(#pin-gold)' : 'url(#pin-dark)'}
                          stroke="#80B3AD"
                          strokeWidth="2"
                        />
                        {/* Circular Inset Badge */}
                        <circle
                          cx="0"
                          cy="-38"
                          r="18"
                          fill={isActive ? '#141515' : '#FFFFFF'}
                        />
                        {/* Year Text */}
                        <text
                          x="0"
                          y="-33"
                          textAnchor="middle"
                          fill={isActive ? '#80B3AD' : '#141515'}
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {m.year}
                        </text>
                      </g>
                    ) : (
                      /* Pin pointing UP to the valley */
                      <g>
                        {/* Teardrop path pointing up */}
                        <path
                          d="M 0,0 C -5,9 -24,24 -24,38 A 24,24 0 1,0 24,38 C 24,24 5,9 0,0 Z"
                          fill={isActive ? 'url(#pin-gold)' : 'url(#pin-dark)'}
                          stroke="#80B3AD"
                          strokeWidth="2"
                        />
                        {/* Circular Inset Badge */}
                        <circle
                          cx="0"
                          cy="38"
                          r="18"
                          fill={isActive ? '#141515' : '#FFFFFF'}
                        />
                        {/* Year Text */}
                        <text
                          x="0"
                          y="43"
                          textAnchor="middle"
                          fill={isActive ? '#80B3AD' : '#141515'}
                          fontSize="11"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {m.year}
                        </text>
                      </g>
                    )}
                  </motion.g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ========================================================
          HORIZONTAL STEP CARDS (DESKTOP & TABLET)
          Structured exactly like the reference roadmap cards
          ======================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
        {milestones.map((m, idx) => {
          const isRevealed = idx < revealedCount;
          const isActive = idx === activeMilestone;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={
                isRevealed
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0.25, y: 15 }
              }
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => setActiveMilestone(idx)}
              className={`group flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 cursor-pointer border ${
                isActive
                  ? 'bg-[#EDF6F5] border-brand-gold shadow-lg ring-2 ring-brand-gold/30 -translate-y-1'
                  : 'bg-white border-[#DCE1DF] hover:border-brand-gold/60 hover:shadow-md'
              }`}
            >
              <div>
                {/* Year Header */}
                <div className="mb-2">
                  <span
                    className={`font-serif text-lg font-bold transition-colors ${
                      isActive ? 'text-brand-gold-dark' : 'text-brand-dark group-hover:text-brand-gold-dark'
                    }`}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className={`font-serif text-base font-bold mb-2 transition-colors ${
                    isActive ? 'text-brand-dark' : 'text-brand-dark group-hover:text-brand-gold-dark'
                  }`}
                >
                  {m.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-neutral-600 leading-relaxed">{m.description}</p>
              </div>

              {/* Status indicator bottom pill */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span
                  className={`flex items-center space-x-1.5 font-medium ${
                    isActive
                      ? 'text-brand-gold-dark'
                      : isRevealed
                      ? 'text-emerald-700'
                      : 'text-neutral-400'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      isActive
                        ? 'text-brand-gold-dark'
                        : isRevealed
                        ? 'text-emerald-600'
                        : 'text-neutral-300'
                    }`}
                  />
                  <span>{isActive ? 'Active Landmark' : isRevealed ? 'Completed' : 'Upcoming'}</span>
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================
          MOBILE VIEW: Vertical Wavy Roadmap for Phones
          ======================================================== */}
      <div className="md:hidden mt-8 relative">
        <div className="relative border-l-2 border-brand-gold/60 ml-6 pl-6 space-y-6">
          {milestones.map((m, idx) => {
            const isRevealed = idx < revealedCount;
            const isActive = idx === activeMilestone;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isRevealed
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0.3, x: -10 }
                }
                transition={{ duration: 0.4 }}
                onClick={() => setActiveMilestone(idx)}
                className={`relative p-5 rounded-2xl border transition-all ${
                  isActive
                    ? 'bg-[#EDF6F5] border-brand-gold shadow-md ring-2 ring-brand-gold/20'
                    : 'bg-white border-[#DCE1DF]'
                }`}
              >
                {/* Pin indicator on the vertical line */}
                <div
                  className={`absolute -left-[35px] top-5 w-8 h-8 rounded-full border-2 border-brand-gold flex items-center justify-center text-xs font-bold shadow-sm transition-all ${
                    isActive
                      ? 'bg-brand-gold text-white scale-110'
                      : isRevealed
                      ? 'bg-[#141515] text-brand-gold'
                      : 'bg-white text-neutral-400'
                  }`}
                >
                  {m.year.slice(2)}
                </div>

                <div className="mb-1">
                  <span className="font-serif text-sm font-bold text-brand-dark">{m.year}</span>
                </div>

                <h4 className="font-serif text-base font-bold text-brand-dark mb-1">{m.title}</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">{m.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

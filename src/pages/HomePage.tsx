import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Play,
  Sparkles,
} from 'lucide-react';
import { ProjectCard } from '../components/common/ProjectCard';
import { ProjectsMapSection } from '../components/common/ProjectsMapSection';
import { ModernAmenitiesSection } from '../components/common/ModernAmenitiesSection';
import { LifeAtSaybaCarousel } from '../components/common/LifeAtSaybaCarousel';
import { VideoTestimonialsSection } from '../components/common/VideoTestimonialsSection';
import { projectsData } from '../data/projects';
import { companyInfo } from '../data/company';
import { ProjectsAutoScroll } from '../components/common/ProjectsAutoScroll';
import { CounterNumber } from '../components/common/CounterNumber';
import { useModal } from '../context/ModalContext';
import { CinematicTowerExperience } from '../components/cinematic/CinematicTowerExperience';

export const HomePage: React.FC = () => {
  const { openSiteVisit, openVideo } = useModal();
  const featuredProjects = projectsData.slice(0, 4);

  // Two-line Typewriter animation state for:
  // Line 1: Building Better
  // Line 2: Tomorrows
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [word3, setWord3] = useState('');
  const [phase, setPhase] = useState<'word1' | 'word2' | 'word3' | 'pause'>('word1');

  useEffect(() => {
    const fullWord1 = 'Building';
    const fullWord2 = 'Better';
    const fullWord3 = 'Tomorrows';

    let timer: ReturnType<typeof setTimeout>;

    if (phase === 'word1') {
      if (word1.length < fullWord1.length) {
        timer = setTimeout(() => {
          setWord1(fullWord1.slice(0, word1.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => setPhase('word2'), 220);
      }
    } else if (phase === 'word2') {
      if (word2.length < fullWord2.length) {
        timer = setTimeout(() => {
          setWord2(fullWord2.slice(0, word2.length + 1));
        }, 110);
      } else {
        timer = setTimeout(() => setPhase('word3'), 250);
      }
    } else if (phase === 'word3') {
      if (word3.length < fullWord3.length) {
        timer = setTimeout(() => {
          setWord3(fullWord3.slice(0, word3.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => setPhase('pause'), 4500); // Hold for 4.5s
      }
    } else if (phase === 'pause') {
      timer = setTimeout(() => {
        setWord1('');
        setWord2('');
        setWord3('');
        setPhase('word1');
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [word1, word2, word3, phase]);

  return (
    <div className="bg-brand-cream">
      {/* ========================================================
          0. CINEMATIC 3D TOWER REVEAL (Scroll-Driven Intro)
          ======================================================== */}
      <CinematicTowerExperience
        onComplete={() => {
          document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* ========================================================
          1. HERO SECTION
          ======================================================== */}
      <section
        id="main-content"
        className="relative min-h-[90vh] bg-[#141515] text-white flex flex-col justify-between overflow-hidden"
      >
        {/* Background Image with Dark Luxury Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
            alt="Sayba Group Luxury Towers"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141515] via-[#141515]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141515] via-transparent to-[#141515]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 my-auto w-full">
          <div className="max-w-2xl space-y-6">
            {/* Main Headline with 2-Line Typewriter Animation */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.12] min-h-[105px] sm:min-h-[145px] lg:min-h-[175px] flex flex-col justify-start"
            >
              {/* Line 1: Building Better */}
              <div className="inline-flex items-baseline flex-wrap">
                <span className="text-white">{word1}</span>
                {phase !== 'word1' && (
                  <span className="inline-block w-3 sm:w-4.5 lg:w-5" aria-hidden="true">
                    &nbsp;
                  </span>
                )}
                {word2 && (
                  <span className="text-[#80B3AD] italic font-normal">{word2}</span>
                )}
                {(phase === 'word1' || phase === 'word2') && (
                  <span className="inline-block w-1 sm:w-1.5 h-[0.75em] bg-[#80B3AD] ml-1.5 animate-pulse" />
                )}
              </div>

              {/* Line 2: Tomorrows */}
              <div className="inline-flex items-baseline">
                <span className="text-white">{word3}</span>
                {(phase === 'word3' || phase === 'pause') && (
                  <span className="inline-block w-1 sm:w-1.5 h-[0.75em] bg-[#80B3AD] ml-1.5 animate-pulse" />
                )}
              </div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed"
            >
              {companyInfo.subTagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <Link
                to="/projects"
                className="px-6 py-3.5 rounded-full bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-semibold text-xs tracking-wider uppercase shadow-lg active:scale-95 transition-all inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => openSiteVisit()}
                className="px-6 py-3.5 rounded-full border border-white/30 text-white hover:border-[#80B3AD] hover:text-[#80B3AD] text-xs font-semibold tracking-wider uppercase backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#80B3AD]" />
                <span>Book a Site Visit</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="relative z-10 border-t border-white/10 bg-[#111212]/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {companyInfo.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center ${
                    idx !== 0 ? 'md:border-l border-white/10' : ''
                  }`}
                >
                  <CounterNumber
                    end={stat.numericValue}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || '+'}
                    duration={2000}
                    className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#80B3AD]"
                  />
                  <span className="text-xs uppercase tracking-wider text-neutral-300 mt-1 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ABOUT SAYBA GROUP (SECOND SECTION, WITH VIDEO)
          ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-2xl border border-[#262828]">
          {/* Left Dark Content Box */}
          <div className="lg:col-span-6 bg-[#141515] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#80B3AD]">
              ABOUT SAYBA GROUP
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
              Building Trust <br />
              Creating Value
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Real estate isn't just about constructing physical spaces; it is about cultivating
              trust, fulfilling aspirations, and elevating communities. For over 22 years, Sayba
              Group has set benchmarks for architectural distinction, timely delivery, and transparent dealings across Mumbai.
            </p>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-semibold text-xs tracking-wider uppercase transition-all shadow cursor-pointer"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Video Preview Image */}
          <div className="lg:col-span-6 relative min-h-[340px] bg-neutral-900 group overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Sayba Clubhouse"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <button
                type="button"
                onClick={() => openVideo('Sayba Group - Building Trust, Creating Value')}
                aria-label="Watch Our Story"
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/90 text-brand-dark flex items-center justify-center pl-1 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-[#80B3AD] cursor-pointer"
              >
                <Play className="w-8 h-8 fill-brand-dark text-brand-dark" />
              </button>
              <span className="font-serif text-white text-lg font-semibold mt-4 drop-shadow-md">
                Watch Our Story
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. CARDS OF PROJECTS (FEATURED RESIDENTIAL PROJECTS)
          ======================================================== */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 pb-4 border-b border-[#DCE1DF]">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#80B3AD] block mb-1">
            PROJECTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            Featured Residential Projects
          </h2>
        </div>

        {/* Auto-scrolling Project Cards Carousel */}
        <ProjectsAutoScroll />

        {/* View All Projects Button (Placed under cards) */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-semibold text-xs tracking-wider uppercase shadow-md active:scale-95 transition-all group cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          4. MODERN AMENITIES - A BETTER WAY OF LIVING (SCROLL ANIMATION & 10s SHOWCASE)
          ======================================================== */}
      <ModernAmenitiesSection />

      {/* ========================================================
          5. LIFE AT SAYBA: 3D AUTO-SCROLL LIFESTYLE PILLARS
          ======================================================== */}
      <LifeAtSaybaCarousel />

      {/* ========================================================
          6. TESTIMONIALS: 3D AUTO-SCROLL VIDEO CLIENT STORIES
          ======================================================== */}
      <VideoTestimonialsSection />

      {/* ========================================================
          7. MAP SHOWING SAYBA PROJECTS & DETAILS ACROSS MUMBAI
          ======================================================== */}
      <ProjectsMapSection />
    </div>
  );
};

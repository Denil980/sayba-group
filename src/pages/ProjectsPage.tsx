import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '../components/common/ProjectCard';
import { projectsData } from '../data/projects';
import { ProjectStatus } from '../types';
import { useModal } from '../context/ModalContext';

export const ProjectsPage: React.FC = () => {
  const { openSiteVisit } = useModal();
  const [selectedFilter, setSelectedFilter] = useState<'All Projects' | ProjectStatus>('All Projects');

  // Scroll detection on the cards grid container
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const isCardsInView = useInView(cardsGridRef, { once: true, amount: 0.2 });
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [hasCompletedReveal, setHasCompletedReveal] = useState<boolean>(false);

  // Controlled sequential on-scroll reveal: 1 card every 700ms (500ms rise + 200ms pause)
  useEffect(() => {
    if (!isCardsInView || hasCompletedReveal) return;

    // Card 1 begins rising immediately when cards grid enters viewport
    setRevealedCount(1);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setRevealedCount(current);

      if (current >= projectsData.length) {
        clearInterval(interval);
        setHasCompletedReveal(true);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [isCardsInView, hasCompletedReveal]);

  const handleFilterChange = (filter: 'All Projects' | ProjectStatus) => {
    setSelectedFilter(filter);
    setHasCompletedReveal(true);
    setRevealedCount(99);
  };

  const filterTabs = [
    {
      key: 'All Projects' as const,
      label: 'All Projects',
      count: projectsData.length,
    },
    {
      key: 'Ongoing' as const,
      label: 'Ongoing',
      count: projectsData.filter((p) => p.status === 'Ongoing').length,
    },
    {
      key: 'Completed' as const,
      label: 'Completed',
      count: projectsData.filter((p) => p.status === 'Completed').length,
    },
    {
      key: 'Upcoming' as const,
      label: 'Upcoming / Future',
      count: projectsData.filter((p) => p.status === 'Upcoming').length,
    },
  ];

  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All Projects') {
      return projectsData;
    }
    return projectsData.filter((p) => p.status === selectedFilter);
  }, [selectedFilter]);

  // Framer Motion Animation Variants for Hero
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
      <section className="relative bg-[#0A1715] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Sayba Projects Architecture"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1715] via-[#0A1715]/80 to-transparent" />
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
              <Link to="/" className="hover:text-brand-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-gold font-medium">Our Projects</span>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white"
            >
              Our Projects
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed"
            >
              Explore our portfolio of premier residential landmarks combining contemporary
              architecture, OC-certified construction, and refined Mumbai living.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          FILTER BAR & ANIMATED ON-SCROLL PROJECTS GRID
          ======================================================== */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Filter Tabs with Sliding Active Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-2.5 mb-10 pb-6 border-b border-[#E5DFD1]"
        >
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleFilterChange(tab.key)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer select-none ${
                  isActive ? 'text-brand-gold' : 'text-neutral-600 hover:text-brand-dark'
                }`}
              >
                {/* Smooth sliding background pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-[#0A1715] rounded-full shadow-md -z-0"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                {/* Tab Label and Live Count Badge */}
                <span className="relative z-10 flex items-center gap-2">
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-bold transition-colors ${
                      isActive
                        ? 'bg-brand-gold/20 text-brand-gold'
                        : 'bg-white text-neutral-500 border border-[#E5DFD1]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Dynamic Animated Grid with Sequential On-Scroll Rise */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-2xl border border-[#E5DFD1]"
          >
            <p className="font-serif text-xl text-neutral-600">
              No projects found matching the selected status.
            </p>
            <button
              onClick={() => handleFilterChange('All Projects')}
              className="mt-4 text-xs font-bold uppercase tracking-wider text-brand-gold-dark hover:underline cursor-pointer"
            >
              View All Projects
            </button>
          </motion.div>
        ) : (
          <motion.div
            ref={cardsGridRef}
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                // Sequential reveal during initial scroll entrance
                const isRevealed = hasCompletedReveal || idx < revealedCount;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 55 }}
                    animate={
                      isRevealed
                        ? { opacity: 1, scale: 1, y: 0 }
                        : { opacity: 0, scale: 0.9, y: 55 }
                    }
                    exit={{ opacity: 0, scale: 0.88, y: -20 }}
                    transition={{
                      opacity: { duration: 0.45 },
                      scale: { duration: 0.45 },
                      y: { duration: 0.55, ease: 'easeOut' },
                      layout: { type: 'spring', stiffness: 350, damping: 28 },
                    }}
                    className="h-full"
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ========================================================
          INTERESTED IN OUR PROJECTS CTA BANNER
          ======================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#1A2E2A]">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="Sayba Clubhouse"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0A1715]/85 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 py-16 px-6 sm:px-12 text-center text-white space-y-4 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Interested in Our Projects?
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
              Schedule a personalized site visit and explore model residences with our senior property
              advisors.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openSiteVisit()}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-semibold text-xs tracking-wider uppercase shadow-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Book a Site Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

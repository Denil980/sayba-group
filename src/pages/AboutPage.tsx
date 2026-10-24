import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Eye,
  Target,
  ShieldCheck,
  Award,
  Lightbulb,
  Users,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { companyInfo } from '../data/company';
import { CounterNumber } from '../components/common/CounterNumber';
import { OurJourneyRoadmap } from '../components/common/OurJourneyRoadmap';
import { useModal } from '../context/ModalContext';

export const AboutPage: React.FC = () => {
  const { openVideo, openSiteVisit } = useModal();

  return (
    <div className="bg-brand-cream">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative bg-[#0A1715] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Sayba Grand Architecture"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1715] via-[#0A1715]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-brand-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-brand-gold">About Us</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
              Our Story
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 font-light max-w-2xl leading-relaxed">
              Building trust. Creating value. Shaping better communities.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          A LEGACY OF TRUST / THE STORY OF SAYBA GROUP
          ======================================================== */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Stats */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-gold-dark block">
              A LEGACY OF TRUST
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              The Story of Sayba Group
            </h2>

            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              At Sayba Group, we believe in creating more than just homes. We build spaces that
              inspire, nurture and elevate everyday living. With a strong foundation of trust, quality
              and customer-centric values, we have been delivering premium residential and commercial
              projects that stand the test of time.
            </p>

            <p className="text-sm text-neutral-600 leading-relaxed">
              From our humble beginnings in Mumbai to becoming one of the city's most respected
              lifestyle builders, our journey is defined by craftsmanship, punctuality, and an
              unrelenting commitment to architectural integrity.
            </p>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E5DFD1]">
              {companyInfo.detailedStats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <CounterNumber
                    end={stat.numericValue}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || '+'}
                    duration={2000}
                    className="font-serif text-3xl font-bold text-brand-gold-dark block"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E5DFD1] group aspect-[4/3] bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
                alt="Watch Our Story"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              {/* Video Play Trigger */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <button
                  type="button"
                  onClick={() => openVideo('Sayba Group - The Story of Our Journey')}
                  aria-label="Play Story Video"
                  className="w-18 h-18 rounded-full bg-white/90 text-brand-dark flex items-center justify-center pl-1 shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-brand-gold/60 cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-brand-dark text-brand-dark" />
                </button>
                <span className="font-serif text-white text-lg font-semibold mt-4 drop-shadow-md">
                  Watch Our Story
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          OUR VISION & OUR MISSION
          ======================================================== */}
      <section className="py-16 bg-[#F4EFE6] border-y border-[#E5DFD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="group relative bg-white rounded-2xl p-8 border border-[#E5DFD1] hover:border-brand-gold shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-5 overflow-hidden cursor-pointer">
              {/* Subtle top gold accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0 group-hover:bg-[#0A1715] group-hover:text-brand-gold group-hover:border-brand-gold group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300">
                <Eye className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-gold-dark transition-colors duration-300">
                  {companyInfo.vision.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors">
                  {companyInfo.vision.description}
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-white rounded-2xl p-8 border border-[#E5DFD1] hover:border-brand-gold shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex items-start gap-5 overflow-hidden cursor-pointer">
              {/* Subtle top gold accent bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-14 h-14 rounded-full bg-brand-cream border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark shrink-0 group-hover:bg-[#0A1715] group-hover:text-brand-gold group-hover:border-brand-gold group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300">
                <Target className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-gold-dark transition-colors duration-300">
                  {companyInfo.mission.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors">
                  {companyInfo.mission.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          OUR JOURNEY (ROADMAP WITH WAVY ROAD & ANIMATION)
          ======================================================== */}
      <OurJourneyRoadmap />

      {/* ========================================================
          OUR CORE VALUES
          ======================================================== */}
      <section className="py-20 bg-white border-t border-[#E5DFD1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              Our Core Values
            </h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.coreValues.map((value, idx) => {
              const icons = [ShieldCheck, Award, Lightbulb, Users];
              const Icon = icons[idx] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="group relative bg-[#FAF7F2] hover:bg-white rounded-2xl p-7 text-center border border-[#E5DFD1] hover:border-brand-gold shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center overflow-hidden cursor-pointer"
                >
                  {/* Top gold bar accent reveal on hover */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-20 h-1 bg-brand-gold rounded-b-full transition-all duration-300" />

                  {/* Icon Node */}
                  <div className="w-16 h-16 rounded-full bg-white border border-brand-gold/40 flex items-center justify-center text-brand-gold-dark mb-5 shadow-sm group-hover:bg-[#0A1715] group-hover:text-brand-gold group-hover:border-brand-gold group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-brand-dark group-hover:text-brand-gold-dark transition-colors duration-300 mb-1">
                    {value.title}
                  </h3>
                  <span className="text-xs font-semibold text-brand-gold-dark block mb-2 italic group-hover:scale-105 transition-transform duration-300">
                    "{value.subtitle}"
                  </span>
                  <p className="text-xs text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          COMMITTED TO A BETTER TOMORROW BANNER
          ======================================================== */}
      <section className="relative py-24 bg-[#0A1715] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
            alt="Cityscape"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0A1715]/80" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Committed to a Better Tomorrow
          </h2>
          <p className="text-base text-neutral-300">
            Thoughtfully designed communities for generations to come.
          </p>
          <div className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-bold text-xs tracking-wider uppercase shadow-xl hover:brightness-105 active:scale-95 transition-all"
            >
              <span>Explore Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

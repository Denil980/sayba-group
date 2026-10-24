import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Check,
  Calendar,
  Eye,
  Waves,
  Dumbbell,
  Building2,
  Trees,
  Smile,
  ShieldCheck,
  Gamepad2,
  Trophy,
  Maximize2,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { SiteVisitForm } from '../components/forms/SiteVisitForm';
import { useModal } from '../context/ModalContext';
import { LightboxModal } from '../components/common/LightboxModal';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openSiteVisit, openFloorPlan } = useModal();

  // Find project by slug or id, fallback to sayba-orchid
  const project =
    projectsData.find((p) => p.slug === id || p.id === id) || projectsData[0];

  const [activeTab, setActiveTab] = useState<'Overview' | 'Amenities' | 'Floor Plans' | 'Gallery' | 'Location'>('Overview');
  const [selectedFloorPlanIndex, setSelectedFloorPlanIndex] = useState(0);

  // Gallery category filter within the project page
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Exteriors' | 'Interiors' | 'Amenities' | 'Lifestyle'>('All');

  // Lightbox state for gallery
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const subNavTabs = ['Overview', 'Amenities', 'Floor Plans', 'Gallery', 'Location'] as const;

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
      case 'Smile':
        return Smile;
      case 'Gamepad2':
        return Gamepad2;
      case 'Trophy':
        return Trophy;
      default:
        return ShieldCheck;
    }
  };

  const currentFloorPlan = project.floorPlans[selectedFloorPlanIndex] || project.floorPlans[0];

  // Gallery items for this specific project
  const projectGalleryItems = useMemo(() => {
    if (project.galleryCategories && project.galleryCategories.length > 0) {
      return project.galleryCategories;
    }
    return project.images.map((img, idx) => ({
      category: (idx % 2 === 0 ? 'Exteriors' : 'Interiors') as 'Exteriors' | 'Interiors',
      url: img,
      caption: `${project.name} - View ${idx + 1}`,
    }));
  }, [project]);

  const filteredGalleryItems = useMemo(() => {
    if (galleryFilter === 'All') return projectGalleryItems;
    return projectGalleryItems.filter((item) => item.category === galleryFilter);
  }, [galleryFilter, projectGalleryItems]);

  const lightboxImages = useMemo(() => {
    return filteredGalleryItems.map((item) => ({
      url: item.url,
      title: item.caption,
      category: item.category,
    }));
  }, [filteredGalleryItems]);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* ========================================================
          HERO BANNER
          ======================================================== */}
      <section className="relative bg-[#0A1715] text-white pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1715] via-[#0A1715]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1715] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest">
              <Link to="/" className="hover:text-brand-gold transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-brand-gold transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-brand-gold">{project.name}</span>
            </div>

            {/* Title & Badge */}
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white">
                {project.name}
              </h1>
              <span className="px-3.5 py-1 text-xs font-semibold rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-md">
                {project.status}
              </span>
            </div>

            {/* Sub-meta: Location & Configuration */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-gold" />
                <span>{project.city}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
              <span>{project.configuration}</span>
              {project.reraNumber && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
                  <span className="text-neutral-400 text-xs">RERA: {project.reraNumber}</span>
                </>
              )}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openSiteVisit(project.name)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-semibold text-xs tracking-wider uppercase shadow-lg hover:brightness-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SUB-NAVIGATION TABS
          ======================================================== */}
      <section className="sticky top-[72px] z-20 bg-white border-b border-[#E5DFD1] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto no-scrollbar">
            {subNavTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  const el = document.getElementById(tab.toLowerCase().replace(/\s+/g, '-'));
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`py-4 text-xs uppercase font-bold tracking-wider transition-colors relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'text-brand-dark'
                    : 'text-neutral-500 hover:text-brand-dark'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />
                )}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ========================================================
          TWO-COLUMN MAIN CONTENT
          ======================================================== */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Project Details (Span 8) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview / About the Project */}
            <div id="overview" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                About the Project
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                {project.description}
              </p>

              {/* Project Highlights */}
              <div className="pt-4 border-t border-neutral-100">
                <h3 className="font-serif text-lg font-bold text-brand-dark mb-4">
                  Project Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold-dark shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-neutral-700">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Amenities */}
            <div id="amenities" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                    Key Amenities
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Designed to elevate health, recreation, and luxury family living.
                  </p>
                </div>
                <Link
                  to="/amenities"
                  className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark hover:underline flex items-center gap-1.5 w-fit"
                >
                  <span>View Dedicated Amenities Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.amenities.map((amenity, idx) => {
                  const Icon = getAmenityIcon(amenity.icon);
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DFD1] flex flex-col items-center text-center group hover:bg-white hover:border-brand-gold/40 transition-all shadow-none hover:shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-brand-gold/30 flex items-center justify-center text-brand-gold-dark mb-2.5 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-serif text-sm font-semibold text-brand-dark">
                        {amenity.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Banner linking to full amenities page */}
              <div className="p-4 rounded-xl bg-[#0A1715] text-white flex items-center justify-between gap-4 mt-2">
                <div className="text-xs">
                  <span className="text-brand-gold font-bold uppercase tracking-wider block">
                    Full Lifestyle Package
                  </span>
                  <span className="text-neutral-300">
                    Explore all 8+ integrated recreation and fitness facilities.
                  </span>
                </div>
                <Link
                  to="/amenities"
                  className="px-4 py-2 rounded-lg bg-brand-gold text-brand-dark text-xs font-bold uppercase tracking-wider hover:brightness-105 transition-all shrink-0"
                >
                  Explore Amenities
                </Link>
              </div>
            </div>

            {/* Floor Plans */}
            <div id="floor-plans" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                  Floor Plans
                </h2>

                {/* BHK Toggle Buttons */}
                <div className="flex items-center gap-2">
                  {project.floorPlans.map((fp, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFloorPlanIndex(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedFloorPlanIndex === idx
                          ? 'bg-[#0A1715] text-brand-gold shadow'
                          : 'bg-[#FAF7F2] text-neutral-600 hover:text-brand-dark border border-[#E5DFD1]'
                      }`}
                    >
                      {fp.bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floor Plan Display Card */}
              <div className="bg-[#FAF7F2] rounded-xl p-6 border border-[#E5DFD1] flex flex-col md:flex-row items-center gap-8">
                {/* Blueprint Diagram Box */}
                <div className="w-full md:w-1/2 aspect-[4/3] bg-[#0A1715] rounded-xl p-4 flex flex-col justify-between border border-[#1A2E2A] text-white">
                  <div className="flex justify-between items-center text-[11px] text-brand-gold font-mono border-b border-white/10 pb-2">
                    <span>{currentFloorPlan.type}</span>
                    <span>{currentFloorPlan.carpetArea}</span>
                  </div>

                  {/* Architectural Graphic */}
                  <div className="my-auto border border-dashed border-emerald-500/40 rounded p-4 text-center space-y-2 bg-[#0d221e]">
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-300">
                      <div className="border border-emerald-500/30 p-2 rounded">
                        Living & Dining Room
                      </div>
                      <div className="border border-emerald-500/30 p-2 rounded">
                        Master Bedroom
                      </div>
                      <div className="border border-emerald-500/30 p-2 rounded">
                        Modular Kitchen
                      </div>
                      <div className="border border-emerald-500/30 p-2 rounded">
                        Balcony Deck
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-400 text-center font-mono">
                    Official Architectural Blueprint
                  </div>
                </div>

                {/* Specs & View Plan CTA */}
                <div className="w-full md:w-1/2 space-y-4">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">
                      {currentFloorPlan.type}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Carpet Area: <span className="font-semibold text-brand-dark">{currentFloorPlan.carpetArea}</span>
                    </p>
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {currentFloorPlan.description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      openFloorPlan({
                        title: project.name,
                        bhk: currentFloorPlan.bhk,
                        area: currentFloorPlan.carpetArea,
                        image: currentFloorPlan.image,
                      })
                    }
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-gold/15 hover:bg-brand-gold text-brand-gold-dark hover:text-brand-dark text-xs font-bold uppercase tracking-wider transition-all border border-brand-gold/40 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View Plan +</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comprehensive In-Page Project Gallery (Per Request) */}
            <div id="gallery" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                    Project Gallery
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Photographs and architectural views of {project.name}.
                  </p>
                </div>

                {/* Category Filter Tabs right within the Project Gallery */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {(['All', 'Exteriors', 'Interiors', 'Amenities', 'Lifestyle'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setGalleryFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                          galleryFilter === cat
                            ? 'bg-[#0A1715] text-brand-gold shadow'
                            : 'bg-[#FAF7F2] text-neutral-600 hover:text-brand-dark border border-[#E5DFD1]'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredGalleryItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentImageIndex(idx);
                      setIsLightboxOpen(true);
                    }}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-[#E5DFD1] bg-neutral-900 shadow-sm hover:shadow-md"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-black/60 text-brand-gold backdrop-blur-sm border border-brand-gold/30">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                        <Eye className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-semibold line-clamp-1 drop-shadow">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div id="location" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD1] shadow-sm space-y-6 scroll-mt-28">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Location
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Map Graphic Preview */}
                <div className="md:col-span-7 bg-[#EFECE6] rounded-xl overflow-hidden border border-[#E5DFD1] relative aspect-[4/3] flex items-center justify-center">
                  <iframe
                    title="Sayba Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8358485293414!2d72.87635957597148!3d19.07095695213601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c89736c5615d%3A0xb35a51cf32490ec!2sKurla%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0 filter contrast-90"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#0A1715]/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-sm border border-brand-gold/30 flex items-center gap-1.5 shadow">
                    <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Location Bullet Points */}
                <div className="md:col-span-5 space-y-3.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 block">
                        Prime Location
                      </span>
                      <span className="text-xs text-neutral-500">{project.address}</span>
                    </div>
                  </div>

                  {project.locationPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-100">
                      <span className="text-neutral-700 font-medium">{pt.name}</span>
                      <span className="font-bold text-brand-gold-dark">{pt.distance}</span>
                    </div>
                  ))}

                  <div className="pt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        project.address
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-gold-dark hover:underline"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Schedule a Site Visit Form (Span 4) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#0A1715] text-white p-6 sm:p-8 rounded-2xl border border-brand-gold/30 shadow-2xl space-y-5">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Schedule a Site Visit
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  Fill in your details and our team will get in touch with you shortly.
                </p>
              </div>

              {/* Form Component */}
              <SiteVisitForm initialProject={project.name} compact={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery previews */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={lightboxImages}
        currentIndex={currentImageIndex}
        onNext={() => setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length)}
        onPrev={() =>
          setCurrentImageIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length)
        }
      />
    </div>
  );
};

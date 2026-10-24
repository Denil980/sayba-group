import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ExternalLink,
  Navigation,
  ArrowRight,
  Building,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import { useModal } from '../../context/ModalContext';

interface ProjectsMapSectionProps {
  customMapUrl?: string; // Optional URL provided by the user
}

export const ProjectsMapSection: React.FC<ProjectsMapSectionProps> = ({
  customMapUrl,
}) => {
  const { openSiteVisit } = useModal();
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);

  const selectedProject =
    projectsData.find((p) => p.id === selectedProjectId) || projectsData[0];

  // Specific coordinates and map embeds for each Mumbai project
  const projectEmbedMaps: Record<string, string> = {
    'sayba-orchid':
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8358485293414!2d72.87635957597148!3d19.07095695213601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c89736c5615d%3A0xb35a51cf32490ec!2sKurla%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'sayba-heights':
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2185542880527!2d72.84888997597116!3d19.06201655266205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92476579297%3A0x600c6d71b86940a6!2sBandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'sayba-residency':
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.503460830493!2d72.89552397597086!3d19.049457553053424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8bb256b8253%3A0x7d87f739669e25d2!2sChembur%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'sayba-enclave':
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.6272655385637!2d72.90561597597167!3d19.08014555184976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7ce3b690855%3A0xb351586a1112d7f8!2sGhatkopar%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'sayba-greens':
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.483984537676!2d73.11182397596996!3d19.006245554399723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e8417937397b%3A0xcd50ad970d426471!2sPanvel%2C%20Navi%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    'sayba-towers':
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.344445353049!2d72.81432397596918!3d18.96814555558129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce6826622839%3A0x673c68a419266395!2sWorli%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  };

  const currentEmbedUrl =
    customMapUrl || projectEmbedMaps[selectedProject.id] || projectEmbedMaps['sayba-orchid'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-emerald-500/20 text-emerald-800 border-emerald-500/40';
      case 'Completed':
        return 'bg-amber-500/20 text-amber-800 border-amber-500/40';
      case 'Upcoming':
        return 'bg-sky-500/20 text-sky-800 border-sky-500/40';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-[#E5DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-brand-gold-dark block mb-2">
            STRATEGIC PRESENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            Projects Across Mumbai
          </h2>
          <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-3 mb-4" />
          <p className="text-sm text-neutral-600 leading-relaxed">
            Explore the prime locations of Sayba Group residential developments spanning Kurla,
            Bandra East, Chembur, Ghatkopar, Worli, and Panvel. Select any project to see its location details.
          </p>
        </div>

        {/* Project Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {projectsData.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A1715] text-brand-gold shadow-md scale-105'
                    : 'bg-white text-neutral-700 hover:text-brand-dark border border-[#E5DFD1] hover:border-brand-gold/40'
                }`}
              >
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-brand-gold' : 'text-neutral-400'
                  }`}
                />
                <span>{project.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/10 text-white' : 'bg-neutral-100 text-neutral-500'
                  }`}
                >
                  {project.location.split(',')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Map and Project Detail Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#E5DFD1] shadow-xl">
          {/* Left Column: Interactive Map Frame (Span 7) */}
          <div className="lg:col-span-7 flex flex-col min-h-[420px] lg:min-h-[500px] rounded-2xl overflow-hidden border border-[#E5DFD1] relative bg-[#EAE6DE]">
            <iframe
              title={`Map of ${selectedProject.name}`}
              src={currentEmbedUrl}
              className="w-full h-full min-h-[420px] lg:min-h-[500px] border-0 filter contrast-[0.95]"
              loading="lazy"
              allowFullScreen
            />

            {/* Floating Quick Location Badge */}
            <div className="absolute top-4 left-4 bg-[#0A1715]/90 text-white px-4 py-2.5 rounded-xl text-xs font-semibold backdrop-blur-md border border-brand-gold/30 shadow-lg flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-white block">
                  {selectedProject.name}
                </span>
                <span className="text-[11px] text-neutral-300">
                  {selectedProject.location}
                </span>
              </div>
            </div>

            {/* Direct Google Maps Link Overlay Button */}
            <div className="absolute bottom-4 right-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${selectedProject.name} ${selectedProject.address}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-white/95 text-brand-dark text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-brand-dark hover:text-white transition-all flex items-center gap-1.5 border border-neutral-200"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-gold-dark" />
              </a>
            </div>
          </div>

          {/* Right Column: Selected Project Detail Card (Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 p-2 sm:p-4">
            <div className="space-y-4">
              {/* Project Image & Status */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-[#E5DFD1]">
                <img
                  src={selectedProject.heroImage}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md shadow-sm ${getStatusBadge(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Title, Configuration & Location */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                  {selectedProject.name}
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-gold-dark mt-1">
                  <span>{selectedProject.configuration}</span>
                  <span>•</span>
                  <span>{selectedProject.carpetAreaRange}</span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                  <span>{selectedProject.address}</span>
                </p>
              </div>

              {/* Tagline & Description snippet */}
              <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2">
                {selectedProject.description}
              </p>

              {/* Strategic Connectivity Points */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-2 flex items-center gap-1.5">
                  <Navigation className="w-3 h-3 text-brand-gold" /> Nearby Proximity & Transit
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.locationPoints.slice(0, 4).map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E5DFD1] text-xs"
                    >
                      <span className="text-neutral-500 text-[10px] block line-clamp-1">
                        {pt.name}
                      </span>
                      <span className="font-bold text-brand-dark block mt-0.5">
                        {pt.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
              <Link
                to={`/projects/${selectedProject.slug}`}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-white hover:bg-neutral-50 text-brand-dark border border-[#E5DFD1] text-xs font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => openSiteVisit(selectedProject.name)}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-bold text-xs uppercase tracking-wider text-center shadow hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Site Visit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = '' }) => {
  // Status badge colors matching the design image
  const getBadgeStyle = (status: Project['status']) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'Completed':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Upcoming':
        return 'bg-sky-50 text-sky-700 border-sky-200/80';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  const getBadgeDotColor = (status: Project['status']) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-emerald-500 animate-pulse';
      case 'Completed':
        return 'bg-amber-500';
      case 'Upcoming':
        return 'bg-sky-500';
      default:
        return 'bg-neutral-400';
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden border border-[#E5DFD1] hover:border-brand-gold/70 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out flex flex-col h-full cursor-pointer ${className}`}
    >
      {/* Top Gold Accent Bar on Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Project Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
        <img
          src={project.heroImage}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

        {/* Status Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md shadow-sm transition-transform duration-300 group-hover:scale-105 ${getBadgeStyle(
              project.status
            )}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${getBadgeDotColor(project.status)}`} />
            {project.status}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Project Title */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-gold-dark transition-colors duration-300 line-clamp-1">
            {project.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-neutral-500 text-sm mt-1 mb-2.5">
            <MapPin className="w-4 h-4 text-brand-gold shrink-0 group-hover:scale-110 transition-transform" />
            <span className="line-clamp-1">{project.city}</span>
          </div>

          {/* Configuration */}
          <p className="text-sm font-medium text-neutral-600 line-clamp-1">
            {project.configuration}
          </p>
        </div>

        {/* View Details Link */}
        <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 group-hover:text-brand-gold-dark transition-all duration-300"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

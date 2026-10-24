import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { projectsData } from '../../data/projects';

export const ProjectsAutoScroll: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  // Duplicate the projects array to create a seamless infinite scroll loop
  const displayProjects = [...projectsData, ...projectsData];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.8; // Smooth luxury scroll speed

    const step = () => {
      if (!isHovered && container) {
        container.scrollLeft += scrollSpeed;

        // When halfway through the duplicated content, wrap back seamlessly
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationFrameRef.current = requestAnimationFrame(step);
    };

    animationFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = 340;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Scrollable Project Cards Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProjects.map((project, index) => (
          <div
            key={`${project.id}-${index}`}
            className="w-[280px] sm:w-[320px] lg:w-[340px] shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Left Navigation Chevron Button */}
      <button
        type="button"
        onClick={() => handleManualScroll('left')}
        aria-label="Scroll left"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-11 h-11 rounded-full bg-white/95 text-brand-dark shadow-xl border border-[#DCE1DF] hover:bg-brand-dark hover:text-brand-gold flex items-center justify-center transition-all z-20 opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Navigation Chevron Button */}
      <button
        type="button"
        onClick={() => handleManualScroll('right')}
        aria-label="Scroll right"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-11 h-11 rounded-full bg-white/95 text-brand-dark shadow-xl border border-[#DCE1DF] hover:bg-brand-dark hover:text-brand-gold flex items-center justify-center transition-all z-20 opacity-90 hover:opacity-100 hover:scale-110 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { companyInfo } from '../../data/company';
import { projectsData } from '../../data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141515] text-neutral-300 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Logo & Brand Summary (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="light" size="lg" />

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm">
              {companyInfo.subTagline}
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#80B3AD] text-[#141515] hover:bg-white hover:scale-110 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#80B3AD] text-[#141515] hover:bg-white hover:scale-110 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#80B3AD] text-[#141515] hover:bg-white hover:scale-110 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#80B3AD] text-[#141515] hover:bg-white hover:scale-110 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-10 h-10 rounded-full bg-[#80B3AD] text-[#141515] hover:bg-white hover:scale-110 shadow-md flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link to="/amenities" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>Amenities</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>Blog & Insights</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span>Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Projects (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              Our Projects
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {projectsData.map((project) => (
                <li key={project.id}>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="text-neutral-400 hover:text-brand-gold transition-colors inline-flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-gold/70 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{project.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">
              Contact Info
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-brand-gold transition-colors"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p>{companyInfo.workingHours.weekdays}</p>
                  <p>{companyInfo.workingHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2024 Sayba Group. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/careers" className="hover:text-neutral-300 transition-colors">
              Careers
            </Link>
            <span>|</span>
            <Link to="/privacy-policy" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms-conditions" className="hover:text-neutral-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

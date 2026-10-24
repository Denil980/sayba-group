import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { companyInfo } from '../../data/company';
import { useModal } from '../../context/ModalContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openSiteVisit } = useModal();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Amenities', path: '/amenities' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Floating Pill-Shaped Navbar Container */}
      <header
        className={`fixed left-0 right-0 z-40 px-3 sm:px-6 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'top-2 sm:top-3.5' : 'top-3 sm:top-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-full pointer-events-auto relative overflow-hidden backdrop-blur-md transition-all duration-300 ${
            isScrolled
              ? 'py-2 sm:py-2.5 px-3 sm:px-5 shadow-[0_14px_45px_rgba(0,0,0,0.6)] border border-white/25'
              : 'py-2.5 sm:py-3 px-3.5 sm:px-6 shadow-[0_10px_35px_rgba(0,0,0,0.45)] border border-white/20'
          }`}
          style={{
            background:
              'linear-gradient(90deg, #FFFFFF 0%, #F4F5F6 14%, #C7CECD 25%, #596562 40%, #1F2B28 56%, #0C1816 74%, #050D0C 100%)',
          }}
        >
          {/* Subtle Top Glass Hairline */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-white via-white/50 to-white/10 pointer-events-none" />

          <div className="flex items-center justify-between relative z-10 gap-3">
            {/* Logo on the left (integrated naturally into the white / golden-ivory zone) */}
            <div className="flex-shrink-0">
              <BrandLogo variant="seamless" size="md" />
            </div>

            {/* Desktop Navigation Links (positioned across the smooth dark fade zone) */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs tracking-wider uppercase font-medium transition-all duration-200 px-3.5 py-1.5 rounded-full ${
                      isActive
                        ? 'text-brand-gold font-semibold bg-white/10 border border-brand-gold/40 shadow-sm'
                        : 'text-neutral-200 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Items: Book a Site Visit Button */}
            <div className="hidden sm:flex items-center flex-shrink-0">
              <button
                type="button"
                onClick={() => openSiteVisit()}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-semibold text-xs tracking-wider uppercase shadow-[0_2px_14px_rgba(197,164,103,0.35)] hover:shadow-[0_4px_20px_rgba(197,164,103,0.5)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                Book a Site Visit
              </button>
            </div>

            {/* Mobile Actions: Mini CTA + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => openSiteVisit()}
                className="sm:hidden px-3 py-1.5 rounded-full bg-gradient-to-r from-[#DFCA95] to-[#B59353] text-[#0A1715] font-semibold text-[11px] tracking-wider uppercase shadow-sm"
              >
                Site Visit
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-brand-gold rounded-full bg-black/30 hover:bg-black/50 border border-white/10 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Styled as floating luxury panel below pill navbar) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Floating Drawer Panel */}
          <div className="fixed top-[74px] sm:top-[82px] left-3 sm:left-6 right-3 sm:right-6 max-w-7xl mx-auto bg-[#0A1715]/95 backdrop-blur-xl border border-[#DFC995]/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between max-h-[82vh] overflow-y-auto">
            <div className="pb-4 mb-2 border-b border-white/10 flex items-center justify-between">
              <BrandLogo variant="seamless" size="sm" />
              <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-medium">
                Luxury Living
              </span>
            </div>

            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base font-serif tracking-wide py-2 px-3 rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-brand-gold font-bold bg-white/5 border border-brand-gold/20'
                        : 'text-neutral-200 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold opacity-60" />
                </NavLink>
              ))}
            </nav>

            <div className="pt-5 mt-4 space-y-3 border-t border-[#1F3A35]">
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-neutral-200 text-sm font-medium border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>Call Us: {companyInfo.phone}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSiteVisit();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-bold text-sm tracking-wide uppercase text-center shadow-lg hover:brightness-105 transition-all"
              >
                Book a Site Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

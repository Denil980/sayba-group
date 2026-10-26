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

  const isHomePage = location.pathname === '/';
  const [showNavbar, setShowNavbar] = useState(!isHomePage);

  useEffect(() => {
    if (!isHomePage) {
      setShowNavbar(true);
      const handleScrollOther = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScrollOther, { passive: true });
      return () => window.removeEventListener('scroll', handleScrollOther);
    }

    const checkHeroVisibility = () => {
      const heroEl = document.getElementById('main-content');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Reveal navbar as soon as the hero section starts entering the viewport
        const isHeroReached = rect.top <= window.innerHeight * 0.65;
        setShowNavbar(isHeroReached);
      } else {
        // Fallback for scroll threshold past cinematic reveal
        setShowNavbar(window.scrollY > window.innerHeight * 1.5);
      }
      setIsScrolled(window.scrollY > 20);
    };

    // Run check on mount and whenever location/viewport changes
    checkHeroVisibility();
    window.addEventListener('scroll', checkHeroVisibility, { passive: true });
    window.addEventListener('resize', checkHeroVisibility);

    return () => {
      window.removeEventListener('scroll', checkHeroVisibility);
      window.removeEventListener('resize', checkHeroVisibility);
    };
  }, [isHomePage, location.pathname]);

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
        className={`fixed left-0 right-0 z-40 px-3 sm:px-6 transition-all duration-500 ease-out pointer-events-none ${
          !showNavbar
            ? '-translate-y-28 opacity-0 pointer-events-none'
            : isScrolled
            ? 'top-2 sm:top-3.5 translate-y-0 opacity-100'
            : 'top-3 sm:top-5 translate-y-0 opacity-100'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto rounded-full pointer-events-auto relative overflow-hidden backdrop-blur-md transition-all duration-300 bg-white/95 border border-[#DCE1DF] ${
            isScrolled
              ? 'py-2 sm:py-2.5 px-3 sm:px-5 shadow-[0_10px_30px_rgba(20,21,21,0.12)]'
              : 'py-2.5 sm:py-3 px-3.5 sm:px-6 shadow-[0_6px_25px_rgba(20,21,21,0.08)]'
          }`}
        >
          <div className="flex items-center justify-between relative z-10 gap-3">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <BrandLogo variant="seamless" size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs tracking-wider uppercase font-semibold transition-all duration-200 px-3.5 py-1.5 rounded-full ${
                      isActive
                        ? 'text-brand-dark font-bold bg-[#EDF6F5] border border-[#80B3AD]/70 shadow-xs'
                        : 'text-neutral-700 hover:text-brand-dark hover:bg-neutral-100'
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
                className="px-5 py-2.5 rounded-full bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-bold text-xs tracking-wider uppercase shadow-[0_2px_14px_rgba(128,179,173,0.4)] hover:shadow-[0_4px_20px_rgba(128,179,173,0.55)] hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                Book a Site Visit
              </button>
            </div>

            {/* Mobile Actions: Mini CTA + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => openSiteVisit()}
                className="sm:hidden px-3 py-1.5 rounded-full bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-bold text-[11px] tracking-wider uppercase shadow-sm"
              >
                Site Visit
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-800 hover:text-brand-dark rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu (Styled as floating luxury panel below pill navbar) */}
      {isMobileMenuOpen && showNavbar && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Floating Drawer Panel */}
          <div className="fixed top-[74px] sm:top-[82px] left-3 sm:left-6 right-3 sm:right-6 max-w-7xl mx-auto bg-[#141515]/95 backdrop-blur-xl border border-[#80B3AD]/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between max-h-[82vh] overflow-y-auto">
            <div className="pb-4 mb-2 border-b border-white/10 flex items-center justify-between">
              <BrandLogo variant="seamless" size="sm" />
              <span className="text-[10px] tracking-[0.25em] text-[#80B3AD] uppercase font-semibold">
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
                        ? 'text-[#80B3AD] font-bold bg-white/5 border border-[#80B3AD]/30'
                        : 'text-neutral-200 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-[#80B3AD] opacity-70" />
                </NavLink>
              ))}
            </nav>

            <div className="pt-5 mt-4 space-y-3 border-t border-white/10">
              <a
                href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-neutral-200 text-sm font-medium border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#80B3AD]" />
                <span>Call Us: {companyInfo.phone}</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openSiteVisit();
                }}
                className="w-full py-3.5 rounded-xl bg-[#80B3AD] hover:bg-[#609A93] text-[#141515] font-bold text-sm tracking-wide uppercase text-center shadow-lg hover:brightness-105 transition-all"
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

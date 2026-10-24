import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SiteVisitModal } from '../common/SiteVisitModal';
import { VideoModal } from '../common/VideoModal';
import { FloorPlanModal } from '../common/FloorPlanModal';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top automatically whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#141515] text-[#141515]">
      <Navbar />
      <main className="flex-grow pt-0">
        <Outlet />
      </main>
      <Footer />
      {/* Global Modals accessible anywhere in the app */}
      <SiteVisitModal />
      <VideoModal />
      <FloorPlanModal />
    </div>
  );
};

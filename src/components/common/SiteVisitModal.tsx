import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CalendarCheck2 } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { SiteVisitForm } from '../forms/SiteVisitForm';

export const SiteVisitModal: React.FC = () => {
  const { isSiteVisitOpen, closeSiteVisit, selectedProject } = useModal();

  return (
    <AnimatePresence>
      {isSiteVisitOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSiteVisit}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg bg-gradient-to-b from-[#FAF5EB] via-[#F4ECE0] to-[#FAF5EB] border border-[#DFCA95]/80 rounded-3xl shadow-2xl p-5 sm:p-7 z-10 text-brand-dark my-auto max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={closeSiteVisit}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 p-2 text-neutral-500 hover:text-brand-dark rounded-full bg-black/5 hover:bg-black/10 transition-colors cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-4 shrink-0">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#DFCA95] text-brand-gold-dark mb-2 shadow-sm">
                <CalendarCheck2 className="w-5 h-5 text-brand-gold-dark" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                Book a Site Visit
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-0.5 max-w-sm mx-auto leading-relaxed">
                {selectedProject
                  ? `Experience ${selectedProject} in person with a guided architectural walkthrough.`
                  : 'Experience our premium residences in person with our property specialists.'}
              </p>
            </div>

            {/* Form */}
            <div className="overflow-y-auto flex-1 pr-1 -mr-1">
              <SiteVisitForm initialProject={selectedProject} onSuccess={closeSiteVisit} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

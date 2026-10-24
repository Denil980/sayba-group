import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, Check } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export const FloorPlanModal: React.FC = () => {
  const { floorPlanData, closeFloorPlan, openSiteVisit } = useModal();

  if (!floorPlanData) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFloorPlan}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-brand-cream border border-brand-cream-border rounded-2xl shadow-2xl overflow-hidden z-10 text-brand-dark my-6 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-cream-border bg-white">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-brand-gold-dark">
                Architectural Floor Plan
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-dark">
                {floorPlanData.title} ({floorPlanData.bhk})
              </h3>
            </div>
            <button
              onClick={closeFloorPlan}
              className="p-2 text-neutral-500 hover:text-brand-dark rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Blueprint & Visualizer Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div className="relative bg-[#0d1f1c] rounded-xl p-8 flex flex-col items-center justify-center border border-[#1f3a35] shadow-inner min-h-[350px]">
              {/* Floor Plan Blueprint Graphic / Architectural SVG */}
              <div className="w-full max-w-md bg-[#122824] border border-[#2b4d46] rounded-lg p-6 text-emerald-100 text-xs font-mono space-y-3 relative shadow-2xl">
                <div className="flex justify-between border-b border-[#2b4d46] pb-2 text-brand-gold">
                  <span>RESIDENTIAL UNIT: {floorPlanData.bhk}</span>
                  <span>CARPET: {floorPlanData.area}</span>
                </div>
                
                {/* SVG Blueprint Representation */}
                <div className="aspect-[4/3] w-full border border-dashed border-[#3a665d] rounded p-4 flex flex-col justify-between relative bg-[#091714]">
                  <div className="flex gap-2 h-1/2">
                    <div className="w-2/3 border border-[#488277] p-2 flex flex-col justify-between bg-[#112d27]/50">
                      <span className="text-[10px] text-amber-200">MASTER BEDROOM</span>
                      <span className="text-[9px] text-emerald-400">12'0" x 14'6"</span>
                    </div>
                    <div className="w-1/3 border border-[#488277] p-2 flex flex-col justify-between bg-[#112d27]/30">
                      <span className="text-[10px] text-amber-200">EN-SUITE</span>
                      <span className="text-[9px] text-emerald-400">8'0" x 5'6"</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 h-1/2 mt-2">
                    <div className="w-3/5 border border-[#488277] p-2 flex flex-col justify-between bg-[#112d27]/40">
                      <span className="text-[10px] text-amber-200">LIVING & DINING</span>
                      <span className="text-[9px] text-emerald-400">14'0" x 20'0"</span>
                    </div>
                    <div className="w-2/5 border border-[#488277] p-2 flex flex-col justify-between bg-[#112d27]/30">
                      <span className="text-[10px] text-amber-200">MODULAR KITCHEN</span>
                      <span className="text-[9px] text-emerald-400">9'0" x 10'6"</span>
                    </div>
                  </div>

                  {/* Balcony indicator */}
                  <div className="absolute -bottom-3 right-8 bg-brand-gold text-brand-dark px-2 py-0.5 text-[9px] font-bold rounded">
                    SUN DECK BALCONY
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-2">
                  <span>Vastu Compliant: North-East Facing</span>
                  <span>High-speed optical fiber ready</span>
                </div>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 rounded-xl border border-brand-cream-border">
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Typology</span>
                <span className="font-semibold text-brand-dark text-base">{floorPlanData.bhk}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Carpet Area</span>
                <span className="font-semibold text-brand-dark text-base">{floorPlanData.area}</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Balcony / Deck</span>
                <span className="font-semibold text-brand-dark text-base">Attached</span>
              </div>
              <div>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block">Flooring</span>
                <span className="font-semibold text-brand-dark text-base">Italian Marble</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:px-6 bg-white border-t border-brand-cream-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => alert('Downloading official high-resolution architectural PDF brochure...')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50 transition-colors"
            >
              <Download className="w-4 h-4 text-brand-dark" />
              <span>Download PDF Brochure</span>
            </button>
            <button
              onClick={() => {
                closeFloorPlan();
                openSiteVisit(floorPlanData.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#DFCA95] via-[#C5A467] to-[#B59353] text-[#0A1715] font-semibold text-sm shadow hover:brightness-105 transition-all cursor-pointer"
            >
              <span>Book Site Visit for this Plan</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

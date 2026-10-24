import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; title: string; category?: string }[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}) => {
  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-6xl max-h-[95vh] flex flex-col items-center">
          {/* Top Bar */}
          <div className="w-full flex items-center justify-between text-white pb-3 px-2">
            <div>
              <p className="font-serif text-lg sm:text-xl font-medium">{currentImage.title}</p>
              {currentImage.category && (
                <span className="text-xs uppercase tracking-widest text-brand-gold">
                  {currentImage.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-400">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image with Navigation Arrows */}
          <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl bg-black">
            <motion.img
              key={currentImage.url}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={currentImage.url}
              alt={currentImage.title}
              className="max-h-[75vh] w-auto max-w-full object-contain select-none"
            />

            {/* Left Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-white rounded-full bg-black/50 hover:bg-black/80 hover:scale-110 transition-all border border-white/10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-white rounded-full bg-black/50 hover:bg-black/80 hover:scale-110 transition-all border border-white/10"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

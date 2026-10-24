import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { useModal } from '../../context/ModalContext';

export const VideoModal: React.FC = () => {
  const { isVideoOpen, closeVideo, videoTitle } = useModal();

  return (
    <AnimatePresence>
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl bg-brand-dark border border-brand-gold/30 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-dark-border bg-brand-dark-surface">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Play className="w-4 h-4 fill-brand-gold" />
                </div>
                <h4 className="font-serif text-lg text-white font-medium">
                  {videoTitle || 'Sayba Group — Watch Our Story'}
                </h4>
              </div>
              <button
                onClick={closeVideo}
                className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1"
                title="Sayba Group Showcase Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer Notes */}
            <div className="p-4 bg-brand-dark-surface text-xs text-neutral-400 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span>A legacy of architectural excellence, customer trust, and craftsmanship since 2010.</span>
              <span className="text-brand-gold">RERA Approved Developer</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; title: string; category?: string; description?: string }[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  const currentItem = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-3 sm:p-6 md:p-8 select-none overflow-hidden"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10 w-full pt-1">
            <div className="text-luxe-ivory max-w-[70%]">
              <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-luxe-gold block">
                {currentItem.category || 'Gallery Portfolio'}
              </span>
              <h4 className="font-serif text-sm sm:text-lg md:text-2xl text-white truncate">
                {currentItem.title}
              </h4>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-[11px] sm:text-xs text-stone-400 font-light tracking-wider font-mono">
                {currentIndex + 1} / {images.length}
              </span>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-stone-200 hover:text-white hover:border-luxe-gold transition-colors active:scale-95"
                aria-label="Close image lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image View */}
          <div className="relative flex-1 flex items-center justify-center my-2 sm:my-4 overflow-hidden w-full">
            {currentIndex > 0 && (
              <button
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-1 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-luxe-gold hover:border-luxe-gold transition-all active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}

            <motion.div
              key={currentItem.url}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-full max-w-4xl max-h-[65vh] sm:max-h-[75vh]"
            >
              <Image
                src={currentItem.url}
                alt={currentItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className="object-contain"
                priority
              />
            </motion.div>

            {currentIndex < images.length - 1 && (
              <button
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-1 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-luxe-gold hover:border-luxe-gold transition-all active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          {currentItem.description && (
            <div className="text-center text-[11px] sm:text-xs md:text-sm text-stone-300 font-light max-w-xl mx-auto line-clamp-2 px-2 pb-1">
              {currentItem.description}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

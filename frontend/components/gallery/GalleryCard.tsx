'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { GalleryItem } from '@/types';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  onClick: () => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.25) }}
      onClick={onClick}
      className="group relative h-48 sm:h-72 md:h-80 lg:h-96 w-full cursor-pointer overflow-hidden border border-luxe-border bg-stone-100"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Persistent subtle category badge on mobile */}
      <div className="absolute top-2 left-2 pointer-events-none md:hidden">
        <span className="text-[8px] uppercase tracking-wider text-luxe-gold font-semibold bg-black/75 px-1.5 py-0.5 backdrop-blur-xs">
          {item.category}
        </span>
      </div>

      {/* Overlay on hover/desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-5 md:p-6">
        <div className="flex justify-between items-start">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold font-semibold bg-black/60 px-2 py-0.5">
            {item.category}
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div>
          <h4 className="font-serif text-sm sm:text-lg md:text-xl text-white font-normal line-clamp-1">
            {item.title}
          </h4>
          {item.description && (
            <p className="text-[10px] sm:text-xs text-stone-300 font-light mt-0.5 line-clamp-2 hidden sm:block">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

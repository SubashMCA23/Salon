'use client';

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { Lightbox } from '@/components/ui/Lightbox';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { GalleryItem } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Men', 'Hair', 'Beauty', 'Bridal', 'Salon'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await api.getGallery(selectedCategory);
        setItems(data);
      } catch (err) {
        console.error('Failed to load gallery items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  const lightboxImages = items.map((item) => ({
    url: item.image,
    title: item.title,
    category: item.category,
    description: item.description,
  }));

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-luxe-ivory w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="PORTFOLIO"
          title="The Couture Gallery"
          subtitle="Explore curated glimpses of executive barbering, bridal transformations, editorial hair styling, and private salon sanctuaries."
        />

        {/* Filter Tabs with horizontal scrolling support on small mobile */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 sm:mb-12 gap-1.5 sm:gap-2.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all duration-200 font-medium whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-luxe-charcoal text-luxe-gold-light shadow-xs font-semibold'
                  : 'bg-white border border-luxe-border text-luxe-muted hover:border-luxe-gold hover:text-luxe-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid: 2 cols on mobile, 3 cols on tablet/desktop */}
        {loading ? (
          <Loader message="Loading portfolio..." />
        ) : items.length === 0 ? (
          <EmptyState
            title="No Images in This Category"
            description="We are constantly updating our portfolio with recent client transformations."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
            {items.map((item, idx) => (
              <GalleryCard
                key={item._id}
                item={item}
                index={idx}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Button href="/gallery" variant="outline" size="md" className="w-full sm:w-auto">
            Explore All Gallery Photographs
          </Button>
        </div>

        {/* Fullscreen Lightbox */}
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          images={lightboxImages}
          currentIndex={lightboxIndex || 0}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </div>
    </section>
  );
};

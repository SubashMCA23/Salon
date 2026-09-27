'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryCard } from '@/components/gallery/GalleryCard';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { Lightbox } from '@/components/ui/Lightbox';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';
import { api } from '@/lib/api';
import { GalleryItem } from '@/types';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Hair', 'Beauty', 'Bridal', 'Men', 'Salon'];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const data = await api.getGallery(selectedCategory);
        setItems(data);
      } catch (err) {
        console.error('Failed to load gallery:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  const regularItems = items.filter((item) => !item.isBeforeAfter);
  const beforeAfterItems = items.filter((item) => item.isBeforeAfter);

  const lightboxImages = regularItems.map((item) => ({
    url: item.image,
    title: item.title,
    category: item.category,
    description: item.description,
  }));

  return (
    <div className="bg-luxe-ivory">
      {/* Header Banner */}
      <section className="relative py-20 sm:py-28 bg-luxe-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop"
            alt="Luxe Salon Gallery"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-dark via-luxe-dark/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
            <span className="text-[10px] uppercase tracking-widest text-luxe-gold font-semibold">
              COUTURE VISUAL ARCHIVE
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
            The Gallery & Portfolio
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Immerse yourself in our portfolio of couture bridal makeup, dimensional balayage, and salon ambiance.
          </p>
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs uppercase tracking-widest px-5 py-2.5 transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-luxe-charcoal text-luxe-gold-light shadow-sm'
                  : 'bg-white border border-luxe-border text-luxe-muted hover:border-luxe-gold hover:text-luxe-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader message="Loading gallery visuals..." />
        ) : regularItems.length === 0 ? (
          <EmptyState
            title="No Images Found"
            description="We are updating this gallery section with new high-definition client transformations."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularItems.map((item, idx) => (
              <GalleryCard
                key={item._id}
                item={item}
                index={idx}
                onClick={() => setLightboxIndex(idx)}
              />
            ))}
          </div>
        )}

        {/* Lightbox Component */}
        <Lightbox
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          images={lightboxImages}
          currentIndex={lightboxIndex || 0}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      </section>

      {/* Transformations Section */}
      {beforeAfterItems.length > 0 && (
        <section className="py-20 sm:py-28 bg-luxe-cream/40 border-t border-luxe-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="BEFORE & AFTER"
              title="Transformation Spotlights"
              subtitle="Drag the interactive slider to view the transformation results achieved by our master stylists."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {beforeAfterItems.map((item) => (
                <BeforeAfterSlider
                  key={item._id}
                  beforeImage={item.beforeImage || item.image}
                  afterImage={item.afterImage || item.image}
                  title={item.title}
                  category={item.category}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <AppointmentCTA />
    </div>
  );
}

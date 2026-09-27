'use client';

import React, { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { api } from '@/lib/api';
import { GalleryItem } from '@/types';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';

export const TransformationSection: React.FC = () => {
  const [transformations, setTransformations] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const items = await api.getGallery(undefined, true);
        setTransformations(items);
      } catch (err) {
        console.error('Failed to load transformations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransformations();
  }, []);

  if (!loading && transformations.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-luxe-cream/30 border-t border-luxe-border/60 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="REAL RESULTS"
          title="Before & After Transformations"
          subtitle="Slide across to witness the precision barbering, hair restoration, and skincare transformations."
        />

        {loading ? (
          <Loader message="Loading transformations..." />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full">
            {transformations.map((item) => (
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
        )}

        <div className="mt-8 sm:mt-12 text-center">
          <Button href="/gallery" variant="outline" size="md" className="w-full sm:w-auto">
            View Complete Gallery & Transformations
          </Button>
        </div>
      </div>
    </section>
  );
};

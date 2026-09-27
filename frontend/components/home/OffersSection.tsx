'use client';

import React, { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OfferCard } from '@/components/offers/OfferCard';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { Offer } from '@/types';
import { Loader } from '@/components/ui/Loader';

export const OffersSection: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await api.getOffers();
        setOffers(data);
      } catch (err) {
        console.error('Failed to load offers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (!loading && offers.length === 0) {
    return null;
  }

  return (
    <section className="py-24 sm:py-32 bg-luxe-cream/40 border-y border-luxe-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="EXCLUSIVE INDULGENCES"
          title="Curated Luxury Packages"
          subtitle="Experience multiple holistic rituals combined at attractive celebratory tariffs."
        />

        {loading ? (
          <Loader message="Loading luxury packages..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {offers.slice(0, 4).map((offer, idx) => (
              <OfferCard key={offer._id} offer={offer} index={idx} />
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <Button href="/offers" variant="outline" size="md">
            View All Seasonal Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OfferCard } from '@/components/offers/OfferCard';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';
import { api } from '@/lib/api';
import { Offer } from '@/types';
import { Sparkles, Gift, Clock, ShieldCheck } from 'lucide-react';

export default function OffersPage() {
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

  return (
    <div className="bg-luxe-ivory">
      {/* Header Banner */}
      <section className="relative py-20 sm:py-28 bg-luxe-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop"
            alt="Luxe Salon Packages"
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
              CURATED PACKAGES & SPECIALS
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
            Packages & Offers
          </h1>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Experience comprehensive head-to-toe luxury rituals crafted for brides, gentlemen, and seasonal self-care.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loader message="Loading luxury packages..." />
        ) : offers.length === 0 ? (
          <EmptyState
            title="No Active Packages Currently"
            description="Our seasonal packages are being refreshed. You can still book any custom combination of individual services."
            actionText="View Full Services Menu"
            actionHref="/services"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, idx) => (
              <OfferCard key={offer._id} offer={offer} index={idx} />
            ))}
          </div>
        )}

        {/* Package Highlights Grid */}
        <div className="mt-20 pt-16 border-t border-luxe-border grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="p-6 bg-white border border-luxe-border text-center">
            <div className="w-10 h-10 rounded-full bg-luxe-sand mx-auto flex items-center justify-center text-luxe-gold-dark mb-4">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-luxe-charcoal mb-2">Bespoke Bridal Gifting</h4>
            <p className="text-xs text-luxe-muted font-light leading-relaxed">
              Gift vouchers available for upcoming brides, anniversaries, and executive grooming sessions.
            </p>
          </div>

          <div className="p-6 bg-white border border-luxe-border text-center">
            <div className="w-10 h-10 rounded-full bg-luxe-sand mx-auto flex items-center justify-center text-luxe-gold-dark mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-luxe-charcoal mb-2">Priority Scheduling</h4>
            <p className="text-xs text-luxe-muted font-light leading-relaxed">
              Package holders enjoy prioritized weekend slots and private suite reservations.
            </p>
          </div>

          <div className="p-6 bg-white border border-luxe-border text-center">
            <div className="w-10 h-10 rounded-full bg-luxe-sand mx-auto flex items-center justify-center text-luxe-gold-dark mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-luxe-charcoal mb-2">Zero Hidden Costs</h4>
            <p className="text-xs text-luxe-muted font-light leading-relaxed">
              All package prices are inclusive of pre-consultation, styling products, and taxes.
            </p>
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
}

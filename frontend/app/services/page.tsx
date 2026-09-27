'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Loader } from '@/components/ui/Loader';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';
import { api } from '@/lib/api';
import { Service, ServiceCategory } from '@/types';
import { Search, Scissors, Heart, Crown, Sparkles, UserCheck } from 'lucide-react';

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams?.get('category') as ServiceCategory) || 'ALL';

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | 'ALL'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: ServiceCategory | 'ALL'; icon: React.ReactNode }[] = [
    { label: 'All Services', value: 'ALL', icon: <Sparkles className="w-3.5 h-3.5 shrink-0" /> },
    { label: "Men's Grooming", value: "MEN'S GROOMING", icon: <UserCheck className="w-3.5 h-3.5 shrink-0" /> },
    { label: 'Hair Studio', value: 'HAIR', icon: <Scissors className="w-3.5 h-3.5 shrink-0" /> },
    { label: 'Beauty & Skin Spa', value: 'BEAUTY', icon: <Heart className="w-3.5 h-3.5 shrink-0" /> },
    { label: 'Bridal & Occasions', value: 'BRIDAL & OCCASIONS', icon: <Crown className="w-3.5 h-3.5 shrink-0" /> },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await api.getServices(selectedCategory, searchQuery);
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchServices();
    }, 250);

    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-luxe-ivory w-full">
      {/* Header Banner */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-luxe-dark text-white overflow-hidden w-full">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop"
            alt="Luxe Salon Services Menu"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-dark via-luxe-dark/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold font-semibold">
              BESPOKE PRICING & MENU
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal">
            Services & Spa Menu
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Every service is an artisanal ritual tailored to your individual aesthetic and wellness goals.
          </p>
        </div>
      </section>

      {/* Main Filter & Grid Container */}
      <section className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-luxe-border">
          {/* Category Pills: Horizontal scroll on mobile */}
          <div className="flex items-center overflow-x-auto pb-2 sm:pb-0 gap-1.5 sm:gap-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest px-3 sm:px-4 py-2 sm:py-2.5 transition-all font-medium whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.value
                    ? 'bg-luxe-charcoal text-luxe-gold-light shadow-xs font-semibold'
                    : 'bg-white border border-luxe-border text-luxe-muted hover:border-luxe-gold hover:text-luxe-charcoal'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-luxe-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search haircut, facial, beard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-luxe-border focus:border-luxe-gold text-xs text-luxe-charcoal outline-none transition-colors"
            />
          </div>
        </div>

        {/* Services Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        {loading ? (
          <Loader message="Fetching curated rituals..." />
        ) : services.length === 0 ? (
          <EmptyState
            title="No Services Found"
            description={
              searchQuery
                ? `We couldn't find any services matching "${searchQuery}". Please try another search term.`
                : 'No services currently listed in this category.'
            }
            actionText="Reset Filters"
            onAction={() => {
              setSelectedCategory('ALL');
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={service._id} service={service} index={idx} />
            ))}
          </div>
        )}
      </section>

      <AppointmentCTA />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<Loader message="Loading service menu..." />}>
      <ServicesContent />
    </Suspense>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Hero } from '@/components/home/Hero';
import { AboutPreview } from '@/components/home/AboutPreview';
import { FeaturedExperience } from '@/components/home/FeaturedExperience';
import { WhyChooseLuxe } from '@/components/home/WhyChooseLuxe';
import { TransformationSection } from '@/components/home/TransformationSection';
import { GallerySection } from '@/components/home/GallerySection';
import { OffersSection } from '@/components/home/OffersSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { InstagramSection } from '@/components/home/InstagramSection';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/ui/Loader';
import { api } from '@/lib/api';
import { Service, ServiceCategory } from '@/types';
import { Scissors, Sparkles, Heart, Crown, UserCheck } from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | 'ALL'>('ALL');

  const categories: { label: string; value: ServiceCategory | 'ALL'; icon: React.ReactNode }[] = [
    { label: 'All Rituals', value: 'ALL', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: "Men's Grooming", value: "MEN'S GROOMING", icon: <UserCheck className="w-3.5 h-3.5" /> },
    { label: 'Hair Studio', value: 'HAIR', icon: <Scissors className="w-3.5 h-3.5" /> },
    { label: 'Beauty & Skincare', value: 'BEAUTY', icon: <Heart className="w-3.5 h-3.5" /> },
    { label: 'Bridal & Occasions', value: 'BRIDAL & OCCASIONS', icon: <Crown className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await api.getServices(activeCategory);
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, [activeCategory]);

  return (
    <div>
      {/* 1. HERO - Prominent Men's Grooming Split Screen */}
      <Hero />

      {/* 2. ABOUT PREVIEW - Unisex Philosophy & Master Barbers */}
      <AboutPreview />

      {/* 3. CURATED SERVICES - Balanced Men's & Women's Selection */}
      <section className="py-24 sm:py-32 bg-luxe-ivory border-t border-luxe-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="BESPOKE UNISEX REPERTOIRE"
            title="Curated Salon Rituals"
            subtitle="Explore our comprehensive repertoire of men's haircut architecture, beard sculpting, precision women's hair design, French balayage, and botanical facial therapy."
          />

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-2 text-xs uppercase tracking-widest px-5 py-3 transition-all duration-200 font-medium ${
                  activeCategory === cat.value
                    ? 'bg-luxe-charcoal text-luxe-gold-light shadow-md'
                    : 'bg-white border border-luxe-border text-luxe-muted hover:border-luxe-gold hover:text-luxe-charcoal'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          {loadingServices ? (
            <Loader message="Loading luxury services..." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.slice(0, 6).map((service, idx) => (
                <ServiceCard key={service._id} service={service} index={idx} />
              ))}
            </div>
          )}

          <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/services?category=MEN'S+GROOMING" variant="gold" size="md">
              Explore All Men&apos;s Services
            </Button>
            <Button href="/services" variant="outline" size="md">
              View Full 20+ Unisex Menu
            </Button>
          </div>
        </div>
      </section>

      {/* 4. FEATURED EXPERIENCE - Bespoke Consultation & Master Barbers */}
      <FeaturedExperience />

      {/* 5. WHY CHOOSE LUXE - 6 Pillars */}
      <WhyChooseLuxe />

      {/* 6. BEFORE / AFTER SLIDER - Hair & Men's Beard/Cut Transformations */}
      <TransformationSection />

      {/* 7. GALLERY - 40%+ Men's Visuals & Fullscreen Lightbox */}
      <GallerySection />

      {/* 8. OFFERS / PACKAGES - Sovereign Gentleman, Bridal Royal Glow & Hair Ritual */}
      <OffersSection />

      {/* 9. TESTIMONIALS - Verified Male & Female Patrons */}
      <TestimonialsSection />

      {/* 10. INSTAGRAM - 3 Men's + 3 Women's Editorial Visuals */}
      <InstagramSection />

      {/* 11. APPOINTMENT CTA */}
      <AppointmentCTA />
    </div>
  );
}

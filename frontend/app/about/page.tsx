'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { AppointmentCTA } from '@/components/home/AppointmentCTA';
import { Sparkles, Award, ShieldCheck, HeartHandshake, Scissors, Check } from 'lucide-react';

export default function AboutPage() {
  const masterStylists = [
    {
      name: 'Rajesh Soundar',
      role: 'Creative Hair Director & Master Colorist',
      experience: '12+ Years Experience',
      bio: 'Trained at Vidal Sassoon Academy. Specialist in French balayage, precision bob geometry, and liquid keratin transformations.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Meenakshi Krishnan',
      role: 'Lead Bridal Couturière & Skincare Specialist',
      experience: '10+ Years Experience',
      bio: 'Celebrated for traditional South Indian muhurtham transformations, high-definition airbrush aesthetics, and ultrasonic cellular therapy.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Aravind Varma',
      role: 'Head of Men’s Grooming & Barber Architecture',
      experience: '8+ Years Experience',
      bio: 'Pioneer of contemporary taper fades, traditional straight-razor hot lather shaves, and therapeutic Ayurvedic head therapies.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-luxe-ivory">
      {/* Page Header */}
      <section className="relative py-24 sm:py-32 bg-luxe-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2000&auto=format&fit=crop"
            alt="About Luxe Salon"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-dark via-luxe-dark/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
              <span className="text-[10px] uppercase tracking-widest text-luxe-gold font-semibold">
                OUR STORY & SANCTUARY
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal">
              Where Beauty Meets Luxury
            </h1>
            <p className="mt-4 text-sm sm:text-base text-stone-300 font-light max-w-2xl mx-auto leading-relaxed">
              Discover the craftsmanship, philosophy, and master artists defining luxury hair, skincare, and bridal rituals in Tiruppur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story & Heritage */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-luxe-gold" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-luxe-gold-dark">
                  SINCE 2016
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxe-charcoal font-normal leading-tight">
                Crafting Elevated Beauty Rituals in Tiruppur
              </h2>
              <p className="mt-6 text-sm text-luxe-muted font-light leading-relaxed">
                LUXE SALON was established with an unapologetic standard of visual sophistication. Moving away from standard salon environments, we curated a space reminiscent of private European beauty studios — featuring bespoke Italian styling stations, acoustic privacy, and personalized beverage menus.
              </p>
              <p className="mt-4 text-sm text-luxe-muted font-light leading-relaxed">
                Whether creating timeless South Indian bridal grandeur or formulating dimensional French balayage, our artists treat each appointment as a dedicated canvas. We believe true luxury lies in subtle precision, wholesome care, and an unforgettable guest experience.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-luxe-border">
                  <h4 className="font-serif text-2xl text-luxe-charcoal">5000+</h4>
                  <p className="text-[11px] uppercase tracking-widest text-luxe-muted mt-0.5">Satisfied Patrons</p>
                </div>
                <div className="p-4 bg-white border border-luxe-border">
                  <h4 className="font-serif text-2xl text-luxe-charcoal">500+</h4>
                  <p className="text-[11px] uppercase tracking-widest text-luxe-muted mt-0.5">Bridal Makeovers</p>
                </div>
              </div>
            </div>

            <div className="relative h-[450px] sm:h-[520px] w-full border border-luxe-border overflow-hidden bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1200&auto=format&fit=crop"
                alt="Luxe Salon Interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Master Stylists Team */}
      <section className="py-24 sm:py-32 bg-luxe-cream/40 border-y border-luxe-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="ARTISANS"
            title="Meet Our Master Stylists"
            subtitle="Trained across global academies to bring you unmatched precision and artistic distinction."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {masterStylists.map((stylist, idx) => (
              <motion.div
                key={stylist.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-luxe-border p-6 flex flex-col justify-between group hover:border-luxe-gold transition-all duration-300"
              >
                <div>
                  <div className="relative h-72 w-full overflow-hidden bg-stone-200 mb-6">
                    <Image
                      src={stylist.image}
                      alt={stylist.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                    {stylist.experience}
                  </span>
                  <h3 className="font-serif text-2xl text-luxe-charcoal mt-1">
                    {stylist.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mb-3">
                    {stylist.role}
                  </p>
                  <p className="text-xs text-luxe-muted font-light leading-relaxed">
                    {stylist.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-luxe-border/40">
                  <Button
                    href={`/book?service=Consultation with ${encodeURIComponent(stylist.name)}`}
                    variant="outline"
                    size="sm"
                    className="w-full justify-center"
                  >
                    Book with {stylist.name.split(' ')[0]}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hygiene and Safety Protocol */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="SAFETY & INTEGRITY"
            title="The Luxe Hygiene Protocol"
            subtitle="Your wellness is non-negotiable. We adhere strictly to clinical-grade sterilization."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-luxe-border">
              <ShieldCheck className="w-6 h-6 text-luxe-gold-dark mb-4" />
              <h4 className="font-serif text-xl text-luxe-charcoal mb-2">Hospital-Grade Sterilization</h4>
              <p className="text-xs text-luxe-muted font-light leading-relaxed">
                All metal shears, razors, and manicure tools undergo medical autoclaving before every single use.
              </p>
            </div>

            <div className="p-6 bg-white border border-luxe-border">
              <Sparkles className="w-6 h-6 text-luxe-gold-dark mb-4" />
              <h4 className="font-serif text-xl text-luxe-charcoal mb-2">Single-Use Linens & Kits</h4>
              <p className="text-xs text-luxe-muted font-light leading-relaxed">
                Disposable plush towels, sanitized capes, and sealed waxing cartridges for 100% individual hygiene.
              </p>
            </div>

            <div className="p-6 bg-white border border-luxe-border">
              <HeartHandshake className="w-6 h-6 text-luxe-gold-dark mb-4" />
              <h4 className="font-serif text-xl text-luxe-charcoal mb-2">Patch Test First</h4>
              <p className="text-xs text-luxe-muted font-light leading-relaxed">
                Mandatory skin sensitivity and strand elasticity trials prior to any global coloring or chemical treatments.
              </p>
            </div>

            <div className="p-6 bg-white border border-luxe-border">
              <Award className="w-6 h-6 text-luxe-gold-dark mb-4" />
              <h4 className="font-serif text-xl text-luxe-charcoal mb-2">100% Authentic Products</h4>
              <p className="text-xs text-luxe-muted font-light leading-relaxed">
                Direct procurement from authorized brand distributors ensures uncompromised formula purity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AppointmentCTA />
    </div>
  );
}

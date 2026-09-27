'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Check, Sparkles, Scissors, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutPreview: React.FC = () => {
  const pillars = [
    { title: 'Master Barbers & Stylists', desc: 'Internationally certified artists in precision barbering, scissor architecture, and French balayage.' },
    { title: 'Premium Products', desc: 'Exclusive use of Olaplex, Kérastase, L’Oréal Professionnel, Argan botanicals, and premium men’s grooming tonics.' },
    { title: 'Personalized Consultation', desc: 'Every ritual starts with facial geometry analysis, beard line contouring, and scalp diagnostics.' },
    { title: 'Dedicated Private Suites', desc: 'Separate private men’s executive barber suites and tranquil women’s/bridal styling sanctuaries.' },
    { title: 'Modern Techniques', desc: 'From traditional straight-razor hot lather shaves to hydradermabrasion and HD airbrushing.' },
  ];

  return (
    <section className="py-24 sm:py-32 bg-luxe-ivory relative overflow-hidden border-b border-luxe-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[480px] sm:h-[560px] w-full border border-luxe-border overflow-hidden bg-luxe-dark"
            >
              <Image
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000&auto=format&fit=crop"
                alt="Luxe Salon Unisex & Executive Grooming Sanctuary"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              
              {/* Floating Luxury Tag */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 border border-luxe-gold/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-luxe-charcoal flex items-center justify-center text-luxe-gold shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-luxe-charcoal">
                      The Luxe Unisex Standard
                    </p>
                    <p className="text-[11px] text-luxe-muted font-light mt-0.5">
                      Tailored luxury for gentlemen, women & bridal parties.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Stats */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-luxe-gold" />
                <span className="text-[11px] uppercase tracking-widest font-semibold text-luxe-gold-dark">
                  UNISEX LUXURY PHILOSOPHY
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-luxe-charcoal tracking-tight font-normal leading-[1.15]">
                More Than a Salon. <br />
                <span className="italic text-luxe-gold-dark">It’s Your Luxury Ritual.</span>
              </h2>

              <p className="mt-6 text-sm sm:text-base text-luxe-muted font-light leading-relaxed">
                Founded in Tiruppur, LUXE SALON was designed from the ground up as a premier unisex sanctuary. We combine the sharp precision of modern masculine barber architecture with haute coiffure hair design and medical-grade skincare science, offering bespoke rituals tailored to every guest.
              </p>

              {/* Pillars List */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white border border-luxe-border/70 shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-luxe-gold/20 flex items-center justify-center text-luxe-gold-dark shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-luxe-charcoal">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-luxe-muted font-light mt-0.5 leading-normal">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats Highlights */}
              <div className="mt-10 pt-8 border-t border-luxe-border grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                <div className="p-3 bg-luxe-cream/50 border border-luxe-border/40">
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-luxe-charcoal">10+</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxe-muted mt-1 font-medium">Years Experience</p>
                </div>
                <div className="p-3 bg-luxe-cream/50 border border-luxe-border/40">
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-luxe-charcoal">5000+</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxe-muted mt-1 font-medium">Happy Clients</p>
                </div>
                <div className="p-3 bg-luxe-cream/50 border border-luxe-border/40">
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-luxe-charcoal">20+</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxe-muted mt-1 font-medium">Curated Services</p>
                </div>
                <div className="p-3 bg-luxe-cream/50 border border-luxe-border/40">
                  <p className="font-serif text-2xl sm:text-3xl font-normal text-luxe-charcoal">100%</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxe-muted mt-1 font-medium">Master Stylists</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button href="/about" variant="primary" size="md">
                  Discover Our Story
                </Button>
                <Button href="/services?category=MEN'S+GROOMING" variant="outline" size="md">
                  Men&apos;s Services
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

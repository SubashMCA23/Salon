'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const FeaturedExperience: React.FC = () => {
  const experiences = [
    {
      num: '01',
      title: 'Personalized Consultation',
      desc: 'We analyze your hair density, beard growth patterns, scalp health, and facial symmetry before crafting bespoke cut architecture.',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop',
      badge: 'Bespoke Mapping',
    },
    {
      num: '02',
      title: 'World-Class Formulations',
      desc: 'Infused with cold-pressed Moroccan Argan oils, bio-identical keratins, 24K gold leaves, and organic botanical skin brighteners.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      badge: 'Pure Botanicals',
    },
    {
      num: '03',
      title: 'Master Artistry Stylists',
      desc: 'Our senior barbers and couture stylists bring over a decade of high-fashion and executive styling, ensuring runway-sharp executions.',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop',
      badge: 'Artisanal Craft',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-luxe-cream/40 border-y border-luxe-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="THE LUXE METHOD"
          title="Designed Around You."
          subtitle="Whether an executive gentleman's fade or high-fashion bridal glam, every touchpoint is curated for effortless distinction."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white border border-luxe-border p-6 flex flex-col justify-between group hover:border-luxe-gold/80 transition-all duration-300 shadow-subtle hover:shadow-card"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-stone-100 mb-6">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-luxe-charcoal text-luxe-gold px-3 py-1 font-serif text-sm font-semibold">
                    {exp.num}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-luxe-charcoal text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold">
                    {exp.badge}
                  </div>
                </div>

                <h3 className="font-serif text-2xl text-luxe-charcoal group-hover:text-luxe-gold-dark transition-colors">
                  {exp.title}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-luxe-muted font-light leading-relaxed">
                  {exp.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-luxe-border/40 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-medium">
                  The Luxe Protocol
                </span>
                <span className="w-8 h-[1px] bg-luxe-gold/60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

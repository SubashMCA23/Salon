'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export const InstagramSection: React.FC = () => {
  const feedImages = [
    {
      url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
      alt: 'Gentleman Precision Fade & Beard Architecture',
      tag: 'Men\'s Grooming',
    },
    {
      url: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=600&auto=format&fit=crop',
      alt: 'Luxe Salon Balayage Hair Ritual',
      tag: 'Hair Couture',
    },
    {
      url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop',
      alt: 'Men\'s Charcoal Detox Facial & Hot Towel Treatment',
      tag: 'Gentleman Spa',
    },
    {
      url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop',
      alt: 'Bridal Couture Makeup in Tiruppur',
      tag: 'Bridal Studio',
    },
    {
      url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=600&auto=format&fit=crop',
      alt: 'Men\'s Executive Salon Suite Experience',
      tag: 'VIP Barber',
    },
    {
      url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
      alt: '24K Gold Cellular Rejuvenation Glow',
      tag: 'Luxury Skincare',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-luxe-cream/30 border-t border-luxe-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="@LUXESALON"
          title="Follow The Luxe Experience"
          subtitle="Behind-the-scenes artistry, client transformations, executive grooming, and bridal chronicles on our official Instagram."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {feedImages.map((img, idx) => (
            <motion.a
              key={idx}
              href="https://instagram.com/luxesalon"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative h-52 sm:h-64 w-full overflow-hidden border border-luxe-border bg-stone-200"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-white">
                <Instagram className="w-5 h-5 text-luxe-gold mb-1.5" />
                <span className="text-[10px] uppercase tracking-widest font-semibold text-luxe-gold-light">
                  {img.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            href="https://instagram.com/luxesalon"
            variant="outline"
            size="md"
            leftIcon={<Instagram className="w-4 h-4" />}
          >
            Follow Us @luxesalon
          </Button>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Scissors, Calendar, Link } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-luxe-ivory text-luxe-charcoal overflow-hidden border-b border-luxe-border w-full">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-luxe-cream/30 -z-10 hidden lg:block" />
      <div className="absolute top-1/4 left-5 w-60 h-60 bg-luxe-sand/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* CONTENT: Left on desktop, Top on mobile */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-luxe-charcoal text-luxe-gold text-[10px] sm:text-xs uppercase tracking-widest font-semibold w-fit mb-4 sm:mb-6 shadow-xs"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-luxe-gold shrink-0" />
              <span>LUXE MEN&apos;S GROOMING & UNISEX STUDIO</span>
            </motion.div>

            {/* Large Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-serif text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-luxe-charcoal font-normal leading-[1.1] tracking-tight"
            >
              Refined. Sharp. <br />
              <span className="italic text-luxe-gold-dark font-light">Unmistakably You.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-luxe-muted font-light max-w-lg leading-relaxed"
            >
              Premium haircuts, styling and grooming experiences designed for the modern man. Experience precision shear craft, straight-razor detailing, and therapeutic sanctuary rituals in Tiruppur.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Button
                href="/book"
                variant="gold"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto py-3.5 sm:py-4 justify-center shadow-sm text-xs font-semibold"
              >
                Book Appointment
              </Button>
              <Button
                href="/services?category=MEN'S+GROOMING"
                variant="outline"
                size="lg"
                className="w-full sm:w-auto py-3.5 sm:py-4 justify-center border-luxe-charcoal text-luxe-charcoal hover:bg-luxe-charcoal hover:text-luxe-ivory text-xs"
              >
                Explore Men&apos;s Grooming
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-luxe-border/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-md"
            >
              <div>
                <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-luxe-charcoal font-normal">10+</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-luxe-muted mt-0.5 font-medium">Master Barbers</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-luxe-charcoal font-normal">5000+</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-luxe-muted mt-0.5 font-medium">Gentlemen Served</p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-luxe-gold-dark font-normal">VIP</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest text-luxe-muted mt-0.5 font-medium">Private Suites</p>
              </div>
            </motion.div>
          </div>

          {/* VISUAL: Right on desktop, First on mobile */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-72 sm:h-96 md:h-[440px] lg:h-[540px] xl:h-[580px] border border-luxe-border shadow-xl overflow-hidden bg-luxe-dark group"
            >
              {/* Primary Men's Grooming Model Image with top-anchored crop so face is never cut */}
              <Image
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop"
                alt="Luxe Salon Men's Premium Haircut & Beard Grooming"
                fill
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 50vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Editorial Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Floating Luxury Detail Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-luxe-charcoal/90 backdrop-blur-md border border-luxe-gold/40 text-luxe-gold px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1 shadow-md">
                <Scissors className="w-3 h-3 text-luxe-gold shrink-0" />
                <span>Executive Razor Craft</span>
              </div>

              {/* Bottom Editorial Caption Card */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 p-3.5 sm:p-5 bg-white/95 backdrop-blur-md border border-luxe-gold/30 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 pr-2">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold block">
                      SIGNATURE GENTLEMAN RITUAL
                    </span>
                    <h3 className="font-serif text-base sm:text-xl lg:text-2xl text-luxe-charcoal mt-0.5 line-clamp-1">
                      The Executive Cut & Beard Sculpt
                    </h3>
                  </div>
                  <Link
                    href="/book?service=The%20Executive%20Gentleman%20Haircut%20%26%20Beard%20Sculpt"
                    className="shrink-0 bg-luxe-charcoal hover:bg-luxe-dark text-luxe-ivory px-3 py-2 text-[10px] uppercase tracking-wider font-semibold"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

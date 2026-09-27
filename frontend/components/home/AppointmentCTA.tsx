'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Sparkles, MessageCircle, Phone, Calendar } from 'lucide-react';

export const AppointmentCTA: React.FC = () => {
  return (
    <section className="relative py-14 sm:py-20 md:py-28 bg-luxe-dark text-white overflow-hidden w-full">
      {/* Background with texture */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1600&auto=format&fit=crop"
          alt="Luxe Salon Background"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/90" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
            <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-luxe-gold font-medium">
              RESERVE YOUR SANCTUARY
            </span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-white leading-tight">
            Ready for Your <br />
            <span className="italic text-luxe-gold-light">Luxe Experience?</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Step into timeless tranquility. Book your personalized haircut, beard sculpt, skincare, or bridal consultation today.
          </p>

          <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Button
              href="/book"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto py-3.5 sm:py-4 text-xs font-semibold"
              leftIcon={<Calendar className="w-4 h-4" />}
            >
              Book Your Appointment
            </Button>
            <a
              href="https://wa.me/919842100000?text=Hello%20Luxe%20Salon!%20I%20would%20like%20to%20reserve%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 text-xs font-semibold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Book via WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-stone-400 font-light">
            <a href="tel:+919842100000" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-luxe-gold" /> +91 98421 00000
            </a>
            <span className="hidden sm:inline">•</span>
            <span>Avinashi Road, Tiruppur</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

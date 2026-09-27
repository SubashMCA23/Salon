'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Sparkles,
  Award,
  Leaf,
  ShieldCheck,
  Compass,
  HeartHandshake,
} from 'lucide-react';

export const WhyChooseLuxe: React.FC = () => {
  const reasons = [
    {
      icon: <Award className="w-5 h-5 text-luxe-gold-dark" />,
      title: 'Expert Professionals',
      desc: 'Certified master barbers and senior stylists with relentless commitment to precision cutting and aesthetic finesse.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-luxe-gold-dark" />,
      title: 'Premium Products',
      desc: 'Exclusive use of authentic luxury brands ensuring hair fiber protection and biocompatible skincare formulations.',
    },
    {
      icon: <Compass className="w-5 h-5 text-luxe-gold-dark" />,
      title: 'Personalized Service',
      desc: 'Every client receives a bespoke consultation tailored to their facial contours, beard line, and hair texture.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-luxe-gold-dark" />,
      title: 'Hygienic Environment',
      desc: 'Hospital-grade autoclaved tools, single-use linens, and private sanitized suites for complete peace of mind.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-luxe-gold-dark" />,
      title: 'Latest Techniques',
      desc: 'State-of-the-art hydradermabrasion, straight-razor detailing, French balayage, and HD bridal airbrushing.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-luxe-gold-dark" />,
      title: 'Customer-First Experience',
      desc: 'Warm hospitality, punctuality, zero rushing, and a tranquil atmosphere free from sales pressure.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-luxe-ivory w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="THE LUXE DIFFERENCE"
          title="Why Choose Luxe Salon"
          subtitle="We combine the precision of luxury grooming and couture hair styling with the comfort of a private spa sanctuary."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {reasons.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="p-5 sm:p-6 md:p-8 bg-white border border-luxe-border transition-all duration-300 hover:border-luxe-gold hover:shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-luxe-sand/70 border border-luxe-gold/30 flex items-center justify-center mb-4 sm:mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-luxe-charcoal">
                  {item.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-luxe-muted font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-luxe-border/40 text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-medium">
                Standard of Care
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

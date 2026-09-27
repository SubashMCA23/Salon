'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { api } from '@/lib/api';
import { Testimonial } from '@/types';
import { Loader } from '@/components/ui/Loader';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await api.getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-luxe-ivory relative overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="CLIENT EXPERIENCES"
          title="Words From Our Patrons"
          subtitle="Read verified reflections from our esteemed clientele across Tiruppur."
        />

        {loading ? (
          <Loader message="Loading client reviews..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-luxe-border p-5 sm:p-6 md:p-8 flex flex-col justify-between relative hover:border-luxe-gold/70 hover:shadow-card transition-all duration-300"
              >
                <div>
                  {/* Rating Stars & Quote */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < item.rating
                              ? 'text-luxe-gold fill-luxe-gold'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-luxe-gold/30 shrink-0" />
                  </div>

                  <p className="text-xs sm:text-sm text-luxe-charcoal font-light leading-relaxed italic mb-6">
                    “{item.review}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-luxe-border/50 flex items-center gap-3">
                  {item.image && (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-luxe-sand shrink-0 border border-luxe-gold/40">
                      <Image
                        src={item.image}
                        alt={item.customerName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-luxe-charcoal truncate">
                      {item.customerName}
                    </h4>
                    {item.serviceUsed && (
                      <p className="text-[10px] text-luxe-gold-dark font-medium truncate">
                        {item.serviceUsed}
                      </p>
                    )}
                    {item.location && (
                      <p className="text-[10px] text-luxe-muted font-light truncate">
                        {item.location}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

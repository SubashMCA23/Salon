'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group bg-white border border-luxe-border flex flex-col justify-between transition-all duration-300 hover:border-luxe-gold/80 hover:shadow-card overflow-hidden w-full"
    >
      {/* Card Image */}
      <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-stone-100">
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category & Badge */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="bg-luxe-charcoal/90 text-luxe-gold text-[8.5px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold backdrop-blur-xs">
            {service.category}
          </span>
          {service.isFeatured && (
            <span className="bg-luxe-gold text-luxe-charcoal text-[8.5px] sm:text-[9px] uppercase tracking-widest px-2 py-0.5 font-semibold flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[9.5px] sm:text-[10px] text-stone-200 bg-black/70 px-2 py-0.5 backdrop-blur-xs uppercase tracking-wider font-light">
          <Clock className="w-3 h-3 text-luxe-gold shrink-0" />
          <span>{service.duration}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-luxe-charcoal group-hover:text-luxe-gold-dark transition-colors line-clamp-1">
            {service.name}
          </h3>

          <p className="text-xs text-luxe-muted font-light line-clamp-2 leading-relaxed mt-1.5 mb-4">
            {service.description}
          </p>
        </div>

        {/* Footer: Price & Actions */}
        <div className="pt-3 border-t border-luxe-border/60">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-muted font-light block">
                {service.startingPrice ? 'Starts From' : 'Price'}
              </span>
              <p className="font-serif text-lg sm:text-xl font-normal text-luxe-charcoal">
                {formatCurrency(service.price)}
              </p>
            </div>

            <Link
              href={`/services/${service._id}`}
              className="text-xs uppercase tracking-wider text-luxe-gold-dark hover:text-luxe-charcoal font-medium inline-flex items-center gap-1 py-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <Button
            href={`/book?service=${encodeURIComponent(service.name)}`}
            variant="secondary"
            size="sm"
            className="w-full justify-center py-2.5 text-xs font-medium group-hover:bg-luxe-charcoal group-hover:text-luxe-ivory group-hover:border-luxe-charcoal"
          >
            Book This Ritual
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Check, Clock } from 'lucide-react';
import { Offer } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface OfferCardProps {
  offer: Offer;
  index: number;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, index }) => {
  const savings = offer.price - offer.discountPrice;
  const discountPercent = Math.round((savings / offer.price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
      className="bg-white border border-luxe-border flex flex-col justify-between group hover:border-luxe-gold hover:shadow-card transition-all duration-300 overflow-hidden w-full"
    >
      <div>
        {/* Image & Badges */}
        <div className="relative h-48 sm:h-56 md:h-60 w-full overflow-hidden bg-stone-100">
          <Image
            src={offer.image}
            alt={offer.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Badge */}
          {offer.badge && (
            <div className="absolute top-2.5 left-2.5 bg-luxe-gold text-luxe-charcoal text-[8.5px] sm:text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-semibold shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{offer.badge}</span>
            </div>
          )}

          {/* Discount Tag */}
          <div className="absolute top-2.5 right-2.5 bg-luxe-charcoal text-luxe-gold-light text-[9px] sm:text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold border border-luxe-gold/40">
            Save {discountPercent}%
          </div>

          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-[9px] sm:text-[10px] text-stone-200 bg-black/60 px-2 py-0.5 backdrop-blur-xs">
            <Clock className="w-3 h-3 text-luxe-gold shrink-0" />
            <span>Valid until {formatDate(offer.validUntil)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 md:p-6">
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-luxe-charcoal group-hover:text-luxe-gold-dark transition-colors line-clamp-1">
            {offer.name}
          </h3>
          <p className="text-xs text-luxe-muted font-light mt-1.5 leading-relaxed line-clamp-2">
            {offer.description}
          </p>

          {/* Included Services list */}
          <div className="mt-4 space-y-1.5 pt-3 border-t border-luxe-border/50">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-charcoal font-semibold">
              Inclusions:
            </p>
            {offer.services.slice(0, 3).map((srv, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700 font-light truncate">
                <Check className="w-3.5 h-3.5 text-luxe-gold-dark shrink-0 mt-0.5" />
                <span className="truncate">{srv}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="p-4 sm:p-5 md:p-6 pt-0">
        <div className="p-3 bg-luxe-cream/50 border border-luxe-border/60 flex items-center justify-between mb-3">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-luxe-muted line-through block">
              Regular: {formatCurrency(offer.price)}
            </span>
            <span className="font-serif text-lg sm:text-xl font-normal text-luxe-charcoal">
              {formatCurrency(offer.discountPrice)}
            </span>
          </div>
          <span className="text-[9.5px] font-semibold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 uppercase tracking-wider">
            Save {formatCurrency(savings)}
          </span>
        </div>

        <Button
          href={`/book?service=${encodeURIComponent(offer.name)}`}
          variant="gold"
          size="md"
          className="w-full justify-center shadow-none py-2.5 text-xs font-semibold"
        >
          Claim This Package
        </Button>
      </div>
    </motion.div>
  );
};

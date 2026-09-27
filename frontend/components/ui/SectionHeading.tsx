'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}) => {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col mb-8 sm:mb-12 md:mb-16 w-full max-w-4xl mx-auto px-1', alignmentClass[align], className)}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-2 sm:mb-3"
        >
          <span className="w-4 sm:w-6 h-[1px] bg-luxe-gold" />
          <span className="text-[9px] sm:text-[11px] tracking-widest uppercase font-semibold text-luxe-gold-dark">
            {badge}
          </span>
          <span className="w-4 sm:w-6 h-[1px] bg-luxe-gold" />
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(
          'text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif text-luxe-charcoal tracking-tight font-normal leading-[1.15] max-w-3xl',
          titleClassName
        )}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            'mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-luxe-muted font-light max-w-2xl leading-relaxed',
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Loader: React.FC<{ message?: string; className?: string }> = ({
  message = 'Loading Luxe experience...',
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center justify-center p-12 text-center min-h-[260px]', className)}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-2 border-luxe-sand border-t-luxe-gold animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-luxe-gold animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-xs tracking-luxury uppercase text-luxe-muted font-light">
        {message}
      </p>
    </div>
  );
};

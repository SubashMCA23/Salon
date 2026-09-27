'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  href,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-luxury uppercase transition-all duration-300 relative group overflow-hidden select-none text-xs';
  
  const sizeStyles = {
    sm: 'px-4 py-2.5 text-[10px]',
    md: 'px-6 py-3.5 text-xs',
    lg: 'px-8 py-4 text-xs font-semibold',
  };

  const variantStyles = {
    primary: 'bg-luxe-charcoal text-luxe-ivory border border-luxe-charcoal hover:bg-luxe-dark hover:border-luxe-gold hover:text-luxe-gold-light active:scale-[0.98]',
    secondary: 'bg-luxe-sand text-luxe-charcoal border border-luxe-border hover:bg-luxe-ivory hover:border-luxe-gold active:scale-[0.98]',
    outline: 'bg-transparent text-luxe-charcoal border border-luxe-charcoal hover:bg-luxe-charcoal hover:text-luxe-ivory active:scale-[0.98]',
    gold: 'bg-luxe-gold text-luxe-charcoal font-semibold border border-luxe-gold hover:bg-luxe-gold-dark hover:text-white active:scale-[0.98] shadow-sm hover:shadow-hover',
    ghost: 'bg-transparent text-luxe-charcoal hover:text-luxe-gold-dark hover:bg-luxe-cream/50 active:scale-[0.98]',
  };

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
      ) : leftIcon ? (
        <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-0.5">{leftIcon}</span>
      ) : null}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">{rightIcon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], isLoading && 'opacity-80 cursor-wait', className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

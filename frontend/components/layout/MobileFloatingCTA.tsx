'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const MobileFloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Hide on admin routes
  const isAdmin = pathname.startsWith('/admin');
  const isBookingPage = pathname === '/book';

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA once scrolled a little past the hero top
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin || isBookingPage || !isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Quick appointment reservation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-luxe-dark/95 text-luxe-ivory border-t border-luxe-gold/40 shadow-2xl backdrop-blur-md px-3 py-2.5 transition-transform duration-300 transform translate-y-0"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-md mx-auto flex items-center gap-2">
        <Link
          href="/book"
          className="flex-1 bg-luxe-gold hover:bg-luxe-gold-dark text-luxe-charcoal font-semibold text-xs tracking-wider uppercase py-3 px-4 flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Book Appointment</span>
        </Link>

        <a
          href="https://wa.me/919786149477?text=Hello%20Luxe%20Salon!%20I%20would%20like%20to%20reserve%20an%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book via WhatsApp"
          className="w-11 h-11 bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 border border-emerald-400/40 shadow-sm active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </aside>
  );
};

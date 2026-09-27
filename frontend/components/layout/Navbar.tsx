'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Offers', href: '/offers' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Top Quick Bar - Desktop & Tablet */}
      <div className="bg-luxe-charcoal text-luxe-ivory text-[11px] py-1.5 px-4 tracking-wider uppercase font-light border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-luxe-gold animate-pulse" />
            <span>Tiruppur’s Premier Luxury Unisex Salon & Bridal Sanctuary</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+919786149477"
              className="flex items-center gap-1.5 hover:text-luxe-gold transition-colors text-stone-300"
            >
              <Phone className="w-3 h-3 text-luxe-gold" />
              <span>+91 97861 49477</span>
            </a>
            <a
              href="https://wa.me/919786149477?text=Hello%20Luxe%20Salon"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-luxe-gold transition-colors text-stone-300"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-stone-500">|</span>
            <span className="text-luxe-gold-light font-normal">Mon - Sun: 9:00 AM - 9:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          'sticky top-0 z-40 transition-all duration-300 w-full',
          isScrolled
            ? 'glass-nav shadow-subtle py-2.5 sm:py-3.5'
            : 'bg-luxe-ivory/95 border-b border-luxe-border/60 py-3 sm:py-4 lg:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-start group select-none">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-luxe-gold group-hover:rotate-45 transition-transform duration-500" />
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider text-luxe-charcoal">
                LUXE
              </span>
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-light tracking-widest text-luxe-gold-dark">
                SALON
              </span>
            </div>
            <span className="text-[7.5px] sm:text-[8px] uppercase tracking-ultra text-luxe-muted font-medium -mt-1 pl-4 sm:pl-5">
              Tiruppur • Unisex & Bridal
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-xs uppercase tracking-widest font-medium transition-all duration-200 relative py-1 hover:text-luxe-gold-dark',
                    isActive ? 'text-luxe-charcoal font-semibold' : 'text-luxe-muted'
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-luxe-gold"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button href="/book" variant="primary" size="sm">
              Book Appointment
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/book"
              className="bg-luxe-gold text-luxe-charcoal font-semibold text-[11px] uppercase tracking-wider px-3.5 py-2 flex items-center gap-1 active:scale-95 shadow-xs"
            >
              <span>Book</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-luxe-charcoal hover:text-luxe-gold transition-colors focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-x-0 top-[57px] sm:top-[65px] bottom-0 z-50 bg-luxe-ivory flex flex-col justify-between overflow-y-auto px-6 py-6 border-t border-luxe-border"
            style={{ maxHeight: 'calc(100vh - 57px)' }}
          >
            {/* Nav Links */}
            <div className="space-y-1 divide-y divide-luxe-border/50">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between py-4 text-sm uppercase tracking-widest font-medium transition-colors',
                      isActive ? 'text-luxe-gold-dark font-semibold' : 'text-luxe-charcoal hover:text-luxe-gold-dark'
                    )}
                  >
                    <span>{link.name}</span>
                    <div className="flex items-center gap-2">
                      {isActive && <span className="w-2 h-2 rounded-full bg-luxe-gold" />}
                      <ChevronRight className="w-4 h-4 text-stone-400" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Actions & Contact in Mobile Menu */}
            <div className="pt-6 mt-4 border-t border-luxe-border space-y-3 pb-8">
              <Button
                href="/book"
                onClick={() => setMobileMenuOpen(false)}
                variant="gold"
                size="lg"
                className="w-full justify-center py-4 text-xs font-semibold"
                leftIcon={<Calendar className="w-4 h-4" />}
              >
                Book Appointment Online
              </Button>

              <a
                href="https://wa.me/919786149477?text=Hello%20Luxe%20Salon!%20I%20would%20like%20to%20reserve%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-50 border border-emerald-600/30 text-emerald-800 text-xs uppercase tracking-wider font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Instant WhatsApp Concierge</span>
              </a>

              <div className="pt-3 flex items-center justify-between text-[11px] text-luxe-muted font-light">
                <a href="tel:+919786149477" className="flex items-center gap-1.5 hover:text-luxe-charcoal">
                  <Phone className="w-3.5 h-3.5 text-luxe-gold" />
                  <span>+91 97861 49477</span>
                </a>
                <span>Tiruppur, TN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import React from 'react';
import Link from 'next/link';
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-luxe-dark text-luxe-ivory pt-12 sm:pt-16 pb-16 md:pb-12 border-t border-luxe-gold/20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-10 sm:pb-14 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-luxe-gold" />
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-white">
                LUXE
              </span>
              <span className="font-serif text-xl sm:text-2xl font-light tracking-widest text-luxe-gold">
                SALON
              </span>
            </div>
            <p className="text-xs font-light text-stone-300 leading-relaxed max-w-sm">
              “Where Beauty Meets Luxury.” Tiruppur’s premier unisex salon and bridal sanctuary. Handcrafted rituals, master barbers, and an atmosphere of refined indulgence.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href="https://instagram.com/luxesalon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-luxe-gold hover:border-luxe-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919842100000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-stone-300 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-luxe-gold-light">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-light">
              <li>
                <Link href="/" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-luxe-gold transition-colors block py-0.5">
                  About Our Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-luxe-gold transition-colors block py-0.5">
                  All Services & Pricing
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Gallery & Transformations
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Packages & Specials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Services */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-luxe-gold-light">
              Signature Rituals
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-light">
              <li>
                <Link href="/services?category=MEN'S+GROOMING" className="hover:text-luxe-gold transition-colors block py-0.5">
                  The Executive Gentleman Cut
                </Link>
              </li>
              <li>
                <Link href="/services?category=MEN'S+GROOMING" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Straight-Razor Beard Sculpting
                </Link>
              </li>
              <li>
                <Link href="/services?category=HAIR" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Balayage & Hair Spa
                </Link>
              </li>
              <li>
                <Link href="/services?category=BEAUTY" className="hover:text-luxe-gold transition-colors block py-0.5">
                  24K Gold Royal Facial
                </Link>
              </li>
              <li>
                <Link href="/services?category=BRIDAL" className="hover:text-luxe-gold transition-colors block py-0.5">
                  Luxe Couture Bridal Makeover
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-luxe-gold-light">
              Visit The Salon
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-luxe-gold shrink-0 mt-0.5" />
                <span>124, Avinashi Main Road, Pushpa Theatre Junction, Tiruppur, TN 641602</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-luxe-gold shrink-0" />
                <a href="tel:+919842100000" className="hover:text-luxe-gold transition-colors">
                  +91 98421 00000
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-luxe-gold shrink-0" />
                <a href="mailto:contact@luxesalon.in" className="hover:text-luxe-gold transition-colors">
                  contact@luxesalon.in
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-luxe-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-normal text-white">Opening Hours:</p>
                  <p>Mon – Sun: 9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 font-light gap-3">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} LUXE SALON. Tiruppur, Tamil Nadu.</p>
          <div className="flex items-center space-x-6">
            <Link href="/book" className="hover:text-luxe-gold transition-colors">
              Online Booking
            </Link>
            <Link href="/admin/login" className="text-stone-500 hover:text-stone-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

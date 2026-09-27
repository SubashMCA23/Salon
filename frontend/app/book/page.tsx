'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { AppointmentForm } from '@/components/booking/AppointmentForm';
import { Loader } from '@/components/ui/Loader';
import { Sparkles, Phone, MessageCircle, Clock, ShieldCheck, Coffee, Wifi, Car } from 'lucide-react';

function BookingContent() {
  const faqs = [
    {
      q: 'Do I need to pay in advance for online bookings?',
      a: 'No upfront payment is required. You can pay conveniently at the salon after your service via UPI, Credit/Debit Card, or Cash.',
    },
    {
      q: 'Can I reschedule or cancel my appointment?',
      a: 'Yes, absolutely. Please call or message our WhatsApp concierge at least 2 hours in advance to reschedule your slot without any charges.',
    },
    {
      q: 'Do you offer private styling suites for men and brides?',
      a: 'Yes, we offer dedicated private suites for gentleman grooming, bridal transformations, and VIP guests.',
    },
    {
      q: 'Is valet parking available?',
      a: 'Yes, complimentary covered valet parking is available for all Luxe Salon patrons directly on Avinashi Road.',
    },
  ];

  return (
    <div className="bg-luxe-ivory w-full">
      {/* Header Banner */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-luxe-dark text-white overflow-hidden w-full">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop"
            alt="Reserve Luxury Appointment"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxe-dark via-luxe-dark/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold font-semibold">
              RESERVATIONS & CONCIERGE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal">
            Book Your Appointment
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Reserve your bespoke haircut, beard sculpt, skin treatment, or bridal experience in Tiruppur.
          </p>
        </div>
      </section>

      {/* Main Booking Container */}
      <section className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-8">
            <AppointmentForm />
          </div>

          {/* Right Sidebar: Concierge & Amenities */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            {/* Instant WhatsApp Card */}
            <div className="p-5 sm:p-6 bg-emerald-950 text-white border border-emerald-500/30 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold">
                  FAST-TRACK BOOKING
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-white">
                Book via WhatsApp
              </h4>
              <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                Prefer direct messaging? Chat live with our front-desk concierge for immediate time slot confirmations.
              </p>
              <a
                href="https://wa.me/919842100000?text=Hello%20Luxe%20Salon!%20I%20would%20like%20to%20reserve%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat</span>
              </a>
            </div>

            {/* Direct Phone */}
            <div className="p-5 sm:p-6 bg-white border border-luxe-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Call Front Desk
                  </h4>
                  <a
                    href="tel:+919842100000"
                    className="font-serif text-lg sm:text-xl text-luxe-charcoal hover:text-luxe-gold-dark font-semibold block mt-0.5"
                  >
                    +91 98421 00000
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-luxe-muted font-light mt-2.5">
                Lines open daily from 9:00 AM to 9:00 PM.
              </p>
            </div>

            {/* Salon Amenities */}
            <div className="p-5 sm:p-6 bg-luxe-cream/40 border border-luxe-border space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-luxe-charcoal">
                Guest Amenities
              </h4>
              <div className="space-y-2.5 text-xs text-stone-700 font-light">
                <div className="flex items-center gap-2.5">
                  <Coffee className="w-4 h-4 text-luxe-gold-dark shrink-0" />
                  <span>Complimentary Espresso & Herbal Teas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Wifi className="w-4 h-4 text-luxe-gold-dark shrink-0" />
                  <span>High-Speed Optical Fibre Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-luxe-gold-dark shrink-0" />
                  <span>Free Covered Valet Parking</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-luxe-gold-dark shrink-0" />
                  <span>Private VIP Suites Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-luxe-border max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
              HELP & GUIDANCE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-luxe-charcoal mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 sm:p-6 bg-white border border-luxe-border">
                <h4 className="font-serif text-base sm:text-lg text-luxe-charcoal mb-1.5">
                  {faq.q}
                </h4>
                <p className="text-xs text-luxe-muted font-light leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<Loader message="Opening appointment concierge..." />}>
      <BookingContent />
    </Suspense>
  );
}

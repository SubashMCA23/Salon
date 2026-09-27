'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';
import { api } from '@/lib/api';
import { ContactInput } from '@/types';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  MessageCircle,
  Sparkles,
  Send,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const { success, error } = useToast();
  const [formData, setFormData] = useState<ContactInput>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      error('Missing Information', 'Please fill in your name, email, and message.');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.createContactMessage(formData);
      setIsSent(true);
      success(
        'Message Dispatched',
        'Thank you for contacting Luxe Salon. Our concierge will be in touch shortly.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      error('Submission Error', err.message || 'Unable to submit your message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-luxe-ivory w-full">
      {/* Header Banner */}
      <section className="relative py-12 sm:py-20 md:py-28 bg-luxe-dark text-white overflow-hidden w-full">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=1600&auto=format&fit=crop"
            alt="Luxe Salon Contact"
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
              GUEST RELATIONS & CONCIERGE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal">
            Get in Touch
          </h1>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-stone-300 font-light max-w-xl mx-auto leading-relaxed">
            Have questions regarding gentleman grooming packages, bridal suites, or appointments? We are delighted to assist.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-10 sm:py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Left Column: Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                SALON LOCATION
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-luxe-charcoal mt-0.5">
                LUXE SALON
              </h2>
              <p className="text-xs uppercase tracking-widest text-luxe-muted mt-0.5">
                Tiruppur, Tamil Nadu, India
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 pt-4 border-t border-luxe-border">
              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Address
                  </h4>
                  <p className="text-xs text-luxe-muted font-light mt-0.5 leading-relaxed">
                    124, Avinashi Main Road, Pushpa Theatre Junction, <br />
                    Tiruppur, Tamil Nadu 641602
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Telephone
                  </h4>
                  <a
                    href="tel:+919842100000"
                    className="text-xs sm:text-sm text-luxe-charcoal font-semibold hover:text-luxe-gold-dark transition-colors mt-0.5 block"
                  >
                    +91 98421 00000
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-200">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Direct WhatsApp Concierge
                  </h4>
                  <a
                    href="https://wa.me/919842100000?text=Hello%20Luxe%20Salon!%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 font-semibold hover:underline mt-0.5 block"
                  >
                    Chat on WhatsApp (+91 98421 00000)
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Electronic Mail
                  </h4>
                  <a
                    href="mailto:contact@luxesalon.in"
                    className="text-xs text-luxe-charcoal hover:text-luxe-gold-dark transition-colors mt-0.5 block font-light"
                  >
                    contact@luxesalon.in
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Opening Hours
                  </h4>
                  <p className="text-xs text-luxe-muted font-light mt-0.5">
                    Monday to Sunday: 9:00 AM – 9:00 PM (Open 7 Days)
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-luxe-sand flex items-center justify-center text-luxe-gold-dark shrink-0">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-luxe-charcoal">
                    Instagram Portfolio
                  </h4>
                  <a
                    href="https://instagram.com/luxesalon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-luxe-gold-dark font-medium hover:underline mt-0.5 block"
                  >
                    @luxesalon
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-luxe-border p-4 sm:p-6 md:p-10 shadow-card w-full">
              <div className="border-b border-luxe-border/60 pb-4 sm:pb-6 mb-6 sm:mb-8">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                  SEND AN INQUIRY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-luxe-charcoal mt-1">
                  Message Our Guest Relations
                </h3>
                <p className="text-xs text-luxe-muted font-light mt-1">
                  We typically reply within 2 working hours.
                </p>
              </div>

              {isSent ? (
                <div className="py-8 sm:py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl sm:text-2xl text-luxe-charcoal">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs text-luxe-muted font-light mt-1.5 max-w-sm mx-auto">
                    Thank you for reaching out. A guest relations manager will connect with you via email or phone.
                  </p>
                  <Button
                    onClick={() => setIsSent(false)}
                    variant="outline"
                    size="sm"
                    className="mt-5"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Kavitha Balaji"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        inputMode="email"
                        name="email"
                        required
                        placeholder="e.g. kavitha@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        name="phone"
                        placeholder="e.g. +91 98430 77665"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        placeholder="e.g. Executive Grooming / Bridal Inquiry"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us about your requirements, date, or styling preferences..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3.5 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto py-3.5 text-xs font-semibold"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-16 border-t border-luxe-border w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
            <div>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                DIRECTIONS & PARKING
              </span>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-luxe-charcoal mt-0.5">
                Find Luxe Salon in Tiruppur
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Avinashi+Road+Tiruppur+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-luxe-gold-dark hover:underline font-semibold w-fit"
            >
              Open in Google Maps App →
            </a>
          </div>

          <div className="relative h-64 sm:h-80 md:h-96 w-full border border-luxe-border overflow-hidden bg-stone-100 shadow-xs">
            <iframe
              title="Luxe Salon Tiruppur Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.886475730383!2d77.3411!3d11.1085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA2JzMwLjYiTiA3N8KwMjAnMjguMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

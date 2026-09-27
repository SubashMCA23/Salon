'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Sparkles, Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { Service, AppointmentInput } from '@/types';
import { useToast } from '@/components/ui/ToastContext';
import { generateWhatsAppLink, formatDate } from '@/lib/utils';

interface AppointmentFormProps {
  initialService?: string;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ initialService }) => {
  const searchParams = useSearchParams();
  const serviceFromQuery = searchParams?.get('service') || '';
  const { success, error } = useToast();

  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  const [formData, setFormData] = useState<AppointmentInput>({
    name: '',
    phone: '',
    email: '',
    service: initialService || serviceFromQuery || '',
    appointmentDate: '',
    appointmentTime: '10:30 AM',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{
    appointment: any;
    bookingRef: string;
    whatsappUrl: string;
  } | null>(null);

  // Time slot options
  const timeSlots = [
    '09:30 AM', '10:30 AM', '11:30 AM', '12:30 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  // Minimum date string for input (today)
  const todayString = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
        if (!formData.service && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            service: serviceFromQuery || data[0].name,
          }));
        }
      } catch (err) {
        console.error('Failed to load services for dropdown:', err);
      } finally {
        setLoadingServices(false);
      }
    };

    loadServices();
  }, [serviceFromQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (slot: string) => {
    setFormData((prev) => ({ ...prev, appointmentTime: slot }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client validations
    if (!formData.name.trim()) {
      error('Name Required', 'Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      error('Phone Required', 'Please provide a contact phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      error('Valid Email Required', 'Please provide a valid email address for confirmation.');
      return;
    }
    if (!formData.service) {
      error('Service Required', 'Please select a salon service or package.');
      return;
    }
    if (!formData.appointmentDate) {
      error('Date Required', 'Please select your preferred appointment date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.createAppointment(formData);

      setConfirmedData({
        appointment: response.appointment,
        bookingRef: response.bookingRef,
        whatsappUrl: response.whatsappUrl,
      });

      // Celebration effect
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#C5A880', '#D4AF37', '#141413', '#E8D8C3'],
        });
      } catch (cErr) {
        // ignore on unsupported environments
      }

      success(
        'Appointment Request Received',
        'Our salon concierge will confirm your reservation shortly.'
      );
    } catch (err: any) {
      error('Booking Failed', err.message || 'Unable to submit booking. Please try again or message via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedData) {
    return (
      <div className="bg-white border border-luxe-border p-5 sm:p-8 md:p-12 shadow-card text-center max-w-2xl mx-auto w-full">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>

        <span className="text-[9px] sm:text-[11px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
          RESERVATION SUBMITTED
        </span>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-luxe-charcoal mt-1 mb-2 sm:mb-3">
          Your appointment request has been received.
        </h3>

        <p className="text-xs sm:text-sm text-luxe-muted font-light leading-relaxed mb-6">
          Thank you, <strong className="text-luxe-charcoal font-medium">{confirmedData.appointment.name}</strong>. Our guest relations concierge will contact you on <strong className="text-luxe-charcoal font-medium">{confirmedData.appointment.phone}</strong> to confirm your slot.
        </p>

        {/* Booking Summary Box */}
        <div className="p-4 sm:p-6 bg-luxe-cream/50 border border-luxe-border text-left max-w-lg mx-auto mb-6 sm:mb-8 space-y-2 text-xs text-stone-700">
          <div className="flex justify-between pb-2 border-b border-luxe-border/60">
            <span className="text-stone-500 uppercase tracking-wider text-[10px]">Booking ID:</span>
            <span className="font-mono font-bold text-luxe-charcoal text-xs sm:text-sm">#{confirmedData.bookingRef}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-stone-500">Service:</span>
            <span className="font-medium text-luxe-charcoal text-right truncate max-w-[60%]">{confirmedData.appointment.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Date:</span>
            <span className="font-medium text-luxe-charcoal">{formatDate(confirmedData.appointment.appointmentDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Time Slot:</span>
            <span className="font-medium text-luxe-charcoal">{confirmedData.appointment.appointmentTime}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-stone-500">Status:</span>
            <span className="px-2 py-0.5 text-[9px] uppercase font-semibold bg-amber-100 text-amber-900">
              Pending Confirmation
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={confirmedData.whatsappUrl || generateWhatsAppLink({
              name: confirmedData.appointment.name,
              service: confirmedData.appointment.service,
              date: formatDate(confirmedData.appointment.appointmentDate),
              time: confirmedData.appointment.appointmentTime,
              phone: confirmedData.appointment.phone,
              bookingRef: confirmedData.bookingRef,
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirm Instant via WhatsApp</span>
          </a>

          <Button
            onClick={() => setConfirmedData(null)}
            variant="outline"
            size="md"
            className="w-full sm:w-auto py-3.5"
          >
            Book Another Ritual
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-luxe-border p-4 sm:p-6 md:p-10 shadow-card transition-all duration-300 w-full"
    >
      <div className="border-b border-luxe-border/60 pb-4 sm:pb-6 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold text-luxe-gold-dark">
            ONLINE APPOINTMENT DESK
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-luxe-charcoal">
          Reserve Your Ritual
        </h3>
        <p className="text-xs text-luxe-muted font-light mt-1">
          Select your desired service, date and preferred slot. No payment required until appointment.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Full Name */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Your Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-luxe-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Karthik Natarajan"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
            />
          </div>
        </div>

        {/* Phone Number with tel type */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-luxe-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="tel"
              inputMode="tel"
              name="phone"
              required
              placeholder="e.g. +91 98421 55678"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
            />
          </div>
        </div>

        {/* Email Address with email type */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-luxe-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              inputMode="email"
              name="email"
              required
              placeholder="e.g. guest@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors"
            />
          </div>
        </div>

        {/* Service Select */}
        <div>
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Select Ritual or Service *
          </label>
          <div className="relative">
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors cursor-pointer"
            >
              {loadingServices ? (
                <option value="">Loading services...</option>
              ) : (
                services.map((s) => (
                  <option key={s._id} value={s.name}>
                    {s.name} ({s.category})
                  </option>
                ))
              )}
              <option value="The Executive Gentleman Haircut & Styling">The Executive Gentleman Haircut & Styling</option>
              <option value="Straight-Razor Royal Beard Architecture">Straight-Razor Royal Beard Architecture</option>
              <option value="Gentleman’s Sovereign Grooming Package">Gentleman’s Sovereign Grooming Package</option>
              <option value="Signature Haircut & Editorial Styling">Signature Haircut & Editorial Styling</option>
              <option value="Bridal Royal Glow Sanctuary">Bridal Royal Glow Sanctuary</option>
            </select>
          </div>
        </div>

        {/* Preferred Date with date type */}
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Preferred Appointment Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-luxe-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="date"
              name="appointmentDate"
              required
              min={todayString}
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Preferred Time Slots (Responsive 3/4 cols) */}
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Select Preferred Time Slot *
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2">
            {timeSlots.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => handleTimeSelect(slot)}
                className={`py-2 px-1 text-[10.5px] sm:text-[11px] font-medium border text-center transition-all ${
                  formData.appointmentTime === slot
                    ? 'bg-luxe-charcoal text-luxe-gold border-luxe-charcoal font-semibold shadow-xs'
                    : 'bg-luxe-cream/30 border-luxe-border text-stone-700 hover:border-luxe-gold hover:text-luxe-charcoal'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-luxe-charcoal font-medium mb-1.5">
            Special Requests or Notes (Optional)
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="e.g. Any allergies, preferred stylist, upcoming wedding or event date..."
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 sm:p-4 bg-luxe-cream/30 border border-luxe-border focus:border-luxe-gold focus:bg-white text-xs text-luxe-charcoal outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 sm:mt-8 pt-5 border-t border-luxe-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <Button
          type="submit"
          variant="gold"
          size="lg"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="w-full sm:w-auto py-3.5 text-xs font-semibold"
        >
          Confirm Reservation
        </Button>

        <a
          href={generateWhatsAppLink({
            name: formData.name || 'Guest',
            service: formData.service || 'Salon Consultation',
            date: formData.appointmentDate || 'Upcoming',
            time: formData.appointmentTime,
            phone: formData.phone,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 py-3 px-4 border border-emerald-600/40 text-emerald-800 text-xs font-semibold uppercase tracking-wider bg-emerald-50/70 hover:bg-emerald-100 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>Book via WhatsApp</span>
        </a>
      </div>
    </form>
  );
};

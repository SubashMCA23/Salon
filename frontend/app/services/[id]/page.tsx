'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, ArrowLeft, Check, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { api } from '@/lib/api';
import { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { AppointmentForm } from '@/components/booking/AppointmentForm';
import { ServiceCard } from '@/components/services/ServiceCard';

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api.getServiceById(id);
        setService(data.service);
        setRelatedServices(data.related || []);
      } catch (err) {
        console.error('Failed to load service details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-luxe-ivory">
        <Loader message="Retrieving ritual details..." />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 bg-luxe-ivory text-center">
        <h2 className="font-serif text-3xl text-luxe-charcoal mb-4">Service Not Found</h2>
        <p className="text-xs text-luxe-muted mb-6">The requested service could not be located in our menu.</p>
        <Button href="/services" variant="primary">
          Back to All Services
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-luxe-ivory">
      {/* Top Breadcrumbs */}
      <div className="bg-luxe-cream/50 border-b border-luxe-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-luxe-muted">
          <Link href="/services" className="hover:text-luxe-charcoal flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>
          <span>/</span>
          <span className="text-luxe-gold-dark font-medium">{service.category}</span>
          <span>/</span>
          <span className="text-luxe-charcoal font-semibold truncate max-w-xs">{service.name}</span>
        </div>
      </div>

      {/* Main Service Hero & Overview */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Col: Image */}
            <div className="lg:col-span-6">
              <div className="relative h-[420px] sm:h-[500px] w-full border border-luxe-border overflow-hidden bg-stone-100">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-luxe-charcoal text-luxe-gold text-[10px] uppercase tracking-widest px-3 py-1 font-semibold">
                  {service.category}
                </div>
              </div>
            </div>

            {/* Right Col: Details & Booking Trigger */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-luxe-gold" />
                  <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                    {service.subCategory || 'SIGNATURE RITUAL'}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-luxe-charcoal font-normal leading-tight">
                  {service.name}
                </h1>

                {/* Price & Duration Badge */}
                <div className="mt-6 p-5 bg-white border border-luxe-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxe-muted font-light block">
                      {service.startingPrice ? 'Estimated Starting Price' : 'Tariff'}
                    </span>
                    <p className="font-serif text-3xl font-normal text-luxe-charcoal mt-0.5">
                      {formatCurrency(service.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-luxe-charcoal font-medium bg-luxe-cream/80 px-4 py-2 border border-luxe-border">
                    <Clock className="w-4 h-4 text-luxe-gold" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Narrative */}
                <div className="mt-6 space-y-3 text-sm text-luxe-muted font-light leading-relaxed">
                  <p>{service.description}</p>
                  {service.longDescription && <p>{service.longDescription}</p>}
                </div>

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-luxe-border/60">
                    <h4 className="text-xs uppercase tracking-widest font-semibold text-luxe-charcoal mb-4">
                      Key Treatment Benefits:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 font-light">
                          <div className="w-4 h-4 rounded-full bg-luxe-gold/20 flex items-center justify-center text-luxe-gold-dark shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-luxe-border flex items-center gap-4">
                <Button href={`#book-section`} variant="gold" size="lg" className="w-full sm:w-auto">
                  Reserve This Experience
                </Button>
                <Button href="/services" variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Full Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section className="py-16 sm:py-24 bg-luxe-cream/40 border-y border-luxe-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                THE RITUAL EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-luxe-charcoal mt-1">
                The Treatment Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="bg-white border border-luxe-border p-6 relative flex flex-col justify-between">
                  <div>
                    <span className="font-serif text-3xl text-luxe-gold-dark font-normal block mb-3">
                      0{idx + 1}
                    </span>
                    <h4 className="font-serif text-xl text-luxe-charcoal mb-2">
                      {step}
                    </h4>
                  </div>
                  <div className="mt-4 pt-4 border-t border-luxe-border/40 text-[10px] uppercase tracking-widest text-stone-400">
                    Phase {idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Direct Booking Embed */}
      <section id="book-section" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppointmentForm initialService={service.name} />
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-24 bg-luxe-cream/20 border-t border-luxe-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-luxe-gold-dark font-semibold">
                  COMPLEMENTARY TREATMENTS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-luxe-charcoal mt-1">
                  More in {service.category}
                </h3>
              </div>
              <Link href="/services" className="text-xs uppercase tracking-widest text-luxe-gold-dark hover:text-luxe-charcoal font-medium">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedServices.map((rel, idx) => (
                <ServiceCard key={rel._id} service={rel} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

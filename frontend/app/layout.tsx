import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Italiana } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileFloatingCTA } from '@/components/layout/MobileFloatingCTA';
import { ToastProvider } from '@/components/ui/ToastContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-italiana',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Luxe Salon | Premium Unisex Salon in Tiruppur',
    template: '%s | Luxe Salon Tiruppur',
  },
  description:
    'Experience premium hair, beauty, bridal and men’s grooming services at Luxe Salon in Tiruppur. Where Beauty Meets Luxury.',
  keywords: [
    'Luxe Salon Tiruppur',
    'Luxury salon Tiruppur',
    'Best hair salon Tiruppur',
    'Bridal makeup studio Tiruppur',
    'Men grooming salon Tiruppur',
    'Keratin treatment Tiruppur',
    'Balayage Tiruppur',
    'Facial spa Tiruppur',
  ],
  authors: [{ name: 'Luxe Salon' }],
  creator: 'Luxe Salon',
  publisher: 'Luxe Salon',
  openGraph: {
    title: 'Luxe Salon | Premium Unisex Salon in Tiruppur',
    description:
      'Where Beauty Meets Luxury. Discover bespoke hair design, luminous skincare, couture bridal makeovers, and gentleman’s grooming.',
    url: 'http://localhost:3000',
    siteName: 'LUXE SALON',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Luxe Salon Tiruppur - Where Beauty Meets Luxury',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxe Salon | Premium Unisex Salon in Tiruppur',
    description: 'Experience premium hair, beauty, bridal and men’s grooming services at Luxe Salon in Tiruppur.',
    images: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF7F2',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'LUXE SALON',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1200&auto=format&fit=crop',
    '@id': 'http://localhost:3000',
    url: 'http://localhost:3000',
    telephone: '+919786149477',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '124, Avinashi Main Road, Pushpa Theatre Junction',
      addressLocality: 'Tiruppur',
      addressRegion: 'Tamil Nadu',
      postalCode: '641602',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.1085,
      longitude: 77.3411,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      'https://instagram.com/luxesalon',
      'https://wa.me/919786149477',
    ],
  };

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${italiana.variable} bg-[#FAF7F2]`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-luxe-ivory text-luxe-charcoal font-sans selection:bg-luxe-gold selection:text-white antialiased">
        <ToastProvider>
          <Navbar />
          <main className="flex-1 pb-12 md:pb-0">{children}</main>
          <MobileFloatingCTA />
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

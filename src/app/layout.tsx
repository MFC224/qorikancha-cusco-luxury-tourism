import type { Metadata } from 'next';
import { Cinzel, DM_Sans } from 'next/font/google';
import './globals.css';
import { cuscoConfig } from '@/data/cuscoConfig';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import SmoothScroll from '@/components/layout/SmoothScroll';
import CookieConsent from '@/components/ui/CookieConsent';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const siteUrl = 'https://qorikancha-cusco-luxury-tourism.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${cuscoConfig.brand.name} | ${cuscoConfig.destination.name} Luxury Expeditions`,
    template: `%s | ${cuscoConfig.brand.name}`,
  },
  description: `${cuscoConfig.destination.tagline}. ${cuscoConfig.destination.subtagline}`,
  keywords: [
    'Cusco Luxury Tours',
    'Machu Picchu Private Expeditions',
    'Salkantay Sky Domes Glamping',
    'Camino Inca Clásico VIP',
    'Valle Sagrado de los Incas',
    'Turismo de Ultralujo Peru',
    'Belmond Hiram Bingham Luxury',
  ],
  authors: [{ name: cuscoConfig.brand.name }],
  creator: cuscoConfig.brand.name,
  alternates: {
    canonical: siteUrl,
    languages: {
      'es-PE': siteUrl,
      'en-US': siteUrl,
      'x-default': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: siteUrl,
    title: `${cuscoConfig.brand.name} | ${cuscoConfig.destination.tagline}`,
    description: cuscoConfig.destination.subtagline,
    siteName: cuscoConfig.brand.name,
    images: [
      {
        url: `${siteUrl}/images/hero-cusco.webp`,
        width: 1200,
        height: 630,
        type: 'image/webp',
        alt: `${cuscoConfig.brand.name} - Plaza de Armas del Cusco & Expediciones Privadas`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${cuscoConfig.brand.name} | ${cuscoConfig.destination.tagline}`,
    description: cuscoConfig.destination.subtagline,
    images: [`${siteUrl}/images/hero-cusco.webp`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': `${siteUrl}/#agency`,
        name: cuscoConfig.brand.name,
        legalName: cuscoConfig.legal.legalName,
        description: cuscoConfig.destination.subtagline,
        url: siteUrl,
        telephone: cuscoConfig.concierge.displayPhone,
        email: cuscoConfig.concierge.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: cuscoConfig.legal.address,
          addressLocality: 'Cusco',
          addressRegion: 'Cusco',
          postalCode: '08002',
          addressCountry: 'PE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: cuscoConfig.destination.coordinates.lat,
          longitude: cuscoConfig.destination.coordinates.lng,
        },
        priceRange: '$$$$',
        openingHours: 'Mo-Su 07:00-22:00',
        sameAs: [
          'https://github.com/MFC224/qorikancha-cusco-luxury-tourism',
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Expediciones Privadas de Autor en Cusco',
        itemListElement: cuscoConfig.expeditions.map((exp, idx) => ({
          '@type': 'TouristTrip',
          position: idx + 1,
          name: exp.title,
          description: exp.summary,
          touristType: ['LuxuryTraveler', 'AdventureTraveler'],
          offers: {
            '@type': 'Offer',
            price: exp.pricePerPerson.replace(/[^0-9]/g, ''),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: '2026-01-01',
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: cuscoConfig.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${dmSans.variable} dark scroll-smooth`}
    >
      <head>
        {/* Google Consent Mode v2: Inicialización síncrona obligatoria con bloqueo por defecto */}
        <script
          id="google-consent-mode-v2-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              var consentCookie = document.cookie.match(/qorikancha_consent_status=([^;]+)/);
              var hasAnalytics = false;
              var hasMarketing = false;
              if (consentCookie && consentCookie[1]) {
                hasAnalytics = consentCookie[1].charAt(0) === '1';
                hasMarketing = consentCookie[1].charAt(1) === '1';
              }

              gtag('consent', 'default', {
                'analytics_storage': hasAnalytics ? 'granted' : 'denied',
                'ad_storage': hasMarketing ? 'granted' : 'denied',
                'ad_user_data': hasMarketing ? 'granted' : 'denied',
                'ad_personalization': hasMarketing ? 'granted' : 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-obsidian text-mist antialiased selection:bg-gold selection:text-obsidian font-sans">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}

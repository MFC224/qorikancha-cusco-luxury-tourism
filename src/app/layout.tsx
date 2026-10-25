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

export const metadata: Metadata = {
  title: `${cuscoConfig.brand.name} | ${cuscoConfig.destination.name} Luxury Expeditions`,
  description: `${cuscoConfig.destination.tagline}. ${cuscoConfig.destination.subtagline}`,
  keywords: [
    'Cusco Luxury Tours',
    'Machu Picchu Private Expeditions',
    'Salkantay Sky Domes',
    'Camino Inca VIP',
    'Valle Sagrado de los Incas',
    'Turismo de Lujo Peru',
  ],
  authors: [{ name: cuscoConfig.brand.name }],
  creator: cuscoConfig.brand.name,
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://cusco-luxury-expeditions.com',
    title: `${cuscoConfig.brand.name} — ${cuscoConfig.destination.tagline}`,
    description: cuscoConfig.destination.subtagline,
    siteName: cuscoConfig.brand.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: `${cuscoConfig.brand.name} - Machu Picchu Amanecer Sagrado`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${cuscoConfig.brand.name} — ${cuscoConfig.destination.name}`,
    description: cuscoConfig.destination.subtagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: cuscoConfig.brand.name,
    description: cuscoConfig.destination.subtagline,
    url: 'https://cusco-luxury-expeditions.com',
    telephone: cuscoConfig.concierge.displayPhone,
    email: cuscoConfig.concierge.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Portal de Panes 123, Plaza de Armas',
      addressLocality: 'Cusco',
      addressRegion: 'Cusco',
      addressCountry: 'PE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: cuscoConfig.destination.coordinates.lat,
      longitude: cuscoConfig.destination.coordinates.lng,
    },
    priceRange: '$$$$',
    openingHours: 'Mo-Su 00:00-23:59',
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

import type { Metadata } from 'next';
import { Cinzel, DM_Sans } from 'next/font/google';
import Script from 'next/script';
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
        {/* Zero-FOUC Theme Initializer (Obsidian Dark / Travertine Light) */}
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('qorikancha_theme');
                  if (saved === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
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
        {/* Zero-FOUC Automatic Language Detector (Browser Language -> googtrans cookie) */}
        <script
          id="language-auto-detector"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var hasCookie = document.cookie.indexOf('googtrans=') !== -1;
                  if (!hasCookie) {
                    var saved = localStorage.getItem('qorikancha_language');
                    var targetLang = saved;
                    if (!targetLang) {
                      var browserLang = (navigator.language || navigator.userLanguage || 'es').toLowerCase();
                      var primary = browserLang.split('-')[0];
                      var supported = ['en', 'pt', 'fr', 'de', 'it'];
                      if (supported.indexOf(primary) !== -1) {
                        targetLang = primary;
                      } else if (browserLang.indexOf('es') !== 0) {
                        targetLang = 'en';
                      }
                    }
                    if (targetLang && targetLang !== 'es') {
                      var cookieVal = '/auto/' + targetLang;
                      document.cookie = 'googtrans=' + cookieVal + '; path=/;';
                      document.cookie = 'googtrans=' + cookieVal + '; path=/; domain=' + window.location.hostname + ';';
                      localStorage.setItem('qorikancha_language', targetLang);
                      localStorage.setItem('qorikancha_auto_detected', targetLang);
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-obsidian text-mist antialiased selection:bg-gold selection:text-obsidian font-sans">
        {/* Google Translate Hidden Element & Callbacks */}
        <div id="google_translate_element" className="hidden" aria-hidden="true" style={{ display: 'none' }} />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'es',
                  includedLanguages: 'es,en,pt,fr,de,it',
                  autoDisplay: false,
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            };
          `}
        </Script>
        <Script
          id="google-translate-script"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

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

import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  Mountain,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  Calendar,
  BedDouble,
  ArrowLeft,
  Compass,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cuscoConfig.expeditions.map((exp) => ({
    slug: exp.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exp = cuscoConfig.expeditions.find((e) => e.id === slug);
  if (!exp) return {};

  const siteUrl = 'https://qorikancha-cusco-luxury-tourism.vercel.app';
  const pageUrl = `${siteUrl}/expediciones/${exp.id}`;
  const imageUrl = `${siteUrl}${exp.image}`;

  return {
    title: `${exp.title} | ${cuscoConfig.brand.name}`,
    description: `${exp.subtitle}. ${exp.summary}`,
    alternates: {
      canonical: pageUrl,
      languages: {
        'es-PE': pageUrl,
        'en-US': pageUrl,
        'x-default': pageUrl,
      },
    },
    openGraph: {
      type: 'website',
      url: pageUrl,
      title: `${exp.title} — ${cuscoConfig.brand.name}`,
      description: exp.summary,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: exp.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${exp.title} | ${cuscoConfig.brand.name}`,
      description: exp.subtitle,
      images: [imageUrl],
    },
  };
}

export default async function ExpeditionPage({ params }: Props) {
  const { slug } = await params;
  const exp = cuscoConfig.expeditions.find((e) => e.id === slug);

  if (!exp) {
    notFound();
  }

  const { concierge } = cuscoConfig;
  const siteUrl = 'https://qorikancha-cusco-luxury-tourism.vercel.app';

  const touristTripJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: exp.title,
    description: exp.summary,
    url: `${siteUrl}/expediciones/${exp.id}`,
    image: `${siteUrl}${exp.image}`,
    touristType: ['LuxuryTraveler', 'AdventureTraveler'],
    offers: {
      '@type': 'Offer',
      price: exp.pricePerPerson.replace(/[^0-9]/g, ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
    },
    provider: {
      '@type': 'TravelAgency',
      name: cuscoConfig.brand.name,
      url: siteUrl,
      telephone: concierge.displayPhone,
    },
  };

  return (
    <article className="min-h-screen bg-obsidian text-mist pt-24 pb-20 selection:bg-gold selection:text-obsidian">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Navegación de Retorno */}
        <div className="mb-8">
          <Link
            href="/#expediciones"
            className="inline-flex items-center gap-2 text-xs font-sans text-mist/60 hover:text-gold transition-colors tracking-widest uppercase"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Colección de Expediciones</span>
          </Link>
        </div>

        {/* Cabecera & Titular */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-sans font-medium tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {exp.badge} · EXPEDICIÓN 100% PRIVADA
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-mist leading-tight">
            {exp.title}
          </h1>

          <p className="mt-3 text-base sm:text-xl font-sans text-gold/90 font-light">
            {exp.subtitle}
          </p>
        </header>

        {/* Fotografía Panorámica Heroica */}
        <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden border border-gold/30 shadow-obsidian-glow mb-12">
          <Image
            src={exp.image}
            alt={exp.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        </div>

        {/* Métricas Clave de Expedición */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl glass-card border border-gold/25 mb-12 text-xs font-sans">
          <div>
            <span className="text-[10px] text-mist/50 block uppercase tracking-wider mb-1">DURACIÓN</span>
            <span className="font-semibold text-mist text-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gold" />
              {exp.duration}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-mist/50 block uppercase tracking-wider mb-1">ALTITUD MÁXIMA</span>
            <span className="font-semibold text-gold text-sm flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-gold" />
              {exp.maxAltitude}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-mist/50 block uppercase tracking-wider mb-1">DIFICULTAD</span>
            <span className="font-semibold text-mist text-sm flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-gold" />
              {exp.difficulty}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-mist/50 block uppercase tracking-wider mb-1">TARIFA PRIVADA</span>
            <span className="font-bold text-gold text-sm sm:text-base">
              {exp.pricePerPerson}
            </span>
          </div>
        </div>

        {/* Resumen Editorial & Filosofía de Viaje */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-serif text-mist mb-4">
            Filosofía & Descripción de la Travesía
          </h2>
          <p className="text-sm sm:text-base font-sans text-mist/80 leading-relaxed">
            {exp.summary}
          </p>

          {exp.priceDetails && (
            <div className="mt-6 p-5 rounded-2xl bg-gold/5 border border-gold/20 text-xs font-sans text-mist/85 leading-relaxed">
              <strong className="text-gold uppercase tracking-wider block mb-1">Condiciones de Tarifa:</strong>
              {exp.priceDetails}
            </div>
          )}
        </section>

        {/* Itinerario Detallado Día por Día */}
        {exp.itinerary && exp.itinerary.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl font-serif text-mist mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" /> Itinerario Día por Día
            </h2>

            <div className="space-y-4">
              {exp.itinerary.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-card border border-white/10 font-sans"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-bold text-gold tracking-wider">
                      {item.day}: {item.title}
                    </span>
                    <span className="text-[11px] text-mist/60 bg-obsidian-light px-3 py-1 rounded-full border border-white/10 w-fit">
                      {item.elevation}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-mist/75 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Qué Incluye & Qué No Incluye */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 text-xs font-sans">
          <div className="p-6 rounded-3xl glass-card border border-gold/20">
            <h3 className="font-bold text-gold uppercase tracking-wider mb-4 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold" /> Qué Incluye el Servicio
            </h3>
            <ul className="space-y-2.5 text-mist/80">
              {exp.included?.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-gold text-sm shrink-0">✦</span>
                  <span className="leading-relaxed">{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-white/10">
            <h3 className="font-bold text-mist/60 uppercase tracking-wider mb-4 flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4 text-mist/50" /> Qué No Incluye
            </h3>
            <ul className="space-y-2.5 text-mist/65">
              {exp.notIncluded?.map((not, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-mist/40 text-sm shrink-0">—</span>
                  <span className="leading-relaxed">{not}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Hoteles Asociados Recomendados */}
        {exp.recommendedHotels && exp.recommendedHotels.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl sm:text-2xl font-serif text-mist mb-6 flex items-center gap-2">
              <BedDouble className="w-5 h-5 text-gold" /> Hoteles & Lodges Recomendados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
              {exp.recommendedHotels.map((hotel, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl glass-card border border-gold/20 text-mist/85 font-medium flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                  <span>{hotel}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Llamado a la Acción / Reserva */}
        <section className="p-8 sm:p-12 rounded-3xl glass-card border border-gold/35 shadow-gold-glow text-center space-y-6">
          <span className="hud-badge text-gold border-gold/40">
            CONSULTA PERSONALIZADA DE DISPONIBILIDAD
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-mist max-w-xl mx-auto">
            ¿Desea personalizar las fechas o solicitar una propuesta formal?
          </h2>
          <p className="text-xs sm:text-sm font-sans text-mist/75 max-w-md mx-auto leading-relaxed">
            Nuestros diseñadores de expediciones le responderán con el itinerario a medida, disponibilidad de permisos y opciones de habitación.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={concierge.generateWhatsAppUrl({ expeditionTitle: exp.title })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold text-obsidian text-xs font-sans font-bold tracking-wider uppercase shadow-gold-glow hover:bg-gold-light transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultar en WhatsApp VIP</span>
            </a>

            <Link
              href="/#contacto"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/20 hover:border-gold/50 text-xs font-sans text-mist/80 hover:text-gold transition-colors"
            >
              Formulario por Correo Electrónico
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

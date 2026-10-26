'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cuscoConfig, Expedition } from '@/data/cuscoConfig';
import MagneticRollButton from '@/components/ui/MagneticRollButton';
import {
  Mountain,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Sparkles,
  FileText,
  BedDouble,
  Calendar,
  X,
  ChevronRight,
} from 'lucide-react';

export default function CinematicCardStack() {
  const { expeditions, concierge } = cuscoConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedExpedition, setSelectedExpedition] = useState<Expedition | null>(null);

  useEffect(() => {
    // Respetar preferencias de accesibilidad para reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Configuramos la deformación y apilamiento 3D para cada tarjeta excepto la última
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // La última tarjeta permanece en su posición final

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        // Rotación alternada suave (+1.8deg / -1.8deg)
        const targetRotation = index % 2 === 0 ? -1.8 : 1.8;
        const overlay = card.querySelector('.card-dim-overlay');
        const content = card.querySelector('.card-content-inner');

        gsap.to(card, {
          scale: 0.94,
          rotate: targetRotation,
          borderRadius: 36,
          yPercent: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1.1,
          },
        });

        // Oscurecimiento gradual por superposición de profundidad
        if (overlay) {
          gsap.to(overlay, {
            opacity: 0.6,
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 1.1,
            },
          });
        }

        // Salida sutil del contenido de la tarjeta anterior
        if (content) {
          gsap.to(content, {
            opacity: 0.4,
            filter: 'blur(1.5px)',
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top 80%',
              end: 'top 25%',
              scrub: 1.1,
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [expeditions.length]);

  const getCursorLabel = (id: string) => {
    switch (id) {
      case 'machu-picchu-sunrise':
        return 'MACHU PICCHU';
      case 'salkantay-sky-domes':
        return 'SALKANTAY';
      case 'camino-inca-vip':
        return 'CAMINO INCA';
      case 'valle-sagrado-ausangate':
        return 'VALLE SAGRADO';
      case 'vinicunca-rainbow-mountain':
        return 'VINICUNCA';
      default:
        return 'EXPLORAR';
    }
  };

  return (
    <section
      id="expediciones"
      ref={containerRef}
      className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15"
    >
      {/* Cabecera Editorial de la Sección */}
      <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// LAS 5 GRANDES EXPEDICIONES'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              Travesías Privadas de Autor
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-sans">
              Cada expedición es operada con arqueólogo exclusivo, vehículos 4x4 dedicados, campamentos de diseño geodésico y monitoreo médico de altitud.
            </p>
          </div>

          <div className="hud-badge text-gold self-start sm:self-end">
            EXPEDICIONES 100% PRIVADAS
          </div>
        </div>
      </div>

      {/* Contenedor del Apilamiento de Tarjetas */}
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-24">
        {expeditions.map((exp: Expedition, index: number) => {
          const cursorText = getCursorLabel(exp.id);

          return (
            <div
              key={exp.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-cursor={cursorText}
              className="sticky top-20 sm:top-24 h-[80vh] sm:h-[84vh] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-obsidian-glow border border-gold/30 bg-[#08090A] group transition-shadow duration-500"
              style={{
                transformOrigin: 'center 15%',
                willChange: 'transform, border-radius, opacity',
              }}
            >
              {/* Fotografía Panorámica de Fondo con máxima viveza cromática */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 saturate-[1.08] contrast-[1.05]"
                />
                {/* Capa de Gradiente Cinemático: Protege el texto manteniendo la imagen 100% viva, nítida y colorida */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090A]/95 via-[#08090A]/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#08090A]/90 via-[#08090A]/40 to-transparent" />
              </div>

              {/* Capa de Oscurecimiento Gradual para Profundidad 3D */}
              <div className="card-dim-overlay pointer-events-none absolute inset-0 z-10 bg-[#08090A] opacity-0 transition-opacity" />

              {/* Contenido Editorial de la Tarjeta */}
              <div className="card-content-inner relative z-20 h-full p-6 sm:p-12 lg:p-16 flex flex-col justify-between">
                {/* Parte Superior: Índice de Expedición, Badge & Altitud */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-sans text-xs sm:text-sm text-[#E0C28A] font-bold tracking-widest bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C8A261]/40 shadow-sm">
                      0{index + 1} / 0{expeditions.length}
                    </span>
                    <span className="hud-badge bg-black/65 backdrop-blur-md hidden sm:inline-flex text-[#E0C28A] border-[#C8A261]/35">
                      {exp.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center text-xs font-sans font-medium text-white/90 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                      <Mountain className="w-3.5 h-3.5 text-[#E0C28A] mr-1.5" />
                      {exp.maxAltitude}
                    </span>
                    <span className="inline-flex items-center text-xs font-sans font-medium text-white/90 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-[#E0C28A] mr-1.5" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Parte Central: Titular Monumental & Resumen */}
                <div className="max-w-3xl my-auto py-4 sm:py-6">
                  <span className="text-xs font-sans font-semibold text-[#E0C28A] tracking-widest uppercase block mb-2 drop-shadow-sm">
                    {exp.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium text-white leading-[1.15] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    {exp.title}
                  </h3>
                  <p className="mt-3 sm:mt-5 text-[#F4F4F0]/90 text-xs sm:text-base font-sans font-normal leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none drop-shadow-sm">
                    {exp.summary}
                  </p>

                  {/* Highlights de la Expedición */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.highlights.slice(0, 3).map((h, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center text-xs font-sans text-white/95 bg-black/65 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#C8A261]/35 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E0C28A] mr-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parte Inferior: Tarifa Transparente, Botón Detalle & Cotización */}
                <div className="pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block text-[10px] font-sans font-semibold text-white/70 tracking-wider uppercase">
                      TARIFA PRIVADA BASE
                    </span>
                    <span className="text-xl sm:text-3xl font-serif text-[#E0C28A] font-semibold drop-shadow-sm">
                      {exp.pricePerPerson}
                    </span>
                    <p className="text-[11px] font-sans text-white/80 mt-0.5 line-clamp-1 max-w-sm">
                      {exp.priceDetails || 'Base ocupación doble · Servicio 100% privado.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedExpedition(exp)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#C8A261]/50 bg-black/70 hover:bg-[#C8A261]/25 text-[#E0C28A] text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Ver Itinerario & Qué Incluye</span>
                    </button>

                    <MagneticRollButton
                      href={concierge.generateWhatsAppUrl({ expeditionTitle: exp.title })}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      dataCursor="RESERVAR"
                      icon={<MessageSquare className="w-4 h-4" />}
                    >
                      Cotizar en WhatsApp
                    </MagneticRollButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Drawer Desplegable con Itinerario Completo Día a Día & Hoteles */}
      {selectedExpedition && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-xl animate-fade-in"
        >
          <div
            className="absolute inset-0"
            onClick={() => setSelectedExpedition(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-2xl bg-obsidian-card text-mist">
            {/* Cabecera del Expediente */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10 gap-4">
              <div>
                <span className="hud-badge text-[10px] text-gold border-gold/30 mb-2 inline-block">
                  FICHA TÉCNICA · {selectedExpedition.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-mist">
                  {selectedExpedition.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-gold/90 mt-1">
                  {selectedExpedition.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExpedition(null)}
                aria-label="Cerrar ficha técnica"
                className="p-2 rounded-full border border-white/10 text-mist/60 hover:text-gold hover:border-gold transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Ficha Rápida: Altura, Duración y Tarifa */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10 text-xs font-sans">
              <div className="p-3 rounded-2xl bg-obsidian-light/60 border border-white/5">
                <span className="text-mist/50 block mb-1 uppercase tracking-wider text-[10px]">DURACIÓN</span>
                <span className="font-semibold text-mist">{selectedExpedition.duration}</span>
              </div>
              <div className="p-3 rounded-2xl bg-obsidian-light/60 border border-white/5">
                <span className="text-mist/50 block mb-1 uppercase tracking-wider text-[10px]">ALTITUD MÁXIMA</span>
                <span className="font-semibold text-gold">{selectedExpedition.maxAltitude}</span>
              </div>
              <div className="p-3 rounded-2xl bg-obsidian-light/60 border border-white/5">
                <span className="text-mist/50 block mb-1 uppercase tracking-wider text-[10px]">DIFICULTAD</span>
                <span className="font-semibold text-mist">{selectedExpedition.difficulty}</span>
              </div>
              <div className="p-3 rounded-2xl bg-obsidian-light/60 border border-white/5">
                <span className="text-mist/50 block mb-1 uppercase tracking-wider text-[10px]">TARIFA PRIVADA</span>
                <span className="font-bold text-gold">{selectedExpedition.pricePerPerson}</span>
              </div>
            </div>

            {/* Desglose de Precios & Condiciones */}
            {selectedExpedition.priceDetails && (
              <div className="py-4 border-b border-white/10 text-xs font-sans text-mist/80 bg-gold/5 p-4 rounded-2xl my-4 border border-gold/20">
                <span className="text-gold font-semibold uppercase tracking-wider block mb-1 text-[11px]">
                  Condiciones & Detalle de Tarifa:
                </span>
                {selectedExpedition.priceDetails}
              </div>
            )}

            {/* Itinerario Día a Día */}
            {selectedExpedition.itinerary && selectedExpedition.itinerary.length > 0 && (
              <div className="py-6 border-b border-white/10">
                <h4 className="text-sm font-sans font-bold tracking-widest text-gold uppercase mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> ITINERARIO DÍA POR DÍA
                </h4>
                <div className="space-y-4">
                  {selectedExpedition.itinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-obsidian-light/70 border border-white/10 font-sans"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-gold tracking-wider">
                          {item.day}: {item.title}
                        </span>
                        <span className="text-[10px] text-mist/60 bg-obsidian px-2.5 py-0.5 rounded-full border border-white/10">
                          {item.elevation}
                        </span>
                      </div>
                      <p className="text-xs text-mist/75 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Qué Incluye & Qué No Incluye */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-white/10 text-xs font-sans">
              {/* Qué Incluye */}
              <div>
                <h4 className="font-bold text-gold uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" /> QUÉ INCLUYE ESTA EXPEDICIÓN
                </h4>
                <ul className="space-y-2 text-mist/80">
                  {selectedExpedition.included?.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gold text-sm shrink-0">✦</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qué No Incluye */}
              <div>
                <h4 className="font-bold text-mist/60 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-mist/50" /> QUÉ NO INCLUYE
                </h4>
                <ul className="space-y-2 text-mist/65">
                  {selectedExpedition.notIncluded?.map((not, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-mist/40 text-sm shrink-0">—</span>
                      <span>{not}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hoteles Asociados Recomendados */}
            {selectedExpedition.recommendedHotels && selectedExpedition.recommendedHotels.length > 0 && (
              <div className="py-6 border-b border-white/10 text-xs font-sans">
                <h4 className="font-bold text-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BedDouble className="w-4 h-4" /> HOTELES & LODGES RECOMENDADOS EN RUTA
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedExpedition.recommendedHotels.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-obsidian-light/60 border border-gold/20 text-mist/85 font-medium"
                    >
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Datos Prácticos de Permisos & Temporada */}
            <div className="py-6 border-b border-white/10 text-xs font-sans text-mist/75 space-y-2">
              {selectedExpedition.bestSeason && (
                <p>
                  <strong className="text-gold">Mejor Época:</strong> {selectedExpedition.bestSeason}
                </p>
              )}
              {selectedExpedition.permitsRequired && (
                <p>
                  <strong className="text-gold">Disponibilidad de Permisos:</strong> {selectedExpedition.permitsRequired}
                </p>
              )}
            </div>

            {/* Footer con Enlace de Cotización Directa */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-gold/50 text-xs font-sans text-mist/70 hover:text-gold transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Imprimir / PDF</span>
                </button>

                <Link
                  href={`/expediciones/${selectedExpedition.id}`}
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-gold/40 hover:border-gold text-xs font-sans text-gold hover:text-white transition-colors"
                >
                  <span>Página Dedicada</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <a
                href={concierge.generateWhatsAppUrl({ expeditionTitle: selectedExpedition.title })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-obsidian text-xs font-sans font-bold tracking-wider uppercase shadow-gold-glow hover:bg-gold-light transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Solicitar Disponibilidad de Fechas</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

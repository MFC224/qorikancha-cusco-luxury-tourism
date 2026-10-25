'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cuscoConfig, Expedition } from '@/data/cuscoConfig';
import MagneticRollButton from '@/components/ui/MagneticRollButton';
import {
  Mountain,
  Clock,
  CheckCircle2,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function CinematicCardStack() {
  const { expeditions, concierge } = cuscoConfig;
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Configuramos la deformación y apilamiento 3D para cada tarjeta excepto la última
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // La última tarjeta permanece plana en su posición final

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        // Rotación alternada para realismo físico (+2.2deg / -2.2deg)
        const targetRotation = index % 2 === 0 ? -2.2 : 2.2;
        const overlay = card.querySelector('.card-dim-overlay');
        const content = card.querySelector('.card-content-inner');

        gsap.to(card, {
          scale: 0.88,
          rotate: targetRotation,
          borderRadius: 36,
          yPercent: -4,
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
            opacity: 0.65,
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
            opacity: 0.35,
            filter: 'blur(2px)',
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
              Cada expedición es operada en rigurosa privacidad, con campamentos de diseño geodésico, chefs de terroir y acompañamiento médico continuo.
            </p>
          </div>

          <div className="hud-badge text-gold self-start sm:self-end">
            SCROLL TRIGGER 3D · 5 ETAPAS
          </div>
        </div>
      </div>

      {/* Contenedor del Apilamiento de Tarjetas 100vh */}
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
              className="sticky top-20 sm:top-24 h-[82vh] sm:h-[86vh] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-obsidian-glow border border-gold/25 bg-obsidian-card group transition-shadow duration-500"
              style={{
                transformOrigin: 'center top',
                willChange: 'transform, border-radius, opacity',
              }}
            >
              {/* Fotografía Panorámica 4K de Fondo */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Capa de Gradiente para Máximo Contraste y Legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-obsidian/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian/85 via-obsidian/40 to-transparent" />
              </div>

              {/* Capa de Oscurecimiento Gradual para Profundidad 3D */}
              <div className="card-dim-overlay pointer-events-none absolute inset-0 z-10 bg-obsidian opacity-0 transition-opacity" />

              {/* Contenido Editorial de la Tarjeta */}
              <div className="card-content-inner relative z-20 h-full p-6 sm:p-12 lg:p-16 flex flex-col justify-between">
                {/* Parte Superior: Índice de Expedición, Badge & Altitud */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-sans text-xs sm:text-sm text-gold font-bold tracking-widest bg-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/30">
                      0{index + 1} / 0{expeditions.length}
                    </span>
                    <span className="hud-badge bg-obsidian/80 backdrop-blur-md hidden sm:inline-flex">
                      {exp.badge}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="inline-flex items-center text-xs font-sans font-medium text-mist bg-obsidian/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                      <Mountain className="w-3.5 h-3.5 text-gold mr-1.5" />
                      {exp.maxAltitude}
                    </span>
                    <span className="inline-flex items-center text-xs font-sans font-medium text-mist bg-obsidian/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-gold mr-1.5" />
                      {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Parte Central: Titular Monumental & Resumen Poético */}
                <div className="max-w-3xl my-auto py-6">
                  <span className="text-xs font-sans font-medium text-gold/90 tracking-widest uppercase block mb-2">
                    {exp.subtitle}
                  </span>
                  <h3 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-mist leading-[1.1] tracking-tight">
                    {exp.title}
                  </h3>
                  <p className="mt-4 sm:mt-6 text-mist/85 text-sm sm:text-lg font-sans font-light leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none">
                    {exp.summary}
                  </p>

                  {/* Highlights de la Expedición */}
                  <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                    {exp.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center text-xs font-sans text-mist/90 bg-obsidian/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold/20"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold mr-1.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parte Inferior: Precio & Botón de Reserva con WhatsApp VIP */}
                <div className="pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block text-[11px] font-sans font-medium text-mist/50 tracking-wider uppercase">TARIFA PRIVADA BESPOKE</span>
                    <span className="text-2xl sm:text-3xl font-serif text-gold font-semibold">
                      {exp.pricePerPerson}
                    </span>
                    <span className="text-xs font-sans font-medium text-mist/50 ml-2">/ pasajero</span>
                  </div>

                  <div className="flex items-center space-x-3">
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
    </section>
  );
}

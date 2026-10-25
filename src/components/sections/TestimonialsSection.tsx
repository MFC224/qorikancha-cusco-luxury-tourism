'use client';

import React, { useState } from 'react';
import { cuscoConfig, Testimonial } from '@/data/cuscoConfig';
import {
  Star,
  Quote,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  MapPin,
  HeartHandshake,
} from 'lucide-react';

export default function TestimonialsSection() {
  const { testimonials, concierge } = cuscoConfig;
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = [
    'Todas',
    'Machu Picchu Signature',
    'Salkantay Glamping',
    'Camino Inca VIP',
    'Familias & Parejas',
  ];

  const filteredTestimonials =
    selectedCategory === 'Todas'
      ? testimonials
      : testimonials.filter((t) => t.category === selectedCategory);

  return (
    <section id="testimonios" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// EXPERIENCIAS VERIFICADAS DE ALTA GAMA'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              Voces de Quienes Conquistaron la Cumbre
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
              La excelencia en los Andes no se promete: se demuestra en cada detalle logístico, en el silencio del alba frente a la ciudadela y en el trato humano más reverente de Sudamérica.
            </p>
          </div>

          <div className="hud-badge text-gold self-start md:self-end flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-gold" />
            TRIPADVISOR TRAVELERS&apos; CHOICE 2026
          </div>
        </div>

        {/* Tarjeta Resumen de Métricas de Reputación */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-obsidian-glow mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="sm:border-r sm:border-white/10 sm:pr-6">
            <div className="flex items-center gap-2">
              <span className="text-4xl sm:text-5xl font-serif text-gold font-bold">4.96</span>
              <div>
                <div className="flex items-center text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-[11px] font-sans font-medium text-mist/60 uppercase tracking-wider block mt-0.5">
                  Sobre 5.0 Estrellas
                </span>
              </div>
            </div>
            <p className="text-xs text-mist/70 font-sans mt-2">
              Basado en 420+ evaluaciones auditadas de viajeros de ultralujo.
            </p>
          </div>

          <div className="lg:border-r lg:border-white/10 lg:pr-6">
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-gold" />
              100% Salidas Privadas
            </span>
            <p className="text-xs text-mist/75 font-sans leading-relaxed">
              Cero subcontratación. Vehículo 4x4, chofer y arqueólogo de cabecera exclusivos para tu grupo.
            </p>
          </div>

          <div className="sm:border-r sm:border-white/10 sm:pr-6">
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <HeartHandshake className="w-4 h-4 text-gold" />
              Trato Digno Certificado
            </span>
            <p className="text-xs text-mist/75 font-sans leading-relaxed">
              Porteadores y arrieros con salario justo (+40%), seguro integral y equipamiento de alta montaña.
            </p>
          </div>

          <div>
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              Circuitos Garantizados
            </span>
            <p className="text-xs text-mist/75 font-sans leading-relaxed">
              Boletos nominales a Circuitos 1 o 2 de Machu Picchu y trenes panorámicos emitidos con anticipación.
            </p>
          </div>
        </div>

        {/* Selector de Filtros por Categoría */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-gold text-obsidian font-semibold border-gold shadow-gold-glow'
                  : 'bg-obsidian-card text-mist/70 border-white/10 hover:border-gold/30 hover:text-mist'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Retícula de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((t: Testimonial) => (
            <div
              key={t.id}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/20 shadow-obsidian-glow flex flex-col justify-between glass-card-hover group"
            >
              <div>
                {/* Cabecera del Testimonio: Rating & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="hud-badge text-[10px]">
                    {t.flag} {t.origin}
                  </span>
                </div>

                {/* Hito Destacado */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-[11px] font-sans font-medium uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3 text-gold" />
                  <span>{t.highlight}</span>
                </div>

                {/* Cita Textual */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-gold/15 absolute -top-3 -left-2 -z-10" />
                  <p className="text-xs sm:text-sm text-mist/85 font-sans leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Pie del Testimonio: Autor y Expedición */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-xs shrink-0">
                    {t.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-medium text-mist group-hover:text-gold transition-colors">
                      {t.author}
                    </h4>
                    <span className="text-[10px] font-sans font-medium text-mist/50 block truncate max-w-[180px] sm:max-w-[200px]">
                      {t.tripType}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-sans text-mist/40 shrink-0">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Llamado a la Acción Concierge */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-obsidian-light/60 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-serif font-medium text-mist">
                ¿Deseas una travesía diseñada exclusivamente para ti?
              </h4>
              <p className="text-xs text-mist/70 font-sans mt-0.5">
                Nuestro Concierge diseña itinerarios privados a medida con respuesta garantizada en menos de 15 minutos.
              </p>
            </div>
          </div>

          <a
            href={concierge.generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs uppercase tracking-widest font-bold shadow-gold-glow transition-all shrink-0 cursor-pointer"
          >
            Hablar con Concierge VIP
          </a>
        </div>
      </div>
    </section>
  );
}

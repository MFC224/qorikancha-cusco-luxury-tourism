'use client';

import React, { useState } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  Star,
  Quote,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  FileCheck2,
  MessageSquare,
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
              {'// BITÁCORAS DE CAMPO & EXPERIENCIAS DE HUÉSPEDES'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              Relatos de Viaje & Cuaderno de Bitácora
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
              Extractos representativos de las bitácoras de campo y vivencias compartidas por nuestros expedicionarios tras recorrer las rutas de alta montaña en Cusco y el Valle Sagrado.
            </p>
          </div>

          <div className="hud-badge text-gold self-start md:self-end flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-gold" />
            REGISTRO DE EXPERIENCIAS VERIFICADAS
          </div>
        </div>

        {/* Tarjeta Resumen de Estándares & Acreditaciones Operativas */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-obsidian-glow mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          <div className="sm:border-r sm:border-white/10 sm:pr-6">
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 text-gold" />
              Acreditación Oficial
            </span>
            <p className="text-xs text-mist/85 font-sans font-semibold mt-1">
              MINCETUR Reg. 2024-CUS-089
            </p>
            <p className="text-[11px] text-mist/60 font-sans mt-0.5">
              DIRCETUR Cusco Nº 04819 · Seguro Pacífico Póliza Nº 842109.
            </p>
          </div>

          <div className="lg:border-r lg:border-white/10 lg:pr-6">
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-gold" />
              100% Salidas Privadas
            </span>
            <p className="text-xs text-mist/75 font-sans leading-relaxed">
              Vehículo 4x4 exclusivo, chofer profesional y guía arqueólogo colegiado dedicados a su reserva.
            </p>
          </div>

          <div className="sm:border-r sm:border-white/10 sm:pr-6">
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <HeartHandshake className="w-4 h-4 text-gold" />
              Trato Digno a Porteadores
            </span>
            <p className="text-xs text-mist/75 font-sans leading-relaxed">
              Porteadores de Huilloc y arrieros con salario ético (+40%), seguro integral y carpas térmicas.
            </p>
          </div>

          <div>
            <span className="text-xs font-sans font-medium text-gold uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4 text-gold" />
              Circuitos 1 & 2 Garantizados
            </span>
            <p className="text-xs text-mist/75 font-sans leading-relaxed">
              Boletos oficiales nominales y trenes panorámicos emitidos formalmente con anticipación.
            </p>
          </div>
        </div>

        {/* Selector de Filtros por Categoría */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="text-xs font-sans text-mist/50 uppercase tracking-widest mr-2 hidden sm:inline-block">
            Filtrar por travesía:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wider transition-all border ${
                selectedCategory === cat
                  ? 'bg-gold text-obsidian font-semibold border-gold shadow-gold-glow'
                  : 'bg-obsidian-card text-mist/70 border-white/10 hover:border-gold/30 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Retícula de Testimonios y Bitácoras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTestimonials.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/20 shadow-obsidian-glow flex flex-col justify-between glass-card-hover group relative overflow-hidden"
            >
              {/* Monograma de Cita Decorativa */}
              <div className="absolute -top-4 -right-4 text-gold/10 pointer-events-none group-hover:text-gold/20 transition-colors">
                <Quote className="w-28 h-28" />
              </div>

              <div className="relative z-10">
                {/* Cabecera del Testimonio: Estrellas y Fecha */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <span className="text-[11px] font-sans font-medium text-mist/50">
                    {review.date}
                  </span>
                </div>

                {/* Tipo de Expedición & Destacado */}
                <div className="mb-4">
                  <span className="text-[10px] font-sans font-semibold text-gold tracking-wider uppercase block mb-1">
                    {review.tripType}
                  </span>
                  <p className="text-xs font-serif italic text-mist/90 font-medium">
                    &ldquo;{review.highlight}&rdquo;
                  </p>
                </div>

                {/* Texto del Relato */}
                <p className="text-xs sm:text-sm font-sans text-mist/80 leading-relaxed">
                  {review.quote}
                </p>
              </div>

              {/* Perfil del Autor */}
              <div className="pt-6 mt-6 border-t border-white/10 relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-serif text-sm font-semibold text-gold shrink-0">
                    {review.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-xs font-sans font-bold text-mist">
                      {review.author}
                    </h4>
                    <span className="text-[11px] font-sans text-mist/60 flex items-center gap-1">
                      <span>{review.flag}</span>
                      <span>{review.origin}</span>
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-sans text-gold/80 bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20">
                  Bitácora Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de Transparencia & Contacto Concierge */}
        <div className="mt-12 p-6 rounded-2xl bg-obsidian-light/50 border border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <p className="text-mist/70 max-w-2xl text-center sm:text-left leading-relaxed">
            ✦ <strong className="text-mist">Transparencia Operativa:</strong> Todos los testimonios provienen de bitácoras de campo y encuestas de satisfacción suscritas por nuestros expedicionarios. Podemos coordinar referencias directas o contacto con diseñadores de viaje bajo solicitud.
          </p>

          <a
            href={concierge.generateWhatsAppUrl({ customMessage: 'Hola Qorikancha Concierge. Quisiera solicitar referencias y consultar sobre experiencias de huéspedes previos.' })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-obsidian border border-gold/30 transition-all font-semibold uppercase tracking-wider text-[11px] shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultar Referencias de Huéspedes</span>
          </a>
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import {
  ShieldCheck,
  Compass,
  Mountain,
  Mail,
  Phone,
  MessageSquare,
  ArrowUp,
  Award,
  Sparkles,
  Cookie,
  BookOpen,
} from 'lucide-react';

export default function Footer() {
  const { brand, destination, concierge } = cuscoConfig;
  const { scrollTo } = useSmoothScroll();

  return (
    <footer className="relative bg-obsidian border-t border-gold/20 pt-20 pb-12 px-6 overflow-hidden">
      {/* Resplandor radial de fondo */}
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabecera Monumental del Footer */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between pb-16 border-b border-white/10 gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-sans font-medium tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {brand.edition}
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium text-mist tracking-tight leading-tight">
              {brand.name}
            </h2>

            <p className="mt-4 text-xl sm:text-2xl text-gold font-serif italic">
              &ldquo;{destination.tagline}&rdquo;
            </p>

            <p className="mt-4 text-sm sm:text-base text-mist/70 font-sans leading-relaxed max-w-xl">
              {destination.subtagline}
            </p>
          </div>

          {/* Contacto Directo & Botón Volver Arriba */}
          <div className="flex flex-col items-start lg:items-end space-y-4">
            <button
              type="button"
              onClick={() => scrollTo(0)}
              data-cursor="SUBIR"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gold/30 bg-obsidian-card/80 text-xs font-sans font-medium tracking-widest uppercase text-gold hover:bg-gold/15 transition-all group"
            >
              <span>Volver a la cima</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>

            <span className="text-xs font-sans font-medium tracking-wider text-mist/50">
              {destination.coordinates.formatted} · {destination.elevation.display}
            </span>
          </div>
        </div>

        {/* Columnas Informativas, Enlaces & Sellos Oficiales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-16 border-b border-white/10 text-xs font-sans">
          {/* Columna 1: Expediciones */}
          <div className="space-y-4">
            <span className="text-gold tracking-widest uppercase block text-[11px] font-bold">
              {'// EXPEDICIONES INSIGNIA'}
            </span>
            <ul className="space-y-2.5 text-mist/70">
              <li>
                <a
                  href="#expediciones"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#expediciones');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Machu Picchu: Amanecer Sagrado
                </a>
              </li>
              <li>
                <a
                  href="#expediciones"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#expediciones');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Salkantay Sky Domes 3,900m
                </a>
              </li>
              <li>
                <a
                  href="#expediciones"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#expediciones');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Camino Inca Clásico VIP
                </a>
              </li>
              <li>
                <a
                  href="#expediciones"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#expediciones');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Valle Sagrado: Moray & Maras
                </a>
              </li>
              <li>
                <a
                  href="#expediciones"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#expediciones');
                  }}
                  className="hover:text-gold transition-colors block text-gold"
                >
                  Montaña de 7 Colores: Vinicunca VIP
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 2: Navegación de Experiencia */}
          <div className="space-y-4">
            <span className="text-gold tracking-widest uppercase block text-[11px] font-bold">
              {'// EXPERIENCIA & SEGURIDAD'}
            </span>
            <ul className="space-y-2.5 text-mist/70">
              <li>
                <a
                  href="#mapa"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#mapa');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Cartografía & Altimetría
                </a>
              </li>
              <li>
                <a
                  href="#aclimatacion"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#aclimatacion');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Protocolo Médico de Aclimatación
                </a>
              </li>
              <li>
                <a
                  href="#bento"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#bento');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Terroir, Astronomía & Spa
                </a>
              </li>
              <li>
                <a
                  href="#testimonios"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#testimonios');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Bitácoras de Huéspedes
                </a>
              </li>
              <li>
                <a
                  href="#nosotros"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#nosotros');
                  }}
                  className="hover:text-gold transition-colors block text-gold font-medium"
                >
                  Quiénes Somos & Maestría Andina
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#faq');
                  }}
                  className="hover:text-gold transition-colors block"
                >
                  Preguntas Frecuentes & Transparencia
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo('#contacto');
                  }}
                  className="hover:text-gold transition-colors block text-gold font-medium"
                >
                  Planificar Expedición a Medida
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Concierge Desk */}
          <div className="space-y-4">
            <span className="text-gold tracking-widest uppercase block text-[11px] font-bold">
              {'// DESPACHO CONCIERGE CUSCO'}
            </span>
            <div className="space-y-2.5 text-mist/70">
              <p className="flex items-start gap-2">
                <Mountain className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>Portal de Panes 123, Plaza de Armas, Centro Histórico, Cusco</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{concierge.displayPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{concierge.email}</span>
              </p>
              <p className="flex items-center gap-2 text-gold">
                <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                <span>Atención Continua 24 Horas</span>
              </p>
            </div>
          </div>

          {/* Columna 4: Sellos de Turismo Formal */}
          <div className="space-y-4">
            <span className="text-gold tracking-widest uppercase block text-[11px] font-bold">
              {'// HOMOLOGACIÓN OFICIAL'}
            </span>
            <ul className="space-y-2.5 text-[11px] text-mist/65">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>MINCETUR · Operador Oficial Homologado</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>Carbono Neutro & Porteadores con Trato Digno</span>
              </li>
              <li className="flex items-start gap-2">
                <Compass className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>Wilderness Medical Society WFR en ruta</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/libro-de-reclamaciones"
                  className="inline-flex items-center gap-1.5 text-[11px] font-sans font-medium text-gold/80 hover:text-gold transition-colors py-1 px-2.5 rounded border border-gold/25 bg-gold/5"
                >
                  <BookOpen className="w-3 h-3 text-gold" />
                  <span>Libro de Reclamaciones Virtual (Ley Nº 29571)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Cierre Inferior de Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-sans font-medium text-mist/45 gap-4">
          <p>
            © {new Date().getFullYear()} {brand.legalName}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/privacidad" className="hover:text-mist transition-colors">
              Privacidad
            </Link>
            <span>·</span>
            <Link href="/cookies" className="hover:text-mist transition-colors">
              Cookies
            </Link>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
                }
              }}
              className="hover:text-gold transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Cookie className="w-3 h-3 text-gold" />
              <span>Configuración</span>
            </button>
            <span>·</span>
            <Link href="/terminos" className="hover:text-mist transition-colors">
              Términos
            </Link>
            <span>·</span>
            <Link href="/libro-de-reclamaciones" className="hover:text-gold transition-colors">
              Reclamaciones
            </Link>
            <span>·</span>
            <span className="text-gold/80">Andean Luxury Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import { Compass, Mountain, ArrowLeft, Wind } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 Ruta Extraviada | Qorikancha Expeditions',
  description: 'La senda que buscas ha sido cubierta por la niebla del bosque nuboso.',
};

export default function NotFound() {
  const { destination } = cuscoConfig;

  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-6 py-24 bg-obsidian text-mist relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center glass-card rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-2xl bg-obsidian-card/90">
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6 shadow-gold-glow">
          <Wind className="w-8 h-8 text-gold animate-pulse" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold font-mono text-xs uppercase tracking-widest mb-4">
          HTTP 404 · RUTA EXTRAVIADA EN LA NIEBLA
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-mist mt-2 leading-tight">
          Senda no Encontrada
        </h1>

        <p className="mt-4 text-sm sm:text-base text-mist/75 font-sans leading-relaxed">
          La senda o expedición que buscas ha sido cubierta por la vegetación del bosque nuboso o ha cambiado de coordenadas en el Valle Sagrado.
        </p>

        <div className="my-8 p-4 rounded-2xl bg-obsidian-light/80 border border-gold/15 text-xs font-mono text-mist/60 flex flex-wrap items-center justify-around gap-3">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gold" />
            {destination.coordinates.formatted}
          </span>
          <span className="text-mist/30">|</span>
          <span className="flex items-center gap-1.5">
            <Mountain className="w-3.5 h-3.5 text-gold" />
            {destination.elevation.display}
          </span>
        </div>

        <Link
          href="/"
          data-cursor="RETORNAR"
          className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-obsidian font-mono text-xs uppercase tracking-widest font-bold shadow-gold-glow transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retornar a la Ruta Principal
        </Link>
      </div>
    </main>
  );
}

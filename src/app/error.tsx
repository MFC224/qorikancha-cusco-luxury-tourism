'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error no controlado en la expedición:', error);
  }, [error]);

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center px-6 py-24 bg-obsidian text-mist">
      <div className="max-w-lg w-full text-center glass-card rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-2xl bg-obsidian-card/90">
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 shadow-gold-glow">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-sans font-medium text-xs uppercase tracking-widest mb-4">
          INTERRUPCIÓN EN LA EXPEDICIÓN
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-medium text-mist mt-2 leading-tight">
          Pausa Inesperada en la Ruta
        </h1>

        <p className="mt-4 text-sm text-mist/75 font-sans leading-relaxed">
          Ha ocurrido un evento imprevisto al procesar la experiencia digital. Puedes intentar reiniciar la ruta o volver al campamento principal.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs uppercase tracking-widest font-bold shadow-gold-glow transition-all"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reiniciar Sección
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold font-sans font-medium text-xs uppercase tracking-widest transition-all"
          >
            <Home className="w-4 h-4 mr-2" />
            Campamento Base
          </Link>
        </div>
      </div>
    </div>
  );
}

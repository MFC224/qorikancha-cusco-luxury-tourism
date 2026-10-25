import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import { ShieldAlert, Compass, Mountain, ArrowLeft, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: '403 Acceso Restringido | Qorikancha Expeditions',
  description: 'Esta ruta o sector de expedición requiere acreditación especial o membresía de explorador.',
};

export default function ForbiddenPage() {
  const { concierge, destination } = cuscoConfig;

  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-6 py-24 bg-obsidian text-mist relative overflow-hidden">
      {/* Resplandor radial de fondo */}
      <div className="absolute inset-0 bg-radial-glow opacity-70 pointer-events-none" />

      {/* Contenedor Central */}
      <div className="relative z-10 max-w-xl w-full text-center glass-card rounded-3xl p-8 sm:p-12 border border-gold/30 shadow-2xl bg-obsidian-card/90">
        {/* Icono de Seguridad Restringida */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-6 shadow-gold-glow">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
        </div>

        {/* Badge de Telemetría */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-sans font-medium text-xs uppercase tracking-widest mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          HTTP 403 · ACCESO RESTRINGIDO A ZONA SAGRADA
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-mist mt-2 leading-tight">
          Santuario de Acceso Exclusivo
        </h1>

        <p className="mt-4 text-sm sm:text-base text-mist/75 font-sans leading-relaxed">
          El sector, expediente arqueológico o ruta de alta montaña que intentas consultar requiere credenciales de expedicionario VIP o invitación previa de nuestro despacho en Cusco.
        </p>

        {/* Coordenadas del Punto de Bloqueo */}
        <div className="my-8 p-4 rounded-2xl bg-obsidian-light/80 border border-gold/15 text-xs font-sans font-medium text-mist/60 flex flex-wrap items-center justify-around gap-3 uppercase tracking-wider">
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

        {/* Acciones de Retorno */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            data-cursor="RETORNAR"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs uppercase tracking-widest font-bold shadow-gold-glow transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retornar al Campamento
          </Link>

          <a
            href={concierge.generateWhatsAppUrl({
              expeditionTitle: 'Solicitud de Acceso Especial a Zona Restringida 403',
            })}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CONCIERGE"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/10 text-gold font-sans font-medium text-xs uppercase tracking-widest transition-all"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contactar Concierge
          </a>
        </div>
      </div>
    </main>
  );
}

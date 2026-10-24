'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  MessageSquare,
  X,
  Users,
  Calendar,
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTourId?: string;
}

export default function WhatsAppModal({
  isOpen,
  onClose,
  defaultTourId,
}: WhatsAppModalProps) {
  const { expeditions, concierge } = cuscoConfig;

  const [selectedTourTitle, setSelectedTourTitle] = useState<string>(
    expeditions[0]?.title || 'Machu Picchu: Amanecer Sagrado Privado'
  );
  const [guests, setGuests] = useState<number>(2);
  const [selectedMonth, setSelectedMonth] = useState<string>('Mayo - Octubre (Temporada Seca)');
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState<boolean>(true);

  useEffect(() => {
    if (defaultTourId) {
      const found = expeditions.find((e) => e.id === defaultTourId);
      if (found) {
        setSelectedTourTitle(found.title);
      }
    }
  }, [defaultTourId, expeditions]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const monthOptions = [
    'Próximos 30 días (Salida Express)',
    'Mayo - Octubre (Temporada Seca)',
    'Noviembre - Abril (Época Andina Mística)',
    'Fin de Año / Fiestas Especiales',
  ];

  // Generación en vivo del mensaje preformateado
  const generatedMessage = `¡Hola Qorikancha Expeditions! Deseo cotizar la expedición privada *"${selectedTourTitle}"* para ${guests} persona${
    guests > 1 ? 's' : ''
  } en ${selectedMonth}. ¿Tienen disponibilidad y asesoría de aclimatación?`;

  const finalWhatsAppUrl = `https://wa.me/${concierge.whatsappNumber}?text=${encodeURIComponent(
    generatedMessage
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-xl animate-fade-in"
    >
      {/* Fondo cerrable al hacer clic exterior */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del Modal */}
      <div className="relative z-10 w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 border border-gold/40 shadow-2xl overflow-hidden bg-obsidian-card">
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-mono text-gold tracking-widest uppercase block">
                CONCIERGE VIP 24/7
              </span>
              <h3
                id="whatsapp-modal-title"
                className="font-serif text-lg sm:text-xl font-medium text-mist"
              >
                Diseñar Travesía a Medida
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-2 rounded-full text-mist/60 hover:text-gold hover:bg-white/5 transition-colors border border-transparent hover:border-gold/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo del Formulario Express */}
        <div className="space-y-6 py-6">
          {/* 1. Selector de Expedición */}
          <div>
            <label className="text-xs font-mono text-mist/70 tracking-wider uppercase flex items-center gap-1.5 mb-2.5">
              <Compass className="w-3.5 h-3.5 text-gold" />
              1. Selecciona tu Expedición
            </label>
            <select
              value={selectedTourTitle}
              onChange={(e) => setSelectedTourTitle(e.target.value)}
              className="w-full bg-obsidian-light border border-gold/25 rounded-2xl px-4 py-3 text-sm text-mist font-sans focus:outline-none focus:border-gold transition-colors"
            >
              {expeditions.map((exp) => (
                <option key={exp.id} value={exp.title} className="bg-obsidian text-mist">
                  {exp.title} ({exp.duration})
                </option>
              ))}
              <option value="Itinerario Personalizado / Multi-Destino" className="bg-obsidian text-mist">
                ✦ Itinerario Privado Personalizado (Multi-Destino)
              </option>
            </select>
          </div>

          {/* 2. Selector de Pasajeros y Temporada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pasajeros */}
            <div>
              <label className="text-xs font-mono text-mist/70 tracking-wider uppercase flex items-center gap-1.5 mb-2.5">
                <Users className="w-3.5 h-3.5 text-gold" />
                2. Número de Viajeros
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-mono transition-all border ${
                      guests === num
                        ? 'bg-gold text-obsidian font-bold border-gold shadow-gold-glow'
                        : 'bg-obsidian-light text-mist/70 border-white/10 hover:border-gold/30'
                    }`}
                  >
                    {num === 6 ? '6+' : `${num}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Temporada */}
            <div>
              <label className="text-xs font-mono text-mist/70 tracking-wider uppercase flex items-center gap-1.5 mb-2.5">
                <Calendar className="w-3.5 h-3.5 text-gold" />
                3. Mes Estimado
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-obsidian-light border border-gold/25 rounded-2xl px-3 py-2.5 text-xs text-mist font-sans focus:outline-none focus:border-gold transition-colors"
              >
                {monthOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-obsidian text-mist">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Vista Previa del Mensaje Generado en Tiempo Real */}
          <div className="p-4 rounded-2xl bg-obsidian-light/80 border border-gold/20">
            <span className="text-[10px] font-mono text-gold tracking-widest uppercase block mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Mensaje Preformateado para WhatsApp:
            </span>
            <p className="text-xs font-sans text-mist/90 italic leading-relaxed">
              &ldquo;{generatedMessage}&rdquo;
            </p>
          </div>

          {/* Cláusula de Consentimiento Ley 29733 / RGPD */}
          <label className="flex items-start gap-2.5 text-[11px] text-mist/75 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={hasAcceptedPrivacy}
              onChange={(e) => setHasAcceptedPrivacy(e.target.checked)}
              className="mt-0.5 rounded text-gold focus:ring-gold bg-obsidian border-white/20"
            />
            <span>
              He leído y acepto la{' '}
              <Link href="/privacidad" target="_blank" className="text-gold underline hover:text-white">
                Política de Privacidad
              </Link>{' '}
              y el tratamiento de mis datos personales para la cotización de mi expedición (Ley Nº 29733).
            </span>
          </label>
        </div>

        {/* Botón de Envío Directo a WhatsApp */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-mist/50 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
            Respuesta promedio: &lt;15 min
          </div>

          <a
            href={hasAcceptedPrivacy ? finalWhatsAppUrl : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!hasAcceptedPrivacy) {
                e.preventDefault();
                return;
              }
              onClose();
            }}
            className={`w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all group ${
              hasAcceptedPrivacy
                ? 'bg-gold hover:bg-gold-light text-obsidian shadow-gold-glow cursor-pointer'
                : 'bg-white/10 text-mist/40 border border-white/10 cursor-not-allowed opacity-50'
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>Abrir en WhatsApp</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}

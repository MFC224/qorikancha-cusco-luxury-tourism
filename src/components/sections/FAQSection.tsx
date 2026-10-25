'use client';

import React, { useState } from 'react';
import { cuscoConfig, FAQItem } from '@/data/cuscoConfig';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

export default function FAQSection() {
  const { faqs, concierge } = cuscoConfig;
  const [openId, setOpenId] = useState<string | null>('faq-01');

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera Editorial */}
        <div className="text-center mb-16">
          <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {'// RESOLUCIÓN DE DUDAS CRÍTICAS'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-mist mt-3 leading-tight">
            Transparencia Total & Certeza en los Andes
          </h2>
          <p className="text-mist/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed font-sans">
            Las respuestas precisas a los aspectos logísticos, médicos, éticos y normativos que todo viajero de alta gama debe conocer antes de pisar el Cusco.
          </p>
        </div>

        {/* Lista de Acordeones FAQ */}
        <div className="space-y-4">
          {faqs.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-gold/50 shadow-gold-glow bg-obsidian-card'
                    : 'border-gold/20 hover:border-gold/35 bg-obsidian-card/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1">
                    <span className="text-[10px] font-sans font-medium text-gold tracking-widest uppercase block mb-2">
                      {faq.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-medium text-mist transition-colors group-hover:text-gold leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <span
                    className={`p-2 rounded-full border border-gold/30 bg-obsidian/70 text-gold transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-gold text-obsidian border-gold' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-7 pb-6 pt-0 animate-fade-in">
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <p className="text-xs sm:text-sm text-mist/85 font-sans leading-relaxed">
                        {faq.answer}
                      </p>

                      {faq.highlightNote && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/25 text-gold text-xs font-sans font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{faq.highlightNote}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tarjeta de Asistencia Directa de Concierge */}
        <div className="mt-16 p-8 rounded-3xl glass-card border border-gold/30 text-center relative overflow-hidden bg-obsidian-light/80">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <HelpCircle className="w-32 h-32 text-gold" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold mx-auto mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>

            <h4 className="text-xl sm:text-2xl font-serif font-medium text-mist">
              ¿Tienes una consulta específica sobre tu expedición?
            </h4>

            <p className="text-xs sm:text-sm text-mist/70 font-sans mt-2 leading-relaxed">
              Nuestro Despacho Concierge en la Plaza de Armas del Cusco te asiste directamente vía WhatsApp con respuesta inmediata y trato personalizado.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={concierge.generateWhatsAppUrl({
                  expeditionTitle: 'Consulta sobre Requerimientos de Itinerario Personalizado',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs uppercase tracking-widest font-bold shadow-gold-glow transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Consultar con Concierge VIP
              </a>

              <span className="text-xs font-sans text-mist/50">
                Atención 24/7 en español e inglés
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

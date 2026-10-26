'use client';

import React, { useState, useEffect } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import { MessageSquare, Mountain, ArrowUp, Sparkles } from 'lucide-react';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

interface FloatingBarProps {
  onOpenModal: () => void;
}

export default function FloatingBar({ onOpenModal }: FloatingBarProps) {
  const { brand, destination } = cuscoConfig;
  const { scrollTo } = useSmoothScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece suavemente al superar el 70% de la altura de la ventana (post-hero)
      const threshold = window.innerHeight * 0.7;
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-out select-none ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      <div className="glass-card rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-gold/35 shadow-2xl backdrop-blur-xl flex items-center space-x-3 sm:space-x-5 bg-obsidian-card/90">
        {/* Monograma & Altitud */}
        <div className="flex items-center space-x-2.5 pr-2 sm:border-r sm:border-white/10">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse hidden sm:inline-block" />
          <div>
            <span className="font-serif text-xs sm:text-sm font-semibold text-mist block leading-tight">
              {brand.name.split(' ')[0]}
            </span>
            <span className="text-[9px] font-sans font-medium text-gold flex items-center gap-1 tracking-wider">
              <Mountain className="w-2.5 h-2.5" />
              {destination.elevation.display}
            </span>
          </div>
        </div>

        {/* Resumen de Expedición */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-sans font-medium text-mist/75 uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>Colección Privada 2026/2027</span>
        </div>

        {/* Botón de Cotización Express */}
        <button
          type="button"
          onClick={onOpenModal}
          data-cursor="COTIZAR"
          className="inline-flex items-center px-4 sm:px-5 py-2 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans text-xs uppercase tracking-wider font-bold shadow-gold-glow transition-all active:scale-95"
        >
          <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
          <span>Cotizar</span>
        </button>

        {/* Botón de Volver Arriba */}
        <button
          type="button"
          onClick={() => scrollTo(0)}
          data-cursor="ARRIBA"
          aria-label="Volver al inicio"
          className="p-2 rounded-full text-mist/50 hover:text-gold hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

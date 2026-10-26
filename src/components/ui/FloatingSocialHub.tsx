'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import { Menu, X, Instagram, Facebook } from 'lucide-react';

export default function FloatingSocialHub() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { concierge, social } = cuscoConfig;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const socialLinks = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Concierge VIP',
      subtitle: '+51 921 195 037 · Asesoría Inmediata',
      url: concierge.generateWhatsAppUrl(),
      cursor: 'WHATSAPP',
      colorBadge: 'bg-emerald-400',
      iconClass: 'text-[#25D366] group-hover:text-white',
      borderClass: 'border-[#25D366]/40 hover:border-[#25D366]',
      bgHoverClass: 'hover:bg-[#25D366]',
      glowClass: 'shadow-[0_4px_20px_rgba(37,211,102,0.25)] hover:shadow-[0_0_25px_rgba(37,211,102,0.65)]',
      renderIcon: () => (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:scale-110"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      id: 'instagram',
      name: 'Instagram Oficial',
      subtitle: `${social?.instagramHandle || '@qorikancha.expeditions'} · Crónicas en Vivo`,
      url: social?.instagram || 'https://instagram.com/qorikancha.expeditions',
      cursor: 'INSTAGRAM',
      colorBadge: 'bg-pink-400',
      iconClass: 'text-[#E1306C] group-hover:text-white',
      borderClass: 'border-pink-500/40 hover:border-pink-400',
      bgHoverClass: 'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]',
      glowClass: 'shadow-[0_4px_20px_rgba(225,48,108,0.25)] hover:shadow-[0_0_25px_rgba(225,48,108,0.65)]',
      renderIcon: () => <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />,
    },
    {
      id: 'facebook',
      name: 'Facebook Oficial',
      subtitle: `${social?.facebookPage || 'Qorikancha Expeditions'} · Comunidad`,
      url: social?.facebook || 'https://facebook.com/qorikancha.expeditions',
      cursor: 'FACEBOOK',
      colorBadge: 'bg-blue-400',
      iconClass: 'text-[#1877F2] group-hover:text-white',
      borderClass: 'border-[#1877F2]/40 hover:border-[#1877F2]',
      bgHoverClass: 'hover:bg-[#1877F2]',
      glowClass: 'shadow-[0_4px_20px_rgba(24,119,242,0.25)] hover:shadow-[0_0_25px_rgba(24,119,242,0.65)]',
      renderIcon: () => <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end select-none"
      aria-label="Canales de contacto y redes sociales"
    >
      {/* Botones de Redes Sociales (Despliegue Vertical con Animación Fluida) */}
      <div
        className={`flex flex-col-reverse items-end space-y-reverse space-y-3 mb-3 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {socialLinks.map((item, index) => {
          // Escalado y traslación escalonada según índice
          const delayStyle = {
            transitionDelay: isOpen ? `${index * 55}ms` : '0ms',
          };

          return (
            <div
              key={item.id}
              style={delayStyle}
              className={`relative flex items-center justify-end group transition-all duration-300 ease-out ${
                isOpen
                  ? 'translate-y-0 scale-100 opacity-100'
                  : 'translate-y-5 scale-75 opacity-0'
              }`}
            >
              {/* Tooltip Editorial Flotante a la Izquierda */}
              <div
                className="absolute right-14 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-full bg-obsidian-card/95 border border-gold/30 text-mist shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none flex items-center gap-2 whitespace-nowrap translate-x-2 group-hover:translate-x-0"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.colorBadge} animate-pulse`} />
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] font-sans font-semibold tracking-wider text-mist">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-sans text-mist/60 tracking-normal">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Botón Circular de Red Social */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={item.cursor}
                aria-label={item.name}
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-obsidian-card/95 backdrop-blur-xl border ${item.borderClass} ${item.bgHoverClass} ${item.glowClass} ${item.iconClass} transition-all duration-300 active:scale-90`}
              >
                {item.renderIcon()}
              </a>
            </div>
          );
        })}

        {/* Micro-etiqueta superior de cortesía */}
        <div
          className={`px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-gold/25 text-[10px] font-sans font-medium text-gold tracking-widest uppercase transition-all duration-300 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          Canales Oficiales
        </div>
      </div>

      {/* Botón Principal Disparador (Estilo Hamburguesa / FAB Circular de Ultralujo) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        data-cursor={isOpen ? 'CERRAR' : 'CONTACTO'}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Cerrar canales de contacto' : 'Abrir canales de contacto y redes sociales'}
        className="relative w-14 h-14 rounded-full flex items-center justify-center bg-obsidian-card/95 backdrop-blur-xl border border-gold/40 hover:border-gold text-gold hover:text-gold-light shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(200,162,97,0.25)] hover:shadow-[0_0_30px_rgba(200,162,97,0.5)] transition-all duration-400 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-gold/50"
      >
        {/* Indicador de Estado Concierge Online */}
        <span className="absolute top-1 right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-obsidian" />
        </span>

        {/* Animación del Icono: Hamburguesa <-> Cerrar (X) con Rotación Fluida */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Menu
            className={`w-6 h-6 absolute transition-all duration-400 ease-out transform ${
              isOpen
                ? 'rotate-90 opacity-0 scale-50'
                : 'rotate-0 opacity-100 scale-100 group-hover:scale-110'
            }`}
          />
          <X
            className={`w-6 h-6 absolute transition-all duration-400 ease-out transform ${
              isOpen
                ? 'rotate-0 opacity-100 scale-100 text-gold-light'
                : '-rotate-90 opacity-0 scale-50'
            }`}
          />
        </div>
      </button>
    </div>
  );
}

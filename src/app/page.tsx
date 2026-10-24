'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import CinematicCardStack from '@/components/sections/CinematicCardStack';
import InteractiveMap from '@/components/sections/InteractiveMap';
import AcclimatizationGuide from '@/components/sections/AcclimatizationGuide';
import VisualBento from '@/components/sections/VisualBento';
import WhatsAppModal from '@/components/ui/WhatsAppModal';
import FloatingBar from '@/components/ui/FloatingBar';
import {
  Sparkles,
  MessageSquare,
  Compass,
  Navigation,
} from 'lucide-react';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTourId, setModalTourId] = useState<string | undefined>(undefined);

  const handleOpenModal = (tourId?: string) => {
    setModalTourId(tourId);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-obsidian text-mist selection:bg-gold selection:text-obsidian">
      {/* 1. HERO CINEMÁTICO 100vh CON MÁSCARA TIPOGRÁFICA & HUD DE TELEMETRÍA */}
      <HeroSection />

      {/* 2. APILAMIENTO 3D CINEMÁTICO DE TARJETAS 100vh (CinematicCardStack) */}
      <CinematicCardStack />

      {/* 3. CARTOGRAFÍA SAGRADA INTERACTIVA & PERFIL ALTIMÉTRICO */}
      <InteractiveMap />

      {/* 4. GUÍA MÉDICA DE ACLIMATACIÓN & SIMULADOR DE OXÍGENO */}
      <AcclimatizationGuide />

      {/* 5. RETÍCULA BENTO ASIMÉTRICA CON MICRO-INCLINACIÓN 3D TILT */}
      <VisualBento />

      {/* 6. LABORATORIO DE MICROINTERACCIONES & CURSOR CONTEXTUAL */}
      <section id="interacciones" className="px-6 py-20 border-t border-gold/15 bg-obsidian-light/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-mono text-gold tracking-super-wide uppercase">
              {'// MICROINTERACCIONES & CURSOR CONTEXTUAL'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif text-mist mt-2">
              Telemetría Táctil & Hover Contextual
            </h2>
            <p className="text-mist/60 text-sm mt-2 max-w-2xl">
              Prueba el comportamiento del cursor magnético sobre los siguientes módulos interactivos. Cada bloque activa etiquetas dinámicas aceleradas por hardware con <code className="text-gold font-mono text-xs">gsap.quickTo</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              data-cursor="SALKANTAY"
              onClick={() => handleOpenModal('salkantay-sky-domes')}
              className="glass-card rounded-2xl p-6 border border-gold/20 flex flex-col justify-between h-52 cursor-pointer glass-card-hover group"
            >
              <div className="flex items-center justify-between">
                <span className="hud-badge">HUD 01</span>
                <Sparkles className="w-4 h-4 text-gold group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-mist group-hover:text-gold transition-colors">
                  Apu Salkantay
                </h3>
                <p className="text-xs text-mist/60 font-mono mt-1">
                  data-cursor=&ldquo;SALKANTAY&rdquo;
                </p>
              </div>
              <span className="text-xs text-gold/80 font-mono">Toca para cotizar ↗</span>
            </div>

            <div
              data-cursor="4,630M"
              onClick={() => handleOpenModal('salkantay-sky-domes')}
              className="glass-card rounded-2xl p-6 border border-gold/20 flex flex-col justify-between h-52 cursor-pointer glass-card-hover group"
            >
              <div className="flex items-center justify-between">
                <span className="hud-badge">HUD 02</span>
                <Compass className="w-4 h-4 text-gold group-hover:rotate-45 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-mist group-hover:text-gold transition-colors">
                  Altitud Extrema
                </h3>
                <p className="text-xs text-mist/60 font-mono mt-1">
                  data-cursor=&ldquo;4,630M&rdquo;
                </p>
              </div>
              <span className="text-xs text-gold/80 font-mono">Toca para cotizar ↗</span>
            </div>

            <div
              data-cursor="CONCIERGE"
              onClick={() => handleOpenModal()}
              className="glass-card rounded-2xl p-6 border border-gold/20 flex flex-col justify-between h-52 cursor-pointer glass-card-hover group"
            >
              <div className="flex items-center justify-between">
                <span className="hud-badge">HUD 03</span>
                <MessageSquare className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-mist group-hover:text-gold transition-colors">
                  Canal VIP Concierge
                </h3>
                <p className="text-xs text-mist/60 font-mono mt-1">
                  data-cursor=&ldquo;CONCIERGE&rdquo;
                </p>
              </div>
              <span className="text-xs text-gold/80 font-mono">Toca para abrir modal ↗</span>
            </div>

            <div
              data-cursor="VER MAPA"
              onClick={() => handleOpenModal('machu-picchu-sunrise')}
              className="glass-card rounded-2xl p-6 border border-gold/20 flex flex-col justify-between h-52 cursor-pointer glass-card-hover group"
            >
              <div className="flex items-center justify-between">
                <span className="hud-badge">HUD 04</span>
                <Navigation className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-mist group-hover:text-gold transition-colors">
                  Geografía Sagrada
                </h3>
                <p className="text-xs text-mist/60 font-mono mt-1">
                  data-cursor=&ldquo;VER MAPA&rdquo;
                </p>
              </div>
              <span className="text-xs text-gold/80 font-mono">Toca para cotizar ↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BARRA FLOTANTE FIJA POST-HERO (Aparece tras 70% de scroll) */}
      <FloatingBar onOpenModal={() => handleOpenModal()} />

      {/* 8. MODAL INTERACTIVO EXPRESS DE CONVERSIÓN WHATSAPP VIP */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTourId={modalTourId}
      />
    </main>
  );
}

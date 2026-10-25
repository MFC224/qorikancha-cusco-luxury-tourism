'use client';

import React, { useState } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import CinematicCardStack from '@/components/sections/CinematicCardStack';
import InteractiveMap from '@/components/sections/InteractiveMap';
import AcclimatizationGuide from '@/components/sections/AcclimatizationGuide';
import VisualBento from '@/components/sections/VisualBento';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AboutTeamSection from '@/components/sections/AboutTeamSection';
import FAQSection from '@/components/sections/FAQSection';
import BespokeInquirySection from '@/components/sections/BespokeInquirySection';
import WhatsAppModal from '@/components/ui/WhatsAppModal';
import FloatingBar from '@/components/ui/FloatingBar';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTourId, setModalTourId] = useState<string | undefined>(undefined);

  const handleOpenModal = (tourId?: string) => {
    setModalTourId(tourId);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-obsidian text-mist selection:bg-gold selection:text-obsidian">
      {/* 1. HERO CINEMÁTICO CON MÁSCARA TIPOGRÁFICA & TELEMETRÍA ANDINA */}
      <HeroSection />

      {/* 2. APILAMIENTO 3D CINEMÁTICO DE TARJETAS (5 GRANDES EXPEDICIONES) */}
      <CinematicCardStack />

      {/* 3. CARTOGRAFÍA SAGRADA INTERACTIVA & PERFIL ALTIMÉTRICO */}
      <InteractiveMap />

      {/* 4. GUÍA MÉDICA DE ACLIMATACIÓN & SIMULADOR DE OXÍGENO */}
      <AcclimatizationGuide />

      {/* 5. RETÍCULA BENTO ASIMÉTRICA: TERROIR, COSMOS, TREN & SPA */}
      <VisualBento />

      {/* 6. RELATOS DE VIAJE & CUADERNO DE BITÁCORA */}
      <TestimonialsSection />

      {/* 7. QUIÉNES SOMOS & MAESTRÍA ANDINA (EQUIPO ARQUEOLÓGICO Y COMUNIDADES) */}
      <AboutTeamSection />

      {/* 8. RESOLUCIÓN DE DUDAS CRÍTICAS, PERMISOS & POLÍTICAS (FAQ) */}
      <FAQSection />

      {/* 9. FORMULARIO FORMAL DE CONSULTA & DISEÑO DE EXPEDICIÓN BESPOKE */}
      <BespokeInquirySection />

      {/* 10. MODAL DE ASESORÍA CONCIERGE WHATSAPP & EMAIL */}
      <WhatsAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTourId={modalTourId}
      />

      {/* 11. BARRA FLOTANTE CON RESUMEN DE NAVEGACIÓN & ACCESO DIRECTO */}
      <FloatingBar onOpenModal={handleOpenModal} />
    </main>
  );
}

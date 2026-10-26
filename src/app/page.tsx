'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import CinematicCardStack from '@/components/sections/CinematicCardStack';

// Carga diferida de secciones below-the-fold para máxima velocidad de renderizado inicial
const InteractiveMap = dynamic(() => import('@/components/sections/InteractiveMap'), {
  loading: () => <div className="min-h-[480px] bg-obsidian animate-pulse" />,
});

const AcclimatizationGuide = dynamic(() => import('@/components/sections/AcclimatizationGuide'), {
  loading: () => <div className="min-h-[400px] bg-obsidian animate-pulse" />,
});

const VisualBento = dynamic(() => import('@/components/sections/VisualBento'), {
  loading: () => <div className="min-h-[400px] bg-obsidian animate-pulse" />,
});

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <div className="min-h-[300px] bg-obsidian animate-pulse" />,
});

const AboutTeamSection = dynamic(() => import('@/components/sections/AboutTeamSection'), {
  loading: () => <div className="min-h-[400px] bg-obsidian animate-pulse" />,
});

const FAQSection = dynamic(() => import('@/components/sections/FAQSection'), {
  loading: () => <div className="min-h-[400px] bg-obsidian animate-pulse" />,
});

const BespokeInquirySection = dynamic(() => import('@/components/sections/BespokeInquirySection'), {
  loading: () => <div className="min-h-[400px] bg-obsidian animate-pulse" />,
});

export default function Page() {
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
    </main>
  );
}

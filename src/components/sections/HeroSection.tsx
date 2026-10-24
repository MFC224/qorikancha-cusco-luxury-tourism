'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cuscoConfig } from '@/data/cuscoConfig';
import MagneticRollButton from '@/components/ui/MagneticRollButton';
import ExpeditionHUD from '@/components/ui/ExpeditionHUD';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import { ArrowDown, MessageSquare, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { destination, concierge } = cuscoConfig;
  const { scrollTo } = useSmoothScroll();

  const sectionRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textLine1Ref = useRef<HTMLHeadingElement>(null);
  const textLine2Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const bgImage = bgImageRef.current;
    if (!section || !bgImage) return;

    // 1. Animación de revelado cinemático inicial (Text Reveal Masking)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      [textLine1Ref.current, textLine2Ref.current],
      {
        yPercent: 120,
        opacity: 0,
        rotateX: 20,
      },
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.18,
        duration: 1.2,
      }
    )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.6'
      )
      .fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        hudRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      );

    // 2. Parallax de fondo cinemático con inercia continua al hacer scroll
    const parallaxTween = gsap.to(bgImage, {
      yPercent: 18,
      scale: 1.12,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.1,
      },
    });

    return () => {
      tl.kill();
      parallaxTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-obsidian px-6 pt-24 pb-8"
    >
      {/* Fondo Fotográfico 4K con Parallax Cinemático */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 z-0 h-[120%] w-full -top-[10%] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/images/hero-cusco.webp"
          alt="Paisaje Monumental de los Andes de Cusco"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Máscara de Viñeta y Gradiente de Cine */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/50" />
        <div className="absolute inset-0 bg-radial-glow opacity-80" />
      </div>

      {/* Espaciador Superior */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian/80 border border-gold/30 text-gold text-xs font-mono tracking-widest uppercase backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
          {destination.region} · {destination.country}
        </div>
      </div>

      {/* Núcleo Central: Titular Monumental con Máscaras de Revelado */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
        <div className="overflow-hidden pb-1">
          <h1
            ref={textLine1Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-mist leading-[1.05]"
          >
            Donde el Tiempo
          </h1>
        </div>

        <div className="overflow-hidden pb-2">
          <h1
            ref={textLine2Ref}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight text-gold-gradient leading-[1.05]"
          >
            se Rinde ante la Piedra.
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg sm:text-2xl text-mist/85 font-sans font-light max-w-2xl leading-relaxed"
        >
          {destination.subtagline}
        </p>

        {/* Botones de Acción con Text-Roll e Inercia */}
        <div ref={actionsRef} className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticRollButton
            onClick={() => scrollTo('#expediciones')}
            variant="primary"
            dataCursor="DESCUBRIR"
            icon={<ArrowDown className="w-4 h-4" />}
          >
            Explorar Expediciones
          </MagneticRollButton>

          <MagneticRollButton
            href={concierge.generateWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            dataCursor="CONCIERGE"
            icon={<MessageSquare className="w-4 h-4" />}
          >
            Diseñar Travesía Privada
          </MagneticRollButton>
        </div>
      </div>

      {/* Pie del Hero: Barra de Telemetría HUD & Indicador de Scroll */}
      <div ref={hudRef} className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gold/15">
        <ExpeditionHUD className="w-full sm:w-auto" />

        {/* Indicador de Desplazamiento */}
        <button
          type="button"
          onClick={() => scrollTo('#expediciones')}
          data-cursor="BAJAR"
          className="hidden md:flex items-center space-x-2 text-xs font-mono text-mist/60 hover:text-gold transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase">Desliza para explorar</span>
          <span className="p-1.5 rounded-full border border-gold/30 bg-obsidian/60 group-hover:border-gold group-hover:translate-y-0.5 transition-all">
            <ArrowDown className="w-3.5 h-3.5 text-gold" />
          </span>
        </button>
      </div>
    </section>
  );
}

'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cuscoConfig, BentoExperience, BentoCollageItem } from '@/data/cuscoConfig';
import { Sparkles, Utensils, Moon, Train, Flower2, ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';

interface BentoTiltCardProps {
  item: BentoExperience;
}

/**
 * Tarjeta interactiva con Tilt 3D y Glare dinámico
 */
function BentoTiltCard({ item }: BentoTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;

    if (glare) {
      glare.style.opacity = '0.35';
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(200, 162, 97, 0.4) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  const getBentoIcon = (id: string) => {
    switch (id) {
      case 'haute-cuisine':
        return <Utensils className="w-4 h-4 text-gold" />;
      case 'astronomy-vilcanota':
        return <Moon className="w-4 h-4 text-gold" />;
      case 'panoramic-train':
        return <Train className="w-4 h-4 text-gold" />;
      case 'sacred-wellness':
        return <Flower2 className="w-4 h-4 text-gold" />;
      default:
        return <Sparkles className="w-4 h-4 text-gold" />;
    }
  };

  const getCursorLabel = (id: string) => {
    switch (id) {
      case 'haute-cuisine':
        return 'TERROIR';
      case 'astronomy-vilcanota':
        return 'COSMOS';
      case 'panoramic-train':
        return 'TREN VIP';
      case 'sacred-wellness':
        return 'WELLNESS';
      default:
        return 'VIVENCIAL';
    }
  };

  const whatsappUrl = cuscoConfig.concierge.generateWhatsAppUrl({
    expeditionTitle: item.title,
  });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={getCursorLabel(item.id)}
      className="relative rounded-3xl overflow-hidden glass-card border border-gold/25 shadow-obsidian-glow flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer group md:col-span-1"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Reflejo Glare de Luz */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
      />

      {/* Imagen de Fondo */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-transparent" />

        {/* Categoría & Monograma */}
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
          <span className="hud-badge bg-obsidian/85 backdrop-blur-md flex items-center gap-1.5">
            {getBentoIcon(item.id)}
            {item.category}
          </span>
        </div>

        {/* Badge Especial */}
        {item.badgeText && (
          <div className="absolute bottom-4 left-4 z-10">
            <span className="text-xs font-sans font-medium text-gold bg-obsidian/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 tracking-wider uppercase">
              {item.badgeText}
            </span>
          </div>
        )}
      </div>

      {/* Contenido Editorial de la Tarjeta */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-20">
        <div>
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-mist group-hover:text-gold transition-colors leading-snug">
            {item.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm font-serif italic text-gold/90">
            &ldquo;{item.tagline}&rdquo;
          </p>
          <p className="mt-4 text-xs sm:text-sm text-mist/75 font-sans leading-relaxed">
            {item.description}
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-sans font-medium text-mist/60 group-hover:text-gold transition-colors"
        >
          <span className="uppercase tracking-widest text-[11px]">Consultar Concierge</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </div>
  );
}

/**
 * Tarjeta Especial de Alta Gastronomía con Collage Animado & Micro-Interacciones
 */
function GastronomyCollageCard({ item }: { item: BentoExperience }) {
  const collageItems = item.collageItems || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  // Auto-avance suave del collage cada 4.5 segundos si no se interactúa manualmente
  useEffect(() => {
    if (isPaused || collageItems.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collageItems.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, collageItems.length]);

  const activeDish: BentoCollageItem = collageItems[activeIndex] || {
    id: 'tiradito',
    name: 'Tiradito Nikkei & Flores de Sauco',
    badge: 'ALTA COCINA ANDINA',
    image: item.image,
    elevation: '2,870 msnm',
    subtitle: item.tagline,
    description: item.description,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((centerY - y) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.008, 1.008, 1.008)`;

    if (glare) {
      glare.style.opacity = '0.3';
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(200, 162, 97, 0.45) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare) {
      glare.style.opacity = '0';
    }
  };

  const whatsappUrl = cuscoConfig.concierge.generateWhatsAppUrl({
    expeditionTitle: `Menú Degustación Terroir & Altura (${activeDish.name})`,
  });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor="TERROIR"
      className="relative rounded-3xl overflow-hidden glass-card border border-gold/30 shadow-obsidian-glow flex flex-col justify-between transition-all duration-300 ease-out md:col-span-2 group"
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Glare de luz dinámico */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300"
      />

      {/* Escenario Principal del Collage con Animación Crossfade */}
      <div className="relative h-80 sm:h-96 md:h-[420px] w-full overflow-hidden bg-obsidian-deep">
        {/* Imagen Activa con Ken Burns Zoom */}
        {collageItems.map((dish, idx) => (
          <div
            key={dish.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className={`object-cover object-center transition-transform duration-1000 ease-out ${
                idx === activeIndex ? 'scale-105' : 'scale-100'
              }`}
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Gradiente de contraste cinematográfico */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/30" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-obsidian/80 via-transparent to-obsidian/40" />

        {/* Cabecera Superior: Badges */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="hud-badge bg-obsidian/90 backdrop-blur-md flex items-center gap-1.5 border-gold/40">
              <Utensils className="w-3.5 h-3.5 text-gold" />
              {item.category}
            </span>
          </div>

          <span className="hud-badge bg-obsidian/90 backdrop-blur-md text-[10px] sm:text-xs flex items-center gap-1.5 border-gold/40 text-gold">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            MARIDAJE DE TERROIR · 4 TIEMPOS
          </span>
        </div>

        {/* Elementos Flotantes del Collage (Thumbnails Interactivos con Animación CSS) */}
        <div className="absolute right-4 bottom-24 sm:bottom-6 z-20 hidden sm:flex flex-col gap-3">
          {collageItems.map((dish, idx) => {
            const isActive = idx === activeIndex;
            const animationClass =
              idx === 0
                ? 'animate-float-1'
                : idx === 1
                ? 'animate-float-2'
                : idx === 2
                ? 'animate-float-3'
                : 'animate-float-1';

            return (
              <button
                key={dish.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`relative group/thumb flex items-center gap-3 p-1.5 pr-4 rounded-2xl backdrop-blur-md transition-all duration-300 text-left ${
                  isActive
                    ? 'bg-obsidian/90 border-2 border-gold shadow-gold-glow scale-105'
                    : 'bg-obsidian/70 border border-gold/25 hover:border-gold/60 hover:bg-obsidian/85 hover:scale-102'
                } ${animationClass}`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold/30 shrink-0">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="hidden md:block">
                  <p className="text-[11px] font-serif font-medium text-mist group-hover/thumb:text-gold transition-colors line-clamp-1">
                    {dish.name}
                  </p>
                  <p className="text-[10px] font-sans text-gold/80 flex items-center gap-1">
                    <Compass className="w-2.5 h-2.5" />
                    {dish.elevation}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tarjeta de Información del Plato en Foco (Superpuesta en el Escenario) */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-20 p-4 rounded-2xl bg-obsidian/85 backdrop-blur-md border border-gold/30 shadow-2xl">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-sans font-semibold tracking-wider text-gold uppercase px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30">
              {activeDish.badge}
            </span>
            <span className="text-[11px] font-sans text-mist/60">
              {activeDish.elevation}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-serif font-medium text-mist">
            {activeDish.name}
          </h4>
          <p className="text-xs text-mist/80 font-sans mt-0.5 line-clamp-2">
            {activeDish.subtitle}
          </p>

          {/* Indicadores de Progreso / Navegación */}
          <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gold/15">
            {collageItems.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                aria-label={`Ver plato ${idx + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-6 bg-gold shadow-gold-glow'
                    : 'w-2 bg-mist/30 hover:bg-gold/50'
                }`}
              />
            ))}
            <span className="text-[10px] font-sans text-gold/80 ml-auto">
              0{activeIndex + 1} / 0{collageItems.length}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido Editorial de la Tarjeta */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between relative z-20">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-mist group-hover:text-gold transition-colors leading-snug">
              {item.title}
            </h3>
            <span className="text-xs font-sans text-gold font-medium tracking-wider uppercase">
              {item.badgeText}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm font-serif italic text-gold/90">
            &ldquo;{item.tagline}&rdquo;
          </p>
          <p className="mt-4 text-xs sm:text-sm text-mist/75 font-sans leading-relaxed">
            {item.description}
          </p>

          {/* Selector Rápido de Ecosistemas Culinarios */}
          <div className="mt-6 flex flex-wrap gap-2">
            {collageItems.map((dish, idx) => (
              <button
                key={dish.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-sans transition-all duration-200 flex items-center gap-1.5 ${
                  idx === activeIndex
                    ? 'bg-gold text-obsidian font-semibold shadow-gold-glow'
                    : 'bg-obsidian-elevated text-mist/70 hover:text-gold hover:border-gold/30 border border-gold/15'
                }`}
              >
                {idx === activeIndex && <CheckCircle2 className="w-3 h-3 text-obsidian" />}
                {dish.name}
              </button>
            ))}
          </div>
        </div>

        {/* Footer con Enlace a Concierge */}
        <div className="mt-8 pt-5 border-t border-gold/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs font-sans text-mist/60">
            <span className="text-gold font-medium">Maridaje Exclusivo:</span> Vinos biodinámicos de altura y destilados botánicos peruanos.
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-obsidian border border-gold/30 transition-all duration-300 text-xs font-sans font-semibold tracking-wider uppercase group/btn"
          >
            <span>Reservar Menú Degustación</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function VisualBento() {
  const { bentoExperiences } = cuscoConfig;

  return (
    <section id="bento" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera de la Sección */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// EXPERIENCIAS DE TERROIR & BIENESTAR'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              El Lujo de los Sentidos
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Más allá de los senderos de piedra: alta cocina andina nacida de la tierra fértil, expedición ferroviaria panorámica con madera de época y observación estelar en los cielos vírgenes del Valle Sagrado.
            </p>
          </div>

          <div className="hud-badge text-gold self-start sm:self-end">
            EXPERIENCIAS CURADAS DE AUTOR
          </div>
        </div>

        {/* Retícula Asimétrica Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bentoExperiences.map((item) => {
            if (item.id === 'haute-cuisine') {
              return <GastronomyCollageCard key={item.id} item={item} />;
            }
            return <BentoTiltCard key={item.id} item={item} />;
          })}
        </div>
      </div>
    </section>
  );
}

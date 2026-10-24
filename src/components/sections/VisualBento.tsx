'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { cuscoConfig, BentoExperience } from '@/data/cuscoConfig';
import { Sparkles, Utensils, Moon, Train, Flower2, ArrowUpRight } from 'lucide-react';

interface BentoTiltCardProps {
  item: BentoExperience;
}

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

    // Inclinación máxima de 8 grados para sutileza de alta gama
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

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={getCursorLabel(item.id)}
      className={`relative rounded-3xl overflow-hidden glass-card border border-gold/25 shadow-obsidian-glow flex flex-col justify-between transition-all duration-300 ease-out cursor-pointer group ${
        item.colSpanDesktop === 2 ? 'md:col-span-2' : 'md:col-span-1'
      }`}
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

      {/* Imagen de Fondo con Zoom Suave */}
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
            <span className="text-xs font-mono text-gold bg-obsidian/90 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30">
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

        <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-xs font-mono text-mist/60 group-hover:text-gold transition-colors">
          <span className="uppercase tracking-widest text-[11px]">Experiencia Curada</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
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
            <span className="text-xs font-mono text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// EXPERIENCIAS DE TERROIR & BIENESTAR'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              El Lujo de los Sentidos
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Más allá de los senderos de piedra: alta cocina andina nacida de la tierra fértil, observación estelar en cielos vírgenes y spa ancestral con aguas del Vilcanota.
            </p>
          </div>

          <div className="hud-badge text-gold self-start sm:self-end">
            3D TILT MATRIX · 4 EJES
          </div>
        </div>

        {/* Retícula Asimétrica Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {bentoExperiences.map((item) => (
            <BentoTiltCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticRollButtonProps {
  children: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'outline' | 'subtle';
  dataCursor?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  target?: string;
  rel?: string;
  magneticStrength?: number;
}

export default function MagneticRollButton({
  children,
  href,
  onClick,
  className = '',
  variant = 'primary',
  dataCursor,
  icon,
  iconPosition = 'right',
  target,
  rel,
  magneticStrength = 0.3,
}: MagneticRollButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const el = buttonRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.35)',
    });
  };

  // Variantes estilísticas de alta gama
  const variantStyles = {
    primary:
      'bg-gold text-obsidian border border-gold hover:bg-gold-light hover:border-gold-light shadow-gold-glow font-semibold',
    outline:
      'bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-gold/10 font-medium',
    subtle:
      'bg-obsidian-card/80 text-mist border border-white/10 hover:border-gold/30 hover:text-gold font-normal',
  };

  const baseClasses = `group relative inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase overflow-hidden select-none transition-colors duration-300 ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      {/* Contenedor del efecto 3D Text-Roll */}
      <span className="relative inline-flex flex-col h-4 overflow-hidden leading-4 pointer-events-none">
        {/* Capa A: Texto original que sube y desaparece */}
        <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>
        {/* Capa B: Texto duplicado que asciende desde abajo */}
        <span className="absolute top-full left-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full text-current">
          {children}
        </span>
      </span>

      {icon && iconPosition === 'right' && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        data-cursor={dataCursor}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      data-cursor={dataCursor}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={baseClasses}
    >
      {content}
    </button>
  );
}

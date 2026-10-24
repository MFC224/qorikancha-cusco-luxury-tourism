'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Detectar si es dispositivo táctil (smartphones, tablets)
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      return isCoarse || hasTouch;
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // 2. Configurar interpolación ultra-rápida por hardware con gsap.quickTo
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });

    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      xDotTo(e.clientX);
      yDotTo(e.clientX ? e.clientY : 0);

      xRingTo(e.clientX);
      yRingTo(e.clientY);

      // 3. Inspeccionar elemento bajo el cursor para atributos data-cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        setCursorText(text || null);
        setIsHovered(true);
      } else {
        const interactiveTarget = target.closest('button, a, input, select, textarea, [role="button"]');
        if (interactiveTarget) {
          setCursorText(null);
          setIsHovered(true);
        } else {
          setCursorText(null);
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Centro: Pequeño punto ágil */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9999] rounded-full transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${cursorText ? 'opacity-0' : 'w-1.5 h-1.5 bg-gold'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Seguidor: Anillo con amortiguación inercial y badge contextual */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[9998] flex items-center justify-center transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          cursorText
            ? 'w-24 h-24 rounded-full bg-gold/90 text-obsidian shadow-gold-glow backdrop-blur-sm'
            : isHovered
            ? 'w-12 h-12 rounded-full border border-gold/70 bg-gold/10'
            : 'w-8 h-8 rounded-full border border-gold/30 bg-transparent'
        }`}
        style={{ willChange: 'transform, width, height' }}
      >
        {cursorText && (
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-obsidian animate-fade-in text-center px-2 select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}

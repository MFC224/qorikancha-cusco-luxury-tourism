'use client';

import React, { useState, useEffect } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import MagneticRollButton from '@/components/ui/MagneticRollButton';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { MessageSquare, Menu, X, Compass, Mountain, ShieldCheck } from 'lucide-react';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const { brand, destination, concierge } = cuscoConfig;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Expediciones', href: '#expediciones', cursor: 'EXPLORAR' },
    { label: 'Ruta', href: '#mapa', cursor: 'VER MAPA' },
    { label: 'Aclimatación', href: '#aclimatacion', cursor: 'MÉDICA' },
    { label: 'Terroir', href: '#bento', cursor: 'VIVENCIAL' },
    { label: 'Bitácora', href: '#testimonios', cursor: 'HUESPEDES' },
    { label: 'Nosotros', href: '#nosotros', cursor: 'EQUIPO' },
    { label: 'FAQ', href: '#faq', cursor: 'CERTEZA' },
    { label: 'Planificar', href: '#contacto', cursor: 'BESPOKE' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-obsidian/90 backdrop-blur-md border-b border-gold/20 py-3 shadow-obsidian-glow'
            : 'bg-gradient-to-b from-[#08090A]/70 via-[#08090A]/20 to-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo & Editorial Monogram */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            data-cursor="CUSCO"
            className="flex flex-col group select-none notranslate"
          >
            <span
              className={`font-serif text-lg sm:text-xl tracking-wider font-medium transition-colors flex items-center notranslate ${
                isScrolled ? 'text-mist group-hover:text-gold' : 'text-white group-hover:text-[#E0C28A]'
              }`}
            >
              {brand.name}
              <span className="w-1.5 h-1.5 rounded-full bg-gold ml-1.5 animate-pulse" />
            </span>
            <span className="text-[10px] font-sans font-medium tracking-ultra-wide text-gold/90 uppercase notranslate">
              Cusco · Valle Sagrado
            </span>
          </a>

          {/* Desktop Editorial Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor={link.cursor}
                className={`relative text-xs font-sans font-medium tracking-widest uppercase transition-colors py-1 group/nav ${
                  isScrolled ? 'text-mist/75 hover:text-gold' : 'text-white/90 hover:text-gold'
                }`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover/nav:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Theme Toggle + Language Selector + Telemetry + VIP WhatsApp Roll Button */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Selector de Tema Oscuro / Claro */}
            <ThemeToggle />

            {/* Selector Multilingüe con Traductor Automático */}
            <LanguageSelector isScrolled={isScrolled} />

            <div
              className={`hidden lg:flex items-center text-[11px] font-sans font-medium tracking-wider border px-3 py-1.5 rounded-full ${
                isScrolled
                  ? 'text-mist/70 border-white/10 bg-obsidian-card/40'
                  : 'text-white/85 border-white/20 bg-black/45 backdrop-blur-md'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-gold mr-1.5" />
              <span>{destination.coordinates.formatted}</span>
            </div>

            <MagneticRollButton
              href={concierge.generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              dataCursor="CONCIERGE"
              icon={<MessageSquare className="w-3.5 h-3.5" />}
            >
              WhatsApp VIP
            </MagneticRollButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="md:hidden p-2 text-mist hover:text-gold transition-colors rounded-lg border border-white/10 bg-obsidian-card/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-40 bg-obsidian/95 backdrop-blur-xl md:hidden flex flex-col justify-between p-8 pt-28 animate-fade-in"
        >
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-sans font-medium text-gold tracking-widest uppercase">
                {'// MENÚ DE EXPEDICIÓN'}
              </span>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <LanguageSelector isScrolled={true} isMobile={true} />
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif text-mist hover:text-gold transition-colors py-1 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-xs font-sans font-medium text-gold/70 uppercase tracking-wider">{link.cursor}</span>
              </a>
            ))}
          </div>

          <div className="space-y-6 pt-6 border-t border-gold/20">
            <div className="flex justify-between items-center text-xs font-sans font-medium text-mist/60 uppercase tracking-wider">
              <span className="flex items-center">
                <Mountain className="w-3.5 h-3.5 text-gold mr-1" />
                {destination.elevation.display}
              </span>
              <span className="flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold mr-1" />
                MINCETUR Oficial
              </span>
            </div>

            <a
              href={concierge.generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-gold text-obsidian text-center font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center shadow-gold-glow"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Contactar Concierge WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}

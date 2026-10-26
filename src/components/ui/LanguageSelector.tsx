'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check, X, Sparkles } from 'lucide-react';

export interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  label: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Español (Original)', flag: '🇪🇸', label: 'ES' },
  { code: 'en', name: 'English', flag: '🇺🇸', label: 'EN' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', label: 'PT' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', label: 'FR' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', label: 'DE' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', label: 'IT' },
];

interface LanguageSelectorProps {
  isScrolled?: boolean;
  isMobile?: boolean;
}

export default function LanguageSelector({
  isScrolled = false,
  isMobile = false,
}: LanguageSelectorProps) {
  const [currentLang, setCurrentLang] = useState<string>('es');
  const [isOpen, setIsOpen] = useState(false);
  const [showAutoNotice, setShowAutoNotice] = useState(false);
  const [autoDetectedLangName, setAutoDetectedLangName] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Inicialización y detección de idioma
  useEffect(() => {
    // 1. Leer cookie 'googtrans' existente
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    const cookieVal = getCookie('googtrans');
    let activeCode = 'es';

    if (cookieVal) {
      const code = cookieVal.split('/').pop()?.toLowerCase();
      if (code && SUPPORTED_LANGUAGES.some((l) => l.code === code)) {
        activeCode = code;
      }
    } else {
      // 2. Si no hay cookie, verificar si ya se guardó en localStorage
      const saved = localStorage.getItem('qorikancha_language');
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        activeCode = saved;
      } else {
        // 3. DETECCIÓN AUTOMÁTICA DEL IDIOMA DEL NAVEGADOR
        try {
          const browserLang = (
            navigator.language ||
            (navigator as unknown as { userLanguage?: string }).userLanguage ||
            'es'
          ).toLowerCase();
          const primary = browserLang.split('-')[0];

          let detected = 'es';
          if (['en', 'pt', 'fr', 'de', 'it'].includes(primary)) {
            detected = primary;
          } else if (!browserLang.startsWith('es')) {
            // Turistas internacionales con otros idiomas reciben inglés por defecto
            detected = 'en';
          }

          if (detected !== 'es') {
            activeCode = detected;
            const targetCookie = `/auto/${detected}`;
            document.cookie = `googtrans=${targetCookie}; path=/;`;
            document.cookie = `googtrans=${targetCookie}; path=/; domain=${window.location.hostname};`;
            localStorage.setItem('qorikancha_language', detected);
            localStorage.setItem('qorikancha_auto_detected', detected);

            // Avisar al usuario que su idioma fue detectado automáticamente
            const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === detected);
            if (langObj) {
              setAutoDetectedLangName(langObj.name);
              setShowAutoNotice(true);
            }
          }
        } catch {
          // fallback silencioso
        }
      }
    }

    setCurrentLang(activeCode);

    // Verificar si se debe mostrar aviso de detección previa no cerrada
    const autoNoticeSeen = sessionStorage.getItem('qorikancha_auto_notice_seen');
    const autoDetected = localStorage.getItem('qorikancha_auto_detected');
    if (autoDetected && !autoNoticeSeen && activeCode !== 'es') {
      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === activeCode);
      if (langObj) {
        setAutoDetectedLangName(langObj.name);
        setShowAutoNotice(true);
      }
    }

    // Cerrar menú al hacer clic fuera
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    if (langCode === currentLang) {
      setIsOpen(false);
      return;
    }

    setCurrentLang(langCode);
    setIsOpen(false);
    setShowAutoNotice(false);

    try {
      localStorage.setItem('qorikancha_language', langCode);
      sessionStorage.setItem('qorikancha_auto_notice_seen', 'true');

      const cookieVal = `/auto/${langCode}`;
      document.cookie = `googtrans=${cookieVal}; path=/;`;
      document.cookie = `googtrans=${cookieVal}; path=/; domain=${window.location.hostname};`;

      // Intentar disparar cambio en el selector interno de Google Translate sin recargar
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      } else {
        // Recargar para aplicar con precisión a todo el DOM
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  const currentOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <div ref={dropdownRef} className="relative inline-block text-left notranslate">
        {/* Selector Desplegable de Lujo */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Seleccionar idioma de la página"
          data-cursor="IDIOMA"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-medium tracking-wider transition-all duration-300 border ${
            isScrolled || isMobile
              ? 'bg-obsidian-card/70 border-gold/30 text-mist hover:border-gold hover:text-gold'
              : 'bg-black/50 backdrop-blur-md border-white/20 text-white/90 hover:border-gold hover:text-gold'
          }`}
        >
          <span className="text-sm leading-none">{currentOption.flag}</span>
          <span className="font-bold text-[11px]">{currentOption.label}</span>
          <ChevronDown
            className={`w-3 h-3 text-gold transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Menú Desplegable con todos los idiomas */}
        {isOpen && (
          <div
            className={`absolute z-50 mt-2 w-48 rounded-2xl p-1.5 shadow-2xl backdrop-blur-xl border border-gold/30 transition-all duration-200 ${
              isMobile
                ? 'left-0 bg-obsidian-card/95'
                : 'right-0 bg-obsidian-card/95 text-mist'
            }`}
          >
            <div className="px-3 py-2 border-b border-gold/15 text-[10px] font-sans font-semibold text-gold tracking-widest uppercase flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-gold" />
              <span>Traductor Automático</span>
            </div>

            <div className="py-1">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-sans transition-all text-left ${
                      isSelected
                        ? 'bg-gold/15 text-gold font-bold border border-gold/30'
                        : 'text-mist/80 hover:bg-gold/10 hover:text-mist'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-gold" />}
                  </button>
                );
              })}
            </div>

            <div className="px-3 py-1.5 bg-obsidian-light/50 rounded-xl mt-1 text-[10px] font-sans text-mist/60 text-center">
              ✦ Detección automática activa
            </div>
          </div>
        )}
      </div>

      {/* Notificación Toast Discreta de Detección Automática */}
      {showAutoNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 max-w-sm glass-card rounded-2xl p-4 border border-gold/35 shadow-2xl backdrop-blur-xl animate-fade-in notranslate"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="flex-1 pr-2">
              <span className="text-[10px] font-sans font-bold text-gold tracking-wider uppercase block mb-0.5">
                Traducción Automática / Auto-detected
              </span>
              <p className="text-xs font-sans text-mist/90 leading-snug">
                Página traducida automáticamente a <strong className="text-gold">{autoDetectedLangName}</strong>. Puedes cambiar a Español u otro idioma en la cabecera.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowAutoNotice(false);
                sessionStorage.setItem('qorikancha_auto_notice_seen', 'true');
              }}
              aria-label="Cerrar notificación"
              className="text-mist/50 hover:text-gold transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

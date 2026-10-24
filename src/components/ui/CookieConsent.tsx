'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Settings, Check, X, ChevronRight, Lock } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

const STORAGE_KEY = 'qorikancha_cookie_consent_v1';
const COOKIE_NAME = 'qorikancha_consent_status';

// Helper para actualizar Google Consent Mode v2
function updateGoogleConsentMode(prefs: { analytics: boolean; marketing: boolean }) {
  if (typeof window !== 'undefined') {
    // Declaración segura de dataLayer y gtag
    const w = window as unknown as {
      dataLayer: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    w.dataLayer = w.dataLayer || [];
    if (!w.gtag) {
      w.gtag = function () {
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments);
      };
    }

    w.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.marketing ? 'granted' : 'denied',
      ad_user_data: prefs.marketing ? 'granted' : 'denied',
      ad_personalization: prefs.marketing ? 'granted' : 'denied',
    });

    // Disparar evento personalizado para otros scripts o listeners
    window.dispatchEvent(
      new CustomEvent('qorikancha-consent-updated', {
        detail: prefs,
      })
    );
  }
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [hasResolved, setHasResolved] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);

  // Estados de preferencias granulares (Estrictas siempre activas)
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // Carga inicial y listeners globales
  useEffect(() => {
    setMounted(true);

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalyticsConsent(parsed.analytics);
        setMarketingConsent(parsed.marketing);
        setHasResolved(true);
        // Sincronizar Google Consent Mode con lo almacenado
        updateGoogleConsentMode({
          analytics: parsed.analytics,
          marketing: parsed.marketing,
        });
      } else {
        setHasResolved(false);
      }
    } catch {
      setHasResolved(false);
    }

    // Listener para abrir el gestor de preferencias desde el Footer u otros enlaces
    const handleOpenPreferences = () => {
      setShowPreferencesModal(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
    };
  }, []);

  // Guardar en Storage y Cookie
  const savePreferences = (analytics: boolean, marketing: boolean) => {
    const prefs: CookiePreferences = {
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      // Guardar también como cookie HTTP de primer origen (expira en 180 días)
      const maxAge = 180 * 24 * 60 * 60;
      document.cookie = `${COOKIE_NAME}=${analytics ? '1' : '0'}${marketing ? '1' : '0'}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
    } catch {
      // Ignorar fallos de cuota o cookies restringidas en modo incógnito estricto
    }

    setAnalyticsConsent(analytics);
    setMarketingConsent(marketing);
    setHasResolved(true);
    setShowPreferencesModal(false);

    updateGoogleConsentMode({ analytics, marketing });
  };

  const handleAcceptAll = () => {
    savePreferences(true, true);
  };

  const handleRejectNonEssential = () => {
    savePreferences(false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(analyticsConsent, marketingConsent);
  };

  if (!mounted) return null;

  return (
    <>
      {/* =========================================================================
          BANNER INICIAL: Cumple con EDPB (Rechazar con igual prominencia visual)
          ========================================================================= */}
      {!hasResolved && (
        <div
          role="region"
          aria-label="Consentimiento de Cookies"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-xl z-[9998] animate-in fade-in slide-in-from-bottom-6 duration-500"
        >
          <div className="relative rounded-2xl bg-obsidian/95 backdrop-blur-2xl border border-gold/30 p-6 shadow-2xl shadow-black/80 text-mist">
            {/* Brillo ambiental dorado sutil */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

            {/* Cabecera del Banner */}
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0 text-gold mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-white tracking-tight flex items-center gap-2">
                  Privacidad & Soberanía de Datos
                </h3>
                <p className="text-[11px] font-mono text-gold tracking-widest uppercase mt-0.5">
                  Estándar Internacional RGPD · CCPA · Ley Nº 29733 (Perú)
                </p>
              </div>
            </div>

            {/* Descripción editorial transparente */}
            <p className="text-xs text-mist/75 leading-relaxed mb-4">
              En <strong className="text-white font-medium">Qorikancha Sanctuary Expeditions</strong> empleamos cookies
              técnicas esenciales para la seguridad y navegación de nuestra plataforma. Con su consentimiento previo,
              activamos cookies de analítica y medición para perfeccionar nuestros protocolos de alta montaña. Nunca
              comercializamos sus datos personales.
            </p>

            {/* Acciones principales: RECHAZAR y ACEPTAR con simetría visual legal estricta */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowPreferencesModal(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono text-mist/60 hover:text-mist transition-colors cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configurar</span>
              </button>

              <div className="flex items-center gap-2">
                {/* BOTÓN RECHAZAR: Mismo tamaño, contraste y peso accesible que Aceptar */}
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 text-mist text-xs font-mono font-medium tracking-wide transition-all cursor-pointer"
                >
                  Rechazar No Esenciales
                </button>

                {/* BOTÓN ACEPTAR TODAS */}
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-gold/50 bg-gold/20 hover:bg-gold/30 active:scale-95 text-gold hover:text-white text-xs font-mono font-semibold tracking-wide transition-all cursor-pointer shadow-sm shadow-gold/20"
                >
                  Aceptar Todas
                </button>
              </div>
            </div>

            {/* Enlaces a Políticas */}
            <div className="mt-3 pt-2 text-[10px] font-mono text-mist/40 flex items-center justify-between">
              <span>Consent Mode v2 habilitado</span>
              <div className="flex items-center gap-3">
                <Link href="/privacidad" className="hover:text-gold transition-colors underline">
                  Privacidad
                </Link>
                <span>·</span>
                <Link href="/cookies" className="hover:text-gold transition-colors underline">
                  Política de Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE PREFERENCIAS GRANULARES (Invocable en cualquier momento)
          ========================================================================= */}
      {showPreferencesModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cookie-title"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-xl animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-2xl bg-charcoal/95 border border-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Cabecera del Modal */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between bg-obsidian/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h2 id="modal-cookie-title" className="text-xl font-serif font-medium text-white">
                    Centro de Preferencias de Privacidad
                  </h2>
                  <p className="text-xs font-mono text-gold tracking-wider">
                    QORIKANCHA EXPEDITIONS · GESTIÓN GRANULAR DE COOKIES
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-mist/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cuerpo del Modal con Categorías Granulares */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 font-sans text-xs">
              <p className="text-mist/80 leading-relaxed">
                Usted tiene el derecho irrevocable de elegir qué tecnologías de rastreo permite en su dispositivo. Las
                cookies estrictamente necesarias garantizan la operatividad del sitio y la protección de transacciones.
                Las demás solo se activarán con su consentimiento afirmativo.
              </p>

              {/* Categoría 1: Estrictamente Necesarias (Obligatorias) */}
              <div className="p-4 rounded-xl bg-obsidian/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-medium text-white text-sm">Cookies Estrictamente Necesarias</h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] uppercase tracking-wider font-semibold">
                    Siempre Activas
                  </span>
                </div>
                <p className="text-mist/65 text-[11px] leading-relaxed">
                  Indispensables para la arquitectura de navegación, balanceo de carga seguro, prevención de ataques
                  CSRF, autenticación de sesiones cifradas y conservación de sus propias elecciones de privacidad. No
                  pueden ser desactivadas en nuestros servidores.
                </p>
                <div className="text-[10px] font-mono text-mist/40 pt-1">
                  Ejemplos: <code>qorikancha_consent_status</code>, <code>__Host-next-auth</code>, balanceo de infraestructura.
                </div>
              </div>

              {/* Categoría 2: Analítica y Medición (Consent Mode v2: analytics_storage) */}
              <div className="p-4 rounded-xl bg-obsidian/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <h3 className="font-medium text-white text-sm">Analítica & Rendimiento Telemétrico</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsConsent}
                      onChange={(e) => setAnalyticsConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
                <p className="text-mist/65 text-[11px] leading-relaxed">
                  Permiten cuantificar visitas y fuentes de tráfico para medir y optimizar el rendimiento técnico de los
                  mapas interactivos y guías de altitud. La información se procesa de forma disociada o agregada bajo
                  Google Consent Mode v2 (IP anonimizada).
                </p>
                <div className="text-[10px] font-mono text-mist/40 pt-1">
                  Señales vinculadas: <code>analytics_storage</code> (Google Analytics 4).
                </div>
              </div>

              {/* Categoría 3: Marketing y Conversiones (Consent Mode v2: ad_storage, ad_user_data) */}
              <div className="p-4 rounded-xl bg-obsidian/70 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-purple-400" />
                    <h3 className="font-medium text-white text-sm">Personalización & Conversiones VIP</h3>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
                <p className="text-mist/65 text-[11px] leading-relaxed">
                  Se utilizan para registrar el interés en itinerarios de expedición específicos y presentar propuestas
                  personalizadas en plataformas de viajes internacionales, limitando la reiteración publicitaria.
                </p>
                <div className="text-[10px] font-mono text-mist/40 pt-1">
                  Señales vinculadas: <code>ad_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code>.
                </div>
              </div>

              {/* Vínculo a Políticas Completas */}
              <div className="p-3 rounded-lg bg-gold/5 border border-gold/20 flex items-center justify-between text-[11px]">
                <span className="text-mist/80">
                  Consulte nuestra tabla detallada de cookies, vigencias y proveedores autorizados.
                </span>
                <Link
                  href="/cookies"
                  onClick={() => setShowPreferencesModal(false)}
                  className="inline-flex items-center gap-1 text-gold hover:underline font-mono"
                >
                  <span>Ver inventario</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pie del Modal con Acciones */}
            <div className="p-6 border-t border-white/10 bg-obsidian/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRejectNonEssential}
                className="px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-mist text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                Rechazar Todas
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-gold/40 bg-gold/15 hover:bg-gold/25 text-gold text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Guardar Selección</span>
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-gold bg-gold hover:bg-gold-light text-obsidian text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Aceptar Todas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

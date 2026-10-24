'use client';

import React from 'react';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import { Cookie, Settings, ArrowLeft, ShieldCheck, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';

export default function CookiePolicyPage() {
  const { brand } = cuscoConfig;

  const handleOpenPreferences = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-preferences'));
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-mist pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navegación de retorno */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar a la Colección de Expediciones</span>
          </Link>
        </div>

        {/* Encabezado Editorial */}
        <header className="border-b border-gold/20 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-mono tracking-widest uppercase mb-4">
            <Cookie className="w-3.5 h-3.5" />
            Transparencia Tecnológica & Consentimiento
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4 leading-tight">
            Política de Cookies & Tecnologías de Almacenamiento
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-mist/60">
            <span>Directiva ePrivacy (2009/136/CE) · RGPD · Google Consent Mode v2</span>
            <span>·</span>
            <span>Última revisión: 2026</span>
          </div>
        </header>

        {/* Módulo interactivo de control directo de preferencias */}
        <div className="p-6 rounded-2xl bg-charcoal/90 border border-gold/40 mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <h2 className="text-base font-serif font-medium text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-gold" />
              Gestione su Consentimiento en Cualquier Momento
            </h2>
            <p className="text-xs text-mist/75">
              Puede modificar o revocar su autorización para cookies analíticas o de personalización con un solo clic.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenPreferences}
            className="px-5 py-3 rounded-xl bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold hover:text-white text-xs font-mono font-semibold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 active:scale-95 shadow-md shadow-gold/10"
          >
            <Settings className="w-4 h-4" />
            <span>Abrir Preferencias</span>
          </button>
        </div>

        {/* Contenido de la Política */}
        <div className="space-y-12 text-mist/80 text-sm leading-relaxed">
          {/* 01. Definición */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-mono text-sm">01.</span>
              ¿Qué son las Cookies y Tecnologías Similares?
            </h2>
            <p>
              Una cookie es un pequeño archivo de texto que un sitio web descarga en su navegador o dispositivo para
              almacenar información técnica, recordar sus preferencias de navegación y permitir una experiencia fluida.
              Asimismo, empleamos el almacenamiento local del navegador (<code>localStorage</code>) con idéntico fin de
              conservar sus opciones de consentimiento sin requerir consultas constantes a nuestros servidores.
            </p>
            <p>
              En <strong>{brand.name}</strong> cumplimos estrictamente con la doctrina de <em>Consentimiento Previo</em>{' '}
              establecida por el Comité Europeo de Protección de Datos (EDPB): ninguna cookie no esencial se deposita
              en su dispositivo antes de que usted haya tomado una decisión informada.
            </p>
          </section>

          {/* 02. Inventario Detallado de Cookies */}
          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-mono text-sm">02.</span>
              Inventario Exhaustivo de Cookies en Nuestra Plataforma
            </h2>
            <p>
              A continuación se detalla la totalidad de las cookies y elementos de almacenamiento técnico utilizados:
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-obsidian">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-white/5 border-b border-white/10 text-gold font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Nombre / Clave</th>
                    <th className="p-3.5">Proveedor</th>
                    <th className="p-3.5">Categoría</th>
                    <th className="p-3.5">Finalidad Técnica</th>
                    <th className="p-3.5">Vigencia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white">qorikancha_cookie_consent_v1</td>
                    <td className="p-3.5 text-mist/70">Propio (Local)</td>
                    <td className="p-3.5 text-emerald-400">Esencial</td>
                    <td className="p-3.5 font-sans text-mist/80">
                      Guarda las preferencias de privacidad del usuario (analítica y marketing).
                    </td>
                    <td className="p-3.5 text-mist/60">Persistente (1 año)</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white">qorikancha_consent_status</td>
                    <td className="p-3.5 text-mist/70">Propio (Cookie)</td>
                    <td className="p-3.5 text-emerald-400">Esencial</td>
                    <td className="p-3.5 font-sans text-mist/80">
                      Cookie HTTP de primer origen (SameSite=Lax; Secure) para lectura pre-renderizado en servidor.
                    </td>
                    <td className="p-3.5 text-mist/60">180 días</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white">_ga, _ga_*</td>
                    <td className="p-3.5 text-mist/70">Google LLC (GA4)</td>
                    <td className="p-3.5 text-gold">Analítica</td>
                    <td className="p-3.5 font-sans text-mist/80">
                      Distingue a los usuarios de manera anónima para calcular métricas de tráfico y uso de mapas.
                    </td>
                    <td className="p-3.5 text-mist/60">2 años</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white">_gcl_au</td>
                    <td className="p-3.5 text-mist/70">Google AdSense / Ads</td>
                    <td className="p-3.5 text-purple-400">Marketing</td>
                    <td className="p-3.5 font-sans text-mist/80">
                      Medición de conversiones de campañas de expediciones en Google Ads (requiere opt-in explícito).
                    </td>
                    <td className="p-3.5 text-mist/60">90 días</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="p-3.5 font-bold text-white">_fbp</td>
                    <td className="p-3.5 text-mist/70">Meta Platforms Inc.</td>
                    <td className="p-3.5 text-purple-400">Marketing</td>
                    <td className="p-3.5 font-sans text-mist/80">
                      Píxel de seguimiento de conversiones para optimizar anuncios de expediciones VIP en Instagram.
                    </td>
                    <td className="p-3.5 text-mist/60">90 días</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 03. Google Consent Mode v2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-mono text-sm">03.</span>
              Implementación de Google Consent Mode v2
            </h2>
            <p>
              Nuestra plataforma opera con el protocolo <strong>Google Consent Mode v2</strong>. Antes de que se active
              cualquier medición, las siguientes cuatro señales permanecen denegadas (<code>denied</code>) de forma
              predeterminada en el código:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">analytics_storage</strong>
                  <span className="text-mist/70">Controla el almacenamiento de métricas analíticas.</span>
                </div>
              </li>
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">ad_storage</strong>
                  <span className="text-mist/70">Controla el almacenamiento con fines publicitarios.</span>
                </div>
              </li>
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">ad_user_data</strong>
                  <span className="text-mist/70">Autoriza el envío de datos de usuario con fines publicitarios.</span>
                </div>
              </li>
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-mono">ad_personalization</strong>
                  <span className="text-mist/70">Habilita anuncios personalizados y retargeting de expedición.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* 04. Desactivación desde el Navegador */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-mono text-sm">04.</span>
              Cómo Desactivar o Eliminar Cookies desde su Navegador
            </h2>
            <p>
              Además de nuestro panel de control, usted puede bloquear, permitir o suprimir cookies mediante la
              configuración nativa de su navegador:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1 font-mono">
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-obsidian border border-white/10 hover:border-gold/40 transition-colors flex items-center justify-between"
              >
                <span>Google Chrome</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-obsidian border border-white/10 hover:border-gold/40 transition-colors flex items-center justify-between"
              >
                <span>Apple Safari</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
              <a
                href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-obsidian border border-white/10 hover:border-gold/40 transition-colors flex items-center justify-between"
              >
                <span>Mozilla Firefox</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
              <a
                href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-obsidian border border-white/10 hover:border-gold/40 transition-colors flex items-center justify-between"
              >
                <span>Microsoft Edge</span>
                <ExternalLink className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>
            <p className="text-xs text-mist/60 pt-1">
              <em>Nota técnica:</em> Si decide deshabilitar totalmente las cookies técnicas en su navegador, ciertas
              funcionalidades interactivas (como el guardado del estado de sus cotizaciones o la autenticación de
              solicitudes) podrían no ejecutarse correctamente.
            </p>
          </section>

          {/* 05. Enlaces de referencia */}
          <section className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-mist/70">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Conforme con las Directrices EDPB 03/2022 sobre Patrones Engañosos</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacidad" className="text-gold hover:underline font-mono">
                Política de Privacidad →
              </Link>
              <Link href="/terminos" className="text-mist/70 hover:text-white font-mono">
                Términos y Condiciones →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

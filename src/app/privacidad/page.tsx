import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import { ShieldCheck, Lock, Mail, ArrowLeft, HeartPulse, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: `Política de Privacidad & Protección de Datos | ${cuscoConfig.brand.name}`,
  description:
    'Declaración de privacidad y tratamiento de datos personales conforme al RGPD (UE), CCPA (California) y la Ley Nº 29733 / D.S. 016-2024-JUS de la República del Perú.',
};

export default function PrivacyPolicyPage() {
  const { legal, brand } = cuscoConfig;
  const lastUpdated = 'Noviembre de 2024 (Conforme al D.S. Nº 016-2024-JUS)';

  return (
    <main className="min-h-screen bg-obsidian text-mist pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navegación de retorno */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans text-gold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar a la Colección de Expediciones</span>
          </Link>
        </div>

        {/* Encabezado Editorial */}
        <header className="border-b border-gold/20 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-sans tracking-widest uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Marco Jurídico de Soberanía de Datos
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4 leading-tight">
            Política de Privacidad & Tratamiento de Datos Personales
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-mist/60">
            <span>Última Actualización: {lastUpdated}</span>
            <span>·</span>
            <span>Versión 2.4 (Estándar Internacional RGPD / LPDP Perú)</span>
          </div>
        </header>

        {/* Resumen Ejecutivo de Confianza */}
        <div className="p-6 rounded-2xl bg-charcoal/80 border border-gold/30 mb-12 space-y-3">
          <h2 className="text-sm font-sans uppercase tracking-wider text-gold flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Compromiso de Ultralujo & Confidencialidad
          </h2>
          <p className="text-sm text-mist/90 leading-relaxed">
            En <strong>{legal.legalName}</strong> (bajo la marca comercial <em>{brand.name}</em>) tratamos la privacidad
            de nuestros expedicionarios con el mismo rigor y reverencia que prodigamos a los santuarios de los Andes.
            Garantizamos que sus datos nunca serán vendidos, comercializados ni cedidos a terceros con fines
            publicitarios no autorizados.
          </p>
        </div>

        {/* Artículos de la Política */}
        <div className="space-y-12 text-mist/80 text-sm leading-relaxed">
          {/* Sección 1: Identificación del Responsable */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">01.</span>
              Identificación del Responsable del Tratamiento
            </h2>
            <p>
              El titular y responsable de los bancos de datos donde se recopila su información es:
            </p>
            <div className="p-4 rounded-xl bg-obsidian border border-white/10 font-sans text-xs space-y-1.5 text-mist/90">
              <p><strong>Razón Social:</strong> {legal.legalName}</p>
              <p><strong>RUC:</strong> {legal.ruc}</p>
              <p><strong>Domicilio Fiscal:</strong> {legal.address}</p>
              <p><strong>Licencia DIRCETUR:</strong> {legal.dirceturRegistration}</p>
              <p><strong>Registro Nacional de Bancos de Datos (ANPDP):</strong> {legal.dataBankRegistration}</p>
              <p><strong>Oficial de Privacidad (DPO):</strong> {legal.dpoContact}</p>
            </div>
          </section>

          {/* Sección 2: Marco Normativo Aplicable */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">02.</span>
              Marco Normativo & Alcance Extraterritorial
            </h2>
            <p>
              Esta política ha sido estructurada para satisfacer concurrentemente los más elevados estándares de
              protección de la privacidad a nivel global:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 pt-2">
              <li className="p-3.5 rounded-xl bg-obsidian/70 border border-white/10 space-y-1">
                <span className="font-sans text-xs text-gold flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  Perú: Ley Nº 29733 & D.S. 016-2024-JUS
                </span>
                <p className="text-xs text-mist/70">
                  Cumplimiento del nuevo Reglamento de noviembre de 2024, principio de responsabilidad proactiva
                  (accountability) y notificación de incidentes ante la ANPDP.
                </p>
              </li>
              <li className="p-3.5 rounded-xl bg-obsidian/70 border border-white/10 space-y-1">
                <span className="font-sans text-xs text-gold flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  Unión Europea: RGPD (UE 2016/679)
                </span>
                <p className="text-xs text-mist/70">
                  Protección extraterritorial de los derechos de ciudadanos y residentes comunitarios que contraten
                  expediciones o naveguen desde la UE.
                </p>
              </li>
              <li className="p-3.5 rounded-xl bg-obsidian/70 border border-white/10 space-y-1">
                <span className="font-sans text-xs text-gold flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  California: CCPA / CPRA
                </span>
                <p className="text-xs text-mist/70">
                  Respeto a la solicitud de &quot;Do Not Sell or Share My Personal Information&quot; y reconocimiento de
                  la señal Global Privacy Control (GPC).
                </p>
              </li>
              <li className="p-3.5 rounded-xl bg-obsidian/70 border border-white/10 space-y-1">
                <span className="font-sans text-xs text-gold flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                  Directiva ePrivacy (2009/136/CE)
                </span>
                <p className="text-xs text-mist/70">
                  Consentimiento previo, libre y explícito antes del depósito de cookies no esenciales en terminales.
                </p>
              </li>
            </ul>
          </section>

          {/* Sección 3: Datos Recopilados y Fines */}
          <section className="space-y-4">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">03.</span>
              Datos Personales Recopilados y Finalidades
            </h2>
            <p>
              Recopilamos únicamente los datos indispensables para formular su cotización personalizada, emitir permisos
              arqueológicos oficiales y velar por su seguridad biomédica en altitud:
            </p>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-obsidian border border-white/10">
                <h3 className="font-sans text-xs uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gold" />
                  A. Datos de Identificación y Reserva Oficial
                </h3>
                <p className="text-xs text-mist/75 mb-2">
                  Nombres completos, nacionalidad, número de pasaporte o documento de identidad, fecha de nacimiento,
                  idioma de preferencia y datos de contacto (correo y WhatsApp).
                </p>
                <p className="text-[11px] font-sans text-gold/80">
                  <strong>Finalidad legal:</strong> Emisión obligatoria de boletos nominales ante el Ministerio de
                  Cultura de Perú (Llaqta de Machu Picchu), pases del Camino Inca (SERNANP) y boletos ferroviarios
                  nominales (PeruRail / Inca Rail).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-obsidian border border-gold/30">
                <h3 className="font-sans font-medium text-xs uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-gold" />
                  B. Tratamiento Especial de Datos Sensibles de Salud y Aclimatación
                </h3>
                <p className="text-xs text-mist/75 mb-2">
                  Información sobre condiciones cardiovasculares, asma o patologías respiratorias, antecedentes de mal de
                  montaña severo (soroche), medicación actual y alergias alimentarias.
                </p>
                <p className="text-[11px] text-mist/70">
                  <strong className="text-gold">Régimen Jurídico Especial (Art. 13.1 Ley 29733 y Art. 9.2.c RGPD):</strong>{' '}
                  Estos datos son considerados legalmente <em>sensibles</em>. Se tratan con base exclusiva en salvaguardar
                  su vida, salud e integridad física en travesías de hasta 5,036 msnm. Son accesibles únicamente por los
                  médicos de apoyo y guías certificados <em>Wilderness Medical First Responder (WFR)</em> asignados a su
                  expedición, sujetos a secreto profesional estricto.
                </p>
              </div>
            </div>
          </section>

          {/* Sección 4: Transferencias Internacionales */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">04.</span>
              Flujo Transfronterizo de Datos (Transferencias Internacionales)
            </h2>
            <p>
              Para brindar una experiencia digital de alta disponibilidad y gestionar consultas en tiempo real,
              utilizamos infraestructura en la nube de proveedores globales de primer nivel que operan bajo Cláusulas
              Contractuales Tipo aprobadas por la Comisión Europea y conformes con el D.S. Nº 016-2024-JUS de Perú:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-mist/75 pl-2">
              <li><strong>Vercel Inc. & Amazon Web Services (AWS)</strong> (EE.UU.): Alojamiento web seguro y CDN perimetral cifrada SSL/TLS.</li>
              <li><strong>Google LLC</strong> (EE.UU.): Métricas anonimizadas bajo Google Consent Mode v2 y analítica técnica.</li>
              <li><strong>Meta Platforms Inc.</strong> (EE.UU.): Canal de soporte y mensajería encriptada extremo a extremo (WhatsApp Concierge).</li>
            </ul>
          </section>

          {/* Sección 5: Conservación y Seguridad */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">05.</span>
              Seguridad y Plazo de Conservación
            </h2>
            <p>
              Implementamos cifrado en tránsito (TLS 1.3) y en reposo (AES-256), controles de acceso de mínimo
              privilegio y auditorías de seguridad periódicas. Sus datos se conservarán durante la vigencia de la
              relación de servicio y, posteriormente, durante los plazos legalmente exigibles por la legislación
              tributaria peruana (SUNAT, 5 años para comprobantes de pago) o hasta que usted ejerza su derecho de
              supresión cuando no medie deber legal en contrario.
            </p>
          </section>

          {/* Sección 6: Ejercicio de Derechos ARCO y RGPD */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">06.</span>
              Ejercicio de Derechos ARCO (Perú) y Derechos RGPD (UE)
            </h2>
            <p>
              Usted tiene el derecho inalienable de ejercer en cualquier momento los siguientes derechos sobre su
              información personal:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-obsidian border border-white/10">
                <strong className="text-gold block mb-1">Acceso & Información:</strong>
                Conocer qué datos personales tratamos y los detalles de su procesamiento.
              </div>
              <div className="p-3 rounded-lg bg-obsidian border border-white/10">
                <strong className="text-gold block mb-1">Rectificación & Actualización:</strong>
                Corregir datos inexactos, desactualizados o incompletos.
              </div>
              <div className="p-3 rounded-lg bg-obsidian border border-white/10">
                <strong className="text-gold block mb-1">Cancelación / Supresión (Olvido):</strong>
                Solicitar la eliminación total de sus datos cuando ya no sean requeridos.
              </div>
              <div className="p-3 rounded-lg bg-obsidian border border-white/10">
                <strong className="text-gold block mb-1">Oposición & Limitación:</strong>
                Oponerse al tratamiento para finalidades secundarias o revocar su consentimiento.
              </div>
            </div>

            <p className="pt-2">
              Para tramitar su solicitud, remita una comunicación formal adjuntando copia simple de su documento de
              identidad al correo exclusivo de nuestro Oficial de Protección de Datos:
            </p>
            <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold" />
                <span className="font-sans text-xs text-white">{legal.privacyEmail}</span>
              </div>
              <span className="text-[11px] font-sans text-gold/80">Plazo máximo de respuesta: 10 días hábiles</span>
            </div>
            <p className="text-xs text-mist/60">
              En caso de considerar vulnerado su derecho, puede recurrir ante la <strong>Autoridad Nacional de Protección
              de Datos Personales (ANPDP)</strong> de la República del Perú o la Autoridad de Control de su país de
              residencia en la Unión Europea.
            </p>
          </section>

          {/* Sección 7: Canales y Consultas */}
          <section className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <p className="font-medium text-white">{legal.legalName}</p>
              <p className="text-mist/60 font-sans">{legal.address}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/cookies" className="text-gold hover:underline font-sans">
                Política de Cookies →
              </Link>
              <Link href="/libro-de-reclamaciones" className="text-mist/70 hover:text-white font-sans">
                Libro de Reclamaciones →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

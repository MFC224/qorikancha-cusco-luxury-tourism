'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  BookOpen,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Printer,
} from 'lucide-react';

export default function ComplaintsBookPage() {
  const { legal } = cuscoConfig;

  // Código correlativo generado para la sesión actual
  const [claimCode] = useState(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `QOR-LR-2026-${randomNum}`;
  });

  const currentDate = new Date().toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Estado del formulario
  const [formData, setFormData] = useState({
    consumerName: '',
    documentType: 'Pasaporte',
    documentNumber: '',
    email: '',
    phone: '',
    address: '',
    isMinor: false,
    parentName: '',
    serviceType: 'Servicio',
    expeditionName: '',
    claimedAmount: '',
    claimType: 'Reclamo', // Reclamo | Queja
    claimDetail: '',
    consumerRequest: '',
    acceptTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.consumerName || !formData.documentNumber || !formData.email || !formData.claimDetail) {
      setErrorMsg('Por favor complete todos los campos obligatorios marcados con (*).');
      return;
    }

    if (!formData.acceptTerms) {
      setErrorMsg('Debe declarar bajo juramento la veracidad de los datos conforme a ley.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-mist pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-glow opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navegación de retorno */}
        <div className="mb-8 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-gold hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retornar a la Colección de Expediciones</span>
          </Link>
        </div>

        {/* Encabezado Institucional INDECOPI */}
        <header className="border-b border-gold/20 pb-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-mono tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              Libro de Reclamaciones Virtual
            </div>
            <div className="font-mono text-xs text-gold/90 px-3 py-1 rounded-lg bg-obsidian border border-white/10 self-start sm:self-auto">
              Hoja de Reclamación N°: <strong>{claimCode}</strong>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-medium text-white tracking-tight mb-3">
            Libro de Reclamaciones
          </h1>
          <p className="text-xs text-mist/70 font-mono">
            Conforme a lo dispuesto en el Código de Protección y Defensa del Consumidor (Ley N° 29571) y el D.S.
            011-2011-PCM modificado por la Ley N° 31435.
          </p>

          {/* Datos Fiscales del Proveedor */}
          <div className="mt-6 p-4 rounded-xl bg-charcoal/70 border border-white/10 text-xs font-mono grid sm:grid-cols-2 gap-2 text-mist/80">
            <div>
              <span className="text-gold">Razón Social:</span> {legal.legalName}
            </div>
            <div>
              <span className="text-gold">RUC:</span> {legal.ruc}
            </div>
            <div>
              <span className="text-gold">Establecimiento:</span> {legal.address}
            </div>
            <div>
              <span className="text-gold">Fecha de Emisión:</span> {currentDate}
            </div>
          </div>
        </header>

        {/* =========================================================================
            VISTA DE CONFIRMACIÓN TRAS ENVÍO EXITOSO
            ========================================================================= */}
        {submitted ? (
          <div className="p-8 rounded-2xl bg-charcoal/90 border border-gold/40 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-serif font-medium text-white mb-2">
                Hoja de Reclamación Registrada con Éxito
              </h2>
              <p className="text-sm text-mist/80 leading-relaxed">
                Su {formData.claimType.toLowerCase()} ha sido remitida con el código de seguimiento único{' '}
                <strong className="text-gold font-mono">{claimCode}</strong>. Se ha despachado una copia electrónica
                íntegra de esta constancia al correo suministrado (<em>{formData.email}</em>).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-obsidian border border-white/10 text-xs font-mono space-y-1.5 text-mist/80">
              <div className="flex items-center gap-2 text-gold font-semibold">
                <Clock className="w-4 h-4" />
                Plazo Legal de Respuesta (Ley N° 31435):
              </div>
              <p className="font-sans text-xs text-mist/75 leading-relaxed pt-1">
                Conforme al Artículo 24 de la Ley N° 29571 (modificado por Ley N° 31435), daremos respuesta formal y
                fundada a su {formData.claimType.toLowerCase()} en un plazo máximo de{' '}
                <strong className="text-white">quince (15) días hábiles improrrogables</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-mist text-xs font-mono font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Hoja de Reclamación</span>
              </button>
              <Link
                href="/"
                className="px-4 py-2.5 rounded-lg border border-gold/40 bg-gold/15 hover:bg-gold/25 text-gold text-xs font-mono font-semibold transition-colors"
              >
                Volver a la Página Principal
              </Link>
            </div>
          </div>
        ) : (
          /* =========================================================================
              FORMULARIO OFICIAL DE HOJA DE RECLAMACIÓN VIRTUAL
              ========================================================================= */
          <form onSubmit={handleSubmit} className="space-y-8 font-sans text-sm">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* SECCIÓN 1: Identificación del Consumidor Reclamante */}
            <fieldset className="p-6 rounded-2xl bg-charcoal/70 border border-white/10 space-y-4">
              <legend className="font-mono text-xs uppercase tracking-wider text-gold px-2 font-semibold">
                1. Identificación del Consumidor Reclamante
              </legend>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-mist/80 mb-1">
                    Nombres y Apellidos Completos *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.consumerName}
                    onChange={(e) => setFormData({ ...formData, consumerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="Ej. Alexander von Humboldt"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/80 mb-1">Tipo de Documento *</label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                  >
                    <option value="Pasaporte">Pasaporte (Extranjero)</option>
                    <option value="DNI">DNI (Documento Nacional de Identidad)</option>
                    <option value="Carné de Extranjería">Carné de Extranjería</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/80 mb-1">Número de Documento *</label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="Número de documento"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/80 mb-1">
                    Correo Electrónico * (Para envío de constancia)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/80 mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="+1 555 123 4567"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-mist/80 mb-1">Domicilio del Consumidor *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="Dirección, Ciudad y País"
                  />
                </div>
              </div>
            </fieldset>

            {/* SECCIÓN 2: Identificación del Bien Contratado */}
            <fieldset className="p-6 rounded-2xl bg-charcoal/70 border border-white/10 space-y-4">
              <legend className="font-mono text-xs uppercase tracking-wider text-gold px-2 font-semibold">
                2. Identificación del Bien o Servicio Contratado
              </legend>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-mist/80 mb-1">Tipo de Bien *</label>
                  <div className="flex gap-4 pt-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="serviceType"
                        value="Servicio"
                        checked={formData.serviceType === 'Servicio'}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="text-gold focus:ring-gold"
                      />
                      <span>Servicio Turístico</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs">
                      <input
                        type="radio"
                        name="serviceType"
                        value="Producto"
                        checked={formData.serviceType === 'Producto'}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="text-gold focus:ring-gold"
                      />
                      <span>Producto</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist/80 mb-1">Monto Reclamado (USD / PEN)</label>
                  <input
                    type="text"
                    value={formData.claimedAmount}
                    onChange={(e) => setFormData({ ...formData, claimedAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="Ej. USD 2,400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-mist/80 mb-1">
                    Descripción de la Expedición / Servicio *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.expeditionName}
                    onChange={(e) => setFormData({ ...formData, expeditionName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans"
                    placeholder="Ej. Salkantay Sky Domes & Domos Geodésicos (Fecha de salida)"
                  />
                </div>
              </div>
            </fieldset>

            {/* SECCIÓN 3: Detalle de la Reclamación */}
            <fieldset className="p-6 rounded-2xl bg-charcoal/70 border border-white/10 space-y-4">
              <legend className="font-mono text-xs uppercase tracking-wider text-gold px-2 font-semibold">
                3. Detalle de la Reclamación y Pedido del Consumidor
              </legend>

              {/* Selector Tipológico Reclamo vs Queja conforme a INDECOPI */}
              <div className="space-y-2">
                <label className="block text-xs font-mono text-mist/80">Tipo de Disconformidad *</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                      formData.claimType === 'Reclamo'
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-white/10 bg-obsidian text-mist/70 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="claimType"
                      value="Reclamo"
                      checked={formData.claimType === 'Reclamo'}
                      onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                      className="sr-only"
                    />
                    <div className="font-mono text-xs font-bold text-gold mb-1">RECLAMO</div>
                    <p className="text-[11px] leading-relaxed">
                      Disconformidad relacionada a los bienes o servicios turísticos brindados.
                    </p>
                  </label>

                  <label
                    className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                      formData.claimType === 'Queja'
                        ? 'border-gold bg-gold/10 text-white'
                        : 'border-white/10 bg-obsidian text-mist/70 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="claimType"
                      value="Queja"
                      checked={formData.claimType === 'Queja'}
                      onChange={(e) => setFormData({ ...formData, claimType: e.target.value })}
                      className="sr-only"
                    />
                    <div className="font-mono text-xs font-bold text-gold mb-1">QUEJA</div>
                    <p className="text-[11px] leading-relaxed">
                      Malestar o descontento respecto a la atención al público (no ligada al servicio en sí).
                    </p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-mist/80 mb-1">
                  Detalle de los Hechos que Motivan la Reclamación *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.claimDetail}
                  onChange={(e) => setFormData({ ...formData, claimDetail: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans leading-relaxed"
                  placeholder="Describa con claridad y precisión las circunstancias del hecho..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-mist/80 mb-1">Pedido Concreto del Consumidor *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.consumerRequest}
                  onChange={(e) => setFormData({ ...formData, consumerRequest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian border border-white/15 focus:border-gold focus:outline-none text-mist text-xs font-sans leading-relaxed"
                  placeholder="Detalle la solución esperada o restitución pretendida..."
                />
              </div>
            </fieldset>

            {/* Declaración Jurada y Consentimiento Legal */}
            <div className="p-4 rounded-xl bg-obsidian border border-white/10 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-gold focus:ring-gold bg-obsidian border-white/20"
                />
                <span className="text-xs text-mist/75 leading-relaxed">
                  Declaro bajo juramento que los datos consignados en esta Hoja de Reclamación son verdaderos y
                  autorizo el tratamiento de mis datos de contacto exclusivamente para el trámite y notificación de la
                  respuesta conforme a la Ley N° 29733 y el Código de Protección y Defensa del Consumidor.
                </span>
              </label>

              <div className="text-[11px] font-mono text-gold/80 flex items-center gap-2 pt-1 border-t border-white/5">
                <FileText className="w-3.5 h-3.5 text-gold" />
                <span>
                  Plazo legal improrrogable de atención: quince (15) días hábiles (Ley N° 29571 y Ley N° 31435).
                </span>
              </div>
            </div>

            {/* Botón de Envío */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-mono text-mist/50">
                La formulación del reclamo no impide acudir a otras vías de solución de controversias ante INDECOPI.
              </span>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gold hover:bg-gold-light text-obsidian text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-gold/20 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Procesando...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Registrar Hoja de Reclamación</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { cuscoConfig } from '@/data/cuscoConfig';
import { Compass, ShieldAlert, ArrowLeft, HeartPulse, Scale, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: `Términos y Condiciones de Expedición | ${cuscoConfig.brand.name}`,
  description:
    'Condiciones contractuales generales para expediciones privadas de alta montaña, reservas de Machu Picchu, protocolos de bioseguridad y cláusulas de fuerza mayor en los Andes del Perú.',
};

export default function TermsConditionsPage() {
  const { legal, brand } = cuscoConfig;

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
            <Scale className="w-3.5 h-3.5" />
            Marco Contractual de Alta Montaña
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-medium text-white tracking-tight mb-4 leading-tight">
            Términos y Condiciones Generales de Expedición Privada
          </h1>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-sans text-mist/60">
            <span>Ley General de Turismo Nº 29408 · D.S. 005-2020-MINCETUR</span>
            <span>·</span>
            <span>Edición {brand.edition}</span>
          </div>
        </header>

        {/* Resumen de Seguridad y Compromiso */}
        <div className="p-6 rounded-2xl bg-charcoal/80 border border-gold/30 mb-12 space-y-3">
          <h2 className="text-sm font-sans uppercase tracking-wider text-gold flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Naturaleza de la Expedición & Seguridad Absoluta
          </h2>
          <p className="text-sm text-mist/90 leading-relaxed">
            Las travesías operadas por <strong>{legal.legalName}</strong> se desarrollan en geografías andinas remotas y
            altitudes comprendidas entre los 2,040 msnm y los 4,630 msnm. Al contratar nuestros servicios, el
            expedicionario reconoce y acepta los protocolos biológicos, regulaciones patrimoniales del Estado Peruano y
            mecanismos de contingencia descritos en el presente instrumento.
          </p>
        </div>

        {/* Artículos Contractuales */}
        <div className="space-y-12 text-mist/80 text-sm leading-relaxed">
          {/* 01. Contratación y Reservas */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">01.</span>
              Políticas de Reserva, Depósitos y Emisión de Permisos
            </h2>
            <p>
              Toda solicitud de expedición se formaliza mediante la aceptación de la propuesta personalizada emitida por
              nuestro Concierge y el abono del depósito de confirmación:
            </p>
            <ul className="list-disc list-inside space-y-2 text-xs text-mist/85 pl-2">
              <li>
                <strong>Depósito Inicial (50%):</strong> Requerido al momento de confirmar el itinerario para la emisión
                inmediata de boletos de acceso arqueológico, permisos gubernamentales de senderos y bloqueo de lodges
                privados.
              </li>
              <li>
                <strong>Saldo Final (50%):</strong> Deberá ser cancelado como máximo treinta (30) días calendario antes
                de la fecha de inicio de la expedición.
              </li>
              <li>
                <strong>Carácter Nominal e Intransferible de Boletos (SERNANP / MINCUL):</strong> De acuerdo con las
                disposiciones vigentes del Ministerio de Cultura de la República del Perú y el SERNANP, los boletos de
                ingreso a la Llaqta de Machu Picchu y los permisos del Camino Inca son <em>estrictamente nominales,
                asociados al pasaporte del titular y no admiten cambio de fecha, endoso ni reembolso bajo ninguna
                circunstancia legal</em> una vez emitidos.
              </li>
            </ul>
          </section>

          {/* 02. Protocolo de Aclimatación y Bioseguridad */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">02.</span>
              Protocolo de Aclimatación, Salud y Asunción de Riesgos
            </h2>
            <p>
              El bienestar de nuestros huéspedes constituye la premisa inviolable de cada travesía:
            </p>
            <div className="p-4 rounded-xl bg-obsidian border border-gold/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gold font-sans font-semibold">
                <HeartPulse className="w-4 h-4" />
                Autoridad Médica del Guía WFR en Ruta
              </div>
              <p className="text-mist/80 leading-relaxed">
                Nuestros guías cuentan con certificación activa <em>Wilderness Medical First Responder (WFR)</em> y
                equipos de oximetría y oxígeno medicinal. El guía líder ostenta la facultad técnica y soberana de
                suspender, desviar o evacuar a cualquier expedicionario cuya saturación de oxígeno o sintomatología de
                mal agudo de montaña (soroche severo, sospecha de edema pulmonar o cerebral) ponga en peligro su vida.
                Dicha decisión es inapelable y prioriza la vida humana sobre la culminación del itinerario, no dando
                lugar a indemnización monetaria.
              </p>
            </div>
            <p className="text-xs text-mist/70 pt-1">
              Es responsabilidad del expedicionario informar con carácter de declaración jurada cualquier condición médica
              preexistente, medicación en curso o cirugías recientes en el cuestionario previo remitido por el Concierge.
            </p>
          </section>

          {/* 03. Fuerza Mayor Andina */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">03.</span>
              Cláusula de Fuerza Mayor & Contingencias Geográficas
            </h2>
            <p>
              En la cordillera de los Andes pueden presentarse eventos fortuitos fuera del control razonable de la
              agencia:
            </p>
            <div className="p-4 rounded-xl bg-obsidian border border-amber-500/30 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-sans font-semibold">
                <AlertTriangle className="w-4 h-4" />
                Definición de Supuestos Eximentes
              </div>
              <p className="text-mist/80 leading-relaxed">
                Se consideran causas de fuerza mayor o caso fortuito eximentes de responsabilidad civil y contractual:
                aluviones, huaicos, nevadas anómalas dictaminadas por SENAMHI, huelgas regionales, bloqueos de vías
                férreas por parte del consorcio concesionario (FETRANSA/PeruRail), disposiciones gubernamentales de cierre
                de santuarios o emergencias sanitarias declaradas por el Estado Peruano.
              </p>
              <p className="text-mist/80 leading-relaxed">
                En tales supuestos, <strong>{legal.legalName}</strong> activará de inmediato el Plan de Contingencia VIP,
                reorientando la ruta hacia circuitos alternativos seguros de confort equivalente. Los costos de los
                boletos oficiales no utilizados no serán reembolsables si el ente gubernamental emisor no prevé
                devolución dineraria.
              </p>
            </div>
          </section>

          {/* 04. Seguro de Viaje Obligatorio */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">04.</span>
              Obligatoriedad de Seguro Internacional de Asistencia Médica
            </h2>
            <p>
              Es requisito indispensable para participar en cualquier expedición que implique caminatas o ascensos sobre
              los 3,500 msnm que el expedicionario cuente con una póliza de seguro médico internacional vigente que cubra
              explícitamente:
            </p>
            <ul className="grid sm:grid-cols-3 gap-2.5 text-xs font-sans pt-1">
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 text-center">
                <CheckCircle2 className="w-4 h-4 text-gold mx-auto mb-1.5" />
                Evacuación Médica Andina
              </li>
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 text-center">
                <CheckCircle2 className="w-4 h-4 text-gold mx-auto mb-1.5" />
                Trekking sobre 4,500 msnm
              </li>
              <li className="p-3 rounded-lg bg-obsidian border border-white/10 text-center">
                <CheckCircle2 className="w-4 h-4 text-gold mx-auto mb-1.5" />
                Interrupción / Cancelación
              </li>
            </ul>
          </section>

          {/* 05. Cancelaciones y Desistimiento */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">05.</span>
              Políticas de Cancelación por Desistimiento del Cliente
            </h2>
            <p>
              En caso de desistimiento unilateral por parte del expedicionario, se aplicará la siguiente escala de
              penalidades en razón de los costos logísticos irreversibles devengados:
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-obsidian">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-white/5 border-b border-white/10 text-gold font-sans text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Antelación a la Salida</th>
                    <th className="p-3.5">Penalidad Administrativa</th>
                    <th className="p-3.5">Condición de Reembolso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans text-[11px]">
                  <tr>
                    <td className="p-3.5 text-white">Más de 45 días antes</td>
                    <td className="p-3.5 text-amber-400">20% del valor total</td>
                    <td className="p-3.5 font-sans text-mist/75">Reembolso del saldo menos gastos de boletos oficiales no reembolsables</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white">Entre 44 y 30 días antes</td>
                    <td className="p-3.5 text-amber-400">50% del valor total</td>
                    <td className="p-3.5 font-sans text-mist/75">Reembolso del 50% restante</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 text-white">Menos de 29 días antes o No-Show</td>
                    <td className="p-3.5 text-rose-400 font-bold">100% del valor total</td>
                    <td className="p-3.5 font-sans text-mist/75">Sin derecho a devolución dineraria (asistencia para cobro con su aseguradora)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 06. Jurisdicción y Resolución de Controversias */}
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-white flex items-center gap-2">
              <span className="text-gold font-sans text-sm">06.</span>
              Ley Aplicable y Sumisión Jurisdiccional
            </h2>
            <p>
              El presente contrato de servicios turísticos se rige por las leyes de la República del Perú. Para
              cualquier divergencia relativa a la validez, interpretación o cumplimiento del presente instrumento, las
              partes se someten expresamente a la competencia de los Jueces y Tribunales del Distrito Judicial del Cusco,
              o a los mecanismos de arbitraje de la Cámara de Comercio del Cusco, renunciando a cualquier otro fuero que
              pudiera corresponderles por razón de sus domicilios presentes o futuros.
            </p>
          </section>

          {/* Enlaces y Vínculos */}
          <section className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-mist/70">
              <ShieldAlert className="w-4 h-4 text-gold" />
              <span>Conforme al Código de Protección y Defensa del Consumidor (Ley Nº 29571)</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacidad" className="text-gold hover:underline font-sans">
                Política de Privacidad →
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

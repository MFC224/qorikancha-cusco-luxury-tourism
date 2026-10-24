'use client';

import React, { useState } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  Sparkles,
  Droplets,
  Flame,
  Stethoscope,
  Mountain,
} from 'lucide-react';

export default function AcclimatizationGuide() {
  const { acclimatizationProtocol } = cuscoConfig;
  const [selectedAltitude, setSelectedAltitude] = useState<number>(3399);

  // Estimación fisiológica de presión de oxígeno efectiva respecto al nivel del mar
  // Fórmula barométrica simplificada: P/P0 = e^(-h / 8400)
  const calculateEffectiveOxygen = (altitudeMeters: number) => {
    const seaLevelPressure = 100;
    const ratio = Math.exp(-altitudeMeters / 8400);
    return Math.round(seaLevelPressure * ratio);
  };

  const effectiveO2 = calculateEffectiveOxygen(selectedAltitude);

  const getAdvisoryText = (altitude: number) => {
    if (altitude <= 2500) {
      return {
        level: 'Zona de Confort Óptima',
        color: 'text-emerald-400',
        note: 'Ambiente de selva alta / ceja de montaña. Respiración natural sin fatiga. Ideal para pernoctar los primeros días.',
      };
    }
    if (altitude <= 3500) {
      return {
        level: 'Zona de Adaptación Moderada',
        color: 'text-gold',
        note: 'Cota de Cusco colonial. Se recomienda caminata pausada, ingesta continua de mate de muña y cena ligera rica en carbohidratos.',
      };
    }
    if (altitude <= 4200) {
      return {
        level: 'Zona Andina Alta',
        color: 'text-amber-400',
        note: 'Paso de Warmiwañusqa y mesetas. El ritmo de ascenso debe ser constante y sincronizado con respiración diafragmática profunda.',
      };
    }
    return {
      level: 'Zona Glacial Extrema (Puna)',
      color: 'text-red-400',
      note: 'Paso Salkantay (4,630m). Protocolo WFR activo: chequeo de saturometría en campamento y oxigenoterapia preventiva.',
    };
  };

  const advisory = getAdvisoryText(selectedAltitude);

  const altitudePresets = [
    { label: 'Aguas Calientes', alt: 2040 },
    { label: 'Valle Sagrado', alt: 2800 },
    { label: 'Cusco Histórico', alt: 3399 },
    { label: 'Chinchero', alt: 3762 },
    { label: 'Camino Inca', alt: 4215 },
    { label: 'Paso Salkantay', alt: 4630 },
  ];

  return (
    <section id="aclimatacion" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado Editorial */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// SEGURIDAD BIOLÓGICA & BIENESTAR'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              Prepara tu Cuerpo para la Altura
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Ascender a los Andes debe ser un renacer, no un padecimiento. Aplicamos medicina de montaña contemporánea y sabiduría herbolaria ancestral para garantizar tu aclimatación natural sin fricción.
            </p>
          </div>

          <div className="hud-badge text-gold self-start sm:self-end flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            WFR CERTIFIED EXPEDITIONS
          </div>
        </div>

        {/* Simulador Interactivo de Altitud & Presión de Oxígeno */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-obsidian-glow mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="lg:max-w-md">
              <span className="text-xs font-mono text-gold tracking-widest uppercase flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                SIMULADOR BIOLÓGICO DE ALTITUD
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-medium text-mist">
                ¿A cuántos metros viajarás?
              </h3>
              <p className="text-xs sm:text-sm text-mist/70 mt-2 font-sans leading-relaxed">
                Desplaza el selector para calcular la presión barométrica estimada y las pautas médicas para tu organismo.
              </p>

              {/* Botones de Selección Rápida */}
              <div className="flex flex-wrap gap-2 mt-6">
                {altitudePresets.map((preset) => (
                  <button
                    key={preset.alt}
                    type="button"
                    onClick={() => setSelectedAltitude(preset.alt)}
                    data-cursor={`${preset.alt}M`}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                      selectedAltitude === preset.alt
                        ? 'bg-gold text-obsidian font-semibold border-gold shadow-gold-glow'
                        : 'bg-obsidian-card/80 text-mist/70 border-white/10 hover:border-gold/40'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider de Altura y Panel de Telemetría Biológica */}
            <div className="flex-1 max-w-xl w-full p-6 rounded-2xl bg-obsidian-light/70 border border-gold/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-mist/60 flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-gold" /> COTA DE ELEVACIÓN
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-gold font-bold">
                  {selectedAltitude.toLocaleString()} <span className="text-sm font-mono font-normal text-mist/60">msnm</span>
                </span>
              </div>

              {/* Input Range Personalizado */}
              <input
                type="range"
                min="1800"
                max="5000"
                step="25"
                value={selectedAltitude}
                onChange={(e) => setSelectedAltitude(Number(e.target.value))}
                className="w-full h-2 bg-obsidian rounded-lg appearance-none cursor-pointer accent-gold my-4 border border-white/10"
              />

              <div className="flex justify-between text-[10px] font-mono text-mist/40 mb-6">
                <span>1,800m (Valle Bajo)</span>
                <span>3,400m (Cusco)</span>
                <span>5,000m (Puna Alta)</span>
              </div>

              {/* Tarjetas de Diagnóstico y O₂ */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-mist/50 block">OXÍGENO EFECTIVO ESTIMADO</span>
                  <span className="text-xl sm:text-2xl font-serif font-bold text-mist">
                    {effectiveO2}% <span className="text-xs font-mono font-normal text-mist/50">vs nivel del mar</span>
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-mist/50 block">ESTADO BIOLÓGICO</span>
                  <span className={`text-sm sm:text-base font-serif font-semibold ${advisory.color}`}>
                    {advisory.level}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs font-sans text-mist/80 leading-relaxed border-t border-white/5 pt-3">
                ✦ {advisory.note}
              </p>
            </div>
          </div>
        </div>

        {/* Las 3 Fases del Protocolo de Aclimatación */}
        <div className="mb-16">
          <div className="text-xs font-mono text-gold tracking-widest uppercase mb-6 flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            CRONOGRAMA DE ADAPTACIÓN BIOLÓGICA PASO A PASO
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {acclimatizationProtocol.map((rule, idx) => (
              <div
                key={idx}
                data-cursor="PROTOCOLO"
                className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/20 shadow-obsidian-glow flex flex-col justify-between glass-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                      FASE 0{idx + 1} · {rule.day}
                    </span>
                    <Stethoscope className="w-4 h-4 text-gold/80" />
                  </div>

                  <span className="hud-badge text-[10px] block mb-3 w-fit">
                    {rule.altitudeRange}
                  </span>

                  <h4 className="text-xl font-serif font-medium text-mist mb-3">
                    {rule.phase}
                  </h4>

                  <p className="text-xs sm:text-sm text-mist/75 font-sans leading-relaxed mb-6">
                    {rule.recommendation}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-[10px] font-mono text-gold/90 uppercase tracking-wider block mb-1">
                    Criterio Médico de Expedición
                  </span>
                  <p className="text-xs font-mono text-emerald-400/90 leading-relaxed">
                    {rule.medicalNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pilares Prácticos de Confort Andino */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gold/15">
          <div className="glass-card p-6 rounded-2xl border border-gold/15">
            <Droplets className="w-6 h-6 text-gold mb-3" />
            <h5 className="font-serif text-base text-mist font-semibold mb-2">Hidratación Alcalina Continua</h5>
            <p className="text-xs text-mist/70 leading-relaxed font-sans">
              El aire andino es seco. Beber 3 litros diarios de agua y sales minerales acelera la oxigenación de los tejidos musculares.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/15">
            <Flame className="w-6 h-6 text-gold mb-3" />
            <h5 className="font-serif text-base text-mist font-semibold mb-2">Alquimia Herbolaria Andina</h5>
            <p className="text-xs text-mist/70 leading-relaxed font-sans">
              El mate de coca matutino estimula la circulación coronaria; el de muña nocturno armoniza la digestión en cotas altas.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-gold/15">
            <ShieldCheck className="w-6 h-6 text-gold mb-3" />
            <h5 className="font-serif text-base text-mist font-semibold mb-2">Respaldo Médico 24/7</h5>
            <p className="text-xs text-mist/70 leading-relaxed font-sans">
              Cada expedicionario cuenta con oximetría diaria, concentradores de oxígeno en suites y médico disponible ante cualquier síntoma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

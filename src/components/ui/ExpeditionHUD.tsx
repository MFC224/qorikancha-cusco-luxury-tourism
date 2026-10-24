'use client';

import React, { useState, useEffect } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import { Compass, Mountain, Wind, Activity } from 'lucide-react';

interface ExpeditionHUDProps {
  className?: string;
  variant?: 'floating-bar' | 'compact-corner';
}

export default function ExpeditionHUD({
  className = '',
  variant = 'floating-bar',
}: ExpeditionHUDProps) {
  const { destination } = cuscoConfig;
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    // Reloj en tiempo real para Cusco (UTC-5 / PET)
    const updateTime = () => {
      const now = new Date();
      // Formato HH:MM:SS en hora de Perú
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Lima',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat('es-PE', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (variant === 'compact-corner') {
    return (
      <aside
        aria-label="Telemetría de Cusco"
        className={`glass-card rounded-2xl px-5 py-3 border border-gold/20 font-mono text-xs text-mist/80 shadow-obsidian-glow ${className}`}
      >
        <div className="flex items-center space-x-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-gold font-semibold">{destination.elevation.display}</span>
          <span className="text-mist/30">|</span>
          <span className="text-mist/70">{destination.coordinates.formatted}</span>
          {localTime && (
            <>
              <span className="text-mist/30">|</span>
              <span className="text-gold/90">{localTime} PET</span>
            </>
          )}
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Barra de Telemetría Andina"
      className={`glass-card rounded-2xl px-6 py-3 border border-gold/25 font-mono text-xs text-mist shadow-obsidian-glow backdrop-blur-xl ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
        {/* Estado Operativo & Altitud */}
        <div className="flex items-center space-x-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <Mountain className="w-3.5 h-3.5 text-gold shrink-0" />
          <div>
            <span className="text-[10px] text-mist/50 block leading-none">ALTITUD CUSCO</span>
            <span className="text-xs text-gold font-semibold">{destination.elevation.display}</span>
          </div>
        </div>

        {/* Coordenadas Geográficas */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <Compass className="w-3.5 h-3.5 text-gold shrink-0" />
          <div>
            <span className="text-[10px] text-mist/50 block leading-none">COORDENADAS</span>
            <span className="text-xs text-mist/85 font-mono">{destination.coordinates.formatted}</span>
          </div>
        </div>

        {/* Clima Andino & Presión */}
        <div className="hidden md:flex items-center space-x-2.5">
          <Wind className="w-3.5 h-3.5 text-gold shrink-0" />
          <div>
            <span className="text-[10px] text-mist/50 block leading-none">ATMÓSFERA</span>
            <span className="text-xs text-mist/85">Seco Estelar · 14°C</span>
          </div>
        </div>

        {/* Oximetría Recomendada */}
        <div className="hidden lg:flex items-center space-x-2.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <div>
            <span className="text-[10px] text-mist/50 block leading-none">SATURACIÓN O₂</span>
            <span className="text-xs text-emerald-400 font-semibold">94% Óptimo</span>
          </div>
        </div>

        {/* Hora Local en Vivo */}
        {localTime && (
          <div className="flex items-center space-x-2 pl-2 sm:border-l sm:border-white/10">
            <div>
              <span className="text-[10px] text-mist/50 block leading-none">HORA LOCAL</span>
              <span className="text-xs text-gold font-mono">{localTime} PET</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

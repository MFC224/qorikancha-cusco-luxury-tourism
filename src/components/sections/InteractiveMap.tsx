'use client';

import React, { useState } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  Compass,
  Mountain,
  Clock,
  Sparkles,
  Train,
  Car,
  Footprints,
} from 'lucide-react';

export default function InteractiveMap() {
  const { waypoints } = cuscoConfig;
  const [activeWaypointId, setActiveWaypointId] = useState<string>('machu-picchu-citadel');
  const [viewMode, setViewMode] = useState<'map' | 'profile'>('map');

  const activeWaypoint =
    waypoints.find((wp) => wp.id === activeWaypointId) || waypoints[0];

  // Coordenadas normalizadas para el SVG del mapa (X: 0..800, Y: 0..480)
  const waypointCoordinates: Record<string, { x: number; y: number }> = {
    'cusco-colonial': { x: 670, y: 370 },
    'chinchero-moray': { x: 520, y: 300 },
    'ollantaytambo': { x: 380, y: 230 },
    'aguas-calientes': { x: 250, y: 170 },
    'machu-picchu-citadel': { x: 190, y: 130 },
    'salkantay-pass': { x: 260, y: 380 },
    'vinicunca': { x: 730, y: 440 },
  };

  const getTravelIcon = (mode: string) => {
    if (mode.includes('Férrea')) return <Train className="w-3.5 h-3.5" />;
    if (mode.includes('Van')) return <Car className="w-3.5 h-3.5" />;
    return <Footprints className="w-3.5 h-3.5" />;
  };

  return (
    <section id="mapa" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// CARTOGRAFÍA SAGRADA'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-mist mt-3">
              Geografía & Altimetría de la Ruta
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
              Explora las cotas de altura, los valles interandinos y los tiempos de desplazamiento privado entre la capital imperial y la ciudadela incaica.
            </p>
          </div>

          {/* Selector de Modo: Mapa Vectorial vs. Perfil de Altimetría */}
          <div className="flex items-center space-x-2 bg-obsidian-card p-1.5 rounded-full border border-gold/25 self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              data-cursor="MAPA"
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wider transition-all ${
                viewMode === 'map'
                  ? 'bg-gold text-obsidian font-semibold shadow-gold-glow'
                  : 'text-mist/70 hover:text-gold'
              }`}
            >
              Mapa Vectorial
            </button>
            <button
              type="button"
              onClick={() => setViewMode('profile')}
              data-cursor="PERFIL"
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wider transition-all ${
                viewMode === 'profile'
                  ? 'bg-gold text-obsidian font-semibold shadow-gold-glow'
                  : 'text-mist/70 hover:text-gold'
              }`}
            >
              Perfil Altimétrico
            </button>
          </div>
        </div>

        {/* Contenedor Principal del Visor Cartográfico */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panel Izquierdo: Lienzo Interactivo SVG */}
          <div className="lg:col-span-8 glass-card rounded-3xl p-4 sm:p-6 border border-gold/25 relative overflow-hidden shadow-obsidian-glow min-h-[460px] flex flex-col justify-between">
            {/* HUD de Coordenadas en Esquina */}
            <div className="absolute top-6 left-6 z-10 flex items-center space-x-3 pointer-events-none">
              <div className="hud-badge bg-obsidian/85 backdrop-blur-md">
                13.16° S · 72.54° W
              </div>
              <span className="text-[11px] font-sans font-medium text-mist/50 hidden sm:inline uppercase tracking-wider">
                VALLE DEL URUBAMBA / VILCANOTA
              </span>
            </div>

            {viewMode === 'map' ? (
              /* MODO MAPA VECTORIAL CON TOPOGRAFÍA Y WAYPOINTS */
              <div className="relative w-full h-[400px] sm:h-[480px]">
                <svg
                  viewBox="0 0 800 480"
                  className="w-full h-full select-none"
                  aria-label="Mapa interactivo de la ruta sagrada"
                >
                  <defs>
                    {/* Gradiente para la línea de ruta sagrada */}
                    <linearGradient id="routeGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#C8A261" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#E0C28A" stopOpacity="1" />
                      <stop offset="100%" stopColor="#C8A261" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Resplandor de waypoints activos */}
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Curvas de Nivel Topográficas de Fondo (Andes) */}
                  <g opacity="0.12" stroke="#C8A261" fill="none" strokeWidth="1">
                    <path d="M 50 120 Q 200 40 400 130 T 750 100" />
                    <path d="M 30 180 Q 220 90 440 210 T 770 170" />
                    <path d="M 70 250 Q 250 160 480 270 T 780 230" />
                    <path d="M 40 320 Q 280 230 520 330 T 760 300" />
                    <path d="M 60 400 Q 300 310 560 410 T 790 380" />
                  </g>

                  {/* Río Sagrado Vilcanota (Línea sinuosa de agua) */}
                  <path
                    d="M 720 420 Q 600 350 490 290 T 360 220 T 230 160 T 150 110"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.12)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 720 420 Q 600 350 490 290 T 360 220 T 230 160 T 150 110"
                    fill="none"
                    stroke="rgba(200, 162, 97, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                  />

                  {/* Ruta Principal Inca (Camino Dorado) */}
                  {/* Cusco -> Chinchero -> Ollantaytambo -> Aguas Calientes -> Machu Picchu */}
                  <path
                    d="M 670 370 L 520 300 L 380 230 L 250 170 L 190 130"
                    fill="none"
                    stroke="url(#routeGoldGradient)"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="animate-pulse"
                  />

                  {/* Ramal a Salkantay (Sendero de Alta Montaña) */}
                  <path
                    d="M 380 230 L 260 380"
                    fill="none"
                    stroke="#C8A261"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />

                  {/* Ramal hacia Vinicunca */}
                  <path
                    d="M 670 370 L 730 440"
                    fill="none"
                    stroke="#C8A261"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />

                  {/* Nodos / Waypoints */}
                  {waypoints.map((wp) => {
                    const coords = waypointCoordinates[wp.id] || { x: 400, y: 240 };
                    const isActive = wp.id === activeWaypointId;

                    return (
                      <g
                        key={wp.id}
                        className="cursor-pointer transition-transform duration-300"
                        onClick={() => setActiveWaypointId(wp.id)}
                      >
                        {/* Radar Pulse si está activo */}
                        {isActive && (
                          <>
                            <circle
                              cx={coords.x}
                              cy={coords.y}
                              r="22"
                              fill="none"
                              stroke="#C8A261"
                              strokeWidth="1.5"
                              opacity="0.6"
                              className="animate-ping"
                              style={{ transformOrigin: `${coords.x}px ${coords.y}px` }}
                            />
                            <circle
                              cx={coords.x}
                              cy={coords.y}
                              r="16"
                              fill="rgba(200, 162, 97, 0.25)"
                            />
                          </>
                        )}

                        {/* Anillo exterior */}
                        <circle
                          cx={coords.x}
                          cy={coords.y}
                          r={isActive ? 9 : 6}
                          fill={isActive ? '#C8A261' : '#121517'}
                          stroke={isActive ? '#FFFFFF' : '#C8A261'}
                          strokeWidth={isActive ? '2.5' : '1.5'}
                          filter={isActive ? 'url(#goldGlow)' : undefined}
                        />

                        {/* Etiqueta flotante SVG */}
                        <text
                          x={coords.x}
                          y={coords.y - 14}
                          textAnchor="middle"
                          className={`font-sans text-[11px] font-semibold transition-all ${
                            isActive
                              ? 'fill-[#F4F4F0] font-bold text-xs'
                              : 'fill-[#C8A261]/80 hover:fill-white text-[10px]'
                          }`}
                        >
                          {wp.name}
                        </text>
                        <text
                          x={coords.x}
                          y={coords.y + 20}
                          textAnchor="middle"
                          className="font-sans text-[9px] font-medium fill-[#9CA3AF] pointer-events-none tracking-wider"
                        >
                          {wp.elevationDisplay}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Leyenda en el fondo del mapa */}
                <div className="absolute bottom-2 left-4 right-4 flex flex-wrap items-center justify-between text-[11px] font-sans font-medium text-mist/60 pt-2 border-t border-white/5 uppercase tracking-wider">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <span className="w-3 h-0.5 bg-gold mr-1.5" /> Vía Principal
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-0.5 bg-white/40 mr-1.5" /> Río Vilcanota
                    </span>
                  </div>
                  <span>Toca cualquier punto para consultar detalles ↗</span>
                </div>
              </div>
            ) : (
              /* MODO PERFIL ALTIMÉTRICO (Diagrama de elevación SVG) */
              <div className="relative w-full h-[400px] sm:h-[480px] p-2 flex flex-col justify-between">
                <div className="text-xs font-sans font-medium text-gold flex items-center justify-between pb-2 border-b border-white/5 uppercase tracking-wider">
                  <span>PERFIL DE ASCENSO Y DESCENSO EN METROS (MSNM)</span>
                  <span className="text-mist/50">Cotas Extremas: 2,040m — 5,036m</span>
                </div>

                <div className="flex-1 my-4 relative">
                  <svg
                    viewBox="0 0 760 300"
                    className="w-full h-full select-none"
                    aria-label="Perfil altimétrico de la ruta"
                  >
                    <defs>
                      <linearGradient id="elevationAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#C8A261" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#C8A261" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Guías Horizontales de Altura */}
                    <g stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="3 3">
                      <line x1="50" y1="30" x2="740" y2="30" />
                      <line x1="50" y1="100" x2="740" y2="100" />
                      <line x1="50" y1="170" x2="740" y2="170" />
                      <line x1="50" y1="240" x2="740" y2="240" />
                    </g>

                    <text x="10" y="35" className="font-sans font-medium text-[10px] fill-[#C8A261]">4,630m</text>
                    <text x="10" y="105" className="font-sans font-medium text-[10px] fill-[#9CA3AF]">3,800m</text>
                    <text x="10" y="175" className="font-sans font-medium text-[10px] fill-[#9CA3AF]">3,000m</text>
                    <text x="10" y="245" className="font-sans font-medium text-[10px] fill-[#9CA3AF]">2,000m</text>

                    {/* Área sombreada del relieve */}
                    {/* Coordenadas normalizadas de perfil altimétrico:
                        1. Cusco (3,399m) -> X: 80, Y: 135
                        2. Chinchero (3,762m) -> X: 200, Y: 105
                        3. Ollanta (2,792m) -> X: 340, Y: 185
                        4. Aguas Calientes (2,040m) -> X: 470, Y: 238
                        5. Machu Picchu (2,430m) -> X: 590, Y: 210
                        6. Salkantay (4,630m) -> X: 710, Y: 30
                    */}
                    <polygon
                      points="80,135 200,105 340,185 470,238 590,210 710,30 710,260 80,260"
                      fill="url(#elevationAreaGradient)"
                    />

                    {/* Línea de Perfil de Elevación */}
                    <polyline
                      points="80,135 200,105 340,185 470,238 590,210 710,30"
                      fill="none"
                      stroke="#C8A261"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Puntos y etiquetas interactivas */}
                    {[
                      { id: 'cusco-colonial', name: 'Cusco', alt: '3,399m', x: 80, y: 135 },
                      { id: 'chinchero-moray', name: 'Chinchero', alt: '3,762m', x: 200, y: 105 },
                      { id: 'ollantaytambo', name: 'Ollantaytambo', alt: '2,792m', x: 340, y: 185 },
                      { id: 'aguas-calientes', name: 'Aguas Calientes', alt: '2,040m', x: 470, y: 238 },
                      { id: 'machu-picchu-citadel', name: 'Machu Picchu', alt: '2,430m', x: 590, y: 210 },
                      { id: 'salkantay-pass', name: 'Salkantay', alt: '4,630m', x: 710, y: 30 },
                    ].map((pt) => {
                      const isActive = pt.id === activeWaypointId;
                      return (
                        <g
                          key={pt.id}
                          className="cursor-pointer"
                          onClick={() => setActiveWaypointId(pt.id)}
                        >
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isActive ? 8 : 5}
                            fill={isActive ? '#FFFFFF' : '#C8A261'}
                            stroke="#08090A"
                            strokeWidth="2"
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 12}
                            textAnchor="middle"
                            className={`font-sans ${
                              isActive
                                ? 'fill-[#FFFFFF] font-bold text-xs'
                                : 'fill-[#C8A261] text-[10px]'
                            }`}
                          >
                            {pt.name}
                          </text>
                          <text
                            x={pt.x}
                            y={pt.y + 18}
                            textAnchor="middle"
                            className="font-sans text-[9px] font-medium fill-[#9CA3AF]"
                          >
                            {pt.alt}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="text-[11px] font-sans font-medium text-mist/50 text-right uppercase tracking-wider">
                  ✦ El descenso a Ollantaytambo y Aguas Calientes alivia notablemente la presión atmosférica
                </div>
              </div>
            )}
          </div>

          {/* Panel Derecho: Ficha Dinámica del Waypoint Seleccionado */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-obsidian-glow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="hud-badge flex items-center gap-1.5">
                    {getTravelIcon(activeWaypoint.travelMode)}
                    {activeWaypoint.travelMode}
                  </span>
                  <span className="text-xs font-sans text-gold font-bold tracking-wider">
                    {activeWaypoint.elevationDisplay}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-mist">
                  {activeWaypoint.name}
                </h3>
                {activeWaypoint.quechuaName && (
                  <span className="text-xs font-sans text-gold/90 block mb-3 tracking-wide">
                    Nombre Ancestral: &ldquo;{activeWaypoint.quechuaName}&rdquo;
                  </span>
                )}

                <p className="text-sm text-mist/80 font-sans leading-relaxed mb-6">
                  {activeWaypoint.description}
                </p>

                <div className="p-4 rounded-2xl bg-obsidian-light/60 border border-gold/15 mb-6">
                  <span className="text-[10px] font-sans font-medium text-gold tracking-widest uppercase block mb-1">
                    HITO CLAVE DE LA EXPEDICIÓN
                  </span>
                  <p className="text-xs text-mist/90 font-medium">
                    {activeWaypoint.highlight}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-sans">
                <div className="flex items-center justify-between text-mist/70">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" /> Tiempo Estimado
                  </span>
                  <span className="text-mist font-semibold">{activeWaypoint.estimatedTransitTime}</span>
                </div>

                <div className="flex items-center justify-between text-mist/70">
                  <span className="flex items-center gap-1.5">
                    <Mountain className="w-3.5 h-3.5 text-gold" /> Altitud Absoluta
                  </span>
                  <span className="text-gold font-semibold">{activeWaypoint.elevationMeters} msnm</span>
                </div>

                <div className="flex items-center justify-between text-mist/70">
                  <span className="flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-gold" /> Coordenadas GPS
                  </span>
                  <span className="text-mist/90">{activeWaypoint.coordinates.lat.toFixed(4)}°, {activeWaypoint.coordinates.lng.toFixed(4)}°</span>
                </div>
              </div>
            </div>

            {/* Selector Rápido de Todos los Waypoints */}
            <div className="grid grid-cols-2 gap-2">
              {waypoints.map((wp) => (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => setActiveWaypointId(wp.id)}
                  data-cursor={wp.name.split(' ')[0].toUpperCase()}
                  className={`p-3 rounded-2xl text-left text-xs font-sans transition-all border ${
                    wp.id === activeWaypointId
                      ? 'bg-gold/20 border-gold text-mist font-semibold shadow-gold-glow'
                      : 'bg-obsidian-card/70 border-white/5 text-mist/60 hover:border-gold/30 hover:text-mist'
                  }`}
                >
                  <span className="block truncate font-medium">{wp.name}</span>
                  <span className="text-[10px] text-gold/80 block mt-0.5 tracking-wider">{wp.elevationDisplay}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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

  // Coordenadas proyectadas a escala geográfica real (ViewBox 0 0 860 520)
  // Orientación cartográfica: Norte ARRIBA, Sur ABAJO, Oeste IZQUIERDA, Este DERECHA.
  // Preserva el corredor real Noroeste (Machu Picchu) -> Central (Valle Sagrado y Cusco) -> Sureste (Vinicunca & Ausangate).
  const waypointCoordinates: Record<
    string,
    {
      x: number;
      y: number;
      labelX: number;
      labelY: number;
      anchor: 'start' | 'middle' | 'end';
      sector: string;
    }
  > = {
    'machu-picchu-citadel': {
      x: 130,
      y: 86,
      labelX: 130,
      labelY: 66,
      anchor: 'middle',
      sector: 'SANTUARIO HISTÓRICO · 2,430 MSNM',
    },
    'aguas-calientes': {
      x: 175,
      y: 118,
      labelX: 192,
      labelY: 122,
      anchor: 'start',
      sector: 'CAÑÓN DEL VILCANOTA · 2,040 MSNM',
    },
    'salkantay-pass': {
      x: 130,
      y: 230,
      labelX: 130,
      labelY: 254,
      anchor: 'middle',
      sector: 'CORDILLERA VILCABAMBA · APU SALKANTAY',
    },
    'ollantaytambo': {
      x: 275,
      y: 155,
      labelX: 275,
      labelY: 178,
      anchor: 'middle',
      sector: 'VALLE SAGRADO · FORTALEZA VIVIENTE',
    },
    'chinchero-moray': {
      x: 375,
      y: 220,
      labelX: 375,
      labelY: 200,
      anchor: 'middle',
      sector: 'MESETA ANDINA · ARTE TEXTIL & MORAY',
    },
    'cusco-colonial': {
      x: 445,
      y: 285,
      labelX: 445,
      labelY: 308,
      anchor: 'middle',
      sector: 'VALLE DEL HUATANAY · CAPITAL IMPERIAL',
    },
    'vinicunca': {
      x: 735,
      y: 440,
      labelX: 720,
      labelY: 422,
      anchor: 'end',
      sector: 'CORDILLERA VILCANOTA · APU AUSANGATE',
    },
  };

  const currentConfig = waypointCoordinates[activeWaypoint.id];

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
              Cartografía a escala real del departamento de Cusco: desde la cota tropical del cañón de Machu Picchu hasta los glaciares del Salkantay y la cumbre mineral del Ausangate.
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
              Mapa a Escala Real
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
          <div className="lg:col-span-8 glass-card rounded-3xl p-4 sm:p-6 border border-gold/25 relative overflow-hidden shadow-obsidian-glow min-h-[480px] flex flex-col justify-between">
            {/* HUD de Coordenadas Dinámico en Esquina */}
            <div className="absolute top-6 left-6 z-10 flex items-center space-x-3 pointer-events-none">
              <div className="hud-badge bg-obsidian/90 backdrop-blur-md text-gold border border-gold/30">
                {Math.abs(activeWaypoint.coordinates.lat).toFixed(4)}° S · {Math.abs(activeWaypoint.coordinates.lng).toFixed(4)}° W
              </div>
              <span className="text-[11px] font-sans font-medium text-mist/70 hidden sm:inline uppercase tracking-wider">
                {currentConfig?.sector || 'DEPARTAMENTO DE CUSCO, PERÚ'}
              </span>
            </div>

            {viewMode === 'map' ? (
              /* MODO MAPA VECTORIAL A ESCALA REAL */
              <div className="relative w-full h-[420px] sm:h-[500px]">
                <svg
                  viewBox="0 0 860 520"
                  className="w-full h-full select-none"
                  aria-label="Mapa cartográfico a escala real de Cusco y el Valle Sagrado"
                >
                  <defs>
                    {/* Gradiente para la línea de ruta sagrada */}
                    <linearGradient id="routeGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C8A261" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#E0C28A" stopOpacity="1" />
                      <stop offset="100%" stopColor="#C8A261" stopOpacity="0.9" />
                    </linearGradient>

                    {/* Gradiente para el Río Vilcanota */}
                    <linearGradient id="riverGradient" x1="100%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
                      <stop offset="60%" stopColor="#0284c7" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.8" />
                    </linearGradient>

                    {/* Resplandor de waypoints activos */}
                    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Cuadrícula Cartográfica de Coordenadas Lat/Lng */}
                  <g stroke="#8C6527" strokeOpacity="0.08" className="dark:stroke-white/5" strokeWidth="0.8">
                    <line x1="80" y1="40" x2="80" y2="480" strokeDasharray="3 3" />
                    <line x1="280" y1="40" x2="280" y2="480" strokeDasharray="3 3" />
                    <line x1="480" y1="40" x2="480" y2="480" strokeDasharray="3 3" />
                    <line x1="680" y1="40" x2="680" y2="480" strokeDasharray="3 3" />

                    <line x1="40" y1="100" x2="820" y2="100" strokeDasharray="3 3" />
                    <line x1="40" y1="200" x2="820" y2="200" strokeDasharray="3 3" />
                    <line x1="40" y1="300" x2="820" y2="300" strokeDasharray="3 3" />
                    <line x1="40" y1="400" x2="820" y2="400" strokeDasharray="3 3" />
                  </g>

                  {/* Relieve Topográfico y Cordilleras Andinas (Curvas de Nivel) */}
                  <g opacity="0.14" stroke="#8C6527" className="dark:stroke-[#C8A261] dark:opacity-10" fill="none" strokeWidth="1">
                    {/* Cordillera de Vilcabamba (Noroeste & Oeste) */}
                    <path d="M 60 70 Q 140 30 220 80 T 300 130" />
                    <path d="M 50 140 Q 130 90 200 150 T 260 210" />
                    <path d="M 70 210 Q 140 180 190 250 T 240 320" />
                    <path d="M 60 280 Q 130 260 170 330 T 220 400" />

                    {/* Valle del Vilcanota & Cuenca de Anta */}
                    <path d="M 280 180 Q 360 230 430 260 T 520 290" />
                    <path d="M 320 150 Q 400 200 480 230 T 570 270" />

                    {/* Cordillera del Vilcanota (Sureste / Ausangate) */}
                    <path d="M 540 340 Q 640 380 730 410 T 820 440" />
                    <path d="M 580 370 Q 670 410 750 440 T 830 470" />
                    <path d="M 620 400 Q 700 440 770 470 T 840 500" />
                  </g>

                  {/* Apus y Picos Glaciares Tutelares */}
                  {/* Apu Salkantay (6,271m) */}
                  <g transform="translate(90, 215)" opacity="0.9">
                    <polygon points="12,-10 24,10 0,10" className="stroke-[#8C6527] dark:stroke-white fill-[#8C6527]/10 dark:fill-white/10" strokeWidth="1.2" />
                    <polygon points="12,-10 16,-2 8,-2" className="fill-[#8C6527] dark:fill-white" opacity="0.9" />
                    <text x="12" y="21" textAnchor="middle" className="font-sans text-[8.5px] font-bold fill-[#1E2224] dark:fill-white/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-none">
                      Apu Salkantay
                    </text>
                    <text x="12" y="30" textAnchor="middle" className="font-sans text-[7.5px] font-mono font-bold fill-[#8C6527] dark:fill-gold">
                      6,271m
                    </text>
                  </g>

                  {/* Apu Veronica / Wakaywillque (5,893m) */}
                  <g transform="translate(235, 75)" opacity="0.9">
                    <polygon points="12,-10 24,10 0,10" className="stroke-[#8C6527] dark:stroke-white fill-[#8C6527]/10 dark:fill-white/10" strokeWidth="1.2" />
                    <polygon points="12,-10 16,-2 8,-2" className="fill-[#8C6527] dark:fill-white" opacity="0.9" />
                    <text x="12" y="21" textAnchor="middle" className="font-sans text-[8.5px] font-bold fill-[#1E2224] dark:fill-white/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-none">
                      Apu Veronica
                    </text>
                    <text x="12" y="30" textAnchor="middle" className="font-sans text-[7.5px] font-mono font-bold fill-[#8C6527] dark:fill-gold">
                      5,893m
                    </text>
                  </g>

                  {/* Apu Ausangate (6,384m) */}
                  <g transform="translate(775, 450)" opacity="0.9">
                    <polygon points="12,-10 24,10 0,10" className="stroke-[#8C6527] dark:stroke-white fill-[#8C6527]/10 dark:fill-white/10" strokeWidth="1.2" />
                    <polygon points="12,-10 16,-2 8,-2" className="fill-[#8C6527] dark:fill-white" opacity="0.9" />
                    <text x="12" y="21" textAnchor="middle" className="font-sans text-[8.5px] font-bold fill-[#1E2224] dark:fill-white/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-none">
                      Apu Ausangate
                    </text>
                    <text x="12" y="30" textAnchor="middle" className="font-sans text-[7.5px] font-mono font-bold fill-[#8C6527] dark:fill-gold">
                      6,384m
                    </text>
                  </g>

                  {/* Río Sagrado Vilcanota / Urubamba (Curso Hidrográfico Real) */}
                  {/* Nace en glaciares del SE, fluye al NO por el Valle Sagrado y rodea Machu Picchu */}
                  <path
                    d="M 780 490 Q 680 430 570 350 T 465 270 Q 380 185 275 155 Q 220 135 175 118 Q 148 102 125 65 Q 110 35 100 15"
                    fill="none"
                    stroke="url(#riverGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 780 490 Q 680 430 570 350 T 465 270 Q 380 185 275 155 Q 220 135 175 118 Q 148 102 125 65 Q 110 35 100 15"
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="1.2"
                    strokeDasharray="8 6"
                    opacity="0.7"
                  />

                  {/* RED DE TRANSPORTE Y SENDEROS A ESCALA REAL */}

                  {/* 1. Carretera Asfaltada / Van 4x4 Privada */}
                  {/* Cusco -> Chinchero -> Ollantaytambo */}
                  <path
                    d="M 445 285 Q 410 245 375 220 Q 320 185 275 155"
                    fill="none"
                    stroke="url(#routeGoldGradient)"
                    strokeWidth="3"
                  />

                  {/* Cusco -> Cusipata / Vinicunca (Carretera al Sur Andino) */}
                  <path
                    d="M 445 285 Q 560 350 635 390 L 735 440"
                    fill="none"
                    stroke="url(#routeGoldGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />

                  {/* 2. Vía Férrea Escénica (Tren Hiram Bingham / Vistadome) */}
                  {/* Ollantaytambo -> Cañón del Vilcanota -> Aguas Calientes */}
                  <path
                    d="M 275 155 Q 220 135 175 118"
                    fill="none"
                    stroke="#8C6527"
                    className="dark:stroke-[#E0C28A]"
                    strokeWidth="3.5"
                    strokeDasharray="4 4"
                  />

                  {/* 3. Sendero Hiram Bingham / Ascenso a Machu Picchu */}
                  <path
                    d="M 175 118 Q 150 102 130 86"
                    fill="none"
                    stroke="#121517"
                    className="dark:stroke-white"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                  />

                  {/* 4. Travesía de Alta Montaña Salkantay Trek */}
                  {/* Paso Salkantay (4,630m) -> Descenso a Aguas Calientes */}
                  <path
                    d="M 130 230 Q 150 170 175 118"
                    fill="none"
                    stroke="#8C6527"
                    className="dark:stroke-[#C8A261]"
                    strokeWidth="1.8"
                    strokeDasharray="4 4"
                    opacity="0.75"
                  />

                  {/* Rosa de los Vientos (Orientación Cartográfica Real: Norte Arriba) */}
                  <g transform="translate(800, 70)" opacity="0.9">
                    <circle cx="0" cy="0" r="22" className="fill-[#F5F2EB] dark:fill-[#08090A] stroke-[#8C6527] dark:stroke-[#C8A261]" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
                    <circle cx="0" cy="0" r="16" fill="none" className="stroke-[#8C6527] dark:stroke-[#C8A261]" strokeWidth="0.8" opacity="0.8" />
                    {/* Flecha Norte */}
                    <polygon points="0,-16 3.5,-3 0,0" fill="#E0C28A" />
                    <polygon points="0,-16 -3.5,-3 0,0" fill="#9A7736" />
                    {/* Flecha Sur */}
                    <polygon points="0,16 3.5,3 0,0" fill="#9A7736" />
                    <polygon points="0,16 -3.5,3 0,0" fill="#C8A261" />
                    {/* Flecha Este */}
                    <polygon points="16,0 3,3.5 0,0" fill="#C8A261" />
                    <polygon points="16,0 3,-3.5 0,0" fill="#9A7736" />
                    {/* Flecha Oeste */}
                    <polygon points="-16,0 -3,3.5 0,0" fill="#9A7736" />
                    <polygon points="-16,0 -3,-3.5 0,0" fill="#C8A261" />
                    <text x="0" y="-20" textAnchor="middle" className="font-serif text-[10px] font-bold fill-[#8C6527] dark:fill-[#E0C28A]">N</text>
                    <text x="0" y="27" textAnchor="middle" className="font-serif text-[8px] font-bold fill-[#8C6527]/80 dark:fill-[#C8A261]/70">S</text>
                    <text x="25" y="3" textAnchor="middle" className="font-serif text-[8px] font-bold fill-[#8C6527]/80 dark:fill-[#C8A261]/70">E</text>
                    <text x="-25" y="3" textAnchor="middle" className="font-serif text-[8px] font-bold fill-[#8C6527]/80 dark:fill-[#C8A261]/70">W</text>
                  </g>

                  {/* Escala Gráfica Real (Aprox. 1:500,000) */}
                  <g transform="translate(45, 485)" opacity="0.9">
                    <line x1="0" y1="0" x2="100" y2="0" className="stroke-[#8C6527] dark:stroke-[#C8A261]" strokeWidth="2" />
                    <line x1="0" y1="-4" x2="0" y2="4" className="stroke-[#8C6527] dark:stroke-[#C8A261]" strokeWidth="2" />
                    <line x1="50" y1="-3" x2="50" y2="3" className="stroke-[#8C6527] dark:stroke-[#C8A261]" strokeWidth="1.5" />
                    <line x1="100" y1="-4" x2="100" y2="4" className="stroke-[#8C6527] dark:stroke-[#C8A261]" strokeWidth="2" />
                    <text x="0" y="-7" textAnchor="middle" className="font-sans text-[8.5px] font-bold fill-[#1E2224] dark:fill-[#C8A261]">0</text>
                    <text x="50" y="-7" textAnchor="middle" className="font-sans text-[8.5px] font-bold fill-[#1E2224] dark:fill-[#C8A261]">25 km</text>
                    <text x="100" y="-7" textAnchor="middle" className="font-sans text-[8.5px] font-bold fill-[#1E2224] dark:fill-[#C8A261]">50 km</text>
                    <text x="50" y="14" textAnchor="middle" className="font-sans text-[8px] tracking-wider uppercase font-semibold fill-[#57534E] dark:fill-mist/40">
                      Escala Real Aprox.
                    </text>
                  </g>

                  {/* Nodos / Waypoints Interactivos */}
                  {waypoints.map((wp) => {
                    const cfg = waypointCoordinates[wp.id] || {
                      x: 400,
                      y: 240,
                      labelX: 400,
                      labelY: 220,
                      anchor: 'middle',
                      sector: '',
                    };
                    const isActive = wp.id === activeWaypointId;

                    return (
                      <g
                        key={wp.id}
                        className="cursor-pointer group"
                        onClick={() => setActiveWaypointId(wp.id)}
                      >
                        {/* Zona táctil/clic ampliada invisible (56px) para clic cómodo y sin fallas */}
                        <circle
                          cx={cfg.x}
                          cy={cfg.y}
                          r="28"
                          fill="transparent"
                          className="cursor-pointer"
                        />

                        {/* Radar Pulse si está activo */}
                        {isActive && (
                          <>
                            <circle
                              cx={cfg.x}
                              cy={cfg.y}
                              r="22"
                              fill="none"
                              stroke="#C8A261"
                              strokeWidth="1.5"
                              opacity="0.6"
                              className="animate-ping"
                              style={{ transformOrigin: `${cfg.x}px ${cfg.y}px` }}
                            />
                            <circle
                              cx={cfg.x}
                              cy={cfg.y}
                              r="15"
                              fill="rgba(200, 162, 97, 0.25)"
                            />
                          </>
                        )}

                        {/* Anillo exterior - adaptativo en modo claro y oscuro */}
                        <circle
                          cx={cfg.x}
                          cy={cfg.y}
                          r={isActive ? 9.5 : 7}
                          className={`transition-colors duration-200 ${
                            isActive
                              ? 'fill-[#C8A261] stroke-[#121517] dark:stroke-white stroke-[2.5px]'
                              : 'fill-[#FAF8F5] dark:fill-[#08090A] stroke-[#8C6527] dark:stroke-[#C8A261] stroke-[2px] group-hover:fill-[#C8A261]'
                          }`}
                          filter={isActive ? 'url(#goldGlow)' : undefined}
                        />

                        {/* Etiqueta flotante SVG posicionada estratégicamente para cero colisiones */}
                        <text
                          x={cfg.labelX}
                          y={cfg.labelY}
                          textAnchor={cfg.anchor}
                          className={`font-sans select-none transition-colors duration-200 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                            isActive
                              ? 'fill-[#121517] dark:fill-white font-extrabold text-xs'
                              : 'fill-[#1E2224] dark:fill-[#E0C28A] group-hover:fill-[#8C6527] dark:group-hover:fill-white text-[10.5px] font-bold'
                          }`}
                        >
                          {wp.name}
                        </text>
                        <text
                          x={cfg.labelX}
                          y={cfg.labelY + 12}
                          textAnchor={cfg.anchor}
                          className="font-sans text-[9.5px] font-semibold fill-[#57534E] dark:fill-[#9CA3AF] pointer-events-none select-none tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                        >
                          {wp.elevationDisplay}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Leyenda en el fondo del mapa */}
                <div className="absolute bottom-2 left-4 right-4 flex flex-wrap items-center justify-between text-[11px] font-sans font-semibold text-[#1E2224] dark:text-mist/70 pt-2 border-t border-[#8C6527]/20 dark:border-white/5 uppercase tracking-wider">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center">
                      <span className="w-3 h-0.5 bg-[#8C6527] dark:bg-gold mr-1.5" /> Van Privada 4x4
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-0.5 bg-[#8C6527] dark:bg-gold-light border-b border-t border-black mr-1.5" /> Vía Férrea Escénica
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-0.5 bg-sky-500 mr-1.5" /> Río Vilcanota
                    </span>
                    <span className="flex items-center">
                      <span className="w-3 h-0.5 border-t border-dashed border-[#8C6527] dark:border-gold mr-1.5" /> Salkantay Trek
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8C6527] dark:text-gold/80 font-bold">Toca cualquier punto para consultar detalles ↗</span>
                </div>
              </div>
            ) : (
              /* MODO PERFIL ALTIMÉTRICO (Diagrama de elevación SVG) */
              <div className="relative w-full h-[420px] sm:h-[500px] p-2 flex flex-col justify-between">
                <div className="text-xs font-sans font-medium text-gold flex items-center justify-between pb-2 border-b border-white/5 uppercase tracking-wider">
                  <span>PERFIL DE ASCENSO Y DESCENSO EN METROS (MSNM)</span>
                  <span className="text-mist/50">Cotas Extremas: 2,040m — 5,036m</span>
                </div>

                <div className="flex-1 my-4 relative">
                  <svg
                    viewBox="0 0 780 320"
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
                      <line x1="50" y1="30" x2="760" y2="30" />
                      <line x1="50" y1="90" x2="760" y2="90" />
                      <line x1="50" y1="150" x2="760" y2="150" />
                      <line x1="50" y1="210" x2="760" y2="210" />
                      <line x1="50" y1="270" x2="760" y2="270" />
                    </g>

                    <text x="10" y="34" className="font-sans font-bold text-[10px] fill-[#8C6527] dark:fill-[#C8A261]">5,036m</text>
                    <text x="10" y="94" className="font-sans font-bold text-[10px] fill-[#8C6527]/90 dark:fill-[#C8A261]/80">4,630m</text>
                    <text x="10" y="154" className="font-sans font-semibold text-[10px] fill-[#57534E] dark:fill-[#9CA3AF]">3,800m</text>
                    <text x="10" y="214" className="font-sans font-semibold text-[10px] fill-[#57534E] dark:fill-[#9CA3AF]">3,000m</text>
                    <text x="10" y="274" className="font-sans font-semibold text-[10px] fill-[#57534E] dark:fill-[#9CA3AF]">2,000m</text>

                    {/* Área sombreada del relieve con los 7 puntos */}
                    <polygon
                      points="60,170 160,150 260,225 360,270 460,245 580,90 700,30 700,290 60,290"
                      fill="url(#elevationAreaGradient)"
                    />

                    {/* Línea de Perfil de Elevación */}
                    <polyline
                      points="60,170 160,150 260,225 360,270 460,245 580,90 700,30"
                      fill="none"
                      stroke="#C8A261"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Puntos y etiquetas interactivas */}
                    {[
                      { id: 'cusco-colonial', name: 'Cusco', alt: '3,399m', x: 60, y: 170 },
                      { id: 'chinchero-moray', name: 'Chinchero', alt: '3,762m', x: 160, y: 150 },
                      { id: 'ollantaytambo', name: 'Ollantaytambo', alt: '2,792m', x: 260, y: 225 },
                      { id: 'aguas-calientes', name: 'Aguas Calientes', alt: '2,040m', x: 360, y: 270 },
                      { id: 'machu-picchu-citadel', name: 'Machu Picchu', alt: '2,430m', x: 460, y: 245 },
                      { id: 'salkantay-pass', name: 'Salkantay', alt: '4,630m', x: 580, y: 90 },
                      { id: 'vinicunca', name: 'Vinicunca', alt: '5,036m', x: 700, y: 30 },
                    ].map((pt) => {
                      const isActive = pt.id === activeWaypointId;
                      return (
                        <g
                          key={pt.id}
                          className="cursor-pointer group"
                          onClick={() => setActiveWaypointId(pt.id)}
                        >
                          {/* Hit target invisible para clic confortable */}
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="24"
                            fill="transparent"
                            className="cursor-pointer"
                          />
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={isActive ? 8 : 5}
                            className={`transition-colors duration-200 ${
                              isActive
                                ? 'fill-[#C8A261] stroke-[#121517] dark:stroke-white stroke-2'
                                : 'fill-[#FAF8F5] dark:fill-[#08090A] stroke-[#8C6527] dark:stroke-[#C8A261] stroke-2 group-hover:fill-[#C8A261]'
                            }`}
                          />
                          <text
                            x={pt.x}
                            y={pt.y - 12}
                            textAnchor="middle"
                            className={`font-sans select-none transition-colors duration-200 drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] ${
                              isActive
                                ? 'fill-[#121517] dark:fill-white font-extrabold text-xs'
                                : 'fill-[#1E2224] dark:fill-[#E0C28A] text-[10.5px] font-bold group-hover:fill-[#8C6527] dark:group-hover:fill-white'
                            }`}
                          >
                            {pt.name}
                          </text>
                          <text
                            x={pt.x}
                            y={pt.y + 18}
                            textAnchor="middle"
                            className="font-sans text-[9px] font-semibold fill-[#57534E] dark:fill-[#9CA3AF] pointer-events-none select-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.95)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                          >
                            {pt.alt}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="text-[11px] font-sans font-medium text-mist/50 text-right uppercase tracking-wider">
                  ✦ El descenso al Valle Sagrado (2,792m - 2,870m) optimiza la aclimatación fisiológica antes de ascender a cotas superiores.
                </div>
              </div>
            )}
          </div>

          {/* Panel Derecho: Ficha Dinámica del Waypoint Seleccionado */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-card rounded-3xl p-6 sm:p-7 border border-gold/30 shadow-obsidian-glow flex flex-col justify-between overflow-hidden">
              <div>
                {/* Imagen Referencial Icónica del Destino Seleccionado */}
                {activeWaypoint.image && (
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-5 border border-gold/30 shadow-md group">
                    <Image
                      src={activeWaypoint.image}
                      alt={activeWaypoint.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 saturate-[1.08] contrast-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                    {/* Gradiente cinemático oscuro que mantiene los colores 100% vivos en blanco y negro */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Badges superiores sobre la imagen */}
                    <div className="absolute top-3 left-3">
                      <span className="hud-badge flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-xs font-sans border border-[#C8A261]/40 shadow-sm text-[#E0C28A]">
                        {getTravelIcon(activeWaypoint.travelMode)}
                        {activeWaypoint.travelMode}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[11px] font-sans text-white font-bold tracking-wider bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-sm">
                        {activeWaypoint.elevationDisplay}
                      </span>
                    </div>

                    {/* Nombre Ancestral en la base de la imagen */}
                    {activeWaypoint.quechuaName && (
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-sans text-[#E0C28A] font-semibold drop-shadow-md">
                        <span className="truncate">✦ &ldquo;{activeWaypoint.quechuaName}&rdquo;</span>
                        <span className="text-[10px] text-white/90 font-mono">{activeWaypoint.elevationMeters}m</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl sm:text-3xl font-serif font-medium text-mist">
                    {activeWaypoint.name}
                  </h3>
                  {!activeWaypoint.image && (
                    <span className="hud-badge flex items-center gap-1.5">
                      {getTravelIcon(activeWaypoint.travelMode)}
                      {activeWaypoint.travelMode}
                    </span>
                  )}
                </div>

                <p className="text-sm text-mist/80 font-sans leading-relaxed mb-5">
                  {activeWaypoint.description}
                </p>

                <div className="p-4 rounded-2xl bg-obsidian-light/60 border border-gold/15 mb-5">
                  <span className="text-[10px] font-sans font-medium text-gold tracking-widest uppercase block mb-1">
                    HITO CLAVE DE LA EXPEDICIÓN
                  </span>
                  <p className="text-xs text-mist/90 font-medium">
                    {activeWaypoint.highlight}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs font-sans">
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
                  <span className="text-mist/90 font-mono text-[11px]">{activeWaypoint.coordinates.lat.toFixed(4)}°, {activeWaypoint.coordinates.lng.toFixed(4)}°</span>
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
                  className={`p-3 rounded-2xl text-left text-xs font-sans transition-all border cursor-pointer ${
                    wp.id === activeWaypointId
                      ? 'bg-gold/20 border-gold text-mist font-semibold shadow-gold-glow ring-1 ring-gold/40'
                      : 'bg-obsidian-card/70 border-white/5 text-mist/60 hover:border-gold/30 hover:text-mist hover:bg-gold/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-2 h-2 rounded-full ${wp.id === activeWaypointId ? 'bg-gold animate-pulse' : 'bg-mist/30'}`} />
                    <span className="text-[10px] text-gold/80 font-mono tracking-wider">{wp.elevationDisplay}</span>
                  </div>
                  <span className="block truncate font-medium text-mist">{wp.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

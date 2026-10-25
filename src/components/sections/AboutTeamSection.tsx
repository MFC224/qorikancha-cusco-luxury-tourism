'use client';

import React from 'react';
import Image from 'next/image';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  Sparkles,
  Users,
  CheckCircle2,
} from 'lucide-react';

export default function AboutTeamSection() {
  const { legal } = cuscoConfig;

  const teamMembers = [
    {
      name: 'Mateo Huamán Ccoya',
      role: 'Director de Expedición & Arqueólogo Principal',
      credentials: 'UNSAAC · Colegiatura Arqueológica Nº 0418',
      bio: 'Cusqueño con más de 16 años liderando investigaciones sobre arqueoastronomía incaica en el Valle Sagrado, Moray y Qorikancha. Diseña cada travesía con rigor científico y reverencia cultural.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Dra. Sofía Valdivia Mendoza',
      role: 'Directora de Medicina de Altura & Seguridad WFR',
      credentials: 'Wilderness Medical Society · Especialista en Hipoxia',
      bio: 'Médica cusqueña encargada de la telemetría biológica, oxigenoterapia de respaldo y protocolos de aclimatación escalonada que garantizan bienestar pleno sin síntomas de soroche.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Comunidades de Huilloc & Chillca',
      role: 'Alianza de Porteadores de Honor & Arrieros',
      credentials: 'Convenio Comunitario de Trato Digno · Ley Nº 31614',
      bio: 'Maestros quechuas de alta montaña de Ollantaytambo y Ausangate. Reciben contratos formales, carpas térmicas propias, seguro de accidentes y remuneración 40% superior al estándar legal.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const credentials = [
    {
      label: 'DIRCETUR CUSCO',
      value: legal.dirceturRegistration,
      detail: 'Operador Receptivo Oficial Homologado por el Gobierno Regional',
    },
    {
      label: 'MINCETUR PERÚ',
      value: legal.minceturRegistration || 'MINCETUR Nº 2024-CUS-089',
      detail: 'Agencia de Viajes y Turismo Calificada en Turismo de Alta Gama',
    },
    {
      label: 'SEGURO DE EXPEDICIÓN',
      value: legal.civilInsurancePolicy || 'Pacífico Seguros Nº 842109',
      detail: 'Póliza de Responsabilidad Civil & Asistencia Médica de Montaña',
    },
    {
      label: 'SOSTENIBILIDAD REAL',
      value: 'Reforestación de Queñuales',
      detail: legal.carbonNeutralProgram || 'Convenio Comunitario Huilloc & Chinchero',
    },
  ];

  return (
    <section id="nosotros" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// IDENTIDAD & MAESTRÍA ANDINA'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              Los Rostros Detrás de Qorikancha
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
              No somos una agencia intermediaria de oficina: somos un equipo cusqueño de arqueólogos, especialistas en medicina de altitud y comunidades quechuas que viven y custodian esta cordillera.
            </p>
          </div>

          <div className="hud-badge text-gold self-start md:self-end flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-gold" />
            OPERADORES DIRECTOS EN DESTINO
          </div>
        </div>

        {/* Retícula del Equipo & Liderazgo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-obsidian-glow flex flex-col justify-between glass-card-hover group"
            >
              <div>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 border border-gold/20">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-sans font-semibold text-gold bg-obsidian/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-gold/30 uppercase tracking-wider block w-fit">
                      {member.credentials}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-medium text-mist group-hover:text-gold transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-sans text-gold/90 font-medium mt-1">
                  {member.role}
                </p>
                <p className="text-xs sm:text-sm font-sans text-mist/75 leading-relaxed mt-4">
                  {member.bio}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-sans text-mist/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span>Equipo propio residente en Cusco</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de Licencias, RUC y Transparencia Legal */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-obsidian-glow">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-sans font-medium text-gold uppercase tracking-widest block mb-1">
                RESPALDO INSTITUCIONAL & LEGAL
              </span>
              <h4 className="text-2xl font-serif text-mist">
                Licencias Oficiales & Transparencia Total
              </h4>
            </div>

            <div className="text-xs font-sans text-mist/70 lg:text-right">
              <p><strong className="text-mist">Razón Social:</strong> {legal.legalName}</p>
              <p><strong className="text-mist">RUC:</strong> {legal.ruc} · Sede Central: Plaza de Armas del Cusco</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 text-xs font-sans">
            {credentials.map((cred, i) => (
              <div key={i} className="p-4 rounded-2xl bg-obsidian-light/60 border border-white/10">
                <span className="text-[10px] font-semibold text-gold uppercase tracking-wider block mb-1">
                  {cred.label}
                </span>
                <p className="font-serif text-sm font-semibold text-mist mb-1">
                  {cred.value}
                </p>
                <p className="text-[11px] text-mist/65 leading-relaxed">
                  {cred.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { cuscoConfig } from '@/data/cuscoConfig';
import {
  Mail,
  Phone,
  MessageSquare,
  Video,
  Send,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
} from 'lucide-react';

export default function BespokeInquirySection() {
  const { expeditions, concierge, legal } = cuscoConfig;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDates: '',
    guests: '2',
    expeditionId: 'machu-picchu-sunrise',
    hotelPreference: 'boutique-5-star',
    contactPreference: 'email',
    specialNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `QOR-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setReferenceCode(code);
    setSubmitted(true);
  };

  const selectedExpedition =
    expeditions.find((e) => e.id === formData.expeditionId) || expeditions[0];

  const handleWhatsAppRedirect = () => {
    const text = `Hola Qorikancha Concierge. He completado mi solicitud de expedición a medida (Ref: ${referenceCode || 'WEB'}).
Nombre: ${formData.fullName || 'Viajero'}
Expedición: ${selectedExpedition.title}
Viajeros: ${formData.guests}
Fechas tentativas: ${formData.travelDates || 'Por definir'}
Preferencia: ${formData.contactPreference === 'videocall' ? 'Videollamada de 15 min' : formData.contactPreference === 'email' ? 'Propuesta formal por Email' : 'WhatsApp'}
Notas: ${formData.specialNotes || 'Ninguna'}
Agradezco su pronta atención.`;

    window.open(`https://wa.me/${concierge.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contacto" className="relative px-4 sm:px-6 py-24 bg-obsidian border-t border-gold/15">
      <div className="max-w-7xl mx-auto">
        {/* Cabecera Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-sans font-medium text-gold tracking-super-wide uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {'// DISEÑO DE EXPEDICIÓN A MEDIDA'}
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-mist mt-3">
              Planifiquemos su Travesía Privada
            </h2>
            <p className="text-mist/70 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-sans">
              Cada itinerario de Qorikancha es una obra única. Comparta sus preferencias para recibir una propuesta formal detallada por correo, coordinar en WhatsApp o agendar una videollamada con nuestros diseñadores en Cusco.
            </p>
          </div>

          <div className="hud-badge text-gold self-start md:self-end flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gold" />
            CANALES MULTI-PLATAFORMA
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Formulario Principal de Consulta Formal (7 Columnas) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-10 border border-gold/30 shadow-obsidian-glow bg-obsidian-card">
            {submitted ? (
              <div className="py-10 text-center space-y-6 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-sans text-gold uppercase tracking-widest block mb-1">
                    SOLICITUD REGISTRADA EXITOSAMENTE
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-mist">
                    Gracias, {formData.fullName || 'Estimado Viajero'}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-mist/75 max-w-md mx-auto mt-2 leading-relaxed">
                    Hemos creado su expediente confidencial <strong className="text-gold">{referenceCode}</strong>. Un diseñador de expediciones evaluará la disponibilidad de permisos y le enviará la propuesta detallada.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-obsidian-light border border-white/10 max-w-md mx-auto text-left text-xs font-sans space-y-1.5 text-mist/80">
                  <p><strong>Expedición:</strong> {selectedExpedition.title}</p>
                  <p><strong>Viajeros:</strong> {formData.guests} personas</p>
                  <p><strong>Canal de Preferencia:</strong> {formData.contactPreference === 'videocall' ? 'Videollamada de 15 min' : formData.contactPreference === 'email' ? 'Propuesta formal por Email' : 'WhatsApp Concierge'}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-obsidian text-xs font-sans font-bold tracking-wider uppercase shadow-gold-glow hover:bg-gold-light transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Conectar Ahora por WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/15 text-xs font-sans text-mist/70 hover:text-gold transition-colors"
                  >
                    Nueva Consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nombre Completo */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Ej. Arthur Vance"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="arthur@vance-holdings.co.uk"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Teléfono / WhatsApp */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7911 123456"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Fechas Estimadas */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                      Fechas de Viaje
                    </label>
                    <input
                      type="text"
                      value={formData.travelDates}
                      onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                      placeholder="Ej. Septiembre 2026"
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Número de Viajeros */}
                  <div>
                    <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                      Nº de Viajeros
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors"
                    >
                      <option value="1">1 Viajero Individual</option>
                      <option value="2">2 Personas (Pareja)</option>
                      <option value="3-4">3 a 4 Personas (Familia)</option>
                      <option value="5-8">5 a 8 Personas (Grupo Privado)</option>
                      <option value="9+">9+ Personas (Expedición Especial)</option>
                    </select>
                  </div>
                </div>

                {/* Expedición de Interés */}
                <div>
                  <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                    Expedición o Experiencia de Interés *
                  </label>
                  <select
                    value={formData.expeditionId}
                    onChange={(e) => setFormData({ ...formData, expeditionId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors"
                  >
                    {expeditions.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title} ({exp.duration} · {exp.pricePerPerson})
                      </option>
                    ))}
                    <option value="bespoke-custom">Itinerario Completo 100% a Medida (Combinado)</option>
                  </select>
                </div>

                {/* Canal Preferido de Respuesta */}
                <div>
                  <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                    ¿Cómo prefiere que nos comuniquemos?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, contactPreference: 'email' })}
                      className={`p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-center gap-2 ${
                        formData.contactPreference === 'email'
                          ? 'border-gold bg-gold/15 text-gold font-semibold'
                          : 'border-white/10 bg-obsidian-light/60 text-mist/70 hover:border-gold/30'
                      }`}
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>Propuesta por Email</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, contactPreference: 'whatsapp' })}
                      className={`p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-center gap-2 ${
                        formData.contactPreference === 'whatsapp'
                          ? 'border-gold bg-gold/15 text-gold font-semibold'
                          : 'border-white/10 bg-obsidian-light/60 text-mist/70 hover:border-gold/30'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 shrink-0" />
                      <span>WhatsApp VIP</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, contactPreference: 'videocall' })}
                      className={`p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-center gap-2 ${
                        formData.contactPreference === 'videocall'
                          ? 'border-gold bg-gold/15 text-gold font-semibold'
                          : 'border-white/10 bg-obsidian-light/60 text-mist/70 hover:border-gold/30'
                      }`}
                    >
                      <Video className="w-4 h-4 shrink-0" />
                      <span>Videollamada 15 min</span>
                    </button>
                  </div>
                </div>

                {/* Notas Especiales o Intereses */}
                <div>
                  <label className="block text-xs font-sans font-medium text-mist/80 uppercase tracking-wider mb-2">
                    Notas Especiales, Intereses o Restricciones
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    placeholder="Ej. Aniversario de bodas, requerimos aclimatación suave para persona mayor, preferencia por tren Hiram Bingham o cata de vinos."
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-light/80 border border-white/10 focus:border-gold text-mist text-xs font-sans focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gold hover:bg-gold-light text-obsidian font-sans font-bold text-xs tracking-widest uppercase shadow-gold-glow transition-all flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  <span>Solicitar Propuesta & Asesoría Privada</span>
                </button>

                <p className="text-[11px] font-sans text-mist/50 text-center">
                  ✦ Garantía de Privacidad: Sus datos se procesan conforme a la Ley Nº 29733 y RGPD. Jamás compartimos su información con terceros.
                </p>
              </form>
            )}
          </div>

          {/* Información de Contacto Directo, Oficina & Asistencia (5 Columnas) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tarjeta Concierge */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-gold/25 shadow-obsidian-glow space-y-6">
              <span className="text-xs font-sans font-medium text-gold uppercase tracking-widest block">
                ATENCIÓN CONCIERGE DIRECTA
              </span>

              <div className="space-y-4 text-xs font-sans">
                <a
                  href={`mailto:${concierge.email}`}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-obsidian-light/70 border border-white/10 hover:border-gold/40 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="text-mist/50 block text-[10px] uppercase">CORREO INSTITUCIONAL</span>
                    <span className="text-mist font-semibold group-hover:text-gold transition-colors">
                      {concierge.email}
                    </span>
                  </div>
                </a>

                <a
                  href={concierge.generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-obsidian-light/70 border border-white/10 hover:border-gold/40 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="text-mist/50 block text-[10px] uppercase">LÍNEA TELEFÓNICA & WHATSAPP</span>
                    <span className="text-mist font-semibold group-hover:text-gold transition-colors">
                      {concierge.displayPhone}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-obsidian-light/70 border border-white/10">
                  <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="text-mist/50 block text-[10px] uppercase">SEDE HISTÓRICA EN CUSCO</span>
                    <span className="text-mist leading-relaxed block">
                      {legal.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-obsidian-light/70 border border-white/10">
                  <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="text-mist/50 block text-[10px] uppercase">HORARIO DE ATENCIÓN</span>
                    <span className="text-mist leading-relaxed block">
                      {concierge.operatingHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sello de Garantía Ética & Médica */}
            <div className="glass-card rounded-3xl p-6 border border-gold/20 text-xs font-sans text-mist/80 space-y-3">
              <span className="text-gold font-semibold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-gold" />
                Compromiso de Excelencia Qorikancha
              </span>
              <p className="text-[11px] leading-relaxed text-mist/70">
                Cada expedicionario es respaldado por contratos formales, guías de alta montaña WFR, seguro médico internacional de montaña y boletos nominales garantizados ante el Ministerio de Cultura.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

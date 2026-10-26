/**
 * CONFIGURACIÓN MAESTRA Y FUENTE DE LA VERDAD - PLANTILLA TURÍSTICA CUSCO LUXURY
 * Centraliza metadatos de destino, catálogo de expediciones, telemetría geográfica,
 * canales de conversión y protocolos de experiencia de ultralujo.
 */

export interface ExpeditionItineraryDay {
  day: string;
  title: string;
  elevation: string;
  description: string;
}

export interface Expedition {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  maxAltitude: string;
  altitudeMeters: number;
  difficulty: 'Suave / Confort' | 'Moderado' | 'Moderado - Exigente' | 'Exigente';
  image: string;
  fallbackImage: string;
  highlights: string[];
  summary: string;
  pricePerPerson: string;
  priceDetails?: string;
  included?: string[];
  notIncluded?: string[];
  recommendedHotels?: string[];
  itinerary?: ExpeditionItineraryDay[];
  bestSeason?: string;
  permitsRequired?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Waypoint {
  id: string;
  name: string;
  quechuaName?: string;
  elevationMeters: number;
  elevationDisplay: string;
  estimatedTransitTime: string;
  travelMode: 'Vía Férrea Escénica' | 'Van Privada 4x4' | 'Trek / Caminata' | 'Caballo de Paso';
  description: string;
  highlight: string;
  image?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface BentoCollageItem {
  id: string;
  name: string;
  badge: string;
  image: string;
  elevation: string;
  subtitle: string;
  description: string;
}

export interface BentoExperience {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  fallbackImage: string;
  colSpanDesktop: 1 | 2;
  badgeText?: string;
  collageItems?: BentoCollageItem[];
}

export interface AcclimatizationRule {
  day: string;
  phase: string;
  altitudeRange: string;
  recommendation: string;
  medicalNote: string;
}

export interface Testimonial {
  id: string;
  author: string;
  origin: string;
  flag: string;
  tripType: string;
  category: 'Machu Picchu Signature' | 'Salkantay Glamping' | 'Camino Inca VIP' | 'Familias & Parejas';
  quote: string;
  highlight: string;
  rating: number;
  date: string;
  avatarInitials: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  highlightNote?: string;
}

export interface CuscoMasterConfig {
  destination: {
    name: string;
    region: string;
    country: string;
    tagline: string;
    subtagline: string;
    manifesto: string;
    coordinates: {
      lat: number;
      lng: number;
      formatted: string;
    };
    elevation: {
      meters: number;
      display: string;
    };
    climate: string;
    timeZone: string;
  };
  brand: {
    name: string;
    legalName: string;
    edition: string;
    officialBadges: string[];
    guarantees: string[];
  };
  legal: {
    legalName: string;
    tradeName: string;
    ruc: string;
    address: string;
    dirceturRegistration: string;
    minceturRegistration?: string;
    civilInsurancePolicy?: string;
    carbonNeutralProgram?: string;
    privacyEmail: string;
    claimsEmail: string;
    dpoContact: string;
    dataBankRegistration: string;
    applicableLaw: string;
  };
  social: {
    whatsapp: string;
    instagram: string;
    facebook: string;
    instagramHandle: string;
    facebookPage: string;
  };
  concierge: {
    whatsappNumber: string; // Formato internacional sin símbolos para la API
    displayPhone: string;
    email: string;
    operatingHours: string;
    responseAverage: string;
    generateWhatsAppUrl: (options?: {
      expeditionTitle?: string;
      guests?: number;
      travelDates?: string;
      customMessage?: string;
    }) => string;
  };
  expeditions: Expedition[];
  waypoints: Waypoint[];
  bentoExperiences: BentoExperience[];
  acclimatizationProtocol: AcclimatizationRule[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
}

export const cuscoConfig: CuscoMasterConfig = {
  destination: {
    name: 'Cusco & Valle Sagrado',
    region: 'Andes del Sur',
    country: 'Perú',
    tagline: 'Donde el Tiempo se Rinde ante la Piedra Sagrada',
    subtagline: 'Expediciones privadas de autor, lodges de alta montaña y arqueología vivencial en el ombligo del mundo.',
    manifesto:
      'No visitamos los Andes; nos dejamos transformar por ellos. Creamos travesías privadas diseñadas con reverencia ancestral, confort contemporáneo absoluto y la intimidad que solo los grandes santuarios de la Tierra pueden otorgar.',
    coordinates: {
      lat: -13.5319,
      lng: -71.9675,
      formatted: '13.5319° S · 71.9675° W',
    },
    elevation: {
      meters: 3399,
      display: '3,399 msnm',
    },
    climate: 'Andino de alta montaña · Días de sol dorado y noches frescas bajo cielo estelar',
    timeZone: 'UTC-5 (PET · Hora Estándar del Perú)',
  },
  brand: {
    name: 'QORIKANCHA EXPEDITIONS',
    legalName: 'Qorikancha Private Sanctuary & Alpine Expeditions S.A.C.',
    edition: 'Colección Privada 2026/2027',
    officialBadges: [
      'Operador Oficial Registrado MINCETUR Nº 2024-CUS-089',
      'Wilderness Medical First Responder (WFR) en cada expedición',
      'Porteadores de Honor con Trato Digno Ético Certificado (+40% sobre ley)',
      'Compromiso de Conservación Ambiental & Reforestación de Queñuales',
    ],
    guarantees: [
      'Salidas 100% privadas y personalizadas a tu propio ritmo',
      'Acceso arqueológico prioritario en franjas horarias de baja afluencia',
      'Monitoreo biológico de saturación de oxígeno y aclimatación continua',
      'Gastronomía de terroir con insumos nativos de altura y chefs privados',
    ],
  },
  legal: {
    legalName: 'Qorikancha Private Sanctuary & Alpine Expeditions S.A.C.',
    tradeName: 'Qorikancha Sanctuary Expeditions',
    ruc: '20608945123',
    address: 'Portal de Panes 123, Plaza de Armas, Centro Histórico, Cusco, Perú',
    dirceturRegistration: 'DIRCETUR-CUS-AG-04819',
    minceturRegistration: 'MINCETUR-CUS-2024-089',
    civilInsurancePolicy: 'Pacífico Seguros Póliza de Responsabilidad Civil & Asistencia Nº 842109',
    carbonNeutralProgram: 'Convenio de Reforestación de Queñuales con Comunidades Campesinas de Huilloc y Chinchero',
    privacyEmail: 'privacidad@qorikancha.pe',
    claimsEmail: 'reclamaciones@qorikancha.pe',
    dpoContact: 'dpo@qorikancha.pe',
    dataBankRegistration: 'RNPDP-PJP-00892',
    applicableLaw: 'Leyes de la República del Perú y Estándares Internacionales (GDPR, CCPA)',
  },
  social: {
    whatsapp: 'https://wa.me/51921195037',
    instagram: 'https://instagram.com/qorikancha.expeditions',
    facebook: 'https://facebook.com/qorikancha.expeditions',
    instagramHandle: '@qorikancha.expeditions',
    facebookPage: 'Qorikancha Expeditions Cusco',
  },
  concierge: {
    whatsappNumber: '51921195037',
    displayPhone: '+51 921 195 037',
    email: 'concierge@qorikancha.pe',
    operatingHours: 'Diseño de expediciones de 07:00 a 22:00 PET (GMT-5) · Línea 24/7 para viajeros en destino',
    responseAverage: 'Menos de 2 horas en horario hábil · Atención prioritaria continua',
    generateWhatsAppUrl: (options = {}) => {
      const { expeditionTitle, guests, travelDates, customMessage } = options;
      if (customMessage) {
        return `https://wa.me/51921195037?text=${encodeURIComponent(customMessage)}`;
      }
      let text = `Hola Qorikancha Concierge. Deseo información y asesoría personalizada para la expedición "${expeditionTitle || 'a medida en Cusco'}".`;
      if (travelDates) {
        text += ` Fechas estimadas: ${travelDates}.`;
      }
      if (guests) {
        text += ` Número de viajeros: ${guests}.`;
      } else {
        text += ` Me gustaría conocer disponibilidad, itinerarios privados y recomendaciones de aclimatación.`;
      }
      text += ` Muchas gracias.`;
      return `https://wa.me/51921195037?text=${encodeURIComponent(text)}`;
    },
  },
  expeditions: [
    {
      id: 'machu-picchu-sunrise',
      title: 'Machu Picchu: Amanecer Sagrado Privado',
      subtitle: 'Acceso exclusivo al romper el alba, tren panorámico de lujo y arqueólogo de cabecera',
      badge: 'EXPERIENCIA SIGNATURE',
      duration: '2 Días / 1 Noche',
      maxAltitude: '2,430 msnm',
      altitudeMeters: 2430,
      difficulty: 'Suave / Confort',
      image: '/images/machu-picchu-sunrise.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Vagón observatorio panorámico Vistadome / 360° con ventanales de techo y audio-guía sensorial',
        'Ingreso a la ciudadela inca en el primer turno matutino (06:00 AM) antes de las aglomeraciones',
        'Noche en hotel boutique 5★ en Machu Picchu Pueblo y almuerzo gourmet de terroir',
      ],
      summary:
        'Despierta frente al santuario incaico envuelto en la niebla matutina. Una inmersión arqueológica guiada por maestros historiadores que revelan la ingeniería astronómica andina sin prisas ni multitudes.',
      pricePerPerson: 'Desde $890 USD / persona',
      priceDetails:
        'Tarifa base por persona en ocupación doble. Incluye tren panorámico Vistadome Observatory / 360°, noche en hotel boutique 5★ en Aguas Calientes (Inkaterra o Sumaq), almuerzo a la carta y boletos oficiales Circuitos 1 o 2. Opción con tren Belmond Hiram Bingham: Desde $1,850 USD por persona.',
      included: [
        'Traslados privados puerta a puerta en vehículo 4x4 exclusivo Cusco - Estación - Cusco',
        'Boletos de tren panorámico Vistadome Observatory / 360° ida y vuelta',
        '1 noche en hotel boutique 5★ en Machu Picchu Pueblo (Inkaterra Machu Picchu Pueblo o Sumaq 5★)',
        'Guía arqueólogo colegiado exclusivo durante toda la estancia en la ciudadela',
        'Boletos de ingreso garantizados a los Circuitos Oficiales 1 o 2',
        'Boletos de bus ecológico Consettur ida y vuelta a la ciudadela inca',
        'Almuerzo a la carta gourmet en restaurante seleccionado (o Belmond Sanctuary Lodge en opción Hiram Bingham)',
        'Kit de oximetría y asistencia médica personalizada',
      ],
      notIncluded: [
        'Vuelos comerciales internacionales o domésticos a Lima/Cusco',
        'Bebidas alcohólicas no especificadas en el menú',
        'Propinas voluntarias para guía, chofer y personal de hotel',
      ],
      recommendedHotels: [
        'Inkaterra Machu Picchu Pueblo Hotel (Boutique de Lujo en Bosque de Nubes)',
        'Sumaq Machu Picchu Hotel (5★ Luxury frente al río Vilcanota)',
        'Belmond Sanctuary Lodge (Único hotel junto a la entrada de la ciudadela - Opción Signature)',
      ],
      itinerary: [
        {
          day: 'Día 1',
          title: 'Cusco / Valle Sagrado hacia Aguas Calientes',
          elevation: '2,040 msnm',
          description:
            'Recojo matutino en van privada 4x4 hacia la estación de Ollantaytambo. Embarque en tren panorámico con cristales envolventes hacia Machu Picchu Pueblo. Check-in en hotel de lujo, tarde libre para relajarse en jardines de orquídeas y cena degustación.',
        },
        {
          day: 'Día 2',
          title: 'Amanecer en Machu Picchu & Retorno VIP',
          elevation: '2,430 msnm',
          description:
            'Ascenso temprano en bus privado para ingresar a la ciudadela en el primer turno (06:00 AM). Recorrido arqueológico de 3.5 horas con arqueólogo exclusivo. Almuerzo gourmet y retorno por la tarde en tren de lujo hacia Cusco.',
        },
      ],
      bestSeason: 'Mayo a Octubre (cielos despejados y menor nubosidad). Operable todo el año.',
      permitsRequired: 'Requiere confirmación nominal con pasaporte con 2 a 4 meses de antelación.',
      coordinates: { lat: -13.1631, lng: -72.5450 },
    },
    {
      id: 'salkantay-sky-domes',
      title: 'Salkantay Sky Domes & Glamping VIP',
      subtitle: 'Domos geodésicos de cristal a 3,900 msnm bajo la Vía Láctea andina y Laguna Humantay',
      badge: 'ALTA MONTAÑA & GLAMPING',
      duration: '4 Días / 3 Noches',
      maxAltitude: '4,630 msnm (Paso Salkantay)',
      altitudeMeters: 4630,
      difficulty: 'Moderado - Exigente',
      image: '/images/salkantay-domes.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Paredes y techos acristalados para contemplar constelaciones estelares desde la cama',
        'Aguas turquesas de la Laguna Humantay en horario privado al atardecer',
        'Campamentos con calefacción radiante, edredones de pluma, masajista y chef de altura',
      ],
      summary:
        'La simbiosis perfecta entre la naturaleza salvaje de la cordillera del Vilcabamba y el confort contemporáneo. Asciende con respeto hacia el mítico paso del Apu Salkantay y desciende a la ceja de selva virgen.',
      pricePerPerson: 'Desde $1,280 USD / persona',
      priceDetails:
        'Tarifa base por persona en ocupación doble. Incluye 3 noches en domos geodésicos calefaccionados, chef de montaña privado, caballos de auxilio, masajes musculares de montaña y guía certificado WFR.',
      included: [
        'Transporte privado 4x4 Cusco - Mollepata - Soraypampa',
        '3 noches en Sky Domes geodésicos privados con calefacción y baño ensuite',
        'Pensión completa gourmet preparada en vivo por chef de altura con insumos orgánicos',
        'Caballos de carga para equipaje pesado (hasta 10 kg por persona) y caballo de silla de auxilio',
        'Guía de alta montaña certificado Wilderness Medical First Responder (WFR) con oxígeno medicinal',
        'Visita privada al atardecer a la Laguna Humantay',
        'Ingreso oficial y tren de retorno desde Aguas Calientes a Ollantaytambo',
      ],
      notIncluded: [
        'Bolsa de dormir térmica de pluma (disponible en alquiler $35 USD)',
        'Propinas para arrieros, cocineros y guía',
        'Seguro de viaje internacional de trekking',
      ],
      recommendedHotels: [
        'Soraypampa Sky Luxury Domes (3,900 msnm)',
        'Collpapampa Andean Eco-Lodge (2,900 msnm)',
        'Aguas Calientes Boutique Hotel (2,040 msnm)',
      ],
      itinerary: [
        {
          day: 'Día 1',
          title: 'Cusco a Soraypampa & Laguna Humantay',
          elevation: '3,900 msnm',
          description:
            'Salida de Cusco a las 05:30 AM hacia Mollepata. Ascenso a Soraypampa, check-in en Sky Domes. Caminata vespertina hacia las aguas turquesas de la Laguna Humantay (4,200m). Noche bajo las estrellas.',
        },
        {
          day: 'Día 2',
          title: 'Paso Salkantay & Descenso al Bosque Nuboso',
          elevation: '4,630 msnm',
          description:
            'Jornada reina: ascenso gradual al mítico abra Salkantay (4,630m) frente al glaciar sagrado. Ofrenda tradicional de respeto a la Pachamama y descenso hacia el ecosistema subtropical de Collpapampa.',
        },
        {
          day: 'Día 3',
          title: 'Ceja de Selva, Plantaciones de Café & Aguas Calientes',
          elevation: '2,040 msnm',
          description:
            'Caminata entre cascadas, plantaciones de orquídeas y café orgánico. Almuerzo de campo y tren escénico de Hidroeléctrica a Aguas Calientes. Noche en hotel boutique.',
        },
        {
          day: 'Día 4',
          title: 'Santuario de Machu Picchu & Retorno a Cusco',
          elevation: '2,430 msnm',
          description:
            'Visita guiada matutina por el Circuito Clásico de Machu Picchu. Almuerzo de despedida y viaje de regreso en tren panorámico y van privada hacia su hotel en Cusco.',
        },
      ],
      bestSeason: 'Abril a Noviembre (temporada seca con senderos firmes y vistas despejadas).',
      permitsRequired: 'Requiere reserva previa de entradas a Machu Picchu con 3 meses de anticipación.',
      coordinates: { lat: -13.3333, lng: -72.5667 },
    },
    {
      id: 'camino-inca-vip',
      title: 'Camino Inca Clásico: Porteadores de Honor',
      subtitle: 'La senda milenaria original con carpas suite, duchas calientes y masajes de montaña',
      badge: 'PATRIMONIO INCA',
      duration: '4 Días / 3 Noches',
      maxAltitude: '4,215 msnm (Paso Warmiwañusqa)',
      altitudeMeters: 4215,
      difficulty: 'Exigente',
      image: '/images/camino-inca.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Carpas habitables dobles con camas reales, plumones térmicos y carpa ducha caliente',
        'Fisioterapeuta y masajes terapéuticos al concluir cada jornada de ascenso',
        'Llegada triunfal a Machu Picchu por la mítica Puerta del Sol (Inti Punku)',
      ],
      summary:
        'Recorre las losas de piedra original que pisaron los soberanos incas. Una vivencia física memorable compensada con el más alto estándar de hospitalidad de montaña y porteadores con trato digno certificado.',
      pricePerPerson: 'Desde $1,480 USD / persona',
      priceDetails:
        'Tarifa base por persona en ocupación doble. Cupos oficiales estrictamente limitados a 500 permisos diarios por el Estado peruano. Incluye carpas habitables con catres y plumones, carpa ducha caliente, masajista de montaña y porteadores con remuneración ética (+40% sobre ley).',
      included: [
        'Permisos oficiales nominativos del SERNANP para Camino Inca y Machu Picchu',
        'Equipo de campamento de lujo: carpa dormitorio habitable de pie, catre de campaña, colchón inflable y edredón térmico',
        'Carpa comedor climatizada, vajilla de cerámica y carpa ducha caliente privada en campamentos',
        'Masajista / fisioterapeuta de montaña al concluir cada jornada de marcha',
        'Chef de montaña privado y ayudante con menús gourmet de 3 tiempos',
        'Equipo de porteadores de honor con seguro médico, carpas propias y retribución ética (+40% sobre ley)',
        'Guía arqueólogo colegiado bilingüe con certificación WFR y tanque de oxígeno medicinal continuo',
        'Retorno en tren panorámico de lujo a Ollantaytambo y van privada a Cusco',
      ],
      notIncluded: [
        'Bolsa de dormir técnica de pluma de ganso (-10°C)',
        'Vuelos domésticos e internacionales',
        'Propinas voluntarias para el equipo de porteadores y guía',
      ],
      recommendedHotels: [
        'Campamentos exclusivos autorizados SERNANP (Wayllabamba, Pacaymayo, Wiñay Wayna)',
        'Pernocte final en Cusco o Valle Sagrado según itinerario general',
      ],
      itinerary: [
        {
          day: 'Día 1',
          title: 'Km 82 (Piscacucho) a Wayllabamba',
          elevation: '3,000 msnm',
          description:
            'Encuentro en el valle y paso por el puesto de control del Km 82. Caminata suave a lo largo del río Urubamba divisando los complejos arqueológicos de Patallacta y Huillca Raccay. Arribo a campamento suite con masajes de pies.',
        },
        {
          day: 'Día 2',
          title: 'El Desafío de Warmiwañusqa (Paso de la Mujer Muerta)',
          elevation: '4,215 msnm',
          description:
            'Jornada de mayor exigencia física ascendiendo por escalinatas incas ancestrales entre bosques de queñuales nativos hasta la cumbre a 4,215m. Descenso reconfortante al campamento de Pacaymayo.',
        },
        {
          day: 'Día 3',
          title: 'Runkurakay, Sayacmarca & la Maravilla de Wiñay Wayna',
          elevation: '3,650 msnm',
          description:
            'El tramo más bello del mundo andino. Se cruzan túneles incas tallados en roca madre y los recintos ceremoniales de Phuyupatamarca (La Ciudad sobre las Nubes). Llegada a Wiñay Wayna.',
        },
        {
          day: 'Día 4',
          title: 'Inti Punku (Puerta del Sol) & Machu Picchu',
          elevation: '2,430 msnm',
          description:
            'Partida al romper el alba para cruzar Inti Punku y contemplar la primera vista panorámica de Machu Picchu con los primeros rayos dorados del sol. Tour guiado exclusivo y tren panorámico de regreso.',
        },
      ],
      bestSeason:
        'Mayo a Octubre (sendero seco). NOTA OBLIGATORIA: El Camino Inca está CERRADO todo el mes de febrero por conservación oficial del SERNANP.',
      permitsRequired:
        'Requiere reserva obligatoria con 4 a 8 meses de anticipación debido al límite estricto de 500 permisos diarios del gobierno peruano.',
      coordinates: { lat: -13.2500, lng: -72.5000 },
    },
    {
      id: 'valle-sagrado-ausangate',
      title: 'Valle Sagrado de los Incas: Moray, Maras & Ollantaytambo',
      subtitle: 'Cuna agronómica incaica, haciendas coloniales, caballos peruanos de paso y cata botánica',
      badge: 'BIENESTAR & TRADICIÓN',
      duration: '2 Días / 1 Noche',
      maxAltitude: '2,870 msnm (Valle de Urubamba)',
      altitudeMeters: 2870,
      difficulty: 'Suave / Confort',
      image: '/images/valle-sagrado.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Cata botánica y almuerzo de terroir en hacienda privada inspirada en ecosistemas de altura',
        'Paseo privado en Caballos Peruanos de Paso por valles y campiñas tradicionales',
        'Noche en resort boutique del Valle Sagrado a cota baja ideal para la aclimatación (2,870m)',
      ],
      summary:
        'El refugio fértil del río Vilcanota. Explora el centro de experimentación agronómica de Moray, las salineras milenarias de Maras y relájate en santuarios boutique diseñados para restaurar cuerpo y espíritu.',
      pricePerPerson: 'Desde $420 USD / persona',
      priceDetails:
        'Tarifa base por persona en ocupación doble. Incluye transporte privado 4x4, arqueólogo exclusivo, cata botánica en hacienda tradicional, paseo en Caballos Peruanos de Paso y noche en resort de lujo del Valle Sagrado (Tambo del Inka o Sol y Luna).',
      included: [
        'Vehículo 4x4 de alta gama o van Mercedes Sprinter privada con chofer profesional a disposición',
        '1 noche en resort boutique de lujo en Urubamba (Tambo del Inka Luxury Collection o Sol y Luna)',
        'Guía arqueólogo exclusivo durante los dos días',
        'Boleto Turístico del Cusco Integral y entradas a las Salineras de Maras',
        'Cata botánica y almuerzo de terroir en hacienda privada del Valle Sagrado',
        'Demostración y cabalgata privada en Caballos Peruanos de Paso',
        'Taller textil ancestral con maestras tejedoras de la Comunidad de Chinchero',
      ],
      notIncluded: [
        'Cena del Día 1 no especificada',
        'Tratamientos de spa adicionales en el hotel',
        'Propinas voluntarias',
      ],
      recommendedHotels: [
        'Tambo del Inka, a Luxury Collection Resort & Spa (Urubamba)',
        'Sol y Luna - Relais & Châteaux (Urubamba)',
        'Belmond Hotel Río Sagrado (Urubamba)',
      ],
      itinerary: [
        {
          day: 'Día 1',
          title: 'Chinchero, Moray & Salineras de Maras',
          elevation: '2,870 msnm',
          description:
            'Partida de Cusco hacia Chinchero para apreciar el hilado y teñido con tintes naturales. Visita a los anfiteatros concéntricos de aclimatación agrícola de Moray y descenso a los más de 3,000 pozos de sal artesanal de Maras. Almuerzo de hacienda y check-in en resort.',
        },
        {
          day: 'Día 2',
          title: 'Fortaleza de Ollantaytambo & Caballos de Paso',
          elevation: '2,792 msnm',
          description:
            'Recorrido por la ciudad inca viviente de Ollantaytambo y su templo del sol megalítico. Demostración y paseo privado en Caballos Peruanos de Paso. Tarde libre en el Valle o conexión con el tren hacia Machu Picchu.',
        },
      ],
      bestSeason:
        'Ideal todo el año. Entre 2,700m y 2,900m de altitud, el Valle Sagrado posee el clima más benigno y templado de la región.',
      permitsRequired: 'No requiere cupos limitados estatales; reserva sugerida con 2 semanas de anticipación.',
      coordinates: { lat: -13.3283, lng: -72.1969 },
    },
    {
      id: 'vinicunca-rainbow-mountain',
      title: 'Montaña de 7 Colores: Vinicunca & Valle Rojo VIP',
      subtitle: 'Amanecer en la cumbre polícroma a 5,036 msnm antes de las multitudes con desayuno andino privado',
      badge: 'MARAVILLA NATURAL',
      duration: '1 Día Completo (03:30 - 16:30)',
      maxAltitude: '5,036 msnm',
      altitudeMeters: 5036,
      difficulty: 'Moderado - Exigente',
      image: '/images/vinicunca.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1579606032834-c92330a6c0b9?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Llegada prioritaria al mirador principal al alba para fotos en soledad y silencio',
        'Guía certificado WFR con pulsioxímetro y kit de oxígeno medicinal continuo a bordo',
        'Desayuno andino caliente y almuerzo campestre preparado por chef privado en domo de montaña',
        'Caballo de auxilio con arriero personal asignado a cada viajero',
      ],
      summary:
        'Admira la majestuosa estratigrafía mineral de los Andes cusqueños. Una experiencia de alta montaña con franjas turquesas, doradas y púrpuras talladas por millones de años de sedimentación geológica bajo el resguardo del sagrado Apu Ausangate.',
      pricePerPerson: 'Desde $340 USD / persona',
      priceDetails:
        'Tarifa base en servicio privado (2 a 4 pasajeros). Incluye salida temprana exclusiva (03:30 AM) para evitar las multitudes, van 4x4 con chofer, chef de montaña para desayuno caliente en domo privado, arriero y caballo de auxilio personal por pasajero, kit de oxígeno y guía WFR.',
      included: [
        'Transporte privado 4x4 exclusivo Cusco - Pitumarca - Llacto - Cusco',
        'Salida al alba (03:30 AM) para coronar la cumbre antes del arribo de los buses turísticos masivos',
        'Chef de montaña privado: desayuno andino caliente en carpa/domo privado al inicio del sendero',
        'Almuerzo campestre gourmet caliente de retorno',
        'Caballo de auxilio con arriero asignado a cada viajero para apoyar tramos de ascenso',
        'Guía certificado Wilderness Medical First Responder (WFR) con pulsioxímetro y tanque de oxígeno medicinal',
        'Boleto de ingreso a las comunidades de Vinicunca y mirador del Valle Rojo',
        'Bastones de trekking telescópicos de fibra de carbono',
      ],
      notIncluded: [
        'Gastos personales y artesanías locales en las comunidades',
        'Propinas para arrieros, chef y chofer',
      ],
      recommendedHotels: [
        'Salida y retorno al hotel del huésped en Cusco o Valle Sagrado',
      ],
      itinerary: [
        {
          day: '03:30 - 06:30',
          title: 'Traslado Privado al Alba hacia el Valle del Ausangate',
          elevation: '4,600 msnm',
          description:
            'Recojo en su hotel en Cusco en van 4x4 equipada con mantas andinas térmicas y bebidas calientes. Recorrido por el valle sur hasta el campamento base de Llacto.',
        },
        {
          day: '06:30 - 07:30',
          title: 'Desayuno de Altura en Domo Privado',
          elevation: '4,600 msnm',
          description:
            'Desayuno caliente preparado en vivo por nuestro chef: quinua con manzana, café de especialidad de Quillabamba, pan campesino y frutas frescas.',
        },
        {
          day: '07:30 - 10:30',
          title: 'Ascenso Privado a Vinicunca (5,036m) & Mirador Valle Rojo',
          elevation: '5,036 msnm',
          description:
            'Ascenso a pie o a caballo de auxilio a ritmo pausado con monitoreo continuo de oximetría. Llegada a la cresta polícroma cuando aún está en soledad y silencio. Tiempo para fotos y contemplación del glaciar Ausangate.',
        },
        {
          day: '10:30 - 16:30',
          title: 'Almuerzo Campestre & Retorno a Cusco',
          elevation: '3,399 msnm',
          description:
            'Descenso hacia el campamento base para disfrutar de un almuerzo caliente reconfortante. Retorno en transporte privado a su hotel en Cusco hacia las 16:30 horas.',
        },
      ],
      bestSeason:
        'Mayo a Octubre (días soleados sin nevadas). En temporada de lluvias (enero-marzo) la cumbre puede amanecer cubierta de nieve.',
      permitsRequired:
        'No requiere cupo gubernamental previo, pero se exige aclimatación previa mínima de 48 horas en Cusco.',
      coordinates: { lat: -13.8694, lng: -71.3031 },
    },
  ],
  waypoints: [
    {
      id: 'cusco-colonial',
      name: 'Cusco Histórico',
      quechuaName: 'Qosqo',
      elevationMeters: 3399,
      elevationDisplay: '3,399 msnm',
      estimatedTransitTime: 'Punto de Partida',
      travelMode: 'Van Privada 4x4',
      description: 'Capital del Tahuantinsuyo y joya arquitectónica donde los muros incas sostienen palacios coloniales.',
      highlight: 'Templo del Sol (Qorikancha) y aclimatación inicial.',
      image: '/images/hero-cusco.webp',
      coordinates: { lat: -13.5319, lng: -71.9675 },
    },
    {
      id: 'chinchero-moray',
      name: 'Chinchero & Moray',
      quechuaName: 'Chinchero & Moray',
      elevationMeters: 3762,
      elevationDisplay: '3,762 msnm',
      estimatedTransitTime: '45 min desde Cusco',
      travelMode: 'Van Privada 4x4',
      description: 'Cuna del arte textil de alpaca fina y los gigantescos anfiteatros concéntricos de aclimatación de semillas incas.',
      highlight: 'Tintes naturales ancestrales y laboratorio agrícola de altura.',
      image: '/images/valle-sagrado.webp',
      coordinates: { lat: -13.4167, lng: -72.0500 },
    },
    {
      id: 'ollantaytambo',
      name: 'Ollantaytambo',
      quechuaName: 'Ullantaytampu',
      elevationMeters: 2792,
      elevationDisplay: '2,792 msnm',
      estimatedTransitTime: '1h 15min desde Chinchero',
      travelMode: 'Vía Férrea Escénica',
      description: 'La última ciudad inca viviente. Calles empedradas con canales de agua cristalina y la colosal fortaleza del sol.',
      highlight: 'Embarque en el tren de lujo hacia el cañón del Vilcanota.',
      image: '/images/bento-tren.webp',
      coordinates: { lat: -13.2583, lng: -72.2639 },
    },
    {
      id: 'aguas-calientes',
      name: 'Machu Picchu Pueblo',
      quechuaName: 'Aguas Calientes',
      elevationMeters: 2040,
      elevationDisplay: '2,040 msnm',
      estimatedTransitTime: '1h 30min en tren panorámico',
      travelMode: 'Vía Férrea Escénica',
      description: 'Enclave subtropical entre imponentes farallones de roca granítica y aguas termales medicinales.',
      highlight: 'Santuario ecológico y descanso antes del ascenso a la ciudadela.',
      image: '/images/camino-inca.webp',
      coordinates: { lat: -13.1547, lng: -72.5253 },
    },
    {
      id: 'machu-picchu-citadel',
      name: 'Santuario de Machu Picchu',
      quechuaName: 'Machu Pikchu',
      elevationMeters: 2430,
      elevationDisplay: '2,430 msnm',
      estimatedTransitTime: '25 min en van ecológica',
      travelMode: 'Trek / Caminata',
      description: 'La obra cumbre de la ingeniería y espiritualidad incaica, suspendida entre el cielo y la selva alta.',
      highlight: 'Intihuatana, Templo de las Tres Ventanas y Huayna Picchu.',
      image: '/images/machu-picchu-sunrise.webp',
      coordinates: { lat: -13.1631, lng: -72.5450 },
    },
    {
      id: 'salkantay-pass',
      name: 'Paso Salkantay & Glaciares',
      quechuaName: 'Sallqantay',
      elevationMeters: 4630,
      elevationDisplay: '4,630 msnm',
      estimatedTransitTime: 'Travesía de 2 días de marcha',
      travelMode: 'Trek / Caminata',
      description: 'El guardián sagrado (Apu). Macizo nevado de 6,271 metros donde la nieve eterna toca el cielo andino.',
      highlight: 'Vista del glaciar colgante y ofrenda tradicional de pago a la Pachamama.',
      image: '/images/salkantay-domes.webp',
      coordinates: { lat: -13.3333, lng: -72.5667 },
    },
    {
      id: 'vinicunca',
      name: 'Montaña de 7 Colores',
      quechuaName: 'Vinicunca',
      elevationMeters: 5036,
      elevationDisplay: '5,036 msnm',
      estimatedTransitTime: '3h van privada + 1.5h caminata',
      travelMode: 'Trek / Caminata',
      description: 'La cumbre mineral más icónica de la cordillera del Vilcanota, custodiada por el sagrado Apu Ausangate.',
      highlight: 'Mirador panorámico a 5,036 msnm y vista al Valle Rojo.',
      image: '/images/vinicunca.webp',
      coordinates: { lat: -13.8694, lng: -71.3031 },
    },
  ],
  bentoExperiences: [
    {
      id: 'haute-cuisine',
      title: 'Gastronomía de Terroir & Altura',
      category: 'ALTA COCINA ANDINA',
      tagline: 'Cata botánica de maíces nativos, tubérculos milenarios y hierbas de puna.',
      description: 'Menú degustación privado curado por chefs discípulos de los mayores exponentes de la cocina peruana contemporánea.',
      image: '/images/bento-gastronomia.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
      colSpanDesktop: 2,
      badgeText: 'MENÚ MARIDAJE 8 TIEMPOS',
      collageItems: [
        {
          id: 'tiradito-botanico',
          name: 'Tiradito Nikkei & Flores de Sauco',
          badge: 'PESCA SAGRADA & TERROIR',
          image: '/images/gastro-tiradito.webp',
          elevation: '2,870 msnm',
          subtitle: 'Trucha del Vilcanota en emulsión de ají amarillo y brotes de quinua',
          description: 'Corte fino de trucha rosada de río de altura, curada con cítricos andinos y aceite infusionado en muña silvestre.',
        },
        {
          id: 'maiz-morado-urubamba',
          name: 'Maíz Morado Ancestral',
          badge: 'CATA BOTÁNICA DE MAÍCES',
          image: '/images/gastro-maiz-morado.webp',
          elevation: '2,870 msnm',
          subtitle: 'Zea mays nativo del Valle Sagrado con reducción de chicha morada',
          description: 'Mazorcas de antocianina pura cosechadas a mano en las riberas del Urubamba, base de la chicha ceremonial incaica.',
        },
        {
          id: 'tuberculos-milenarios',
          name: 'Tubérculos Milenarios',
          badge: 'BIODIVERSIDAD ANDINA',
          image: '/images/gastro-papas-nativas.webp',
          elevation: '3,800 msnm',
          subtitle: '14 variedades de papas nativas polícromas cocidas a la huatia',
          description: 'Oca, mashua y papas nativas de pulpa morada, amarilla y carmín rescatadas por comunidades quechuas de Paucartambo.',
        },
        {
          id: 'ceviche-origen-unesco',
          name: 'Ceviche de Origen UNESCO',
          badge: 'PATRIMONIO INMATERIAL',
          image: '/images/gastro-ceviche-unesco.webp',
          elevation: 'Valle de Vilcanota',
          subtitle: 'Choclo gigante de grano tierno imperial, camote glaseado y leche de tigre',
          description: 'La máxima expresión culinaria peruana reconocida por la UNESCO, elaborada con granos de choclo gigante imperial de Urubamba.',
        },
      ],
    },
    {
      id: 'astronomy-vilcanota',
      title: 'Cosmovisión & Astronomía Inca',
      category: 'CIELO ESTELAR NOCTURNO',
      tagline: 'Las constelaciones oscuras: La Llama Negra (Yacana) y la Cruz del Sur.',
      description: 'Sesión nocturna con telescopio de alta precisión y sabio andino (Paqo) en la tranquilidad del Valle Sagrado.',
      image: '/images/bento-astronomia.webp',
      fallbackImage: '/images/bento-astronomia.webp',
      colSpanDesktop: 1,
      badgeText: 'CIELO LIMPIO 3,000M',
    },
    {
      id: 'panoramic-train',
      title: 'Expedición Ferroviaria de Época',
      category: 'CONFORT PANORÁMICO',
      tagline: 'Madera pulida, cristales envolventes y coctelería de autor.',
      description: 'El viaje hacia la ciudadela inca se transforma en un banquete sensorial deslizándose junto a las aguas del río sagrado.',
      image: '/images/bento-tren.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1761950143597-69cef2686bfa?q=80&w=1200&auto=format&fit=crop',
      colSpanDesktop: 1,
      badgeText: 'VAGÓN OBSERVATORIO',
    },
    {
      id: 'sacred-wellness',
      title: 'Sanación Ancestral & Baños Termales',
      category: 'BIENESTAR INTEGRAL',
      tagline: 'Ritual de Pago a la Tierra, aromaterapia de muña silvestre y piedras volcánicas.',
      description: 'Restaura tus músculos tras las caminatas con masajes diseñados para la oxigenación celular en altura.',
      image: '/images/bento-wellness.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
      colSpanDesktop: 2,
      badgeText: 'SPA DE ALTURA PRIVADO',
    },
  ],
  acclimatizationProtocol: [
    {
      day: 'Día 1',
      phase: 'Recepción & Reposo Consciente',
      altitudeRange: '3,399 msnm (Cusco)',
      recommendation:
        'Llegada matutina, traslado a hotel con oxigenación enriquecida. Ingesta abundante de agua y mate tradicional de muña y hojas de coca.',
      medicalNote:
        'Monitoreo de oximetría de pulso en check-in. Evitar esfuerzos cardiovasculares intensos las primeras 8 horas.',
    },
    {
      day: 'Día 2',
      phase: 'Descenso Táctico al Valle Sagrado',
      altitudeRange: '2,870 msnm (Urubamba / Ollantaytambo)',
      recommendation:
        'Descender a una cota 500m menor disminuye la presión hipobárica y favorece una adaptación cardiorrespiratoria gradual, natural y segura.',
      medicalNote:
        'Caminatas suaves en terrazas agrícolas de Moray para estimular la ventilación pulmonar sin fatiga muscular.',
    },
    {
      day: 'Día 3 en adelante',
      phase: 'Ascenso & Exploración de Altura',
      altitudeRange: 'Hasta 4,630 msnm',
      recommendation:
        'El organismo ha iniciado su proceso de adaptación a la hipoxia de altura. Inicio de los senderos a Machu Picchu y Salkantay con guía WFR y monitoreo diario.',
      medicalNote:
        'Kit de oxígeno medicinal de flujo continuo y botiquín de emergencia de alta montaña presente en todo momento.',
    },
  ],
  testimonials: [
    {
      id: 'rev-01',
      author: 'Eleanor & Arthur Vance',
      origin: 'Londres, Reino Unido',
      flag: '🇬🇧',
      tripType: 'Machu Picchu: Amanecer Sagrado Privado',
      category: 'Machu Picchu Signature',
      quote:
        'Contratamos el servicio privado con tren panorámico y pernocte en Aguas Calientes. Cuando nuestro vuelo de conexión Lima-Cusco se retrasó por meteorología, el concierge en Cusco reconfiguró toda la logística de traslados y boletos de circuito sin fricción. Ingresamos a la ciudadela al alba en un silencio sobrecogedor.',
      highlight: 'Resolución logística impecable y acceso prioritario al alba',
      rating: 5,
      date: 'Septiembre 2026',
      avatarInitials: 'EV',
    },
    {
      id: 'rev-02',
      author: 'Dr. Carlos & Mariana Silveira',
      origin: 'São Paulo, Brasil',
      flag: '🇧🇷',
      tripType: 'Valle Sagrado de los Incas & Machu Picchu Confort',
      category: 'Familias & Parejas',
      quote:
        'Viajamos con mi madre de 68 años y la altitud era nuestra mayor preocupación. La decisión de descender de inmediato al Valle Sagrado a 2,870m, sumada al chequeo de oximetría del guía certificado WFR, hizo que la adaptación fuera perfecta. Cero síntomas, confort absoluto y calidez humana inigualable.',
      highlight: 'Seguridad médica preventiva para adultos mayores y familias',
      rating: 5,
      date: 'Agosto 2026',
      avatarInitials: 'CS',
    },
    {
      id: 'rev-03',
      author: 'Sebastian & Chloé Dupont',
      origin: 'Ginebra, Suiza',
      flag: '🇨🇭',
      tripType: 'Salkantay Sky Domes & Glamping VIP',
      category: 'Salkantay Glamping',
      quote:
        'Como montañistas en los Alpes, somos muy rigurosos con la logística de montaña. Los domos geodésicos a 3,900m con calefacción radiante, el chef de altura preparando insumos frescos locales y el respaldo de oxígeno medicinal superaron nuestras expectativas. El equipo en tierra es 100% propio y sumamente profesional.',
      highlight: 'Glamping de alta montaña con rigurosos estándares alpinos',
      rating: 5,
      date: 'Julio 2026',
      avatarInitials: 'SD',
    },
    {
      id: 'rev-04',
      author: 'David K. Miller',
      origin: 'Nueva York, Estados Unidos',
      flag: '🇺🇸',
      tripType: 'Camino Inca Clásico VIP: Porteadores de Honor',
      category: 'Camino Inca VIP',
      quote:
        'El Camino Inca con este nivel de servicio es excepcional. Dormir en carpas suite con camas reales de campaña y contar con masajes musculares tras cada jornada de ascenso cambió la experiencia por completo. Además, constatar en persona el trato respetuoso, seguro médico y remuneración justa a los porteadores quechuas de Huilloc fue inspirador.',
      highlight: 'Trato ético certificado a porteadores y hospitalidad de autor',
      rating: 5,
      date: 'Junio 2026',
      avatarInitials: 'DM',
    },
    {
      id: 'rev-05',
      author: 'Valerie & Marc Lindemann',
      origin: 'Berlín, Alemania',
      flag: '🇩🇪',
      tripType: 'Montaña de 7 Colores: Vinicunca & Valle Rojo VIP',
      category: 'Familias & Parejas',
      quote:
        'La salida privada a las 03:30 AM fue la clave: alcanzamos el mirador a 5,036 msnm antes de que comenzaran a llegar los grupos masivos. Disfrutamos de 45 minutos en soledad frente al Apu Ausangate, acompañados de un desayuno andino caliente preparado por el chef en nuestro domo base.',
      highlight: 'Llegada prioritaria al mirador de Vinicunca al alba',
      rating: 5,
      date: 'Octubre 2026',
      avatarInitials: 'VL',
    },
    {
      id: 'rev-06',
      author: 'Beatriz & Alejandro Mendonça',
      origin: 'Madrid, España',
      flag: '🇪🇸',
      tripType: 'Valle Sagrado de los Incas: Moray & Maras VIP',
      category: 'Machu Picchu Signature',
      quote:
        'Transparencia total desde la propuesta inicial. No hubo cobros sorpresa por entradas ni traslados imprevistos. El paseo en Caballos Peruanos de Paso por las haciendas del valle y la cata botánica privada de maíz y tubérculos nativos fueron el punto culminante de nuestro viaje a Perú.',
      highlight: 'Tarifas transparentes todo incluido y exclusividad cultural',
      rating: 5,
      date: 'Mayo 2026',
      avatarInitials: 'BM',
    },
  ],
  faqs: [
    {
      id: 'faq-01',
      category: 'Reservas & Acceso',
      question: '¿Cómo garantizan los boletos de ingreso a Machu Picchu y trenes de lujo?',
      answer:
        'Gestionamos de manera inmediata y nominal la adquisición de boletos oficiales en los circuitos preferenciales más solicitados (Circuitos 1 y 2 panorámicos) ante el Ministerio de Cultura del Perú y la Dirección Desconcentrada de Cultura de Cusco. Sus asientos en trenes panorámicos (Vistadome Observatory o Belmond Hiram Bingham) se emiten con confirmación formal entregada con semanas de anticipación, eliminando cualquier incertidumbre logística.',
      highlightNote: 'Boletos 100% nominales y garantizados con confirmación digital formal',
    },
    {
      id: 'faq-02',
      category: 'Salud & Altitud',
      question: '¿Qué protocolos aplican para prevenir y tratar el mal de altura (soroche)?',
      answer:
        'Nuestra metodología sigue las directrices internacionales de medicina de montaña (Wilderness Medical Society): diseñamos el itinerario para descender el Día 1 al Valle Sagrado (2,870 msnm, cota 500m menor a Cusco), reduciendo la presión hipobárica y permitiendo una adaptación fisiológica paulatina. Cada vehículo y expedición cuenta con tanques de oxígeno medicinal de flujo continuo, pulsioxímetros digitales y guías certificados Wilderness Medical First Responder (WFR).',
      highlightNote: 'Guía médico WFR y oxígeno medicinal continuo a bordo',
    },
    {
      id: 'faq-03',
      category: 'Privacidad & Operación',
      question: '¿Existe riesgo de ser agrupado con otros viajeros o de subcontratar servicios?',
      answer:
        'Garantía Contractual de Salida 100% Exclusiva: jamás mezclamos reservas ni agrupamos viajeros desconocidos en un mismo transporte o guiado. Nuestra flota 4x4, choferes profesionales, guías arqueólogos de cabecera y campamentos geodésicos son de operación directa propia. En servicios ferroviarios y hotelería colaboramos exclusivamente con las marcas de mayor prestigio en Perú (Belmond, PeruRail, Sumaq, Inkaterra, Tambo del Inka) garantizando las categorías superiores contratadas.',
      highlightNote: 'Operación terrestre 100% privada · Alianzas oficiales con las mejores marcas',
    },
    {
      id: 'faq-04',
      category: 'Contingencia & Flexibilidad',
      question: '¿Qué sucede si se presentan cancelaciones de vuelos, lluvias o huelgas locales?',
      answer:
        'La geografía andina exige capacidad de maniobra inmediata. Nuestro Despacho Concierge en Cusco opera con Protocolo de Contingencia Permanente: ante demoras climáticas de trenes o retrasos de vuelos en Lima, reasignamos transferencias privadas, reprogramamos turnos de ingreso arqueológico y reajustamos pernoctes en hoteles de nuestra red aliada sin cargos de penalidad adicionales para el viajero.',
      highlightNote: 'Despacho de contingencia en tiempo real con reprogramación sin penalidad',
    },
    {
      id: 'faq-05',
      category: 'Transparencia Financiera',
      question: '¿Las tarifas cotizadas tienen cobros ocultos o cargos sorpresa en destino?',
      answer:
        'Política de Transparencia Total: el precio final pactado incluye traslados aeropuerto-hotel-estación en privado, boletos oficiales a la Llaqta de Machu Picchu y sitios arqueológicos del boleto turístico integral, trenes de alta gama seleccionados, chefs privados con gastronomía de terroir, equipos de campamento de montaña y remuneración digna legalmente cubierta para el equipo de porteadores y arrieros.',
      highlightNote: 'Tarifas transparentes sin sorpresas en destino ni cargos no especificados',
    },
    {
      id: 'faq-06',
      category: 'Sostenibilidad & Ética',
      question: '¿Cómo protegen y retribuyen a los porteadores y arrieros andinos?',
      answer:
        'Operamos bajo el Estándar de Trato Digno Certificado en convenio con las comunidades quechuas de Huilloc y Chillca: nuestros porteadores cuentan con contrato formal, seguro médico privado contra accidentes, carpas térmicas habitables independientes, alimentación balanceada de alta energía idéntica a la del campamento, pesaje estricto de carga (máximo 20 kg regulado) y honorarios un 40% superiores al mínimo fijado por la Ley del Porteador Nº 31614.',
      highlightNote: 'Salarios justos +40%, seguro integral y equipamiento de alta montaña',
    },
    {
      id: 'faq-07',
      category: 'Equipaje & Logística',
      question: '¿Qué equipaje debo llevar y cómo se gestionan las maletas pesadas?',
      answer:
        'Los trenes a Machu Picchu admiten un equipaje de mano de hasta 5 kg por pasajero por normativa de seguridad ferroviaria. Nuestro servicio incluye la custodia segura y traslado privado de su equipaje de bodega principal entre su hotel en Cusco y el resort en el Valle Sagrado o Machu Picchu Pueblo, garantizando que sus pertenencias siempre le esperen en su suite al culminar la travesía.',
      highlightNote: 'Traslado y custodia de equipaje pesado incluido sin complicaciones',
    },
    {
      id: 'faq-08',
      category: 'Planificación de Viaje',
      question: '¿Cuál es la mejor época del año para viajar y cómo influye la temporada de lluvias?',
      answer:
        'La temporada seca va de Mayo a Octubre, caracterizada por días soleados de cielo azul profundo, noches frescas y condiciones óptimas para caminatas y fotografía de cumbres. De Noviembre a Abril transcurre la temporada de lluvias andinas: los valles lucen intensamente verdes, las orquídeas florecen en el bosque de nubes y la afluencia de turistas es significativamente menor. Operamos expediciones de alta gama todo el año con equipo impermeable y logística adaptada.',
      highlightNote: 'Mayo - Octubre (sol y senderos secos) · Noviembre - Abril (paisajes verdes y tranquilidad)',
    },
    {
      id: 'faq-09',
      category: 'Permisos & Temporadas',
      question: '¿Por qué cierra el Camino Inca en febrero y con cuánta antelación debo reservar?',
      answer:
        'Por disposición oficial del Ministerio de Cultura y el SERNANP, el Camino Inca Clásico cierra obligatoriamente durante todo el mes de febrero para labores de mantenimiento y preservación de la calzada de piedra y los ecosistemas de ceja de selva. Los permisos oficiales diarios están estrictamente limitados a 500 cupos en total (incluyendo porteadores y guías). Recomendamos reservar con un mínimo de 4 a 6 meses de anticipación (o hasta 8 meses para mayo, junio y julio).',
      highlightNote: 'Cierre total en febrero por conservación · Reservar permisos con 4 a 6 meses de anticipación',
    },
    {
      id: 'faq-10',
      category: 'Términos & Cancelaciones',
      question: '¿Cuáles son las políticas de depósito, pago final y cancelación?',
      answer:
        'Para bloquear y emitir sus permisos gubernamentales oficiales (Machu Picchu y Camino Inca, que por ley estatal son estrictamente nominales e intransferibles) y asegurar sus asientos de tren, se requiere un depósito inicial del 30% al confirmar la reserva. El saldo restante del 70% se cancela 30 días antes del inicio del viaje. Ofrecemos reprogramación flexible sin penalidad y aplicación del 100% de los fondos abonados a futuras fechas en caso de emergencias médicas debidamente justificadas o cancelaciones de vuelos por causas de fuerza mayor.',
      highlightNote: 'Depósito inicial del 30% · Saldo 30 días antes · Políticas de flexibilidad por fuerza mayor',
    },
  ],
};

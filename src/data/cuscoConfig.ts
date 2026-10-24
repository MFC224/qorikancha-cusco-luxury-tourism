/**
 * CONFIGURACIÓN MAESTRA Y FUENTE DE LA VERDAD - PLANTILLA TURÍSTICA CUSCO LUXURY
 * Centraliza metadatos de destino, catálogo de expediciones, telemetría geográfica,
 * canales de conversión y protocolos de experiencia de ultralujo.
 */

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
  coordinates: {
    lat: number;
    lng: number;
  };
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
}

export interface AcclimatizationRule {
  day: string;
  phase: string;
  altitudeRange: string;
  recommendation: string;
  medicalNote: string;
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
    privacyEmail: string;
    claimsEmail: string;
    dpoContact: string;
    dataBankRegistration: string;
    applicableLaw: string;
  };
  concierge: {
    whatsappNumber: string; // Formato internacional sin símbolos para la API
    displayPhone: string;
    email: string;
    operatingHours: string;
    responseAverage: string;
    generateWhatsAppUrl: (options?: { expeditionTitle?: string; guests?: number; month?: string }) => string;
  };
  expeditions: Expedition[];
  waypoints: Waypoint[];
  bentoExperiences: BentoExperience[];
  acclimatizationProtocol: AcclimatizationRule[];
}

export const cuscoConfig: CuscoMasterConfig = {
  destination: {
    name: 'Cusco & Valle Sagrado',
    region: 'Andes del Sur',
    country: 'Perú',
    tagline: 'Donde el Tiempo se Rinde ante la Piedra Sagrada',
    subtagline: 'Expediciones privadas de ultralujo, lodges geodésicos de altura y arqueología vivencial en el ombligo del mundo.',
    manifesto:
      'No visitamos los Andes; nos dejamos transformar por ellos. Creamos travesías privadas diseñadas con reverencia ancestral, confort contemporáneo absoluto y la intimidad que solo los grandes santuarios de la Tierra pueden otorgar.',
    coordinates: {
      lat: -13.1631,
      lng: -72.5450,
      formatted: '13.1631° S · 72.5450° W',
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
    legalName: 'Qorikancha Private Sanctuary & Alpine Expeditions SAC',
    edition: 'Colección Privada 2026/2027',
    officialBadges: [
      'Operador Oficial Certificado MINCETUR',
      'Wilderness Medical First Responder (WFR) en cada expedición',
      'Certificación Carbono Neutro & Porteadores con Trato Digno Certificado',
      'World Travel Awards: South America’s Leading Cultural Destination',
    ],
    guarantees: [
      'Salidas 100% privadas y personalizadas a tu propio ritmo',
      'Acceso arqueológico preferencial en franjas horarias de baja afluencia',
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
    privacyEmail: 'privacidad@cusco-luxury-expeditions.com',
    claimsEmail: 'reclamaciones@cusco-luxury-expeditions.com',
    dpoContact: 'dpo@cusco-luxury-expeditions.com',
    dataBankRegistration: 'RNPDP-PJP-00892',
    applicableLaw: 'Leyes de la República del Perú y Estándares Internacionales (GDPR, CCPA)',
  },
  concierge: {
    whatsappNumber: '51984000000',
    displayPhone: '+51 984 000 000',
    email: 'concierge@qorikancha-expeditions.com',
    operatingHours: 'Atención 24/7 para huéspedes y expedicionarios activos',
    responseAverage: 'Menos de 15 minutos en WhatsApp VIP',
    generateWhatsAppUrl: (options = {}) => {
      const { expeditionTitle, guests = 2, month = 'próximos meses' } = options;
      const baseText = expeditionTitle
        ? `¡Hola Qorikancha Expeditions! Deseo cotizar la expedición privada *"${expeditionTitle}"* para ${guests} personas durante el mes de ${month}. ¿Tienen disponibilidad y asesoría de aclimatación?`
        : `¡Hola Qorikancha Expeditions! Quisiera diseñar un itinerario a medida de ultralujo para ${guests} personas en Cusco y Machu Picchu. Agradezco su atención.`;
      return `https://wa.me/51984000000?text=${encodeURIComponent(baseText)}`;
    },
  },
  expeditions: [
    {
      id: 'machu-picchu-sunrise',
      title: 'Machu Picchu: Amanecer Sagrado Privado',
      subtitle: 'Acceso exclusivo al romper el alba, tren Hiram Bingham y arqueólogo de cabecera',
      badge: 'EXPERIENCIA SIGNATURE',
      duration: '2 Días / 1 Noche',
      maxAltitude: '2,430 msnm',
      altitudeMeters: 2430,
      difficulty: 'Suave / Confort',
      image: '/images/machu-picchu-sunrise.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Vagón observatorio con coctelería andina y música en vivo',
        'Ingreso a la ciudadela en el primer turno místico antes de multitudes',
        'Almuerzo degustación privado en Belmond Sanctuary Lodge',
      ],
      summary:
        'Despierta frente a la maravilla del mundo envuelta en la niebla matutina. Una inmersión arqueológica guiada por maestros historiadores que revelan la astronomía y la cosmología inca en cada piedra pulida.',
      pricePerPerson: 'Desde $1,850 USD',
      coordinates: { lat: -13.1631, lng: -72.5450 },
    },
    {
      id: 'salkantay-sky-domes',
      title: 'Salkantay Sky Domes & Laguna Humantay',
      subtitle: 'Domos geodésicos de cristal a 3,900 msnm bajo la Vía Láctea andina',
      badge: 'ALTA MONTAÑA & GLAMPING',
      duration: '4 Días / 3 Noches',
      maxAltitude: '4,630 msnm (Paso Salkantay)',
      altitudeMeters: 4630,
      difficulty: 'Moderado - Exigente',
      image: '/images/salkantay-domes.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Paredes y techos acristalados para contemplar constelaciones estelares',
        'Aguas turquesas de la Laguna Humantay en horario privado al atardecer',
        'Campamentos con calefacción radiante, edredones de pluma y chef de altura',
      ],
      summary:
        'La simbiosis perfecta entre la naturaleza salvaje de la cordillera del Vilcabamba y el confort futurista. Conquista el imponente paso del Apu Salkantay y desciende a la ceja de selva virgen.',
      pricePerPerson: 'Desde $2,400 USD',
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
        'Carpas habitables dobles con camas reales y plumones térmicos',
        'Fisioterapeuta y masajes terapéuticos al concluir cada jornada de ascenso',
        'Llegada triunfal a Machu Picchu por la mítica Puerta del Sol (Inti Punku)',
      ],
      summary:
        'Recorre las losas de piedra original que pisaron los soberanos incas. Una hazaña física inolvidable compensada con el más alto estándar de hospitalidad de montaña del mundo.',
      pricePerPerson: 'Desde $2,950 USD',
      coordinates: { lat: -13.2500, lng: -72.5000 },
    },
    {
      id: 'valle-sagrado-ausangate',
      title: 'Valle Sagrado Místico & Lagunas del Ausangate',
      subtitle: 'Terrazas de Moray, salineras de Maras y lagunas sagradas a caballo de paso',
      badge: 'BIENESTAR & TRADICIÓN',
      duration: '3 Días / 2 Noches',
      maxAltitude: '4,300 msnm',
      altitudeMeters: 4300,
      difficulty: 'Moderado',
      image: '/images/valle-sagrado.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Experiencia de alta cocina andina inspirada en ecosistemas de altura',
        'Paseo privado en Caballos Peruanos de Paso por haciendas coloniales',
        'Sesión privada de baños termales con vista directa a picos nevados',
      ],
      summary:
        'El refugio fértil del río Vilcanota. Explora el centro de experimentación agrícola de Moray y relájate en santuarios boutique diseñados para restaurar cuerpo y espíritu.',
      pricePerPerson: 'Desde $2,100 USD',
      coordinates: { lat: -13.3283, lng: -72.1969 },
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
      coordinates: { lat: -13.5319, lng: -71.9675 },
    },
    {
      id: 'chinchero-moray',
      name: 'Chinchero & Moray',
      quechuaName: 'Chinchero & Muray',
      elevationMeters: 3762,
      elevationDisplay: '3,762 msnm',
      estimatedTransitTime: '45 min desde Cusco',
      travelMode: 'Van Privada 4x4',
      description: 'Cuna del arte textil de alpaca fina y los gigantescos anfiteatros concéntricos de aclimatación de semillas incas.',
      highlight: 'Tintes naturales ancestrales y laboratorio agrícola de altura.',
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
      coordinates: { lat: -13.3333, lng: -72.5667 },
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
      fallbackImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
      colSpanDesktop: 2,
      badgeText: 'MENÚ MARIDAJE 8 TIEMPOS',
    },
    {
      id: 'astronomy-vilcanota',
      title: 'Cosmovisión & Astronomía Inca',
      category: 'CIELO ESTELAR NOCTURNO',
      tagline: 'Las constelaciones oscuras: La Llama Negra (Yacana) y la Cruz del Sur.',
      description: 'Sesión nocturna con telescopio de alta precisión y sabio andino (Paqo) en la tranquilidad del Valle Sagrado.',
      image: '/images/bento-astronomia.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
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
      fallbackImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
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
      recommendation: 'Llegada matutina, traslado a hotel con oxigenación enriquecida. Ingesta abundante de mate de muña y hojas de coca.',
      medicalNote: 'Monitoreo de oximetría de pulso en check-in. Evitar esfuerzos cardiovasculares bruscos las primeras 8 horas.',
    },
    {
      day: 'Día 2',
      phase: 'Descenso Táctico al Valle Sagrado',
      altitudeRange: '2,800 msnm (Urubamba / Ollantaytambo)',
      recommendation: 'Descender a una cota 600m menor disminuye la presión hipobárica y duplica la velocidad de adaptación de la hemoglobina.',
      medicalNote: 'Caminatas suaves en terrazas agrícolas de Moray para estimular la ventilación pulmonar sin fatiga.',
    },
    {
      day: 'Día 3 en adelante',
      phase: 'Conquista de Cumbres & Travesías',
      altitudeRange: 'Hasta 4,630 msnm',
      recommendation: 'El organismo ha estabilizado su producción de glóbulos rojos. Inicio de los senderos a Machu Picchu y Salkantay con guía WFR.',
      medicalNote: 'Kit de oxígeno medicinal de respaldo y botiquín de emergencia de alta montaña presente en todo momento.',
    },
  ],
};

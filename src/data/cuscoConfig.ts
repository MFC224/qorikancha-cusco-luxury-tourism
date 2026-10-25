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
  testimonials: Testimonial[];
  faqs: FAQItem[];
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
    whatsappNumber: '51921195037',
    displayPhone: '+51 921 195 037',
    email: 'concierge@qorikancha-expeditions.com',
    operatingHours: 'Atención 24/7 para huéspedes y expedicionarios activos',
    responseAverage: 'Menos de 15 minutos en WhatsApp VIP',
    generateWhatsAppUrl: (options = {}) => {
      const { expeditionTitle, guests = 2, month = 'próximos meses' } = options;
      const baseText = expeditionTitle
        ? `¡Hola Qorikancha Expeditions! Deseo cotizar la expedición privada *"${expeditionTitle}"* para ${guests} personas durante el mes de ${month}. ¿Tienen disponibilidad y asesoría de aclimatación?`
        : `¡Hola Qorikancha Expeditions! Quisiera diseñar un itinerario a medida de ultralujo para ${guests} personas en Cusco y Machu Picchu. Agradezco su atención.`;
      return `https://wa.me/51921195037?text=${encodeURIComponent(baseText)}`;
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
      pricePerPerson: 'Desde $490 USD',
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
      pricePerPerson: 'Desde $580 USD',
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
      pricePerPerson: 'Desde $790 USD',
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
      pricePerPerson: 'Desde $140 USD',
      coordinates: { lat: -13.3283, lng: -72.1969 },
    },
    {
      id: 'vinicunca-rainbow-mountain',
      title: 'Montaña de 7 Colores: Vinicunca & Valle Rojo VIP',
      subtitle: 'Amanecer en la cumbre polícroma a 5,036 msnm antes de las multitudes con desayuno andino privado',
      badge: 'MARAVILLA NATURAL',
      duration: '1 Día Completo (04:00 - 16:30)',
      maxAltitude: '5,036 msnm',
      altitudeMeters: 5036,
      difficulty: 'Moderado - Exigente',
      image: '/images/vinicunca.webp',
      fallbackImage: 'https://images.unsplash.com/photo-1579606032834-c92330a6c0b9?q=80&w=1920&auto=format&fit=crop',
      highlights: [
        'Llegada prioritaria al mirador principal para fotos sin aglomeraciones',
        'Guía certificado WFR con pulsioxímetro y kit de oxígeno medicinal a bordo',
        'Desayuno gourmet y almuerzo andino de altura en domo privado de campo',
        'Extensión panorámica opcional hacia el sobrecogedor Valle Rojo',
      ],
      summary:
        'Descubre la majestuosa estratigrafía mineral de los Andes cusqueños. Una experiencia de alta montaña que desafía los sentidos con franjas turquesas, doradas y púrpuras talladas por millones de años de sedimentación geológica.',
      pricePerPerson: 'Desde $160 USD',
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
  testimonials: [
    {
      id: 'rev-01',
      author: 'Eleanor & Arthur Vance',
      origin: 'Londres, Reino Unido',
      flag: '🇬🇧',
      tripType: 'Machu Picchu: Amanecer Sagrado Privado',
      category: 'Machu Picchu Signature',
      quote:
        'Contratamos el servicio privado con tren Hiram Bingham. Lo que realmente diferenció a Qorikancha fue cuando nuestro vuelo Lima-Cusco se retrasó por neblina: el despacho Concierge 24/7 reconfiguró toda la logística de trenes y boletos de circuito sin que tuviéramos que preocuparnos por nada. Llegamos a la ciudadela al amanecer prácticamente a solas.',
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
      tripType: 'Valle Sagrado & Machu Picchu Confort',
      category: 'Familias & Parejas',
      quote:
        'Viajamos con mi madre de 68 años y el mal de montaña era mi mayor inquietud. La estrategia de descender de inmediato al Valle Sagrado a 2,800m, sumada al monitoreo de oximetría matutino del guía médico WFR, hizo que la adaptación fuera perfecta. Ningún síntoma, confort absoluto y calidez humana inigualable.',
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
      tripType: 'Salkantay Sky Domes & Laguna Humantay',
      category: 'Salkantay Glamping',
      quote:
        'Como montañistas en los Alpes, somos muy exigentes con la logística de montaña. Los domos geodésicos a 3,900m con calefacción radiante, el chef privado cocinando insumos orgánicos de altura y el equipo de rescate con oxígeno medicinal propio superaron cualquier expectativa. Cero subcontrataciones; todo el personal es de planta propia.',
      highlight: 'Glamping de alta montaña con estándares alpinos suizos',
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
        'He hecho safaris en África y expediciones en la Patagonia, y este Camino Inca está en otra categoría. Dormir en carpas suite con camas de altura real y recibir masajes terapéuticos al concluir cada jornada fue increíble. Además, corroborar personalmente que los porteadores cuentan con equipamiento térmico de primera y salario digno no tiene precio.',
      highlight: 'Trato ético certificado a porteadores y hospitalidad de clase mundial',
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
        'El horario exclusivo a las 04:00 AM valió cada minuto de sueño: alcanzamos la cumbre a 5,036 msnm antes de que llegaran las masas de turistas. Estuvimos 40 minutos en contemplación íntima frente al Apu Ausangate con desayuno caliente en nuestro domo de campaña privado.',
      highlight: 'Llegada prioritaria al mirador de Vinicunca sin aglomeraciones',
      rating: 5,
      date: 'Octubre 2026',
      avatarInitials: 'VL',
    },
    {
      id: 'rev-06',
      author: 'Beatriz & Alejandro Mendonça',
      origin: 'Madrid, España',
      flag: '🇪🇸',
      tripType: 'Valle Sagrado Místico & Terrazas de Moray',
      category: 'Machu Picchu Signature',
      quote:
        'Transparencia total desde el minuto uno. No hubo cobros sorpresa por entradas, transferencias ni propinas imprevistas. El paseo en Caballos Peruanos de Paso por las haciendas coloniales y la cata botánica con maridaje fueron el punto culminante de nuestro paso por Perú.',
      highlight: 'Tarifas transparentes all-inclusive y exclusividad cultural',
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
        'Gestionamos de manera inmediata y nominal la adquisición de boletos oficiales en los circuitos preferenciales más solicitados (Circuitos 1 y 2 panorámicos) ante el Ministerio de Cultura del Perú y la Dirección Desconcentrada de Cultura de Cusco. Sus asientos en los trenes de lujo (Belmond Hiram Bingham o Inca Rail First Class) se emiten con confirmación digital formal entregada semanas antes de su arribo, eliminando cualquier incertidumbre logística.',
      highlightNote: 'Boletos 100% nominales y auditados antes del viaje',
    },
    {
      id: 'faq-02',
      category: 'Salud & Altitud',
      question: '¿Qué protocolos aplican para prevenir y tratar el mal de altura (soroche)?',
      answer:
        'Nuestra metodología combina medicina de montaña contemporánea y aclimatación táctica: diseñamos el itinerario para descender el Día 1 al Valle Sagrado (2,800 msnm, cota 600m menor a Cusco), reduciendo la presión hipobárica en un 40%. Cada van privada y expedición cuenta con tanques de oxígeno medicinal de flujo continuo, pulsioxímetros digitales y guías con certificación internacional Wilderness Medical First Responder (WFR).',
      highlightNote: 'Guía médico WFR y oxígeno medicinal continuo a bordo',
    },
    {
      id: 'faq-03',
      category: 'Privacidad & Operación',
      question: '¿Existe riesgo de ser agrupado con otros viajeros o subcontratar servicios?',
      answer:
        'Garantía contractual de Salida 100% Privada: nunca mezclamos reservas ni agrupamos expedicionarios desconocidos en un mismo transporte o guiado. Toda nuestra flota vehicular 4x4, choferes profesionales, historiadores de cabecera y campamentos geodésicos son operados bajo supervisión directa de Qorikancha Expeditions sin recurrir a agencias mayoristas genéricas.',
      highlightNote: 'Cero subcontratación · Vehículos y guías 100% dedicados a tu grupo',
    },
    {
      id: 'faq-04',
      category: 'Contingencia & Flexibilidad',
      question: '¿Qué sucede si se presentan cancelaciones de vuelos, lluvias o bloqueos locales?',
      answer:
        'La geografía andina exige capacidad de maniobra inmediata. Nuestro Despacho Concierge 24/7 en Cusco opera con Protocolo de Plan B Permanente: si el tren sufre una demora meteorológica o un vuelo se posterga, reasignamos transferencias privadas, reprogramamos turnos de ingreso arqueológico y reajustamos las noches en hoteles boutique de nuestra red aliada sin cargos de penalidad adicionales para el viajero.',
      highlightNote: 'Despacho de contingencia 24/7 con reasignación en tiempo real',
    },
    {
      id: 'faq-05',
      category: 'Transparencia Financiera',
      question: '¿Las tarifas cotizadas tienen cobros ocultos o cargos sorpresa en destino?',
      answer:
        'Política de Transparencia Total: el precio final pactado incluye traslados aeropuerto-hotel-estación en privado, boletos oficiales a la Llaqta de Machu Picchu y sitios arqueológicos del boleto turístico integral, trenes de alta gama seleccionados, chefs privados con gastronomía de terroir, equipos de campamento de montaña y remuneración digna legalmente cubierta para el equipo de porteadores y arrieros.',
      highlightNote: 'Tarifas all-inclusive sin sorpresas en efectivo ni cobros imprevistos',
    },
    {
      id: 'faq-06',
      category: 'Sostenibilidad & Ética',
      question: '¿Cómo protegen y retribuyen a los porteadores y arrieros andinos?',
      answer:
        'Operamos bajo el Estándar de Trato Digno Certificado: nuestros porteadores son tratados como héroes de montaña. Cuentan con contrato formal, seguro médico privado contra accidentes, carpas térmicas habitables independientes, alimentación balanceada de alta energía idéntica a la del campamento base, pesaje estricto de carga (máximo 20 kg regulado) y honorarios un 40% superiores al mínimo fijado por la Ley del Porteador Nº 31614.',
      highlightNote: 'Salarios justos +40%, seguro integral y equipamiento de alta montaña',
    },
    {
      id: 'faq-07',
      category: 'Equipaje & Logística',
      question: '¿Qué equipaje debo llevar y cómo se gestionan las maletas pesadas?',
      answer:
        'Los trenes a Machu Picchu admiten un equipaje de mano de hasta 5 kg por pasajero por normativa de seguridad ferroviaria. Nuestro servicio incluye la custodia segura y traslado privado de su equipaje de bodega principal entre su hotel en Cusco y el resort en el Valle Sagrado o Machu Picchu Pueblo, garantizando que sus pertenencias de lujo siempre le esperen en su suite al culminar la travesía.',
      highlightNote: 'Traslado y custodia de equipaje pesado incluido sin complicaciones',
    },
  ],
};

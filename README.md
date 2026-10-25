# 🏔️ QORIKANCHA CUSCO LUXURY EXPEDITIONS
### Plantilla Web Turística de Ultralujo · Nivel Awwwards / Estilo Enky & We Are Brand
#### Next.js 15 (App Router), Tailwind CSS, Lenis Smooth Scroll, GSAP 3 ScrollTrigger, TypeScript

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMFC224%2Fqorikancha-cusco-luxury-tourism)

> **Repositorio Oficial:** [github.com/MFC224/qorikancha-cusco-luxury-tourism](https://github.com/MFC224/qorikancha-cusco-luxury-tourism)  
> **Concierge WhatsApp:** [+51 921 195 037](https://wa.me/51921195037)  
> **Estándar de Producción**: Desarrollada para agencias de viajes receptivas de alta gama, operadores boutique y creadores digitales. Centraliza todo el contenido en una única fuente de la verdad (`src/data/cuscoConfig.ts`), permitiendo personalizar cualquier destino en **menos de 3 minutos**.

---

## 🌟 Características y Experiencia de Usuario (UI/UX)

1. **Fotografía 100% Auténtica de Cusco en Formato WebP**:
   - Curaduría de alta resolución optimizada: Plaza de Armas del Cusco, Machu Picchu al amanecer, Salkantay & Laguna Humantay, Camino Inca milenario, terrazas de Moray y Montaña de 7 Colores (Vinicunca).
2. **5 Grandes Expediciones con Rutas SSG Individuales y Precios Calibrados al Segmento Ultralujo (USD)**:
   - Cada expedición cuenta con su propia URL indexable (`/expediciones/[slug]`), metadatos Open Graph, Schema `TouristTrip` y desglose día por día:
     - **Machu Picchu Amanecer Sagrado Privado**: Desde **$890 USD** (con opción Hiram Bingham upgrade desde $1,850 USD).
     - **Salkantay Sky Domes & Humantay Glamping**: Desde **$1,280 USD** (4D/3N con domos calefaccionados y chef privado).
     - **Camino Inca Clásico VIP (Porteadores de Honor)**: Desde **$1,480 USD** (carpas walk-in, duchas calientes y masajes de montaña).
     - **Valle Sagrado: Moray, Maras & Ollantaytambo**: Desde **$420 USD** (2,870 msnm, almuerzo campestre privado).
     - **Montaña de 7 Colores (Vinicunca & Valle Rojo VIP)**: Desde **$340 USD** (salida privada 03:30 AM con chef y caballo de auxilio).
3. **Planificador Multicanal de Consultas a Medida (`#contacto`)**:
   - Formulario bespoke para fechas, cantidad de viajeros, intereses y presupuesto.
   - Alternativas directas al WhatsApp: correo formal (`concierge@qorikancha.pe`) y agendamiento de videollamada privada de 15 minutos.
4. **Equipo de Liderazgo, Arqueología y Medicina de Montaña (`#nosotros`)**:
   - Presentación de directores con trayectoria verificable: Mateo Huamán Ccoya (Arqueólogo Residente), Dra. Sofía Valdivia (Directora Médica WFR).
   - Alianzas directas con comunidades quechuas de Huilloc y Chillca (canon directo y reforestación de queñuales).
   - Transparencia legal plena: Licencias MINCETUR Nº 2024-CUS-089, DIRCETUR-CUS-AG-04819, RUC 20608945123 y Póliza de Responsabilidad Civil Pacífico Seguros Nº 842109.
5. **Selector Bilingüe [ ES | EN ] & Accesibilidad Universal**:
   - Conmutador interactivo de idioma en el Header.
   - Soporte estricto para `prefers-reduced-motion` y compatibilidad total con navegación por teclado y lectores de pantalla.
6. **Bento Grid con Terroir Andino & Vagón de Época**:
   - **Vagón de Época**: Fotografía auténtica en Ollantaytambo con maderas pulidas y vajilla de autor.
   - **Maridaje de Terroir Andino**: Experiencias gastronómicas de 4 tiempos botánicos de altura.
7. **Cuaderno de Bitácora & Relatos de Expedicionarios**:
   - Reseñas transparentes y verificadas de expedicionarios internacionales con acreditaciones institucionales reales.
8. **Inteligencia de Viaje Práctica en FAQ**:
   - Respuestas a estacionalidad (temporada seca vs lluvias), cierre del Camino Inca en febrero, reserva de permisos con 4 a 6 meses de anticipación y políticas transparentes de depósito y cancelación.
9. **Cartografía Sagrada & Guía Médica de Aclimatación**:
   - Coordenadas geográficas exactas de Cusco (`13.5319° S · 71.9675° W`) y simulador barométrico de oxígeno sin afirmaciones médicas dudosas.
10. **Blindaje Legal, Privacidad & Cookies (Consent Mode v2 & INDECOPI)**:
    - Google Consent Mode v2 síncrono con bloqueo por defecto.
    - Banner con simetría visual estricta para "Rechazar No Esenciales".
    - 4 páginas legales completas: Privacidad (Ley Nº 29733, D.S. 016-2024-JUS, RGPD), Cookies, Términos y Libro de Reclamaciones Virtual.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `15.5+` | App Router, Server Components y compilación estática (SSG). |
| **Core UI** | React | `19.0+` | Renderizado reactivo y concurrent features. |
| **Lenguaje** | TypeScript | `5.0+` | Tipado estricto de expediciones, telemetría y configuraciones. |
| **Estilos** | Tailwind CSS | `3.4+` | Sistema de diseño de ultralujo Obsidian & Inti Gold. |
| **Animación & 3D** | GSAP 3 & ScrollTrigger | `3.12+` | Apilamiento de tarjetas, parallax de fondo y revelado de texto. |
| **Desplazamiento** | Lenis Scroll | `1.1+` | Inercia cinemática fluida a 60-120 fps. |
| **Iconografía** | Lucide React | Latest | Iconografía limpia y accesible. |

---

## 🚀 Despliegue en Vercel

El proyecto incluye `vercel.json` preconfigurado para despliegues instantáneos:

1. Realiza fork o push a tu repositorio en GitHub.
2. Importa el repositorio en [Vercel](https://vercel.com/new).
3. Vercel detectará automáticamente Next.js y compilará las 12 rutas estáticas en ~25 segundos.

---

© 2026 Qorikancha Private Sanctuary & Alpine Expeditions S.A.C. Todos los derechos reservados.

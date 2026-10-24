# 🏔️ PLANTILLA WEB TURÍSTICA DE ULTRALUJO · CUSCO & ANDEAN EXPEDITIONS
### Nivel Awwwards / Estilo Enky & We Are Brand · Next.js 15, Tailwind CSS, Lenis, GSAP 3

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMFC224%2Fqorikancha-cusco-luxury-tourism)

> **Repositorio Oficial:** [github.com/MFC224/qorikancha-cusco-luxury-tourism](https://github.com/MFC224/qorikancha-cusco-luxury-tourism)  
> **Estándar de Producción**: Desarrollada para agencias de viajes receptivas, operadores boutique de alta montaña y creadores digitales. Centraliza todo el contenido en una única fuente de la verdad (`src/data/cuscoConfig.ts`), permitiendo personalizar cualquier destino en **menos de 3 minutos**.

---

## 🌟 Características y Experiencia de Usuario (UI/UX)

1. **Inercia Cinemática a 60–120 FPS**:
   - Integración de **Lenis 1.1** acoplado al Ticker de **GSAP 3** como *Single-RAF Source of Truth*.
   - Desplazamiento ultra-suave sin tirones con soporte nativo para `prefers-reduced-motion` (Accesibilidad WCAG).

2. **Cursor Magnético Contextual por GPU**:
   - Interpolación por hardware mediante `gsap.quickTo` (cero latencia).
   - Lectura de atributos `data-cursor` ("SALKANTAY", "CONCIERGE", "VER MAPA", etc.) que transforman el cursor en un badge interactivo.
   - Desactivación automática en smartphones y tablets táctiles (`pointer: coarse`).

3. **Hero 100vh a Sangre (*Full-Bleed*)**:
   - Parallax continuo de fondo sobre fotografía 4K optimizada en WebP (<150 KB).
   - Máscaras tipográficas de revelado y barra de telemetría HUD en tiempo real (altitud, coordenadas GPS, clima andino y hora oficial de Perú).

4. **Apilamiento 3D de Tarjetas de Expedición (`CinematicCardStack`)**:
   - 4 tarjetas de 86vh que se encogen (`scale: 0.88`), rotan físicamente (`±2.2°`) y oscurecen con inercia de `scrub: 1.1` mientras la siguiente entra con nitidez de cine.

5. **Cartografía Sagrada & Perfil Altimétrico**:
   - Lienzo vectorial SVG interactivo de la ruta Cusco $\rightarrow$ Valle Sagrado $\rightarrow$ Aguas Calientes $\rightarrow$ Machu Picchu $\rightarrow$ Salkantay con waypoints activos por radar.
   - Selector dinámico a **Perfil de Elevación** que ilustra las cotas barométricas desde 2,040m hasta 4,630m.

6. **Guía Médica de Aclimatación con Simulador Biológico**:
   - Slider de altura interactivo que calcula la presión efectiva de oxígeno ($P = P_0 \cdot e^{-h/8400}$) y despliega recomendaciones médicas WFR.

7. **Bento Grid Asimétrico con 3D Tilt**:
   - Cuadrícula de 4 experiencias sensoriales con micro-inclinación física 3D reactiva al ratón (`perspective(1000px) rotateX/Y`) y reflejo *glare*.

8. **Motor de Conversión WhatsApp VIP sin Fricción**:
   - Modal express de 3 clics (Tour, Viajeros, Mes) que genera instantáneamente el enlace `https://wa.me/...` con el mensaje preformateado listo para enviar.
   - Barra flotante fija que aparece suavemente tras el 70% del scroll del Hero.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `15.5+` | App Router, Server Components y compilación estática ultra-rápida. |
| **Core UI** | React | `19.0+` | Renderizado reactivo y concurrent features. |
| **Lenguaje** | TypeScript | `5.7+` | Tipado estricto con cero errores o warnings. |
| **Estilos** | Tailwind CSS | `3.4+` | Sistema cromático "Andean Luxury & Sacred Earth". |
| **Inercia** | Lenis | `1.1+` | Scroll suave calibrado (`lerp: 0.08`, `duration: 1.2`). |
| **Animación** | GSAP & ScrollTrigger | `3.12+` | Líneas de tiempo, pinning, scrubbing y física 3D. |
| **Iconografía** | Lucide React | `0.475+` | Iconos vectoriales minimalistas. |

---

## 🚀 Cómo Iniciar el Proyecto

### 1. Clonar e Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar en Entorno de Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Compilar para Producción (Exportación Estática para Hosting $0)
```bash
npm run build
```
Genera una compilación estática hiper-optimizada con un peso de primer impacto de solo **~178 kB**.

---

## ⚙️ Guía de Personalización en 3 Minutos

Todo el contenido de la web está centralizado en un solo archivo:  
👉 **`src/data/cuscoConfig.ts`**

### Para cambiar el Número de WhatsApp del Concierge:
```typescript
concierge: {
  whatsappNumber: '51984000000', // Código de país + número sin símbolos ni espacios
  displayPhone: '+51 984 000 000',
  email: 'concierge@tu-agencia.com',
  ...
}
```

### Para añadir o modificar una Expedición:
Edita el arreglo `expeditions`:
```typescript
{
  id: 'nuevo-tour',
  title: 'Nombre de la Expedición',
  subtitle: 'Subtítulo poético',
  badge: 'EXPERIENCIA PRIVADA',
  duration: '3 Días / 2 Noches',
  maxAltitude: '4,200 msnm',
  image: '/images/tu-foto.webp',
  highlights: ['Hito 1', 'Hito 2', 'Hito 3'],
  summary: 'Descripción editorial de alto impacto...',
  pricePerPerson: 'Desde $1,800 USD',
  coordinates: { lat: -13.1631, lng: -72.5450 }
}
```

---

## 🌐 Despliegue Gratuito en la Nube (Costo $0)

Al ser una aplicación basada en Next.js optimizada con páginas estáticas, puedes alojarla de forma completamente gratuita con CDN global y certificado SSL automático en:

1. **Vercel**: Conecta tu repositorio de GitHub o ejecuta `npx vercel`.
2. **Cloudflare Pages**: Conecta el repositorio, framework preset: `Next.js`, build command: `npm run build`.
3. **Netlify**: Build command: `npm run build`, publish directory: `.next`.

---

## 📊 Métricas de Calidad & Auditoría

- **TypeScript Compilation:** Cero errores (`tsc --noEmit` clean).
- **ESLint Compliance:** Cero advertencias (`npm run lint` clean).
- **First Load JS:** `178 kB` (Carga ultraligera).
- **Velocidad de Renderizado:** 60 a 120 FPS sostenidos.
- **Auditoría Lighthouse Objetivo:** Performance >95, Accesibilidad >95, Best Practices >95, SEO 100.

---

© 2026 Qorikancha Expeditions / Plantilla de Turismo de Ultralujo. Licencia MIT.

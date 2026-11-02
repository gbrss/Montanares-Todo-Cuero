# 🤎 MONTANARES TODO CUERO — LANDING PAGE COMERCIAL

<div align="center">

[![Astro Version](https://img.shields.io/badge/Astro-v5.4.4-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deploy-Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![WhatsApp Business](https://img.shields.io/badge/WhatsApp-+56_9_2704_7529-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/56927047529)
[![Facebook Official](https://img.shields.io/badge/Facebook-Montanares_Todo_Cuero-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100054494468211)
[![License](https://img.shields.io/badge/Licencia-Apache_2.0-76513B?style=for-the-badge)](LICENSE)

**Plataforma Web Comercial & Catálogo Artesanal de Marroquinería de Cuero Genuino**

*Diseñado para transmitir autenticidad, calidez artesanal y captación directa de clientes mediante WhatsApp en Chile.*

[Explorar Catálogo](#-catálogo-comercial) • [Arquitectura](#-arquitectura-del-sistema) • [Identidad Visual](#-identidad-y-sistema-de-diseño) • [Instalación](#-guía-de-desarrollo)

---

</div>

## 📖 Tabla de Contenidos

- [1. Descripción del Proyecto](#-descripción-del-proyecto)
- [2. Identidad y Sistema de Diseño](#-identidad-y-sistema-de-diseño)
- [3. Características Destacadas](#-características-destacadas)
- [4. Arquitectura del Sistema](#-arquitectura-del-sistema)
- [5. Estructura de Archivos del Proyecto](#-estructura-de-archivos-del-proyecto)
- [6. Componentes y Módulos (.astro)](#-componentes-y-módulos-astro)
- [7. Flujo de Captación Comercial (WhatsApp)](#-flujo-de-captación-comercial-whatsapp)
- [8. Catálogo de Productos](#-catálogo-comercial)
- [9. SEO y Datos Estructurados](#-optimización-seo-y-rendimiento)
- [10. Guía de Desarrollo y Comandos](#-guía-de-desarrollo)
- [11. Créditos y Enlaces Oficiales](#-canales-oficiales)

---

## 📌 Descripción del Proyecto

**Montanares Todo Cuero** es un emprendimiento chileno dedicado a la talabartería y confección de artículos en cuero vacuno genuino. Este proyecto consiste en una **landing page comercial moderna, ultra-rápida y 100% responsive** desarrollada con **Astro JS**.

### Objetivos Clave:
- **Catálogo sin fricción:** Exhibición elegante de piezas de marroquinería organizadas por categorías (*Billeteras, Cinturones, Bolsos, Accesorios*).
- **Atención personalizada:** Cada botón de consulta deriva directamente al WhatsApp oficial con el producto específico ya identificado en el mensaje.
- **Cero código redundante:** Componentes nativos `.astro` sin la pesadez de frameworks SPA, asegurando tiempos de carga inmediatos y óptima puntuación en Google Core Web Vitals.
- **Experiencia Premium:** Implementación de Modo Oscuro, animaciones sutiles y visores de imágenes (Lightbox) interactivos.

---

## 🎨 Identidad y Sistema de Diseño

El concepto estético evoca la nobleza de los materiales naturales, la durabilidad y la tradición del trabajo en banco de taller.

### Paleta Cromática Oficial

| Tono | Nombre | Código HEX | Rol en la Interfaz | Muestra Visual |
| :--- | :--- | :---: | :--- | :---: |
| **Marrón Oscuro** | *Ebony Leather* | `#38271F` | Títulos primarios, botones principales, fondo modo oscuro | `■■■■■■` |
| **Marrón Cuero** | *Cognac Saddle* | `#76513B` | Acentos, estados hover, insignias secundarias | `■■■■■■` |
| **Beige Natural** | *Raw Tan* | `#D9C6A5` | Bordes sutiles, divisores, fondos de tarjetas suaves | `■■■■■■` |
| **Crema** | *Warm Parchment* | `#F7F2E9` | Fondo general del lienzo (modo claro), textos oscuros | `■■■■■■` |
| **Terracota** | *Earthy Clay* | `#A6533C` | Destacados sutiles y detalles de taller | `■■■■■■` |

### Tipografía

---

## ✨ Características Destacadas

- 🌗 **Modo Oscuro Completo:** Implementación nativa con Tailwind CSS y persistencia en `localStorage` (evita el parpadeo al cargar la página).
- 🖼️ **Visores Lightbox Interactivos:** Galería y Catálogo cuentan con visores a pantalla completa con navegación por teclado (Flechas y Esc).
- 🧭 **Scroll Spy Navigation:** El menú del Header resalta automáticamente la sección en la que se encuentra el usuario mediante `IntersectionObserver`.
- 🎬 **Animaciones Sutiles:** Efectos de entrada (Fade Up), zoom en imágenes (Paneo lento) y micro-interacciones en botones (Hover y Pulse Ring en WhatsApp).
- 🚀 **Optimización de Imágenes:** Uso del componente nativo de Astro y servicio `passthrough` para evitar conflictos con Cloudflare Pages.

---

## 🏛 Arquitectura del Sistema

---

## 📂 Estructura de Archivos del Proyecto

---

## 🧩 Componentes y Módulos (.astro)

| Componente | Archivo | Funcionalidad Principal |
| :--- | :--- | :--- |
| **Cabecera** | `Header.astro` | Marca, navegación con hover y scroll spy, botón de WhatsApp y toggle de modo oscuro. |
| **Hero** | `Hero.astro` | Título con tipografía Sancreek, efecto de entrada y animaciones de paneo en imagen. |
| **Tarjeta** | `ProductCard.astro` | Imagen en relación 4:3, descripción, botón directo de WhatsApp y estilos `dark:`. |
| **Catálogo** | `ProductGrid.astro` | Filtros instantáneos, modal de especificaciones y visor de imagen con zoom. |
| **Nosotros** | `About.astro` | Historia del taller, valor del corte manual y durabilidad garantizada. |
| **Galería** | `Gallery.astro` | Mosaico de texturas con **Lightbox interactivo** (navegación por flechas y tecla `Esc`). |
| **Testimonios** | `Testimonials.astro` | Citas de clientes con adaptación a modo oscuro. |
| **Contacto** | `Contact.astro` | Tarjetas oficiales y **generador de consultas personalizadas** hacia WhatsApp. |
| **Pie de Página**| `Footer.astro` | Navegación secundaria, logo con efecto glow y botón de retorno superior (JS). |
| **Botón Flotante**| `WhatsAppButton.astro`| Acceso permanente con animación pulsante, tooltip y cierre funcional. |

---

## 💬 Flujo de Captación Comercial (WhatsApp)

Para maximizar la tasa de conversión, el sitio no implementa pasarelas de pago complejas que aumentan la fricción, sino una integración directa con WhatsApp Business (`+56 9 2704 7529`):

---

## 💼 Catálogo Comercial

| Producto | Categoría | Material | Características Destacadas |
| :--- | :--- | :--- | :--- |
| **Billetera Clásica Bifold** | Billeteras & Tarjeteros | Cuero curtido al vegetal | Costura a dos agujas, ranuras reforzadas, acabado caramelo |
| **Cinturón Clásico Hebilla Bronce** | Cinturones | Cuero de grano entero (4mm) | Hebilla maciza de latón envejecido, pátina de larga vida |
| **Morral Bandolera Rústico** | Bolsos & Morrales | Cuero chestnut seleccionado | Correas regulables con hombrera, remaches en puntos de tensión |
| **Tarjetero Minimalista** | Billeteras & Tarjeteros | Piel genuina ámbar | Perfil extra fino, capacidad para 6 tarjetas y billetes |
| **Delantal Artesanal de Taller** | Accesorios & Taller | Cuero graso de alta resistencia| Arnés cruzado regulable, bolsillo frontal portaherramientas |
| **Bolso Duffle Fin de Semana** | Bolsos & Morrales | Cuero plena flor pull-up | Doble asa reforzada, gran capacidad, cremallera metálica |

---

## 🚀 Optimización SEO y Rendimiento

El proyecto cuenta con una implementación exhaustiva de optimización para motores de búsqueda:

- **Etiquetas Canónicas:** URL estandarizada a `montanares-todo-cuero.pages.dev`.
- **Open Graph y Twitter Cards:** Previsualizaciones ricas con imagen oficial (logo) al compartir enlaces.
- **Schema.org Structured Data:** Marcado `LocalBusiness` con número telefónico internacional y rango de precios.
- **Archivos Estándar:** `robots.txt` y `sitemap.xml`.
- **Zero CLS & Lazy Loading:** Dimensiones explícitas de relación de aspecto en imágenes y carga diferida nativa.

---

## 🛠 Guía de Desarrollo

### Requisitos Previos
- **Node.js**: Versión `22.x` o superior
- **NPM**: Gestor de paquetes nativo

### Comandos de Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en puerto 3000
npm run dev

# 3. Compilar bundle para producción
npm run build

# 4. Previsualizar la compilación localmente (con Wrangler)
npx wrangler pages dev ./dist

📞 Canales Oficiales
WhatsApp Comercial: +56 9 2704 7529

Perfil de Facebook: Montanares Todo Cuero

Sitio Web Oficial: montanares-todo-cuero.pages.dev

Cobertura: Despachos coordinados a Santiago y todas las regiones de Chile.

<div align="center"> <sub>© 2026 Montanares Todo Cuero. Marroquinería tradicional y artículos de cuero genuino hechos a mano en Chile.</sub> </div> ```

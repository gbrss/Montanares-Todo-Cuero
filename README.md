# 🪵 MONTANARES TODO CUERO — LANDING PAGE COMERCIAL

```
 ███    ███  ██████  ███    ██ ████████  █████  ███    ██  █████  ██████  ███████ ███████
 ████  ████ ██    ██ ████   ██    ██    ██   ██ ████   ██ ██   ██ ██   ██ ██      ██     
 ██ ████ ██ ██    ██ ██ ██  ██    ██    ███████ ██ ██  ██ ███████ ██████  █████   ███████
 ██  ██  ██ ██    ██ ██  ██ ██    ██    ██   ██ ██  ██ ██ ██   ██ ██   ██ ██           ██
 ██      ██  ██████  ██   ████    ██    ██   ██ ██   ████ ██   ██ ██   ██ ███████ ███████
                                    TODO CUERO
```

<div align="center">

[![Astro Version](https://img.shields.io/badge/Astro-v5.4.4-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
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
- [3. Arquitectura del Sistema](#-arquitectura-del-sistema)
- [4. Estructura de Archivos del Proyecto](#-estructura-de-archivos-del-proyecto)
- [5. Componentes y Módulos (.astro)](#-componentes-y-módulos-astro)
- [6. Flujo de Captación Comercial (WhatsApp)](#-flujo-de-captación-comercial-whatsapp)
- [7. Catálogo de Productos](#-catálogo-comercial)
- [8. SEO y Datos Estructurados](#-optimización-seo-y-rendimiento)
- [9. Guía de Desarrollo y Comandos](#-guía-de-desarrollo)
- [10. Créditos y Enlaces Oficiales](#-canales-oficiales)

---

## 📌 Descripción del Proyecto

**Montanares Todo Cuero** es un emprendimiento chileno dedicado a la talabartería y confección de artículos en cuero vacuno genuino. Este proyecto consiste en una **landing page comercial moderna, ultra-rápida y 100% responsive** desarrollada con **Astro JS**.

### Objetivos Clave:
- **Catálogo sin fricción:** Exhibición elegante de piezas de marroquinería organizadas por categorías (*Billeteras, Cinturones, Bolsos, Accesorios*).
- **Atención personalizada:** Cada botón de consulta deriva directamente al WhatsApp oficial con el producto específico ya identificado en el mensaje.
- **Cero código redundante:** Componentes nativos `.astro` sin la pesadez de frameworks SPA, asegurando tiempos de carga inmediatos y óptima puntuación en Google Core Web Vitals.

---

## 🎨 Identidad y Sistema de Diseño

El concepto estético evoca la nobleza de los materiales naturales, la durabilidad y la tradición del trabajo en banco de taller.

### Paleta Cromática Oficial

| Tono | Nombre | Código HEX | Rol en la Interfaz | Muestra Visual |
| :--- | :--- | :---: | :--- | :---: |
| **Marrón Oscuro** | *Ebony Leather* | `#38271F` | Títulos primarios, botones principales, pie de página | `■■■■■■` |
| **Marrón Cuero** | *Cognac Saddle* | `#76513B` | Acentos, estados hover, insignias secundarias | `■■■■■■` |
| **Beige Natural** | *Raw Tan* | `#D9C6A5` | Bordes sutiles, divisores, fondos de tarjetas suaves | `■■■■■■` |
| **Crema** | *Warm Parchment* | `#F7F2E9` | Fondo general del lienzo (canvas 60%), superficies limpias | `■■■■■■` |
| **Terracota** | *Earthy Clay* | `#A6533C` | Destacados sutiles y detalles de taller | `■■■■■■` |

### Tipografía

```
┌────────────────────────────────────────────────────────────────────────┐
│  TITULARES & MARCA  : Playfair Display / Cormorant Garamond (Serif)   │
│  TEXTO & LECTURA    : Inter (Sans-Serif, pesos 300, 400, 500, 600)     │
│  METADATOS & CIFRAS : Tabular Figures (tabular-nums)                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏛 Arquitectura del Sistema

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             CLIENT BROWSER                               │
└────────────────────────────────────┬─────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                   ASTRO JS ENGINE (Node.js 22 SSR)                       │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────┐          ┌─────────────────────────────────┐  │
│  │   src/pages/index.astro│ ───────► │   src/layouts/MainLayout.astro  │  │
│  └───────────┬───────────┘          └────────────────┬────────────────┘  │
│              │                                       │                   │
│              ├───────────────┬───────────────────────┘                   │
│              ▼               ▼                                           │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                     COMPONENTES REUTILIZABLES                      │  │
│  │                                                                    │  │
│  │  [ Header.astro ]         [ Hero.astro ]        [ ProductGrid.astro]│  │
│  │         │                       │                       │          │  │
│  │         ▼                       ▼                       ▼          │  │
│  │  [ About.astro ]          [ Gallery.astro ]     [ ProductCard.astro│  │
│  │         │                       │                       │          │  │
│  │         ▼                       ▼                       ▼          │  │
│  │  [ Testimonials.astro ]   [ Contact.astro ]     [ Footer.astro ]   │  │
│  │                                 │                       │          │  │
│  │                                 ▼                       ▼          │  │
│  │                       [ WhatsAppButton.astro ]                     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                      │                                   │
│                                      ▼                                   │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                     DATA & UTILITIES LAYER                         │  │
│  │               • src/data/products.js (Catálogo & WhatsApp)          │  │
│  │               • src/styles/global.css (Tailwind CSS v4 Theme)      │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────┬───────────────────────────────────┘
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────┐                             ┌───────────────────────┐
│   WHATSAPP GATEWAY    │                             │   FACEBOOK PROFILE    │
│   (+56 9 2704 7529)   │                             │   Página Oficial      │
└───────────────────────┘                             └───────────────────────┘
```

---

## 📂 Estructura de Archivos del Proyecto

```
montanares-todo-cuero/
├── astro.config.mjs               # Configuración central de Astro + Node + Tailwind
├── package.json                   # Dependencias, metadatos y scripts de ejecución
├── tsconfig.json                  # Configuración estricta de compilador TypeScript
├── public/
│   ├── robots.txt                 # Directivas para rastreadores de búsqueda
│   └── sitemap.xml                # Mapa de sitio XML canónico
└── src/
    ├── assets/
    │   └── images/                # Fotografías reales de taller en alta resolución
    │       ├── hero_leather_craft_*.jpg
    │       ├── product_leather_wallet_*.jpg
    │       ├── product_leather_belt_*.jpg
    │       ├── product_leather_bag_*.jpg
    │       ├── product_leather_cardholder_*.jpg
    │       ├── product_leather_apron_*.jpg
    │       └── gallery_leather_stitch_*.jpg
    ├── components/                # 100% Componentes Astro nativos (.astro)
    │   ├── Header.astro           # Top Bar Contract con navegación y CTA
    │   ├── Hero.astro             # Sección principal con propuesta de valor
    │   ├── ProductCard.astro      # Ficha técnica individual de producto
    │   ├── ProductGrid.astro      # Grilla con filtros interactivos y modal
    │   ├── About.astro            # Narrativa artesanal y valores del taller
    │   ├── Gallery.astro          # Mosaico fotográfico y visor Lightbox
    │   ├── Testimonials.astro     # Reseñas verificadas de clientes
    │   ├── Contact.astro          # Canales oficiales y formulario WhatsApp
    │   ├── Footer.astro           # Pie de página y enlaces institucionales
    │   └── WhatsAppButton.astro   # Botón flotante siempre visible
    ├── data/
    │   └── products.js            # Base de datos local de productos y generadores
    ├── layouts/
    │   └── MainLayout.astro       # Shell HTML, metadatos SEO y Schema.org
    ├── pages/
    │   └── index.astro            # Vista principal comercial
    └── styles/
        └── global.css             # Directivas @theme Tailwind v4 y variables
```

---

## 🧩 Componentes y Módulos (.astro)

| Componente | Archivo | Funcionalidad Principal |
| :--- | :--- | :--- |
| **Cabecera** | `Header.astro` | Cumple el *Top Bar Contract*: Marca en una línea, 5 enlaces de navegación, botón WhatsApp y menú móvil. |
| **Hero** | `Hero.astro` | Título *"Tradición y estilo en cada pieza"*, fotografía del taller, llamada dual a la acción e insignias de confianza. |
| **Tarjeta** | `ProductCard.astro` | Imagen en relación 4:3, descripción de talabartería, botón directo de WhatsApp y gatillo de detalles. |
| **Catálogo** | `ProductGrid.astro` | Filtros por categoría instantáneos, modal accesible de especificaciones y cuidados del cuero. |
| **Nosotros** | `About.astro` | Historia del taller, valor del corte manual, hilado encerado a dos agujas y durabilidad garantizada. |
| **Galería** | `Gallery.astro` | Mosaico de texturas con **Lightbox interactivo** a pantalla completa (navegación por flechas y tecla `Esc`). |
| **Testimonios** | `Testimonials.astro` | Citas textuales de clientes resaltando la pátina, el aroma a cuero y la puntualidad de despacho. |
| **Contacto** | `Contact.astro` | Tarjetas oficiales (WhatsApp, Facebook, Envíos) y **generador de consultas personalizadas**. |
| **Pie de Página**| `Footer.astro` | Navegación secundaria, derechos reservados, teléfono oficial y botón de retorno superior. |
| **Botón Flotante**| `WhatsAppButton.astro`| Acceso permanente inferior derecho con tooltip sugerente para resolver dudas al instante. |

---

## 💬 Flujo de Captación Comercial (WhatsApp)

Para maximizar la tasa de conversión, el sitio no implementa pasarelas de pago complejas que aumentan la fricción, sino una integración directa con WhatsApp Business (`+56 9 2704 7529`):

```
┌────────────────────────────────┐
│   Visitante explora el sitio   │
└───────────────┬────────────────┘
                │
                ├──────────────────────────────────────────┐
                ▼                                          ▼
   [ Botón por Producto ]                     [ Formulario de Contacto ]
   "Consultar disponibilidad"                  "Hablar por WhatsApp"
                │                                          │
                │ Confecciona mensaje                      │ Añade nombre y
                │ con nombre del producto                  │ dudas específicas
                ▼                                          ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                  URI FORMATEADA DE WHATSAPP BUSINESS                     │
│  https://wa.me/56927047529?text=Hola%20Montanares%20Todo%20Cuero...      │
└───────────────────────────────────┬──────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│              ATENCIÓN PERSONALIZADA DIRECTA CON EL ARTESANO              │
│       • Fotos adicionales  • Medidas a gusto  • Coordinación de envío     │
└──────────────────────────────────────────────────────────────────────────┘
```

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

- **Etiquetas Canónicas:** URL estandarizada para evitar duplicidades de índice.
- **Open Graph y Twitter Cards:** Previsualizaciones ricas con imagen oficial al compartir enlaces en Facebook, WhatsApp, X y Telegram.
- **Schema.org Structured Data:** Marcado `LocalBusiness` con número telefónico internacional, rango de precios, país de cobertura y enlaces sociales.
- **Archivos Estándar:** `robots.txt` habilitado para rastreadores y `sitemap.xml` indexable.
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

# 4. Previsualizar la compilación localmente
npm run preview

# 5. Iniciar servicio en producción
npm run start
```

---

## 📞 Canales Oficiales

- **WhatsApp Comercial:** [+56 9 2704 7529](https://wa.me/56927047529)
- **Perfil de Facebook:** [Montanares Todo Cuero](https://www.facebook.com/profile.php?id=100054494468211)
- **Cobertura:** Despachos coordinados a Santiago y todas las regiones de Chile.

---

<div align="center">
  <sub>© 2026 Montanares Todo Cuero. Marroquinería tradicional y artículos de cuero genuino hechos a mano en Chile.</sub>
</div>

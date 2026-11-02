import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// Detecta si estamos en modo desarrollo (npm run dev)
const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('dev');

export default defineConfig({
  output: 'server',
  // Si estamos en desarrollo, usamos el adaptador de Node (que soporta npm run dev)
  // Si estamos en producción (Cloudflare), usamos el adaptador de Cloudflare
  adapter: isDev 
    ? (await import('@astrojs/node')).default({ mode: 'standalone' }) 
    : cloudflare({ imageService: 'compile' }),
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
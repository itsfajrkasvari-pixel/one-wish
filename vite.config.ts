import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// ONE WISH — fully offline party game.
// No backend, no API, no database. Everything is bundled and precached
// by the service worker so the game works with Wi-Fi/data/airplane mode off.
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png', 'icons/*.svg'],
      manifest: {
        name: 'ONE WISH',
        short_name: 'ONE WISH',
        description: 'One card. One choice. One consequence.',
        theme_color: '#0A0A12',
        background_color: '#0A0A12',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Precache absolutely everything the build emits so the app is
        // 100% playable offline after the very first load.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,ico,json}'],
        globIgnores: ['**/node_modules/**/*'],
        runtimeCaching: [],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  build: {
    target: 'es2019',
    sourcemap: false,
    chunkSizeWarningLimit: 800
  }
});

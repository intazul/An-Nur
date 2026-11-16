import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

function registerSwFallbackPlugin(): Plugin[] {
  const devSwScript = [
    "if ('serviceWorker' in navigator) {",
    "  window.addEventListener('load', () => {",
    "    navigator.serviceWorker.register('/dev-sw.js?dev-sw', { type: 'module', scope: '/' }).catch(() => {});",
    '  });',
    '}',
  ].join('\n');

  const safeDevEntryModule = [
    'export default function registerDevSW() {',
    "  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {",
    "    navigator.serviceWorker.register('/dev-sw.js?dev-sw', { type: 'module', scope: '/' }).catch(() => {});",
    '  }',
    '}',
  ].join('\n');

  const prodSwScript = [
    "if ('serviceWorker' in navigator) {",
    "  window.addEventListener('load', () => {",
    "    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});",
    '  });',
    '}',
  ].join('\n');

  const VIRTUAL_DEV_ENTRY = '/@vite-plugin-pwa/pwa-entry-point-loaded';
  const RESOLVED_SAFE_DEV_ENTRY = '\0annur:pwa-entry-point-safe';

  return [
    {
      name: 'register-sw-fallback-pre',
      enforce: 'pre',
      resolveId(id) {
        if (id === VIRTUAL_DEV_ENTRY || id === `\0${VIRTUAL_DEV_ENTRY}`) {
          return RESOLVED_SAFE_DEV_ENTRY;
        }
        return null;
      },
      load(id) {
        if (id === RESOLVED_SAFE_DEV_ENTRY) {
          return safeDevEntryModule;
        }
        return null;
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const urlPath = (req.url || '').split('?')[0];
          if (urlPath === '/registerSW.js') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(devSwScript);
            return;
          }
          if (urlPath === VIRTUAL_DEV_ENTRY) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.end(safeDevEntryModule);
            return;
          }
          next();
        });
      },
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const target = path.join(distDir, 'registerSW.js');
        if (fs.existsSync(distDir) && !fs.existsSync(target)) {
          fs.writeFileSync(target, prodSwScript, 'utf8');
        }
      },
    },
    {
      name: 'register-sw-fallback-post',
      apply: 'serve',
      enforce: 'post',
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          return html.replace(
            /<script id="vite-plugin-pwa:register-dev-sw"[\s\S]*?<\/script>/g,
            `<script id="vite-plugin-pwa:inline-dev-sw">${devSwScript.replace(/\n/g, '')}</script>`
          );
        },
      },
    },
  ];
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      ...registerSwFallbackPlugin(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'inline',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'An-Nur Quran',
          short_name: 'An-Nur',
          description: 'Offline Quran recitation, translations, spiritual dashboard, and precise Tafsir.',
          theme_color: '#000000',
          background_color: '#000000',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          cleanupOutdatedCaches: true,
          clientsClaim: true,
          skipWaiting: true,
          navigateFallbackDenylist: [/^\/registerSW\.js$/],
          runtimeCaching: [
            {
              // Quran Audio EveryAyah CDN: Cache all audio indefinitely for offline listening
              urlPattern: /^https:\/\/everyayah\.com\/data\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'annur-quran-audio-v1',
                expiration: {
                  maxEntries: 20000,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              // Google Fonts CSS & Webfonts
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              // Quran API text caching (Arabic, English, Urdu)
              urlPattern: /^https:\/\/api\.alquran\.cloud\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'quran-api-cache-v1',
                expiration: {
                  maxEntries: 300,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              // Quran.com Assamese Translation API caching
              urlPattern: /^https:\/\/api\.quran\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'quran-assamese-api-cache-v1',
                expiration: {
                  maxEntries: 300,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              // jsDelivr Assamese Translation fallback caching
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/gh\/fawazahmed0\/quran-api.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'quran-assamese-cdn-cache-v1',
                expiration: {
                  maxEntries: 300,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
          suppressWarnings: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

// Mero's Magical World - Service Worker for Offline Play
const CACHE_NAME = 'mero-magic-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/data.js',
  './js/audio.js',
  './js/tracing.js',
  './js/games.js',
  './js/app.js',
  './assets/images/mero_avatar_badge.png',
  './assets/images/mero_garden_badge.png',
  './assets/images/mero_avatar_smile.jpg',
  './assets/images/mero_avatar_garden.jpg',
  './assets/images/icon_192.png',
  './assets/images/icon_512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    }).catch(() => {
      return caches.match('./index.html');
    })
  );
});


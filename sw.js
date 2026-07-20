const CACHE_NAME = 'audio-app-v1';

// The exact list of files to save offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/rain.aac',
  '/brown.aac',
  '/pink.aac',
  '/smooth-pink.aac',
  '/dense-pink.aac',
];

// Install phase: Download and cache the files
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// Cleanup phase: Deletes the old caches so you don't waste storage
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// Fetch phase: Intercept network requests and serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});

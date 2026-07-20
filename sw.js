const CACHE_NAME = 'audio-app-v1';

// The exact list of files to save offline
const urlsToCache = ['/', '/index.html', '/manifest.json', '/rain.mp3'];

// Install phase: Download and cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

// Fetch phase: Intercept network requests and serve from cache
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});

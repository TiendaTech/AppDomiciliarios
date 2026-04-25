const CACHE_NAME = 'domiapp-v4';
const urlsToCache = [
  './index.html',
  './LOGO DOMIFASTER.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});

self.addEventListener('fetch', event => {
  // Estrategia Network First: Priorizar internet para tener los datos reales
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

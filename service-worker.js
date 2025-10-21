const CACHE_NAME = 'mealflow-cache-v1';
const URLS_TO_CACHE = [
  '/index.html',
  '/onboarding.html',
  '/app.html',
  '/styles.css',
  '/app.css',
  '/script.js',
  '/storage.js',
  '/macros.js',
  '/recipes.js',
  '/meal-planner.js',
  '/shopping.js',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

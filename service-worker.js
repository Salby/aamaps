const cacheName = 'aamaps';
const filesToCache = [
  '/aamaps/https://fonts.googleapis.com/css?family=Cabin:400,500',
  '/aamaps/assets/css/master.css',
  '/aamaps/index.html',
  '/aamaps/assets/img/icon256.png',
  '/aamaps/assets/img/mapFallback.png',
  '/aamaps/assets/img/mapFallback.webp'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  )
});
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function() {
      return caches.match('index.html');
    })
  );
});

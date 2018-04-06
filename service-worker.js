const cacheName = 'aamaps';
const filesToCache = [
  'https://fonts.googleapis.com/css?family=Cabin:400,500',
  'assets/css/master.css',
  'index.html',
  'offline.html',
  'assets/img/icon256.png'
  'assets/img/mapFallback.png',
  'assets/img/mapFallback.webp'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  )
})
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
      return caches.match('offline.html');
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.responsWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
})

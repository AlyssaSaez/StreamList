const CACHE_NAME = 'streamlist-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([
        '/',             
        '/index.html',    
      ])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

function isSameOrigin(url) {
  try {
    const u = new URL(url);
    return self.location.origin === u.origin;
  } catch {
    return false;
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.match('/index.html');
      })
    );
    return;
  }

  const dest = request.destination;
  if (['style', 'script', 'image', 'font'].includes(dest) && isSameOrigin(request.url)) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, resClone));
          return res;
        })
      )
    );
    return;
  }

  if (/^https:\/\/image\.tmdb\.org\/t\/p\//.test(request.url)) {
    event.respondWith(
      caches.match(request).then((cached) =>
        cached ||
        fetch(request, { mode: 'no-cors' }).then((res) => {
          const resClone = res.clone();
          caches.open('tmdb-images').then((cache) => cache.put(request, resClone));
          return res;
        }).catch(() => cached) // return cached if network fails
      )
    );
    return;
  }

  if (/^https:\/\/api\.themoviedb\.org\//.test(request.url)) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const resClone = res.clone();
          caches.open('tmdb-api').then((cache) => cache.put(request, resClone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }
});

const CACHE_VERSION = "dl-communication-v2";
const CACHE_FILES = [
  "./index.html",
  "./app.html",
  "./gen.html",
  "./1762414107892.png", // 192x192 图标
  "./1762414171387.png", // 512x512 图标
  "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_VERSION)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match("./index.html"))
  );
});

const CACHE_NAME = "dl-pwa-v1";
// 缓存你所有的 HTML 和核心资源（包含 3 个页面）
const CACHE_FILES = [
  "./index.html",
  "./app.html",
  "./gen.html",
  "./1762414107892.png",
  "./1762414171387.png",
  "https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js"
];

// 安装时缓存文件
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_FILES)));
  self.skipWaiting();
});

// 激活时清旧缓存
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
});

// 离线优先加载（3 个页面都能离线打开）
self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});

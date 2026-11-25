const CACHE = 'cienciasmica-v1';
const CORE = ['/', '/index.html', '/manifest.webmanifest', '/brand/pwa-icon-192.png', '/brand/pwa-icon-512.png', '/brand/pwa-icon-maskable-512.png', '/brand/splash-screen.png', '/brand/launcher-16x9.png', '/credits.txt'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;
  const isCommonsImage = event.request.destination === 'image' && url.hostname === 'upload.wikimedia.org';
  if (url.origin !== self.location.origin && !isCommonsImage) return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if ((response.ok || response.type === 'opaque') && (isCommonsImage || url.pathname.startsWith('/assets/') || url.pathname.startsWith('/brand/'))) {
        const cache = await caches.open(CACHE);
        await cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      return isCommonsImage ? new Response('', { status: 404 }) : caches.match('/index.html');
    }
  })());
});

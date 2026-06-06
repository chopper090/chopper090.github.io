// chopper090 hub — service worker.
// Intercetta SOLO i file dell'hub (root). Le sotto-app (/nemo/, /umami/, ...) hanno
// il loro service worker con scope più specifico → restano indipendenti, mai toccate qui.
const CACHE = 'chopper090.github.io-v1.6.0';
const SHELL = ['./', './index.html', './app.html', './apps.json', './manifest.webmanifest',
  './icon-192.png', './icon-512.png', './icon-512-maskable.png', './apple-touch-icon.png', './body.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const p = new URL(e.request.url).pathname;
  const isHub = p === '/' || p === '/index.html' || p === '/app.html' || p === '/apps.json' ||
    p === '/manifest.webmanifest' || p.startsWith('/icon-') || p === '/apple-touch-icon.png' || p === '/body.png';
  if (!isHub) return; // non intercettare le app: hanno il loro sw

  const fresh = p === '/' || p === '/index.html' || p === '/app.html' || p === '/apps.json';
  if (fresh) {
    // network-first: hub e lista app sempre aggiornati, fallback offline
    e.respondWith(
      fetch(e.request).then(r => {
        const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r;
      }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    );
  } else {
    // cache-first per icone/manifest dell'hub
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});

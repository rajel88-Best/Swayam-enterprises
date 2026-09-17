/* Offline shell. Bump CACHE when you change any file below,
   or phones will keep serving the old version. */
const CACHE = 'swayam-v1';
const SHELL = [
  'app.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // never cache fonts or APIs

  // content.json and the admin must always be fresh
  if (/content\.json|auth\.json|admin\.html|setup\.html|check\.html/.test(url.pathname)){
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // everything else: serve from cache, refresh in the background
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});

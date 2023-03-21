// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwaVertipdv";


// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll([

        './index.html',

        // './assets/css/bootstrap.min.css',

        // './assets/js/bootstrap.min.js',

        // './assets/js/jquery.min.js',

        // './assets/js/popper.min.js',

        // './assets/img/background.png',
        // './assets/img/favicon.png',
        // './assets/img/logo.png',
        // './assets/img/icon_128.png',
        // './assets/img/icon_144.png',
        // './assets/img/icon_152.png',
        // './assets/img/icon_167.png',
        // './assets/img/icon_180.png',
        // './assets/img/icon_192.png',
        // './assets/img/icon_256.png',
        // './assets/img/icon_512.png',
        // './assets/img/formulas.JPG',
      ]))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
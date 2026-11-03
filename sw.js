const CACHE = "arete-v18";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./fonts/oswald-latin.woff2",
  "./fonts/cormorant-italic-latin.woff2",
  "./fonts/cinzel-latin.woff2",
  "./img/cover.webp",
  "./img/bg-hub.webp",
  "./img/bg-phase1.webp",
  "./img/bg-phase2.webp",
  "./img/bg-phase3.webp",
  "./img/bg-push.webp",
  "./img/bg-pull.webp",
  "./img/bg-legs.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS.map((a) => new Request(a, { cache: "reload" })))).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Code + page: always network-first so updates show immediately; cache is only the offline fallback.
  const p = url.pathname;
  if (req.mode === "navigate" || p.endsWith("/") || /\.(html|js|css|json|webmanifest)$/.test(p)) {
    event.respondWith(
      fetch(req, { cache: "no-store" })
        .then((res) => {
          if (res && res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req).then((c) => c || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then((cached) => {
      const fetched = fetch(req)
        .then((res) => {
          if (res && res.ok && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetched;
    })
  );
});

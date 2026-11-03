const CACHE = "arete-v20";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest?v=20",
  "./icon-192.png?v=20",
  "./icon-512.png?v=20",
  "./icon-maskable-512.png?v=20",
  "./apple-touch-icon.png?v=20",
  "./favicon-32.png?v=20",
  "./favicon.ico?v=20",
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

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL((event.notification.data && event.notification.data.url) || "./", self.registration.scope).href;
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) {
        if (c.url.startsWith(self.registration.scope) && "focus" in c) {
          if ("navigate" in c) c.navigate(target).catch(() => {});
          return c.focus();
        }
      }
      return self.clients.openWindow ? self.clients.openWindow(target) : undefined;
    })
  );
});

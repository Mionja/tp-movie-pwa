const CACHE_NAME = "version-2";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

// Install event: Cache specified resources when the service worker is installed
self.addEventListener("install", (event) => {
  console.log("install cache");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Intercept network requests and serve cached or offline content
self.addEventListener("fetch", (event) => {
  console.log("fetch");
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse; // Serve the cached response if available
      }

      if (!navigator.onLine) {
        // If there's no network connection, serve the offline page
        return caches.match("offline.html");
      }

      return fetch(event.request)
        .then((networkResponse) => {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        })
        .catch(() => {
          // If the network request fails and there's no cached response, serve the offline page
          return caches.match("offline.html");
        });
    })
  );
});

// Activate event: Remove old caches when a new service worker becomes active
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  console.log("activate");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
            return Promise.resolve();
          })
        );
      })
      .then(() => {
        console.log("Old caches removed");
      })
  );
});

// Message event: Listen for messages to skip the waiting state and activate the new service worker
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    console.log('SkipWaiting');
    self.skipWaiting();
  }
});

// Send notification push to the user
self.addEventListener("push", (event) => {
  const json = JSON.parse(event.data.text());
  console.log('Push data', event.data.text());
  self.ServiceWorkerRegistration.showNotification(json.header, json.options);
});
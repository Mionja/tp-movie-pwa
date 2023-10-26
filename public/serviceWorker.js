//STORAGE OF BROWSER
const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
const self = this;

//installation
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// récupération des données de réponse
self.addEventListener("backgroundfetchsuccess", (event) => {
  const registration = event.registration;
  event.waitUntil(async() => {
    const registration = event.registration;
    const records = await registration.matchAll();
    const responsePromises = records.map(
      async(record) => await record.responseReady,
    );
    const responses = Promise.all(responsePromises);
  });
  event.updateUI({ title: "téléchargement terminé!" })
});
// Avec updateUI() , le gestionnaire peut mettre à jour le titre et l'icône de l'élément d'interface utilisateur

self.addEventListener("backgroundfetchfail", (event)=>{
  event.updateUI({ title: "téléchargement incomplet" });
})

// listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// activate the service worker
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            // eslint-disable-next-line array-callback-return
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});
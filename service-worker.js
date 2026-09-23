var CACHE_NAME = "dmae2026-v18";
var APP_SHELL = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./data/questions.js",
  "./data/questions-especificos.js",
  "./data/questions-portugues.js",
  "./data/questions-matematica.js",
  "./data/questions-gerais.js",
  "./data/questions-legislacao.js",
  "./data/content.js",
  "./data/videoaulas.js",
  "./data/materiais.js",
  "./data/ai-config.js",
  "./data/videos.js",
  "./data/syllabus.js",
  "./icon/icon.png",
  "./icon/icon-192.png",
  "./icon/icon-512.png",
  "./visuais/esp-hidrometro-classe-i-padrao-instalacao.svg",
  "./visuais/esp-funcionamento-leitura-hidrometros.svg",
  "./visuais/esp-calculo-consumo-conversao-volume.svg",
  "./visuais/esp-estrutura-tarifaria.svg",
  "./visuais/mat-conjuntos.svg"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return Promise.all(APP_SHELL.map(function (url) {
        return fetch(new Request(url, { cache: "reload" })).then(function (response) {
          if (response && (response.status === 200 || response.type === "opaque")) {
            return cache.put(url, response);
          }
          return null;
        }).catch(function () {
          return null;
        });
      }));
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) return caches.delete(key);
        return null;
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then(function (response) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
        return response;
      }).catch(function () {
        return caches.match("./index.html");
      })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response && response.status === 200 && response.type === "basic") {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      });
    })
  );
});

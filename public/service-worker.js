// const version = 1;

workbox.setConfig({
    debug: false,
  });
  
workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        cacheExpiration: { maxAgeSeconds: 60 * 60 }
      }),
    ],
  }),
);

// workbox.routing.registerRoute(
//   new RegExp('http://localhost:5000/recipes'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: 'recipes',
//     cacheExpiration: { maxAgeSeconds: 60 * 60 },
//     maxEntries: 10
//   })
//   // workbox.strategies.networkFirst({
//   //   cacheName: 'api',
//   // }),
// );

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  }),
);

self.addEventListener('install', (event) => {
  console.log('Service worker version ' + version + ' is installed.')
  // event.waitUntil(
  //   caches.open(version)
  //     .then((cache) => {
  //       return cache.addAll([
  //         // '/img/*.png',
  //         // '/img/*.svg',
  //         // '/favicon.ico',
  //         // '/index.html',
  //         // '/robots.txt'
  //       ])
  //     })
  // );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker version ' + version + ' is activated.')
  // event.waitUntil( caches.keys()
  //   .then((keys) => {
  //     return Promise.all(keys.filter((key) => {
  //       return key !== version
  //     }).map(((key) => {
  //       return caches.delete(key);
  //     })));
  //   }));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// function fetchAndUpdate(request) {
//   return fetch(request)
//     .then(((res) => {
//       if (res)
//       {
//         return caches.open(version)
//           .then((cache) => {
//             return cache.put(request, res.clone())
//               .then((res) => {
//                 return res;
//               })
//           })
//       }
//     }));
// }
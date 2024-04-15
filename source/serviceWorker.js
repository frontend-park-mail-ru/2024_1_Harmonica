const CACHE = 'v4';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll([
                './source',
                '../dist'
            ])),
    );
});

self.addEventListener("activate", (event) => {
    const cacheKeeplist = ['static-v1', 'static-v2', 'v1', 'v2', 'v3', CACHE];

    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        return caches.delete(key);
                    }
                }),
            );
        }),
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.pathname.match(/\.(js)|(html)$/) || (url.pathname === '/') || (url.hostname === 'fonts.googleapis.com')){
        event.respondWith(caches.match(event.request)
            .then((matching => {
                return (matching || fetch(event.request)
                    .then(response => {
                        return caches.open(CACHE).then(cache => {
                            cache.put(event.request, response.clone());
                            return response;
                        })
                    }))
            })))
    } else {
        event.respondWith(fetch(event.request)
            .then(response => caches.open(CACHE)
                .then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                }))
            .catch(() => {
                caches.open(CACHE)
                    .then(cache => {
                        cache.match(event.request)
                        .then(matching => matching || Promise.reject('No match'))
                })
            }));
    }
});

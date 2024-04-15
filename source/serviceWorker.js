const CACHE = 'static-v1';

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
    const cacheKeeplist = [CACHE];

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

    if (event.request.method === 'POST' || url.pathname === '/api/v1/is_auth'){
        event.respondWith(fetch(event.request).then(response => response));
        return;
    }
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
});

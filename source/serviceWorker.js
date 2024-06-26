const CACHE = 'v6';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll([
                '/',
            ])),
    );
});

self.addEventListener('activate', (event) => {
    const cacheKeeplist = [];

    for (let i = 0; i < cacheKeeplist.length; ++i) {
        event.waitUntil(
            caches.open(cacheKeeplist[i]).then((cache) => {
                cache.keys().then((keys) => {
                    keys.forEach((request, index, array) => {
                        cache.delete(request);
                    });
                });
            }),
        );
    }
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (url.pathname.match(/.*\.(js)|(svg)|(png)|(jpeg)|(jpg)$/) || (url.hostname === 'fonts.googleapis.com')) {
        event.respondWith(caches.match(event.request)
            .then(((matching) => {
                return (matching || fetch(event.request)
                    .then((response) => {
                        return caches.open(CACHE).then((cache) => {
                            cache.put(event.request, response.clone());
                            return response;
                        });
                    }));
            })));
    } else {
        event.respondWith(fetch(event.request)
            .then((response) => caches.open(CACHE)
                .then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                }))
            .catch((e) => {
                caches.open(CACHE)
                    .then((cache) => {
                        cache.match(event.request)
                            .then((matching) => matching || Promise.reject('No match'));
                    });
            }));
    }
});

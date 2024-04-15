const CACHE = 'static-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll([
                '/',
            ])),
    );
});

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    if (event.request.method === 'POST' || url.pathname === '/api/v1/is_auth'){
        event.respondWith(fetch(event.request).then(response => response));
        return;
    }
    event.respondWith(takeFromCache(event.request));
    event.waitUntil(cacheUpdate(event.request));
});


function cacheUpdate(request) {
    return caches.open(CACHE)
        .then((cache) => fetch(request)
            .then(response => cache.put(request, response.clone())
                .then(() => response)
            )
        );
}

function takeFromCache(request){
    return caches.open(CACHE)
        .then((cache) => cache.match(request)
            .then((matching) => matching ||
                Promise.reject('there is no match'),
            ),
        )
}

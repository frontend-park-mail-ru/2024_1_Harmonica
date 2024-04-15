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

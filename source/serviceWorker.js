const expectedCaches = [
    'static-v1'
]

const CACHE = 'static-v2';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll([
                'index.html',
                'main.js'
            ]))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(responseFromCache(event.request));
    event.waitUntil(cacheUpdate(event.request));
});


function cacheUpdate(request){
    return caches.open(CACHE)
        .then(cache => fetch(request)
            .then(response => cache.put(request, response))
        )
}

function responseFromCache(request){
    return caches.open(CACHE)
        .then(cache => cache.match(request)
                .then(matching => matching
                    || Promise.reject('there is no match')
                )
        )
}

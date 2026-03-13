const اسم_الكاش = 'سجل-الأرحام-v3';

const الملفات = [
    'index.html',
    'سجل.html',
    'style.css',
    'script.js',
    'manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(اسم_الكاش).then(cache => {
            return cache.addAll(الملفات);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== اسم_الكاش)
                    .map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

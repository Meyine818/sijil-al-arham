// اسم الكاش: إذا عدّلت التطبيق غيّر الرقم إلى v2 وهكذا
const اسم_الكاش = 'سجل-الأرحام-v1';

// قائمة الملفات التي نحفظها للعمل بدون إنترنت
const الملفات = [
    'index.html',
    'سجل.html',
    'style.css',
    'script.js',
    'manifest.json'
];

// عند تثبيت الـ PWA: احفظ كل الملفات
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(اسم_الكاش).then(cache => {
            return cache.addAll(الملفات);
        })
    );
});

// عند طلب أي ملف: خذه من الكاش أولاً
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
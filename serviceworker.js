// 使用するキャッシュの名前
var cacheName = 'tempConverterShell';

// キャッシュするファイルのリスト
var filesToCache = [
    './', // index.htmlを省略した「(ドメイン名)/」でのアクセスに対応するため
    './index.html',
    './js/app.js',
    './css/app.css'
]

// installイベント（Service Worker自体をブラウザ環境にインストールする時に発生）
self.addEventListener('install', event => {
    console.log('Service Worker installing');
    // キャッシュ処理が完了するまでイベントが完了したことにならないようにする
    event.waitUntil(
        // アップシェル（Webアプリの基本的な構成要素）をキャッシュする
        caches.open(cacheName).then(cache => {
            console.log('Service Worker caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

// activeイベント（Service Workerが起動する時に発生）
self.addEventListener('active', event => {
    console.log('Service Worker activating');
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                // 古いキャッシュを削除
                if (key !== cacheName){
                    console.log('Service Worker removing old cache', key);
                    return caches.delete(key);
                }
            }))
        })
    );
    return self.clients.claim();
});

// fetchイベント（PWAがWeb上のリソースにリクエストを投げる時に発生）
self.addEventListener('fetch', event => {
    console.log('Service Worker fetching', event.request.url);
    event.respondWith(
        // リクエストされたファイルがキャッシュに含まれていれば、キャッシュから取り出して返却する
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
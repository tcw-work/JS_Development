// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-sample-caches';
var urlsToCache = [
    "/",
    "index.php",
    "header.php",
    "footer.php",
    "works/detail01.php",
    "works/detail02.php",
    "works/detail03.php",
    "works/detail04.php",
    "works/detail-banner.php",
    "works/index.php",
    "service/index.php",
    "css/style.css",
    "css/style.scss"
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
				return response ? response : fetch(event.request);
			})
	);
});
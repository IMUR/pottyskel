/// <reference lib="webworker" />

self.addEventListener('install', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.open('v1').then((cache) => {
			return cache.addAll(['/', '/index.html', '/styles.css', '/script.js', '/favicon.ico']);
		})
	);
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== 'v1') {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});

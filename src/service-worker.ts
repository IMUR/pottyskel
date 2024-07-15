declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (event: InstallEvent) => {
	event.waitUntil(
		caches.open('static-v1').then((cache) => {
			return cache.addAll(['/', '/index.html', '/styles.css', '/script.js', '/offline.html']);
		})
	);
});

self.addEventListener('activate', (event: ExtendableEvent) => {
	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (key !== 'static-v1') {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((response) => {
				return response || fetch(event.request);
			})
			.catch(() => {
				return caches.match('/offline.html');
			})
	);
});

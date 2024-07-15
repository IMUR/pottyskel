const CACHE_NAME = 'pottyskel-cache-v1';
const urlsToCache = ['/', '/index.html', '/styles.css', '/favicon.ico', '/PottyList.json'];

// Install event - caching app shell
self.addEventListener('install', (event: InstallEvent) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

// Activate event - cleaning up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
	const cacheWhitelist = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) =>
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhitelist.includes(cacheName)) {
						return caches.delete(cacheName);
					}
				})
			)
		)
	);
});

// Fetch event - serving cached content
self.addEventListener('fetch', (event: FetchEvent) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) {
				return response;
			}
			return fetch(event.request).then((response) => {
				if (!response || response.status !== 200 || response.type !== 'basic') {
					return response;
				}
				const responseToCache = response.clone();
				caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, responseToCache);
				});
				return response;
			});
		})
	);
});

import { init } from 'svelte/internal';
import App from './App.svelte';

// Register the service worker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js').then(
		function (registration) {
			console.log('Service Worker registration successful with scope: ', registration.scope);
		},
		function (err) {
			console.log('Service Worker registration failed: ', err);
		}
	);
}

// Initialize the Svelte app
const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;

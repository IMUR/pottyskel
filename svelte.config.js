import adapter from '@sveltejs/adapter-node';
import { sveltePreprocess } from 'svelte-preprocess';

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib'
		}
	},
	vitePlugin: {
		inspector: true
	},
	preprocess: sveltePreprocess({
		typescript: true
	})
};

export default config;

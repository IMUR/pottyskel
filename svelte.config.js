import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

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
	preprocess: preprocess({
		typescript: true
	})
};

export default config;

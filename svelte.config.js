import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import * as dotenv from 'dotenv';

dotenv.config();

const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: 'src/lib'
		}
	},
	preprocess: preprocess({
		typescript: true
	})
};

export default config;

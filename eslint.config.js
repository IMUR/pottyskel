module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		project: './tsconfig.json'
	},
	settings: {
		'svelte3/typescript': require('typescript'),
		'svelte3/ignore-styles': () => true
	},
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	rules: {
		'@typescript-eslint/no-unused-vars': ['error'],
		'@typescript-eslint/no-explicit-any': 'off',
		'svelte/no-unused-vars': 'off'
	}
};

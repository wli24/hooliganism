const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	safelist: [
		'bg-primary',
		'text-primary-content',
		'bg-secondary',
		'text-secondary-content',
		'bg-accent',
		'text-accent-content',
		'bg-neutral',
		'text-neutral-content',
		'bg-neutral',
		'text-neutral-content',
	],

	theme: {
		extend: {},
	},

	plugins: [daisyui],

	daisyui: {
		themes: ['retro'],
	},
};

module.exports = config;

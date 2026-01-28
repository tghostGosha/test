import svgSprite from '@pivanov/vite-plugin-svg-sprite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import htmlInclude from 'vite-plugin-html-include';

export default defineConfig({
	plugins: [
		svgSprite({
			iconDirs: ['src/assets/svg'],
			symbolId: 'icon-[name]',
			inject: 'body-last',
			svgo: true,
			fileName: 'sprite.svg',
		}),
		htmlInclude({
			root: './src',
			includePaths: ['src/layouts'],
		}),
		imagetools({
			defaultDirectives: () =>
				new URLSearchParams({
					format: 'webp,avif',
					quality: '75',
				}),
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				// additionalData: `@import "./src/styles/variables.scss";`,
			},
		},
	},
});

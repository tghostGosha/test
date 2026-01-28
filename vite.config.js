import svgSprite from '@pivanov/vite-plugin-svg-sprite';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import path from 'path'

import fileInclude from 'vite-file-include'
export default defineConfig({
	resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
	plugins: [
		svgSprite({
			iconDirs: ['src/assets/svg'],
			symbolId: 'icon-[name]',
			inject: 'body-last',
			svgo: true,
			fileName: 'sprite.svg',
		}),
		fileInclude({
    
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

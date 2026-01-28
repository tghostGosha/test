import svgSprite from '@pivanov/vite-plugin-svg-sprite'; // ← новый импорт
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';

export default defineConfig({
	plugins: [
		svgSprite({
			// Основные настройки (аналогично тому, что было)
			iconDirs: ['src/assets/svg'], // папка с твоими SVG (без /**/*.svg, просто директория)
			symbolId: 'icon-[name]', // ID для <use xlink:href="#icon-name">
			inject: 'body-last', // куда вставить <svg> спрайт (body-last — в конец body)
			svgo: true, // включить оптимизацию SVGO (по умолчанию true)
			// fileName: 'sprite.svg',             // если хочешь отдельный файл вместо инъекции
			// outputDir: 'public',                // если fileName задан
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

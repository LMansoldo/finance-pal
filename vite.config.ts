import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	base: '/finance-pal/',
	plugins: [react()],
	build: {
		sourcemap: process.env.NODE_ENV !== 'production',
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'chart.js', 'zod'],
				},
			},
		},
	},
	resolve: {
		alias: {
			'@modules': path.resolve(__dirname, './src/modules'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@shared': path.resolve(__dirname, './src/shared')
		},
	},
})
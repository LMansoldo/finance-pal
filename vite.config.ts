import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	base: '/finance-pal/',
	plugins: [react()],
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
				modifyVars: {
					'@primary-color': '#1DA57A',
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

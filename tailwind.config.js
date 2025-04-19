/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
	  extend: {
		colors: {
		  primary: {
			DEFAULT: '#727cf5',
			100: '#f3f3fe',
			200: '#d9dbfc',
			300: '#b6b9f8',
			400: '#9398f5',
			500: '#727cf5',
			600: '#5661e6',
			700: '#4147c9',
			800: '#2f349e',
			900: '#232874'
		  },
		  secondary: {
			DEFAULT: '#464f5b',
			100: '#f2f3f5',
			200: '#d5d8dc',
			300: '#a9aeb7',
			400: '#7d8592',
			500: '#464f5b',
			600: '#3a4149',
			700: '#2e3338',
			800: '#222529',
			900: '#16181b'
		  },
		  success: {
			DEFAULT: '#0acf97',
			100: '#e6faf5',
			200: '#c0f2e6',
			300: '#7de4cc',
			400: '#39d7b0',
			500: '#0acf97',
			600: '#09b383',
			700: '#078e68',
			800: '#05694d',
			900: '#034534'
		  },
		  info: {
			DEFAULT: '#39afd1',
			100: '#eef8fb',
			200: '#d1ecf5',
			300: '#a3d9ea',
			400: '#6ec7df',
			500: '#39afd1',
			600: '#2c8eaa',
			700: '#216f84',
			800: '#17505f',
			900: '#0e323b'
		  },
		  warning: {
			DEFAULT: '#ffbc00',
			100: '#fff8e6',
			200: '#ffedb3',
			300: '#ffe180',
			400: '#ffd54d',
			500: '#ffbc00',
			600: '#d69f00',
			700: '#a67b00',
			800: '#755700',
			900: '#453400'
		  },
		  danger: {
			DEFAULT: '#fa5c7c',
			100: '#fef2f5',
			200: '#fcd6de',
			300: '#f9acbc',
			400: '#fc8299',
			500: '#fa5c7c',
			600: '#e13e5e',
			700: '#b42e48',
			800: '#871f33',
			900: '#5a151f'
		  }
		}
	  },
	},
	plugins: [],
  }
  
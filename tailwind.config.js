/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
			},

			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},

			keyframes: {
				countdownTick: {
					'0%': { transform: 'translateY(-40%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				colonBlink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.25' },
				},
			},
			animation: {
				countdownTick: 'countdownTick 0.35s ease-out',
				colonBlink: 'colonBlink 1.2s ease-in-out infinite',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};

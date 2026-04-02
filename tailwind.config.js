const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Fira Code"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'muted-green': {
          50: '#f0f5f0',
          100: '#d8e6d8',
          200: '#b3cfb3',
          300: '#8eb88e',
          400: '#69a169',
          500: '#4f8a4f',
          600: '#3e6d3e',
          700: '#2e512e',
          800: '#1e341e',
          900: '#0f1a0f',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        espresso: {
          950: '#1a0b03',
          900: '#241105',
          850: '#2b1307',
          800: '#331707',
          700: '#451f0a',
          600: '#5c2b0e',
          card: '#2f1406',
          cardHover: '#3b1a08',
          border: 'rgba(255, 233, 217, 0.14)',
        },
        champagne: {
          50: '#fffcf9',
          100: '#ffe9d9',
          200: '#f5d4be',
          300: '#e0b59b',
          sand: '#cdb9ab',
        },
        copper: {
          DEFAULT: '#ff7e36',
          light: '#f3a675',
          gold: '#e59a67',
        },
        fitness: {
          dark: '#241105',
          surface: '#2b1307',
          card: '#2f1406',
          cardHover: '#3b1a08',
          border: 'rgba(255, 233, 217, 0.14)',
          subtle: '#451f0a',
          accent: '#ffe9d9',
          accentHover: '#ffffff',
          orange: '#ff7e36',
          cyan: '#f3a675',
          rose: '#e0533c',
          muted: '#cdb9ab',
        }
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}

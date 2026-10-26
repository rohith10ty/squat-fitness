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
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      colors: {
        fitness: {
          dark: '#141414',
          surface: '#1c1c1c',
          card: '#222222',
          cardHover: '#2a2a2a',
          border: '#2e2e2e',
          subtle: '#3d3d3d',
          accent: '#ccff00',      // neon volt lime
          accentHover: '#b5e600',
          orange: '#ff6b35',
          cyan: '#00f0ff',
          rose: '#ff3366',
          muted: '#808080',
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
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

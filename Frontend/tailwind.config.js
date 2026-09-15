/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0c0e17',
          850: '#111422',
          800: '#161a2c',
          750: '#1c2138',
          700: '#232946',
          600: '#323a63',
          border: 'rgba(255, 255, 255, 0.08)',
          card: 'rgba(18, 22, 36, 0.75)',
        },
        brand: {
          primary: '#818cf8',
          accent: '#9333ea',
          light: '#c7d2fe',
          glow: 'rgba(129, 140, 248, 0.15)',
        },
        audit: {
          strong: '#34d399',
          good: '#60a5fa',
          needsImp: '#f59e0b',
          weak: '#f87171',
        }
      },
      fontFamily: {
        sans: ['"Google Sans"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(129, 140, 248, 0.25)',
        'glow-emerald': '0 0 25px -5px rgba(52, 211, 153, 0.25)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 0%, rgba(129, 140, 248, 0.12) 0%, rgba(12, 14, 23, 0) 70%)',
        'grid-pattern': 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}

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
        obsidian: {
          950: '#06070B',
          900: '#090A0F',
          800: '#11131C',
          700: '#1A1D2B',
          600: '#262A3E',
        },
        paper: {
          50: '#FAF8F5',
          100: '#F4EFEA',
          200: '#E8DFD5',
          300: '#D5C7B8',
          800: '#2A2521',
          900: '#171412',
        },
        track: {
          dsa: '#10B981',
          github: '#84CC16',
          uni: '#3B82F6',
          gate: '#8B5CF6',
          afcat: '#06B6D4',
          cat: '#F59E0B',
          ssc: '#F43F5E',
          upsc: '#EA580C',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glass-glow': '0 0 25px -5px rgba(255, 255, 255, 0.05)',
        'dsa-glow': '0 0 20px -3px rgba(16, 185, 129, 0.25)',
        'gate-glow': '0 0 20px -3px rgba(139, 92, 246, 0.25)',
        'upsc-glow': '0 0 20px -3px rgba(234, 88, 12, 0.25)',
      }
    },
  },
  plugins: [],
}

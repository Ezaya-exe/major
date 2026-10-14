import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F0F7FA',
          100: '#D9EDF4',
          200: '#B3DAE9',
          300: '#7BBED4',
          400: '#429FBD',
          500: '#1E7FA6',
          600: '#16688A',
          700: '#12536E',
          800: '#0E4256',
          900: '#0A2C3B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        reading: '68ch',
        content: '640px',
        shell: '1120px',
      },
    },
  },
  plugins: [],
} satisfies Config

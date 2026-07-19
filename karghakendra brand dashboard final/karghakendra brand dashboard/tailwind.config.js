export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
        display: ['Amita', 'serif'],
      },
      colors: {
        ivory: {
          DEFAULT: 'var(--color-ivory-100)',
          50: 'var(--color-ivory-50)',
          100: 'var(--color-ivory-100)',
          200: 'var(--color-ivory-200)',
          300: 'var(--color-ivory-300)',
        },
        clay: {
          50: 'var(--color-clay-50)',
          100: 'var(--color-clay-100)',
          200: 'var(--color-clay-200)',
          300: 'var(--color-clay-300)',
          400: 'var(--color-clay-400)',
          500: 'var(--color-clay-500)',
          600: 'var(--color-clay-600)',
          700: 'var(--color-clay-700)',
          800: 'var(--color-clay-800)',
          900: 'var(--color-clay-900)',
        },
        gold: {
          50: 'var(--color-gold-50)',
          100: 'var(--color-gold-100)',
          200: 'var(--color-gold-200)',
          300: 'var(--color-gold-300)',
          400: 'var(--color-gold-400)',
          500: 'var(--color-gold-500)',
          600: 'var(--color-gold-600)',
        },
        sage: {
          100: 'var(--color-sage-100)',
          400: 'var(--color-sage-400)',
          500: 'var(--color-sage-500)',
        },
      },
      boxShadow: {
        soft: '2px 2px 0 var(--shadow-color-1), 0 6px 18px -14px var(--shadow-color-2)',
        card: '3px 3px 0 var(--shadow-color-3), 0 12px 26px -18px var(--shadow-color-4)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

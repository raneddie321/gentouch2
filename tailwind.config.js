/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stage: '#ECEEF2',
        paper: '#FFFFFF',
        ink: { DEFAULT: '#121417', 2: '#2B3039' },
        mute: { DEFAULT: '#596170', 2: '#8A93A3' },
        line: { DEFAULT: '#D9DDE4', strong: '#B6BDC8' },
        go: { DEFAULT: '#34D61C', deep: '#1B850C', tint: '#E4F8DE' },
        hot: { DEFAULT: '#E5341A', tint: '#FDE8E3' },
        signal: { DEFAULT: '#2E5BFF', tint: '#E6ECFF' },
        mat: { DEFAULT: '#1D5A70', deep: '#164858', line: '#2A6C84' },
        tile: { consoles: '#D7E2FF', pcs: '#E5DEFF', games: '#CFF1E6', sims: '#FFE6BF', rc: '#D9F5C9', merch: '#FFD9E6' },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Hebrew"', 'system-ui', 'sans-serif'],
        display: ['Karantina', '"IBM Plex Sans Hebrew"', 'sans-serif'],
      },
      boxShadow: {
        hard: '-3px 3px 0 #121417',
        'hard-sm': '-2px 2px 0 #121417',
        'hard-lg': '-6px 6px 0 #121417',
        lift: '0 1px 2px rgba(18,20,23,.05), 0 12px 28px -14px rgba(18,20,23,.22)',
      },
      keyframes: {
        stick: {
          '0%': { opacity: 0, transform: 'scale(1.12) rotate(-6deg)' },
          '60%': { opacity: 1, transform: 'scale(.98) rotate(-2.5deg)' },
          '100%': { opacity: 1, transform: 'scale(1) rotate(-3deg)' },
        },
        rise: { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        stick: 'stick .7s cubic-bezier(.2,.8,.2,1) both',
        rise: 'rise .25s ease-out both',
      },
    },
  },
  plugins: [],
}

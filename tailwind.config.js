/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#07090D', 900: '#0B0D12', 850: '#0F121A', 800: '#141821', 700: '#1B2030', 600: '#252B3D', 500: '#343B52' },
        fire: { 300: '#FF9A7A', 400: '#FF6B45', 500: '#FF4D2E', 600: '#E63A1C' },
        neon: { 300: '#B3A4FF', 400: '#9479FF', 500: '#7C5CFF', 600: '#6744F0' },
        slime: { 400: '#5CFF3A', 500: '#39E81B' },
        mist: { 100: '#EEF1F7', 300: '#B6BDCE', 400: '#8A93A8', 500: '#646D84' },
      },
      fontFamily: {
        sans: ['Heebo', 'Rubik', 'system-ui', 'sans-serif'],
        display: ['Rubik', 'Heebo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,77,46,.35), 0 10px 40px -10px rgba(255,77,46,.55)',
        neon: '0 0 0 1px rgba(124,92,255,.35), 0 10px 40px -12px rgba(124,92,255,.6)',
        card: '0 1px 0 rgba(255,255,255,.04) inset, 0 20px 40px -24px rgba(0,0,0,.8)',
      },
      keyframes: {
        'fade-up': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'none' } },
        'slide-in': { from: { transform: 'translateX(-100%)' }, to: { transform: 'none' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(50%)' } },
      },
      animation: {
        'fade-up': 'fade-up .5s cubic-bezier(.2,.7,.2,1) both',
        'slide-in': 'slide-in .35s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}

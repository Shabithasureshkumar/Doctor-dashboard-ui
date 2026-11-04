/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F8F6FF',
          100: '#F0EBFE',
          200: '#DDD4FE',
          300: '#C2B1FD',
          400: '#9E80FA',
          500: '#815BF5',
          600: '#6E56CF',
          700: '#5C43B8',
          800: '#4B3598',
          900: '#3D2A7C',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FBFBFE',
          muted: '#F5F5FA',
        }
      },
      boxShadow: {
        'card': '0 2px 10px rgba(110, 86, 207, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -5px rgba(110, 86, 207, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 50px rgba(24, 20, 48, 0.18)',
        'glow': '0 0 20px rgba(110, 86, 207, 0.35)',
      }
    },
  },
  plugins: [],
}

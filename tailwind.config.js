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
          50: '#F5F1FF',
          100: '#EBE4FF',
          200: '#D7CBFE',
          300: '#BCA8FD',
          400: '#9A6AFB',
          500: '#7B43FF',
          600: '#5C24FF',
          700: '#4A15E8',
          800: '#3A0EC2',
          900: '#2A0994',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FBFBFE',
          muted: '#F5F5FA',
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #9A6AFB 0%, #5C24FF 100%)',
        'brand-gradient-r': 'linear-gradient(90deg, #9A6AFB 0%, #5C24FF 100%)',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(92, 36, 255, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 10px 25px -5px rgba(92, 36, 255, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 50px rgba(24, 20, 48, 0.18)',
        'glow': '0 0 20px rgba(92, 36, 255, 0.35)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        xfinity: {
          black: '#000000',
          'gray-950': '#0a0a0a',
          'gray-900': '#121212',
          'gray-850': '#1a1a1a',
          'gray-800': '#222222',
          'gray-700': '#2e2e2e',
          'gray-600': '#3a3a3a',
          'gray-500': '#555555',
          'gray-400': '#888888',
          'gray-300': '#aaaaaa',
          'gray-200': '#cccccc',
          'gray-100': '#e8e8e8',
          'gray-50': '#f5f5f5',
        },
        brand: {
          red: '#e4002b',
          'red-dark': '#c00024',
          'red-light': '#ff1a3e',
          'red-hover': '#d40027',
        },
        accent: {
          blue: '#0066cc',
          'blue-light': '#3399ff',
          green: '#008a00',
          'green-light': '#00b300',
          yellow: '#f5a623',
          'yellow-light': '#ffb940',
          orange: '#e8770f',
        },
      },
      fontFamily: {
        sans: ['"Xfinity Sans"', 'Century Gothic', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        'typing': 'typing 1.4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

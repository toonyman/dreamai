import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian': {
          DEFAULT: '#0a0a0c',
          light: '#1a1a1e',
          dark: '#050506',
        },
        'mystic': {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          'glow': '#a29bfe',
        },
        'midnight': {
          50: '#e6e9f0',
          100: '#c2c9de',
          200: '#9ba7ca',
          300: '#7485b6',
          400: '#566ba7',
          500: '#385198',
          600: '#324a90',
          700: '#2b4085',
          800: '#24377b',
          900: '#17276a',
        },
        'dream': {
          light: '#a8b5d1',
          DEFAULT: '#6b7fa8',
          dark: '#3d4f6f',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dreamy': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'mystic-gradient': 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 50%, #d946ef 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'drift': 'drift 20s linear infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'shine-slow': 'shine-slow 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(162, 155, 254, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(162, 155, 254, 0.8)' },
        },
        drift: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(-100%) rotate(10deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shine-slow': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
    },
  },
  plugins: [],
};
export default config;

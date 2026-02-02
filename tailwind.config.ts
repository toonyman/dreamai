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
      },
    },
  },
  plugins: [],
};
export default config;

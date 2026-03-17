import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          600: '#FF6B35',
          700: '#E55A20',
        },
        blue: {
          500: '#00D4FF',
        },
        green: {
          600: '#10B981',
        },
        yellow: {
          500: '#F59E0B',
        },
        red: {
          500: '#EF4444',
        },
        slate: {
          900: '#0f172a',
        },
      },
      scale: {
        102: '1.02',
        98: '0.98',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;

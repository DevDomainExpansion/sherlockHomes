import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0b1224',
        accent: '#c9f31d'
      }
    }
  },
  plugins: []
};

export default config;


import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          ivory: '#FAF7F2',
          cream: '#F4EFE6',
          sand: '#EBE3D5',
          gold: '#C5A880',
          'gold-light': '#E8D8C3',
          'gold-dark': '#A3845A',
          'gold-rich': '#D4AF37',
          charcoal: '#141413',
          dark: '#1C1B19',
          muted: '#68635C',
          border: '#E3DBD0',
          borderLight: '#F0EBE1',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        accent: ['var(--font-italiana)', 'Cinzel', 'serif'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.25em',
        ultra: '0.35em',
      },
      boxShadow: {
        subtle: '0 4px 20px -2px rgba(28, 27, 25, 0.04)',
        card: '0 10px 30px -5px rgba(28, 27, 25, 0.06)',
        hover: '0 20px 40px -10px rgba(197, 168, 128, 0.15)',
        gold: '0 0 25px rgba(197, 168, 128, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;

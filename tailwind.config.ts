import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#08090A',
          deep: '#040505',
          light: '#0F1113',
          card: '#121517',
          elevated: '#181C1E',
          surface: '#1F2428',
        },
        gold: {
          DEFAULT: '#C8A261', // Inti Gold
          light: '#E0C28A',
          dark: '#9A7736',
          shimmer: '#F2DFB8',
          subtle: 'rgba(200, 162, 97, 0.15)',
        },
        emerald: {
          sacred: '#1B382B',
          glow: '#2B5843',
        },
        mist: {
          DEFAULT: '#F4F4F0',
          muted: '#9CA3AF',
          subtle: '#6B7280',
          dark: '#374151',
        },
        terracotta: {
          DEFAULT: '#DD3C20',
          warm: '#CB9275',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      letterSpacing: {
        'super-wide': '0.25em',
        'ultra-wide': '0.35em',
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(200, 162, 97, 0.3)',
        'obsidian-glow': '0 20px 50px -10px rgba(0, 0, 0, 0.8)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;

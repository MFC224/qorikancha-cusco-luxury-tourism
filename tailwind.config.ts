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
          DEFAULT: 'rgb(var(--bg-obsidian-rgb) / <alpha-value>)',
          deep: 'rgb(var(--bg-obsidian-deep-rgb) / <alpha-value>)',
          light: 'rgb(var(--bg-obsidian-light-rgb) / <alpha-value>)',
          card: 'rgb(var(--bg-obsidian-card-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--bg-obsidian-elevated-rgb) / <alpha-value>)',
          surface: 'rgb(var(--bg-obsidian-surface-rgb) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--gold-rgb) / <alpha-value>)',
          light: 'rgb(var(--gold-light-rgb) / <alpha-value>)',
          dark: 'rgb(var(--gold-dark-rgb) / <alpha-value>)',
          shimmer: 'rgb(var(--gold-shimmer-rgb) / <alpha-value>)',
          subtle: 'rgba(var(--gold-rgb), 0.15)',
        },
        mist: {
          DEFAULT: 'rgb(var(--mist-rgb) / <alpha-value>)',
          muted: 'rgb(var(--mist-muted-rgb) / <alpha-value>)',
          subtle: 'rgb(var(--mist-subtle-rgb) / <alpha-value>)',
          dark: 'rgb(var(--mist-dark-rgb) / <alpha-value>)',
        },
        terracotta: {
          DEFAULT: '#DD3C20',
          warm: '#CB9275',
        },
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'], // Eliminamos tipografía de consola / robot
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

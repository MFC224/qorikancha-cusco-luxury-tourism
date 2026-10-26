'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = (targetTheme: 'dark' | 'light') => {
    setTheme(targetTheme);
    if (targetTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      try {
        localStorage.setItem('qorikancha_theme', 'dark');
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('qorikancha_theme', 'light');
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
    }
  };

  if (!mounted) {
    return (
      <div className="w-[58px] h-[28px] rounded-full border border-gold/30 bg-obsidian-card/60 animate-pulse" />
    );
  }

  return (
    <div
      role="group"
      aria-label="Selector de tema visual (Luna / Sol)"
      className="flex items-center rounded-full border border-gold/30 bg-obsidian-card/70 p-0.5 select-none shadow-sm backdrop-blur-md notranslate"
    >
      <button
        type="button"
        onClick={() => toggleTheme('dark')}
        aria-label="Activar Modo Oscuro (Luna)"
        title="Modo Oscuro"
        data-cursor="NOCHE"
        className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === 'dark'
            ? 'bg-gold text-obsidian shadow-gold-glow'
            : 'text-mist/60 hover:text-gold'
        }`}
      >
        <Moon className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        onClick={() => toggleTheme('light')}
        aria-label="Activar Modo Claro (Sol)"
        title="Modo Claro"
        data-cursor="DÍA"
        className={`p-1.5 rounded-full transition-all duration-300 flex items-center justify-center ${
          theme === 'light'
            ? 'bg-gold text-obsidian shadow-gold-glow'
            : 'text-mist/60 hover:text-gold'
        }`}
      >
        <Sun className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

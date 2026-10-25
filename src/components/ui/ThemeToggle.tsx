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
      <div className="w-[68px] h-[26px] rounded-full border border-gold/30 bg-obsidian-card/60 animate-pulse" />
    );
  }

  return (
    <div
      role="group"
      aria-label="Selector de tema visual"
      className="flex items-center rounded-full border border-gold/30 bg-obsidian-card/70 p-0.5 text-[10px] font-sans font-bold tracking-wider select-none shadow-sm"
    >
      <button
        type="button"
        onClick={() => toggleTheme('dark')}
        aria-label="Activar Modo Oscuro (Obsidian)"
        title="Modo Oscuro (Obsidian)"
        data-cursor="OSCURO"
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-gold text-obsidian font-extrabold shadow-gold-glow'
            : 'text-mist/60 hover:text-gold'
        }`}
      >
        <Moon className="w-3 h-3 shrink-0" />
        <span className="hidden xl:inline text-[9px] uppercase tracking-widest">Noche</span>
      </button>

      <button
        type="button"
        onClick={() => toggleTheme('light')}
        aria-label="Activar Modo Claro (Travertino)"
        title="Modo Claro (Travertino)"
        data-cursor="CLARO"
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all duration-300 ${
          theme === 'light'
            ? 'bg-gold text-obsidian font-extrabold shadow-gold-glow'
            : 'text-mist/60 hover:text-gold'
        }`}
      >
        <Sun className="w-3 h-3 shrink-0" />
        <span className="hidden xl:inline text-[9px] uppercase tracking-widest">Día</span>
      </button>
    </div>
  );
}

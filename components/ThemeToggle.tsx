'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
        ${isDark
          ? 'bg-[#9BB8F0]/20 text-[#9BB8F0] hover:bg-[#9BB8F0]/30 border border-[#9BB8F0]/30'
          : 'bg-[#9BB8F0] text-white hover:bg-[#8BA8E0] shadow-md'
        }`}
      title="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
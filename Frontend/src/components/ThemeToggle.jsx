import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
      className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center group ${
        isDark 
          ? 'bg-[#151928] hover:bg-[#1f253d] border-white/[0.1] text-amber-400 hover:text-amber-300 hover:border-amber-400/30 shadow-sm' 
          : 'bg-white hover:bg-slate-100 border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" />
        ) : (
          <Moon className="w-4 h-4 transform group-hover:-rotate-12 transition-transform duration-300" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

import React from 'react';
import { FileText, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function AppHeader({ activePlan, onNavigate, rightAction }) {
  const { isDark } = useTheme();

  return (
    <header className={`h-16 border-b backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20 transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0d0f17]/90 border-white/[0.06]' 
        : 'bg-white/90 border-slate-200 shadow-sm'
    }`}>
      {/* Left Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 text-sm ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <FileText className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {activePlan ? activePlan.sessionName : "PlanLens AI • Diagnostic Engine"}
          </span>
        </div>
        <span className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-500/15 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30 rounded-full">
          Active
        </span>
      </div>

      {/* Right Actions, Theme Toggle & User Avatar */}
      <div className="flex items-center gap-3.5">
        {rightAction}
        
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* User Avatar */}
        <div className={`flex items-center gap-3 pl-3 border-l ${
          isDark ? 'border-white/[0.08]' : 'border-slate-200'
        }`}>
          <div className="w-8 h-8 rounded-full ring-2 ring-indigo-500/30 bg-gradient-to-tr from-slate-700 to-indigo-900 overflow-hidden flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="User" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <User className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </div>
    </header>
  );
}

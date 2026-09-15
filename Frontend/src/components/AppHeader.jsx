import React, { useState, useRef, useEffect } from 'react';
import { FileText, User, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function AppHeader({ activePlan, onNavigate, rightAction, currentUser, onSignOut }) {
  const { isDark } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* User Profile Dropdown */}
        <div className={`relative pl-3 border-l ${
          isDark ? 'border-white/[0.08]' : 'border-slate-200'
        }`} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/[0.05] transition-all focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full ring-2 ring-indigo-500/30 bg-gradient-to-tr from-slate-700 to-indigo-900 overflow-hidden flex items-center justify-center">
              <img 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"} 
                alt="User" 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <User className="w-4 h-4 text-slate-300" />
            </div>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${
              dropdownOpen ? 'rotate-180' : ''
            } ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className={`absolute right-0 mt-2 w-56 border rounded-2xl p-2 shadow-2xl z-50 transition-all ${
              isDark 
                ? 'bg-[#141828] border-white/[0.08] shadow-card-glass text-slate-200' 
                : 'bg-white border-slate-200 shadow-xl text-slate-800'
            }`}>
              <div className={`px-3 py-2 border-b ${isDark ? 'border-white/[0.06]' : 'border-slate-100'}`}>
                <div className="text-xs font-bold truncate">
                  {currentUser?.name || "CampusBite Founder"}
                </div>
                <div className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentUser?.email || "founder@campusbite.io"}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setDropdownOpen(false); onNavigate('dashboard'); }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center gap-2 ${
                    isDark ? 'hover:bg-white/[0.05]' : 'hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Audit History</span>
                </button>
              </div>

              <div className={`pt-1 border-t ${isDark ? 'border-white/[0.06]' : 'border-slate-100'}`}>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    if (onSignOut) onSignOut();
                  }}
                  className="w-full text-left px-3 py-2 text-xs rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-2 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

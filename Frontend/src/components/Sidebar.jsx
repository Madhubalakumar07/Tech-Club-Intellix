import React from 'react';
import { LayoutGrid, PlusCircle, Settings, FileText, ArrowLeft, ChevronRight } from 'lucide-react';

export default function Sidebar({ currentScreen, onNavigate, activePlan }) {
  return (
    <aside className="w-64 bg-[#0d0f17] border-r border-white/[0.06] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Top Section */}
      <div className="p-5">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer pb-6 border-b border-white/[0.06] group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-glow">
            <svg className="w-4 h-4 text-white transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
            PlanLens <span className="text-indigo-400 font-extrabold">AI</span>
          </span>
        </div>

        {/* Navigation Items */}
        <div className="mt-6 space-y-1.5">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentScreen === 'dashboard' || currentScreen === 'section-review'
                ? 'bg-white/[0.08] text-white font-semibold shadow-sm border border-white/[0.05]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onNavigate('upload')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              currentScreen === 'upload'
                ? 'bg-white/[0.08] text-white font-semibold shadow-sm border border-white/[0.05]'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
        </div>

        {/* Active Project Pill */}
        {activePlan && (
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Active Project
            </div>
            <div 
              onClick={() => onNavigate('dashboard')}
              className="p-3 rounded-lg bg-[#141824] border border-white/[0.06] hover:border-indigo-500/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm font-semibold text-white truncate max-w-[120px]">
                    {activePlan.name}
                  </span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {activePlan.aggregateScore}/100
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {activePlan.appraisalType}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/[0.06]">
        <button 
          onClick={() => alert("PlanLens Settings & API Keys modal")}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}

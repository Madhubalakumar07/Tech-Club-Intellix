import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Layers, HelpCircle, FileText } from 'lucide-react';

export default function Navbar({ onNavigate, currentScreen }) {
  return (
    <nav className="w-full bg-[#0b0d14]/80 backdrop-blur-xl border-b border-white/[0.06] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-glow">
            {/* PlanLens Diamond / Prism Icon */}
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

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button 
            onClick={() => onNavigate('home')}
            className={`hover:text-white transition-colors ${currentScreen === 'home' ? 'text-white' : ''}`}
          >
            How It Works
          </button>
          <button 
            onClick={() => onNavigate('upload')}
            className={`hover:text-white transition-colors ${currentScreen === 'upload' ? 'text-white' : ''}`}
          >
            Frameworks
          </button>
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`hover:text-white transition-colors ${currentScreen === 'dashboard' ? 'text-white' : ''}`}
          >
            Sample Audits
          </button>
          <button 
            onClick={() => onNavigate('upload')}
            className="hover:text-white transition-colors text-slate-400"
          >
            Sign In
          </button>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('upload')}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-glow transition-all flex items-center gap-2 group border border-indigo-400/30"
          >
            <span>Analyze My Business Plan</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  );
}

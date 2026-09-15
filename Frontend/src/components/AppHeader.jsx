import React from 'react';
import { FileText, ChevronRight, User, PlusCircle } from 'lucide-react';

export default function AppHeader({ activePlan, onNavigate, rightAction }) {
  return (
    <header className="h-16 border-b border-white/[0.06] bg-[#0d0f17]/90 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Left Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <FileText className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-white">
            {activePlan ? activePlan.sessionName : "PlanLens AI • Diagnostic Engine"}
          </span>
        </div>
        <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full">
          Active
        </span>
      </div>

      {/* Right User & Actions */}
      <div className="flex items-center gap-4">
        {rightAction}
        
        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/[0.08]">
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

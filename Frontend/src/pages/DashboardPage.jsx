import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  TrendingDown, 
  Target, 
  Megaphone, 
  ShieldAlert, 
  Layers, 
  DollarSign, 
  Clock, 
  Check,
  Share2,
  Download
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';

export default function DashboardPage({ 
  plan, 
  onNavigate, 
  onSelectPillar 
}) {
  // Color helper according to score or status
  const getScoreBadge = (score, status) => {
    if (score >= 80) return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Strong' };
    if (score >= 65) return { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Good' };
    if (score >= 50) return { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Needs Imp.' };
    return { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30', label: 'Weak' };
  };

  // Helper for priority icons
  const getBlockerIcon = (iconName) => {
    switch (iconName) {
      case 'TrendingDown': return <TrendingDown className="w-4 h-4 text-rose-400" />;
      case 'Target': return <Target className="w-4 h-4 text-rose-400" />;
      case 'Megaphone': return <Megaphone className="w-4 h-4 text-amber-400" />;
      default: return <AlertCircle className="w-4 h-4 text-rose-400" />;
    }
  };

  const circumference = 2 * Math.PI * 48; // radius 48
  const strokeDashoffset = circumference - (plan.aggregateScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#0b0d14] flex text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar currentScreen="dashboard" onNavigate={onNavigate} activePlan={plan} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader 
          activePlan={plan} 
          onNavigate={onNavigate}
          rightAction={
            <button
              onClick={() => onNavigate('upload')}
              className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 border border-white/[0.08] transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Analyze Another Plan</span>
            </button>
          }
        />

        <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
          
          {/* Main Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Business Plan Review
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Analysis Complete
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400 font-mono">
                {plan.name} | {plan.appraisalType} • {plan.auditVersion}
              </p>
            </div>

            {/* Quick Export / Print */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-slate-300 border border-white/[0.06] transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Top Two Main Cards Grid: Executive Evaluation & Priority Improvements */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Card 1: Executive Evaluation (5 cols) */}
            <div className="lg:col-span-5 bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    EXECUTIVE EVALUATION
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                    {plan.evaluationVerdict}
                  </span>
                </div>

                {/* Score and Donut Gauge */}
                <div className="mt-6 flex items-center gap-6">
                  {/* Circular Donut Gauge */}
                  <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
                      {/* Background circle */}
                      <circle
                        cx="55"
                        cy="55"
                        r="48"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="8"
                        fill="transparent"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="55"
                        cy="55"
                        r="48"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="circle-progress"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white leading-none">
                        {plan.aggregateScore}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                        /100
                      </span>
                    </div>
                  </div>

                  {/* Score Description */}
                  <div>
                    <div className="text-xs font-mono text-slate-400">
                      AGGREGATE SCORE
                    </div>
                    <div className="text-lg font-bold text-white mt-0.5">
                      {plan.aggregateScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                    </div>
                    <div className="text-xs text-amber-400 font-medium mt-1">
                      {plan.benchmarkStatus}
                    </div>
                  </div>
                </div>

                {/* Summary Paragraph */}
                <p className="mt-6 text-xs text-slate-300 leading-relaxed">
                  {plan.executiveSummary}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audited across {plan.auditedPillarsCount} pillars</span>
                </div>
                <span className="text-indigo-400 font-mono font-medium">
                  Ready for Revision
                </span>
              </div>
            </div>

            {/* Card 2: Priority Improvements (7 cols) */}
            <div className="lg:col-span-7 bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass flex flex-col justify-between">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-bold text-white">
                      Priority Improvements
                    </span>
                    <span className="text-xs font-mono text-slate-400 ml-1">
                      Top 3 Blockers
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 mt-2">
                  Recommended for investor pitch deck validation
                </div>

                {/* 3 Blockers List */}
                <div className="mt-4 space-y-3">
                  {plan.priorityImprovements.map((blocker) => (
                    <div 
                      key={blocker.id}
                      onClick={() => onSelectPillar(blocker.pillarId)}
                      className="p-3.5 rounded-xl bg-[#171b2d] border border-white/[0.06] hover:border-indigo-500/40 cursor-pointer transition-all flex items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${
                          blocker.priorityLevel === 'high' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        } flex items-center justify-center shrink-0`}>
                          {getBlockerIcon(blocker.icon)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                              {blocker.pillarName}
                            </span>
                            <span className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                              blocker.priorityLevel === 'high' ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}>
                              {blocker.priority}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 leading-snug">
                            {blocker.issue}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="text-xs font-mono text-slate-300 px-2 py-1 rounded bg-black/30 border border-white/[0.04]">
                          {blocker.metricTag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectPillar('market-analysis')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 group"
                >
                  <span>View All 7 Actionable Issues</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
                <span className="text-slate-400 font-mono">
                  Estimated revision time: {plan.revisionTime}
                </span>
              </div>
            </div>

          </div>

          {/* Section: Section Breakdown & Analysis */}
          <div className="mt-10">
            {/* Header with Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Section Breakdown & Analysis
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Detailed audit across core strategic criteria
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Strong (80+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Good (65-79)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Needs Imp. (50-64)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Weak (&lt;50)</span>
                </div>
              </div>
            </div>

            {/* 8-Pillar Cards Grid (4 columns) */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {plan.pillars.map((pillar) => {
                const badge = getScoreBadge(pillar.score, pillar.status);

                return (
                  <div
                    key={pillar.id}
                    onClick={() => onSelectPillar(pillar.id)}
                    className="bg-[#121524] border border-white/[0.08] hover:border-indigo-500/40 rounded-xl p-5 shadow-sm hover:shadow-glow transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row: Pillar Number & Status Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          PILLAR {pillar.number}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.bg} ${badge.text} border ${badge.border}`}>
                          {badge.label}
                        </span>
                      </div>

                      {/* Title & Score */}
                      <div className="mt-4 flex items-baseline justify-between gap-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                          {pillar.title}
                        </h3>
                        <div className="flex items-baseline shrink-0">
                          <span className={`text-xl font-extrabold ${badge.text}`}>
                            {pillar.score}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 ml-0.5">/100</span>
                        </div>
                      </div>

                      {/* Pillar summary description */}
                      <p className="mt-2.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {pillar.summary}
                      </p>
                    </div>

                    {/* Footer Row: Status & View Review Link */}
                    <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className={`font-mono text-[11px] ${
                        pillar.score < 50 ? 'text-rose-400' : pillar.score < 65 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {pillar.flagsText}
                      </span>
                      <span className="text-slate-400 group-hover:text-white transition-colors flex items-center gap-0.5 text-[11px] font-medium">
                        <span>View Review</span>
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

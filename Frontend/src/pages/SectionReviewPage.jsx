import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  BookOpen, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Info, 
  ChevronRight, 
  Award,
  HelpCircle,
  TrendingUp,
  Check,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';

export default function SectionReviewPage({ 
  pillar, 
  plan, 
  onNavigate, 
  onSelectPillar,
  onToggleRemediation,
  onMarkReviewed
}) {
  const [isReviewed, setIsReviewed] = useState(false);

  if (!pillar) return null;

  const handleToggleCheck = (remediationId) => {
    if (onToggleRemediation) {
      onToggleRemediation(pillar.id, remediationId);
    }
  };

  const handleMarkReview = () => {
    setIsReviewed(!isReviewed);
    if (onMarkReviewed) {
      onMarkReviewed(pillar.id, !isReviewed);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] flex text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Sidebar */}
      <Sidebar currentScreen="section-review" onNavigate={onNavigate} activePlan={plan} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader 
          activePlan={plan} 
          onNavigate={onNavigate}
        />

        <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
          
          {/* Top Breadcrumb & Return Link */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors mb-4 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Review Dashboard</span>
          </button>

          {/* Section Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {pillar.title}
              </h1>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-white/[0.08] text-slate-300 text-xs font-mono font-medium">
                Section {pillar.number}
              </span>
            </div>

            {/* Score & Verdict Badges */}
            <div className="flex items-center gap-3 bg-[#141828] border border-white/[0.08] rounded-xl px-4 py-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  SECTION SCORE
                </span>
                <span className="text-lg font-bold text-white leading-tight">
                  {pillar.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </span>
              </div>
              <div className="h-7 w-px bg-white/[0.08]" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  AUDIT VERDICT
                </span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                  pillar.score >= 80 ? 'text-emerald-400' : pillar.score >= 65 ? 'text-blue-400' : pillar.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    pillar.score >= 80 ? 'bg-emerald-400' : pillar.score >= 65 ? 'bg-blue-400' : pillar.score >= 50 ? 'bg-amber-400' : 'bg-rose-400'
                  }`} />
                  {pillar.status === 'Needs Imp.' ? 'Needs Improvement' : pillar.status}
                </span>
              </div>
            </div>
          </div>

          {/* Executive Section Summary Box */}
          <div className="mt-6 bg-[#11172a] border border-cyan-500/20 rounded-xl p-4 md:p-5 flex items-start gap-3.5 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
              <Info className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-300">
                EXECUTIVE SECTION SUMMARY
              </div>
              <p className="mt-1 text-sm text-slate-200 leading-relaxed">
                {pillar.executiveSectionSummary}
              </p>
            </div>
          </div>

          {/* 2-Column Grid Layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Identified Strengths */}
              <div className="bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <h2 className="text-sm font-bold text-white">
                      Identified Strengths
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                    {pillar.strengths.length} Verified
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {pillar.strengths.map((str, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Critical Weaknesses */}
              <div className="bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <h2 className="text-sm font-bold text-white">
                      Critical Weaknesses
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-mono font-semibold">
                    {pillar.weaknesses.length} Detected
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {pillar.weaknesses.map((wk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <div className="text-slate-300 leading-relaxed">
                        {wk}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Criteria Checklist (if available) */}
              {pillar.criteriaChecklist && (
                <div className="bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <h2 className="text-sm font-bold text-white">
                      Criteria Checklist
                    </h2>
                    <span className="text-xs font-mono text-slate-400">
                      Venture Benchmark
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {pillar.criteriaChecklist.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1">
                        <span className="text-slate-300">{item.name}</span>
                        {item.status === 'passed' ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Passed
                          </span>
                        ) : item.status === 'warning' ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            Warning
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30">
                            Missing
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Evidence from Your Business Plan */}
              <div className="bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-sm font-bold text-white">
                      Evidence from Your Business Plan
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 border border-white/[0.08] text-slate-400 text-xs font-mono font-medium">
                    Document Segment
                  </span>
                </div>

                {/* Verbatim Excerpt Quote Box */}
                <div className="mt-4 p-5 rounded-xl bg-[#0e111d] border border-white/[0.06] relative">
                  <div className="text-3xl text-slate-600 font-serif leading-none absolute top-3 left-3 select-none">“</div>
                  <p className="text-sm text-cyan-200/90 italic pl-5 leading-relaxed">
                    "{pillar.evidenceQuote}"
                  </p>
                </div>

                {/* Source Annotation Footer */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-400 font-mono">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Source: {pillar.evidenceSource}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                    pillar.evidenceBadge === 'Unverified Claim' || pillar.evidenceBadge === 'High Risk Assumption' || pillar.evidenceBadge === 'Unrealistic Benchmark'
                      ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {pillar.evidenceBadge}
                  </span>
                </div>
              </div>

              {/* Card 2: Knowledge Base Guidance */}
              {pillar.knowledgeBase && (
                <div className="bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <h2 className="text-sm font-bold text-white">
                        Knowledge Base Guidance
                      </h2>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium">
                      Methodology
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-mono font-bold text-indigo-300">
                      Framework: {pillar.knowledgeBase.framework}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {pillar.knowledgeBase.description}
                    </p>
                  </div>

                  {/* Framework Points (e.g. TAM / SAM / SOM) */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pillar.knowledgeBase.points.map((pt, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#171b2e] border border-white/[0.06]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span className="text-xs font-bold text-white font-mono">
                            {pt.label}
                          </span>
                        </div>
                        {pt.subtitle && (
                          <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                            {pt.subtitle}
                          </div>
                        )}
                        <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                          {pt.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 3: Recommended Improvement & "WHAT TO FIX" */}
              <div className="bg-[#121524] border border-white/[0.08] rounded-2xl p-6 shadow-card-glass">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h2 className="text-sm font-bold text-white">
                      Recommended Improvement & Action Plan
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 font-semibold">
                    WHAT TO FIX
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {pillar.remediations.map((rem) => (
                    <div 
                      key={rem.id}
                      onClick={() => handleToggleCheck(rem.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        rem.done 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300' 
                          : 'bg-[#171b2d] border-white/[0.06] hover:border-indigo-500/40 text-white'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0">
                        {rem.done ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500 hover:text-indigo-400" />
                        )}
                      </button>
                      <span className={`text-xs leading-relaxed ${rem.done ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                        {rem.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Action Buttons */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Fixing items updates the aggregate investor readiness score.
                  </span>

                  <button
                    onClick={handleMarkReview}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                      isReviewed 
                        ? 'bg-emerald-600 text-white shadow-glow-emerald border border-emerald-400/40' 
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-glow border border-indigo-400/40'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isReviewed ? "Marked as Reviewed ✔" : "Mark as Reviewed"}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Quick Pillar Switcher Carousel at Bottom */}
          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              Explore other audited pillars:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {plan.pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPillar(p.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    p.id === pillar.id 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold' 
                      : 'bg-[#121524] border-white/[0.06] hover:border-white/[0.15] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400">Pillar {p.number}</div>
                  <div className="text-xs truncate font-medium mt-0.5">{p.shortTitle}</div>
                  <div className={`text-[11px] font-mono font-bold mt-1 ${
                    p.score >= 80 ? 'text-emerald-400' : p.score >= 65 ? 'text-blue-400' : p.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {p.score}/100
                  </div>
                </button>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

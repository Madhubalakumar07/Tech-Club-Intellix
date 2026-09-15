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
  Check
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';
import { useTheme } from '../context/ThemeContext';

export default function SectionReviewPage({ 
  pillar, 
  plan, 
  onNavigate, 
  onSelectPillar,
  onToggleRemediation,
  onMarkReviewed
}) {
  const { isDark } = useTheme();
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
    <div className={`min-h-screen flex selection:bg-indigo-500 selection:text-white transition-colors duration-300 ${
      isDark ? 'bg-[#0b0d14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
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
            className="inline-flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-600 font-semibold transition-colors mb-4 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Review Dashboard</span>
          </button>

          {/* Section Header Bar */}
          <div className={`flex flex-wrap items-center justify-between gap-4 pb-6 border-b ${
            isDark ? 'border-white/[0.06]' : 'border-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <h1 className={`text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {pillar.title}
              </h1>
              <span className={`px-2.5 py-1 rounded-md border text-xs font-mono font-medium ${
                isDark ? 'bg-slate-800 border-white/[0.08] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                Section {pillar.number}
              </span>
            </div>

            {/* Score & Verdict Badges */}
            <div className={`flex items-center gap-3 border rounded-xl px-4 py-2 ${
              isDark ? 'bg-[#141828] border-white/[0.08]' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  SECTION SCORE
                </span>
                <span className={`text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {pillar.score} <span className={`text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>/ 100</span>
                </span>
              </div>
              <div className={`h-7 w-px ${isDark ? 'bg-white/[0.08]' : 'bg-slate-200'}`} />
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  AUDIT VERDICT
                </span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                  pillar.score >= 80 ? 'text-emerald-500' : pillar.score >= 65 ? 'text-blue-500' : pillar.score >= 50 ? 'text-amber-500' : 'text-rose-500'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    pillar.score >= 80 ? 'bg-emerald-500' : pillar.score >= 65 ? 'bg-blue-500' : pillar.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                  {pillar.status === 'Needs Imp.' ? 'Needs Improvement' : pillar.status}
                </span>
              </div>
            </div>
          </div>

          {/* Executive Section Summary Box */}
          <div className={`mt-6 border rounded-xl p-4 md:p-5 flex items-start gap-3.5 shadow-sm transition-colors ${
            isDark 
              ? 'bg-[#11172a] border-cyan-500/20' 
              : 'bg-cyan-50/70 border-cyan-200'
          }`}>
            <div className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-500 shrink-0 mt-0.5">
              <Info className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-300">
                EXECUTIVE SECTION SUMMARY
              </div>
              <p className={`mt-1 text-sm leading-relaxed ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
                {pillar.executiveSectionSummary}
              </p>
            </div>
          </div>

          {/* 2-Column Grid Layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Identified Strengths */}
              <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Identified Strengths
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold">
                    {pillar.strengths.length} Verified
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {pillar.strengths.map((str, idx) => (
                    <div key={idx} className={`flex items-start gap-2.5 text-xs ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2: Critical Weaknesses */}
              <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Critical Weaknesses
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-mono font-semibold">
                    {pillar.weaknesses.length} Detected
                  </span>
                </div>

                <div className="mt-4 space-y-4">
                  {pillar.weaknesses.map((wk, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                      <div className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {wk}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Criteria Checklist (if available) */}
              {pillar.criteriaChecklist && (
                <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                  isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-md'
                }`}>
                  <div className={`flex items-center justify-between pb-4 border-b ${
                    isDark ? 'border-white/[0.06]' : 'border-slate-100'
                  }`}>
                    <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Criteria Checklist
                    </h2>
                    <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Venture Benchmark
                    </span>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {pillar.criteriaChecklist.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1">
                        <span className={isDark ? "text-slate-300" : "text-slate-700"}>{item.name}</span>
                        {item.status === 'passed' ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                            Passed
                          </span>
                        ) : item.status === 'warning' ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                            Warning
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
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
              <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Evidence from Your Business Plan
                    </h2>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-md border text-xs font-mono font-medium ${
                    isDark ? 'bg-slate-800 border-white/[0.08] text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    Document Segment
                  </span>
                </div>

                {/* Verbatim Excerpt Quote Box */}
                <div className={`mt-4 p-5 rounded-xl border relative ${
                  isDark ? 'bg-[#0e111d] border-white/[0.06]' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="text-3xl text-slate-400/40 font-serif leading-none absolute top-3 left-3 select-none">“</div>
                  <p className={`text-sm italic pl-5 leading-relaxed ${
                    isDark ? 'text-cyan-200/90' : 'text-cyan-900'
                  }`}>
                    "{pillar.evidenceQuote}"
                  </p>
                </div>

                {/* Source Annotation Footer */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs">
                  <div className={`flex items-center gap-2 font-mono ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Source: {pillar.evidenceSource}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold ${
                    pillar.evidenceBadge === 'Unverified Claim' || pillar.evidenceBadge === 'High Risk Assumption' || pillar.evidenceBadge === 'Unrealistic Benchmark'
                      ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {pillar.evidenceBadge}
                  </span>
                </div>
              </div>

              {/* Card 2: Knowledge Base Guidance */}
              {pillar.knowledgeBase && (
                <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                  isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-md'
                }`}>
                  <div className={`flex items-center justify-between pb-4 border-b ${
                    isDark ? 'border-white/[0.06]' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyan-500" />
                      <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Knowledge Base Guidance
                      </h2>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-medium">
                      Methodology
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-300">
                      Framework: {pillar.knowledgeBase.framework}
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {pillar.knowledgeBase.description}
                    </p>
                  </div>

                  {/* Framework Points (e.g. TAM / SAM / SOM) */}
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {pillar.knowledgeBase.points.map((pt, idx) => (
                      <div key={idx} className={`p-3.5 rounded-xl border ${
                        isDark ? 'bg-[#171b2e] border-white/[0.06]' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                          <span className={`text-xs font-bold font-mono ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {pt.label}
                          </span>
                        </div>
                        {pt.subtitle && (
                          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono mt-0.5">
                            {pt.subtitle}
                          </div>
                        )}
                        <p className={`text-[11px] mt-2 leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {pt.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card 3: Recommended Improvement & "WHAT TO FIX" */}
              <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className={`flex items-center justify-between pb-4 border-b ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Recommended Improvement & Action Plan
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-indigo-500 font-semibold">
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
                          ? isDark
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300' 
                            : 'bg-emerald-50 border-emerald-200 text-slate-700'
                          : isDark
                            ? 'bg-[#171b2d] border-white/[0.06] hover:border-indigo-500/40 text-white'
                            : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-800'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0">
                        {rem.done ? (
                          <CheckSquare className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Square className={`w-4 h-4 ${isDark ? 'text-slate-500 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-600'}`} />
                        )}
                      </button>
                      <span className={`text-xs leading-relaxed ${
                        rem.done 
                          ? 'line-through opacity-70' 
                          : isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        {rem.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Action Buttons */}
                <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Fixing items updates the aggregate investor readiness score.
                  </span>

                  <button
                    onClick={handleMarkReview}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
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
          <div className={`mt-12 pt-8 border-t ${isDark ? 'border-white/[0.06]' : 'border-slate-200'}`}>
            <div className={`text-xs font-mono uppercase tracking-wider mb-4 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Explore other audited pillars:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {plan.pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPillar(p.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    p.id === pillar.id 
                      ? isDark
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold'
                        : 'bg-indigo-50 border-indigo-500 text-indigo-900 font-bold shadow-sm'
                      : isDark
                        ? 'bg-[#121524] border-white/[0.06] hover:border-white/[0.15] text-slate-400 hover:text-slate-200'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Pillar {p.number}
                  </div>
                  <div className="text-xs truncate font-medium mt-0.5">{p.shortTitle}</div>
                  <div className={`text-[11px] font-mono font-bold mt-1 ${
                    p.score >= 80 ? 'text-emerald-500' : p.score >= 65 ? 'text-blue-500' : p.score >= 50 ? 'text-amber-500' : 'text-rose-500'
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

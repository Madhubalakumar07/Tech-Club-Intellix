import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Lock, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import Navbar from '../components/Navbar';

export default function HomePage({ onNavigate, onSelectSample }) {
  return (
    <div className="min-h-screen bg-[#0b0d14] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-indigo-600/15 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <Navbar onNavigate={onNavigate} currentScreen="home" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center relative z-10">
        
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-sm mb-8 hover:border-emerald-500/30 transition-all cursor-default group">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-300">
            VENTURE & INSTITUTIONAL GRADE AUDITING
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center max-w-4xl text-white leading-[1.15]">
          Is Your Business Plan{' '}
          <span className="relative inline-block text-white">
            <span className="relative z-10 px-2">Ready?</span>
            <span className="absolute inset-x-0 bottom-1.5 h-4 bg-indigo-500/30 rounded -z-0 border-b-2 border-indigo-400/80" />
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-base md:text-lg text-slate-300 text-center max-w-2xl font-normal leading-relaxed">
          PlanLens AI reviews your business plan against established business frameworks, identifies weak or missing sections, and provides evidence-based guidance to improve it.
        </p>

        {/* Action Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('upload')}
            className="px-7 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-glow hover:shadow-indigo-500/30 transition-all flex items-center gap-2 border border-indigo-400/40 group"
          >
            <span>Start Analysis</span>
            <Zap className="w-4 h-4 text-indigo-200 fill-indigo-200 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => {
              if (onSelectSample) onSelectSample('campusbite');
              onNavigate('dashboard');
            }}
            className="px-6 py-3.5 rounded-xl font-medium text-sm bg-[#151928] hover:bg-[#1c2237] active:bg-[#131726] text-slate-200 border border-white/[0.08] hover:border-white/[0.15] transition-all flex items-center gap-2.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>View Sample Audit</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Confidential & Encrypted</span>
          </div>
          <span className="text-slate-600">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Instant Synthesis (~90s)</span>
          </div>
        </div>

        {/* Floating Interactive Diagnostic Session Card Mockup */}
        <div className="mt-14 w-full max-w-4xl bg-[#111422]/90 border border-white/[0.08] rounded-2xl p-6 md:p-8 shadow-card-glass backdrop-blur-xl relative group">
          {/* Subtle top light bar */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Window Header */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/[0.06] gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <span className="font-mono text-xs text-slate-300 font-medium pl-2">
                diagnostic_session_092_final.pdf
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                OVERALL SCORE: 78/100
              </div>
              <div className="px-3 py-1 rounded-md bg-slate-800 border border-white/[0.08] text-slate-300 text-xs font-medium">
                Series A Standard
              </div>
            </div>
          </div>

          {/* 3 Metric Sub-Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Unit Economics */}
            <div className="bg-[#161a2b] border border-white/[0.06] rounded-xl p-5 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    UNIT ECONOMICS AUDIT
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">₹ 4.2M</span>
                  <span className="text-xs font-mono font-semibold text-emerald-400">+14% MoM Margin</span>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  LTV/CAC ratio stands at 3.4x. Healthy institutional viability confirmed.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Pillar 08 Verified</span>
                <span className="text-emerald-400 font-medium">Strong</span>
              </div>
            </div>

            {/* Card 2: Missing Section Alert */}
            <div className="bg-[#161a2b] border border-rose-500/20 rounded-xl p-5 hover:border-rose-500/40 transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    MISSING SECTION ALERT
                  </span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <div className="mt-4">
                  <span className="text-lg font-bold text-rose-300">Go-To-Market Deficit</span>
                </div>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Direct enterprise sales channel lack identified CAC assumptions and channel partner payback periods.
                </p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-2/5 rounded-full" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Remediation required</span>
                  <span className="text-rose-400 font-medium">High Risk</span>
                </div>
              </div>
            </div>

            {/* Card 3: Moat / Differentiation */}
            <div className="bg-[#161a2b] border border-white/[0.06] rounded-xl p-5 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                    MOAT / DIFFERENTIATION
                  </span>
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-cyan-300">Strong</span>
                  <span className="text-xs font-mono font-semibold text-slate-300">Defensibility: 84%</span>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                  Proprietary IP and data network effects satisfy tier-1 VC appraisal criteria.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Network moat verified</span>
                <span className="text-cyan-400 font-medium">Top Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Three Steps to Investor-Ready Validation */}
        <section className="mt-24 w-full max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Three Steps to Investor-Ready Validation
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Transform draft slides and executive memos into institutional quality proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#121524] border border-white/[0.06] rounded-xl p-6 relative group hover:border-indigo-500/30 transition-all">
              <div className="font-mono text-xs font-bold text-indigo-400 mb-3">01</div>
              <h3 className="text-lg font-bold text-white mb-2">Upload</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Upload your business plan, pitch deck, PDF, DOCX, or executive memo presentation without formatting loss.
              </p>
              <div className="mt-5 text-xs text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero manual formatting needed</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#121524] border border-white/[0.06] rounded-xl p-6 relative group hover:border-indigo-500/30 transition-all">
              <div className="font-mono text-xs font-bold text-indigo-400 mb-3">02</div>
              <h3 className="text-lg font-bold text-white mb-2">Review</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                AI evaluates your plan against benchmark criteria (TAM/SAM/SOM, unit economics, regulatory exposure, and growth runway).
              </p>
              <div className="mt-5 text-xs text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tested against standard frameworks</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#121524] border border-white/[0.06] rounded-xl p-6 relative group hover:border-indigo-500/30 transition-all">
              <div className="font-mono text-xs font-bold text-indigo-400 mb-3">03</div>
              <h3 className="text-lg font-bold text-white mb-2">Improve</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Get clear recommendations for weak sections, specific citations, metric formulas, and structure guidance to score institutional elegance.
              </p>
              <div className="mt-5 text-xs text-slate-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Actionable + structured remediation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Built for Analytical Precision */}
        <section className="mt-24 w-full max-w-5xl">
          <div className="text-center mb-12">
            <div className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-2">
              CORE CAPABILITIES
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Built for Analytical Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className="bg-[#121524] border border-white/[0.06] rounded-xl p-6 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Framework-Based Analysis</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates your plan using structured business criteria (TAM/SOM, unit economics, competitive moats, pricing architecture, and cash-burn profiles) against market-tested models.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.04] text-[11px] text-slate-400">
                Pillars: Market, Operations, Financial
              </div>
            </div>

            {/* Capability 2 */}
            <div className="bg-[#121524] border border-white/[0.06] rounded-xl p-6 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Evidence-Based Feedback</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Shows why a section is considered weak or incomplete. Pinpoints vague claims, unsupported market sizing assertions, or unrealistic growth hypotheses with cited references.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.04] text-[11px] text-slate-400">
                Audit: Source Citations, Exact Text Excerpts
              </div>
            </div>

            {/* Capability 3 */}
            <div className="bg-[#121524] border border-white/[0.06] rounded-xl p-6 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Actionable Guidance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Provides practical recommendations for improvement. Delivers ready-to-adopt sentence templates, financial forecast guidelines, and structural fixes tailored for pitch decks.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.04] text-[11px] text-slate-400">
                Remediation: Step-by-step checklists
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="mt-24 w-full max-w-4xl bg-gradient-to-b from-[#171b2d] to-[#101322] border border-white/[0.08] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight relative z-10">
            Validate your business strategy<br />before investors do.
          </h2>
          <p className="mt-3 text-slate-300 text-sm max-w-lg mx-auto relative z-10">
            Run your business documents through PlanLens AI and receive an institutional critique in under two minutes.
          </p>

          <div className="mt-8 relative z-10">
            <button
              onClick={() => onNavigate('upload')}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white shadow-glow transition-all inline-flex items-center gap-2 group border border-indigo-400/40"
            >
              <span>Analyze My Business Plan</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-[#090b10] py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span>© PlanLens AI. Precision business plan analysis and institutional benchmarking.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#security" className="hover:text-slate-300 transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

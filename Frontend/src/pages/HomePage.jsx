import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  FileText, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  BarChart3, 
  Sparkles,
  Search,
  Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

export default function HomePage({ onNavigate, onSelectSample }) {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0b0d14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Background glow effects */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-gradient-to-b from-indigo-600/15 via-purple-600/5 to-transparent' : 'bg-gradient-to-b from-indigo-200/40 via-purple-100/20 to-transparent'
      }`} />
      <div className={`absolute top-96 -left-48 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-blue-600/10' : 'bg-blue-200/20'
      }`} />
      <div className={`absolute top-[800px] -right-48 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-purple-600/10' : 'bg-purple-200/20'
      }`} />

      {/* Navigation */}
      <Navbar onNavigate={onNavigate} currentScreen="home" />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center relative z-10">
        
        {/* Top Tag Pill */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm mb-8 transition-all cursor-default ${
          isDark 
            ? 'bg-white/[0.04] border-white/[0.08] hover:border-emerald-500/30' 
            : 'bg-white border-slate-200 hover:border-emerald-400'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className={`text-[11px] font-mono font-bold tracking-widest uppercase ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            VENTURE & INSTITUTIONAL GRADE AUDITING
          </span>
        </div>

        {/* Hero Title */}
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center max-w-4xl leading-[1.15] ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Is Your Business Plan{' '}
          <span className="relative inline-block">
            <span className={`relative z-10 px-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Ready?</span>
            <span className={`absolute inset-x-0 bottom-1.5 h-4 rounded -z-0 border-b-2 ${
              isDark ? 'bg-indigo-500/30 border-indigo-400/80' : 'bg-indigo-200/60 border-indigo-400'
            }`} />
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className={`mt-6 text-base md:text-lg text-center max-w-2xl font-normal leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
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
            className={`px-6 py-3.5 rounded-xl font-medium text-sm border transition-all flex items-center gap-2.5 shadow-sm ${
              isDark 
                ? 'bg-[#151928] hover:bg-[#1c2237] text-slate-200 border-white/[0.08] hover:border-white/[0.15]' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <FileText className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <span>View Sample Audit</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className={`mt-8 flex items-center gap-6 text-xs ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Confidential & Encrypted</span>
          </div>
          <span className={isDark ? 'text-slate-600' : 'text-slate-300'}>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-cyan-500" />
            <span>Instant Synthesis (~90s)</span>
          </div>
        </div>

        {/* Floating Interactive Diagnostic Session Card Mockup */}
        <div className={`mt-14 w-full max-w-4xl border rounded-2xl p-6 md:p-8 backdrop-blur-xl relative group transition-colors duration-300 ${
          isDark 
            ? 'bg-[#111422]/90 border-white/[0.08] shadow-card-glass' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          {/* Subtle top light bar */}
          <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          {/* Window Header */}
          <div className={`flex flex-wrap items-center justify-between pb-6 border-b gap-4 ${
            isDark ? 'border-white/[0.06]' : 'border-slate-100'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
                <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'}`} />
              </div>
              <span className={`font-mono text-xs font-medium pl-2 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                diagnostic_session_092_final.pdf
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                OVERALL SCORE: 78/100
              </div>
              <div className={`px-3 py-1 rounded-md border text-xs font-medium ${
                isDark ? 'bg-slate-800 border-white/[0.08] text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                Series A Standard
              </div>
            </div>
          </div>

          {/* 3 Metric Sub-Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Unit Economics */}
            <div className={`border rounded-xl p-5 transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-[#161a2b] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
            }`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    UNIT ECONOMICS AUDIT
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>₹ 4.2M</span>
                  <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">+14% MoM Margin</span>
                </div>
                <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  LTV/CAC ratio stands at 3.4x. Healthy institutional viability confirmed.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-white/[0.04]' : 'border-slate-200'
              }`}>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Pillar 08 Verified</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Strong</span>
              </div>
            </div>

            {/* Card 2: Missing Section Alert */}
            <div className={`border rounded-xl p-5 transition-all flex flex-col justify-between relative overflow-hidden ${
              isDark 
                ? 'bg-[#161a2b] border-rose-500/20 hover:border-rose-500/40' 
                : 'bg-rose-50/50 border-rose-200 hover:border-rose-300'
            }`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    MISSING SECTION ALERT
                  </span>
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                </div>
                <div className="mt-4">
                  <span className="text-lg font-bold text-rose-600 dark:text-rose-300">Go-To-Market Deficit</span>
                </div>
                <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Direct enterprise sales channel lack identified CAC assumptions and channel partner payback periods.
                </p>
              </div>
              <div className="mt-4">
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                  <div className="bg-rose-500 h-full w-2/5 rounded-full" />
                </div>
                <div className={`mt-2 flex items-center justify-between text-[11px] ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <span>Remediation required</span>
                  <span className="text-rose-600 dark:text-rose-400 font-medium">High Risk</span>
                </div>
              </div>
            </div>

            {/* Card 3: Moat / Differentiation */}
            <div className={`border rounded-xl p-5 transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-[#161a2b] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-slate-50 border-slate-200 hover:border-indigo-300'
            }`}>
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    MOAT / DIFFERENTIATION
                  </span>
                  <Shield className="w-4 h-4 text-cyan-500" />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>Strong</span>
                  <span className={`text-xs font-mono font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Defensibility: 84%</span>
                </div>
                <p className={`mt-3 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Proprietary IP and data network effects satisfy tier-1 VC appraisal criteria.
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] ${
                isDark ? 'border-white/[0.04]' : 'border-slate-200'
              }`}>
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Network moat verified</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">Top Tier</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Three Steps to Investor-Ready Validation */}
        <section className="mt-24 w-full max-w-5xl">
          <div className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Three Steps to Investor-Ready Validation
            </h2>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Transform draft slides and executive memos into institutional quality proposals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className={`border rounded-xl p-6 relative group transition-all ${
              isDark 
                ? 'bg-[#121524] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div className="font-mono text-xs font-bold text-indigo-500 mb-3">01</div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Upload</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Upload your business plan, pitch deck, PDF, DOCX, or executive memo presentation without formatting loss.
              </p>
              <div className={`mt-5 text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero manual formatting needed</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`border rounded-xl p-6 relative group transition-all ${
              isDark 
                ? 'bg-[#121524] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div className="font-mono text-xs font-bold text-indigo-500 mb-3">02</div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Review</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                AI evaluates your plan against benchmark criteria (TAM/SAM/SOM, unit economics, regulatory exposure, and growth runway).
              </p>
              <div className={`mt-5 text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Tested against standard frameworks</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`border rounded-xl p-6 relative group transition-all ${
              isDark 
                ? 'bg-[#121524] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div className="font-mono text-xs font-bold text-indigo-500 mb-3">03</div>
              <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Improve</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Get clear recommendations for weak sections, specific citations, metric formulas, and structure guidance to score institutional elegance.
              </p>
              <div className={`mt-5 text-xs flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Actionable + structured remediation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Built for Analytical Precision */}
        <section className="mt-24 w-full max-w-5xl">
          <div className="text-center mb-12">
            <div className="text-xs font-mono font-bold tracking-widest text-indigo-500 uppercase mb-2">
              CORE CAPABILITIES
            </div>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Built for Analytical Precision
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <div className={`border rounded-xl p-6 transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-[#121524] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Framework-Based Analysis
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Evaluates your plan using structured business criteria (TAM/SOM, unit economics, competitive moats, pricing architecture, and cash-burn profiles) against market-tested models.
                </p>
              </div>
              <div className={`mt-6 pt-4 border-t text-[11px] ${
                isDark ? 'border-white/[0.04] text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                Pillars: Market, Operations, Financial
              </div>
            </div>

            {/* Capability 2 */}
            <div className={`border rounded-xl p-6 transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-[#121524] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Evidence-Based Feedback
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Shows why a section is considered weak or incomplete. Pinpoints vague claims, unsupported market sizing assertions, or unrealistic growth hypotheses with cited references.
                </p>
              </div>
              <div className={`mt-6 pt-4 border-t text-[11px] ${
                isDark ? 'border-white/[0.04] text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                Audit: Source Citations, Exact Text Excerpts
              </div>
            </div>

            {/* Capability 3 */}
            <div className={`border rounded-xl p-6 transition-all flex flex-col justify-between ${
              isDark 
                ? 'bg-[#121524] border-white/[0.06] hover:border-indigo-500/30' 
                : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm'
            }`}>
              <div>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Actionable Guidance
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Provides practical recommendations for improvement. Delivers ready-to-adopt sentence templates, financial forecast guidelines, and structural fixes tailored for pitch decks.
                </p>
              </div>
              <div className={`mt-6 pt-4 border-t text-[11px] ${
                isDark ? 'border-white/[0.04] text-slate-400' : 'border-slate-100 text-slate-500'
              }`}>
                Remediation: Step-by-step checklists
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className={`mt-24 w-full max-w-4xl border rounded-2xl p-8 md:p-12 text-center relative overflow-hidden transition-colors ${
          isDark 
            ? 'bg-gradient-to-b from-[#171b2d] to-[#101322] border-white/[0.08]' 
            : 'bg-gradient-to-b from-indigo-50 to-white border-indigo-100 shadow-md'
        }`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <h2 className={`text-2xl md:text-3xl font-extrabold tracking-tight relative z-10 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Validate your business strategy<br />before investors do.
          </h2>
          <p className={`mt-3 text-sm max-w-lg mx-auto relative z-10 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
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
      <footer className={`border-t py-8 text-xs transition-colors ${
        isDark ? 'bg-[#090b10] border-white/[0.06] text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© PlanLens AI. Precision business plan analysis and institutional benchmarking.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className={isDark ? "hover:text-slate-300" : "hover:text-slate-800"}>Privacy</a>
            <a href="#terms" className={isDark ? "hover:text-slate-300" : "hover:text-slate-800"}>Terms</a>
            <a href="#security" className={isDark ? "hover:text-slate-300" : "hover:text-slate-800"}>Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

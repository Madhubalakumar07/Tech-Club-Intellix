import React, { useState } from 'react';
import { 
  ArrowRight, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Zap,
  Github
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

export default function SignInPage({ onSignInSuccess, onNavigateToHome }) {
  const { isDark } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('founder@campusbite.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        name: email.split('@')[0] || "Founding Partner",
        email: email,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      });
    }, 600);
  };

  const handleDemoSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSignInSuccess({
        name: "CampusBite Founder",
        email: "founder@campusbite.io",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
      });
    }, 400);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#0b0d14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Background glow effects */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-indigo-600/15' : 'bg-indigo-200/40'
      }`} />
      <div className={`absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-purple-600/10' : 'bg-purple-200/20'
      }`} />

      {/* Top Header Bar with Logo and Theme Toggle */}
      <header className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-10">
        <div 
          onClick={onNavigateToHome}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-glow">
            <svg className="w-5 h-5 text-white transform group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <span className={`text-xl font-bold tracking-tight flex items-center gap-1 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            PlanLens <span className="text-indigo-500 font-extrabold">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={onNavigateToHome}
            className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
              isDark 
                ? 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/[0.08]' 
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
            }`}
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Sign In Form Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
          isDark 
            ? 'bg-[#121524]/90 border-white/[0.08] shadow-card-glass' 
            : 'bg-white border-slate-200 shadow-xl'
        }`}>
          
          {/* Top Pill Tag */}
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border ${
              isDark 
                ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isSignUp ? "CREATE NEW ACCOUNT" : "VENTURE ACCESS PORTAL"}</span>
            </div>

            <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {isSignUp ? "Get Started with PlanLens" : "Sign In to PlanLens AI"}
            </h1>
            <p className={`text-xs mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isSignUp 
                ? "Join institutional founders and receive institutional audit feedback." 
                : "Enter your credentials to access business plan audits and diagnostic matrices."}
            </p>
          </div>

          {/* Quick 1-Click Demo Login */}
          <div className="mb-5">
            <button
              onClick={handleDemoSignIn}
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center justify-center gap-2 group border border-indigo-400/30"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 group-hover:scale-110 transition-transform" />
              <span>1-Click Demo Sign In (CampusBite Founder)</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className={`w-full border-t ${isDark ? 'border-white/[0.08]' : 'border-slate-200'}`} />
            <span className={`absolute px-3 text-[11px] uppercase font-mono tracking-wider ${
              isDark ? 'bg-[#121524] text-slate-500' : 'bg-white text-slate-400'
            }`}>
              or sign in with email
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Work Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    isDark 
                      ? 'bg-[#171b2d] border-white/[0.08] text-white placeholder-slate-500 focus:border-indigo-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert("Password reset link sent to demo email."); }}
                  className="text-[11px] text-indigo-500 hover:text-indigo-400 transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    isDark 
                      ? 'bg-[#171b2d] border-white/[0.08] text-white placeholder-slate-500 focus:border-indigo-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-3.5 h-3.5 rounded bg-slate-800 border-white/[0.1] text-indigo-600 focus:ring-indigo-500" 
                />
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Remember this device for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold text-xs shadow-glow transition-all flex items-center justify-center gap-2 group border border-indigo-400/30"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isSignUp ? "Create Account & Proceed" : "Sign In to Dashboard"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Logins */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDemoSignIn}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isDark 
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border-white/[0.08]' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
              }`}
            >
              {/* Google SVG */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoSignIn}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isDark 
                  ? 'bg-white/[0.03] hover:bg-white/[0.08] text-slate-300 border-white/[0.08]' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
              }`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Toggle Sign Up / Sign In Switch */}
          <div className="mt-6 text-center text-xs">
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              {isSignUp ? "Already have an account?" : "Don't have an institutional account?"}
            </span>{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="font-bold text-indigo-500 hover:text-indigo-400 transition-colors ml-1 underline underline-offset-2"
            >
              {isSignUp ? "Sign In" : "Request Access / Sign Up"}
            </button>
          </div>

          {/* Bottom Security Info */}
          <div className={`mt-6 pt-4 border-t flex items-center justify-center gap-2 text-[11px] ${
            isDark ? 'border-white/[0.06] text-slate-500' : 'border-slate-100 text-slate-400'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit Encrypted • SOC2 Compliant Auditing</span>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 text-center text-xs ${
        isDark ? 'text-slate-500' : 'text-slate-400'
      }`}>
        <span>© PlanLens AI. Built for institutional precision.</span>
      </footer>
    </div>
  );
}

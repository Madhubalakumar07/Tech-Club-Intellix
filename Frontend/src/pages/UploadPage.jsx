import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  ArrowRight, 
  Check
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';
import { useTheme } from '../context/ThemeContext';

export default function UploadPage({ onNavigate, onStartAudit, activePlan, currentUser, onSignOut }) {
  const { isDark } = useTheme();
  const [file, setFile] = useState({
    name: "BusinessPlan.pdf",
    size: "2.4 MB",
    pages: 18,
    status: "Ready for analysis",
    isSample: true
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [currentScanPillar, setCurrentScanPillar] = useState("Initializing Diagnostic Core...");
  const fileInputRef = useRef(null);

  const pillarsList = [
    "Completeness of plan sections",
    "Market and customer analysis",
    "Business model clarity",
    "Competitive analysis",
    "Marketing and operations",
    "Financial planning",
    "Supporting evidence & benchmark validation"
  ];

  const scanStages = [
    "Parsing OCR text layers & document structure...",
    "Extracting TAM / SAM / SOM market projections...",
    "Validating unit economics & CAC/LTV benchmarks...",
    "Analyzing competitor differentiation & moats...",
    "Synthesizing institutional scorecard...",
    "Finalizing executive audit report..."
  ];

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const sizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(1);
      const estPages = Math.max(3, Math.round(uploadedFile.size / (150 * 1024)));
      setFile({
        name: uploadedFile.name,
        size: `${sizeMB} MB`,
        pages: estPages,
        status: "Ready for analysis",
        isSample: false
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      const sizeMB = (droppedFile.size / (1024 * 1024)).toFixed(1);
      const estPages = Math.max(3, Math.round(droppedFile.size / (150 * 1024)));
      setFile({
        name: droppedFile.name,
        size: `${sizeMB} MB`,
        pages: estPages,
        status: "Ready for analysis",
        isSample: false
      });
    }
  };

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalyzeProgress(10);
    setCurrentScanPillar(scanStages[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < scanStages.length) {
        setAnalyzeProgress((step / scanStages.length) * 90);
        setCurrentScanPillar(scanStages[step]);
      } else {
        clearInterval(interval);
        setAnalyzeProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
          onStartAudit(file.name);
          onNavigate('dashboard');
        }, 500);
      }
    }, 450);
  };

  return (
    <div className={`min-h-screen flex selection:bg-indigo-500 selection:text-white transition-colors duration-300 ${
      isDark ? 'bg-[#0b0d14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Sidebar */}
      <Sidebar currentScreen="upload" onNavigate={onNavigate} activePlan={activePlan} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader 
          activePlan={activePlan} 
          onNavigate={onNavigate}
          currentUser={currentUser}
          onSignOut={onSignOut}
        />

        <main className="flex-1 px-6 py-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
          
          {/* Top Engine Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-300 text-xs font-mono font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>DIAGNOSTIC ENGINE 3.4</span>
          </div>

          {/* Headline */}
          <h1 className={`text-3xl md:text-4xl font-extrabold text-center tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Analyze Your Business Plan
          </h1>

          {/* Subtitle */}
          <p className={`mt-3 text-sm md:text-base text-center max-w-xl font-normal leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Upload your draft business plan to identify missing sections, financial blind spots, and structural weaknesses.
          </p>

          {/* Upload Card / Dropzone Area */}
          <div className="mt-9 w-full max-w-2xl">
            {file ? (
              /* Uploaded / Selected State */
              <div className={`border rounded-2xl p-6 transition-colors duration-300 ${
                isDark ? 'bg-[#121524] border-white/[0.08] shadow-card-glass' : 'bg-white border-slate-200 shadow-lg'
              }`}>
                <div className={`flex items-center justify-between pb-5 border-b ${
                  isDark ? 'border-white/[0.06]' : 'border-slate-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {file.name}
                        </span>
                        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {file.size}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Ready for analysis</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-all ${
                        isDark 
                          ? 'text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08]' 
                          : 'text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200'
                      }`}
                    >
                      Replace
                    </button>
                    <button
                      onClick={() => setFile(null)}
                      className={`p-1 rounded-lg transition-colors ${
                        isDark ? 'text-slate-400 hover:text-white hover:bg-white/[0.05]' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub info indicators */}
                <div className={`mt-4 flex items-center justify-between text-xs pt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span className={isDark ? "text-slate-300" : "text-slate-700"}>OCR text parsed & verified</span>
                  </div>
                  <div className="font-mono">
                    {file.pages} Pages Detected
                  </div>
                </div>
              </div>
            ) : (
              /* Drag and drop empty dropzone */
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  isDark
                    ? isDragging 
                      ? 'border-indigo-400 bg-indigo-500/10' 
                      : 'border-white/[0.12] hover:border-indigo-500/40 hover:bg-[#15192c] bg-[#121524]/60'
                    : isDragging
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mx-auto mb-4">
                  <Upload className="w-5 h-5" />
                </div>
                <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  Drop your PDF, DOCX, or pitch deck here
                </div>
                <div className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Supports files up to 25 MB • Encrypted end-to-end
                </div>
              </div>
            )}

            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept=".pdf,.docx,.doc,.txt,.ppt,.pptx" 
              className="hidden" 
            />

            {/* Quick Sample Selector */}
            <div className="mt-4 flex items-center justify-between px-1">
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Or test with preset pitch decks:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFile({ name: "CampusBite.pdf", size: "2.4 MB", pages: 18, status: "Ready", isSample: true })}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    isDark 
                      ? 'bg-white/[0.04] hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-200 border-white/[0.06]' 
                      : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-slate-200'
                  }`}
                >
                  CampusBite (FoodTech)
                </button>
                <button
                  onClick={() => setFile({ name: "FinFlow_Deck.pdf", size: "3.1 MB", pages: 22, status: "Ready", isSample: true })}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    isDark 
                      ? 'bg-white/[0.04] hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-200 border-white/[0.06]' 
                      : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border-slate-200'
                  }`}
                >
                  FinFlow (FinTech)
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="mt-8">
              <button
                disabled={!file || isAnalyzing}
                onClick={handleStartAnalysis}
                className="w-full py-3.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 text-white shadow-glow transition-all flex items-center justify-center gap-2 border border-indigo-400/40 group"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>{isAnalyzing ? "Scanning Document Structure..." : "Analyze Business Plan"}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>

              <div className={`mt-3 text-center text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Estimated runtime: ~25 seconds • Executive Summary & Matrix Output
              </div>
            </div>

            {/* Feature Evaluation Matrix Card */}
            <div className={`mt-8 border rounded-2xl p-6 transition-colors duration-300 ${
              isDark ? 'bg-[#121524] border-white/[0.06]' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b ${
                isDark ? 'border-white/[0.06]' : 'border-slate-100'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    WHAT WILL PLANLENS CHECK?
                  </span>
                </div>
                <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  7 Evaluation Pillars
                </span>
              </div>

              {/* 2-Column Grid */}
              <div className={`mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {pillarsList.map((pillar, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Analyzing Progress Modal */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-[#07090e]/85 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-[#121524] border border-indigo-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mx-auto mb-6 relative">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-400" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">
              Auditing Business Plan
            </h3>
            
            <p className="text-xs font-mono text-indigo-300 h-8 flex items-center justify-center">
              {currentScanPillar}
            </p>

            <div className="mt-6 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${analyzeProgress}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Diagnostic Engine 3.4</span>
              <span>{Math.round(analyzeProgress)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

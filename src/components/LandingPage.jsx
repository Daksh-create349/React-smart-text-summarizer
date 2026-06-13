import React, { useState } from 'react';
import { 
  Sparkles, ChevronRight, Zap, Shield, BarChart3, Database, 
  Settings, Sun, Moon, Mail, Globe, BookOpen, 
  Heart, Cpu, Layers, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { useTextStore } from '../store/useTextStore';

// Custom inline SVGs to avoid version mismatch compilation errors in older lucide-react versions
function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`lucide lucide-github ${className}`}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 16, className = "" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={`lucide lucide-linkedin ${className}`}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function LandingPage({ onStart, onOpenGuide }) {
  const isDarkMode = useTextStore((state) => state.isDarkMode);
  const toggleDarkMode = useTextStore((state) => state.toggleDarkMode);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={`bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 flex flex-col font-sans relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Premium Mesh Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="max-w-[1400px] w-full mx-auto px-6 py-6 flex items-center justify-between relative z-20 border-b border-slate-200/50 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
            <Database className="text-emerald-600 dark:text-emerald-400" size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-zinc-50">Nexus<span className="text-emerald-600 dark:text-emerald-500">Text</span></span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block">Features</a>
          <a href="#tech" className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block">Algorithms</a>
          <button 
            onClick={onOpenGuide}
            className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block cursor-pointer bg-transparent border-none p-0 outline-none"
          >
            How to Use
          </button>
          <a href="#contact" className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block">Developer</a>
          
          <div className="relative">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="flex items-center justify-center p-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-850 rounded-lg transition-all shadow-sm active:scale-95 text-slate-600 dark:text-zinc-400 cursor-pointer"
              title="System Settings"
            >
              <Settings size={18} />
            </button>
            
            {isSettingsOpen && (
              <div className="absolute right-0 top-12 w-60 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-lg z-30">
                <h4 className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-3">Settings</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                    {isDarkMode ? <Moon size={16} className="text-emerald-500" /> : <Sun size={16} className="text-amber-500" />}
                    Dark Theme
                  </span>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 outline-none ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-200 dark:bg-zinc-800'} border border-transparent cursor-pointer`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 shadow ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={onStart}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm transition-all shadow-md shadow-emerald-500/10 hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 px-6 max-w-[1400px] w-full mx-auto flex flex-col items-center text-center">

        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight max-w-5xl leading-[1.05] mb-6 text-slate-900 dark:text-zinc-50">
          Client-side text analytics <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            at the speed of thought.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-3xl mb-12 leading-relaxed font-medium">
          An advanced, privacy-first natural language processing engine running entirely in-browser. 
          Deconstruct text models, extract critical keyword matrices, and score readability scores locally.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button 
            onClick={onStart}
            className="flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 active:scale-95 cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ChevronRight size={20} />
          </button>
          <button 
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 px-6 py-4 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 rounded-xl font-semibold text-lg transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>How to Use</span>
            <ChevronRight size={20} className="text-emerald-600 dark:text-emerald-500" />
          </button>
        </div>

        {/* Dashboard Mockup Showcase */}
        <div className="w-full max-w-5xl rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 p-3 shadow-xl backdrop-blur-md relative">
          <div className="rounded-xl border border-slate-200/80 dark:border-zinc-850 overflow-hidden shadow-inner aspect-[16/9] bg-slate-100 dark:bg-zinc-950 flex flex-col">
            {/* Mock Header */}
            <div className="h-10 bg-slate-200/50 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-850 px-4 flex items-center justify-between">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500">Dashboard Live Sandbox Preview</span>
              <div className="w-8"></div>
            </div>
            {/* Mock Body */}
            <div className="flex-1 p-4 grid grid-cols-2 gap-4">
              
              {/* Left Column: Input Mockup */}
              <div className="border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-4 flex flex-col gap-3 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-850/60 pb-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Document Input
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-950 px-2 py-0.5 rounded-md border border-slate-100 dark:border-zinc-850">
                    Processed Successfully
                  </span>
                </div>
                
                <div className="flex-1 text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium bg-slate-50/50 dark:bg-zinc-950/20 p-3 rounded-lg border border-slate-100 dark:border-zinc-850/50 flex flex-col justify-between overflow-hidden">
                  <p className="mb-4">
                    Artificial <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-semibold border border-amber-200/30">intelligence</span> is transforming modern web experiences. By running models <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-1 py-0.5 rounded font-semibold border border-emerald-200/30">locally</span> in the browser, we achieve complete data <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-1 py-0.5 rounded font-semibold border border-amber-200/30">privacy</span> and zero network latency.
                  </p>
                  
                  {/* Mock Ticker */}
                  <div className="flex items-center gap-3 bg-white dark:bg-zinc-900/60 p-2 rounded-md border border-slate-200/60 dark:border-zinc-850 text-[9px] font-mono text-slate-400 dark:text-zinc-500">
                    <span className="flex items-center gap-1">Chars: <strong className="text-slate-600 dark:text-zinc-350">214</strong></span>
                    <span className="w-px h-2 bg-slate-200 dark:bg-zinc-800"></span>
                    <span className="flex items-center gap-1">Words: <strong className="text-slate-600 dark:text-zinc-350">31</strong></span>
                    <span className="w-px h-2 bg-slate-200 dark:bg-zinc-800"></span>
                    <span className="flex items-center gap-1">Blocks: <strong className="text-slate-600 dark:text-zinc-350">1</strong></span>
                    <span className="w-px h-2 bg-slate-200 dark:bg-zinc-800"></span>
                    <span className="flex items-center gap-1">Time: <strong className="text-slate-600 dark:text-zinc-350">1m</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Column: Output Mockup */}
              <div className="flex flex-col gap-4">
                
                {/* Top Card: Summary */}
                <div className="flex-1 border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-4 flex flex-col gap-3 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Extractive Summary</span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-900/30">
                      30% Density
                    </span>
                  </div>
                  
                  {/* Simulated Slider */}
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-950/50 p-2 rounded-lg border border-slate-100 dark:border-zinc-850">
                    <span>Density Slider</span>
                    <div className="flex-1 h-1 bg-slate-200 dark:bg-zinc-800 rounded-full relative">
                      <div className="absolute left-0 top-0 h-full w-[30%] bg-emerald-600 dark:bg-emerald-500 rounded-full"></div>
                      <div className="absolute left-[30%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white dark:bg-zinc-900 border border-emerald-600 dark:border-emerald-500 rounded-full shadow"></div>
                    </div>
                  </div>

                  <p className="flex-1 text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed font-medium bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-850/50 p-3 rounded-lg italic flex items-center justify-center">
                    "By running models locally in the browser, we achieve complete data privacy and zero network latency."
                  </p>
                </div>

                {/* Bottom Card: Keyword Matrix */}
                <div className="border border-slate-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 p-4 flex flex-col gap-2 shadow-sm">
                  <span className="text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Key Terms (TF-IDF Weight)</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/60 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                      intelligence <span className="text-[8px] font-mono text-emerald-500/70">0.92</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-[10px] font-semibold text-slate-600 dark:text-zinc-400">
                      locally <span className="text-[8px] font-mono text-slate-400">0.85</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-[10px] font-semibold text-slate-600 dark:text-zinc-400">
                      privacy <span className="text-[8px] font-mono text-slate-400">0.78</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-[10px] font-semibold text-slate-600 dark:text-zinc-400">
                      latency <span className="text-[8px] font-mono text-slate-400">0.64</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section id="features" className="py-24 bg-white dark:bg-zinc-900 border-y border-slate-200 dark:border-zinc-900 relative z-10 scroll-mt-20">
        <div className="max-w-[1400px] w-full mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-3">Core Capabilities</h2>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight">Everything happens locally in your tab.</p>
            <p className="text-slate-500 dark:text-zinc-400 mt-4 font-medium">No server calls, no latency, no data tracking. Experience high-fidelity client-side Natural Language Processing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-50 mb-2">TF-IDF Extraction</h3>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-4">Calculates term significance relative to document density, separating core keywords from standard vocabulary filler.</p>
              <div className="mt-auto text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                <span>Deterministic Scoring</span>
              </div>
            </div>

            <div className="flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Cpu size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-50 mb-2">Porter Stemmer Engine</h3>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-4">Reduces word variations to their common root stems, ensuring accuracy when counting frequencies (e.g. running → run).</p>
              <div className="mt-auto text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                <span>5-Step Morphological Reducer</span>
              </div>
            </div>

            <div className="flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <BookOpen size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-50 mb-2">Readability Gauging</h3>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-4">Leverages the Flesch-Kincaid formula based on sentence spans and syllable structures to rate text difficulty.</p>
              <div className="mt-auto text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                <span>Syllable Counting Heuristics</span>
              </div>
            </div>

            <div className="flex flex-col p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Heart size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-50 mb-2">Emotional Polarity</h3>
              <p className="text-slate-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-4">Maps words against positive/negative emotional dictionaries to calculate overall sentiment indices.</p>
              <div className="mt-auto text-xs font-bold text-emerald-600 dark:text-emerald-500 flex items-center gap-1">
                <span>Lexical Lexicon Maps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mathematical & Algorithmic Details Section */}
      <section id="tech" className="py-24 max-w-[1400px] w-full mx-auto px-6 relative z-10 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-500 mb-3">Mathematical Models</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-zinc-50 tracking-tight leading-tight mb-6">
              Rigorous, academic string processing.
            </h2>
            <p className="text-slate-500 dark:text-zinc-400 mb-8 font-medium leading-relaxed">
              We apply classic NLP calculations directly to parsed tokens. There is no guesswork—every value is mathematically determined using structural calculations:
            </p>

            <ul className="flex flex-col gap-4">
              {[
                { title: 'Term Frequency (TF)', desc: 'Measures term instances divided by total sentence tokens.' },
                { title: 'Inverse Document Frequency (IDF)', desc: 'Calculates the logarithm of total sentences divided by sentences containing the term.' },
                { title: 'Flesch-Kincaid Reading Ease', desc: 'Combines words/sentences ratio and syllables/words ratio.' }
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle2 className="text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-zinc-100 text-sm">{item.title}</h4>
                    <p className="text-slate-500 dark:text-zinc-400 text-xs font-medium mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-8 rounded-2xl shadow-sm">
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-200 border-b border-slate-100 dark:border-zinc-800 pb-4">Formula Cheat Sheet</h3>
            
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Readability Scoring Model</span>
                <code className="block bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl text-xs font-mono text-slate-700 dark:text-zinc-350 border border-slate-100 dark:border-zinc-900 overflow-x-auto">
                  Score = 206.835 - 1.015 * (Words/Sentences) - 84.6 * (Syllables/Words)
                </code>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">IDF Inverse Document Frequency</span>
                <code className="block bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl text-xs font-mono text-slate-700 dark:text-zinc-350 border border-slate-100 dark:border-zinc-900 overflow-x-auto">
                  IDF(t) = ln( Total Sentences / Sentences containing word 't' )
                </code>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-100 dark:border-zinc-900 flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Porter Stemmer override</span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-350">running → run</span>
                </div>
                <div className="bg-slate-50 dark:bg-zinc-950 p-4 rounded-xl border border-slate-100 dark:border-zinc-900 flex flex-col">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Lexicon Dict scale</span>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-350">350+ entries local</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer & Contact Section */}
      <footer id="contact" className="bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-900 pt-16 pb-12 relative z-10 scroll-mt-20">
        <div className="max-w-[1400px] w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            {/* Column 1: Branding & Details */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
                  <Database className="text-emerald-600 dark:text-emerald-400" size={16} />
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-zinc-50">NexusText</span>
              </div>
              <p className="text-slate-400 dark:text-zinc-500 text-sm leading-relaxed font-medium pr-10">
                Developed as a B.Tech Computer Science & Engineering Case Study project focusing on deterministic local NLP algorithms without server overheads.
              </p>
              <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 mt-2">
                ITM Skills University • CSE 2025–2029
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Navigation</h4>
              <ul className="flex flex-col gap-2">
                <li><a href="#features" className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#tech" className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Algorithms</a></li>
                <li><button onClick={onStart} className="text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-left cursor-pointer bg-transparent border-none p-0 outline-none">Launch App</button></li>
              </ul>
            </div>

            {/* Column 3: Contact details */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">Connect with Developer</h4>
              <div className="flex flex-col gap-2.5">
                <a href="mailto:dakshshrivastav56@gmail.com" className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <Mail size={16} />
                  <span>dakshshrivastav56@gmail.com</span>
                </a>
                <a href="https://github.com/Daksh-create349" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <GithubIcon size={16} />
                  <span>github.com/Daksh-create349</span>
                </a>
                <a href="https://www.linkedin.com/in/daksh-srivastava-2ba851344/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <LinkedinIcon size={16} />
                  <span>linkedin.com/in/daksh-srivastava-2ba851344</span>
                </a>
              </div>
            </div>
            
          </div>

          {/* Bottom Row */}
          <div className="border-t border-slate-100 dark:border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 dark:text-zinc-650">
            <span>© {new Date().getFullYear()} Daksh Srivastava. B.Tech Case Study Submission. All rights reserved.</span>
            <div className="flex gap-4">
              <span className="hover:text-slate-600 dark:hover:text-zinc-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-600 dark:hover:text-zinc-400 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

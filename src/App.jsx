import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, ChevronRight, Zap, Shield, BarChart3, Database, Settings, Sun, Moon } from 'lucide-react';
import RawInputEditor from './components/RawInputEditor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TelemetryPanel from './components/TelemetryPanel';
import { useTextStore } from './store/useTextStore';

function LandingPage({ onStart }) {
  const isDarkMode = useTextStore((state) => state.isDarkMode);
  const toggleDarkMode = useTextStore((state) => state.toggleDarkMode);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-[#F0EBE1] dark:bg-[#121315] text-slate-800 dark:text-zinc-200 flex flex-col font-sans relative selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />

      <nav className="px-8 py-6 flex items-center justify-between relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 dark:from-zinc-700 dark:to-zinc-800 shadow-[0_4px_6px_rgba(0,0,0,0.15),inset_0_2px_0_rgba(255,255,255,0.9)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center border border-slate-400 dark:border-zinc-600">
            <Database className="text-slate-700 dark:text-zinc-300 drop-shadow-md" size={22} />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-700 dark:text-zinc-300 drop-shadow-sm" style={{textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.8)' : '0 1px 1px rgba(255,255,255,0.8)'}}>Nexus<span className="text-emerald-700 dark:text-emerald-500">Text</span></span>
        </div>

        {/* Settings Control in landing page nav */}
        <div className="relative">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center justify-center p-3.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] border border-slate-400 dark:border-zinc-600 rounded-xl transition-all shadow-[0_4px_0_#94a3b8] dark:shadow-[0_4px_0_#141517] active:shadow-none active:translate-y-[4px] text-slate-700 dark:text-zinc-300 cursor-pointer"
            title="System Settings"
          >
            <Settings size={18} />
          </button>
          
          {isSettingsOpen && (
            <div className="absolute right-0 top-14 w-60 bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] border border-slate-300 dark:border-zinc-700 rounded-2xl p-5 shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] z-30">
              <h4 className="text-xs font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Settings</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                  {isDarkMode ? <Moon size={16} className="text-emerald-500" /> : <Sun size={16} className="text-amber-500" />}
                  Dark Theme
                </span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-400'} border border-slate-500 cursor-pointer`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'} shadow`} />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 py-12">
        
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-slate-300 dark:border-zinc-700 bg-gradient-to-b from-[#ffffff] to-[#e2e8f0] dark:from-[#2A2D32] dark:to-[#1E2023] shadow-[inset_0_2px_0_white,0_4px_6px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_6px_rgba(0,0,0,0.15)] text-sm font-black text-slate-600 dark:text-zinc-300 mb-10 transform hover:scale-105 transition-transform">
          <Sparkles size={18} className="text-amber-500 drop-shadow-sm" />
          <span style={{ textShadow: isDarkMode ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.9)' }}>100% Local Browser Engine</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center tracking-tighter max-w-5xl leading-[1.05] mb-8 text-slate-800 dark:text-zinc-100 drop-shadow-md" style={{textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.4)' : '0 2px 4px rgba(0,0,0,0.1), 0 1px 0px rgba(255,255,255,0.5)'}}>
          Intelligence extracted <br />
          <span className="text-emerald-700 dark:text-emerald-500" style={{textShadow: isDarkMode ? '0 2px 4px rgba(16,185,129,0.2)' : '0 2px 4px rgba(4,120,87,0.3)'}}>
            at the speed of thought.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-zinc-400 text-center max-w-3xl mb-14 leading-relaxed font-bold drop-shadow-sm" style={{textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.5)' : '0 1px 1px rgba(255,255,255,0.8)'}}>
          A purely deterministic, client-side natural language processing dashboard. 
          Analyze, extract, and score massive texts with zero backend.
        </p>

        {/* Skeuomorphic Button */}
        <button 
          onClick={onStart}
          className="group flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-b from-emerald-400 to-emerald-600 dark:from-emerald-500 dark:to-emerald-700 text-white rounded-2xl font-black text-2xl transition-all shadow-[0_8px_0_#064e3b,0_15px_20px_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,0.5)] dark:shadow-[0_8px_0_#022c22,0_15px_20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:shadow-none active:translate-y-[8px] cursor-pointer"
        >
          <span className="drop-shadow-md">Get Started</span>
          <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform drop-shadow-md" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28 max-w-6xl w-full px-4">
           {[
             { icon: Zap, color: 'text-amber-500', title: 'TF-IDF Algorithms', desc: 'Mathematical tokenization ranks phrases and arrays instantly.' },
             { icon: Shield, color: 'text-slate-600 dark:text-zinc-400', title: 'Absolute Privacy', desc: 'No databases. No tracking. Your data is strictly locked locally.' },
             { icon: BarChart3, color: 'text-emerald-600 dark:text-emerald-500', title: 'Lexical Telemetry', desc: 'Flesch-Kincaid gauges and sentiment scales mapped in real-time.' }
           ].map((item, i) => (
             <div key={i} className="p-8 rounded-3xl bg-gradient-to-b from-[#FAFAFA] to-[#E2E8F0] dark:from-[#25282C] dark:to-[#1B1D20] border border-slate-300 dark:border-zinc-800 shadow-[0_10px_20px_rgba(0,0,0,0.08),inset_0_2px_0_white] dark:shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
               <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b from-white to-slate-200 dark:from-[#2A2D32] dark:to-[#202225] shadow-[0_6px_10px_rgba(0,0,0,0.1),inset_0_2px_0_white] dark:shadow-[0_6px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center mb-6 border border-slate-300 dark:border-zinc-700`}>
                 <item.icon className={`${item.color} drop-shadow-sm`} size={32} />
               </div>
               <h3 className="text-2xl font-black mb-3 text-slate-800 dark:text-zinc-100" style={{textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.8)' : '0 1px 1px rgba(255,255,255,1)'}}>{item.title}</h3>
               <p className="text-base text-slate-600 dark:text-zinc-400 leading-relaxed font-bold" style={{textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.5)' : '0 1px 1px rgba(255,255,255,0.8)'}}>{item.desc}</p>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const isDarkMode = useTextStore((state) => state.isDarkMode);
  const toggleDarkMode = useTextStore((state) => state.toggleDarkMode);

  // Sync isDarkMode class dynamically onto html root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (!hasStarted) {
    return <LandingPage onStart={() => setHasStarted(true)} />;
  }

  return (
    <div className={`min-h-screen bg-[#EBE7E0] dark:bg-[#181A1C] text-slate-800 dark:text-zinc-100 font-sans overflow-x-hidden selection:bg-amber-200 selection:text-amber-900 relative ${isDarkMode ? 'dark' : ''}`}>
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08] pointer-events-none z-0 fixed" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")' }} />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-gradient-to-b from-[#F4F1EA] to-[#EBE7E0] dark:from-[#25282C] dark:to-[#181A1C] border-b border-slate-300 dark:border-zinc-800 shadow-[0_6px_15px_rgba(0,0,0,0.06),inset_0_2px_0_white] dark:shadow-[0_6px_15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="max-w-[1800px] mx-auto px-6 h-24 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setHasStarted(false)}>
             <div className="w-12 h-12 rounded-full bg-gradient-to-b from-slate-100 to-slate-300 dark:from-zinc-700 dark:to-zinc-800 shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_2px_0_rgba(255,255,255,0.8)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center border border-slate-400 dark:border-zinc-600 group-hover:scale-105 transition-transform">
               <Database className="text-slate-600 dark:text-zinc-300 drop-shadow-sm" size={22} />
             </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-zinc-100 drop-shadow-sm" style={{textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.8)' : '0 1px 1px rgba(255,255,255,0.8)'}}>
              Nexus<span className="text-emerald-700 dark:text-emerald-500">Text</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsTelemetryOpen(!isTelemetryOpen)}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] border border-slate-400 dark:border-zinc-600 rounded-xl font-black text-sm transition-all shadow-[0_5px_0_#94a3b8] dark:shadow-[0_5px_0_#141517] active:shadow-none active:translate-y-[5px] text-slate-700 dark:text-zinc-300 cursor-pointer"
            >
              <BarChart3 size={18} className="text-emerald-600 dark:text-emerald-500 drop-shadow-sm" />
              <span className="drop-shadow-sm" style={{textShadow: isDarkMode ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.8)'}}>Telemetry Panel</span>
            </button>

            {/* Dashboard Settings Control */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center justify-center p-3.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] border border-slate-400 dark:border-zinc-600 rounded-xl transition-all shadow-[0_5px_0_#94a3b8] dark:shadow-[0_5px_0_#141517] active:shadow-none active:translate-y-[5px] text-slate-700 dark:text-zinc-300 cursor-pointer"
                title="System Settings"
              >
                <Settings size={18} />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 top-14 w-60 bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] border border-slate-300 dark:border-zinc-700 rounded-2xl p-5 shadow-[0_15px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.4)] z-40">
                  <h4 className="text-xs font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-4">Settings</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700 dark:text-zinc-300 flex items-center gap-2">
                      {isDarkMode ? <Moon size={16} className="text-emerald-500" /> : <Sun size={16} className="text-amber-500" />}
                      Dark Theme
                    </span>
                    <button
                      onClick={toggleDarkMode}
                      className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-400'} border border-slate-500 cursor-pointer`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'} shadow`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[1800px] mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 h-full min-h-[calc(100vh-10rem)]">
          <section className="flex flex-col h-full min-h-[600px]">
            <RawInputEditor />
          </section>
          
          <section className="flex flex-col h-full">
            <AnalyticsDashboard />
          </section>
        </div>
      </main>

      <TelemetryPanel 
        isOpen={isTelemetryOpen} 
        onClose={() => setIsTelemetryOpen(false)} 
      />
    </div>
  );
}

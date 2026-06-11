import React, { useState, useEffect } from 'react';
import { Database, Settings, Sun, Moon, BarChart3 } from 'lucide-react';
import RawInputEditor from './components/RawInputEditor';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TelemetryPanel from './components/TelemetryPanel';
import LandingPage from './components/LandingPage';
import { useTextStore } from './store/useTextStore';

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
    <div className={`min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 font-sans overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 relative ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Mesh gradients for dashboard */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/2 blur-[100px] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-35 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-slate-200 dark:border-zinc-900 shadow-sm relative">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setHasStarted(false)}>
             <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center border border-emerald-100 dark:border-emerald-900/50">
               <Database className="text-emerald-600 dark:text-emerald-400" size={20} />
             </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">
              Nexus<span className="text-emerald-600 dark:text-emerald-500">Text</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTelemetryOpen(!isTelemetryOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-zinc-50 hover:bg-slate-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 border border-transparent rounded-lg font-semibold text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <BarChart3 size={16} />
              <span>Telemetry Panel</span>
            </button>

            {/* Dashboard Settings Control */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center justify-center p-2.5 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-850 rounded-lg transition-all shadow-sm active:scale-95 text-slate-600 dark:text-zinc-400 cursor-pointer"
                title="System Settings"
              >
                <Settings size={18} />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 top-12 w-60 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-lg z-40">
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
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full min-h-[calc(100vh-10rem)]">
          <section className="flex flex-col h-full">
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

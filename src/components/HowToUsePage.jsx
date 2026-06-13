import React, { useState } from 'react';
import { 
  Type, Tag, Sliders, Activity, 
  ArrowLeft, CheckCircle2, BookOpen, 
  Sparkles, ShieldAlert, Cpu, Heart 
} from 'lucide-react';
import { useTextStore } from '../store/useTextStore';

export default function HowToUsePage({ onClose }) {
  const [activeTab, setActiveTab] = useState('input');
  const isDarkMode = useTextStore((state) => state.isDarkMode);

  const steps = {
    input: {
      title: "1. Text Input & Data Presets",
      icon: <Type size={20} className="text-emerald-600 dark:text-emerald-400" />,
      tagline: "Enter your raw documents or load system presets.",
      desc: "NexusText supports manual typing, copy-pasting, or using pre-loaded academic article variants to test the analytical tools.",
      instructions: [
        "Paste any raw text or article inside the main editor box.",
        "Alternatively, hover over 'Load Sample Data' in the editor controls to pick one of three B.Tech case study text presets.",
        "The editor displays live, non-debounced metrics below the text area: character count, word count, paragraphs, and estimated reading time.",
        "Click the trash bin icon to clear the input text and reset all active telemetry analyses."
      ],
      badge: "Non-blocking Parser"
    },
    summarize: {
      title: "2. Compression & Extractive Summary",
      icon: <Sliders size={20} className="text-emerald-600 dark:text-emerald-400" />,
      tagline: "Fine-tune summary density dynamically in real-time.",
      desc: "Our extractive engine scores sentences using a local TF-IDF model, prioritizing high-value information.",
      instructions: [
        "Locate the 'Summary Matrix' card on the right-hand dashboard panel.",
        "Use the horizontal slider to adjust the summary density from 1% (highly compressed) to 100% (original text).",
        "The engine dynamically recalculates the sentence scores, selects the top sentences, and orders them chronologically to ensure natural readability.",
        "Use the copy button to copy the summary instantly to your system clipboard."
      ],
      badge: "Local TF-IDF Engine"
    },
    keywords: {
      title: "3. Keyword Matrix & Word Highlights",
      icon: <Tag size={20} className="text-emerald-600 dark:text-emerald-400" />,
      tagline: "Pinpoint core topics and trace root words.",
      desc: "The Keyword Matrix uses the Porter Stemmer algorithm to identify the most statistically significant terms in your text.",
      instructions: [
        "View the 'Keyword Matrix' below the summary output card to see automatically extracted key terms.",
        "Slide the 'Limit' slider in the keywords panel to view between 5 and 40 top keywords.",
        "Click any keyword button to trigger a highlighted search. The input editor will automatically switch to a read-only highlight display.",
        "The system will highlight every occurrence of the keyword (and all of its grammatical variations, like 'running' and 'run') and scroll automatically to the first match."
      ],
      badge: "Porter Stemmer Core"
    },
    telemetry: {
      title: "4. Telemetry Drawer & Snapshots",
      icon: <Activity size={20} className="text-emerald-600 dark:text-emerald-400" />,
      tagline: "Examine complex readability formulas and store states.",
      desc: "Open the Telemetry drawer to analyze emotional polarity, Flesch-Kincaid index levels, and commit states to the browser database.",
      instructions: [
        "Click the 'Telemetry Panel' button in the dashboard navigation header.",
        "Review the Flesch-Kincaid Readability index on the circular gauge. Values above 60 indicate easy reading, while values under 30 indicate academic-level complexity.",
        "Check the Emotional Polarity bar showing the positive-to-negative percentage ratio based on local dictionaries.",
        "Under the 'Snapshot DB' section, name and click 'Commit' to save the current text, summaries, and parameters into the browser's persistent database.",
        "You can restore or delete snapshots at any time, even after restarting the browser."
      ],
      badge: "Zustand Persistence"
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 font-sans selection:bg-emerald-100 selection:text-emerald-900 relative ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Background glow effects */}
      <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/2 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 rounded-lg text-sm font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-zinc-50">
            <Sparkles className="text-emerald-600 dark:text-emerald-500 animate-pulse" size={18} />
            <span>NexusText Guide</span>
          </div>
          <div className="w-16"></div> {/* Spacer for symmetry */}
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-100/50 dark:border-emerald-900/40 mb-4 uppercase tracking-wider">
            User Operations Manual
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50 mb-4">
            How to Use NexusText
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 font-medium text-base md:text-lg">
            Master the user interface, telemetry panels, and the client-side NLP algorithms. Explore each core feature below.
          </p>
        </div>

        {/* Tab System Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Sidebar Menu */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
            {Object.entries(steps).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-xl border font-semibold transition-all duration-200 shrink-0 lg:shrink cursor-pointer outline-none
                  ${activeTab === key 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-zinc-100 shadow-sm' 
                    : 'border-slate-200 dark:border-zinc-900 bg-white dark:bg-zinc-900 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-850'}`}
              >
                <div className={`p-2 rounded-lg border transition-colors
                  ${activeTab === key 
                    ? 'bg-white dark:bg-zinc-900 border-emerald-200 dark:border-emerald-900' 
                    : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-850'}`}
                >
                  {value.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-zinc-200">{value.title.split('. ')[1]}</div>
                  <span className="text-[10px] font-medium opacity-75 hidden sm:inline-block">Section {key.toUpperCase()}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content Panel */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 p-6 md:p-8 rounded-2xl shadow-sm flex flex-col justify-between">
            <div>
              {/* Content Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold bg-slate-100 dark:bg-zinc-950 px-3 py-1.5 rounded-lg border border-slate-200/50 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 uppercase tracking-widest">
                  {steps[activeTab].badge}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-500">
                  <Sparkles size={14} /> Interactive Guide
                </div>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-50 mb-2 flex items-center gap-2.5">
                {steps[activeTab].icon}
                {steps[activeTab].title}
              </h2>
              
              <p className="text-sm font-bold text-slate-700 dark:text-zinc-300 mb-2">
                {steps[activeTab].tagline}
              </p>
              
              <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed font-medium mb-6">
                {steps[activeTab].desc}
              </p>

              {/* Instructions list */}
              <div className="border-t border-slate-100 dark:border-zinc-850 pt-6">
                <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4">Step-by-Step Walkthrough</h3>
                <ul className="flex flex-col gap-4">
                  {steps[activeTab].instructions.map((inst, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center text-[10px] font-extrabold shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-slate-600 dark:text-zinc-300 text-sm font-semibold leading-relaxed">
                        {inst}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 p-4 bg-slate-50 dark:bg-zinc-950/50 border border-slate-100 dark:border-zinc-850/60 rounded-xl flex gap-3">
              <ShieldAlert className="text-emerald-600 dark:text-emerald-400 shrink-0" size={18} />
              <div className="text-xs text-slate-500 dark:text-zinc-450 leading-relaxed font-medium">
                <strong>Privacy Alert:</strong> All parsing operations, highlights, and history logs are processed locally using your device's browser thread. No text or telemetry metadata leaves your local browser container.
              </div>
            </div>

          </div>

        </div>

        {/* Global Action Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-zinc-950 text-white rounded-3xl p-8 md:p-10 border border-slate-800 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          {/* Gradient blur glow */}
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none" />
          
          <div className="max-w-2xl relative z-10">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to test the engine?</h3>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed">
              Launch the live sandbox environment now to analyze your own technical datasets or view complex readability indexes.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-md shrink-0 self-start md:self-center cursor-pointer active:scale-95"
          >
            <span>Open Dashboard</span>
            <CheckCircle2 size={16} />
          </button>
        </div>

      </main>
    </div>
  );
}

import React, { useMemo } from 'react';
import { useTextStore } from '../store/useTextStore';
import { Trash2, FileText, ChevronDown, XCircle, Type } from 'lucide-react';
import RawTextDisplay from './RawTextDisplay';

export default function RawInputEditor() {
  const rawText = useTextStore((state) => state.rawText);
  const setRawText = useTextStore((state) => state.setRawText);
  const sampleArticles = useTextStore((state) => state.sampleArticles);
  const highlightedKeyword = useTextStore((state) => state.highlightedKeyword);
  const clearHighlight = useTextStore((state) => state.clearHighlight);
  const processedResult = useTextStore((state) => state.processedResult);
  const isDarkMode = useTextStore((state) => state.isDarkMode);

  const handleTextChange = (e) => setRawText(e.target.value);
  const handleClear = () => { setRawText(''); clearHighlight(); };

  const metrics = useMemo(() => {
    const charsWithSpaces = rawText.length;
    const words = rawText.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const readingTime = Math.max(0, Math.ceil(wordCount / 200));
    const paragraphs = rawText.split(/\n+/).filter(p => p.trim().length > 0).length;
    return { charsWithSpaces, wordCount, readingTime, paragraphs };
  }, [rawText]);

  return (
    <div id="onboarding-editor" className="flex flex-col h-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl shadow-sm p-6 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <label htmlFor="raw-text-input" className="text-lg font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
            <Type size={16} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          Text Input
        </label>
        
        {highlightedKeyword && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 rounded-lg text-xs font-semibold border border-amber-100 dark:border-amber-900/30 animate-pulse">
            <span>Tracking: "{processedResult?.stemToOriginalMap?.[highlightedKeyword] || highlightedKeyword}"</span>
            <button 
              onClick={clearHighlight} 
              className="hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded p-0.5 transition-colors cursor-pointer"
            >
              <XCircle size={14} className="text-amber-600 dark:text-amber-400" />
            </button>
          </div>
        )}
      </div>
      
      {/* Text Area / Display */}
      <div className="flex-1 relative z-10 flex flex-col">
        {highlightedKeyword ? (
          <RawTextDisplay />
        ) : (
          <textarea
            id="raw-text-input"
            value={rawText}
            onChange={handleTextChange}
            placeholder="Paste or type your text here..."
            className="flex-1 w-full min-h-[300px] p-5 text-slate-800 dark:text-zinc-100 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-850 rounded-xl resize-none focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all font-sans text-base leading-relaxed mb-6 placeholder:text-slate-400 dark:placeholder:text-zinc-650"
            spellCheck="false"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10 mt-auto">
        
        {/* Hardware Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 rounded-lg transition-all shadow-sm active:scale-98 cursor-pointer">
              <FileText size={16} className="text-emerald-600 dark:text-emerald-500" />
              <span>Load Sample Data</span>
              <ChevronDown size={14} className="text-slate-400 dark:text-zinc-500" />
            </button>
            <div className="absolute left-0 bottom-full mb-2 w-64 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 overflow-hidden">
              <div className="p-1">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  System Presets
                </div>
                {sampleArticles.map((article, index) => (
                  <button
                    key={index}
                    onClick={() => setRawText(article)}
                    className="w-full text-left px-3 py-2.5 text-sm text-slate-700 dark:text-zinc-300 rounded-lg hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all font-semibold flex items-center gap-2 cursor-pointer"
                  >
                    Dataset Variant {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center justify-center p-2.5 text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-900 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-sm active:scale-95 cursor-pointer"
            title="Clear all text"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Minimalist Stats Panel */}
        <div className="flex items-center justify-between gap-4 sm:gap-6 bg-slate-50 dark:bg-zinc-950/50 px-5 py-3 rounded-xl border border-slate-100 dark:border-zinc-855/50 overflow-x-auto">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Chars</span>
            <span className="text-base font-bold text-slate-800 dark:text-zinc-200 leading-none">{metrics.charsWithSpaces}</span>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-zinc-800 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Words</span>
            <span className="text-base font-bold text-slate-800 dark:text-zinc-200 leading-none">{metrics.wordCount}</span>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-zinc-800 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Blocks</span>
            <span className="text-base font-bold text-slate-800 dark:text-zinc-200 leading-none">{metrics.paragraphs}</span>
          </div>
          <div className="w-px h-6 bg-slate-200 dark:bg-zinc-800 self-center"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-0.5">Time</span>
            <span className="text-base font-bold text-slate-800 dark:text-zinc-200 leading-none flex items-baseline gap-0.5">
              {metrics.readingTime}<span className="text-[10px] text-slate-500 font-medium">m</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

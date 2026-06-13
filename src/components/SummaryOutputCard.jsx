import React from 'react';
import { useTextStore } from '../store/useTextStore';
import { Sparkles, AlignLeft } from 'lucide-react';

export default function SummaryOutputCard() {
  const summaryText = useTextStore((state) => state.summaryText);
  const compressionPercentage = useTextStore((state) => state.compressionPercentage);
  const setCompressionPercentage = useTextStore((state) => state.setCompressionPercentage);
  const processedResult = useTextStore((state) => state.processedResult);

  const hasContent = processedResult !== null;

  return (
    <div id="onboarding-summary" className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl shadow-sm p-6 flex flex-col relative">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 relative z-10">
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2 group relative cursor-help">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
            <Sparkles size={16} className="text-amber-500" />
          </div>
          Extractive Summary
          
          <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-xs font-semibold text-slate-500 dark:text-zinc-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-md z-25 leading-relaxed">
            This summary is generated using pure TF-IDF mathematical extraction. It isolates the most statistically significant sentences locally.
          </div>
        </h2>

        {/* Dynamic Compression Slider */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-950/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-zinc-850/50 text-xs font-semibold">
           <span className="text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
             Density: <span className="text-emerald-600 dark:text-emerald-400 ml-0.5 font-bold">{compressionPercentage}%</span>
           </span>
           <input 
            type="range" 
            min="5" 
            max="100" 
            step="5"
            disabled={!hasContent}
            value={compressionPercentage}
            onChange={(e) => setCompressionPercentage(parseInt(e.target.value))}
            className="w-24 md:w-32 h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500 disabled:opacity-50"
          />
        </div>
      </div>

      <div className="flex-1 relative z-10 flex flex-col">
        {!hasContent || !summaryText ? (
          <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-950/10 text-slate-400 dark:text-zinc-650 min-h-[160px]">
             <AlignLeft size={28} className="opacity-40 mb-2" />
             <p className="text-xs font-semibold tracking-wider uppercase opacity-80">Waiting for text</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-zinc-950/45 p-5 rounded-xl border border-slate-200 dark:border-zinc-850 overflow-y-auto max-h-[380px] scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
            <p className="text-slate-700 dark:text-zinc-200 text-base leading-relaxed font-medium">
              {summaryText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

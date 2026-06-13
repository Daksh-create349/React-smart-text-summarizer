import React from 'react';
import { useTextStore } from '../store/useTextStore';
import { Tag, Settings2 } from 'lucide-react';

export default function KeywordCloudGrid() {
  const processedResult = useTextStore((state) => state.processedResult);
  const maxKeywords = useTextStore((state) => state.maxKeywords);
  const setMaxKeywords = useTextStore((state) => state.setMaxKeywords);
  const highlightedKeyword = useTextStore((state) => state.highlightedKeyword);
  const setHighlightedKeyword = useTextStore((state) => state.setHighlightedKeyword);

  if (!processedResult || !processedResult.tfidfMap) {
    return (
      <div id="onboarding-keywords" className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl shadow-sm p-6 flex-1 flex flex-col transition-all">
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2 mb-5">
           <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
             <Tag className="text-emerald-600 dark:text-emerald-400" size={16} /> 
           </div>
           Keyword Matrix
        </h2>
        <div className="flex-1 border border-dashed border-slate-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center text-slate-400 dark:text-zinc-650 min-h-[160px] bg-slate-50/50 dark:bg-zinc-950/10 shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)]">
          <Tag size={28} className="opacity-40 mb-2" />
          <p className="text-xs font-semibold tracking-wider uppercase opacity-80">Waiting for text...</p>
        </div>
      </div>
    );
  }

  const tfidfEntries = Object.entries(processedResult.tfidfMap);
  tfidfEntries.sort((a, b) => b[1] - a[1]);
  const topKeywords = tfidfEntries.slice(0, maxKeywords);

  const maxWeight = topKeywords.length > 0 ? topKeywords[0][1] : 1;
  const minWeight = topKeywords.length > 0 ? topKeywords[topKeywords.length - 1][1] : 0;
  
  const getBadgeStyle = (weight) => {
    const normalized = maxWeight === minWeight ? 1 : (weight - minWeight) / (maxWeight - minWeight);
    const fontSize = 0.8 + (normalized * 0.3); 
    
    return {
      fontSize: `${fontSize}rem`
    };
  };

  return (
    <div id="onboarding-keywords" className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-2xl shadow-sm p-6 flex-1 flex flex-col transition-all relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 relative z-10">
        <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
            <Tag size={16} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          Keyword Matrix
        </h2>
        
        {/* Dynamic Limit Slider */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-950/50 px-4 py-2 rounded-xl border border-slate-100 dark:border-zinc-850/50 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            <Settings2 size={14} className="text-slate-400 dark:text-zinc-500" /> 
            Limit: <span className="text-emerald-600 dark:text-emerald-400 ml-0.5 font-bold">{maxKeywords}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="40" 
            step="5"
            value={maxKeywords}
            onChange={(e) => setMaxKeywords(parseInt(e.target.value))}
            className="w-24 md:w-32 h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start relative z-10 p-4 bg-slate-50/50 dark:bg-zinc-950/45 rounded-xl border border-slate-200 dark:border-zinc-850">
        {topKeywords.map(([word, weight]) => {
          const isActive = highlightedKeyword === word;
          const dynamicStyle = getBadgeStyle(weight);
          const displayWord = processedResult.stemToOriginalMap?.[word] || word;
          
          return (
            <button
              key={word}
              onClick={() => setHighlightedKeyword(isActive ? null : word)}
              style={dynamicStyle}
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer outline-none font-semibold flex items-center justify-center
                ${isActive 
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm scale-95' 
                  : 'border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 bg-white dark:bg-zinc-900/50 hover:bg-slate-50 dark:hover:bg-zinc-800'}`}
              title={`Root Stem: ${word} | Score: ${weight.toFixed(4)}`}
            >
              <span>{displayWord}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { useTextStore } from '../store/useTextStore';
import { Tag, Settings2 } from 'lucide-react';

export default function KeywordCloudGrid() {
  const processedResult = useTextStore((state) => state.processedResult);
  const maxKeywords = useTextStore((state) => state.maxKeywords);
  const setMaxKeywords = useTextStore((state) => state.setMaxKeywords);
  const highlightedKeyword = useTextStore((state) => state.highlightedKeyword);
  const setHighlightedKeyword = useTextStore((state) => state.setHighlightedKeyword);
  const isDarkMode = useTextStore((state) => state.isDarkMode);

  const textShadowStyle = { textShadow: isDarkMode ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.4)' };
  const headingShadowStyle = { textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.6)' : '0 1px 1px rgba(255,255,255,1)' };

  if (!processedResult || !processedResult.tfidfMap) {
    return (
      <div className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_0_white] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] border border-slate-300 dark:border-zinc-700 p-6 lg:p-8 flex-1 flex flex-col transition-all">
        <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100 flex items-center gap-3 mb-6" style={headingShadowStyle}>
           <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] rounded-xl border border-slate-300 dark:border-zinc-600 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
             <Tag className="text-emerald-600 dark:text-emerald-500 drop-shadow-sm" size={20} /> 
           </div>
           Keyword Matrix
        </h2>
        <div className="flex-1 border-2 border-slate-300 dark:border-zinc-850 border-dashed rounded-3xl flex flex-col items-center justify-center text-slate-500 dark:text-zinc-500 gap-4 min-h-[200px] bg-[#EBE7E0]/50 dark:bg-[#1A1C1F]/50 shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)]">
          <Tag size={36} className="opacity-30 mb-2 text-slate-600 dark:text-zinc-500" />
          <p className="font-black text-sm tracking-widest uppercase opacity-60" style={textShadowStyle}>Waiting for text...</p>
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
    const fontSize = 0.8 + (normalized * 0.4); 
    
    return {
      fontSize: `${fontSize}rem`
    };
  };

  return (
    <div className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_0_white] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] border border-slate-300 dark:border-zinc-700 p-6 lg:p-8 flex-1 flex flex-col transition-all relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100 flex items-center gap-3" style={headingShadowStyle}>
          <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] rounded-xl border border-slate-300 dark:border-zinc-600 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <Tag size={20} className="text-emerald-600 dark:text-emerald-500 drop-shadow-sm" />
          </div>
          Keyword Matrix
        </h2>
        
        {/* Recessed Limit Slider */}
        <div className="flex items-center gap-4 bg-[#D4D1C9] dark:bg-[#1A1C1F] px-6 py-3 rounded-2xl border border-slate-400 dark:border-zinc-800 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_3px_6px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2 text-[11px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-widest" style={textShadowStyle}>
            <Settings2 size={16} className="text-slate-500 dark:text-zinc-400 drop-shadow-sm" /> 
            Limit: <span className="text-emerald-700 dark:text-emerald-500 ml-1 text-sm">{maxKeywords}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="40" 
            step="5"
            value={maxKeywords}
            onChange={(e) => setMaxKeywords(parseInt(e.target.value))}
            className="w-24 md:w-32 h-2.5 bg-slate-400 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-emerald-600 dark:accent-emerald-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start relative z-10 p-4 bg-[#EBE7E0]/50 dark:bg-[#1A1C1F]/50 rounded-3xl border border-slate-300 dark:border-zinc-800 shadow-[inset_0_4px_8px_rgba(0,0,0,0.03)]">
        {topKeywords.map(([word, weight]) => {
          const isActive = highlightedKeyword === word;
          const dynamicStyle = getBadgeStyle(weight);
          const displayWord = processedResult.stemToOriginalMap?.[word] || word;
          
          return (
            <button
              key={word}
              onClick={() => setHighlightedKeyword(isActive ? null : word)}
              style={dynamicStyle}
              className={`px-5 py-2.5 rounded-xl border transition-all duration-300 cursor-pointer outline-none font-black flex items-center justify-center
                ${isActive 
                  ? 'bg-[#CFCBC3] dark:bg-[#1A1C1F] border-slate-400 dark:border-zinc-750 text-amber-700 dark:text-amber-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_1px_0_rgba(0,0,0,0.5)] scale-95 translate-y-[2px]' 
                  : 'bg-gradient-to-b from-white to-slate-100 dark:from-[#2C2E33] dark:to-[#222428] border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 shadow-[0_6px_0_#cbd5e1,0_8px_10px_rgba(0,0,0,0.1),inset_0_2px_0_white] dark:shadow-[0_6px_0_#141517,0_8px_10px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_#cbd5e1,0_4px_6px_rgba(0,0,0,0.1),inset_0_2px_0_white] dark:hover:shadow-[0_4px_0_#141517,0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] hover:translate-y-[2px]'}`}
              title={`Root Stem: ${word} | Score: ${weight.toFixed(4)}`}
            >
              <span style={{textShadow: isActive ? (isDarkMode ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.4)') : (isDarkMode ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.8)')}}>
                {displayWord}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

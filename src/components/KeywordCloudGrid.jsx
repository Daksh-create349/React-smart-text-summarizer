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
      <div className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_0_white] border border-slate-300 p-6 lg:p-8 flex-1 flex flex-col transition-all">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 mb-6" style={{textShadow: '0 1px 1px rgba(255,255,255,1)'}}>
           <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 rounded-xl border border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white]">
             <Tag className="text-emerald-600 drop-shadow-sm" size={20} /> 
           </div>
           Keyword Matrix
        </h2>
        <div className="flex-1 border-2 border-slate-300 border-dashed rounded-3xl flex flex-col items-center justify-center text-slate-500 gap-4 min-h-[200px] bg-[#EBE7E0]/50 shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)]">
          <Tag size={36} className="opacity-30 mb-2 text-slate-600" />
          <p className="font-black text-sm tracking-widest uppercase opacity-60" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>Waiting for text...</p>
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
    <div className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_0_white] border border-slate-300 p-6 lg:p-8 flex-1 flex flex-col transition-all relative">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3" style={{textShadow: '0 1px 1px rgba(255,255,255,1)'}}>
          <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 rounded-xl border border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white]">
            <Tag size={20} className="text-emerald-600 drop-shadow-sm" />
          </div>
          Keyword Matrix
        </h2>
        
        {/* Recessed Limit Slider */}
        <div className="flex items-center gap-4 bg-[#D4D1C9] px-6 py-3 rounded-2xl border border-slate-400 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)]">
          <div className="flex items-center gap-2 text-[11px] font-black text-slate-600 uppercase tracking-widest" style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}>
            <Settings2 size={16} className="text-slate-500 drop-shadow-sm" /> 
            Limit: <span className="text-emerald-700 ml-1 text-sm">{maxKeywords}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="40" 
            step="5"
            value={maxKeywords}
            onChange={(e) => setMaxKeywords(parseInt(e.target.value))}
            className="w-24 md:w-32 h-2.5 bg-slate-400 rounded-full appearance-none cursor-pointer accent-emerald-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start relative z-10 p-4 bg-[#EBE7E0]/50 rounded-3xl border border-slate-300 shadow-[inset_0_4px_8px_rgba(0,0,0,0.03)]">
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
                  ? 'bg-[#CFCBC3] border-slate-400 text-amber-700 shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.8)] scale-95 translate-y-[2px]' 
                  : 'bg-gradient-to-b from-white to-slate-100 border-slate-300 text-slate-700 shadow-[0_6px_0_#cbd5e1,0_8px_10px_rgba(0,0,0,0.1),inset_0_2px_0_white] hover:shadow-[0_4px_0_#cbd5e1,0_4px_6px_rgba(0,0,0,0.1),inset_0_2px_0_white] hover:translate-y-[2px]'}`}
              title={`Root Stem: ${word} | Score: ${weight.toFixed(4)}`}
            >
              <span style={{textShadow: isActive ? '0 1px 0 rgba(255,255,255,0.4)' : '0 1px 0 rgba(255,255,255,0.8)'}}>
                {displayWord}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

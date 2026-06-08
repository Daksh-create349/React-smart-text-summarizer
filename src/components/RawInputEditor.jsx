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
    <div className="flex flex-col h-full bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_0_white] border border-slate-300 p-6 lg:p-8 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <label htmlFor="raw-text-input" className="text-xl font-black text-slate-800 flex items-center gap-3" style={{textShadow: '0 1px 1px rgba(255,255,255,1)'}}>
          <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 rounded-xl border border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white]">
            <Type size={20} className="text-emerald-700 drop-shadow-sm" />
          </div>
          Text Input
        </label>
        
        {highlightedKeyword && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900 rounded-xl text-sm font-black shadow-[inset_0_2px_0_white,0_4px_6px_rgba(0,0,0,0.1)] border border-amber-300 animate-pulse">
            <span style={{textShadow: '0 1px 0 rgba(255,255,255,0.5)'}}>Tracking: "{processedResult?.stemToOriginalMap?.[highlightedKeyword] || highlightedKeyword}"</span>
            <button 
              onClick={clearHighlight} 
              className="hover:bg-amber-300/50 rounded-full p-1 transition-colors"
            >
              <XCircle size={18} className="text-amber-700" />
            </button>
          </div>
        )}
      </div>
      
      {/* Recessed Text Area / Display */}
      <div className="flex-1 relative z-10 flex flex-col">
        {highlightedKeyword ? (
          <RawTextDisplay />
        ) : (
          <textarea
            id="raw-text-input"
            value={rawText}
            onChange={handleTextChange}
            placeholder="Paste or type your text here."
            className="flex-1 w-full min-h-[300px] p-6 text-slate-800 bg-[#D4D1C9] border border-slate-400 rounded-2xl resize-none focus:outline-none focus:ring-4 focus:ring-emerald-500/30 transition-all font-sans text-lg leading-relaxed tracking-wide mb-8 shadow-[inset_0_6px_12px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(0,0,0,0.1),0_2px_0_rgba(255,255,255,0.8)] placeholder:text-slate-500 placeholder:font-bold"
            spellCheck="false"
          />
        )}
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 relative z-10 mt-auto">
        
        {/* Hardware Action Buttons */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-6 py-4 text-sm font-black text-slate-700 bg-gradient-to-b from-white to-slate-200 border border-slate-300 rounded-xl transition-all shadow-[0_5px_0_#cbd5e1,0_8px_10px_rgba(0,0,0,0.1),inset_0_2px_0_white] active:shadow-[0_0px_0_#cbd5e1,0_0px_0px_rgba(0,0,0,0.1),inset_0_4px_6px_rgba(0,0,0,0.1)] active:translate-y-[5px]">
              <FileText size={18} className="text-emerald-600 drop-shadow-sm" />
              <span style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>Load Sample Data</span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
            <div className="absolute left-0 bottom-full mb-3 w-64 bg-[#EBE7E0] border border-slate-300 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.2),inset_0_2px_0_white] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 overflow-hidden">
              <div className="p-2">
                <div className="px-4 py-2 text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1" style={{textShadow: '0 1px 0 rgba(255,255,255,0.5)'}}>
                  System Presets
                </div>
                {sampleArticles.map((article, index) => (
                  <button
                    key={index}
                    onClick={() => setRawText(article)}
                    className="w-full text-left px-4 py-3.5 text-sm text-slate-700 rounded-xl hover:bg-white hover:shadow-[0_2px_4px_rgba(0,0,0,0.05)] transition-all font-black flex items-center gap-2"
                  >
                    Dataset Variant {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center justify-center p-4 text-rose-600 bg-gradient-to-b from-white to-slate-200 border border-slate-300 rounded-xl transition-all shadow-[0_5px_0_#cbd5e1,0_8px_10px_rgba(0,0,0,0.1),inset_0_2px_0_white] active:shadow-[0_0px_0_#cbd5e1,0_0px_0px_rgba(0,0,0,0.1),inset_0_4px_6px_rgba(0,0,0,0.1)] active:translate-y-[5px]"
            title="Clear all text"
          >
            <Trash2 size={20} className="drop-shadow-sm" />
          </button>
        </div>

        {/* Recessed LCD Ticker */}
        <div className="flex items-center justify-between xl:justify-start gap-4 sm:gap-8 bg-[#CFCBC3] px-6 sm:px-8 py-4 rounded-xl border border-slate-400 shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)] overflow-x-auto">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 opacity-70">Chars</span>
            <span className="text-xl font-black text-slate-800 leading-none font-mono tracking-tight" style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}>{metrics.charsWithSpaces}</span>
          </div>
          <div className="w-px h-8 bg-slate-400 shadow-[1px_0_0_rgba(255,255,255,0.5)]"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 opacity-70">Words</span>
            <span className="text-xl font-black text-slate-800 leading-none font-mono tracking-tight" style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}>{metrics.wordCount}</span>
          </div>
          <div className="w-px h-8 bg-slate-400 shadow-[1px_0_0_rgba(255,255,255,0.5)]"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 opacity-70">Blocks</span>
            <span className="text-xl font-black text-slate-800 leading-none font-mono tracking-tight" style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}>{metrics.paragraphs}</span>
          </div>
          <div className="w-px h-8 bg-slate-400 shadow-[1px_0_0_rgba(255,255,255,0.5)]"></div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1 opacity-70">Time</span>
            <span className="text-xl font-black text-slate-800 leading-none font-mono tracking-tight flex items-baseline gap-1" style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}>
              {metrics.readingTime} <span className="text-xs text-slate-600 font-sans">m</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

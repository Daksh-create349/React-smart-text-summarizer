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
    <div className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_2px_0_white] border border-slate-300 p-6 lg:p-8 flex flex-col transition-all relative">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 relative z-10">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 group relative cursor-help" style={{textShadow: '0 1px 1px rgba(255,255,255,1)'}}>
          <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 rounded-xl border border-slate-300 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white]">
            <Sparkles size={20} className="text-amber-500 drop-shadow-sm" />
          </div>
          Extractive Summary
          
          <div className="absolute left-0 bottom-full mb-3 w-64 p-4 bg-[#F0EBE1] border border-slate-300 rounded-2xl text-xs font-black text-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-[0_15px_30px_rgba(0,0,0,0.2),inset_0_2px_0_white] z-20 leading-relaxed">
            This summary is generated using pure TF-IDF mathematical extraction. It isolates the most statistically significant sentences locally.
          </div>
        </h2>

        {/* Hardware Compression Slider */}
        <div className="flex items-center gap-4 bg-[#D4D1C9] px-6 py-3 rounded-2xl border border-slate-400 shadow-[inset_0_3px_6px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)]">
           <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest" style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}>
             Density: <span className="text-emerald-700 ml-1 text-sm">{compressionPercentage}%</span>
           </span>
           <input 
            type="range" 
            min="5" 
            max="100" 
            step="5"
            disabled={!hasContent}
            value={compressionPercentage}
            onChange={(e) => setCompressionPercentage(parseInt(e.target.value))}
            className="w-24 md:w-32 h-2.5 bg-slate-400 rounded-full appearance-none cursor-pointer accent-emerald-600 disabled:opacity-50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
          />
        </div>
      </div>

      <div className="flex-1 relative z-10 flex flex-col">
        {!hasContent || !summaryText ? (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-slate-300 border-dashed rounded-3xl bg-[#EBE7E0]/50 text-slate-500 min-h-[200px] shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)]">
             <AlignLeft size={36} className="opacity-30 mb-4 text-slate-600" />
             <p className="font-black text-sm tracking-widest uppercase opacity-60" style={{textShadow: '0 1px 0 rgba(255,255,255,0.8)'}}>Awaiting Text Ingestion</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-[#FCFBFA] p-6 sm:p-8 rounded-3xl border border-slate-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02),0_4px_10px_rgba(0,0,0,0.05)] overflow-y-auto max-h-[400px]">
            <p className="text-slate-800 text-lg md:text-xl leading-relaxed tracking-wide font-medium" style={{textShadow: '0 1px 0 rgba(255,255,255,1)'}}>
              {summaryText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

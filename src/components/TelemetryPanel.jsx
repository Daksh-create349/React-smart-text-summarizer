import React, { useMemo } from 'react';
import { useTextStore } from '../store/useTextStore';
import { X, Save, Clock, Trash2, DownloadCloud, Activity, Heart, BookOpen, FileDigit } from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export default function TelemetryPanel({ isOpen, onClose }) {
  const processedResult = useTextStore((state) => state.processedResult);
  const rawText = useTextStore((state) => state.rawText);
  const history = useTextStore((state) => state.history);
  const saveToHistory = useTextStore((state) => state.saveToHistory);
  const loadFromHistory = useTextStore((state) => state.loadFromHistory);
  const deleteHistory = useTextStore((state) => state.deleteHistory);
  const isDarkMode = useTextStore((state) => state.isDarkMode);

  const handleSave = () => {
    const name = window.prompt('Enter an alias for this snapshot:');
    if (name !== null) {
      saveToHistory(name || undefined);
    }
  };

  const complexity = useMemo(() => {
    if (!processedResult || !processedResult.originalSentences || processedResult.originalSentences.length === 0) {
      return { avgWordLength: 0, avgSentenceLength: 0 };
    }
    const sentences = processedResult.originalSentences;
    const words = rawText.trim().split(/\s+/).filter(w => w.length > 0);
    const avgSentenceLength = Math.round(words.length / sentences.length);
    const totalChars = words.reduce((acc, word) => acc + word.length, 0);
    const avgWordLength = words.length > 0 ? (totalChars / words.length).toFixed(1) : 0;
    return { avgSentenceLength, avgWordLength };
  }, [processedResult, rawText]);

  const readabilityScore = processedResult ? processedResult.readabilityScore : 0;
  const readabilityColor = readabilityScore < 50 ? '#f43f5e' : readabilityScore <= 70 ? '#f59e0b' : '#059669'; // rose, amber, emerald
  
  const readabilityData = [{ name: 'Score', value: readabilityScore, fill: readabilityColor }];
  const readabilityBg = isDarkMode ? '#232528' : '#C6C4BC';

  const sentiment = processedResult ? processedResult.sentiment : { positive: 0, negative: 0, overall: 50 };
  const totalSentiment = sentiment.positive + sentiment.negative;
  const posPct = totalSentiment > 0 ? (sentiment.positive / totalSentiment) * 100 : 0;
  const negPct = totalSentiment > 0 ? (sentiment.negative / totalSentiment) * 100 : 0;

  const textShadowStyle = { textShadow: isDarkMode ? '0 1px 0 rgba(0,0,0,0.5)' : '0 1px 0 rgba(255,255,255,0.8)' };
  const headingShadowStyle = { textShadow: isDarkMode ? '0 1px 1px rgba(0,0,0,0.6)' : '0 1px 1px rgba(255,255,255,1)' };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-[420px] max-w-[100vw] bg-[#EBE7E0] dark:bg-[#181A1C] border-l border-slate-300 dark:border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="bg-gradient-to-b from-[#F4F1EA] to-[#EBE7E0] dark:from-[#25282C] dark:to-[#181A1C] p-6 border-b border-slate-300 dark:border-zinc-800 shadow-[0_4px_10px_rgba(0,0,0,0.05),inset_0_2px_0_white] dark:shadow-[0_4px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-black text-slate-800 dark:text-zinc-100 flex items-center gap-3" style={headingShadowStyle}>
            <div className="p-2.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] rounded-xl border border-slate-300 dark:border-zinc-600 shadow-[0_2px_4px_rgba(0,0,0,0.05),inset_0_2px_0_white] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
              <Activity className="text-emerald-600 dark:text-emerald-500 drop-shadow-sm" size={20} />
            </div>
            Telemetry Matrix
          </h2>
          <button 
            onClick={onClose}
            className="p-3 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] border border-slate-300 dark:border-zinc-700 shadow-[0_4px_0_#cbd5e1,inset_0_2px_0_white] dark:shadow-[0_4px_0_#141517,inset_0_1px_0_rgba(255,255,255,0.05)] active:shadow-none active:translate-y-[4px] rounded-xl transition-all cursor-pointer text-slate-700 dark:text-zinc-300"
          >
            <X size={20} className="text-slate-600 dark:text-zinc-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-slate-400 dark:scrollbar-thumb-zinc-800">
          
          {/* Readability Index */}
          <section className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] p-6 rounded-3xl border border-slate-300 dark:border-zinc-700 shadow-[0_10px_20px_rgba(0,0,0,0.08),inset_0_2px_0_white] dark:shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] relative">
            <h3 className="text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2" style={textShadowStyle}>
              <BookOpen size={16} className="text-emerald-600 dark:text-emerald-500" /> Readability Index
            </h3>
            <div className="h-[140px] relative overflow-hidden flex items-end justify-center pb-3 bg-[#D4D1C9] dark:bg-[#1A1C1F] rounded-2xl border border-slate-400 dark:border-zinc-800 shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)]">
              <ResponsiveContainer width="100%" height={260} className="absolute top-0">
                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={16} data={readabilityData} startAngle={180} endAngle={0}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} axisLine={false} />
                  <RadialBar minAngle={15} background={{ fill: readabilityBg }} clockWise={true} dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="flex flex-col items-center justify-center relative z-10 pb-1">
                <span className="text-5xl font-black text-slate-800 dark:text-zinc-100 leading-none tracking-tight drop-shadow-md">{readabilityScore}</span>
                <span className="text-[10px] font-black text-slate-600 dark:text-zinc-400 mt-2 uppercase tracking-widest">Flesch-Kincaid</span>
              </div>
            </div>
          </section>

          {/* Emotional Polarity */}
          <section className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] p-6 rounded-3xl border border-slate-300 dark:border-zinc-700 shadow-[0_10px_20px_rgba(0,0,0,0.08),inset_0_2px_0_white] dark:shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <h3 className="text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-5 flex items-center gap-2" style={textShadowStyle}>
              <Heart size={16} className="text-rose-500 dark:text-rose-450" /> Emotional Polarity
            </h3>
            <div className="w-full h-4 bg-[#D4D1C9] dark:bg-[#1A1C1F] rounded-full overflow-hidden flex shadow-[inset_0_3px_6px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_3px_6px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)] border border-slate-400 dark:border-zinc-800">
              {totalSentiment > 0 ? (
                <>
                  <div className="h-full bg-emerald-500 shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,0.4)] transition-all duration-500 border-r border-emerald-700" style={{ width: `${posPct}%` }} />
                  <div className="h-full bg-rose-500 shadow-[inset_0_-2px_0_rgba(0,0,0,0.2),inset_0_2px_0_rgba(255,255,255,0.4)] transition-all duration-500 border-l border-rose-700" style={{ width: `${negPct}%` }} />
                </>
              ) : (
                <div className="h-full bg-[#C6C4BC] dark:bg-[#282B2F] w-full" />
              )}
            </div>
            <div className="flex justify-between mt-4 text-[11px] font-black uppercase tracking-wider">
              <span className="text-emerald-700 dark:text-emerald-500 drop-shadow-sm">{posPct.toFixed(0)}% Positive</span>
              {totalSentiment === 0 && <span className="text-slate-500 dark:text-zinc-500">Neutral Baseline</span>}
              <span className="text-rose-650 dark:text-rose-400 drop-shadow-sm">{negPct.toFixed(0)}% Negative</span>
            </div>
          </section>

          {/* Complexity Profiler */}
          <section className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] p-6 rounded-3xl border border-slate-300 dark:border-zinc-700 shadow-[0_10px_20px_rgba(0,0,0,0.08),inset_0_2px_0_white] dark:shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] grid grid-cols-2 gap-4">
             <h3 className="col-span-2 text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-2" style={textShadowStyle}>
              <FileDigit size={16} className="text-amber-600 dark:text-amber-500" /> Complexity Profiler
            </h3>
            <div className="bg-[#D4D1C9] dark:bg-[#1A1C1F] p-5 rounded-2xl border border-slate-400 dark:border-zinc-800 flex flex-col shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)]">
              <span className="text-[10px] font-black text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-1.5 opacity-80" style={textShadowStyle}>Avg Word</span>
              <span className="text-3xl font-black text-slate-800 dark:text-zinc-200 tracking-tight font-mono drop-shadow-sm" style={textShadowStyle}>
                {complexity.avgWordLength} <span className="text-[10px] text-slate-600 dark:text-zinc-400 font-black uppercase tracking-widest ml-1 font-sans">chars</span>
              </span>
            </div>
            <div className="bg-[#D4D1C9] dark:bg-[#1A1C1F] p-5 rounded-2xl border border-slate-400 dark:border-zinc-800 flex flex-col shadow-[inset_0_4px_8px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4),0_1px_0_rgba(255,255,255,0.05)]">
              <span className="text-[10px] font-black text-slate-500 dark:text-zinc-500 uppercase tracking-widest mb-1.5 opacity-80" style={textShadowStyle}>Avg Sentence</span>
              <span className="text-3xl font-black text-slate-800 dark:text-zinc-200 tracking-tight font-mono drop-shadow-sm" style={textShadowStyle}>
                {complexity.avgSentenceLength} <span className="text-[10px] text-slate-600 dark:text-zinc-400 font-black uppercase tracking-widest ml-1 font-sans">words</span>
              </span>
            </div>
          </section>

          {/* Snapshot DB */}
          <section className="bg-gradient-to-b from-[#F7F5F0] to-[#EAE6DF] dark:from-[#2A2D32] dark:to-[#202225] rounded-3xl border border-slate-300 dark:border-zinc-700 shadow-[0_10px_20px_rgba(0,0,0,0.08),inset_0_2px_0_white] dark:shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col flex-1 min-h-[350px]">
            <div className="p-5 border-b border-slate-300 dark:border-zinc-750 flex items-center justify-between shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <h3 className="text-[11px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest flex items-center gap-2" style={textShadowStyle}>
                <Clock size={16} className="text-emerald-600 dark:text-emerald-500" /> Snapshot DB
              </h3>
              <button
                onClick={handleSave}
                disabled={!rawText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2C2E33] dark:to-[#222428] text-slate-700 dark:text-zinc-300 border border-slate-300 dark:border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-[11px] uppercase tracking-wider font-black transition-all shadow-[0_3px_0_#cbd5e1,inset_0_2px_0_white] dark:shadow-[0_3px_0_#141517,inset_0_1px_0_rgba(255,255,255,0.05)] active:shadow-none active:translate-y-[3px] cursor-pointer"
              >
                <Save size={16} className="text-emerald-600 dark:text-emerald-500 drop-shadow-sm" /> Commit
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-[#EBE7E0]/50 dark:bg-[#1A1C1F]/50 rounded-b-3xl shadow-[inset_0_4px_8px_rgba(0,0,0,0.02)]">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 dark:text-zinc-500 py-10">
                  <Clock size={40} className="mb-4 opacity-30 text-slate-600 dark:text-zinc-500" />
                  <p className="text-sm font-black tracking-widest uppercase opacity-70">Memory Bank Empty</p>
                  <p className="text-xs mt-2 font-bold opacity-60">Commit a snapshot to hardware.</p>
                </div>
              ) : (
                history.slice().reverse().map(entry => (
                  <div key={entry.id} className="bg-gradient-to-b from-white to-[#F4F1EA] dark:from-[#2C2E33] dark:to-[#222428] p-5 rounded-2xl border border-slate-300 dark:border-zinc-700 shadow-[0_4px_8px_rgba(0,0,0,0.05),inset_0_2px_0_white] dark:shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col hover:shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_2px_0_white] dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-1 transition-all group">
                    
                    <div className="flex justify-between items-start mb-4">
                      <div className="font-black text-slate-800 dark:text-zinc-200 text-sm break-words pr-2 leading-tight drop-shadow-sm">
                        {entry.name}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 dark:text-zinc-400 whitespace-nowrap bg-[#EBE7E0] dark:bg-[#1A1C1F] px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_1px_0_rgba(0,0,0,0.5)]">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="text-[10px] font-black text-slate-500 dark:text-zinc-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3),0_1px_0_rgba(255,255,255,0.8)]"></div>
                      Density Config: <span className="text-emerald-700 dark:text-emerald-500">{entry.compressionPercentage}%</span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-auto">
                      <button
                        onClick={() => { loadFromHistory(entry.id); onClose(); }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-b from-white to-slate-200 dark:from-[#2A2D32] dark:to-[#202225] border border-slate-300 dark:border-zinc-700 rounded-xl text-[11px] uppercase tracking-wider font-black transition-all text-slate-700 dark:text-zinc-300 shadow-[0_3px_0_#cbd5e1,inset_0_2px_0_white] dark:shadow-[0_3px_0_#141517,inset_0_1px_0_rgba(255,255,255,0.05)] active:shadow-none active:translate-y-[3px] cursor-pointer"
                      >
                        <DownloadCloud size={16} className="text-emerald-600 dark:text-emerald-500 drop-shadow-sm" /> Restore
                      </button>
                      <button
                        onClick={() => deleteHistory(entry.id)}
                        className="p-2.5 text-rose-600 dark:text-rose-400 bg-gradient-to-b from-white to-slate-200 dark:from-[#2A2D32] dark:to-[#202225] border border-slate-300 dark:border-zinc-700 rounded-xl transition-all shadow-[0_3px_0_#cbd5e1,inset_0_2px_0_white] dark:shadow-[0_3px_0_#141517,inset_0_1px_0_rgba(255,255,255,0.05)] active:shadow-none active:translate-y-[3px] cursor-pointer"
                      >
                        <Trash2 size={18} className="drop-shadow-sm" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

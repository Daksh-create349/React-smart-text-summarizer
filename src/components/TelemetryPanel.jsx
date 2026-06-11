import React, { useMemo, useState } from 'react';
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

  const [isNaming, setIsNaming] = useState(false);
  const [snapshotName, setSnapshotName] = useState('');

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
  const readabilityColor = readabilityScore < 50 ? '#ef4444' : readabilityScore <= 70 ? '#f59e0b' : '#10b981'; // red, amber, emerald
  
  const readabilityData = [{ name: 'Score', value: readabilityScore, fill: readabilityColor }];
  const readabilityBg = isDarkMode ? '#27272a' : '#e2e8f0';

  const sentiment = processedResult ? processedResult.sentiment : { positive: 0, negative: 0, overall: 50 };
  const totalSentiment = sentiment.positive + sentiment.negative;
  const posPct = totalSentiment > 0 ? (sentiment.positive / totalSentiment) * 100 : 0;
  const negPct = totalSentiment > 0 ? (sentiment.negative / totalSentiment) * 100 : 0;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-950/20 dark:bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div className={`fixed top-0 right-0 h-full w-[400px] max-w-[100vw] bg-white dark:bg-zinc-950 border-l border-slate-200 dark:border-zinc-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-zinc-900 flex items-center justify-between sticky top-0 bg-white dark:bg-zinc-950 z-10">
          <h2 className="text-lg font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
              <Activity className="text-emerald-600 dark:text-emerald-400" size={16} />
            </div>
            Telemetry Matrix
          </h2>
          <button 
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 rounded-lg transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800">
          
          {/* Readability Index */}
          <section className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-850 shadow-sm flex flex-col">
            <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={14} className="text-emerald-600 dark:text-emerald-400" /> Readability Index
            </h3>
            <div className="h-[140px] relative overflow-hidden flex items-end justify-center pb-3 bg-slate-50/50 dark:bg-zinc-950/50 rounded-xl border border-slate-100 dark:border-zinc-850/50">
              <ResponsiveContainer width="100%" height={260} className="absolute top-0">
                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" barSize={12} data={readabilityData} startAngle={180} endAngle={0}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} axisLine={false} />
                  <RadialBar minAngle={15} background={{ fill: readabilityBg }} clockWise={true} dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="flex flex-col items-center justify-center relative z-10">
                <span className="text-4xl font-bold text-slate-800 dark:text-zinc-100 leading-none">{readabilityScore}</span>
                <span className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 mt-1 uppercase tracking-wider">Flesch-Kincaid</span>
              </div>
            </div>
          </section>

          {/* Emotional Polarity */}
          <section className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-850 shadow-sm flex flex-col">
            <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Heart size={14} className="text-rose-500" /> Emotional Polarity
            </h3>
            <div className="w-full h-3 bg-slate-100 dark:bg-zinc-950 rounded-full overflow-hidden flex border border-slate-200/50 dark:border-zinc-800">
              {totalSentiment > 0 ? (
                <>
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${posPct}%` }} />
                  <div className="h-full bg-rose-500 transition-all duration-500" style={{ width: `${negPct}%` }} />
                </>
              ) : (
                <div className="h-full bg-slate-200 dark:bg-zinc-800 w-full" />
              )}
            </div>
            <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-wider">
              <span className="text-emerald-600 dark:text-emerald-400">{posPct.toFixed(0)}% Positive</span>
              {totalSentiment === 0 && <span className="text-slate-400 dark:text-zinc-550">Neutral Baseline</span>}
              <span className="text-rose-600 dark:text-rose-450">{negPct.toFixed(0)}% Negative</span>
            </div>
          </section>

          {/* Complexity Profiler */}
          <section className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-slate-200 dark:border-zinc-850 shadow-sm grid grid-cols-2 gap-4">
             <h3 className="col-span-2 text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2 mb-1">
              <FileDigit size={14} className="text-amber-500" /> Complexity Profiler
            </h3>
            <div className="bg-slate-50/50 dark:bg-zinc-950/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-850/50 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Avg Word</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200 leading-none">
                {complexity.avgWordLength} <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">chars</span>
              </span>
            </div>
            <div className="bg-slate-50/50 dark:bg-zinc-950/50 p-4 rounded-xl border border-slate-100 dark:border-zinc-850/50 flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Avg Sentence</span>
              <span className="text-2xl font-bold text-slate-800 dark:text-zinc-200 leading-none">
                {complexity.avgSentenceLength} <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">words</span>
              </span>
            </div>
          </section>

          {/* Snapshot DB */}
          <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-xl shadow-sm flex flex-col flex-1 min-h-[350px]">
            <div className="p-4 border-b border-slate-100 dark:border-zinc-850 flex items-center justify-between min-h-[57px]">
              {isNaming ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (snapshotName.trim()) {
                      saveToHistory(snapshotName.trim());
                      setSnapshotName('');
                      setIsNaming(false);
                    }
                  }}
                  className="flex items-center gap-2 w-full"
                >
                  <input
                    type="text"
                    value={snapshotName}
                    onChange={(e) => setSnapshotName(e.target.value)}
                    placeholder="Snapshot name..."
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-zinc-200 font-semibold"
                    autoFocus
                    maxLength={30}
                  />
                  <button
                    type="submit"
                    disabled={!snapshotName.trim()}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsNaming(false);
                      setSnapshotName('');
                    }}
                    className="px-2 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-850 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Clock size={14} className="text-emerald-600 dark:text-emerald-400" /> Snapshot DB
                  </h3>
                  <button
                    onClick={() => setIsNaming(true)}
                    disabled={!rawText.trim()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold transition-colors shadow-sm cursor-pointer"
                  >
                    <Save size={14} /> Commit
                  </button>
                </>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50/50 dark:bg-zinc-950/30 rounded-b-xl">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-zinc-500 py-10">
                  <Clock size={32} className="mb-2 opacity-30" />
                  <p className="text-xs font-bold tracking-wider uppercase opacity-75">Memory Bank Empty</p>
                  <p className="text-[10px] mt-1 font-medium opacity-60">Commit a snapshot to record state.</p>
                </div>
              ) : (
                history.slice().reverse().map(entry => (
                  <div key={entry.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col hover:border-slate-350 dark:hover:border-zinc-750 transition-colors group">
                    
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-slate-800 dark:text-zinc-200 text-sm break-words pr-2 leading-tight">
                        {entry.name}
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 bg-slate-50 dark:bg-zinc-950 px-2 py-1 rounded border border-slate-200/50 dark:border-zinc-850">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Density: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{entry.compressionPercentage}%</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        onClick={() => { loadFromHistory(entry.id); onClose(); }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-98 text-slate-700 dark:text-zinc-300 cursor-pointer"
                      >
                        <DownloadCloud size={14} className="text-emerald-600 dark:text-emerald-500" /> Restore
                      </button>
                      <button
                        onClick={() => deleteHistory(entry.id)}
                        className="p-2 text-rose-600 dark:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-850 rounded-lg shadow-sm transition-all cursor-pointer"
                      >
                        <Trash2 size={14} />
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

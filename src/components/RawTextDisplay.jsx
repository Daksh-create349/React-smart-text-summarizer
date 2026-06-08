import React, { useMemo, useEffect, useRef } from 'react';
import { useTextStore } from '../store/useTextStore';
import { stem } from '../utils/porterStemmer';

export default function RawTextDisplay() {
  const rawText = useTextStore((state) => state.rawText);
  const highlightedKeyword = useTextStore((state) => state.highlightedKeyword);
  const containerRef = useRef(null);

  const elements = useMemo(() => {
    if (!rawText) return null;
    if (!highlightedKeyword) return <>{rawText}</>;

    const regex = /([a-zA-Z0-9_]+)|([^a-zA-Z0-9_]+)/g;
    const parts = [];
    let match;
    let index = 0;
    let hasScrolled = false;

    while ((match = regex.exec(rawText)) !== null) {
      if (match[1]) {
        const originalWord = match[1];
        const stemmed = stem(originalWord.toLowerCase());
        
        if (stemmed === highlightedKeyword) {
          parts.push(
            <mark 
              key={index} 
              id={!hasScrolled ? "first-highlight" : undefined}
              className="bg-amber-400 text-amber-900 font-black rounded-md px-1.5 py-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.6)] transition-all border border-amber-500"
              style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}
            >
              {originalWord}
            </mark>
          );
          hasScrolled = true;
        } else {
          parts.push(originalWord);
        }
      } else if (match[2]) {
        parts.push(match[2]);
      }
      index++;
    }

    return parts;
  }, [rawText, highlightedKeyword]);

  useEffect(() => {
    if (highlightedKeyword && containerRef.current) {
      const firstMark = containerRef.current.querySelector('#first-highlight');
      if (firstMark) {
        firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [highlightedKeyword]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 w-full min-h-[300px] p-6 text-slate-800 bg-[#D4D1C9] border border-slate-400 rounded-2xl overflow-y-auto whitespace-pre-wrap font-sans text-lg leading-relaxed shadow-[inset_0_6px_12px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(0,0,0,0.1),0_2px_0_rgba(255,255,255,0.8)] mb-8 scrollbar-thin scrollbar-thumb-slate-400 font-medium"
      style={{textShadow: '0 1px 0 rgba(255,255,255,0.4)'}}
    >
      {elements}
    </div>
  );
}

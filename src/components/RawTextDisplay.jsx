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
              className="bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 font-semibold rounded px-1.5 py-0.5 border border-amber-200 dark:border-amber-900/30 transition-all"
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
      className="flex-1 w-full min-h-[300px] p-5 text-slate-800 dark:text-zinc-200 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-200 dark:border-zinc-850 rounded-xl overflow-y-auto whitespace-pre-wrap font-sans text-base leading-relaxed mb-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800"
    >
      {elements}
    </div>
  );
}

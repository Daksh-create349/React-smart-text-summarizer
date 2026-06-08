import { stopWords } from './stopWords.js';
import { stem } from './porterStemmer.js';
import { countSyllables } from './syllableCounter.js';
import { positiveWords, negativeWords } from './sentimentDicts.js';

export function tokenize(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/i)
    .filter(word => word.length > 0);
}

export function removeStopWords(tokens, stopWordsList = stopWords) {
  if (!Array.isArray(tokens)) return [];
  const stopSet = new Set(stopWordsList);
  return tokens.filter(token => !stopSet.has(token));
}

export function stemTokens(tokens) {
  if (!Array.isArray(tokens)) return [];
  return tokens.map(token => stem(token));
}

export function sentenceTokenizer(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

export function calculateTFIDF(sentences, stemmedTokensPerSentence) {
  if (!Array.isArray(sentences) || !Array.isArray(stemmedTokensPerSentence)) return {};
  
  const N = sentences.length;
  if (N === 0) return {};

  const dfMap = {};
  
  // Calculate Document Frequency (DF)
  stemmedTokensPerSentence.forEach(tokens => {
    const uniqueTokens = new Set(tokens);
    uniqueTokens.forEach(t => {
      dfMap[t] = (dfMap[t] || 0) + 1;
    });
  });

  const idfMap = {};
  Object.keys(dfMap).forEach(t => {
    idfMap[t] = Math.log(N / dfMap[t]);
  });

  const globalTfIdfMap = {};

  stemmedTokensPerSentence.forEach(tokens => {
    const termCountInSentence = {};
    const totalWordsInSentence = tokens.length;
    
    if (totalWordsInSentence === 0) return;

    tokens.forEach(t => {
      termCountInSentence[t] = (termCountInSentence[t] || 0) + 1;
    });

    Object.keys(termCountInSentence).forEach(t => {
      const tf = termCountInSentence[t] / totalWordsInSentence;
      const idf = idfMap[t] || 0;
      const tfidf = tf * idf;
      
      if (!globalTfIdfMap[t]) {
        globalTfIdfMap[t] = { sum: 0, count: 0 };
      }
      globalTfIdfMap[t].sum += tfidf;
      globalTfIdfMap[t].count += 1;
    });
  });

  const avgTfIdfMap = {};
  Object.keys(globalTfIdfMap).forEach(t => {
    // Average TF-IDF across all sentences as requested
    avgTfIdfMap[t] = globalTfIdfMap[t].sum / N;
  });

  return avgTfIdfMap;
}

export function scoreSentences(sentences, stemmedTokensPerSentence, tfidfMap) {
  if (!Array.isArray(sentences) || !Array.isArray(stemmedTokensPerSentence)) return [];
  
  return sentences.map((_, index) => {
    const tokens = stemmedTokensPerSentence[index] || [];
    const uniqueTokens = new Set(tokens);
    
    let score = 0;
    uniqueTokens.forEach(t => {
      score += (tfidfMap[t] || 0);
    });
    return score;
  });
}

export function generateSummary(sentences, scores, percentage) {
  if (!Array.isArray(sentences) || !Array.isArray(scores)) return "";
  if (sentences.length === 0) return "";
  
  const numSentences = Math.max(1, Math.ceil((percentage / 100) * sentences.length));
  
  const scoredSentences = sentences.map((sentence, index) => ({
    sentence,
    score: scores[index] || 0,
    originalIndex: index
  }));

  // Sort by score descending
  scoredSentences.sort((a, b) => b.score - a.score);
  
  // Take top percentage
  const topSentences = scoredSentences.slice(0, numSentences);
  
  // Re-sort selected sentences by original index
  topSentences.sort((a, b) => a.originalIndex - b.originalIndex);
  
  return topSentences.map(item => item.sentence).join(" ");
}

export function calculateReadability(text) {
  if (!text || typeof text !== 'string') return 0;
  
  const sentences = sentenceTokenizer(text);
  const words = tokenize(text);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  const totalSentences = sentences.length;
  const totalWords = words.length;
  const totalSyllables = words.reduce((acc, word) => acc + countSyllables(word), 0);
  
  // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  let score = 206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords);
  score = Math.max(0, Math.min(100, score));
  
  return parseFloat(score.toFixed(2));
}

export function calculateSentiment(tokens, posWords = positiveWords, negWords = negativeWords) {
  if (!Array.isArray(tokens)) return { positive: 0, negative: 0, overall: 50 };
  
  const posSet = new Set(posWords);
  const negSet = new Set(negWords);
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  tokens.forEach(t => {
    if (posSet.has(t)) positiveCount++;
    if (negSet.has(t)) negativeCount++;
  });
  
  const total = positiveCount + negativeCount;
  let overall = 50;
  
  if (total > 0) {
    overall = (positiveCount / total) * 100;
  }
  
  return {
    positive: positiveCount,
    negative: negativeCount,
    overall: parseFloat(overall.toFixed(2))
  };
}

export function processFullText(rawText, customStopWords = stopWords, customPosWords = positiveWords, customNegWords = negativeWords) {
  if (!rawText || typeof rawText !== 'string') {
    return {
      originalSentences: [],
      stemmedTokensPerSentence: [],
      tfidfMap: {},
      stemToOriginalMap: {},
      sentenceScores: [],
      readabilityScore: 0,
      sentiment: { positive: 0, negative: 0, overall: 50 }
    };
  }

  const allTokens = tokenize(rawText);
  const readabilityScore = calculateReadability(rawText);
  const sentiment = calculateSentiment(allTokens, customPosWords, customNegWords);

  const sentences = sentenceTokenizer(rawText);
  
  const stemFreqMap = {};
  
  const stemmedTokensPerSentence = sentences.map(sentence => {
    const tokens = tokenize(sentence);
    const noStop = removeStopWords(tokens, customStopWords);
    return noStop.map(token => {
      const stemmed = stem(token);
      if (!stemFreqMap[stemmed]) stemFreqMap[stemmed] = {};
      stemFreqMap[stemmed][token] = (stemFreqMap[stemmed][token] || 0) + 1;
      return stemmed;
    });
  });

  const stemToOriginalMap = {};
  for (const stemmed in stemFreqMap) {
    let bestWord = stemmed;
    let maxCount = 0;
    for (const word in stemFreqMap[stemmed]) {
      if (stemFreqMap[stemmed][word] > maxCount) {
        maxCount = stemFreqMap[stemmed][word];
        bestWord = word;
      }
    }
    stemToOriginalMap[stemmed] = bestWord;
  }

  const tfidfMap = calculateTFIDF(sentences, stemmedTokensPerSentence);
  const sentenceScores = scoreSentences(sentences, stemmedTokensPerSentence, tfidfMap);

  return {
    originalSentences: sentences,
    stemmedTokensPerSentence,
    tfidfMap,
    stemToOriginalMap,
    sentenceScores,
    readabilityScore,
    sentiment
  };
}

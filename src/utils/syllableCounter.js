export function countSyllables(word) {
  if (!word || word.length === 0) return 0;
  let w = word.toLowerCase();
  
  // Rule out silent 'e'
  if (w.length <= 3) {
    return 1;
  }
  
  // Remove silent e at the end (but not le)
  w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  w = w.replace(/^y/, '');
  
  const syllables = w.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

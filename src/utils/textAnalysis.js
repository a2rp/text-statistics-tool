const wordPattern = /[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu;
const commonWords = new Set(["the", "and", "for", "with", "from", "that", "this", "you", "your", "are", "was", "were", "but", "not", "have", "has", "had", "will", "would", "could", "should", "then", "than", "can", "all", "any", "its", "our", "out", "into", "about", "also", "one", "two", "his", "her", "they", "them", "their", "there", "here", "what", "when", "where", "which", "who", "how", "why", "she", "him", "he", "we", "us", "it", "as", "at", "to", "of", "in", "on", "by", "is", "be", "or", "an", "a", "i"]);

export const extractWords = (text) => String(text ?? "").match(wordPattern) ?? [];

export const getFrequentWords = (text, limit = 6) => {
  if (!Number.isInteger(limit) || limit < 0) throw new Error("Word limit must be a non-negative whole number.");
  const counts = new Map();
  extractWords(text).forEach((word) => {
    const normalized = word.toLowerCase();
    if (Array.from(normalized).length < 3 || commonWords.has(normalized)) return;
    counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
  });
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((left, right) => right.count - left.count || left.word.localeCompare(right.word))
    .slice(0, limit);
};

export const analyzeText = (text, { readingWpm = 225, speakingWpm = 130 } = {}) => {
  const value = String(text ?? "");
  if (![readingWpm, speakingWpm].every((speed) => Number.isFinite(speed) && speed > 0)) {
    throw new Error("Reading and speaking speeds must be positive numbers.");
  }
  const words = extractWords(value);
  const visibleText = value.trim();
  const sentenceParts = visibleText.match(/[^.!?]+(?:[.!?]+|$)/gu) ?? [];
  const paragraphs = visibleText ? visibleText.split(/\r?\n(?:[ \t]*\r?\n)+/u).filter((part) => part.trim()) : [];
  const characters = Array.from(value).length;
  const charactersNoWhitespace = Array.from(value).filter((character) => !/\s/u.test(character)).length;
  const averageWordLength = words.length
    ? Math.round(words.reduce((total, word) => total + Array.from(word).length, 0) / words.length * 10) / 10
    : 0;

  return {
    words: words.length,
    characters,
    charactersNoWhitespace,
    sentences: sentenceParts.filter((part) => extractWords(part).length > 0).length,
    paragraphs: paragraphs.length,
    lines: value ? value.split(/\r\n|\n|\r/u).length : 0,
    readingMinutes: words.length ? Math.ceil(words.length / readingWpm) : 0,
    speakingMinutes: words.length ? Math.ceil(words.length / speakingWpm) : 0,
    averageWordLength,
  };
};

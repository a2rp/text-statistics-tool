import assert from "node:assert/strict";
import test from "node:test";
import { analyzeText, extractWords, getFrequentWords } from "./textAnalysis.js";

test("counts Unicode words, characters, lines, sentences, and paragraphs", () => {
  const text = "Café notes, don't rush.\n\n第二 paragraph!";
  assert.deepEqual(analyzeText(text), { words: 6, characters: 38, charactersNoWhitespace: 32, sentences: 2, paragraphs: 2, lines: 3, readingMinutes: 1, speakingMinutes: 1, averageWordLength: 4.8 });
  assert.deepEqual(extractWords("naïve co-operate O’Reilly"), ["naïve", "co", "operate", "O’Reilly"]);
});

test("returns stable empty counts and supports custom pace estimates", () => {
  assert.deepEqual(analyzeText("  \n "), { words: 0, characters: 4, charactersNoWhitespace: 0, sentences: 0, paragraphs: 0, lines: 2, readingMinutes: 0, speakingMinutes: 0, averageWordLength: 0 });
  assert.equal(analyzeText("word ".repeat(450), { readingWpm: 150, speakingWpm: 90 }).readingMinutes, 3);
  assert.throws(() => analyzeText("hello", { readingWpm: 0 }), /positive numbers/);
});

test("ranks useful words and handles ties consistently", () => {
  const sample = "Garden stories bloom. Garden notes, garden paths, stories grow.";
  assert.deepEqual(getFrequentWords(sample, 3), [{ word: "garden", count: 3 }, { word: "stories", count: 2 }, { word: "bloom", count: 1 }]);
  assert.deepEqual(getFrequentWords("the and for but", 6), []);
  assert.throws(() => getFrequentWords("word", -1), /non-negative/);
});

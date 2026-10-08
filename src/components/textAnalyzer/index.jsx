import { FiAlignLeft, FiClock, FiCopy, FiEdit3, FiTrash2 } from "react-icons/fi";
import { analyzeText, getFrequentWords } from "../../utils/textAnalysis.js";
import styles from "./styles.module.css";

const sampleText = "A clear first draft starts with a little room to think. Short sentences help a reader follow the idea.\n\nRead it once for meaning, then once more for rhythm. Good writing gives every word a reason to be there.";
const numberFormat = new Intl.NumberFormat("en-US");

const TextAnalyzer = ({ text, onChange }) => {
  const stats = analyzeText(text);
  const frequentWords = getFrequentWords(text);
  const leadingCount = frequentWords[0]?.count ?? 1;

  const updateText = (event) => onChange(event.target.value);

  return (
    <section className={styles.analyzer} id="studio" aria-labelledby="analyzer-title">
      <div className={styles.analyzerHeader}><div><p>THE WORD DESK / LIVE ANALYSIS</p><h2 id="analyzer-title">See your text at a glance.</h2><span>Type, paste, or load the sample. The counts refresh as you write.</span></div><span className={styles.localMark}><FiAlignLeft aria-hidden="true" /> ALL COUNTS LOCAL</span></div>
      <div className={styles.layout}>
        <div className={styles.editorPanel}>
          <div className={styles.editorHeading}><label htmlFor="text-editor">Your text</label><div><button type="button" onClick={() => onChange(sampleText)}><FiCopy aria-hidden="true" /> Load sample</button><button type="button" onClick={() => onChange("")} disabled={!text}><FiTrash2 aria-hidden="true" /> Clear</button></div></div>
          <textarea id="text-editor" value={text} onChange={updateText} placeholder="Start writing or paste your text here..." spellCheck="true" />
          <div className={styles.editorFoot}><span><FiEdit3 aria-hidden="true" /> Live analysis, no submit button</span><span>{numberFormat.format(stats.characters)} characters</span></div>
        </div>
        <div className={styles.statsPanel} aria-live="polite">
          <div className={styles.statGrid}>
            <article className={styles.primaryStat}><span>WORDS</span><strong>{numberFormat.format(stats.words)}</strong><i>Word count</i></article>
            <article><span>CHARACTERS</span><strong>{numberFormat.format(stats.characters)}</strong><i>Including spaces</i></article>
            <article><span>SENTENCES</span><strong>{numberFormat.format(stats.sentences)}</strong><i>{numberFormat.format(stats.paragraphs)} paragraphs</i></article>
            <article><span>NO WHITESPACE</span><strong>{numberFormat.format(stats.charactersNoWhitespace)}</strong><i>Characters only</i></article>
          </div>
          <div className={styles.timeStats}><div><FiClock aria-hidden="true" /><span>READING</span><strong>{stats.readingMinutes ? `${stats.readingMinutes} min` : "—"}</strong><small>at 225 words / min</small></div><div><FiClock aria-hidden="true" /><span>SPEAKING</span><strong>{stats.speakingMinutes ? `${stats.speakingMinutes} min` : "—"}</strong><small>at 130 words / min</small></div></div>
        </div>
      </div>
      <div className={styles.insights}>
        <div className={styles.insightsHeader}><div><p>WORD FREQUENCY</p><h3>Words that show up often.</h3></div><span>Common connector words are left out.</span></div>
        {frequentWords.length ? <ol>{frequentWords.map(({ word, count }) => <li key={word}><span className={styles.wordName}>{word}</span><span className={styles.wordTrack} role="progressbar" aria-label={`${word} frequency`} aria-valuemin="0" aria-valuemax={leadingCount} aria-valuenow={count}><i style={{ "--bar-width": `${(count / leadingCount) * 100}%` }} /></span><b>{count}</b></li>)}</ol> : <p className={styles.emptyWords}>Add a little more text to see frequent words here.</p>}
      </div>
      <div className={styles.analyzerFoot}><span><FiClock aria-hidden="true" /> Reading and speaking times are estimates.</span><span>AVERAGE WORD LENGTH: {stats.averageWordLength} CHARACTERS</span></div>
    </section>
  );
};

export default TextAnalyzer;

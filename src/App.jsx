import { useState } from "react";
import { FiArrowDown, FiArrowUpRight, FiBarChart2, FiFeather } from "react-icons/fi";
import BackToTop from "./components/backToTop/index.jsx";
import TextAnalyzer from "./components/textAnalyzer/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import styles from "./App.module.css";

const App = () => {
  const [text, setText] = useState("");

  return (
    <div className={styles.page} id="top">
      <SiteHeader />
      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}><span /> A little perspective for the page</p>
            <h1 id="hero-title">Make the words<br /><em>add up.</em></h1>
            <p className={styles.intro}>A quiet place to see how much you have written. Count the words, check the pace, and find the phrases that keep returning.</p>
            <div className={styles.heroActions}><a className={styles.primaryLink} href="#studio">Analyze some text <FiArrowDown aria-hidden="true" /></a><span><FiFeather aria-hidden="true" /> Writing stays in your tab</span></div>
            <div className={styles.heroLine}><span>COUNT</span><i /><span>NOTICE</span><i /><span>REFINE</span></div>
          </div>
          <div className={styles.heroCard} aria-label="Illustration of a sample text measurement with word and reading-time statistics" role="img">
            <div className={styles.cardHeader}><span>SAMPLE SNAPSHOT / 01</span><FiBarChart2 aria-hidden="true" /></div>
            <div className={styles.cardMain}><div><span>WORDS ON THE PAGE</span><strong>618</strong><i>enough for a good thought</i></div><div className={styles.miniBars}><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
            <div className={styles.cardStats}><div><span>READING TIME</span><b>3 min</b></div><div><span>SENTENCES</span><b>28</b></div><div><span>TOP WORD</span><b>“story”</b></div></div>
            <div className={styles.cardFooter}><span>MEASURE THE SHAPE, NOT THE MEANING</span><FiArrowUpRight aria-hidden="true" /></div>
          </div>
          <a className={styles.scrollCue} href="#studio"><span>OPEN YOUR WORD DESK</span><FiArrowDown aria-hidden="true" /></a>
        </section>
        <TextAnalyzer text={text} onChange={setText} />
        <section className={styles.guide} id="guide" aria-labelledby="guide-title">
          <div className={styles.guideIntro}><p className={styles.kicker}>READING THE COUNTS</p><h2 id="guide-title">A useful map of the page.</h2><p>Counts describe different things. Use them together as a quick overview, then let your own voice decide what stays.</p></div>
          <div className={styles.guideCards}>
            <article><span>01 / WORDS</span><h3>A practical word count</h3><p>Letter and number groups count as words. Apostrophes inside a word stay together; hyphens split words.</p></article>
            <article><span>02 / TIME</span><h3>A rough reading pace</h3><p>Estimates use 225 words per minute for reading and 130 for speaking. Real pace depends on the person and material.</p></article>
            <article><span>03 / FREQUENCY</span><h3>Notice repeated language</h3><p>The list ranks recurring words and skips common connectors. It is a prompt for editing, not a score for good writing.</p></article>
          </div>
          <p className={styles.privacyNote}>The text is analyzed in your browser and is not uploaded or saved.</p>
          <div className={styles.guideFoot}><span>EVERY SENTENCE HAS ITS OWN RHYTHM</span><a href="#studio">Back to the text <FiArrowUpRight aria-hidden="true" /></a></div>
        </section>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default App;

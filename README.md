# NexusText — Smart Text Summarizer & Keyword Weight Calculator

**Case Study No. 116** | B.Tech CSE 2025-29, Semester II | ITM Skills University  
**Developed by:** Daksh Srivastava

---

## Problem Statement

> Build a **frontend-only ReactJS web application** that performs real-time Natural Language Processing (NLP) entirely inside the user's browser. The system must implement deterministic string tokenization, TF-IDF keyword weighting, extractive sentence ranking, Flesch-Kincaid readability scoring, and lexical sentiment analysis — all without any backend server or external API. User data must never leave the client machine, ensuring absolute privacy.

---

## Project Overview

**NexusText** is a high-performance, privacy-first analytical dashboard that transforms unstructured walls of text into deeply indexed, mathematical data models. It operates as a purely **in-memory compiler** — ingesting raw text, running it through a multi-stage tokenization and filtering pipeline, and producing rich statistical outputs including extractive summaries, weighted keyword matrices, readability gauges, and sentiment polarity analysis.

The entire processing engine is built with deterministic algorithms and runs at near-instantaneous speeds using modern client-side JavaScript. No text is ever transmitted to a server; everything from tokenization to TF-IDF scoring happens locally in the browser tab.

---

## Features

### Core NLP Engine
- **Tokenization Pipeline** — Splits documents into lowercase word arrays using Regular Expressions (`RegExp`), then filters them through a hardcoded static Stop-Words array (150+ common English words like *the*, *is*, *at*, *which*) embedded directly in source code.
- **Porter Stemming Algorithm** — A full 5-step implementation of the classic Porter Stemmer that reduces inflected words to their root stems (e.g., *running* → *run*, *generalization* → *general*, *cats* → *cat*), enabling accurate term grouping across morphological variants.
- **TF-IDF Keyword Weight Calculator** — Implements the standard Term Frequency–Inverse Document Frequency mathematical model:

  ```
  TF(t) = (Number of times term t appears in a sentence) / (Total number of words in the sentence)
  IDF(t) = log(Total number of sentences / Number of sentences containing term t)
  TF-IDF(t) = TF(t) × IDF(t)
  ```

  Words with high frequency that are meaningfully clustered across sentences receive the heaviest analytical weight.

- **Extractive Sentence Ranking (TextRank)** — Scores every sentence by summing the TF-IDF weights of its unique keywords, sorts them by score in descending order, and extracts the top *X%* (user-controlled via an interactive slider) to assemble a coherent, naturally ordered summary.
- **Flesch-Kincaid Readability Score** — Calculates reading ease using the standard formula:

  ```
  Score = 206.835 − 1.015 × (total words / total sentences) − 84.6 × (total syllables / total words)
  ```

  Powered by a custom syllable counter that handles silent-e rules and vowel cluster detection.

- **Lexical Sentiment Analysis** — Compares filtered tokens against a static local dictionary of 200+ positive and 150+ negative emotional words to compute an overall sentiment polarity percentage.

### Dashboard & UI

- **Skeuomorphic Design Language** — A premium, tactile interface inspired by physical analytical hardware, featuring recessed LCD-style screens, mechanical push-buttons with 3D depth shadows, and matte textured backgrounds.

- **Landing Page** — A stunning entry screen with a hero headline, feature cards explaining TF-IDF, Privacy, and Telemetry capabilities, and a large physical "Engage System" call-to-action button.

  > <img width="2940" height="1612" alt="image" src="https://github.com/user-attachments/assets/0a265fb6-539d-4ab8-9374-2ba4e46d3ba2" />


- **Split Workspace Layout** — A responsive two-column grid: the left column houses the Data Ingestion editor, while the right column contains the Analytical Insights dashboard.

  > <img width="2940" height="1514" alt="image" src="https://github.com/user-attachments/assets/3b3f7a30-10ad-4d1c-93c4-1e690533a7d4" />


- **Real-Time Live Ticker** — Instantly tracks character count, word count, paragraph count, and estimated reading time (at 200 WPM) as the user types.

  > <img width="1288" height="244" alt="image" src="https://github.com/user-attachments/assets/6ed202c7-c645-41a9-8cd6-f82977296f6b" />


- **Interactive Compression Slider** — Allows seamless, real-time control of summary density from 5% to 100% without re-processing the entire text (only re-ranks cached sentence scores).

  > <img width="1430" height="1148" alt="image" src="https://github.com/user-attachments/assets/94ffbf13-1616-4670-b27b-52c03c03682c" />


- **Keyword Output Quantity Slider** — A dedicated toggle slider (5–40 keywords, step 5) that controls the maximum number of keywords displayed in the tag-cloud matrix.

  > <img width="1280" height="884" alt="image" src="https://github.com/user-attachments/assets/5ed5d149-dc4c-40dd-b744-08426a9876c3" />


- **Cross-Component Keyword Highlighting** — Clicking any keyword badge in the matrix instantly swaps the textarea for a rich DOM-based display (`RawTextDisplay`) that wraps every matching occurrence in amber `<mark>` tags and auto-scrolls to the first hit.

  > <img width="1054" height="1270" alt="image" src="https://github.com/user-attachments/assets/ced5f4a1-3cab-49a2-b109-c92a2d761cff" />


- **Telemetry Drawer** — A slide-in side panel featuring:
  - Recharts-powered radial gauge for Readability Index (color-coded: red < 50, amber 50–70, green > 70)
  - Stacked polarity bar for Emotional Sentiment distribution
  - Complexity Profiler showing average word length and average sentence length
  - Snapshot DB for saving, loading, and deleting analysis history

  > <img width="828" height="1520" alt="image" src="https://github.com/user-attachments/assets/df5aa7e8-9acf-4949-986d-4fe66d03f0c7" />
  
  > <img width="778" height="760" alt="image" src="https://github.com/user-attachments/assets/e1d4d67d-1e8f-4c01-96f6-eb66692be4f4" />


### Data Persistence
- **LocalStorage History Sync** — Users can save named analysis snapshots (including raw text, summary, and compression settings) directly to the browser's `localStorage` via Zustand's `persist` middleware. Snapshots survive page reloads and can be restored or deleted at any time.
  > <img width="1764" height="930" alt="image" src="https://github.com/user-attachments/assets/fcc3fa66-2dee-4811-a06b-4f009dfbed3a" />


---

## Architecture & Technical Design

### Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 18 (via Vite) | Component-based UI rendering |
| State Management | Zustand + `persist` middleware | Centralized reactive store with localStorage sync |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) | Utility-first CSS with skeuomorphic custom shadows |
| Charting | Recharts | Radial bar gauge for readability visualization |
| Icons | Lucide React | Consistent, lightweight SVG icon library |
| Build Tool | Vite | Lightning-fast HMR and optimized production builds |

### Project Structure

```
smart-text-summarizer/
├── index.html                          # Entry HTML with Google Fonts (Inter)
├── vite.config.js                      # Vite + Tailwind CSS plugin config
├── package.json                        # Dependencies and scripts
├── README.md                           # This file
└── src/
    ├── main.jsx                        # React DOM mount point
    ├── index.css                       # Tailwind directives + global styles
    ├── App.jsx                         # Landing page + dashboard layout + routing
    ├── store/
    │   └── useTextStore.js             # Zustand store (state matrix, actions, history, samples)
    ├── utils/
    │   ├── textProcessing.js           # Core NLP engine (tokenize, TF-IDF, summarize, readability, sentiment)
    │   ├── porterStemmer.js            # Full Porter Stemmer algorithm (5 steps)
    │   ├── stopWords.js                # Static hardcoded stop-words array (150+ words)
    │   ├── syllableCounter.js          # Syllable counting utility for Flesch-Kincaid
    │   └── sentimentDicts.js           # Static positive/negative word dictionaries (350+ words)
    └── components/
        ├── RawInputEditor.jsx          # Textarea + sample loader + clear button + live ticker
        ├── RawTextDisplay.jsx          # DOM-based keyword highlighting with auto-scroll
        ├── AnalyticsDashboard.jsx      # Container for Summary + Keyword panels
        ├── SummaryOutputCard.jsx       # Extractive summary display + compression slider
        ├── KeywordCloudGrid.jsx        # TF-IDF tag-cloud matrix + keyword limit slider
        └── TelemetryPanel.jsx          # Readability gauge + sentiment bar + complexity + history
```

### Data Flow Pipeline

```
User Input (rawText)
    │
    ▼
┌─────────────────────────────────────────────┐
│  setRawText() → processText()               │
│                                             │
│  1. tokenize()         → lowercase word[]   │
│  2. sentenceTokenizer() → sentence[]        │
│  3. removeStopWords()  → filtered tokens    │
│  4. stem()             → stemmed roots      │
│  5. calculateTFIDF()   → weight hash map    │
│  6. scoreSentences()   → score per sentence │
│  7. calculateReadability() → Flesch-Kincaid │
│  8. calculateSentiment()   → polarity %     │
│  9. stemToOriginalMap  → display mapping    │
└─────────────────────────────────────────────┘
    │
    ▼
┌──────────────────────────────┐
│  generateSummary()           │
│  (called on compression      │
│   slider change — O(n log n))│
└──────────────────────────────┘
    │
    ▼
UI renders: Summary, Keywords, Gauges, Ticker
```

### Performance Design Decisions

1. **Decoupled Summary Generation** — Changing the compression slider does NOT re-run the full tokenization pipeline. It only calls `generateSummary()` on the cached `sentenceScores[]`, making slider adjustments sub-millisecond.
2. **Selective Re-rendering** — Each component subscribes to only the specific Zustand slices it needs (e.g., `KeywordCloudGrid` only watches `processedResult.tfidfMap` and `maxKeywords`), minimizing unnecessary React re-renders.
3. **Memoized Metrics** — The live ticker calculations (chars, words, paragraphs, reading time) are wrapped in `useMemo` and only recompute when `rawText` actually changes.
4. **Stem-to-Original Mapping** — During tokenization, the engine tracks the most frequently occurring original word for each stemmed root, so the UI displays human-readable words (e.g., "telescope") instead of raw stems (e.g., "telescop").

---

## Installation & Setup

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### Steps

```bash
# 1. Clone or navigate to the project directory
cd smart-text-summarizer

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Build optimized static assets
npm run build

# Preview the production build locally
npm run preview
```

The production bundle is output to the `dist/` directory and can be deployed to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

## How to Use

1. **Launch** — Open the application and click the green **"Engage System"** button on the landing page.
2. **Ingest Text** — Either paste your own long-form text into the editor, or click **"Load Sample Data"** to select one of three pre-loaded articles (AI/Technology, Health/Mediterranean Diet, Global Finance).
3. **Read the Summary** — The right panel instantly generates an extractive summary. Use the **Density slider** (5%–100%) to control how many sentences are included.
4. **Explore Keywords** — The Keyword Matrix below the summary shows the top TF-IDF–weighted terms as interactive badges. Use the **Limit slider** (5–40) to control how many appear.
5. **Highlight Occurrences** — Click any keyword badge to highlight every occurrence of that word (and its morphological variants) directly in the raw text with amber markers.
6. **Open Telemetry** — Click the **"Telemetry Panel"** button in the header to open the side drawer containing:
   - **Readability Index** — Flesch-Kincaid gauge (0–100)
   - **Emotional Polarity** — Positive vs. Negative sentiment bar
   - **Complexity Profiler** — Average word length and sentence length
7. **Save Snapshots** — Inside the Telemetry Panel, click **"Commit"** to save the current analysis to localStorage. You can **Restore** or **Delete** any saved snapshot at any time.

---

## Sample Articles Included

The application ships with three pre-loaded long-form articles for immediate testing:

| # | Topic | Word Count | Description |
|---|---|---|---|
| 1 | Artificial Intelligence | ~300 | Covers AI evolution, deep learning, ethical concerns, and XAI |
| 2 | Mediterranean Diet | ~300 | Explores cardiovascular benefits, cognitive health, and lifestyle |
| 3 | Global Finance | ~300 | Discusses coordinated central bank monetary policy and market impact |

---

## Mathematical Models Implemented

### Term Frequency (TF)
```
TF(t, s) = count(t in sentence s) / |words in sentence s|
```

### Inverse Document Frequency (IDF)
```
IDF(t) = log(N / df(t))
where N = total sentences, df(t) = sentences containing term t
```

### TF-IDF Weight
```
W(t) = Σ [TF(t, s) × IDF(t)] / N    (averaged across all sentences)
```

### Sentence Score
```
Score(s) = Σ W(t)    for each unique stemmed term t in sentence s
```

### Flesch-Kincaid Reading Ease
```
FK = 206.835 − 1.015 × (words/sentences) − 84.6 × (syllables/words)
Clamped to range [0, 100]
```

### Sentiment Polarity
```
Positive% = positiveHits / (positiveHits + negativeHits) × 100
Negative% = 100 − Positive%
```

---

## Privacy & Security

- **Zero Network Requests** — The application makes absolutely no HTTP calls, API requests, or WebSocket connections. All processing happens in the browser's JavaScript engine.
- **No Tracking** — No analytics, telemetry, cookies, or fingerprinting of any kind.
- **LocalStorage Only** — The only persistent data is the user's voluntarily saved history snapshots, stored in the browser's `localStorage` and fully deletable.

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.x | UI framework |
| `react-dom` | ^18.x | DOM rendering |
| `zustand` | ^5.x | Lightweight state management |
| `recharts` | ^2.x | Data visualization (radial gauge) |
| `lucide-react` | ^0.4x | SVG icon components |
| `@tailwindcss/vite` | ^4.x | Tailwind CSS build plugin |
| `tailwindcss` | ^4.x | Utility-first CSS framework |

---

## Author

**Daksh Srivastava**  
B.Tech Computer Science & Engineering, 2025-29  
ITM Skills University

---

## License

This project was developed as an academic case study submission. All rights reserved.

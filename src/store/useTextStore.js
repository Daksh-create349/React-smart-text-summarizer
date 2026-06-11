import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { processFullText, generateSummary } from '../utils/textProcessing.js';

const sample1 = `Artificial intelligence (AI) has rapidly transitioned from a theoretical concept into an omnipresent force reshaping industries across the globe. At its core, AI refers to the simulation of human intelligence processes by computer systems, encompassing learning, reasoning, and self-correction. Over the past decade, advancements in machine learning, particularly deep learning neural networks, have propelled AI capabilities to unprecedented levels. These sophisticated algorithms now power everything from autonomous vehicles and facial recognition software to personalized content recommendations and predictive analytics.

The integration of AI into everyday applications has brought about significant efficiency gains and novel problem-solving approaches. For instance, in healthcare, AI models assist in diagnosing diseases from medical imagery with accuracy rates rivaling, and sometimes surpassing, human experts. Natural language processing algorithms allow virtual assistants to understand and respond to complex queries, fundamentally altering human-computer interaction. However, this rapid technological acceleration is not without its challenges. The proliferation of AI has sparked intense debates surrounding data privacy, algorithmic bias, and the future of work. As automation threatens to displace certain job sectors, there is a growing consensus on the need for comprehensive reskilling programs.

Furthermore, the "black box" nature of complex AI models raises concerns about transparency and accountability in automated decision-making. Researchers and policymakers are increasingly focused on developing ethical frameworks and regulatory guidelines to ensure AI technologies are deployed responsibly. Explainable AI (XAI) has emerged as a crucial field of study, aiming to make machine learning models more interpretable and trustworthy to human users. Despite these hurdles, the trajectory of artificial intelligence points towards an increasingly interconnected and automated future. As computational power continues to grow and algorithms become more refined, AI is poised to remain the defining technological advancement of our era.`;

const sample2 = `The Mediterranean diet, characterized by its emphasis on whole, nutrient-dense foods, has long been heralded as one of the healthiest dietary patterns in the world. Unlike restrictive fad diets, the Mediterranean approach focuses on the consumption of abundant plant-based foods, healthy fats, and moderate amounts of lean proteins. The cornerstone of this diet includes daily servings of vegetables, fruits, whole grains, beans, nuts, and seeds. Olive oil serves as the primary source of dietary fat, providing heart-healthy monounsaturated fats and powerful antioxidants.

Extensive scientific research has consistently linked the Mediterranean diet to a multitude of health benefits, foremost among them being cardiovascular wellness. Studies have demonstrated that adherence to this eating pattern significantly reduces the risk of heart disease, stroke, and hypertension. The high fiber content from whole grains and legumes aids in maintaining healthy cholesterol levels and promotes stable blood sugar, making it an effective strategy for managing and preventing type 2 diabetes. Furthermore, the abundance of anti-inflammatory compounds found in olive oil and colorful vegetables helps protect the body against chronic systemic inflammation.

Beyond physical health, emerging evidence suggests that the Mediterranean diet may also support cognitive function and mental well-being. The healthy fats, particularly omega-3 fatty acids derived from regular fish consumption, are essential for brain health and have been associated with a lower risk of cognitive decline and neurodegenerative diseases such as Alzheimer's. Additionally, the Mediterranean lifestyle emphasizes the cultural and social aspects of eating, encouraging mindful consumption and sharing meals with family and friends. This holistic approach to nutrition and lifestyle fosters a sustainable and enjoyable relationship with food, contributing to the diet's enduring popularity and proven long-term efficacy.`;

const sample3 = `In an unprecedented move that has sent shockwaves through global financial markets, the central banking authorities of several major economies have announced a coordinated effort to stabilize currency fluctuations and address rising inflationary pressures. The joint declaration, issued simultaneously from Washington, Frankfurt, and Tokyo, outlines a comprehensive framework designed to mitigate economic volatility and restore investor confidence. This historical collaboration marks a significant departure from the localized monetary policies that have characterized the past decade, highlighting the deep interconnectedness of the modern global economy.

The core component of this multinational initiative involves synchronized adjustments to interest rates and the implementation of targeted quantitative tightening measures. By aligning their policy trajectories, central banks aim to prevent aggressive capital flights and minimize detrimental cross-border economic impacts. Financial analysts and market strategists have closely monitored these developments, with many praising the proactive stance taken by policymakers. Early market reactions have been cautiously optimistic, leading to a stabilization of volatile equity indices and a slight cooling of overinflated commodity prices.

However, the coordinated action has not been entirely immune to criticism. Skeptics argue that a one-size-fits-all approach may overlook unique structural challenges faced by individual nations within the coalition. Some economists warn that aggressive, simultaneous tightening could inadvertently trigger a synchronized global economic slowdown or even a mild recession. Moreover, emerging markets that are heavily reliant on foreign capital inflows remain particularly vulnerable to the ripple effects of these policy shifts. As the initiative moves from announcement to implementation, global financial institutions and multinational corporations are aggressively recalibrating their risk management strategies. The ultimate success of this unprecedented monetary experiment will depend on the agility of central banks to adapt to real-time economic data while maintaining a unified front.`;

export const useTextStore = create(
  persist(
    (set, get) => ({
      rawText: '',
      processedResult: null, // output of processFullText()
      summaryText: '',
      compressionPercentage: 30, // integer 1-100
      maxKeywords: 20, // for keyword cloud
      highlightedKeyword: null, // stemmed word or null
      history: [], // array of { id, name, rawText, date, summary, compressionPercentage }
      sampleArticles: [sample1, sample2, sample3],
      isDarkMode: false,

      toggleDarkMode: () => {
        set({ isDarkMode: !get().isDarkMode });
      },

      setRawText: (text) => {
        set({ rawText: text });
        get().processText();
      },

      setCompressionPercentage: (value) => {
        set({ compressionPercentage: value });
        const { processedResult } = get();
        if (processedResult && processedResult.originalSentences && processedResult.originalSentences.length > 0) {
          const summary = generateSummary(
            processedResult.originalSentences,
            processedResult.sentenceScores,
            value
          );
          set({ summaryText: summary });
        }
      },

      setMaxKeywords: (value) => {
        set({ maxKeywords: value });
      },

      setHighlightedKeyword: (keyword) => {
        set({ highlightedKeyword: keyword });
      },

      clearHighlight: () => {
        set({ highlightedKeyword: null });
      },

      saveToHistory: (name) => {
        const { rawText, summaryText, compressionPercentage, history } = get();
        if (!rawText.trim()) return;

        const newEntry = {
          id: Date.now().toString(),
          name: name || `Saved Summary (${new Date().toLocaleDateString()})`,
          rawText,
          date: new Date().toISOString(),
          summary: summaryText,
          compressionPercentage
        };

        set({ history: [...history, newEntry] });
      },

      loadFromHistory: (id) => {
        const { history } = get();
        const entry = history.find(e => e.id === id);
        if (entry) {
          set({
            rawText: entry.rawText,
            compressionPercentage: entry.compressionPercentage,
            highlightedKeyword: null
          });
          get().processText();
        }
      },

      deleteHistory: (id) => {
        const { history } = get();
        set({ history: history.filter(e => e.id !== id) });
      },

      processText: () => {
        const { rawText, compressionPercentage } = get();
        
        if (!rawText || !rawText.trim()) {
          set({
            processedResult: null,
            summaryText: ''
          });
          return;
        }

        // Process the full text and perform analysis
        const processedResult = processFullText(rawText);
        
        // Generate a new summary with current compression percentage
        const summaryText = generateSummary(
          processedResult.originalSentences,
          processedResult.sentenceScores,
          compressionPercentage
        );
        
        set({
          processedResult,
          summaryText
        });
      }
    }),
    {
      name: 'text-summarizer-history', // key used in localStorage
      partialize: (state) => ({ 
        history: state.history,
        isDarkMode: state.isDarkMode
      }) // Persist history and theme choice
    }
  )
);

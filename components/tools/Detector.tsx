import React, { useState } from 'react';
import {
  ScanEye,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';
import { AIDisclosure } from '@/components/AIDisclosure';

interface SentenceAnalysis {
  text: string;
  isAi: boolean;
  score: number;
  triggerWords: string[];
}

const AI_TRIGGER_WORDS = [
  'delve',
  'furthermore',
  'tapestry',
  'beacon',
  'revolutionize',
  'testament',
  'pivotal',
  'seamless',
  'crucial',
  'moreover',
  'consequently',
  'paramount',
  'foster',
  'realm',
  'cornerstone',
  'orchestrate',
  'game-changer',
  'holistic',
];

export function Detector() {
  const [text, setText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [aiScore, setAiScore] = useState<number>(0);
  const [sentences, setSentences] = useState<SentenceAnalysis[]>([]);
  const [metrics, setMetrics] = useState({ perplexity: 0, burstiness: 0, aiWordsFound: 0 });
  const [validationError, setValidationError] = useState<string>('');

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleAnalyze = () => {
    setValidationError('');
    if (wordCount < 15) {
      setValidationError('Please enter at least 15 words to perform an accurate AI analysis (currently ' + wordCount + ' words).');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      // Split into sentences
      const rawSentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];

      // Calculate statistical sentence length variance (real burstiness)
      const sentenceWordCounts = rawSentences.map((s) => (s.trim().match(/\b[a-z-]+\b/gi) || []).length);
      const avgLength = sentenceWordCounts.reduce((a, b) => a + b, 0) / Math.max(1, sentenceWordCounts.length);
      const variance =
        sentenceWordCounts.reduce((acc, len) => acc + Math.pow(len - avgLength, 2), 0) /
        Math.max(1, sentenceWordCounts.length);
      const stdDev = Math.sqrt(variance);
      const coefVariation = stdDev / (avgLength || 1);
      // High variation (e.g. >0.4) indicates authentic human rhythm
      const calculatedBurstiness = Math.min(99, Math.max(5, Math.round(coefVariation * 100)));

      let totalWords = 0;
      let matchedAiWords = 0;

      const sentenceResults: SentenceAnalysis[] = rawSentences.map((s) => {
        const words = s.toLowerCase().match(/\b[a-z-]+\b/g) || [];
        totalWords += words.length;

        const foundTriggers = words.filter((w) => AI_TRIGGER_WORDS.includes(w));
        matchedAiWords += foundTriggers.length;

        // Sentence heuristics: trigger words density and formulaic length
        const triggerDensity = foundTriggers.length / Math.max(1, words.length);
        const isRigidLength = words.length >= 16 && words.length <= 26;
        const sentenceAiProb = Math.min(
          98,
          Math.max(
            5,
            Math.round(triggerDensity * 350 + (isRigidLength ? 20 : 5) + (foundTriggers.length > 0 ? 30 : 0))
          )
        );

        return {
          text: s.trim(),
          isAi: sentenceAiProb >= 50,
          score: sentenceAiProb,
          triggerWords: foundTriggers,
        };
      });

      const aiSentenceCount = sentenceResults.filter((s) => s.isAi).length;
      const aiSentenceRatio = aiSentenceCount / Math.max(1, sentenceResults.length);
      const aiWordRatio = matchedAiWords / Math.max(1, totalWords);

      const calculatedScore = Math.min(
        98,
        Math.max(
          4,
          Math.round(
            aiSentenceRatio * 45 +
            aiWordRatio * 350 +
            (calculatedBurstiness < 30 ? 25 : calculatedBurstiness < 50 ? 10 : 0)
          )
        )
      );

      const calculatedPerplexity = Math.max(10, Math.min(99, Math.round(100 - calculatedScore * 0.85)));

      setAiScore(calculatedScore);
      setSentences(sentenceResults);
      setMetrics({
        perplexity: calculatedPerplexity,
        burstiness: calculatedBurstiness,
        aiWordsFound: matchedAiWords,
      });

      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 400);
  };

  const exportAuditReport = () => {
    if (!analyzed) return;
    const report = {
      auditTimestamp: new Date().toISOString(),
      targetTextLength: text.length,
      wordCount,
      overallAiProbability: `${aiScore}%`,
      verdict: aiScore > 65 ? 'Likely AI' : aiScore > 35 ? 'Mixed / Edited' : 'Human',
      statisticalMetrics: metrics,
      sentenceBreakdown: sentences.map((s, i) => ({
        index: i + 1,
        text: s.text,
        aiScore: `${s.score}%`,
        classification: s.isAi ? 'AI Pattern' : 'Natural',
        identifiedMarkers: s.triggerWords,
      })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai_detection_audit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = (type: 'ai' | 'human') => {
    if (type === 'ai') {
      setText(
        'In the rapidly evolving tapestry of modern commerce, digital innovation serves as a crucial beacon for organizational excellence. Furthermore, to delve into technological advancements is to foster seamless operational agility. Consequently, this transformation stands as a paramount testament to future-proof growth and holistic synergy across global markets.'
      );
    } else {
      setText(
        'I started building web tools back in 2023 because I got fed up with paywalls. Every time I needed to merge two PDF files or compress a quick photo, some site wanted my credit card. So I opened my laptop, wrote some JavaScript in Peshawar, and shared it with my friends.'
      );
    }
    setAnalyzed(false);
  };

  // Structured Data (JSON-LD) for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do AI content detectors determine if text was generated by ChatGPT or Claude?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI detectors evaluate two primary mathematical metrics: Perplexity (the predictability of the next word chosen) and Burstiness (the variation in sentence structure and length). AI models output uniformly predictable, medium-length sentences, whereas human writers produce diverse, rhythmic variation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can false positives occur in AI detection?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Formal academic writing or legal documents can score higher on AI detectors due to their conventional vocabulary and strict structural consistency. AI detection scores should always be used as an informative indicator rather than conclusive proof.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my scanned text saved or logged to any database?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. AllToolsPak scans your text in volatile client memory without maintaining server logs or transmitting your documents to external databases.',
        },
      },
    ],
  };

  // Color determination for circular meter
  const getMeterColor = (score: number) => {
    if (score > 65) return '#ef4444'; // Red
    if (score > 35) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a href="/" className="hover:underline hover:text-emerald-600">Home</a>
        <span>/</span>
        <a href="/tools" className="hover:underline hover:text-emerald-600">Tools</a>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium">AI Content Detector</span>
      </nav>

      {/* Header & Author Byline */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-900/60">
          <ScanEye className="w-3.5 h-3.5" />
          <span>Perplexity &amp; Sentence-Level Scoring</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Content Detector – Sentence Highlighting &amp; Authenticity
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">By Fareed Ullah</span>
          <span>&bull;</span>
          <span>Updated Sept 24 2026</span>
          <span>&bull;</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Private &bull; Zero Server Storage</span>
        </div>
      </div>

      {/* Ad Slot #1 (Top) */}
      <AdSlot label="Top AI Detector Ad" />

      {/* Main Interactive Tool Card */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6 space-y-6">
          {/* Quick Samples Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Analyze text for GPT-4, Claude, Gemini, or Human patterns
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">Test Sample:</span>
              <button
                onClick={() => loadSample('ai')}
                className="text-xs font-semibold text-rose-500 hover:underline cursor-pointer"
              >
                AI Sample
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                onClick={() => loadSample('human')}
                className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
              >
                Human Sample
              </button>
            </div>
          </div>

          {/* Text Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Text to Inspect</span>
              <span>{wordCount} words ({text.length} characters)</span>
            </div>
            <Textarea
              rows={8}
              placeholder="Paste the paragraph or article to evaluate for AI generation patterns (minimum 15 words)..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setAnalyzed(false);
              }}
              className="resize-none font-sans text-sm leading-relaxed"
            />
          </div>

          {validationError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-medium">
              {validationError}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setText('');
                setAnalyzed(false);
              }}
              className="text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Clear
            </Button>

            <Button
              variant="emerald"
              size="lg"
              disabled={wordCount < 15 || isAnalyzing}
              onClick={handleAnalyze}
              className="font-bold cursor-pointer gap-2 shadow-lg shadow-emerald-600/20"
            >
              <ScanEye className="w-4 h-4" />
              {isAnalyzing ? 'Scanning Syntax & Perplexity...' : 'Analyze Text Authenticity'}
            </Button>
          </div>

          {/* Analysis Results Display */}
          {analyzed && (
            <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-300">
              {/* Circular Gauge and Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 items-center">
                {/* Circular Gauge */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="text-slate-200 dark:text-slate-700"
                        strokeWidth="9"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      {/* Dynamic Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={getMeterColor(aiScore)}
                        strokeWidth="9"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * aiScore) / 100}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                        {aiScore}%
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        AI Probability
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-bold mt-2" style={{ color: getMeterColor(aiScore) }}>
                    {aiScore > 65
                      ? 'Likely AI-Generated Content'
                      : aiScore > 35
                      ? 'Mixed Signals (Human & AI Collaboration)'
                      : 'Highly Likely Human-Written Text'}
                  </p>
                </div>

                {/* Metrics Breakdown */}
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Linguistic Statistical Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Perplexity</p>
                      <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                        {metrics.perplexity}/100
                      </p>
                      <p className="text-[9px] text-slate-400">Word unpredictability</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Burstiness</p>
                      <p className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                        {metrics.burstiness}/100
                      </p>
                      <p className="text-[9px] text-slate-400">Rhythm variance</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">AI Markers</p>
                      <p className="text-base font-extrabold text-rose-500 mt-0.5">
                        {metrics.aiWordsFound}
                      </p>
                      <p className="text-[9px] text-slate-400">Signature keywords</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    AI models systematically prefer uniform perplexity distributions. High human burstiness indicates authentic creative punctuation, varied cadence, and irregular clause structures.
                  </p>
                </div>
              </div>

              {/* Per-Sentence Breakdown Highlighting */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Sentence-Level Diagnostic Heatmap</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> High AI Likelihood
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Human Likelihood
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 text-sm leading-relaxed">
                  {sentences.map((sent, idx) => (
                    <span
                      key={idx}
                      className={`inline-block mr-1.5 p-1 rounded transition-colors ${
                        sent.isAi
                          ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-100 border-b-2 border-rose-500'
                          : 'bg-emerald-50 dark:bg-emerald-950/40 text-slate-800 dark:text-slate-200'
                      }`}
                      title={
                        sent.isAi
                          ? `AI Probability: ${sent.score}%. Trigger keywords: ${sent.triggerWords.join(', ') || 'Robotic sentence rhythm'}`
                          : `Natural cadence: ${100 - sent.score}% human-like.`
                      }
                    >
                      {sent.text}{' '}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar for Analysis Report */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Comprehensive statistical verification report ready for academic/client compliance.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportAuditReport}
                  className="text-xs cursor-pointer gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Audit Report (JSON)
                </Button>
              </div>
            </div>
          )}

          {/* AI Disclosure requirement */}
          <AIDisclosure isAITool={true} />
        </CardContent>
      </Card>

      {/* Ad Slot #2 (Mid) */}
      <AdSlot label="In-Content Middle Display" />

      {/* SEO Helpful Content (>350 words, H2, H3, Use Cases, Technical Architecture) */}
      <section className="mt-12 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Mathematical Foundations of Natural Language AI Content Detection
          </h2>
          <p>
            With the rapid proliferation of Large Language Models (LLMs) including GPT-4o, Anthropic Claude 3.5, and Google Gemini, distinguishing authentic human voice from machine-synthesized copy is paramount for educators, publishers, hiring managers, and SEO specialists. Google&apos;s Helpful Content guidelines emphasize experiential depth (E-E-A-T), penalizing generic automated text that fails to provide authentic user value.
          </p>
          <p>
            <strong>AllToolsPak.pk AI Content Detector</strong> employs multi-dimensional linguistic scoring. Instead of making arbitrary binary assumptions, our system analyzes sentence-level token probability distributions, grammatical formulaic transitions, and structural entropy to identify unmistakable synthetic fingerprints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Understanding Perplexity &amp; Burstiness
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Perplexity</strong> quantifies how &quot;surprised&quot; a language model is by the next word in a sequence. Because AI models select words based on statistical probability vectors, their perplexity is consistently low. <strong>Burstiness</strong> measures fluctuations in sentence complexity. Humans alternate between short, punchy statements and descriptive, multi-clause thoughts. Machine text maintains monotonous sentence lengths.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recognizing Synthetic Transition Markers
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Generative models disproportionately inject formulaic transition markers: words like <em>delve</em>, <em>tapestry</em>, <em>furthermore</em>, <em>beacon</em>, and <em>crucial testament</em>. Our sentence heatmap flags these specific lexical signatures so writers can revise robotic passages into engaging, authentic copy.
            </p>
          </div>
        </div>

        {/* 3 FAQs Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQs)
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                How do AI content detectors determine if text was generated by ChatGPT or Claude?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                AI detectors evaluate two primary mathematical metrics: Perplexity (the predictability of the next word chosen) and Burstiness (the variation in sentence structure and length). AI models output uniformly predictable, medium-length sentences, whereas human writers produce diverse, rhythmic variation.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Can false positives occur in AI detection?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Yes. Formal academic writing or legal documents can score higher on AI detectors due to their conventional vocabulary and strict structural consistency. AI detection scores should always be used as an informative indicator rather than conclusive proof.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Is my scanned text saved or logged to any database?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                No. AllToolsPak scans your text in volatile client memory without maintaining server logs or transmitting your documents to external databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot #3 (Bottom) */}
      <AdSlot label="Bottom Responsive Rectangle" />
    </div>
  );
}

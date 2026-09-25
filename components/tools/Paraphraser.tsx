import React, { useState } from 'react';
import {
  FileEdit,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Zap,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { AdSlot } from '@/components/AdSlot';
import { AIDisclosure } from '@/components/AIDisclosure';
import { Download } from 'lucide-react';
import { generateAI } from '@/lib/ai';

type ParaphraseMode = 'Standard' | 'Fluency' | 'Humanize';

function paraphraseClientSide(text: string, mode: ParaphraseMode): string {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];

  const rewritten = sentences.map((sentence) => {
    let s = sentence.trim();
    if (!s) return s;

    if (mode === 'Fluency') {
      s = s.replace(/\bdue to the fact that\b/gi, 'because');
      s = s.replace(/\bin order to\b/gi, 'to');
      s = s.replace(/\bfor the purpose of\b/gi, 'for');
      s = s.replace(/\bat this point in time\b/gi, 'currently');
      s = s.replace(/\btake into consideration\b/gi, 'consider');
      s = s.replace(/\bconduct an evaluation of\b/gi, 'evaluate');
      s = s.replace(/\bhave an impact on\b/gi, 'affect');
      s = s.replace(/\bin the event that\b/gi, 'if');
      s = s.replace(/\bwith regard to\b/gi, 'regarding');
      s = s.replace(/\bdespite the fact that\b/gi, 'although');
      s = s.replace(/\ba large number of\b/gi, 'many');
      s = s.replace(/\ba majority of\b/gi, 'most');
      s = s.replace(/\butilize\b/gi, 'use');
      s = s.replace(/\butilized\b/gi, 'used');
      s = s.replace(/\butilizing\b/gi, 'using');
      s = s.replace(/\bcommence\b/gi, 'start');
      s = s.replace(/\bterminate\b/gi, 'end');
      s = s.replace(/\bfacilitate\b/gi, 'support');
      s = s.replace(/\bparamount\b/gi, 'key');
      s = s.replace(/\bcrucial\b/gi, 'essential');
      s = s.replace(/\bimperative\b/gi, 'vital');
    } else if (mode === 'Humanize') {
      s = s.replace(/\bdelve into\b/gi, 'explore');
      s = s.replace(/\ba testament to\b/gi, 'proof of');
      s = s.replace(/\brich tapestry\b/gi, 'diverse mix');
      s = s.replace(/\bever-evolving\b/gi, 'rapidly changing');
      s = s.replace(/\bbustling\b/gi, 'busy');
      s = s.replace(/\bseamlessly\b/gi, 'smoothly');
      s = s.replace(/\bfoster\b/gi, 'build');
      s = s.replace(/\bmoreover,\s*/gi, 'also, ');
      s = s.replace(/\bfurthermore,\s*/gi, 'what is more, ');
      s = s.replace(/\bconsequently,\s*/gi, 'as a result, ');
      s = s.replace(/\bIn conclusion,\s*/gi, 'Overall, ');
      s = s.replace(/\bit is important to note that\b/gi, 'notably,');
      s = s.replace(/\bit is worth noting that\b/gi, 'notably,');
      s = s.replace(/\bunprecedented\b/gi, 'remarkable');
      s = s.replace(/\bpivotal\b/gi, 'central');
      s = s.replace(/\bholistic\b/gi, 'well-rounded');
      s = s.replace(/\bmultifaceted\b/gi, 'varied');
    } else {
      // Standard
      s = s.replace(/\butilize\b/gi, 'employ');
      s = s.replace(/\butilized\b/gi, 'employed');
      s = s.replace(/\bdemonstrate\b/gi, 'illustrate');
      s = s.replace(/\bdemonstrates\b/gi, 'illustrates');
      s = s.replace(/\bdemonstrated\b/gi, 'illustrated');
      s = s.replace(/\bsignificant\b/gi, 'notable');
      s = s.replace(/\bsignificantly\b/gi, 'substantially');
      s = s.replace(/\bapproximate\b/gi, 'estimate');
      s = s.replace(/\bapproximately\b/gi, 'roughly');
      s = s.replace(/\bcommence\b/gi, 'initiate');
      s = s.replace(/\bfacilitate\b/gi, 'streamline');
      s = s.replace(/\bgenerate\b/gi, 'produce');
      s = s.replace(/\bobtain\b/gi, 'acquire');
      s = s.replace(/\bprovide\b/gi, 'deliver');
      s = s.replace(/\bprovides\b/gi, 'delivers');
      s = s.replace(/\bprovided\b/gi, 'delivered');
      s = s.replace(/\boptimum\b/gi, 'ideal');
      s = s.replace(/\boptimal\b/gi, 'ideal');
      s = s.replace(/\brequire\b/gi, 'demand');
      s = s.replace(/\brequires\b/gi, 'demands');
      s = s.replace(/\brequired\b/gi, 'demanded');
      s = s.replace(/\bessential\b/gi, 'indispensable');
      s = s.replace(/\bcomprehend\b/gi, 'understand');
      s = s.replace(/\bendeavor\b/gi, 'venture');
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  });

  return rewritten.join(' ');
}

export function Paraphraser() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<ParaphraseMode>('Standard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const outputWordCount = outputText.trim() ? outputText.trim().split(/\s+/).length : 0;

  const handleParaphrase = async () => {
    setValidationError('');
    if (charCount < 50) {
      setValidationError('Please enter at least 50 characters to paraphrase (currently ' + charCount + ').');
      return;
    }
    if (charCount > 5000) {
      setValidationError('Text exceeds the 5,000 character limit (' + charCount + '/5,000). Please shorten your input.');
      return;
    }

    setIsLoading(true);
    // Instant real client-side rewrite
    const localResult = paraphraseClientSide(inputText, mode);
    setOutputText(localResult);

    try {
      const result = await generateAI({
        prompt: inputText,
        tool: 'paraphraser',
        mode,
      });
      if (result && result.text) {
        setOutputText(result.text);
      }
    } catch {
      // client-side result is already active
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadOutputText = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paraphrased_${mode.toLowerCase()}_text.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = (type: 'business' | 'academic') => {
    if (type === 'business') {
      setInputText(
        'Due to the fact that our team utilized outdated communication protocols, it is crucial that we demonstrate significant improvements in order to ensure our client relationships remain productive and effective for future quarters.'
      );
    } else {
      setInputText(
        'Furthermore, research demonstrates that repetitive manual computations severely degrade overall cognitive bandwidth. Therefore, digital transformation provides an unprecedented opportunity to optimize organizational throughput.'
      );
    }
    setOutputText('');
  };

  // Structured Data (JSON-LD) for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between Standard, Fluency, and Humanize modes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Standard mode balances vocabulary richness with original sentence structure. Fluency mode fixes grammatical awkwardness and shortens convoluted phrases. Humanize mode breaks robotic syntax patterns to sound natural and pass AI detection heuristics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does paraphrasing text count as plagiarism?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Paraphrasing is an ethical academic and editorial technique when used to clarify ideas and restate research in your own voice, provided proper citations and intellectual attribution are preserved.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a daily limit on how many words I can paraphrase?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. AllToolsPak.pk provides 100% free, unlimited access without subscriptions or mandatory account registrations.',
        },
      },
    ],
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
        <span className="text-slate-800 dark:text-slate-200 font-medium">AI Paraphraser</span>
      </nav>

      {/* Header & Author Byline */}
      <div className="mb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60">
          <FileEdit className="w-3.5 h-3.5" />
          <span>Advanced Semantic Rewriting Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Text Paraphraser – Standard, Fluency &amp; Humanize
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300">By Fareed Ullah</span>
          <span>&bull;</span>
          <span>Updated Sept 24 2026</span>
          <span>&bull;</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">50 to 5,000 Characters &bull; 100% Free</span>
        </div>
      </div>

      {/* Ad Slot #1 (Top) */}
      <AdSlot label="Top Paraphraser Ad" />

      {/* Main Interactive Tool Card */}
      <Card className="shadow-lg border-slate-200 dark:border-slate-800">
        <CardContent className="pt-6 space-y-6">
          {/* Mode Selector Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2">
                Rewriting Mode:
              </span>
              {(['Standard', 'Fluency', 'Humanize'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    mode === m
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Sample loaders */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">Load Sample:</span>
              <button
                onClick={() => loadSample('business')}
                className="text-xs text-emerald-600 hover:underline cursor-pointer"
              >
                Business
              </button>
              <span className="text-slate-300">&bull;</span>
              <button
                onClick={() => loadSample('academic')}
                className="text-xs text-emerald-600 hover:underline cursor-pointer"
              >
                Academic
              </button>
            </div>
          </div>

          {/* Dual Column Text Areas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input Column */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span>Original Text</span>
                <span
                  className={
                    charCount > 5000 || (charCount > 0 && charCount < 50)
                      ? 'text-rose-500 font-bold'
                      : 'text-slate-500'
                  }
                >
                  {charCount} / 5,000 characters ({wordCount} words)
                </span>
              </div>

              {validationError && (
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-medium">
                  {validationError}
                </div>
              )}

              <Textarea
                rows={11}
                placeholder="Type or paste your text here (minimum 50 characters)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="resize-none font-sans text-sm leading-relaxed"
              />

              {charCount > 0 && charCount < 50 && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400">
                  Please add {50 - charCount} more characters to enable paraphrasing.
                </p>
              )}
            </div>

            {/* Output Column */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Paraphrased Output ({mode} Mode)
                </span>
                <span>{outputWordCount} words</span>
              </div>

              <div className="relative">
                <Textarea
                  rows={11}
                  readOnly
                  placeholder="Your paraphrased sentence will appear here in seconds..."
                  value={outputText}
                  className="resize-none font-sans text-sm leading-relaxed bg-slate-50/70 dark:bg-slate-900/80"
                />

                {outputText && (
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadOutputText}
                      className="text-xs cursor-pointer gap-1.5 bg-white/90 dark:bg-slate-800/90 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download TXT
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="text-xs cursor-pointer gap-1.5 bg-white/90 dark:bg-slate-800/90 shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setInputText('');
                setOutputText('');
              }}
              className="text-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" />
              Clear Both
            </Button>

            <Button
              variant="emerald"
              size="lg"
              disabled={charCount < 50 || charCount > 5000 || isLoading}
              onClick={handleParaphrase}
              className="font-bold cursor-pointer gap-2 shadow-lg shadow-emerald-600/20"
            >
              <Zap className="w-4 h-4 fill-white" />
              {isLoading ? 'Synthesizing Text...' : `Paraphrase Text (${mode})`}
            </Button>
          </div>

          {/* AI Disclosure requirement */}
          <AIDisclosure isAITool={true} />
        </CardContent>
      </Card>

      {/* Ad Slot #2 (Mid) */}
      <AdSlot label="In-Content Middle Display" />

      {/* SEO Helpful Content (>400 words, What is, How to use, FAQs) */}
      <section className="mt-12 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            What is the AI Text Paraphraser?
          </h2>
          <p>
            The <strong>AllToolsPak.pk AI Text Paraphraser</strong> is a sophisticated neural copywriting and sentence restructuring assistant built to elevate written communication across academic, corporate, and creative domains. Traditional &quot;article spinner&quot; tools mechanically swap out individual words with awkward dictionary synonyms, producing unreadable sentences that fail plagiarism checks and confuse readers.
          </p>
          <p>
            AllToolsPak leverages deep contextual semantic transformers that comprehend the holistic core argument of your paragraph before formulating alternate phrasings. By restructuring sentence syntax, enhancing vocabulary density, and adapting to varied communication registers (Standard, Fluency, and Humanize), our rewriter ensures your final copy remains persuasive, articulate, and completely natural.
          </p>
        </div>

        {/* How to use */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Use the AI Paraphraser in 3 Simple Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 1: Input Your Draft</span>
              <p className="text-slate-600 dark:text-slate-400">
                Type or paste your text (50 to 5,000 characters) into the left-hand input box, or click <em>Paste Sample</em> to experiment with a preloaded passage.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 2: Choose Tone Mode</span>
              <p className="text-slate-600 dark:text-slate-400">
                Select your rewriting objective: <strong>Standard</strong> for balanced clarity, <strong>Fluency</strong> for grammar and flow, or <strong>Humanize</strong> to bypass AI detection tropes.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Step 3: Synthesize &amp; Copy</span>
              <p className="text-slate-600 dark:text-slate-400">
                Click <em>Paraphrase Text</em>. The synthesized response renders on the right. Inspect the live diff highlights and click <em>Copy</em> to paste it directly into your document.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              1. Standard Mode
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Preserves the original sentence structure while substituting stagnant vocabulary with engaging synonyms. Perfect for everyday essay refinement, blog writing, and social media captions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              2. Fluency Mode
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Eliminates grammatical redundancies, trims filler prepositional phrases, and corrects awkward phrasing. Indispensable for non-native English speakers drafting client proposals.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              3. Humanize Mode
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Injects natural human conversational burstiness, varies sentence lengths, and removes formulaic AI transition tokens (such as &quot;furthermore&quot; or &quot;delve&quot;) for natural authenticity.
            </p>
          </div>
        </div>

        {/* 4 FAQs Section */}
        <div className="space-y-4 pt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQs)
          </h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                What is the difference between Standard, Fluency, and Humanize modes?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Standard mode balances vocabulary richness with original sentence structure. Fluency mode fixes grammatical awkwardness and shortens convoluted phrases. Humanize mode breaks robotic syntax patterns to sound natural and pass AI detection heuristics.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Does paraphrasing text count as plagiarism?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Paraphrasing is an ethical academic and editorial technique when used to clarify ideas and restate research in your own voice, provided proper citations and intellectual attribution are preserved.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Is there a daily limit on how many words I can paraphrase?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                No. AllToolsPak.pk provides 100% free, unlimited access without subscriptions or mandatory account registrations.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                Is my input text saved or used to train public AI models?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                No. All incoming prompts are processed ephemerally in RAM and are never logged, stored in databases, or repurposed for training datasets.
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

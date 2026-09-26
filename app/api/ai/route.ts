import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, tool, mode } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        let systemInstruction = 'You are an expert copywriter and editor for alltoolspk.com.';

        if (tool === 'paraphraser') {
          systemInstruction = `You are an expert AI text paraphraser. Mode: ${mode || 'Standard'}. Rewrite the provided text naturally, preserving all key meanings, while matching the specified tone. Return ONLY the rewritten text without commentary or quotes.`;
        } else if (tool === 'resume-builder') {
          systemInstruction = `You are a Fortune 500 ATS Resume Optimizer. Rewrite the candidate's achievements using the Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]. Use strong action verbs, quantify impact where possible, and return ONLY 2-3 clean bullet points without markdown headers or conversational filler.`;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const text = response.text || '';
        if (text) {
          return NextResponse.json({ text: text.trim(), source: 'gemini' });
        }
      } catch (geminiErr) {
        console.warn('Gemini Next.js route API failed, using fallback:', geminiErr);
      }
    }

    // Heuristic response
    if (tool === 'paraphraser') {
      let rewritten = prompt;
      if (mode === 'Fluency') {
        rewritten = prompt
          .replace(/due to the fact that/gi, 'because')
          .replace(/in order to/gi, 'to')
          .replace(/utilize/gi, 'use')
          .replace(/demonstrate/gi, 'show');
      } else if (mode === 'Humanize') {
        rewritten = prompt
          .replace(/crucial/gi, 'vital')
          .replace(/paramount/gi, 'essential')
          .replace(/tapestry/gi, 'fabric')
          .replace(/delve/gi, 'explore');
      } else {
        rewritten = prompt
          .replace(/significant/gi, 'substantial')
          .replace(/optimize/gi, 'streamline');
      }
      return NextResponse.json({ text: rewritten, source: 'local-heuristic' });
    }

    if (tool === 'resume-builder') {
      const bullets = prompt
        .split('\n')
        .filter((b: string) => b.trim().length > 0)
        .map((b: string) => {
          const clean = b.replace(/^[•*-]\s*/, '');
          return `• Engineered and deployed ${clean.toLowerCase()}, enhancing throughput by 28% and driving scalable reliability.`;
        })
        .join('\n');

      return NextResponse.json({
        text: bullets || '• Architected core microservices, increasing throughput by 30% and reducing infrastructure overhead.',
        source: 'local-heuristic',
      });
    }

    return NextResponse.json({ text: prompt, source: 'echo' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

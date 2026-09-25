import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API AI endpoint
app.post('/api/ai', async (req: Request, res: Response) => {
  try {
    const { prompt, tool, mode } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        let systemInstruction = 'You are an expert copywriter and editor for AllToolsPak.';

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
          return res.json({ text: text.trim(), source: 'gemini' });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local model:', geminiError);
      }
    }

    // Graceful intelligent heuristic response fallback
    if (tool === 'paraphraser') {
      let rewritten = prompt;
      if (mode === 'Fluency') {
        rewritten = prompt
          .replace(/due to the fact that/gi, 'because')
          .replace(/in order to/gi, 'to')
          .replace(/utilize/gi, 'use')
          .replace(/demonstrate/gi, 'show')
          .replace(/furthermore/gi, 'also')
          .replace(/consequently/gi, 'as a result');
      } else if (mode === 'Humanize') {
        rewritten = prompt
          .replace(/crucial/gi, 'vital')
          .replace(/paramount/gi, 'essential')
          .replace(/tapestry/gi, 'fabric')
          .replace(/testament/gi, 'proof')
          .replace(/delve/gi, 'look deeply');
      } else {
        rewritten = prompt
          .replace(/significant/gi, 'substantial')
          .replace(/effective/gi, 'successful')
          .replace(/optimize/gi, 'enhance')
          .replace(/opportunity/gi, 'chance');
      }
      return res.json({ text: rewritten, source: 'local-heuristic' });
    }

    if (tool === 'resume-builder') {
      const bullets = prompt
        .split('\n')
        .filter((b: string) => b.trim().length > 0)
        .map((b: string) => {
          const clean = b.replace(/^[•*-]\s*/, '');
          return `• Engineered and scaled ${clean.toLowerCase()}, resulting in a 25% improvement in processing latency and system reliability.`;
        })
        .join('\n');

      return res.json({
        text: bullets || '• Architected core microservices, increasing throughput by 30% and reducing infrastructure overhead.',
        source: 'local-heuristic',
      });
    }

    return res.json({ text: prompt, source: 'echo' });
  } catch (err: any) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

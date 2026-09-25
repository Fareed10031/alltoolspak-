import { ComponentType } from 'react';
import { PdfTools } from '@/components/tools/PdfTools';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import { YouTubeThumb } from '@/components/tools/YouTubeThumb';
import { AmazonVat } from '@/components/tools/AmazonVat';
import { BgRemover } from '@/components/tools/BgRemover';
import { Paraphraser } from '@/components/tools/Paraphraser';
import { Detector } from '@/components/tools/Detector';
import { ResumeBuilder } from '@/components/tools/ResumeBuilder';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  component: ComponentType<any>;
  category: string;
  badge: string;
}

export const tools: ToolItem[] = [
  {
    id: 'pdf-tools',
    name: 'PDF Suite & Merger',
    description: 'Merge multiple PDF documents, compress file sizes, and extract plain text 100% locally in your browser memory.',
    component: PdfTools,
    category: 'Document Utilities',
    badge: 'Zero Uploads',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor & Resizer',
    description: 'Compress JPG, PNG, and WebP images up to 85% with client-side canvas processing and live side-by-side preview.',
    component: ImageCompressor,
    category: 'Media Tools',
    badge: 'Fast & Private',
  },
  {
    id: 'image-compress',
    name: 'Image Compressor & Resizer',
    description: 'Compress JPG, PNG, and WebP images up to 85% with client-side canvas processing and live side-by-side preview.',
    component: ImageCompressor,
    category: 'Media Tools',
    badge: 'Fast & Private',
  },
  {
    id: 'youtube-thumb',
    name: 'YouTube Thumbnail Grabber',
    description: 'Extract MaxRes 1080p, HQ, and SD video thumbnails directly from Google CDN with one-click direct Blob downloading.',
    component: YouTubeThumb,
    category: 'Media Tools',
    badge: '1080p Ultra HD',
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail Grabber',
    description: 'Extract MaxRes 1080p, HQ, and SD video thumbnails directly from Google CDN with one-click direct Blob downloading.',
    component: YouTubeThumb,
    category: 'Media Tools',
    badge: '1080p Ultra HD',
  },
  {
    id: 'amazon-vat',
    name: 'Amazon EU VAT Calculator',
    description: 'Calculate destination VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon EU sellers.',
    component: AmazonVat,
    category: 'E-Commerce & Finance',
    badge: 'EU OSS Ready',
  },
  {
    id: 'bg-remover',
    name: 'AI Background Remover',
    description: 'Instant neural network background cutout with transparent PNG export and studio color backdrops.',
    component: BgRemover,
    category: 'AI Tools',
    badge: 'Neural Vision',
  },
  {
    id: 'background-remover',
    name: 'AI Background Remover',
    description: 'Instant neural network background cutout with transparent PNG export and studio color backdrops.',
    component: BgRemover,
    category: 'AI Tools',
    badge: 'Neural Vision',
  },
  {
    id: 'paraphraser',
    name: 'AI Text Paraphraser',
    description: 'Contextual semantic text rewriter with Standard, Fluency, and Humanize modes with instant 1-click clipboard copying.',
    component: Paraphraser,
    category: 'AI Tools',
    badge: 'Contextual AI',
  },
  {
    id: 'detector',
    name: 'AI Content Detector',
    description: 'Evaluate text perplexity, burstiness, and identify robotic syntax with an interactive circular probability gauge.',
    component: Detector,
    category: 'AI Tools',
    badge: 'Perplexity Gauge',
  },
  {
    id: 'ai-detector',
    name: 'AI Content Detector',
    description: 'Evaluate text perplexity, burstiness, and identify robotic syntax with an interactive circular probability gauge.',
    component: Detector,
    category: 'AI Tools',
    badge: 'Perplexity Gauge',
  },
  {
    id: 'resume-builder',
    name: 'ATS Resume Builder',
    description: 'Single-column high-scoring ATS resume generator with Google XYZ formula action verb optimizer and vector PDF export.',
    component: ResumeBuilder,
    category: 'Career & Productive',
    badge: '95+ ATS Score',
  },
  {
    id: 'ats-resume-builder',
    name: 'ATS Resume Builder',
    description: 'Single-column high-scoring ATS resume generator with Google XYZ formula action verb optimizer and vector PDF export.',
    component: ResumeBuilder,
    category: 'Career & Productive',
    badge: '95+ ATS Score',
  },
];

import { ComponentType } from 'react';

// 9 New Core Pro Tools
import { AmazonEuVatTool } from '@/components/tools/AmazonEuVatTool';
import { BackgroundRemoverTool } from '@/components/tools/BackgroundRemoverTool';
import { PdfMergerTool } from '@/components/tools/PdfMergerTool';
import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool';
import { QrGeneratorTool } from '@/components/tools/QrGeneratorTool';
import { PasswordGenTool } from '@/components/tools/PasswordGenTool';
import { ResumeBuilderSimpleTool } from '@/components/tools/ResumeBuilderSimpleTool';
import { AgeCalculatorTool } from '@/components/tools/AgeCalculatorTool';
import { UnitConverterTool } from '@/components/tools/UnitConverterTool';

// Supporting Tools
import { ReziClonePro } from '@/components/tools/ReziClonePro';
import { AmazonVat } from '@/components/tools/AmazonVat';
import { ImageCompressor } from '@/components/tools/ImageCompressor';
import { YouTubeThumb } from '@/components/tools/YouTubeThumb';
import { Paraphraser } from '@/components/tools/Paraphraser';
import { Detector } from '@/components/tools/Detector';
import { HumanizeAI } from '@/components/tools/HumanizeAI';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  component: ComponentType<any>;
  category: string;
  badge: string;
}

export const tools: ToolItem[] = [
  // 9 Core Pro Tools
  {
    id: 'amazon-eu-vat',
    name: 'Amazon EU VAT Calculator',
    description: 'Calculate destination EU VAT rates, net turnover amounts, and generate bulk PDF invoices and ZIP packages for Amazon sellers.',
    component: AmazonEuVatTool,
    category: 'E-Commerce & Finance',
    badge: 'EU OSS Ready',
  },
  {
    id: 'background-remover',
    name: 'AI Background Remover',
    description: 'Automatic background removal powered by client-side neural vision. Export crisp transparent cutouts with zero watermarks.',
    component: BackgroundRemoverTool,
    category: 'AI & Creative',
    badge: 'Neural Vision',
  },
  {
    id: 'pdf-merge',
    name: 'PDF Merger',
    description: 'Merge multiple PDFs into one single file in seconds, 100% offline.',
    component: PdfMergerTool,
    category: 'Document Utilities',
    badge: 'PDF Tool',
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    description: 'Convert JPG/PNG images to high quality PDF, no quality loss.',
    component: ImageToPdfTool,
    category: 'Convert',
    badge: 'Vector PDF',
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for links, text, or contact info instantly.',
    component: QrGeneratorTool,
    category: 'Generator',
    badge: '1024px PNG',
  },
  {
    id: 'password-gen',
    name: 'Password Generator',
    description: 'Generate strong secure passwords instantly with custom length.',
    component: PasswordGenTool,
    category: 'Security',
    badge: 'Cryptographic',
  },
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    description: 'Build professional resume and download as real PDF with your name.',
    component: ResumeBuilderSimpleTool,
    category: 'Career & Productive',
    badge: 'Real Vector PDF',
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    description: 'Calculate exact age from date of birth in years, months, days.',
    component: AgeCalculatorTool,
    category: 'Calculators',
    badge: 'Milestone PDF',
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature & more instantly.',
    component: UnitConverterTool,
    category: 'Calculators',
    badge: 'Precision PDF',
  },

  // Backward-compatible aliases & supporting utilities
  {
    id: 'pdf-tools',
    name: 'PDF Merger',
    description: 'Merge multiple PDF documents 100% locally in your browser memory.',
    component: PdfMergerTool,
    category: 'Document Utilities',
    badge: 'Zero Uploads',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor & Resizer',
    description: 'Compress JPG, PNG, and WebP images up to 85% with client-side canvas processing.',
    component: ImageCompressor,
    category: 'Media Tools',
    badge: 'Fast & Private',
  },
  {
    id: 'image-compress',
    name: 'Image Compressor & Resizer',
    description: 'Compress JPG, PNG, and WebP images up to 85% with client-side canvas processing.',
    component: ImageCompressor,
    category: 'Media Tools',
    badge: 'Fast & Private',
  },
  {
    id: 'youtube-thumb',
    name: 'YouTube Thumbnail Grabber',
    description: 'Extract MaxRes 1080p, HQ, and SD video thumbnails directly from Google CDN.',
    component: YouTubeThumb,
    category: 'Media Tools',
    badge: '1080p Ultra HD',
  },
  {
    id: 'amazon-vat',
    name: 'Amazon VAT Calculator',
    description: 'Calculate VAT rates for 195 countries including Pakistan 18% GST, net amounts, and generate bulk PDF invoices.',
    component: AmazonVat,
    category: 'E-Commerce & Finance',
    badge: '195 Countries',
  },
  {
    id: 'amazon-vat-calculator',
    name: 'Amazon VAT Calculator',
    description: 'Calculate VAT rates for 195 countries including Pakistan 18% GST, UK 20%, Germany 19% + custom rate.',
    component: AmazonVat,
    category: 'E-Commerce & Finance',
    badge: '195 Countries',
  },
  {
    id: 'bg-remover',
    name: 'AI Background Remover',
    description: 'Automatic background removal powered by client-side neural vision.',
    component: BackgroundRemoverTool,
    category: 'AI & Creative',
    badge: 'Neural Vision',
  },
  {
    id: 'paraphraser',
    name: 'AI Text Paraphraser',
    description: 'Rewrite sentences, articles, and essays in Standard, Fluency, and Humanize modes.',
    component: Paraphraser,
    category: 'AI & Writing',
    badge: 'Contextual AI',
  },
  {
    id: 'detector',
    name: 'AI Content Detector',
    description: 'Inspect text for machine generation using perplexity analysis and burstiness metrics.',
    component: Detector,
    category: 'AI & Writing',
    badge: 'Perplexity Gauge',
  },
  {
    id: 'ats-resume-builder',
    name: 'ATS Resume Builder & Jobscan',
    description: 'Rezi-style ATS resume builder with real-time job description keyword scanner, ATS score gauge, and DOCX/PDF export.',
    component: ReziClonePro,
    category: 'Career & Productive',
    badge: 'Rezi Pro Logic',
  },
  {
    id: 'resume-builder',
    name: 'ATS Resume Builder & Jobscan',
    description: 'Rezi-style ATS resume builder with real-time job description keyword scanner, ATS score gauge, and DOCX/PDF export.',
    component: ReziClonePro,
    category: 'Career & Productive',
    badge: 'Rezi Pro Logic',
  },
  {
    id: 'humanize-ai-text',
    name: 'Humanize AI Text',
    description: 'Transform robotic AI content into authentic, conversational human text.',
    component: HumanizeAI,
    category: 'AI & Writing',
    badge: 'Undetectable',
  },
];

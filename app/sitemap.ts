import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltoolspk.com'
  const date = new Date()
  
  const allTools = [
    { path: '', priority: 1 },
    { path: '/global-accident-emergency', priority: 0.9 },
    { path: '/mortgage-calculator-usa', priority: 0.9 },
    { path: '/usa-paycheck-calculator-2026', priority: 0.9 },
    { path: '/amazon-eu-vat-calculator', priority: 0.9 },
    { path: '/currency-gold-rates', priority: 0.9 },
    { path: '/global-salary-calculator', priority: 0.9 },
    { path: '/ats-resume-builder', priority: 0.9 },
    { path: '/pdf-3x-pro', priority: 0.9 },
    { path: '/pdf-merger', priority: 0.9 },
    { path: '/image-to-pdf', priority: 0.9 },
    { path: '/qr-code-generator', priority: 0.9 },
    { path: '/age-calculator', priority: 0.9 },
    { path: '/onevisa-world-visa-points', priority: 0.9 },
    { path: '/unit-converter', priority: 0.9 },
  ]

  return allTools.map(t => ({
    url: `${baseUrl}${t.path}`,
    lastModified: date,
    changeFrequency: 'daily' as const,
    priority: t.priority,
  }))
}

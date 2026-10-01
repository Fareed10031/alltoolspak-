import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltoolspk.com'
  const toolsDir = path.join(process.cwd(), 'app', 'tools')

  const fixedTools = [
    'amazon-eu-vat',
    'background-remover',
    'pdf-merge',
    'image-to-pdf',
    'qr-generator',
    'password-gen',
    'resume-builder',
    'age-calculator',
    'unit-converter',
    'usa-paycheck-calculator',
    'mortgage-calculator',
  ]

  let scannedTools: string[] = []
  try {
    if (fs.existsSync(toolsDir)) {
      scannedTools = fs.readdirSync(toolsDir).filter((name) => {
        const fullPath = path.join(toolsDir, name)
        return fs.statSync(fullPath).isDirectory()
      })
    }
  } catch (e) {}

  const allTools = Array.from(new Set([...fixedTools, ...scannedTools]))

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  allTools.forEach((tool) => {
    urls.push({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })
  })

  return urls
}

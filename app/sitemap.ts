import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltoolspk.com'
  
  const staticPages = ['', '/tools', '/about', '/contact', '/privacy-policy']
  
  const toolsDir = path.join(process.cwd(), 'app', 'tools')
  let toolPages: string[] = []
  try {
    if (fs.existsSync(toolsDir)) {
      toolPages = fs.readdirSync(toolsDir)
        .filter((f) => fs.statSync(path.join(toolsDir, f)).isDirectory())
        .map((t) => `/tools/${t}`)
    }
  } catch {}
  
  const allPages = [...staticPages, ...toolPages]
  
  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))
}

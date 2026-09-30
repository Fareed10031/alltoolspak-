import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltoolspk.com'
  
  const staticPages = ['', '/about', '/contact', '/privacy-policy', '/terms', '/privacy', '/cookies', '/disclaimer']
  
  let tools: string[] = []
  try {
    const toolsPath = path.join(process.cwd(), 'app', 'tools')
    const folders = fs.readdirSync(toolsPath)
    tools = folders.filter(name => {
      const fullPath = path.join(toolsPath, name)
      return fs.statSync(fullPath).isDirectory()
    }).map(name => `/tools/${name}`)
  } catch (e) {
    tools = []
  }

  const allUrls = [...staticPages, ...tools]
  
  return allUrls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: url === '' ? 1 : 0.9,
  }))
}

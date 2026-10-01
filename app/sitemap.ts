import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltoolspk.com'
  const toolsDir = path.join(process.cwd(), 'app', 'tools')
  
  let allTools: string[] = []
  
  try {
    // Only include folders that actually have a page.tsx - prevents 404
    allTools = fs.readdirSync(toolsDir).filter((name) => {
      const fullPath = path.join(toolsDir, name)
      if (!fs.statSync(fullPath).isDirectory()) return false
      return fs.existsSync(path.join(fullPath, 'page.tsx'))
    })
  } catch (e) {
    allTools = []
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...allTools.map((tool) => ({
      url: `${baseUrl}/tools/${tool}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ]
}

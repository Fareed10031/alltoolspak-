import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alltoolspk.com'
  const appDir = path.join(process.cwd(), 'app')
  const toolsDir = path.join(appDir, 'tools')

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Scan top-level app directories
  try {
    if (fs.existsSync(appDir)) {
      const topEntries = fs.readdirSync(appDir, { withFileTypes: true })
      topEntries.forEach((entry) => {
        if (!entry.isDirectory()) return
        const name = entry.name
        if (
          name.startsWith('(') ||
          name.startsWith('_') ||
          name === 'api' ||
          name.startsWith('.')
        ) {
          return
        }

        const pagePath = path.join(appDir, name, 'page.tsx')
        const pagePathJs = path.join(appDir, name, 'page.js')

        if (fs.existsSync(pagePath) || fs.existsSync(pagePathJs)) {
          urls.push({
            url: `${baseUrl}/${name}`,
            lastModified: new Date(),
            changeFrequency: (name === 'tools' ? 'daily' : 'monthly') as const,
            priority: name === 'tools' ? 0.95 : 0.7,
          })
        }
      })
    }
  } catch (e) {
    console.error('Error scanning appDir in sitemap:', e)
  }

  // Scan app/tools subdirectories
  try {
    if (fs.existsSync(toolsDir)) {
      const toolEntries = fs.readdirSync(toolsDir, { withFileTypes: true })
      toolEntries.forEach((entry) => {
        if (!entry.isDirectory()) return
        const name = entry.name
        if (
          name.startsWith('(') ||
          name.startsWith('_') ||
          name.startsWith('[') ||
          name.startsWith('.')
        ) {
          return
        }

        const pagePath = path.join(toolsDir, name, 'page.tsx')
        const pagePathJs = path.join(toolsDir, name, 'page.js')

        if (fs.existsSync(pagePath) || fs.existsSync(pagePathJs)) {
          urls.push({
            url: `${baseUrl}/tools/${name}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
          })
        }
      })
    }
  } catch (e) {
    console.error('Error scanning toolsDir in sitemap:', e)
  }

  return urls
}

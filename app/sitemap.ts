import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dreamai-eight.vercel.app'

    // Core routes
    const routes = [
        '',
        '/interpretation',
        '/mbti',
        '/past-life',
        '/soulmate',
        '/face-passport',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    return routes
}

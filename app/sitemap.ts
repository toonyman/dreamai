import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dreamai.vercel.app'
    const languages = ['en', 'ko', 'es', 'ja']

    const routes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/interpretation`,
            lastModified: new Date(),
            changeFrequency: 'always' as const,
            priority: 0.8,
        },
    ]

    // Add language-specific routes
    const languageRoutes = languages.flatMap(lang => [
        {
            url: `${baseUrl}/${lang}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
    ])

    return [...routes, ...languageRoutes]
}

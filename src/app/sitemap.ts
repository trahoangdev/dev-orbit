import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/api'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()

    const postsUrls = posts.map((post) => ({
        url: `${SITE_URL}/posts/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: SITE_URL,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${SITE_URL}/about`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...postsUrls,
    ]
}

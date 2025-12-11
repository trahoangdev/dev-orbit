import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/api'
import { SITE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts()

    // Get unique tags for tag pages
    const uniqueTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])))

    const postsUrls = posts.map((post) => ({
        url: `${SITE_URL}/posts/${post.slug}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    const tagUrls = uniqueTags.map((tag) => ({
        url: `${SITE_URL}/tags/${tag}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    // Calculate total pages for pagination
    const POSTS_PER_PAGE = 6
    const totalPages = Math.ceil((posts.length - 1) / POSTS_PER_PAGE)
    const paginationUrls = Array.from({ length: totalPages - 1 }, (_, i) => ({
        url: `${SITE_URL}/page/${i + 2}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
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
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/certificates`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/tags`,
            lastModified: new Date().toISOString(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        ...postsUrls,
        ...tagUrls,
        ...paginationUrls,
    ]
}

import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/'], // Example of blocking private routes
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}

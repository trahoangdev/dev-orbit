// Script chạy sau khi build để generate sitemap và RSS feed
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://devorbitblog.vercel.app";
const SITE_NAME = "DevOrbit";
const SITE_DESCRIPTION = "DevOrbit — Blog về lập trình Java, JavaScript, TypeScript và các công nghệ web hiện đại. Chia sẻ kiến thức Spring Boot, React, Next.js từ một Fullstack Developer.";
const AUTHOR_NAME = "Hoàng Trọng Trà";
const AUTHOR_EMAIL = "trahoangdev@gmail.com";

const postsDirectory = path.join(process.cwd(), "_posts");
const publicDir = path.join(process.cwd(), "public");

function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs
    .map((slug) => {
      const realSlug = slug.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, slug);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return { ...data, slug: realSlug };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

function generateSitemap(posts) {
  // Get unique tags
  const uniqueTags = [...new Set(posts.flatMap((p) => p.tags || []))];

  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/about", priority: "0.9", changefreq: "monthly" },
    { url: "/certificates", priority: "0.7", changefreq: "monthly" },
    { url: "/tags", priority: "0.7", changefreq: "weekly" },
  ];

  const postUrls = posts.map((post) => ({
    url: `/posts/${post.slug}`,
    priority: "0.8",
    changefreq: "weekly",
    lastmod: post.date,
  }));

  const tagUrls = uniqueTags.map((tag) => ({
    url: `/tags/${tag}`,
    priority: "0.6",
    changefreq: "weekly",
  }));

  const allUrls = [...staticPages, ...postUrls, ...tagUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
      .map(
        (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
          }
  </url>`
      )
      .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap.trim());
  console.log("✅ Generated sitemap.xml");
}

function generateRssFeed(posts) {
  const feedItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${AUTHOR_EMAIL} (${post.author?.name || AUTHOR_NAME})</author>
      <category>${(post.tags || []).join(", ")}</category>
      <enclosure url="${SITE_URL}${post.coverImage}" type="image/jpeg" />
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>vi-VN</language>
    <copyright>Copyright ${new Date().getFullYear()} ${AUTHOR_NAME}</copyright>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/assets/logo/logo.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDir, "feed.xml"), feed.trim());
  console.log("✅ Generated feed.xml");
}

// Main
const posts = getAllPosts();
// generateSitemap(posts); // Use App Router sitemap.ts instead
generateRssFeed(posts);
console.log(`📝 Processed ${posts.length} posts`);

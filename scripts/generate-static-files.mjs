// Script chạy sau khi build để generate sitemap và RSS feed
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://devorbit.dev";
const SITE_NAME = "DevOrbit";
const SITE_DESCRIPTION = "DevOrbit — Blog về lập trình Java, JavaScript, TypeScript và các công nghệ web hiện đại.";

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
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "daily" },
    { url: "/about", priority: "0.8", changefreq: "monthly" },
  ];

  const postUrls = posts.map((post) => ({
    url: `/posts/${post.slug}`,
    priority: "0.9",
    changefreq: "weekly",
    lastmod: post.date,
  }));

  const allUrls = [...staticPages, ...postUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${
      page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""
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
      <author>${post.author?.name || "trahoangdev"}</author>
    </item>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDir, "feed.xml"), feed.trim());
  console.log("✅ Generated feed.xml");
}

// Main
const posts = getAllPosts();
generateSitemap(posts);
generateRssFeed(posts);
console.log(`📝 Processed ${posts.length} posts`);

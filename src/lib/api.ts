import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

const requiredFields = [
  "title",
  "date",
  "coverImage",
  "excerpt",
  "ogImage",
  "author",
] as const;

const validateFrontMatter = (data: Record<string, unknown>, slug: string) => {
  const missing = requiredFields.filter((key) => data[key] === undefined);
  if (missing.length) {
    throw new Error(
      `Missing front matter fields (${missing.join(
        ", ",
      )}) in markdown file: ${slug}`,
    );
  }

  const author = data.author as Record<string, unknown>;
  if (!author?.name || !author?.picture) {
    throw new Error(
      `Invalid author front matter in markdown file: ${slug} (name and picture required)`,
    );
  }

  const ogImage = data.ogImage as Record<string, unknown>;
  if (!ogImage?.url) {
    throw new Error(
      `Invalid ogImage front matter in markdown file: ${slug} (ogImage.url required)`,
    );
  }
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    validateFrontMatter(data, realSlug);
    return { ...data, slug: realSlug, content } as Post;
  } catch (error) {
    console.error(`Error reading post "${realSlug}":`, error);
    return null;
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getMorePosts(slug: string) {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return { nextPost, prevPost };
}

export function getRelatedPosts(slug: string): Post[] {
  const currentPost = getPostBySlug(slug);
  if (!currentPost || !currentPost.tags) return [];

  const allPosts = getAllPosts();

  return allPosts
    .filter(post => post.slug !== slug && post.tags?.some(tag => currentPost.tags?.includes(tag)))
    .sort((a, b) => {
      // Sort by number of matching tags first
      const aMatches = a.tags?.filter(tag => currentPost.tags?.includes(tag)).length || 0;
      const bMatches = b.tags?.filter(tag => currentPost.tags?.includes(tag)).length || 0;
      return bMatches - aMatches;
    })
    .slice(0, 3); // Limit to 3 related posts
}

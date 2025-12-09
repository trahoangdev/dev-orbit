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

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    throw new Error(`Unable to read markdown file for slug "${realSlug}": ${error}`);
  }

  const { data, content } = matter(fileContents);
  validateFrontMatter(data, realSlug);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllPosts,
  getPostBySlug,
  getMorePosts,
  getRelatedPosts,
} from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import Link from "next/link";
import Image from "next/image";
import { TableOfContents } from "@/app/_components/table-of-contents";
import { parseHeadings } from "@/lib/toc";
import { SocialShare } from "@/app/_components/social-share";
import { Comments } from "@/app/_components/comments";
import { Breadcrumbs } from "@/app/_components/breadcrumbs";
import { SITE_URL } from "@/lib/constants";

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  const toc = parseHeadings(post.content || "");
  const { nextPost, prevPost } = getMorePosts(params.slug);
  const relatedPosts = getRelatedPosts(params.slug);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Alert preview={post.preview} />
      <Container>
        <Header />

        <article className="mb-32">
          <Breadcrumbs items={[{ label: post.title }]} />

          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            readingTime={post.readingTime?.text}
            wordCount={post.wordCount}
          />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                datePublished: post.date,
                dateModified: post.date,
                description: post.excerpt,
                image: [`${SITE_URL}${post.ogImage.url}`],
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${SITE_URL}/posts/${post.slug}`,
                },
                author: {
                  "@type": "Person",
                  name: post.author.name,
                  image: `${SITE_URL}${post.author.picture}`,
                  url: "https://github.com/trahoangdev",
                },
                publisher: {
                  "@type": "Person",
                  name: post.author.name,
                  logo: {
                    "@type": "ImageObject",
                    url: `${SITE_URL}/assets/logo/logo.png`,
                  },
                },
                wordCount: post.wordCount,
                keywords: post.tags?.join(", "),
                articleSection: post.tags?.[0] || "Technology",
                inLanguage: "vi-VN",
              }),
            }}
          />

          <div className="pt-8 lg:grid lg:grid-cols-12 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <PostBody content={content} />
              <SocialShare slug={post.slug} title={post.title} />
              <Comments />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-900 dark:hover:text-blue-300"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Next / Prev Navigation */}
              <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                {prevPost && (
                  <Link
                    href={`/posts/${prevPost.slug}`}
                    className="group block rounded-xl border border-slate-200 p-6 text-left transition-colors hover:border-blue-500 dark:border-slate-800"
                  >
                    <span className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
                      ← Bài trước
                    </span>
                    <h4 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {prevPost.title}
                    </h4>
                  </Link>
                )}

                {nextPost && (
                  <Link
                    href={`/posts/${nextPost.slug}`}
                    className={`group block rounded-xl border border-slate-200 p-6 text-right transition-colors hover:border-blue-500 dark:border-slate-800 ${!prevPost ? "md:col-start-2" : ""}`}
                  >
                    <span className="mb-2 block text-sm text-slate-500 dark:text-slate-400">
                      Bài tiếp theo →
                    </span>
                    <h4 className="line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {nextPost.title}
                    </h4>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar TOC */}
            <div className="relative hidden lg:col-span-4 lg:block">
              <TableOfContents items={toc} />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-32 border-t border-slate-200 pt-16 dark:border-slate-800">
            <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
              Bài viết liên quan
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <div key={post.slug} className="group">
                  <div className="mb-4 aspect-[16/9] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Link href={`/posts/${post.slug}`}>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>
                  </div>
                  <h3 className="mb-2 text-xl font-bold leading-snug">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="text-slate-900 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(post.date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | DevOrbit`;
  const description = post.excerpt || `Bài viết ${post.title} tại DevOrbit`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(
            new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          )}&author=${encodeURIComponent(post.author.name)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `${SITE_URL}/posts/${params.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(
          new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        )}&author=${encodeURIComponent(post.author.name)}`,
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

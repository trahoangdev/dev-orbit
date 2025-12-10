import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getMorePosts, getRelatedPosts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import Link from "next/link";
import { TableOfContents } from "@/app/_components/table-of-contents";
import { parseHeadings } from "@/lib/toc";
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
    <main className="bg-white dark:bg-slate-950 min-h-screen">
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
                image: [post.ogImage.url],
                author: {
                  "@type": "Person",
                  name: post.author.name,
                  image: post.author.picture,
                },
              }),
            }}
          />

          <div className="lg:grid lg:grid-cols-12 lg:gap-12 pt-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <PostBody content={content} />
              <Comments />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${tag}`}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 px-3 py-1 rounded-full text-sm font-medium transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Next / Prev Navigation */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {prevPost && (
                  <Link href={`/posts/${prevPost.slug}`} className="group block p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-left">
                    <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">← Previous Article</span>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {prevPost.title}
                    </h4>
                  </Link>
                )}

                {nextPost && (
                  <Link href={`/posts/${nextPost.slug}`} className={`group block p-6 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-blue-500 transition-colors text-right ${!prevPost ? 'md:col-start-2' : ''}`}>
                    <span className="text-sm text-slate-500 dark:text-slate-400 block mb-2">Next Article →</span>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {nextPost.title}
                    </h4>
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar TOC */}
            <div className="hidden lg:block lg:col-span-4 relative">
              <TableOfContents items={toc} />
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-32 border-t border-slate-200 dark:border-slate-800 pt-16">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                <div key={post.slug} className="group">
                  <div className="bg-slate-100 dark:bg-slate-800 aspect-[16/9] mb-4 rounded-lg overflow-hidden">
                    <Link href={`/posts/${post.slug}`}>
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                  </div>
                  <h3 className="font-bold text-xl mb-2 leading-snug">
                    <Link href={`/posts/${post.slug}`} className="text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
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
          new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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

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
import { PostPreview } from "@/app/_components/post-preview"; // Assuming PostPreview is exported or I'll use inline if simple

export default async function Post({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");
  const { nextPost, prevPost } = getMorePosts(params.slug);
  const relatedPosts = getRelatedPosts(params.slug);

  return (
    <main className="bg-white dark:bg-slate-950 min-h-screen">
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <PostBody content={content} />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="max-w-2xl mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
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
          <div className="max-w-2xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-32">
            <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                <div key={post.slug} className="group">
                  <div className="bg-slate-100 dark:bg-slate-800 aspect-[16/9] mb-4 rounded-lg overflow-hidden">
                    {/* Using simple img or fallback if coverImage is vital, assuming PostPreview components handle it best, let's reuse PostPreview logic but simplified here specifically for Related */}
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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | DevOrbit`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

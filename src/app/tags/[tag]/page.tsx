import { getAllPosts } from "@/lib/api";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { SITE_URL, SITE_NAME } from "@/lib/constants";

type Props = {
    params: Promise<{ tag: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const tag = params.tag;
    const posts = getAllPosts();
    const filteredPosts = posts.filter((post) => post.tags?.includes(tag));
    const postCount = filteredPosts.length;

    const title = `${tag.charAt(0).toUpperCase() + tag.slice(1)} - ${postCount} bài viết`;
    const description = `Tổng hợp ${postCount} bài viết về ${tag} tại DevOrbit. Khám phá kiến thức, hướng dẫn và best practices về ${tag}.`;

    return {
        title,
        description,
        keywords: [tag, `học ${tag}`, `hướng dẫn ${tag}`, "lập trình", "DevOrbit"],
        openGraph: {
            title: `#${tag} | ${SITE_NAME}`,
            description,
            url: `${SITE_URL}/tags/${tag}`,
            type: "website",
            images: [
                {
                    url: `${SITE_URL}/api/og?title=${encodeURIComponent(`#${tag}`)}&date=${encodeURIComponent(`${postCount} bài viết`)}&author=DevOrbit`,
                    width: 1200,
                    height: 630,
                    alt: `Bài viết về ${tag}`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `#${tag} | ${SITE_NAME}`,
            description,
        },
        alternates: {
            canonical: `${SITE_URL}/tags/${tag}`,
        },
    };
}

export default async function TagPage(props: Props) {
    const params = await props.params;
    const posts = getAllPosts();
    const tag = params.tag;
    const filteredPosts = posts.filter((post) => post.tags?.includes(tag));

    if (filteredPosts.length === 0) {
        return notFound();
    }

    const [heroPost, ...morePosts] = filteredPosts;

    return (
        <main>
            <Container>
                <Header />

                <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 capitalize">
                        #{tag}.
                    </h1>
                    <p className="text-lg mt-4 md:mt-0 max-w-lg text-slate-600 dark:text-slate-400 font-medium">
                        {filteredPosts.length} stories about {tag}
                    </p>
                </section>

                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.coverImage}
                        date={heroPost.date}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                    />
                )}

                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </main>
    );
}

export function generateStaticParams() {
    const posts = getAllPosts();
    const uniqueTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));
    return uniqueTags.map((tag) => ({ tag }));
}

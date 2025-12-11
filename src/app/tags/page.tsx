import { getAllPosts } from "@/lib/api";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Chủ đề bài viết - Tags",
    description: "Khám phá các chủ đề bài viết về Java, Spring Boot, JavaScript, TypeScript, React, Next.js và nhiều công nghệ web hiện đại khác tại DevOrbit.",
    keywords: ["tags", "chủ đề", "Java", "Spring Boot", "JavaScript", "TypeScript", "React", "Next.js"],
    openGraph: {
        title: `Chủ đề bài viết | ${SITE_NAME}`,
        description: "Khám phá các chủ đề bài viết về lập trình và công nghệ web hiện đại.",
        url: `${SITE_URL}/tags`,
        type: "website",
    },
    alternates: {
        canonical: `${SITE_URL}/tags`,
    },
};

export default function TagsPage() {
    const posts = getAllPosts();
    const allTags = posts.flatMap((post) => post.tags || []);

    const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sortedTags = Object.keys(tagCounts).sort();

    return (
        <main>
            <Container>
                <Header />
                <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                        Chủ đề.
                    </h1>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {sortedTags.map((tag) => (
                        <Link
                            key={tag}
                            href={`/tags/${tag}`}
                            className="group flex flex-col justify-between p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500 transition-colors shadow-sm"
                        >
                            <div>
                                <h3 className="text-3xl font-bold capitalize mb-2 group-hover:text-blue-600 transition-colors">
                                    {tag}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    Xem các bài viết về {tag}
                                </p>
                            </div>
                            <div className="mt-8 flex items-center text-sm font-medium text-slate-900 dark:text-slate-200">
                                <span>{tagCounts[tag]} bài viết</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </main>
    );
}

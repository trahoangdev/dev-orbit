import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { MoreStories } from "@/app/_components/more-stories";
import Pagination from "@/app/_components/pagination";
import { getAllPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const POSTS_PER_PAGE = 6;

type Params = Promise<{ page: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { page } = await params;
    const pageNumber = parseInt(page);
    
    return {
        title: `Trang ${pageNumber} - Danh sách bài viết`,
        description: `Khám phá các bài viết về lập trình tại DevOrbit - Trang ${pageNumber}. Java, Spring Boot, JavaScript, TypeScript, React và Next.js.`,
        openGraph: {
            title: `Trang ${pageNumber} | ${SITE_NAME}`,
            description: `Danh sách bài viết - Trang ${pageNumber}`,
            url: `${SITE_URL}/page/${pageNumber}`,
            type: "website",
        },
        alternates: {
            canonical: `${SITE_URL}/page/${pageNumber}`,
        },
        robots: {
            index: pageNumber <= 5, // Only index first 5 pages
            follow: true,
        },
    };
}

export default async function Page({ params }: { params: Params }) {
    const { page } = await params;
    const pageNumber = parseInt(page);

    const allPosts = getAllPosts();
    const totalPosts = allPosts.length;
    // Account for Hero Post on home page (Index 0)
    // Page 2 starts from index 1 + POSTS_PER_PAGE.
    // wait logic: 
    // Page 1: Hero (index 0) + [1...6]
    // Page 2: [7...12]
    // Page 3: [13...18]

    // So skip formula:
    // If page > 1: skip = 1 (Hero) + (page - 1) * POSTS_PER_PAGE?
    // Let's check: 
    // Page 1: skip 1. slice(1, 7). (This is handled in global `page.tsx`)
    // Page 2: should show items after Page 1.
    // Page 1 ends at index (1 + 6) = 7.
    // So Page 2 starts at index 7.

    // Formula: start = 1 + (pageNumber - 1) * POSTS_PER_PAGE
    // Valid?
    // Page 1: 1 + 0 = 1. Correct. (For Home Page)
    // Page 2: 1 + 6 = 7. Correct.

    if (isNaN(pageNumber) || pageNumber < 1) {
        return notFound();
    }

    // Calculate Pagination
    const totalMores = totalPosts - 1; // Exclude Hero
    const totalPages = Math.ceil(totalMores / POSTS_PER_PAGE);

    if (pageNumber > totalPages) {
        return notFound();
    }

    const startIndex = 1 + (pageNumber - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentPosts = allPosts.slice(startIndex, endIndex);

    return (
        <main>
            <Container>
                <Header />
                <div className="mb-8 md:mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-4">Archive - Page {pageNumber}</h1>
                </div>

                {currentPosts.length > 0 && <MoreStories posts={currentPosts} />}

                <Pagination currentPage={pageNumber} totalPages={totalPages} />
            </Container>
        </main>
    );
}

export async function generateStaticParams() {
    const allPosts = getAllPosts();
    const totalMores = allPosts.length - 1;
    const totalPages = Math.ceil(totalMores / POSTS_PER_PAGE);

    // Generate params for page 2, 3... (Page 1 is handled by root page.tsx)
    const paths = [];
    for (let i = 2; i <= totalPages; i++) {
        paths.push({ page: i.toString() });
    }
    return paths;
}

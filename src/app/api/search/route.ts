import { getAllPosts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = getAllPosts();

    const searchIndex = posts.map((post) => ({
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        slug: post.slug,
        tags: post.tags,
        coverImage: post.coverImage,
    }));

    return NextResponse.json(searchIndex);
}

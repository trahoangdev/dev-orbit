import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import Header from "@/app/_components/header";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import Pagination from "@/app/_components/pagination";
import { POSTS_PER_PAGE } from "@/lib/constants";

export default function Index() {
  const allPosts = getAllPosts();

  // Logic for Page 1: 
  // - Show HeroPost (1st post)
  // - Show next POSTS_PER_PAGE posts in MoreStories
  // - Total Pagination pages calculated based on remaining posts

  // However, for standard pagination design often "Hero Post" is only on Page 1.
  // Let's assume Page 1 layout: Hero + (PageSize) posts.
  // Actually, standard blog usually has Hero + Grid. 

  if (!allPosts.length) {
    return (
      <main>
        <Container>
          <Header />
          <Intro />
          <p className="text-lg">No posts yet. Add a markdown file in `_posts`.</p>
        </Container>
      </main>
    );
  }

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1, 1 + POSTS_PER_PAGE);

  const totalPosts = allPosts.length;
  // Calculate total pages. Note: First post is Hero. Remaining are paginated.
  // Page 1: Hero + slice(1, 1+6). 
  // Future Page 2: slice(7, 7+6)...
  // Total items for pagination = totalPosts - 1 (Hero).
  const totalMores = totalPosts - 1;
  const totalPages = Math.ceil(totalMores / POSTS_PER_PAGE);

  return (
    <main>
      <Container>
        <Header />
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          tags={heroPost.tags}
          readingTime={heroPost.readingTime}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}

        {totalPages > 1 && (
          <Pagination currentPage={1} totalPages={totalPages} />
        )}
      </Container>
    </main>
  );
}

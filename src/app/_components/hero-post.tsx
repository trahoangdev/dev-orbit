import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  tags?: string[];
  readingTime?: {
    text: string;
  };
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags,
  readingTime,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} priority={true} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight font-bold tracking-tighter hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Link href={`/posts/${slug}`} className="">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg flex flex-col gap-3">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <DateFormatter dateString={date} />
              {readingTime?.text && (
                <>
                  <span>•</span>
                  <span>{readingTime.text}</span>
                </>
              )}
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="text-sm font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4 text-slate-600 dark:text-slate-300">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}

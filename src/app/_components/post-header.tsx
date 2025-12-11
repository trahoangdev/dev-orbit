import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  readingTime?: string;
  wordCount?: number;
};

export function PostHeader({ title, coverImage, date, author, readingTime, wordCount }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400">
          <DateFormatter dateString={date} />
          {readingTime && (
            <>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime}
              </span>
            </>
          )}
          {wordCount && (
            <>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>{wordCount.toLocaleString('vi-VN')} từ</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

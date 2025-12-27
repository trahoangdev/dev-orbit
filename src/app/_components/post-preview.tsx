"use client";

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { motion } from "framer-motion";

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

export function PostPreview({
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
    <motion.div
      className="group flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-5 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-md transition-shadow duration-300">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>

      <div className="flex items-center justify-between gap-4 mb-3">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-xs font-medium text-slate-400 dark:text-slate-500 flex items-center gap-2 ml-auto">
          <DateFormatter dateString={date} />
          {readingTime?.text && (
            <>
              <span>•</span>
              <span>{readingTime.text}</span>
            </>
          )}
        </div>
      </div>

      <h3 className="text-3xl mb-3 leading-tight font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <Link href={`/posts/${slug}`} className="">
          {title}
        </Link>
      </h3>

      <p className="text-lg leading-relaxed mb-4 text-slate-600 dark:text-slate-400 line-clamp-3">
        {excerpt}
      </p>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </motion.div>
  );
}

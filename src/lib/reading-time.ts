import { WORDS_PER_MINUTE } from "./constants";

/**
 * Calculate estimated reading time for a given text
 * @param content - The text content (markdown or plain text)
 * @returns Object with minutes and text representation
 */
export function calculateReadingTime(content: string): {
  minutes: number;
  text: string;
} {
  // Remove code blocks and HTML tags for more accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Convert links to text
    .replace(/[#*`~]/g, "") // Remove markdown symbols
    .trim();

  const words = cleanContent.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return {
    minutes,
    text: minutes <= 1 ? "1 phút đọc" : `${minutes} phút đọc`,
  };
}

/**
 * Get word count from content
 */
export function getWordCount(content: string): number {
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();

  return cleanContent.split(/\s+/).filter((word) => word.length > 0).length;
}

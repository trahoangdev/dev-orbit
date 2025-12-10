import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypeWindow } from "./rehype-window";
import { rehypeImgLazy } from "./rehype-img-lazy";

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: false, // We handle background in our wrapper
    })
    .use(rehypeWindow)
    .use(rehypeImgLazy)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);
  return result.toString();
}

"use client";

import { useEffect } from "react";
import cn from "classnames";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  useEffect(() => {
    const handleCopy = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('.copy-btn');
      if (!btn) return;

      const wrapper = btn.closest('.mockup-code-window');
      if (!wrapper) return;

      // Select the code element (pre or code)
      // Since our structure is wrapper > div (content) > pre
      const pre = wrapper.querySelector('pre');
      if (!pre) return;

      const text = pre.textContent || '';

      try {
        await navigator.clipboard.writeText(text);

        // Show check icon
        const originalIcon = btn.querySelector('.js-copy-icon');
        const checkIcon = btn.querySelector('.js-check-icon');

        if (originalIcon && checkIcon) {
          originalIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');

          setTimeout(() => {
            originalIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
          }, 2000);
        }
      } catch (err) {
        console.error('Failed to copy!', err);
      }
    };

    // Attach event listener to a static parent or document body if specific root not easily accessible via ref in pure HTML string
    // But we can attach to the outer div
    const container = document.querySelector('.markdown-body-container');
    if (container) {
      container.addEventListener('click', handleCopy as any);
    } else {
      // Fallback or attach to body but filtered
      document.body.addEventListener('click', handleCopy as any);
    }

    return () => {
      if (container) {
        container.removeEventListener('click', handleCopy as any);
      } else {
        document.body.removeEventListener('click', handleCopy as any);
      }
    };
  }, [content]);

  return (
    <div className="max-w-2xl mx-auto markdown-body-container">
      <div
        className="prose prose-lg prose-slate dark:prose-invert max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-img:rounded-xl prose-img:shadow-lg
        
        prose-code:text-slate-800 dark:prose-code:text-slate-200 prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        
        [&_pre_code]:bg-transparent dark:[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
        
        prose-pre:!bg-transparent prose-pre:!shadow-none prose-pre:!border-none prose-pre:!m-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

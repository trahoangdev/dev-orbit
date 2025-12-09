"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function Comments() {
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    /* 
  // UNCOMMENT THIS SECTION AFTER CONFIGURING GISCUS
  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    // REPLACE THESE WITH YOUR OWN REPO CONFIG
    // Visit https://giscus.app to generate your config
    script.setAttribute("data-repo", "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"); 
    script.setAttribute("data-repo-id", "YOUR_REPO_ID"); 
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "YOUR_CATEGORY_ID"); 
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "vi"); // Vietnamese

    ref.current.appendChild(script);
  }, []); 

  // Update theme dynamically
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: theme === "dark" ? "dark" : "light" } } },
      "https://giscus.app"
    );
  }, [theme]);
  */

    // If you don't have a repo configured yet, this will fail gracefully or show 404 in console.
    // For now, we render a placeholder.
    return (
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Bình luận</h3>
            {/* Placeholder for Giscus Setup */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <p className="text-slate-500 dark:text-slate-400 mb-2">
                    Hệ thống bình luận đang được bảo trì hoặc chưa cấu hình.
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    (Dev Note: Vui lòng cập nhật repo config trong <code>components/comments.tsx</code> để kích hoạt Giscus)
                </p>
            </div>
            <div ref={ref} className="min-h-[200px] hidden" />
        </div>
    );
}

"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

export function Comments() {
    const { resolvedTheme } = useTheme();
    const ref = useRef<HTMLDivElement>(null);
    const mounted = useRef(false);

    useEffect(() => {
        if (!ref.current || mounted.current) return;

        mounted.current = true; // Prevent double injection in Strict Mode

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.async = true;
        script.crossOrigin = "anonymous";

        // CẤU HÌNH GISCUS
        script.setAttribute("data-repo", "trahoangdev/dev-orbit");
        script.setAttribute("data-repo-id", "R_kgDOQlfd2g");
        script.setAttribute("data-category", "General");
        script.setAttribute("data-category-id", "DIC_kwDOQlfd2s4CzlpO");
        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");

        // Set initial theme based on resolvedTheme
        // Default to 'light' if undefined during SSR/Hydration, but useEffect runs on client so it should be fine.
        const theme = resolvedTheme === "dark" ? "transparent_dark" : "light";
        script.setAttribute("data-theme", theme);

        script.setAttribute("data-lang", "vi");

        ref.current.appendChild(script);
    }, []);

    // Update theme dynamically
    useEffect(() => {
        const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
        if (!iframe) return;

        const newTheme = resolvedTheme === "dark" ? "transparent_dark" : "light";

        iframe.contentWindow?.postMessage(
            { giscus: { setConfig: { theme: newTheme } } },
            "https://giscus.app"
        );
    }, [resolvedTheme]);

    return (
        <div className="mt-16">
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 md:p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Bình luận</h3>
                <div ref={ref} className="min-h-[160px]" />
            </div>
        </div>
    );
}

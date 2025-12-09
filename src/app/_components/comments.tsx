"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function Comments() {
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!ref.current || ref.current.hasChildNodes()) return;

        const script = document.createElement("script");
        script.src = "https://giscus.app/client.js";
        script.async = true;
        script.crossOrigin = "anonymous";

        // CẤU HÌNH GISCUS
        // 1. Truy cập https://giscus.app
        // 2. Nhập repo: trahoangdev/dev-orbit
        // 3. Cấp quyền cho Giscus App và kích hoạt Discussions
        // 4. Chọn Category "General"
        // 5. Copy data-repo-id và data-category-id vào bên dưới:

        script.setAttribute("data-repo", "trahoangdev/dev-orbit");

        // TODO: Thay thế 2 giá trị này bằng ID thật lấy từ giscus.app
        script.setAttribute("data-repo-id", "R_kgDOQlfd2g"); // Placeholder ID (cần update)
        script.setAttribute("data-category", "General");
        script.setAttribute("data-category-id", "DIC_kwDOQlfd2s4CzlpO"); // Placeholder ID (cần update)

        script.setAttribute("data-mapping", "pathname");
        script.setAttribute("data-strict", "0");
        script.setAttribute("data-reactions-enabled", "1");
        script.setAttribute("data-emit-metadata", "0");
        script.setAttribute("data-input-position", "top");
        script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
        script.setAttribute("data-lang", "vi");

        ref.current.appendChild(script);
    }, []);

    // Cập nhật theme khi người dùng đổi chế độ Light/Dark
    useEffect(() => {
        const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");
        if (!iframe) return;
        iframe.contentWindow?.postMessage(
            { giscus: { setConfig: { theme: theme === "dark" ? "dark" : "light" } } },
            "https://giscus.app"
        );
    }, [theme]);

    return (
        <div className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Bình luận</h3>
            <div ref={ref} className="min-h-[160px]" />
        </div>
    );
}

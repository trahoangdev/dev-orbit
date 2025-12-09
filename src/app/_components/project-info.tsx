"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import cn from "classnames";

export function ProjectInfo() {
    const [isOpen, setIsOpen] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 left-8 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 z-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                aria-label="Project Information"
                title="Thông tin dự án"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                </svg>
            </button>

            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 z-[99] bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300",
                    {
                        "opacity-100 visible": isOpen,
                        "opacity-0 invisible pointer-events-none": !isOpen,
                    }
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Dialog */}
            <div
                className={cn(
                    "fixed left-1/2 top-1/2 z-[100] w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform p-6 transition-all duration-300",
                    {
                        "opacity-100 scale-100": isOpen,
                        "opacity-0 scale-95 pointer-events-none": !isOpen,
                    }
                )}
            >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
                    {/* Header */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                                <Image
                                    src="/assets/logo/logo.png"
                                    alt="DevOrbit Logo"
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                />
                            </span>
                            DevOrbit - Blog Project
                        </h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Dự án Blog cá nhân được xây dựng với mục tiêu tối ưu hóa trải nghiệm đọc, hiệu năng cao và thiết kế hiện đại.
                        </p>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-xs">Công nghệ sử dụng</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Next.js 15", "React 19", "Tailwind CSS", "TypeScript", "Markdown"].map((tech) => (
                                    <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 pt-0.5 text-slate-700 dark:text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                </div>
                                <div className="text-sm">
                                    <strong className="block text-slate-900 dark:text-white mb-1">Author</strong>
                                    <span className="text-slate-600 dark:text-slate-400">Hoàng Trọng Trà - Developer đam mê chia sẻ kiến thức về Web & System Design.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            © 2025 DevOrbit. Open Source. trahoangdev
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

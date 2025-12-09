"use client";

import { useEffect, useState } from "react";
import { TOCItem } from "@/lib/toc";
import cn from "classnames";

type Props = {
    items: TOCItem[];
};

export function TableOfContents({ items }: Props) {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" }
        );

        items.forEach((item) => {
            const element = document.getElementById(item.slug);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [items]);

    if (items.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-10rem)] overflow-y-auto w-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                Mục lục
            </h3>
            <ul className="space-y-3 text-sm border-l border-slate-200 dark:border-slate-800">
                {items.map((item) => (
                    <li key={item.slug}>
                        <a
                            href={`#${item.slug}`}
                            className={cn(
                                "block pl-4 transition-colors hover:text-slate-900 dark:hover:text-white border-l-2 -ml-[1px]",
                                activeId === item.slug
                                    ? "text-blue-600 dark:text-blue-400 font-medium border-blue-600 dark:border-blue-400"
                                    : "text-slate-500 dark:text-slate-400 border-transparent"
                            )}
                            style={{ paddingLeft: `${(item.level - 2) * 1 + 1}rem` }}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

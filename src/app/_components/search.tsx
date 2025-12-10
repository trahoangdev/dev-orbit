"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

type SearchResult = {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    tags: string[];
    coverImage: string;
};

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [allPosts, setAllPosts] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Keyboard shortcut (Cmd/Ctrl + K)
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && allPosts.length === 0) {
            setLoading(true);
            fetch("/api/search")
                .then((res) => res.json())
                .then((data) => {
                    setAllPosts(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch search index", err);
                    setLoading(false);
                });
        }
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, allPosts.length]);

    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
        } else {
            const lowerQuery = query.toLowerCase();
            const filtered = allPosts.filter((post) =>
                post.title.toLowerCase().includes(lowerQuery) ||
                post.excerpt.toLowerCase().includes(lowerQuery) ||
                post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
            );
            setResults(filtered.slice(0, 5));
        }
    }, [query, allPosts]);

    const handleSelect = (slug: string) => {
        setIsOpen(false);
        router.push(`/posts/${slug}`);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-lg transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-600 outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search posts"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium hidden sm:inline-block">Search...</span>
                <kbd className="hidden md:inline-block text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 text-slate-400">
                    ⌘K
                </kbd>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Search Input */}
                <div className="relative border-b border-slate-200 dark:border-slate-800">
                    <svg className="absolute left-4 top-4 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full bg-transparent p-4 pl-12 text-lg text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
                        placeholder="Search posts..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {loading && (
                        <div className="absolute right-4 top-4 w-5 h-5 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
                    )}
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {query.trim() === "" ? (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                            Type to search across posts, tags, and content...
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-1">
                            {results.map((post) => (
                                <button
                                    key={post.slug}
                                    onClick={() => handleSelect(post.slug)}
                                    className="w-full flex items-start gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left group"
                                >
                                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700">
                                        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                                            {post.title}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <div className="mt-2 flex gap-2">
                                            {post.tags?.slice(0, 2).map((tag: string) => (
                                                <span key={tag} className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                            No results found for "{query}"
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                    <span>Select ↵</span>
                    <span>Close Esc</span>
                </div>
            </div>
        </div>
    );
}

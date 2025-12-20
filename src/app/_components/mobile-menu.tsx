"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Lock body scroll when menu is open
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

    const links = [
        { href: "/", label: "Home" },
        { href: "/tags", label: "Tags" },
        { href: "/certificates", label: "Certificates" },
        { href: "https://trahoangdev.vercel.app/", label: "Portfolio", external: true },
        { href: "/about", label: "About" },
    ];

    return (
        <div className="md:hidden">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 p-2 -mr-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Toggle Menu"
            >
                <div className="w-6 h-6 flex flex-col justify-center gap-[5px]">
                    <span
                        className={cn(
                            "w-full h-0.5 bg-current rounded-full transition-all duration-300",
                            isOpen ? "rotate-45 translate-y-[7px]" : ""
                        )}
                    />
                    <span
                        className={cn(
                            "w-full h-0.5 bg-current rounded-full transition-all duration-300",
                            isOpen ? "opacity-0" : ""
                        )}
                    />
                    <span
                        className={cn(
                            "w-full h-0.5 bg-current rounded-full transition-all duration-300",
                            isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                        )}
                    />
                </div>
            </button>

            {/* Overlay Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Menu Drawer */}
            <div
                className={cn(
                    "fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white dark:bg-slate-950 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out pt-24 px-6 border-l border-slate-100 dark:border-slate-800 flex flex-col",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <nav className="flex flex-col gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            target={link.external ? "_blank" : undefined}
                            className="text-lg font-medium text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="mt-auto pb-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-sm text-slate-400 text-center">
                        © 2025 DevOrbit. trahoangdev
                    </p>
                </div>
            </div>
        </div>
    );
};

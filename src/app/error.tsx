"use client";

import { useEffect } from "react";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <Container>
                <Header />
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] text-center mt-10">
                    <div className="space-y-6 max-w-lg mx-auto">
                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                <path d="M12 9v4" />
                                <path d="M12 17h.01" />
                            </svg>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Hệ thống gặp sự cố!
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                            Đã có lỗi xảy ra trong quá trình xử lý yêu cầu của bạn.
                        </p>
                        <div className="text-sm text-slate-500 font-mono bg-slate-100 dark:bg-slate-900 p-4 rounded-lg overflow-auto max-h-32 text-left">
                            {error.message || "Unknown Error"}
                            {error.digest && <p className="mt-2 text-xs opacity-70">Digest: {error.digest}</p>}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                onClick={reset}
                                className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ring-offset-2 focus:ring-2 ring-slate-400"
                            >
                                Thử lại
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

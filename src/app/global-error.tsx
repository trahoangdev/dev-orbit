"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html>
            <body className="bg-white dark:bg-slate-950 flex items-center justify-center min-h-screen text-slate-900 dark:text-white font-sans">
                <div className="text-center p-6 max-w-md">
                    <h1 className="text-4xl font-bold mb-4">Critial Error</h1>
                    <p className="mb-6 opacity-80">Something went wrong at the system level.</p>
                    <button
                        onClick={() => reset()}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}

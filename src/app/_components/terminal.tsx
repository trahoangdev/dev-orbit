"use client";

import { useEffect, useState } from "react";

export const Terminal = () => {
    const [lines, setLines] = useState<string[]>([]);
    const allLines = [
        "> connecting to server...",
        "> resolving hostname 'trahoangdev'...",
        "> connection established.",
        "> initializing creative protocol...",
        "> access granted.",
        "> welcome, fellow traveler."
    ];

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;

        const startTyping = () => {
            let lineIndex = 0;
            let charIndex = 0;
            let currentLine = "";
            // distinct array to track local state during typing
            const displayedLines: string[] = [];
            setLines([]); // Clear UI at start

            intervalId = setInterval(() => {
                if (lineIndex >= allLines.length) {
                    clearInterval(intervalId);
                    // Wait 3 seconds before restarting
                    timeoutId = setTimeout(() => {
                        startTyping();
                    }, 3000);
                    return;
                }

                const targetLine = allLines[lineIndex];

                if (charIndex < targetLine.length) {
                    currentLine += targetLine[charIndex];

                    // Construct the new state based on displayedLines (previous full lines) + current partial line
                    const newLines = [...displayedLines, currentLine];
                    setLines(newLines);

                    charIndex++;
                } else {
                    // Line finished
                    displayedLines.push(targetLine);
                    setLines([...displayedLines]);

                    lineIndex++;
                    charIndex = 0;
                    currentLine = "";
                }
            }, 50); // Slightly slower typing for better effect at 50ms
        };

        startTyping();

        return () => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto md:mr-0 animate-float group">
            {/* Visual Orbit Effect */}
            <div className="absolute top-1/2 left-[2%] -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[350px] md:h-[350px] -z-10 pointer-events-none">
                {/* Outer Ring */}
                <div className="absolute inset-0 border border-slate-300/30 dark:border-slate-600/30 rounded-full animate-orbit">
                    {/* Planet 1 (Blue) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]"></div>
                    {/* Planet 2 (Purple) */}
                    <div className="absolute bottom-[15%] right-[15%] w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                    {/* Planet 3 (Cyan - Small) */}
                    <div className="absolute top-[40%] left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                    <div className="absolute bottom-[20%] left-[10%] w-1 h-1 bg-emerald-400 rounded-full"></div>
                </div>

                {/* Middle Ring (Faint) */}
                <div className="absolute inset-8 md:inset-10 border border-slate-200/20 dark:border-slate-700/20 rounded-full animate-orbit" style={{ animationDuration: '35s' }}>
                    <div className="absolute top-[20%] right-[10%] w-2 h-2 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(251,146,60,0.8)]"></div>
                    <div className="absolute bottom-[10%] left-[30%] w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                </div>

                {/* Inner Ring */}
                <div className="absolute inset-16 md:inset-20 border border-dashed border-slate-400/20 dark:border-slate-500/20 rounded-full animate-orbit-reverse">
                    {/* Satellite 1 (Gray) */}
                    <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full shadow-[0_0_8px_rgba(148,163,184,0.8)]"></div>
                    {/* Satellite 2 (Red - Small) */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-rose-400 rounded-full shadow-[0_0_8px_rgba(251,113,133,0.8)]"></div>
                    <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-teal-300 rounded-full"></div>
                    <div className="absolute bottom-[30%] right-[5%] w-1.5 h-1.5 bg-yellow-300 rounded-full shadow-[0_0_6px_rgba(253,224,71,0.8)]"></div>
                </div>
            </div>

            <div className="bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-slate-800/50 backdrop-blur-sm">
                <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-2 border-b border-slate-700/50">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <div className="ml-auto text-xs text-slate-400 font-mono">trahoangdev@orbit ~</div>
                </div>
                <div className="p-6 font-mono text-sm md:text-base h-64 text-slate-200 overflow-y-auto flex flex-col gap-2">
                    {lines.map((line, index) => (
                        <div key={index} className="break-words">
                            <span className="text-blue-400 mr-2">$</span>
                            <span className={index === lines.length - 1 ? "typing-effect" : ""}>{line}</span>
                        </div>
                    ))}
                    {lines.length < allLines.length && (
                        <div className="animate-pulse w-2 h-4 bg-slate-500 inline-block"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

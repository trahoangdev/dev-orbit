"use client";

import Link from "next/link";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { ThemeSwitcher } from "./_components/theme-switcher";

export default function NotFound() {
    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden flex flex-col">
            {/* Decorative Background Elements - Coordinates Grid */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(circle, #808080 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <Container>
                <Header />
                <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] text-center mt-10">

                    {/* Orbit Animation behind 404 */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-dashed border-slate-300 dark:border-slate-700 rounded-full animate-orbit"></div>
                        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-dotted border-slate-200 dark:border-slate-800 rounded-full animate-orbit-reverse" style={{ animationDuration: '30s' }}></div>

                        <h1 className="text-[8rem] md:text-[12rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-slate-700 dark:to-slate-900 drop-shadow-sm select-none relative z-10 transition-colors duration-500">
                            404
                        </h1>
                    </div>

                    <div className="space-y-6 max-w-lg mx-auto relative z-20">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Lạc lối trong không gian?
                        </h2>

                        <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                            Tín hiệu bị gián đoạn. Trang bạn đang tìm kiếm có thể đã bị "nghịch lý thời gian" nuốt chửng hoặc di chuyển sang một thiên hà khác.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold rounded-full hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl ring-offset-2 focus:ring-2 ring-slate-400 group"
                            >
                                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                                Quay về Trạm chính
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

import Container from "@/app/_components/container";

export default function Loading() {
    return (
        <main>
            <Container>
                {/* Header Skeleton */}
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-12 mb-10 border-b border-slate-100 dark:border-slate-800 animate-pulse">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        <div className="space-y-2">
                            <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
                    </div>
                </div>

                {/* Hero Post Skeleton */}
                <div className="mb-8 md:mb-16 animate-pulse">
                    <div className="w-full aspect-[2/1] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-8 md:mb-16"></div>
                    <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
                        <div>
                            <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded mb-4 w-3/4"></div>
                            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
                        </div>
                        <div>
                            <div className="space-y-3 mb-4">
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6"></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}

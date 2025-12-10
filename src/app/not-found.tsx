import Link from "next/link";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export default function NotFound() {
    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen">
            <Container>
                <Header />
                <div className="flex flex-col items-center justify-center py-32 text-center">
                    <h1 className="text-9xl font-bold tracking-tighter text-slate-200 dark:text-slate-800 mb-8">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4">
                        Page not found
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mb-10 leading-relaxed">
                        Trang bạn tìm kiếm không tồn tại hoặc đã bị di chuyển.
                    </p>
                    <div className="flex gap-4">
                        <Link
                            href="/"
                            className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-all duration-200"
                        >
                            Trang chủ
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}

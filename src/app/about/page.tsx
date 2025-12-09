import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Về mình",
    description: "Giới thiệu về Hoàng Trọng Trà - Sinh viên năm cuối HUTECH, Fullstack Developer tương lai và tác giả của DevOrbit Blog.",
};

export default function About() {
    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen font-sans selection:bg-slate-200 dark:selection:bg-slate-700">
            <Container>
                <Header />

                {/* Hero Section */}
                <section className="flex-col md:flex-row flex items-center md:items-start md:justify-between mt-16 mb-16 md:mb-12">
                    <div className="md:w-3/4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                            </span>
                            HUTECH Senior Student
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
                            Chào bạn, mình là <span className="whitespace-nowrap text-slate-900 dark:text-white underline decoration-4 decoration-slate-300 dark:decoration-slate-700 underline-offset-4">Hoàng Trọng Trà</span>.
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            Sinh viên năm cuối <strong className="font-semibold text-slate-900 dark:text-white">HUTECH</strong>.
                            Đang trên hành trình chuyển hóa từ "Code chạy là được" sang "Code sạch, Kiến trúc bền vững".
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">

                    {/* Sidebar Left - Quick Info */}
                    <aside className="lg:col-span-4 space-y-8 order-2 lg:order-1">
                        <div className="sticky top-24 space-y-8">
                            {/* Profile Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <div className="relative aspect-square rounded-full overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-sm mx-auto w-48 h-48 mt-6">
                                    <Image
                                        src="/assets/blog/authors/tra.png"
                                        alt="Hoàng Trọng Trà"
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                </div>
                                <div className="px-4 pb-4 text-center">
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Hoàng Trọng Trà</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Final Year Student</p>
                                    <p className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider">HUTECH University</p>

                                    <div className="flex justify-center gap-3 mt-4">
                                        <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                        <a href="mailto:contact@devorbit.com" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-800">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">#4</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Năm Cuối</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center border border-slate-200 dark:border-slate-800">
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white">10+</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Dự án</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Article Content */}
                    <article className="lg:col-span-8">

                        {/* Section 1: Chuyện đời sinh viên */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                                Chuyện đời sinh viên HUTECH
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                                Là sinh viên năm cuối của Đại học Công nghệ TP.HCM (HUTECH), mình đang đứng ở ngưỡng cửa thú vị giữa "Học thuật" và "Thực chiến".
                                Thay vì những dòng code Hello World ngây ngô ngày nào, giờ đây mình đang vật lộn (một cách vui vẻ) với Đồ án tốt nghiệp và những deadline thực tập.
                            </p>

                            <div className="space-y-10">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        Năm Nhất: C++ và những nỗi đau
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Thời kỳ khủng hoảng với con trỏ (pointer) trong C++. Mình từng nghĩ máy tính là phép thuật cho đến khi gặp lỗi <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">Segmentation Fault</code>.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        Năm 2 & 3: "Thợ code" đồ án
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Giai đoạn chạy show deadline. Google và StackOverflow là người thầy vĩ đại nhất. Code chạy ầm ầm nhưng nhìn lại thì như "nồi lẩu thập cẩm".
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        Năm Cuối: Giác ngộ
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        Hiện tại, mình bắt đầu trân trọng Clean Code và Architecture. Mục tiêu bây giờ là sản phẩm phải có tính thực tế và sẵn sàng cho môi trường doanh nghiệp (Career Ready).
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Tiêu chí Blog */}
                        <section className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                                Tiêu chí Blog & DevOrbit
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
                                <strong>DevOrbit</strong> là nơi mình lưu lại những kiến thức đã học được. Blog này tuân thủ 3 nguyên tắc (The 3Cs):
                            </p>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="flex-none w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">1</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Core (Cốt lõi)</h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Nắm chắc căn bản. Framework nào cũng được, miễn là hiểu rõ bản chất vấn đề.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-none w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">2</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Clear (Rõ ràng)</h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Chia sẻ kiến thức chứ không khoe chữ. Viết sao cho sinh viên năm 1 cũng hiểu được.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-none w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">3</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Code-first (Thực chiến)</h3>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Lý thuyết phải đi đôi với thực hành. Mọi bài viết đều có demo hoặc code mẫu.</p>
                                    </div>
                                </div>
                            </div>

                            <blockquote className="mt-10 pl-6 border-l-4 border-slate-900 dark:border-white italic text-slate-600 dark:text-slate-400 text-lg">
                                "Sinh viên IT không sợ bug, chỉ sợ đồ án không kịp chạy thử trước khi demo với giảng viên!"
                            </blockquote>
                        </section>

                        {/* Section 3: Tech Stack */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                                Vũ khí đồ án
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                                Bộ công cụ mình thường xuyên sử dụng để chiến đấu với các đồ án môn học:
                            </p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-4 border-slate-900 dark:border-white pl-3">Backend System</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Java Core', 'Spring Boot 3', 'Microservices', 'PostgreSQL', 'Redis', 'Docker', 'Kafka', 'Elasticsearch'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-l-4 border-slate-900 dark:border-white pl-3">Modern Frontend</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'React Query', 'Zustand', 'Framer Motion'].map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors cursor-default">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </article>

                </div>
            </Container>
        </main>
    );
}

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";

export default function About() {
    return (
        <main className="bg-white dark:bg-slate-950 min-h-screen font-sans selection:bg-purple-100 dark:selection:bg-purple-900/30">
            <Container>
                <Header />

                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-[100px] -z-10 rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50"></div>

                    <div className="text-center max-w-4xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            HUTECH Senior Student
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            Hello, I'm <span className="whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 dark:from-teal-400 dark:to-blue-400">Hoàng Trọng Trà</span>.
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
                            Sinh viên năm cuối <strong className="font-semibold text-slate-900 dark:text-white">HUTECH</strong>.
                            Đang trên hành trình chuyển hóa từ "Code chạy là được" sang "Code sạch, Kiến trúc bền vững".
                        </p>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">

                    {/* Sidebar Left - Quick Info */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            {/* Profile Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <div className="relative aspect-square rounded-full overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-800 shadow-sm mx-auto w-48 h-48 mt-6">
                                    <Image
                                        src="/assets/blog/authors/tra.png"
                                        alt="Hoàng Trọng Trà"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="px-4 pb-4 text-center">
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Trà Hoàng</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Final Year Student</p>
                                    <p className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">HUTECH University</p>

                                    <div className="flex justify-center gap-3 mt-4">
                                        <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                        <a href="mailto:contact@devorbit.com" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">#4</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Năm Cuối</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl text-center">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Dự án môn học</div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Article Content */}
                    <article className="lg:col-span-8 space-y-16">

                        {/* Section 1: Đôi nét về bản thân */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">🎓</span>
                                Chuyện đời sinh viên HUTECH
                            </h2>
                            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                                <p>
                                    Là sinh viên năm cuối của Đại học Công nghệ TP.HCM (HUTECH), mình đang đứng ở ngưỡng cửa thú vị giữa "Học thuật" và "Thực chiến".
                                    Thay vì những dòng code Hello World ngây ngô ngày nào, giờ đây mình đang vật lộn (một cách vui vẻ) với Đồ án tốt nghiệp và những deadline thực tập.
                                </p>
                                <p>
                                    Nhìn lại 4 năm đại học, "sự nghiệp" code của mình đã tiến hóa như thế này:
                                </p>
                                <ul className="list-none pl-0 space-y-6 my-8">
                                    <li className="relative pl-6 pb-6 border-l-2 border-slate-200 dark:border-slate-800 last:border-0">
                                        <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-950"></span>
                                        <div className="mb-2">
                                            <strong className="text-lg text-slate-900 dark:text-white">Năm Nhất: C++ và những nỗi đau</strong>
                                            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">The Noob</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-base m-0">
                                            Thời kỳ khủng hoảng với con trỏ (pointer) trong C++. Mình từng nghĩ máy tính là phép thuật cho đến khi gặp lỗi `Segmentation Fault`.
                                            Niềm vui lớn nhất là code chạy được mà không crash, bất kể logic sai bét nhè.
                                        </p>
                                    </li>

                                    <li className="relative pl-6 pb-6 border-l-2 border-slate-200 dark:border-slate-800 last:border-0">
                                        <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-slate-950 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"></span>
                                        <div className="mb-2">
                                            <strong className="text-lg text-slate-900 dark:text-white">Năm 2 & 3: "Thợ code" đồ án</strong>
                                            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">The Builder</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-base m-0">
                                            Giai đoạn chạy show deadline. Google và StackOverflow là người thầy vĩ đại nhất.
                                            Mình nhồi nhét mọi thứ vào đồ án: Web, App, AI (dù chỉ là import thư viện).
                                            Code chạy ầm ầm nhưng nhìn lại thì như "nồi lẩu thập cẩm" - ngon nhưng lộn xộn.
                                        </p>
                                    </li>

                                    <li className="relative pl-6 pb-6 border-l-2 border-slate-200 dark:border-slate-800 last:border-0">
                                        <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-2 border-white dark:border-slate-950 shadow-[0_0_0_4px_rgba(168,85,247,0.2)]"></span>
                                        <div className="mb-2">
                                            <strong className="text-lg text-slate-900 dark:text-white">Năm Cuối: Giác ngộ</strong>
                                            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">The Senior Student</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 text-base m-0">
                                            Hiện tại, mình bắt đầu trân trọng Clean Code và Architecture. Mình nhận ra rằng viết code cho máy chạy thì dễ, viết cho người khác (và thầy cô) đọc hiểu mới khó.
                                            Mục tiêu bây giờ không chỉ là điểm A, mà là sản phẩm phải có tính thực tế và sẵn sàng cho môi trường doanh nghiệp (Career Ready).
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 2: Tiêu chí Blog */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl">🧭</span>
                                Tiêu chí Blog & DevOrbit
                            </h2>
                            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                                <p>
                                    <strong>DevOrbit</strong> là nơi mình lưu lại những kiến thức đã học được trên giảng đường và trong quá trình tự nghiên cứu.
                                    Blog này tuân thủ 3 nguyên tắc (The 3Cs):
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors group">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600">Core (Cốt lõi)</h3>
                                        <p className="text-slate-600 dark:text-slate-400">Nắm chắc căn bản. Framework nào cũng được, miễn là hiểu rõ bản chất vấn đề.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 transition-colors group">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-purple-600">Clear (Rõ ràng)</h3>
                                        <p className="text-slate-600 dark:text-slate-400">Chia sẻ kiến thức chứ không khoe chữ. Viết sao cho sinh viên năm 1 cũng hiểu được.</p>
                                    </div>
                                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-pink-500 transition-colors group md:col-span-2">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-pink-600">Code-first (Thực chiến)</h3>
                                        <p className="text-slate-600 dark:text-slate-400">Lý thuyết phải đi đôi với thực hành. Mọi bài viết đều có demo hoặc code mẫu.</p>
                                    </div>
                                </div>

                                <blockquote>
                                    "Sinh viên IT không sợ bug, chỉ sợ đồ án không kịp chạy thử trước khi demo với giảng viên!"
                                </blockquote>
                            </div>
                        </section>

                        {/* Section 3: Tech Stack */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl">⚡</span>
                                Vũ khí đồ án
                            </h2>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Backend System</span>
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {['Java Core', 'Spring Boot 3', 'Microservices', 'PostgreSQL', 'Redis', 'Docker', 'Kafka', 'Elasticsearch'].map(tech => (
                                            <span key={tech} className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-blue-500 hover:text-blue-600 transition-all cursor-crosshair">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">Modern Frontend</span>
                                        <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'React Query', 'Zustand', 'Framer Motion', 'Radix UI'].map(tech => (
                                            <span key={tech} className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium hover:border-purple-500 hover:text-purple-600 transition-all cursor-crosshair">
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

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Về mình - About Me",
    description: `${AUTHOR.name} - Fullstack Developer, Tech Enthusiast & Blogger. Sinh viên HUTECH đam mê Java, Spring Boot, React và Next.js. Chia sẻ kiến thức lập trình tại DevOrbit.`,
    keywords: [AUTHOR.name, "Fullstack Developer", "Java Developer", "HUTECH", "trahoangdev", "DevOrbit", "Tech Blogger"],
    openGraph: {
        title: `Về mình - ${AUTHOR.name} | ${SITE_NAME}`,
        description: `${AUTHOR.name} - Fullstack Developer, Tech Enthusiast & Blogger tại DevOrbit.`,
        url: `${SITE_URL}/about`,
        type: "profile",
        images: [
            {
                url: `${SITE_URL}/api/og?title=${encodeURIComponent("About Me")}&author=${encodeURIComponent(AUTHOR.name)}`,
                width: 1200,
                height: 630,
                alt: AUTHOR.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `Về mình - ${AUTHOR.name} | ${SITE_NAME}`,
        description: `${AUTHOR.name} - Fullstack Developer & Tech Blogger.`,
        creator: "@trahoangdev",
    },
    alternates: {
        canonical: `${SITE_URL}/about`,
    },
};

export default function About() {
    return (
        <Container>
            <Header />

            {/* Section 1: Introduction */}
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto my-20">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-2xl mb-8">
                    <Image
                        src="/assets/blog/authors/tra.png"
                        alt="Hoàng Trọng Trà"
                        fill
                        className="object-cover"
                    />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                    Hoàng Trọng Trà
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-6">
                    Fullstack Developer | Tech Enthusiast | AI Lover | Blogger
                </p>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Chào mừng bạn đến với <strong>DevOrbit</strong>. Đây là nơi mình lưu giữ những kiến thức, kinh nghiệm và góc nhìn cá nhân trên hành trình chinh phục công nghệ.
                </p>
            </div>

            <div className="w-full h-px bg-slate-200 dark:bg-slate-800 mb-20"></div>

            {/* Section 1.5: Story & Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Đôi nét về mình
                    </h2>
                    <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                        <p>
                            Mình là một sinh viên năm cuối tại HUTECH, đang đứng ở giao lộ thú vị giữa "Học thuật" và "Thực chiến".
                        </p>
                        <p>
                            Ngày xưa, mình từng nghĩ code chỉ là gõ phím cho máy chạy. Nhưng sau hàng ngàn bug và những đêm trắng với <code>NullPointerException</code>, mình nhận ra lập trình là một nghệ thuật của tư duy logic và sự kiên nhẫn.
                        </p>
                        <p>
                            Ngoài những lúc "đắm đuối" với Java & Spring Boot, mình thường dành thời gian để đọc sách công nghệ, tìm hiểu Architecture mới, hoặc đơn giản là nhâm nhi cà phê và suy ngẫm về... tại sao code hôm qua chạy mà hôm nay lại không.
                        </p>
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Tại sao là DevOrbit?
                    </h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        Blog này được xây dựng dựa trên 3 nguyên tắc cốt lõi (The 3Cs) mà mình luôn theo đuổi:
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="flex-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Cốt lõi (Core)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Không chạy theo trend mù quáng. Tập trung vào kiến thức nền tảng vững chắc.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Rõ ràng (Clear)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Viết để chia sẻ, không phải để đánh đố. Đơn giản hóa những khái niệm phức tạp.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Thực chiến (Code-first)</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Lý thuyết đi đôi với thực hành. Luôn có demo hoặc code mẫu minh họa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 2: Story & Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                <div className="md:col-span-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 sticky top-24">
                        Hành trình
                    </h2>
                </div>
                <div className="md:col-span-8 border-l border-slate-200 dark:border-slate-800 pl-8 space-y-12">
                    <TimelineItem
                        year="2026 (3 THÁNG)"
                        title="Thực tập sinh Fullstack"
                        description="Tham gia dự án thực tế tại doanh nghiệp. Làm quen với quy trình Agile/Scrum, CI/CD và tối ưu hóa truy vấn Database. Tự học và áp dụng các kiến thức đã học vào dự án thực tế."
                    />
                    <TimelineItem
                        year="2025 (Hiện tại)"
                        title="Xây dựng DevOrbit"
                        description="Phát triển Blog cá nhân để chia sẻ kiến thức chuyên sâu về Backend và System Design. Tập trung vào chất lượng content và trải nghiệm người đọc."
                    />
                    <TimelineItem
                        year="Th9.2025 - Th12.2025"
                        title="Xây dựng Luxe Wear AI"
                        description="Nền tảng SaaS cho phép doanh nghiệp xây dựng, triển khai và quản lý các tác nhân AI (AI Agents). Hệ thống hỗ trợ tích hợp dữ liệu thời gian thực, thực hiện hành động trên các hệ thống bên thứ ba và cung cấp báo cáo phân tích chi tiết."
                    />
                    <TimelineItem
                        year="2023 - 2024"
                        title="Lập trình viên Website"
                        description="Hành trình học hỏi lập trình web từ cơ bản đến chuyên sâu."
                    />
                    <TimelineItem
                        year="2022"
                        title="Bắt đầu tại HUTECH"
                        description="Chập chững những dòng code đầu tiên với C/C++. Niềm đam mê lập trình được thắp sáng từ những bài toán giải thuật."
                    />
                </div>
            </div>

            {/* Section 3: Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                <div className="md:col-span-4">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 sticky top-24">
                        Công nghệ
                    </h2>
                </div>
                <div className="md:col-span-8">
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                            Mình không chạy theo mọi trend công nghệ, mà tập trung làm chủ những công cụ giải quyết tốt vấn đề.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SkillCard title="Backend" items={["Java Core", "Spring Boot", "Hibernate/JPA", "MySQL/PostgreSQL", "Redis", "MongoDB"]} />
                        <SkillCard title="Frontend" items={["React.js", "Next.js 14", "TailwindCSS", "TypeScript"]} />
                        <SkillCard title="AI Technologies" items={["Python", "LangChain", "OpenAI API", "Vercel AI SDK", "Prompt Engineering"]} />
                        <SkillCard title="Công cụ & Dịch vụ" items={["Git/GitHub", "Docker", "Postman", "IntelliJ IDEA", "Linux", "Vercel"]} />
                    </div>
                </div>
            </div>

            {/* Section 4: Contact */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-12 text-center mb-20 border border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Kết nối với mình</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                    Mình luôn sẵn sàng cho những cơ hội hợp tác mới, hoặc đơn giản là một buổi cà phê tech talk cuối tuần.
                </p>
                <div className="flex justify-center gap-6">
                    <SocialLink href="https://github.com/trahoangdev" label="GitHub" />
                    <SocialLink href="https://www.linkedin.com/in/trahoangdev/" label="LinkedIn" />
                    <SocialLink href="mailto:trahoangdev@gmail.com" label="Email" />
                    <SocialLink href="https://www.facebook.com/trahoangdev" label="Facebook" />
                </div>
            </div>

        </Container>
    );
}

// --- Components ---

const TimelineItem = ({ year, title, description }: { year: string, title: string, description: string }) => (
    <div className="relative">
        <span className="absolute -left-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-950 ring-4 ring-slate-100 dark:ring-slate-800">
            <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100" />
        </span>
        <span className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1 block">{year}</span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </div>
);

const SkillCard = ({ title, items }: { title: string, items: string[] }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{title}</h3>
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item} className="text-slate-600 dark:text-slate-400 text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const SocialLink = ({ href, label }: { href: string, label: string }) => (
    <a href={href} target="_blank" rel="noreferrer" className="text-slate-900 dark:text-white font-bold hover:text-blue-600 dark:hover:text-blue-400 underline decoration-2 decoration-slate-200 dark:decoration-slate-700 underline-offset-4 transition-all">
        {label}
    </a>
);

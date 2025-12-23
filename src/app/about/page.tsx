import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import Image from "next/image";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Về mình - About Me",
    description: `${AUTHOR.name} - Fullstack Developer, Software Engineer, AI Engineer & Blogger. Sinh viên HUTECH đam mê Java, Spring Boot, React và Next.js. Chia sẻ kiến thức lập trình tại DevOrbit.`,
    keywords: [AUTHOR.name, "Fullstack Developer", "Java Developer", "HUTECH", "trahoangdev", "DevOrbit", "Tech Blogger"],
    openGraph: {
        title: `Về mình - ${AUTHOR.name} | ${SITE_NAME}`,
        description: `${AUTHOR.name} - Fullstack Developer, Software Engineer, AI Engineer & Blogger tại DevOrbit.`,
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
        description: `${AUTHOR.name} - Fullstack Developer, Software Engineer & Tech Blogger.`,
        creator: "@trahoangdev",
    },
    alternates: {
        canonical: `${SITE_URL}/about`,
    },
};

// JSON-LD Structured Data for About Page
const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
        "@type": "Person",
        name: AUTHOR.name,
        alternateName: "trahoangdev",
        description: "Fullstack Developer, Software Engineer, AI Engineer & Blogger",
        image: `${SITE_URL}${AUTHOR.image}`,
        url: `${SITE_URL}/about`,
        jobTitle: AUTHOR.jobTitle,
        worksFor: {
            "@type": "EducationalOrganization",
            name: "HUTECH - Ho Chi Minh City University of Technology",
        },
        alumniOf: {
            "@type": "EducationalOrganization",
            name: "HUTECH",
        },
        knowsAbout: [
            "Java",
            "Spring Boot",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Web Development",
            "REST API",
            "Microservices",
        ],
        sameAs: AUTHOR.sameAs,
    },
};

export default function About() {
    return (
        <Container>
            <Header />

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
            />

            {/* Section 1: Introduction */}
            <section aria-labelledby="intro-heading" className="flex flex-col items-center text-center max-w-3xl mx-auto my-20">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-2xl mb-8">
                    <Image
                        src="/assets/blog/authors/tra2.png"
                        alt="Ảnh đại diện của Hoàng Trọng Trà - Fullstack Developer"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <h1 id="intro-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                    Hoàng Trọng Trà
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 font-medium mb-6">
                    Software Engineer | Blogger
                </p>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Chào mừng bạn đến với <strong>DevOrbit</strong>. Đây là nơi mình lưu giữ những kiến thức, kinh nghiệm và góc nhìn cá nhân trên hành trình chinh phục công nghệ.
                </p>
            </section>

            <div className="w-full h-px bg-slate-200 dark:bg-slate-800 mb-20"></div>

            {/* Section 1.5: Story & Philosophy */}
            <section aria-labelledby="story-heading" className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                <div>
                    <h2 id="story-heading" className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                        Đôi nét về mình
                    </h2>
                    <div className="prose dark:prose-invert text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
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

                    {/* Giải thích ý nghĩa tên */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
                        <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                            <strong className="text-slate-900 dark:text-white">Dev</strong> = Developer (Lập trình viên) +
                            <strong className="text-slate-900 dark:text-white"> Orbit</strong> = Quỹ đạo
                        </p>
                        <p className="text-lg text-slate-500 dark:text-slate-400 mt-3 italic border-l-2 border-slate-300 dark:border-slate-600 pl-3">
                            "Code is a universe. I share my orbit." — Thế giới code là một vũ trụ rộng lớn,
                            và đây là quỹ đạo riêng của mình, nơi mình xoay quanh những kiến thức, dự án và đam mê công nghệ.
                        </p>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                        Blog này được xây dựng dựa trên 3 nguyên tắc cốt lõi (The 3Cs) mà mình luôn theo đuổi:
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="flex-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Cốt lõi (Core)</h3>
                                <p className="text-base text-slate-600 dark:text-slate-400 mt-1">Không chạy theo trend mù quáng. Tập trung vào kiến thức nền tảng vững chắc.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Rõ ràng (Clear)</h3>
                                <p className="text-base text-slate-600 dark:text-slate-400 mt-1">Viết để chia sẻ, không phải để đánh đố. Đơn giản hóa những khái niệm phức tạp.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="flex-none p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-900 dark:text-white">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">Thực chiến (Code-first)</h3>
                                <p className="text-base text-slate-600 dark:text-slate-400 mt-1">Lý thuyết đi đôi với thực hành. Luôn có demo hoặc code mẫu minh họa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Story & Timeline */}
            <section aria-labelledby="timeline-heading" className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                <div className="md:col-span-4">
                    <h2 id="timeline-heading" className="text-3xl font-bold text-slate-900 dark:text-white mb-8 sticky top-24">
                        Hành trình
                    </h2>
                </div>
                <div className="md:col-span-8 border-l border-slate-200 dark:border-slate-800 pl-8 space-y-12">
                    <div className="prose dark:prose-invert text-lg text-slate-600 dark:text-slate-300 leading-relaxed space-y-6">
                        <p>
                            Hành trình của mình bắt đầu từ năm 2022, khi những dòng code C/C++ đầu tiên tại HUTECH đã mở ra một thế giới tư duy logic đầy mê hoặc. Không dừng lại ở những bài toán giải thuật, mình nhanh chóng dấn thân vào Web Development, dành 3 năm để mài giũa kỹ năng từ Frontend đến Backend.
                        </p>
                        <p>
                            Giai đoạn cuối 2025 đánh dấu sự trưởng thành về mặt kỹ thuật với việc xây dựng <strong>Luxe Wear AI</strong> – một nền tảng SaaS tích hợp AI Agents phức tạp, và khởi tạo <strong>DevOrbit</strong> để chia sẻ lại những gì đã học.
                        </p>
                        <p>
                            Hiện tại, mình đang hào hứng chuẩn bị cho kỳ thực tập Fullstack vào năm 2026, sẵn sàng mang bầu nhiệt huyết và kinh nghiệm tích lũy được để đóng góp cho các dự án thực tế tại doanh nghiệp.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 3: Tech Stack */}
            <section aria-labelledby="tech-heading" className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                <div className="md:col-span-4">
                    <h2 id="tech-heading" className="text-3xl font-bold text-slate-900 dark:text-white mb-8 sticky top-24">
                        Công nghệ
                    </h2>
                </div>
                <div className="md:col-span-8">
                    <div className="prose dark:prose-invert max-w-none mb-10">
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Công nghệ thay đổi từng ngày, nhưng tư duy kỹ thuật (Engineering Mindset) thì trường tồn. Mình định vị bản thân là một <strong>Product-oriented Developer</strong>, luôn ưu tiên giải pháp tối ưu và trải nghiệm người dùng cuối.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                            Mình xây dựng nền tảng Backend vững chắc, không chỉ giới hạn ở <strong>Java & Spring Boot</strong> mà còn mở rộng sang các hệ sinh thái khác như <strong>Node.js, Go, NestJS,...</strong> để tối ưu cho từng bài toán cụ thể. Đồng thời, mình thỏa sức sáng tạo Frontend với <strong>Next.js</strong> và đầu tư sâu vào <strong>AI Engineering</strong> để tích hợp trí tuệ nhân tạo vào sản phẩm.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 4: Contact */}
            <section aria-labelledby="contact-heading" className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-12 text-center mb-20 border border-slate-100 dark:border-slate-800">
                <h2 id="contact-heading" className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Kết nối với mình</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                    Mình luôn cởi mở với các cơ hội hợp tác phát triển sản phẩm, tư vấn giải pháp công nghệ, hay đơn giản là kết nối để cùng chia sẻ đam mê. Đừng ngần ngại Say Hi!
                </p>
                <nav aria-label="Social media links" className="flex justify-center gap-8">
                    <SocialLink href="https://github.com/trahoangdev" label="GitHub" icon={
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                    } />
                    <SocialLink href="https://www.linkedin.com/in/trahoangdev/" label="LinkedIn" icon={
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                    } />
                    <SocialLink href="mailto:trahoangdev@gmail.com" label="Email" icon={
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    } />
                    <SocialLink href="https://www.facebook.com/trahoangdev" label="Facebook" icon={
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                    } />
                </nav>
            </section>

        </Container>
    );
}

// --- Components ---

const TimelineItem = ({ year, title, description }: { year: string, title: string, description: string }) => (
    <div className="relative">
        <span className="absolute -left-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-slate-950 ring-4 ring-slate-100 dark:ring-slate-800">
            <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-slate-100" />
        </span>
        <span className="text-base font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1 block">{year}</span>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
    </div>
);

const SkillCard = ({ title, items }: { title: string, items: string[] }) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">{title}</h3>
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item} className="text-slate-600 dark:text-slate-400 text-base font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const SocialLink = ({ href, label, icon }: { href: string; label: string, icon: React.ReactNode }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Kết nối qua ${label}`}
        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:scale-110 transition-all duration-300"
        title={label}
    >
        {icon}
    </a>
);

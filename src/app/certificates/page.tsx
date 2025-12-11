
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { Metadata } from "next";
import Image from "next/image";
import { SITE_URL, SITE_NAME, AUTHOR } from "@/lib/constants";

export const metadata: Metadata = {
    title: "Chứng chỉ & Thành tựu - Certificates",
    description: `Danh sách các chứng chỉ chuyên môn và thành tựu kỹ thuật của ${AUTHOR.name}. Bao gồm AWS, Cisco và các chứng chỉ công nghệ khác.`,
    keywords: ["certificates", "chứng chỉ", "AWS", "Cisco", "thành tựu", AUTHOR.name],
    openGraph: {
        title: `Chứng chỉ & Thành tựu | ${SITE_NAME}`,
        description: `Danh sách các chứng chỉ chuyên môn và thành tựu kỹ thuật của ${AUTHOR.name}.`,
        url: `${SITE_URL}/certificates`,
        type: "website",
        images: [
            {
                url: `${SITE_URL}/api/og?title=${encodeURIComponent("Certificates & Achievements")}&author=${encodeURIComponent(AUTHOR.name)}`,
                width: 1200,
                height: 630,
                alt: "Certificates",
            },
        ],
    },
    alternates: {
        canonical: `${SITE_URL}/certificates`,
    },
};

type Certificate = {
    id: string;
    title: string;
    issuer: string;
    date: string;
    imageUrl: string;
    credentialUrl: string;
};

const certificates: Certificate[] = [
    {
        id: "1",
        title: "AWS Academy Graduate - Cloud Security Foundations",
        issuer: "Amazon Web Services Training and Certification",
        date: "2025",
        imageUrl: "/assets/certificates/aws-academy-graduate-cloud-security-foundations.png",
        credentialUrl: "https://www.credly.com/badges/7847003f-5dda-43ff-9de2-7f5e92f65339/public_url",
    },
    {
        id: "2",
        title: "JavaScript Essentials 1",
        issuer: "Cisco",
        date: "2025",
        imageUrl: "/assets/certificates/cisco-js-1.png",
        credentialUrl: "https://www.credly.com/badges/6ee97492-ca75-42e1-a339-769555eccdc7/public_url",
    },
    {
        id: "3",
        title: "JavaScript Essentials 2",
        issuer: "Cisco",
        date: "2025",
        imageUrl: "/assets/certificates/cisco-js-2.png",
        credentialUrl: "https://www.credly.com/badges/f5c59681-9898-4590-9393-7010bf8df381/public_url",
    },
    {
        id: "4",
        title: "Networking Basics",
        issuer: "Cisco",
        date: "2025",
        imageUrl: "/assets/certificates/cisco-networking.png",
        credentialUrl: "https://www.credly.com/badges/33f3b395-12cd-42aa-a6f3-4d03ff4c8300/public_url",
    },
    {
        id: "5",
        title: "Introduction to Cybersecurity",
        issuer: "Cisco",
        date: "2024",
        imageUrl: "/assets/certificates/cisco-cybersecurity.png",
        credentialUrl: "https://www.credly.com/badges/83c572f4-cbda-4f77-96df-3111494de211/public_url",
    },
];

export default function CertificatesPage() {
    return (
        <main>
            <Container>
                <Header />
                <div className="mb-12 mt-8 md:mt-16">
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-6 text-slate-900 dark:text-white">
                        Certificates.
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Một số chứng chỉ và thành tựu mình đã đạt được trong quá trình học tập và làm việc.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {certificates.map((cert) => (
                        <div
                            key={cert.id}
                            className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            {/* Image Placeholder Area */}
                            <div className="aspect-[4/3] bg-white dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 p-6">
                                    <Image
                                        src={cert.imageUrl}
                                        alt={cert.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow p-6">
                                <div className="mb-4">
                                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                                        {cert.issuer}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {cert.title}
                                    </h3>
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        Issued: {cert.date}
                                    </span>
                                    <a
                                        href={cert.credentialUrl}
                                        className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </main>
    );
}

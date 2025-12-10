import Link from "next/link";

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type Props = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: Props) {
    return (
        <nav aria-label="Breadcrumb" className="mb-6 block">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <li>
                    <Link
                        href="/"
                        className="hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <svg
                            className="w-4 h-4 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-[200px] sm:max-w-xs " title={item.label}>
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}

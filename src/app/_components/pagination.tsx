import Link from 'next/link';

type Props = {
    currentPage: number;
    totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div className="flex justify-center items-center space-x-6 mt-16 mb-32">
            {/* Previous Button */}
            {prevPage ? (
                <Link
                    href={prevPage === 1 ? '/' : `/page/${prevPage}`}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                    &larr; Trước
                </Link>
            ) : (
                <span className="px-6 py-3 border border-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed">
                    &larr; Trước
                </span>
            )}

            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Trang {currentPage} trên {totalPages}
            </span>

            {/* Next Button */}
            {nextPage ? (
                <Link
                    href={`/page/${nextPage}`}
                    className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                    Sau &rarr;
                </Link>
            ) : (
                <span className="px-6 py-3 border border-transparent text-slate-300 dark:text-slate-700 cursor-not-allowed">
                    Sau &rarr;
                </span>
            )}
        </div>
    );
}

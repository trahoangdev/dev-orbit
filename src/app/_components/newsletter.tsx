export function Newsletter() {
    return (
        <div className="py-16 border-b border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-5 max-w-4xl text-center">
                <h3 className="text-3xl font-bold tracking-tighter leading-tight mb-4 text-slate-900 dark:text-white">
                    Subscribe
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                    Cập nhật những bài viết mới nhất về Java, Spring Boot và Web Development.
                </p>

                <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
                    <input
                        type="email"
                        placeholder="Email của bạn..."
                        required
                        className="flex-grow px-5 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white transition-all"
                    />
                    <button
                        type="submit"
                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
                    >
                        Subscribe
                    </button>
                </form>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                    Join 1,000+ developers in the universe.
                </p>
            </div>
        </div>
    );
}

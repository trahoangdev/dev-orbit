import Link from "next/link";

const Header = () => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-10">
      <Link href="/" className="group">
        <div className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
          DevOrbit
          <span className="text-blue-600 dark:text-blue-400">.</span>
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
          Blog by trahoangdev
        </div>
      </Link>
      <nav className="flex items-center gap-5 text-sm font-medium text-neutral-600 dark:text-neutral-300">
        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          About
        </Link>
        <Link
          href="/tags"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Tags
        </Link>
      </nav>
    </header>
  );
};

export default Header;

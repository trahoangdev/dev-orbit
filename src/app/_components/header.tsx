import Link from "next/link";
import Image from "next/image";
//import ThemeSwitcher from "./theme-switcher";

const Header = () => {
  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-12 mb-10 border-b border-slate-100 dark:border-slate-800">
      <Link href="/" className="group block">
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <Image
            src="/assets/logo/logo.png"
            alt="DevOrbit Logo"
            width={56}
            height={56}
            className="rounded-lg object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              DevOrbit
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
              Blog by trahoangdev
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8">
        <nav className="flex items-center gap-6 text-base font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link
            href="/tags"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Tags
          </Link>
          <Link
            href="/certificates"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Certificates
          </Link>
          <Link
            href="/about"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Separator */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
      </div>
    </header>
  );
};

export default Header;

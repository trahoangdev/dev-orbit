import Link from "next/link";
import Image from "next/image";
import Search from "./search";

import { MobileMenu } from "./mobile-menu";

import { ThemeSwitcher } from "./theme-switcher";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between py-6 md:py-12 mb-10 border-b border-slate-100 dark:border-slate-800 relative z-50">
      <Link href="/" className="group block">
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <Image
            src="/assets/logo/logo.png"
            alt="DevOrbit Logo"
            width={56}
            height={56}
            className="rounded-lg object-contain w-10 h-10 md:w-14 md:h-14 transition-all"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              DevOrbit
            </h2>
            <p className="text-[10px] md:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">
              Blog by trahoangdev
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium text-slate-500 dark:text-slate-300">
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
            href="https://trahoangdev.vercel.app/"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
            target="_blank"
          >
            Portfolio
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

        <div className="flex items-center gap-2 md:gap-4">
          <ThemeSwitcher />
          <Search />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

import Link from "next/link";
import Image from "next/image";
import Search from "./search";

import { MobileMenu } from "./mobile-menu";

import { ThemeSwitcher } from "./theme-switcher";

const Header = () => {
  return (
    <header className="relative z-50 mb-10 flex flex-row items-center justify-between border-b border-slate-100 py-6 dark:border-slate-800 md:py-12">
      <Link href="/" className="group block">
        <div className="flex items-center gap-3" suppressHydrationWarning>
          <Image
            src="/assets/logo/logo.png"
            alt="DevOrbit Logo"
            width={56}
            height={56}
            className="h-10 w-10 rounded-lg object-contain transition-all md:h-14 md:w-14"
          />
          <div>
            <h2 className="text-xl font-bold leading-none tracking-tight text-slate-900 dark:text-white md:text-2xl">
              DevOrbit
            </h2>
            <p className="mt-0.5 text-[10px] font-medium text-slate-500 transition-colors group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200 md:text-xs">
              Blog by trahoangdev
            </p>
          </div>
        </div>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 text-base font-medium text-slate-500 dark:text-slate-300 md:flex">
          <Link
            href="/"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/tags"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Tags
          </Link>
          <Link
            href="/certificates"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            Certificates
          </Link>
          <Link
            href="https://trahoangdev.vercel.app/"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Portfolio
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Separator */}
        <div className="hidden h-5 w-px bg-slate-200 dark:bg-slate-800 md:block"></div>

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

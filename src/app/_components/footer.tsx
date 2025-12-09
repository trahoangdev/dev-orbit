import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-neutral-700 dark:text-neutral-300">
          <div>
            <p className="text-lg font-semibold">DevOrbit</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Blog by trahoangdev — built with Next.js & Markdown.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a
              href="/feed.xml"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              RSS
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Next.js Docs
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

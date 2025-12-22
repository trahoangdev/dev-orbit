import Container from "@/app/_components/container";
import { Newsletter } from "@/app/_components/newsletter";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <Newsletter />
      <Container>
        <div className="py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <Image
              src="/assets/logo/logo.png"
              alt="DevOrbit Logo"
              width={56}
              height={56}
              className="rounded-lg object-contain"
            />
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DevOrbit - Code is a universe. I share my orbit.</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                Code sạch, Kiến trúc bền vững, và những câu chuyện nghề.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Sponsor Button */}
            <a
              href="https://www.buymeacoffee.com/trahoangdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 rounded-full text-sm font-bold transition-all shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.216 6.415l-.132-.666c-.119-.596-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.099-4.152-.032-8.305-.032-12.457 0-.309.006-.635.059-.933.164-.784.305-1.071 1.054-1.205 1.706l-.15 1.256c-.571.167-1.309.805-1.504 1.795-.087 1.488.665 2.855 2.073 2.855h1.96c.74 3.193 2.924 5.239 5.867 5.688.199 1.144-.648 2.05-2.022 2.213-.674.075-1.391.077-2.049.009-.436-.058-.692-.47-.568-.891.109-.371.498-.588.887-.492a2.33 2.33 0 0 1 .491.164c.269.117.502.296.671.512.427.564.291 1.373-.326 1.792-.614.417-1.405.474-2.115.399-2.029-.214-3.527-1.89-3.239-3.953.253-1.808 1.666-3.221 3.447-3.55 3.518-.65 6.007-3.662 6.137-7.234h1.996c1.399 0 2.222-1.306 2.146-2.716-.08-1.536-1.554-1.745-2.094-1.688zM4.686 9.408c-.027-.852.274-1.161.439-1.201l.169-.909c.052-.284.159-.537.369-.691 6.848.068 13.697 0 13.697 0l.138.697c.058.293.003.528-.184.697l.155 1.407h-14.783zm.167 1.838h14.453l-.048.243c-.15 1.815-1.956 3.018-3.673 3.018H8.399c-1.669 0-3.512-1.139-3.695-2.909l-.051-.352z" /></svg>
              Buy me a coffee
            </a>

            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

            <a
              href="/feed.xml"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              RSS
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              Next.js Docs
            </a>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-800"></div>
            <a
              href="https://github.com/trahoangdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>

            <a
              href="https://www.linkedin.com/in/trahoangdev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" /></svg>
            </a>

            <a
              href="https://www.facebook.com/trahoangdev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
            </a>

            <a
              href="mailto:trahoangdev@gmail.com"
              className="text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </a>
          </div>
        </div>
        <div className="py-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-600">
          <p>© {new Date().getFullYear()} DevOrbit. All rights reserved. trahoangdev</p>
          <p>Built with Next.js & Tailwind</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

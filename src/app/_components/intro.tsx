//import { CMS_NAME } from "@/lib/constants";

import { Terminal } from "./terminal";

export function Intro() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start justify-between mt-16 mb-16 md:mb-12 gap-8 md:gap-12">
      <div className="flex flex-col gap-4 flex-1 text-center md:text-left z-10">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 mb-2">
          The DevOrbit.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
          Chào mừng bạn đến với DevOrbit - nơi mình chia sẻ về hành trình lập trình, kỹ thuật phần mềm, và những câu chuyện nghề.
          <br className="hidden md:inline" /> Cùng khám phá vũ trụ công nghệ qua góc nhìn của một Software Engineer.
        </p>
      </div>

      <div className="w-full md:w-1/2 lg:w-[450px] flex-shrink-0">
        <Terminal />
      </div>
    </section>
  );
}

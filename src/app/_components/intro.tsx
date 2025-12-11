//import { CMS_NAME } from "@/lib/constants";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          The DevOrbit.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Nơi mình chia sẻ về hành trình lập trình, từ những dòng code đầu tiên đến các hệ thống phức tạp. Cùng khám phá vũ trụ công nghệ qua góc nhìn của một Software Engineer.
        </p>
      </div>
    </section>
  );
}

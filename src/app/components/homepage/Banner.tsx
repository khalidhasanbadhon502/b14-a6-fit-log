import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="w-full bg-[#111111] px-6 py-8">
      <div className="max-w-7xl mx-auto bg-[#18181b] border border-zinc-800 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
        
        <div className="max-w-xl z-10">
          <span className="text-[#b6fd00] text-xs font-bold tracking-widest uppercase mb-3 inline-block">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-6">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-zinc-400 text-sm md:text-base mb-8 leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="/workouts"
            className="inline-block bg-[#b6fd00] text-black font-bold px-7 py-3.5 rounded-xl text-sm transition hover:opacity-90"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="mt-10 md:mt-0 relative w-full md:w-[420px] h-[320px] md:h-[380px] z-10 flex items-center justify-center">
          <Image
            src="/banner.png"
            alt="Workout Banner"
            fill
            className="object-contain"
            priority
          />
        </div>

      </div>
    </div>
  );
}
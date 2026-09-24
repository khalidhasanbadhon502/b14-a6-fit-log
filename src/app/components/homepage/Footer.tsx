import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] border-t border-zinc-900/80 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <Image
            src="/Footer.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="text-white font-black text-xl tracking-wider uppercase">
            FITLOG
          </span>
        </div>

        <p className="text-zinc-500 text-xs md:text-sm tracking-wide text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
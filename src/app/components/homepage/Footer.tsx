export default function Footer() {
  return (
    <footer className="w-full bg-[#111111] border-t border-zinc-900/80 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="text-[#b6fd00] flex items-center justify-center">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 5h2v3H6V5zm10 0h2v3h-2V5zM4 9h16c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-2c0-1.1.9-2 2-2zm2 8h2v3H6v-3zm10 0h2v3h-2v-3z" />
            </svg>
          </div>
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
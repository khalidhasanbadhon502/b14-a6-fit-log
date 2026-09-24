import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#111111] text-white border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
       
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Fitlog Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold tracking-wider text-lg">FITLOG</span>
        </Link>

        
        <div className="flex items-center gap-2 p-1.5">
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full bg-[#b6fd00] text-black font-medium text-sm transition"
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className="px-4 py-1.5 rounded-full text-zinc-400 hover:text-white font-medium text-sm transition"
          >
            My Plan
          </Link>
        </div>

        
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#b6fd00] text-black font-bold flex items-center justify-center text-xs">
              0
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Saved</span>
            <span className="w-6 h-6 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold flex items-center justify-center text-xs">
              0
            </span>
          </div>
        </div>

      </div>
    </nav>
  );
}
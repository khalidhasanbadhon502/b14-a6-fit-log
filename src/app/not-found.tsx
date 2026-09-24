import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[#b6fd00] font-black text-6xl md:text-8xl mb-4">404</p>
      <h1 className="text-xl md:text-2xl font-extrabold uppercase mb-2">
        Page not found
      </h1>
      <p className="text-zinc-400 text-sm mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-[#b6fd00] text-black font-bold text-sm px-6 py-3 rounded-full hover:opacity-90 transition"
      >
        Go to workouts
      </Link>
    </div>
  );
}
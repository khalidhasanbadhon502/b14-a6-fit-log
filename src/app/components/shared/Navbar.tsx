"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../../context/PlanContext";

export default function Navbar() {
  const { plan, saved } = usePlan();
  const pathname = usePathname();

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout/");
  const isMyPlanActive = pathname === "/my-plan";

  const activeClass = "text-[#b6fd00] bg-[#b6fd00]/10";
  const inactiveClass = "text-white bg-transparent";

  return (
    <nav className="w-full bg-[#111111] text-white border-b border-zinc-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Fitlog Logo"
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold tracking-wider text-lg">FITLOG</span>
        </Link>

        <div className="flex items-center gap-2 p-1.5">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full font-medium text-sm transition ${
              isWorkoutsActive ? activeClass : inactiveClass
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full font-medium text-sm transition ${
              isMyPlanActive ? activeClass : inactiveClass
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/my-plan?tab=plan" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-zinc-400">Plan</span>
            <span className="w-6 h-6 rounded-full bg-[#b6fd00] text-black font-bold flex items-center justify-center text-xs">
              {plan.length}
            </span>
          </Link>

          <Link href="/my-plan?tab=saved" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-zinc-400">Saved</span>
            <span className="w-6 h-6 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold flex items-center justify-center text-xs">
              {saved.length}
            </span>
          </Link>
        </div>

      </div>
    </nav>
  );
}
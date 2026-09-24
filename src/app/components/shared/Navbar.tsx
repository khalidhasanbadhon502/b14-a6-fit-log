"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { usePlan } from "../../context/PlanContext";

export default function Navbar() {
  const { plan, saved } = usePlan();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWorkoutsActive = pathname === "/" || pathname.startsWith("/workout/");
  const isMyPlanActive = pathname === "/my-plan";

  const activeClass = "text-[#b6fd00] bg-[#b6fd00]/10";
  const inactiveClass = "text-white bg-transparent";

  return (
    <nav className="w-full bg-[#111111] text-white border-b border-zinc-800 px-4 md:px-6 py-4 relative">
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

        <div className="hidden md:flex items-center gap-2 p-1.5">
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

        <div className="hidden md:flex items-center gap-6 text-sm">
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

        <div className="flex md:hidden items-center gap-3">
          <Link href="/my-plan?tab=plan" className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full bg-[#b6fd00] text-black font-bold flex items-center justify-center text-[11px]">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan?tab=saved" className="flex items-center gap-1">
            <span className="w-6 h-6 rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 font-bold flex items-center justify-center text-[11px]">
              {saved.length}
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-1"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 pb-2">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition ${
              isWorkoutsActive ? activeClass : "text-white bg-zinc-900"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMenuOpen(false)}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition ${
              isMyPlanActive ? activeClass : "text-white bg-zinc-900"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </nav>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePlan } from "../context/PlanContext";

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "plan";

  const [activeTab, setActiveTab] = useState<"plan" | "saved">(initialTab);
  const [sortBy, setSortBy] = useState("Duration");
  const [doneIds, setDoneIds] = useState<number[]>([]);

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const list = activeTab === "plan" ? plan : saved;
  const sortedList = [...list].sort((a, b) => {
    if (sortBy === "Duration") return a.duration - b.duration;
    if (sortBy === "Calories") return a.caloriesBurned - b.caloriesBurned;
    if (sortBy === "Rating") return b.rating - a.rating;
    return 0;
  });

  const toggleDone = (id: number) => {
    setDoneIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-black uppercase mb-1">My Plan</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl flex flex-wrap justify-between px-8 py-6 mb-8">
          <div>
            <p className="text-zinc-500 text-xs mb-1">Exercises</p>
            <p className="text-2xl font-black text-[#b6fd00]">{plan.length}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs mb-1">Minutes</p>
            <p className="text-2xl font-black">{totalMinutes}</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs mb-1">Calories</p>
            <p className="text-2xl font-black">{totalCalories}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex bg-[#18181b] border border-zinc-800 rounded-full p-1">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === "plan" ? "bg-white text-black" : "text-zinc-400"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === "saved" ? "bg-white text-black" : "text-zinc-400"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-xs">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#18181b] border border-zinc-800 text-white text-xs rounded-lg px-3 py-1.5 outline-none"
            >
              <option value="Duration">Duration</option>
              <option value="Calories">Calories</option>
              <option value="Rating">Rating</option>
            </select>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-xl min-h-[300px] flex items-center justify-center p-8">
            <div className="text-center">
              <h3 className="font-black uppercase text-lg mb-2">Nothing here yet</h3>
              <p className="text-zinc-500 text-sm mb-5">
                Browse the library and add a lift to get today moving.
              </p>
              <Link
                href="/"
                className="inline-block bg-[#b6fd00] text-black font-bold text-xs px-5 py-2.5 rounded-full hover:opacity-90 transition"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {sortedList.map((workout) => {
              const isDone = doneIds.includes(workout.id);
              return (
                <div
                  key={workout.id}
                  className="bg-[#18181b] border border-zinc-800 rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold text-sm uppercase tracking-wide">
                      {workout.name}
                    </p>
                    <p className="text-zinc-500 text-xs mb-1">
                      {workout.equipment}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                        </svg>
                        {workout.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                        {workout.caloriesBurned} kcal
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="border border-zinc-700 text-white text-xs font-semibold px-4 py-2 rounded-full hover:border-zinc-600 transition whitespace-nowrap"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => toggleDone(workout.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition whitespace-nowrap ${
                          isDone
                            ? "bg-[#b6fd00] text-black"
                            : "bg-[#b6fd00]/90 text-black hover:opacity-90"
                        }`}
                      >
                        ✓ {isDone ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : removeFromSaved(workout.id)
                      }
                      className="text-zinc-500 hover:text-red-400 text-lg leading-none px-1"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
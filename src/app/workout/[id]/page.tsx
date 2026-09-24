"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "../../context/PlanContext";
import { useToast } from "../../context/ToastContext";
import { fetchWorkouts, Workout } from "../../lib/api";

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id as string;
  const { plan, addToPlan, addToSaved } = usePlan();
  const { showToast } = useToast();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetchWorkouts()
      .then((data) => {
        const found = data.find((item) => item.id.toString() === id);
        if (found) {
          setWorkout(found);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const isPlanFull = plan.length >= 5;

  const handleAddToPlan = () => {
    if (isPlanFull || !workout) return;
    addToPlan(workout);
    showToast("Added to today's plan");
  };

  const handleAddToSaved = () => {
    if (!workout) return;
    addToSaved(workout);
    showToast("Saved for later");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-[#b6fd00] rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm">Loading workout…</p>
      </div>
    );
  }

  if (notFound || !workout) {
    return <div className="text-white text-center py-20">Workout not found!</div>;
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-6">Details Page</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full h-[280px] sm:h-[350px] md:h-[500px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
            <img src={workout.image} alt={workout.name} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-2">
              {workout.name}
            </h1>
            <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {workout.muscleGroups.map((muscle, idx) => (
                <span key={idx} className="bg-[#b6fd00] text-black text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
                  {muscle}
                </span>
              ))}
            </div>

            <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl overflow-hidden mb-6">
              <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/80 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Equipment</span>
                <span className="text-white font-medium">{workout.equipment}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/80 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Difficulty</span>
                <span className="text-white font-medium">{workout.difficulty}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/80 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Sets</span>
                <span className="text-white font-medium">{workout.sets}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/80 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Reps</span>
                <span className="text-white font-medium">{workout.reps}</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/80 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Duration</span>
                <span className="text-white font-medium">{workout.duration} min</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 border-b border-zinc-800/80 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Calories</span>
                <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
              </div>
              <div className="flex justify-between items-center px-5 py-3 text-[13px]">
                <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[11px]">Rating</span>
                <span className="text-white font-medium">{workout.rating}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-[13px] uppercase tracking-wider mb-3">
                Instructions
              </h3>
              <ol className="flex flex-col gap-2 text-zinc-400 text-[13px]">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {idx + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToPlan}
                disabled={isPlanFull}
                title={isPlanFull ? "Today's plan is full (max 5 lifts)" : ""}
                className={`flex-1 font-bold text-[13px] py-3.5 px-6 rounded-full transition flex items-center justify-center gap-2 ${
                  isPlanFull
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-[#b6fd00] text-black hover:opacity-90"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {isPlanFull ? "Plan is full" : "Add to today's plan"}
              </button>
              <button
                onClick={handleAddToSaved}
                className="flex-1 bg-transparent border border-zinc-700 text-white font-bold text-[13px] py-3.5 px-6 rounded-full hover:border-zinc-600 transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                </svg>
                Save for later
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
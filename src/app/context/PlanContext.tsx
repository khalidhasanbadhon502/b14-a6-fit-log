"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("plan");
    const storedSaved = localStorage.getItem("saved");
    if (storedPlan) setPlan(JSON.parse(storedPlan));
    if (storedSaved) setSaved(JSON.parse(storedSaved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("plan", JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved, loaded]);

  const addToPlan = (workout: Workout) => {
    setPlan((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      if (prev.length >= 5) return prev;
      return [...prev, workout];
    });
  };

  const addToSaved = (workout: Workout) => {
    setSaved((prev) => {
      if (prev.find((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, addToSaved, removeFromPlan, removeFromSaved }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) throw new Error("usePlan must be used within PlanProvider");
  return context;
}
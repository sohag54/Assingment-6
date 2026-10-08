"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Workout } from "../types";

type PlanWorkout = Workout & {
  completed?: boolean;
};

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const [plan, setPlan] = useState<PlanWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [message, setMessage] = useState("");

  const loadData = () => {
    const savedPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const savedWorkouts = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlan(savedPlan);
    setSaved(savedWorkouts);
  };

  useEffect(() => {
    loadData();

    window.addEventListener("fitlog-update", loadData);

    return () => {
      window.removeEventListener("fitlog-update", loadData);
    };
  }, []);

  const showToast = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const removeFromPlan = (id: number) => {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout removed from your plan!");
  };

  const removeFromSaved = (id: number) => {
    const updatedSaved = saved.filter(
      (workout) => workout.id !== id
    );

    setSaved(updatedSaved);

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout removed from saved!");
  };

  const markDone = (id: number) => {
    const updatedPlan = plan.map((workout) =>
      workout.id === id
        ? {
            ...workout,
            completed: true,
          }
        : workout
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout marked as completed!");
  };

  const currentWorkouts =
    activeTab === "today" ? plan : saved;

  const sortedWorkouts = [...currentWorkouts].sort(
    (a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return a.rating - b.rating;
    }
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  const totalDuration = plan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0f] text-white">

        <section className="mx-auto max-w-[960px] px-[18px] pb-[55px] pt-[36px] sm:px-0">

          {/* PAGE HEADER */}
          <div>
            <h1
              className="text-white"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", Impact, sans-serif',
                fontSize: "30px",
                fontWeight: 900,
                lineHeight: "1",
              }}
            >
              MY PLAN
            </h1>

            <p className="mt-[7px] text-[10px] text-[#737a83]">
              Build your plan for today. Finish them, then load more.
            </p>
          </div>

          {/* STATS */}
          <div className="mt-[22px] grid grid-cols-1 overflow-hidden rounded-[8px] border border-[#252a30] bg-[#111419] sm:grid-cols-3">

            {/* EXERCISES */}
            <div className="border-b border-[#252a30] px-[14px] py-[16px] sm:border-b-0 sm:border-r">
              <p className="text-[7px] text-[#737a83]">
                Exercises
              </p>

              <p className="mt-[4px] text-[22px] font-black leading-none text-[#ccff00]">
                {plan.length}
              </p>
            </div>

            {/* MINUTES */}
            <div className="border-b border-[#252a30] px-[14px] py-[16px] sm:border-b-0 sm:border-r">
              <p className="text-[7px] text-[#737a83]">
                Minutes
              </p>

              <p className="mt-[4px] text-[22px] font-black leading-none text-white">
                {totalDuration}
              </p>
            </div>

            {/* CALORIES */}
            <div className="px-[14px] py-[16px]">
              <p className="text-[7px] text-[#737a83]">
                Calories
              </p>

              <p className="mt-[4px] text-[22px] font-black leading-none text-white">
                {totalCalories}
              </p>
            </div>

          </div>

          {/* TABS + SORT */}
          <div className="mt-[18px] flex items-center justify-between">

            {/* TABS */}
            <div className="flex h-[22px] overflow-hidden rounded-[5px] border border-[#252a30] bg-[#111419]">

              <button
                type="button"
                onClick={() => setActiveTab("today")}
                className={`px-[12px] text-[7px] ${
                  activeTab === "today"
                    ? "bg-[#1a1e25] text-white"
                    : "text-[#737a83]"
                }`}
              >
                Today&apos;s Plan
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`px-[12px] text-[7px] ${
                  activeTab === "saved"
                    ? "bg-[#1a1e25] text-white"
                    : "text-[#737a83]"
                }`}
              >
                Saved
              </button>

            </div>

            {/* SORT */}
            <div className="flex items-center gap-[6px]">
              <span className="text-[7px] text-[#737a83]">
                Sort By
              </span>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(
                      event.target.value as SortOption
                    )
                  }
                  className="h-[23px] appearance-none rounded-[5px] border border-[#30353b] bg-[#111419] py-0 pl-[9px] pr-[22px] text-[7px] text-[#c5cad0] outline-none"
                >
                  <option value="duration">
                    Duration
                  </option>

                  <option value="calories">
                    Calories
                  </option>

                  <option value="rating">
                    Rating
                  </option>
                </select>

                <span className="pointer-events-none absolute right-[7px] top-1/2 -translate-y-1/2 text-[7px] text-[#737a83]">
                 ⌄
                </span>
              </div>
            </div>

          </div>

          {/* EMPTY STATE */}
          {sortedWorkouts.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#30353b] text-[17px] text-[#737a83]">
                +
              </div>

              <p className="mt-[15px] text-[9px] text-[#737a83]">
                Browse the library and add a lift to get today moving.
              </p>

              <h2 className="mt-[9px] text-[12px] font-black text-white">
                NOTHING HERE YET
              </h2>

              <Link
                href="/#library"
                className="mt-[15px] flex h-[30px] items-center justify-center rounded-full bg-[#ccff00] px-[17px] text-[8px] font-black text-black transition hover:bg-white"
              >
                GO TO WORKOUTS
              </Link>

            </div>
          )}

          {/* WORKOUT LIST */}
          {sortedWorkouts.length > 0 && (
            <div className="mt-[14px] flex flex-col gap-[9px]">

              {sortedWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className={`flex min-h-[66px] items-center gap-[12px] rounded-[8px] border bg-[#111419] px-[9px] py-[9px] ${
                    "completed" in workout &&
                    workout.completed
                      ? "border-[#ccff00]/30"
                      : "border-[#252a30]"
                  }`}
                >

                  {/* IMAGE */}
                  <div className="h-[48px] w-[82px] shrink-0 overflow-hidden rounded-[6px]">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className={`h-full w-full object-cover ${
                        "completed" in workout &&
                        workout.completed
                          ? "opacity-50"
                          : ""
                      }`}
                    />
                  </div>

                  {/* WORKOUT INFO */}
                  <div className="min-w-0 flex-1">

                    <h2 className="truncate text-[9px] font-black uppercase leading-[12px] text-white">
                      {workout.name}
                    </h2>

                    <p className="mt-[1px] truncate text-[7px] text-[#737a83]">
                      {workout.equipment}
                    </p>

                    <div className="mt-[5px] flex items-center gap-[9px] text-[7px] text-[#9ca3ab]">

                      <span className="flex items-center gap-[3px]">
                        <span className="text-[#ccff00]">
                          ◷
                        </span>
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-[3px]">
                        <span className="text-[#ccff00]">
                          ●
                        </span>
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-[3px]">
                        <span className="text-[#ccff00]">
                          ★
                        </span>
                        {workout.rating}
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}
                  <div className="flex shrink-0 items-center gap-[9px]">

                    {/* VIEW DETAILS */}
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="flex h-[22px] items-center justify-center rounded-[12px] border border-[#343941] px-[10px] text-[7px] font-medium text-[#d1d5db] transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      View Details
                    </Link>

                    {/* REMOVE */}
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === "today") {
                          removeFromPlan(workout.id);
                        } else {
                          removeFromSaved(workout.id);
                        }
                      }}
                      className="flex h-[20px] w-[20px] items-center justify-center text-[11px] text-[#666d76] transition hover:text-red-400"
                      aria-label="Remove workout"
                    >
                      ×
                    </button>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </main>

      {/* SAME FOOTER EVERYWHERE */}
      <Footer />

      {/* TOAST */}
      {message && (
        <div className="fixed bottom-[22px] left-1/2 z-50 -translate-x-1/2 rounded-[5px] border border-[#30353b] bg-[#15191f] px-[16px] py-[9px] text-[9px] font-medium text-white shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}
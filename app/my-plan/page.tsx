"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Workout } from "../types";

type CompletedWorkout = Workout & {
  completed?: boolean;
};

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [plan, setPlan] = useState<CompletedWorkout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
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

  // Remove workout from today's plan
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

  // Remove workout from saved
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

  // Mark workout as completed
  const markDone = (id: number) => {
    const updatedPlan = plan.map((workout) =>
      workout.id === id
        ? { ...workout, completed: true }
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

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const totalDuration = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0f] text-white">
        <section className="mx-auto max-w-[960px] px-0 pb-[70px] pt-[36px]">

          {/* Heading */}
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

            <p className="mt-[7px] text-[11px] text-[#8b929b]">
              Build your training plan and keep track of your workouts
            </p>
          </div>

          {/* Metrics */}
          <div className="mt-[28px] grid grid-cols-1 gap-[12px] sm:grid-cols-3">

            <div className="rounded-[8px] border border-[#292d32] bg-[#15181c] px-[18px] py-[16px]">
              <p className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#737a83]">
                WORKOUTS
              </p>

              <p className="mt-[5px] text-[22px] font-black text-[#ccff00]">
                {plan.length}
              </p>
            </div>

            <div className="rounded-[8px] border border-[#292d32] bg-[#15181c] px-[18px] py-[16px]">
              <p className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#737a83]">
                CALORIES
              </p>

              <p className="mt-[5px] text-[22px] font-black text-white">
                {totalCalories}
              </p>
            </div>

            <div className="rounded-[8px] border border-[#292d32] bg-[#15181c] px-[18px] py-[16px]">
              <p className="text-[8px] font-bold uppercase tracking-[0.08em] text-[#737a83]">
                DURATION
              </p>

              <p className="mt-[5px] text-[22px] font-black text-white">
                {totalDuration}
                <span className="ml-[4px] text-[9px] font-medium text-[#737a83]">
                  min
                </span>
              </p>
            </div>

          </div>

          {/* Tabs */}
          <div className="mt-[30px] flex items-center gap-[20px] border-b border-[#292d32]">

            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`pb-[10px] text-[10px] font-bold ${
                activeTab === "today"
                  ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                  : "text-[#737a83] hover:text-white"
              }`}
            >
              TODAY ({plan.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`pb-[10px] text-[10px] font-bold ${
                activeTab === "saved"
                  ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                  : "text-[#737a83] hover:text-white"
              }`}
            >
              SAVED ({saved.length})
            </button>

          </div>

          {/* Empty State */}
          {currentWorkouts.length === 0 && (
            <div className="flex min-h-[260px] flex-col items-center justify-center text-center">

              <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#30353b] text-[18px] text-[#737a83]">
                +
              </div>

              <h2 className="mt-[14px] text-[13px] font-black text-white">
                {activeTab === "today"
                  ? "YOUR PLAN IS EMPTY"
                  : "NO SAVED WORKOUTS"}
              </h2>

              <p className="mt-[7px] max-w-[300px] text-[10px] leading-[15px] text-[#737a83]">
                {activeTab === "today"
                  ? "Add workouts from the library to start building your training plan."
                  : "Save workouts from the library to find them here later."}
              </p>

              <Link
                href="/#library"
                className="mt-[16px] flex h-[30px] items-center justify-center bg-[#ccff00] px-[15px] text-[9px] font-black text-black transition hover:bg-white"
              >
                BROWSE WORKOUTS
              </Link>

            </div>
          )}

          {/* Workout Cards */}
          {currentWorkouts.length > 0 && (
            <div className="mt-[22px] grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">

              {currentWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className={`overflow-hidden rounded-[10px] border bg-[#15181c] ${
                    "completed" in workout && workout.completed
                      ? "border-[#ccff00]/40"
                      : "border-[#292d32]"
                  }`}
                >

                  {/* Image */}
                  <div className="relative h-[150px] overflow-hidden">
                    <img
                      src={workout.image}
                      alt={workout.name}
                      className={`h-full w-full object-cover ${
                        "completed" in workout && workout.completed
                          ? "opacity-50"
                          : ""
                      }`}
                    />

                    {"completed" in workout && workout.completed && (
                      <div className="absolute right-[10px] top-[10px] rounded-full bg-[#ccff00] px-[8px] py-[4px] text-[7px] font-black text-black">
                        ✓ DONE
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="px-[16px] pb-[16px] pt-[15px]">

                    {/* Muscle Groups */}
                    <div className="flex flex-wrap gap-[6px]">
                      {workout.muscleGroups
                        .slice(0, 2)
                        .map((muscle) => (
                          <span
                            key={muscle}
                            className="rounded-full bg-[#ccff00] px-[8px] py-[3px] text-[7px] font-black uppercase leading-none text-black"
                          >
                            {muscle}
                          </span>
                        ))}
                    </div>

                    {/* Name */}
                    <h2
                      className="mt-[11px] text-white"
                      style={{
                        fontFamily:
                          '"Arial Narrow", "Roboto Condensed", sans-serif',
                        fontSize: "15px",
                        fontWeight: 900,
                        lineHeight: "1",
                      }}
                    >
                      {workout.name.toUpperCase()}
                    </h2>

                    {/* Stats */}
                    <div className="mt-[12px] flex items-center gap-[12px] text-[8px] text-[#8b929b]">
                      <span>
                        ◷ {workout.duration} min
                      </span>

                      <span>
                        ● {workout.caloriesBurned} kcal
                      </span>

                      <span>
                        ☆ {workout.rating}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="my-[12px] h-[1px] bg-[#292d32]" />

                    {/* Actions */}
                    <div className="flex gap-[7px]">

                      <Link
                        href={`/workouts/${workout.id}`}
                        className="flex h-[27px] flex-1 items-center justify-center rounded-[4px] border border-[#343941] text-[8px] font-bold text-[#d1d5db] transition hover:border-[#ccff00] hover:text-[#ccff00]"
                      >
                        VIEW DETAILS
                      </Link>

                      {activeTab === "today" ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (
                              "completed" in workout &&
                              workout.completed
                            ) {
                              removeFromPlan(workout.id);
                            } else {
                              markDone(workout.id);
                            }
                          }}
                          className={`flex h-[27px] flex-1 items-center justify-center rounded-[4px] text-[8px] font-black transition ${
                            "completed" in workout &&
                            workout.completed
                              ? "border border-[#343941] text-[#9ca3ab] hover:border-red-400 hover:text-red-400"
                              : "bg-[#ccff00] text-black hover:bg-white"
                          }`}
                        >
                          {"completed" in workout &&
                          workout.completed
                            ? "REMOVE"
                            : "MARK DONE"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            removeFromSaved(workout.id)
                          }
                          className="flex h-[27px] flex-1 items-center justify-center rounded-[4px] border border-[#343941] text-[8px] font-black text-[#d1d5db] transition hover:border-red-400 hover:text-red-400"
                        >
                          REMOVE
                        </button>
                      )}

                    </div>

                  </div>
                </article>
              ))}

            </div>
          )}

        </section>
      </main>

      {/* Toast */}
      {message && (
        <div className="fixed bottom-[25px] left-1/2 z-50 -translate-x-1/2 rounded-[6px] border border-[#30353b] bg-[#15191f] px-[18px] py-[10px] text-[10px] font-medium text-white shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}
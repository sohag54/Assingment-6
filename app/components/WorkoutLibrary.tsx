"use client";

import { useEffect, useState } from "react";
import { Workout } from "../types";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch {
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section
  id="library"
  className="mx-auto max-w-[960px] px-0 pb-[70px] pt-[55px]"
>
      {/* Heading */}
      <div className="mb-[28px]">
        <h2
          className="text-white"
          style={{
            fontFamily: '"Arial Narrow", "Roboto Condensed", sans-serif',
            fontSize: "30px",
            fontWeight: 900,
            lineHeight: "1",
            letterSpacing: "-0.5px",
          }}
        >
          THE LIBRARY
        </h2>

        <p className="mt-[6px] text-[11px] text-[#8b929b]">
          Twelve lifts covering every major muscle group
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-[50px] text-center text-[11px] text-[#8b929b]">
          Loading workouts...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="py-[50px] text-center text-[11px] text-red-400">
          {error}
        </div>
      )}

      {/* Cards */}
      {!loading && !error && (
       <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <article
              key={workout.id}
              className="overflow-hidden rounded-[12px] border border-[#292d32] bg-[#15181c]"
            >
              {/* Image */}
              <div className="h-[168px] overflow-hidden">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="px-[21px] pb-[18px] pt-[19px]">
                {/* Muscle Groups */}
                <div className="flex min-h-[20px] flex-wrap gap-[7px]">
                  {workout.muscleGroups.slice(0, 2).map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-[#ccff00] px-[10px] py-[3px] text-[8px] font-black uppercase leading-none text-black"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Workout Name */}
                <h3
                  className="mt-[13px] text-white"
                  style={{
                    fontFamily:
                      '"Arial Narrow", "Roboto Condensed", sans-serif',
                    fontSize: "17px",
                    fontWeight: 900,
                    lineHeight: "1",
                    letterSpacing: "0px",
                  }}
                >
                  {workout.name.toUpperCase()}
                </h3>

                {/* Equipment */}
                <p className="mt-[7px] text-[10px] text-[#8b929b]">
                  {workout.equipment}
                </p>

                {/* Divider */}
                <div className="my-[13px] h-[1px] bg-[#292d32]" />

                {/* Stats */}
                <div className="flex items-center gap-[14px] text-[9px] text-[#9299a2]">
                  <span className="flex items-center gap-[5px]">
                    <span className="text-[12px]">◷</span>
                    {workout.duration} min
                  </span>

                  <span className="flex items-center gap-[5px]">
                    <span className="text-[11px]">●</span>
                    {workout.caloriesBurned} kcal
                  </span>

                  <span className="flex items-center gap-[5px]">
                    <span className="text-[12px]">☆</span>
                    {workout.rating}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
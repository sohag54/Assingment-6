import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Workout } from "../../types";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DetailsPage({ params }: PageProps) {
  const { id } = await params;

  let workout: Workout | null = null;

  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Workout not found");
    }

    workout = await response.json();
  } catch {
    workout = null;
  }

  if (!workout) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[calc(100vh-62px)] items-center justify-center bg-[#0b0d0f] px-5 text-white">
          <div className="text-center">
            <h1 className="text-[32px] font-black">WORKOUT NOT FOUND</h1>

            <p className="mt-3 text-[12px] text-[#8b929b]">
              The workout you are looking for does not exist.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex h-[32px] items-center justify-center bg-[#ccff00] px-5 text-[10px] font-black text-black"
            >
              BACK TO LIBRARY
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-white">
      <Navbar />

      {/* Details Section */}
      <section className="mx-auto max-w-[960px] px-0 pb-[45px] pt-[31px]">
        <div className="grid grid-cols-1 gap-[36px] lg:grid-cols-[377px_1fr]">
          
          {/* Left Image */}
          <div className="overflow-hidden rounded-[10px]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-[471px] w-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="pt-[1px]">
            
            {/* Title */}
            <h1
              className="text-white"
              style={{
                fontFamily:
                  '"Arial Narrow", "Roboto Condensed", Impact, sans-serif',
                fontSize: "26px",
                fontWeight: 900,
                lineHeight: "1",
              }}
            >
              {workout.name.toUpperCase()}
            </h1>

            {/* Description */}
            <p className="mt-[10px] max-w-[375px] text-[11px] leading-[16px] text-[#8b929b]">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mt-[12px] flex flex-wrap gap-[7px]">
              {workout.muscleGroups.slice(0, 2).map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-[10px] py-[4px] text-[8px] font-black uppercase leading-none text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-[19px] overflow-hidden rounded-[10px] border border-[#252a31] bg-[#15191f]">
              
              {/* Equipment */}
              <div className="flex h-[31px] items-center justify-between border-b border-[#242930] px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  EQUIPMENT
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.equipment}
                </span>
              </div>

              {/* Difficulty */}
              <div className="flex h-[31px] items-center justify-between border-b border-[#242930] px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  DIFFICULTY
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.difficulty}
                </span>
              </div>

              {/* Sets */}
              <div className="flex h-[31px] items-center justify-between border-b border-[#242930] px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  SETS
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.sets}
                </span>
              </div>

              {/* Reps */}
              <div className="flex h-[31px] items-center justify-between border-b border-[#242930] px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  REPS
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.reps}
                </span>
              </div>

              {/* Duration */}
              <div className="flex h-[31px] items-center justify-between border-b border-[#242930] px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  DURATION
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.duration} min
                </span>
              </div>

              {/* Calories */}
              <div className="flex h-[31px] items-center justify-between border-b border-[#242930] px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  CALORIES
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              {/* Rating */}
              <div className="flex h-[31px] items-center justify-between px-[15px]">
                <span className="text-[8px] font-bold uppercase tracking-[0.05em] text-[#8b929b]">
                  RATING
                </span>

                <span className="text-[9px] text-[#d6d9dd]">
                  {workout.rating}
                </span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-[22px]">
              <h2 className="text-[11px] font-black uppercase text-white">
                INSTRUCTIONS
              </h2>

              <ol className="mt-[9px] space-y-[7px]">
                {workout.instructions.slice(0, 4).map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-[10px] text-[9px] leading-[13px] text-[#9ca3ab]"
                  >
                    <span className="w-[10px] shrink-0 text-[#737a83]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <div className="mt-[22px] flex flex-wrap gap-[10px]">
              
              {/* Add Button */}
              <button
                type="button"
                className="flex h-[29px] items-center gap-[7px] rounded-[5px] bg-[#ccff00] px-[14px] text-[9px] font-black text-black transition hover:bg-white"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="5" y="4" width="14" height="17" rx="2" />
                  <path d="M9 2v4M15 2v4M8 10h8M8 14h5" />
                </svg>

                Add to today&apos;s plan
              </button>

              {/* Save Button */}
              <button
                type="button"
                className="flex h-[29px] items-center gap-[7px] rounded-[5px] border border-[#343941] px-[14px] text-[9px] font-medium text-[#d1d5db] transition hover:border-[#ccff00] hover:text-[#ccff00]"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 4h12v17l-6-4-6 4V4z" />
                </svg>

                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#202328]">
        <div className="mx-auto flex h-[54px] max-w-[960px] items-center justify-between">
          
          <div className="flex items-center gap-[6px]">
            <span className="text-[14px] text-[#ccff00]">⚒</span>

            <span className="text-[8px] font-black tracking-[0.5px] text-white">
              FITLOG
            </span>
          </div>

          <p className="text-[8px] text-[#666d76]">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </footer>
    </main>
  );
}
import Link from "next/link";
import Image from "next/image";
import { Workout } from "../../types";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetails({ params }: PageProps) {
  const { id } = await params;

  let workout: Workout | null = null;

  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/fitlog",
      {
        cache: "no-store",
      }
    );

    const workouts: Workout[] = await response.json();

    workout = workouts.find((item) => item.id === Number(id)) || null;
  } catch (error) {
    workout = null;
  }

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0b0d0f] px-[20px] py-[80px] text-center text-white">
        <h1 className="text-[28px] font-black">Workout Not Found</h1>

        <Link
          href="/"
          className="mt-[20px] inline-block bg-[#ccff00] px-[20px] py-[10px] text-[10px] font-black text-black"
        >
          BACK TO WORKOUTS
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-white">
      <div className="mx-auto max-w-[960px] px-[20px] py-[40px]">

        {/* Back */}
        <Link
          href="/"
          className="mb-[25px] inline-block text-[10px] font-bold text-[#9ca3af] hover:text-[#ccff00]"
        >
          ← BACK TO WORKOUTS
        </Link>

        <div className="overflow-hidden rounded-[10px] border border-[#252a2e] bg-[#111417]">

          {/* Image */}
          <div className="h-[320px] w-full bg-[#181b1f]">
            <Image
              src={workout.image}
              alt={workout.name}
              width={960}
              height={320}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-[30px]">

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase text-[#ccff00]">
                {workout.difficulty}
              </span>

              <span className="text-[11px] text-[#9ca3af]">
                ★ {workout.rating}
              </span>
            </div>

            <h1 className="mt-[10px] text-[36px] font-black uppercase">
              {workout.name}
            </h1>

            <p className="mt-[12px] max-w-[700px] text-[12px] leading-[20px] text-[#9ca3af]">
              {workout.description}
            </p>

            {/* Stats */}
            <div className="mt-[25px] grid grid-cols-2 gap-[10px] sm:grid-cols-4">

              <div className="border border-[#252a2e] p-[15px]">
                <p className="text-[9px] text-[#737980]">DURATION</p>
                <p className="mt-[5px] text-[16px] font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="border border-[#252a2e] p-[15px]">
                <p className="text-[9px] text-[#737980]">CALORIES</p>
                <p className="mt-[5px] text-[16px] font-bold">
                  {workout.caloriesBurned}
                </p>
              </div>

              <div className="border border-[#252a2e] p-[15px]">
                <p className="text-[9px] text-[#737980]">SETS</p>
                <p className="mt-[5px] text-[16px] font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="border border-[#252a2e] p-[15px]">
                <p className="text-[9px] text-[#737980]">REPS</p>
                <p className="mt-[5px] text-[16px] font-bold">
                  {workout.reps}
                </p>
              </div>

            </div>

            {/* Muscle Groups */}
            <div className="mt-[30px]">
              <h2 className="text-[14px] font-bold uppercase">
                Muscle Groups
              </h2>

              <div className="mt-[10px] flex flex-wrap gap-[8px]">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="border border-[#353a40] px-[10px] py-[5px] text-[9px] text-[#9ca3af]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="mt-[25px]">
              <h2 className="text-[14px] font-bold uppercase">
                Equipment
              </h2>

              <div className="mt-[10px] flex flex-wrap gap-[8px]">
                <div className="mt-[10px] text-[10px] text-[#9ca3af]">
  {workout.equipment}
</div>
                  <span
                    key={item}
                    className="border border-[#353a40] px-[10px] py-[5px] text-[9px] text-[#9ca3af]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-[30px]">
              <h2 className="text-[14px] font-bold uppercase">
                Instructions
              </h2>

              <div className="mt-[12px] space-y-[10px]">
                {workout.instructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex gap-[12px] text-[11px] leading-[18px] text-[#9ca3af]"
                  >
                    <span className="font-bold text-[#ccff00]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
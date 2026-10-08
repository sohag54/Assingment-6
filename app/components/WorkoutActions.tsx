"use client";

import { useState } from "react";
import { Workout } from "../types";

type WorkoutActionsProps = {
  workout: Workout;
};

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const [message, setMessage] = useState("");

  const showToast = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const addToPlan = () => {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const alreadyAdded = existingPlan.some(
      (item: Workout) => item.id === workout.id
    );

    if (alreadyAdded) {
      showToast("Already added to today's plan!");
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout added to today's plan!");
  };

  const saveForLater = () => {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const alreadySaved = existingSaved.some(
      (item: Workout) => item.id === workout.id
    );

    if (alreadySaved) {
      showToast("Workout is already saved!");
      return;
    }

    const updatedSaved = [...existingSaved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(new Event("fitlog-update"));

    showToast("Workout saved for later!");
  };

  return (
    <>
      {/* Buttons */}
      <div className="mt-[22px] flex flex-wrap gap-[10px]">
        {/* Add to Plan */}
        <button
          type="button"
          onClick={addToPlan}
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

        {/* Save */}
        <button
          type="button"
          onClick={saveForLater}
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

      {/* Toast */}
      {message && (
        <div className="fixed bottom-[25px] left-1/2 z-50 -translate-x-1/2 rounded-[6px] border border-[#30353b] bg-[#15191f] px-[18px] py-[10px] text-[10px] font-medium text-white shadow-lg">
          {message}
        </div>
      )}
    </>
  );
}
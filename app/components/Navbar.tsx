"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener("fitlog-update", updateCounts);

    return () => {
      window.removeEventListener(
        "fitlog-update",
        updateCounts
      );
    };
  }, []);

  return (
    <nav className="border-b border-[#202328] bg-[#0b0d0f]">
      <div className="mx-auto flex h-[62px] max-w-[960px] items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-[7px]">
          <Image
            src={logo}
            alt="FitLog"
            width={20}
            height={20}
            className="h-[20px] w-[20px] object-contain"
            priority
          />

          <span
            className="text-[14px] font-extrabold tracking-[0.2px] text-white"
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            FITLOG
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-[16px] md:flex">
          <a
            href="/#library"
            className="rounded-full bg-[#1d2b05] px-[14px] py-[6px] text-[10px] font-bold text-[#ccff00]"
          >
            Workouts
          </a>

          <a
            href="/#plan"
            className="px-[2px] text-[10px] font-medium text-[#9ca3af] transition hover:text-white"
          >
            My Plan
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-[18px] md:flex">

          {/* Plan */}
          <div className="flex items-center gap-[6px] text-[9px] text-[#9ca3af]">
            <span>Plan</span>

            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#ccff00] text-[8px] font-bold text-black">
              {planCount}
            </span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-[6px] text-[9px] text-[#9ca3af]">
            <span>Saved</span>

            <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full border border-[#353a40] text-[8px] text-[#9ca3af]">
              {savedCount}
            </span>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <span className="block h-[2px] w-[20px] bg-[#ccff00]" />
          <span className="my-[4px] block h-[2px] w-[20px] bg-[#ccff00]" />
          <span className="block h-[2px] w-[20px] bg-[#ccff00]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#202328] bg-[#0b0d0f] px-[25px] py-[18px] md:hidden">
          <div className="flex flex-col gap-[15px]">

            <a
              href="/#library"
              className="text-[11px] font-bold text-[#ccff00]"
            >
              Workouts
            </a>

            <a
              href="/#plan"
              className="text-[11px] font-medium text-[#9ca3af]"
            >
              My Plan
            </a>

            <div className="flex gap-[18px] text-[10px] text-[#9ca3af]">
              <span>Plan {planCount}</span>
              <span>Saved {savedCount}</span>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
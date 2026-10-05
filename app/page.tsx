import Image from "next/image";
import banner from "../assets/banner.png";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0d0f] text-white">
        <section className="mx-auto max-w-[960px] px-[0px] pt-[36px]">
          <div className="flex h-[350px] w-full items-center rounded-[10px] border border-[#252a2e] bg-[#111417] px-[43px]">
            
            <div className="flex w-full items-center justify-between">
              
              {/* Left Content */}
              <div className="flex w-[540px] flex-col">
                <p className="mb-[20px] text-[9px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
                  WORKOUT LIBRARY
                </p>

                <h1
                  className="text-white"
                  style={{
                    fontFamily:
                      "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                    fontSize: "50px",
                    lineHeight: "0.94",
                    letterSpacing: "0px",
                    wordSpacing: "4px",
                  }}
                >
                  <span className="block whitespace-nowrap">
                    TRAIN WITH INTENT. LOG
                  </span>

                  <span className="block whitespace-nowrap">
                    EVERY SET.
                  </span>
                </h1>

                <p className="mt-[16px] w-[430px] text-[12px] leading-[18px] text-[#9ca3af]">
                  FitLog is a dark, no-nonsense gym companion: pick a lift, lock
                  it into today&apos;s plan, and watch the week&apos;s work add
                  up.
                </p>

                <a
                  href="#library"
                  className="mt-[20px] flex h-[32px] w-[139px] items-center justify-center bg-[#ccff00] text-[9px] font-black text-black transition hover:bg-white"
                >
                  BROWSE WORKOUTS
                </a>
              </div>

              {/* Right Image */}
              <div className="flex h-[200px] w-[200px] items-center justify-center">
                <Image
                  src={banner}
                  alt="FitLog workout"
                  width={200}
                  height={200}
                  priority
                  className="h-[200px] w-[200px] object-contain"
                />
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}
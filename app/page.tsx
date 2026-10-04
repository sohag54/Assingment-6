import Image from "next/image";
import banner from "../assets/banner.png";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0d0f] text-white">
      {/* Hero Section */}
      <section className="mx-auto flex min-h-[430px] max-w-[1064px] items-center px-[50px]">
  <div className="flex min-h-[390px] w-full items-center rounded-[4px] border border-[#252a2e] bg-[#111417] px-[50px]">
    
    <div className="flex w-full items-center justify-between">

      {/* Left Content */}
      <div className="flex h-[300px] w-[558px] flex-col justify-center">
        <p className="mb-[22px] text-[10px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
          WORKOUT LIBRARY
        </p>

        <h1
          className="text-white"
          style={{
            fontFamily:
              "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
            fontSize: "52px",
            lineHeight: "0.95",
            letterSpacing: "0px",
            wordSpacing: "5px",
          }}
        >
          <span className="block whitespace-nowrap">
            TRAIN WITH INTENT. LOG
          </span>

          <span className="mt-[3px] block whitespace-nowrap">
            EVERY SET.
          </span>
        </h1>

        <p className="mt-[17px] w-[500px] text-[14px] leading-[21px] text-[#9ca3af]">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <a
          href="#library"
          className="mt-[20px] flex h-[35px] w-[155px] items-center justify-center bg-[#ccff00] text-[10px] font-black text-black transition hover:bg-white"
        >
          BROWSE WORKOUTS
        </a>
      </div>

      {/* Right Image */}
      <div className="flex h-[290px] w-[290px] items-center justify-center">
        <Image
          src={banner}
          alt="FitLog workout"
          width={290}
          height={290}
          priority
          className="h-[290px] w-[290px] object-contain"
        />
      </div>

    </div>
  </div>
</section>
    </main>
  );
}
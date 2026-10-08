import Image from "next/image";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#202328]">
      <div className="mx-auto flex h-[54px] max-w-[960px] items-center justify-between">
        
        <div className="flex items-center gap-[7px]">
          <Image
            src={logo}
            alt="FitLog"
            width={20}
            height={20}
            className="h-[20px] w-[20px] object-contain"
          />

          <span className="text-[8px] font-black tracking-[0.5px] text-white">
            FITLOG
          </span>
        </div>

        <p className="text-[8px] text-[#666d76]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}
"use client";

import { ChevronDown } from "lucide-react";

interface Step2ELocationProps {
  value: string;
  onChange: (value: string) => void;
  onOpenDropdown: () => void;
}

export default function Step2ELocation({
  value,
  onOpenDropdown,
}: Step2ELocationProps) {
  return (
    <div className="text-center flex flex-col justify-center items-center">
      {/* Step label */}
      <p className="text-[14px] font-normal text-[#171717]">Step 2: Location</p>

      {/* Question */}
      <h2 className="mt-6 text-[21px] font-bold leading-[1.2] text-[#080808] sm:text-[22px]">
        What state will you be operating from?
      </h2>

      {/* Selected state */}
      <button
        type="button"
        onClick={onOpenDropdown}
        className="
          relative
          mt-8
          flex
          h-14
          w-full
          lg:w-130
          items-center
          justify-center
          lg:justify-start
          rounded-full
          bg-[#f1f2f4]
          px-8
          text-[20px]
          font-normal
          text-[#111c35]
          transition
          hover:bg-[#ebeced]
        "
      >
        <span>{value}</span>

        <ChevronDown
          size={24}
          strokeWidth={2}
          className="
            absolute
            right-8
            text-[#111111]
          "
        />
      </button>
    </div>
  );
}

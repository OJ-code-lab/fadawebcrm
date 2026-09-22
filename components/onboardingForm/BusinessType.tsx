interface businessTypeProps {
  value: "New Business" | "Existing Business" | null;
  onChange: (value: "New Business" | "Existing Business") => void;
}

export default function BusinessType({ value, onChange }: businessTypeProps) {
  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center p-2">
        <p className="text-center">Start</p>
        <h1 className="text-[18px] font-semibold leading-tight tracking-[-0.5px] text-[#172033] mt-5">
          What type of business do you want to register
        </h1>

        <p className="mt-3 text-[12px] leading-5 text-[#667085]">
          Select your business types.
        </p>
      </div>

      {/* Options */}
      <div className="mt-3 space-y-3 flex flex-col justify-center items-center ">
        {/* New business */}
        <button
          type="button"
          onClick={() => onChange("New Business")}
          aria-pressed={value === "New Business"}
          className={`flex w-full items-center justify-center lg:justify-start lg:w-130 gap-3 rounded-[30px] border h-14 text-center transition-all duration-200 sm:px-5 sm:py-4.5

            ${
              value === "New Business"
                ? "bg-[#2563EB] text-white"
                : "border-0 bg-[#F3F4F6] hover:border-[#B8C0CA]"
            }
          `}
        >
          <span className="text-sm font-medium sm:text-base">
            Register a new business
          </span>
        </button>

        {/* Existing business */}
        <button
          type="button"
          onClick={() => onChange("Existing Business")}
          aria-pressed={value === "Existing Business"}
          className={` flex w-full items-center justify-center lg:w-130 lg:justify-start gap-3 rounded-[30px] border h-14 text-left transition-all duration-200 sm:px-5 sm:py-4.5

            ${
              value === "Existing Business"
                ? "bg-[#2563EB] text-white"
                : "border-0 bg-[#F3F4F6] hover:border-[#B8C0CA]"
            }
          `}
        >
          <span className="text-sm font-medium sm:text-base">
            Register an existing business
          </span>
        </button>
      </div>
    </div>
  );
}

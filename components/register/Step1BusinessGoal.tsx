interface Step1BusinessGoalProps {
  value: "new" | "existing" | null;
  onChange: (value: "new" | "existing") => void;
}

export default function Step1BusinessGoal({
  value,
  onChange,
}: Step1BusinessGoalProps) {
  return (
    <div className="w-full">
      {/* Heading */}
      <div className="text-center p-2">
        <p className="text-center">Start</p>
        <h1 className="text-[18px] font-semibold leading-[1.25] tracking-[-0.5px] text-[#172033] mt-5">
          Where do you want to register your business
        </h1>

        <p className="mt-3 text-[12px] leading-5 text-[#667085]">
          Select the country where you want to establish your business.
        </p>
      </div>

      {/* Options */}
      <div className="mt-3 space-y-3 flex flex-col justify-center items-center ">
        {/* New business */}
        <button
          type="button"
          onClick={() => onChange("new")}
          aria-pressed={value === "new"}
          className={`
            flex
            w-full 
            items-center
            justify-center
            lg:justify-start
            lg:w-130
            gap-3
            rounded-[30px]
            border
            h-14
            text-center
            transition-all
            duration-200
            sm:px-5
            sm:py-[18px]

            ${
              value === "new"
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
          onClick={() => onChange("existing")}
          aria-pressed={value === "existing"}
          className={`
            flex
            w-full
            items-center
            justify-center
            lg:w-130
            lg:justify-start
            gap-3
            rounded-[30px]
            border
            h-14
            text-left
            transition-all
            duration-200
            sm:px-5
            sm:py-[18px]

            ${
              value === "existing"
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

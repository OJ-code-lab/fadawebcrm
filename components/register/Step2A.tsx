"use client";

interface Step2AProps {
  value: "yes" | "no" | "Select your state" | null;
  onChange: (value: "yes" | "no" | "Select your state") => void;
}

export default function Step2A({ value, onChange }: Step2AProps) {
  return (
    <div className="w-full">
      {/* Step title */}
      <p className="text-center text-sm font-normal text-[#111827]">
        Step 2: Location
      </p>

      {/* Question */}
      <h2 className="mt-6 text-center text-xl font-bold leading-tight text-black">
        Are you personally based in the US?
      </h2>

      {/* Options */}
      <div className="mt-8 space-y-4 flex flex-col justify-center items-center ">
        <button
          type="button"
          onClick={() => onChange("yes")}
          className={`w-full lg:w-130 h-14 rounded-full px-6 py-4 text-center text-lg transition lg:text-left ${
            value === "yes"
              ? "bg-[#2563EB] text-white"
              : "bg-[#F1F2F4] text-[#111C35]"
          }`}
        >
          Yes
        </button>

        <button
          type="button"
          onClick={() => onChange("no")}
          className={`w-full lg:w-130 h-14 rounded-full px-6 py-4 text-center text-lg transition lg:text-left ${
            value === "no"
              ? "bg-[#2563EB] text-white"
              : "bg-[#F1F2F4] text-[#111C35]"
          }`}
        >
          No
        </button>
        <button
          type="button"
          onClick={() => onChange("Select your state")}
          className={`w-full lg:w-130 h-14 rounded-full px-6 py-4 text-center text-lg transition lg:text-left ${
            value === "Select your state"
              ? "bg-[#2563EB] text-white"
              : "bg-[#F1F2F4] text-[#111C35]"
          }`}
        >
          Tell me why it matters
        </button>
      </div>
    </div>
  );
}

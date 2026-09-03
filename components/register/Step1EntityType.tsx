"use client";

interface Step1EntityTypeProps {
  value: "LLC" | "C-Corp" | null;
  onChange: (value: "LLC" | "C-Corp") => void;
}

export default function Step1EntityType({
  value,
  onChange,
}: Step1EntityTypeProps) {
  return (
    <div className="w-full">
      <p className="mb-6 text-center text-sm text-[#111827]">
        Step 1: Business Goal
      </p>

      <h1 className="mx-auto mb-8 max-w-[500px] text-center text-2xl font-bold leading-tight text-[#0F172A]">
        What entity does your business need
      </h1>

      <div className="space-y-4 flex flex-col justify-center items-center ">
        <button
          type="button"
          onClick={() => onChange("LLC")}
          className={`w-full lg:w-130 h-14 rounded-full px-6 py-4 text-lg transition lg:text-left ${
            value === "LLC" ? "bg-[#2563EB] text-white" : "bg-[#F1F2F4]"
          }`}
        >
          LLC
        </button>

        <button
          type="button"
          onClick={() => onChange("C-Corp")}
          className={`w-full lg:w-130 h-14 rounded-full px-6 py-4 text-lg transition lg:text-left ${
            value === "C-Corp" ? "bg-[#2563EB] text-white" : "bg-[#F1F2F4]"
          }`}
        >
          C-Corp
        </button>
      </div>
    </div>
  );
}

"use client";

interface Step4PlanProps {
  value: string;
  onChange: (value: string) => void;
}

const Step4Plan = ({ value, onChange }: Step4PlanProps) => {
  return (
    <section className="w-full text-[12px] font-normal flex flex-col justify-center items-center">
      {/* Step label */}
      <p className="text-center text-[14px] text-gray-700">Step 4: Plan</p>

      {/* Heading */}
      <h2 className="mx-auto mt-4 w-full text-center text-[24px] font-bold leading-tight text-black">
        Want to keep your LLC compliant?
      </h2>

      {/* Description */}
      <p className="mx-auto mt-3 w-full text-center text-[16px] leading-relaxed text-gray-500">
        All the stuff you need to do to keep your LLC legal, done. You&apos;re
        still responsible for taxes and bookkeeping.
      </p>

      {/* Plan options */}
      <div className="mx-auto mt-6  w-full gap-2 flex flex-col justify-center items-center">
        {/* Annual State Compliance */}
        <button
          type="button"
          onClick={() => onChange("compliance")}
          className={`w-full lg:w-130 rounded-full px-5 py-3 text-left text-[16px] transition ${
            value === "compliance"
              ? "bg-gray-300 text-black"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Get annual State compliance ($199/yr)
        </button>

        {/* Handle it myself */}
        <button
          type="button"
          onClick={() => onChange("self")}
          className={`w-full lg:w-130 rounded-full px-5 py-3 text-left text-[16px] transition mt-2 ${
            value === "self"
              ? "bg-gray-300 text-black"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          I&apos;d rather handle it on my own
        </button>
      </div>
    </section>
  );
};

export default Step4Plan;

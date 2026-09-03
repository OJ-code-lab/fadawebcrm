"use client";
interface Step3BusinessNameProps {
  value: string;
  onChange: (value: string) => void;
}

const Step3BusinessName = ({ value, onChange }: Step3BusinessNameProps) => {
  return (
    <section className="w-full text-[12px] font-normal text-[#111827] sm:text-sm">
      {/* Step label */}
      <p className="text-center text-[14px]">Step 3: Business Name</p>

      {/* Heading */}
      <h2 className="mx-auto mt-5 w-full text-center text-[24px] font-bold leading-[1.25] tracking-[0.02em] text-black sm:text-[26px]">
        What do you want to name your company?
      </h2>

      {/* Description */}
      <p className="mx-auto mt-4 w-full text-center text-[16px] leading-7 text-[#6b7280] sm:text-base">
        You can change your name even after paying. we&apos;ll ask you for final
        confirmation later.
      </p>
      {/* Company name input */}
      <div className="mt-8 flex flex-col justify-center items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your Company name"
          className="h-14 w-full lg:w-130 rounded-full border-0 bg-[#f1f1f4] outline-none placeholder:text-[18px] placeholder:text-[#a1a6b2] focus:ring-2 focus:ring-[#1e4fb7]/20 sm:h-16 sm:text-[18px] text-center"
        />
      </div>
    </section>
  );
};

export default Step3BusinessName;

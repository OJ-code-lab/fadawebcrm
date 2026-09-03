"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface Step2BLocationProps {
  value: string | null;
  onChange: (value: string) => void;
}

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function Step2BLocation({
  value,
  onChange,
}: Step2BLocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (state: string) => {
    onChange(state);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      {/* Step label */}
      <p className="text-[11px] font-normal text-[#171717] sm:text-xs">
        Step 2: Location
      </p>

      {/* Question */}
      <h2 className="mt-6 text-[22px] font-bold leading-[1.2] text-[#080808] sm:text-2xl">
        What state will you be operating from?
      </h2>

      {/* State selector */}
      <div className="relative mt-8 w-full lg:w-130">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="
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
          "
        >
          <span>{value || "Select your state"}</span>

          {isOpen ? (
            <ChevronUp size={24} className="absolute right-8 text-[#111111]" />
          ) : (
            <ChevronDown
              size={24}
              className="absolute right-8 text-[#111111]"
            />
          )}
        </button>

        {isOpen && (
          <div
            className="
              absolute
              left-0
              right-0
              z-20
              mt-3
              overflow-hidden
              rounded-[24px]
              bg-[#f1f2f4]
              shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              lg:w-130
            "
          >
            <div className="border-b border-[#dfe0e3] p-5">
              <div className="relative">
                <Search
                  size={23}
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#303030]"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  className="h-14 w-full rounded-full bg-white pl-14 pr-5 text-[18px] text-[#111c35] outline-none placeholder:text-[#555]"
                />
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto text-left flex flex-col justify-center items-center">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() => handleSelect(state)}
                    className="
                      block
                      w-full
                      lg:w-130
                      px-6
                      py-4
                      h-14
                      text-center
                      lg:text-left
                      text-[18px]
                      text-[#171717]
                      transition
                      hover:bg-[#e7e8ea]
                    "
                  >
                    {state}
                  </button>
                ))
              ) : (
                <p className="px-6 py-6 text-[16px] text-[#777]">
                  No results found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

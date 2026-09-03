"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

interface Step2DLocationProps {
  value: string | null;
  onChange: (value: string) => void;
}

const countries = [
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Denmark",
  "Egypt",
  "France",
  "Germany",
  "Ghana",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Philippines",
  "Portugal",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Zambia",
];

export default function Step2DLocation({
  value,
  onChange,
}: Step2DLocationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (country: string) => {
    onChange(country);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      {/* Step label */}
      <p className="text-[14px] font-normal text-[#171717]">Step 2: Location</p>

      {/* Question */}
      <h2 className="mt-6 text-[22px] font-bold leading-[1.2] text-[#080808]">
        What state will you be operating from?
      </h2>

      {/* Dropdown */}
      <div className="relative mt-8 w-full lg:w-130">
        {/* Selected value */}
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

        {/* Dropdown panel */}
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
            "
          >
            {/* Search */}
            <div className="border-b border-[#dfe0e3] p-5">
              <div className="relative">
                <Search
                  size={23}
                  className="
                    pointer-events-none
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-[#303030]
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  autoFocus
                  className="
                    h-14
                    w-full
                    rounded-full
                    bg-white
                    pl-14
                    pr-5
                    text-[18px]
                    text-[#111c35]
                    outline-none
                    placeholder:text-[#555]
                  "
                />
              </div>
            </div>

            {/* Countries */}
            <div
              className="
                max-h-[300px]
                overflow-y-auto
                text-left
              "
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleSelect(country)}
                    className="
                      block
                      w-full
                      px-6
                      py-4
                      h-14
                      text-left
                      text-[18px]
                      text-[#171717]
                      transition
                      hover:bg-[#e7e8ea]
                    "
                  >
                    {country}
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

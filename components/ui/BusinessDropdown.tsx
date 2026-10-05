// components/BusinessDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { setLastActiveBusiness } from '@/actions/switch-business';
import { setLastActiveBusiness } from "@/src/actions/switch-business";
import { BusinessDetails, BusinessListItem } from "@/src/types/businessTypes";
import { ChevronDown } from "lucide-react";
// import { BusinessListItem, BusinessDetails } from "@/lib/business-api";
// import { BusinessListItem, BusinessDetails } from "@/src/app/api/business-details/route";

interface BusinessDropdownProps {
  currentBusiness?: BusinessDetails;
  businesses?: BusinessListItem[];
}

export default function BusinessDropdown({
  currentBusiness,
  businesses = [],
}: BusinessDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSelectBusiness(businessId: string) {
    setIsOpen(false);
    await setLastActiveBusiness(businessId);
    router.push(`/${businessId}/dashboard`);
    router.refresh();
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-50 transition"
      >
        <span className="font-bold text-base">{currentBusiness?.name ?? "Business"}</span>
        <ChevronDown
          size={22}
          className={`rounded-full border-2 border-gray-200 text-green-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-100">
            {businesses.map((biz) => {
              const isSelected = biz.id === currentBusiness?.id;
              return (
                <button
                  key={biz.id}
                  onClick={() => handleSelectBusiness(biz.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition flex items-center justify-between hover:bg-gray-50 ${
                    isSelected
                      ? "font-bold text-blue-600 bg-blue-50/50"
                      : "text-gray-700"
                  }`}
                >
                  <span className="truncate">{biz.name}</span>
                  {isSelected && <span className="text-blue-600">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-100 p-2">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/auth/country");
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1"
            >
              <span>+</span> Add another business
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

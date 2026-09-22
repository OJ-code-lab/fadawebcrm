"use client";

import { ChevronDown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BusinessDetail } from "../types/BusinessDetailTypes";

function AddBusiness() {
  const [open, setIsOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState<BusinessDetail | null>(
    null,
  );

  useEffect(() => {
    const loadBusinessDetails = async () => {
      try {
        const response = await fetch("/api/get/business");
        if (!response.ok) {
          throw new Error("Failed to fetch business details");
        }
        const businessDetails: BusinessDetail = await response.json();
        console.log("Business Details:", businessDetails);
        setBusinessDetails(businessDetails);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };
    loadBusinessDetails();
  }, []);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
        type="button"
      >
        <span>Febtem</span>
        <ChevronDown
          size={22}
          className={`rounded-full border-2 border-gray-200 text-green-600 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`absolute right-0.5 top-full z-20 mt-2 min-w-55 overflow-hidden border border-green-700 bg-white p-4 shadow-sm transition-all duration-200 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div>
          {businessDetails?.data && businessDetails.data.length > 0 ? (
            <ul className="space-y-2">
              {businessDetails.data.map((business) => (
                <li key={business.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 rounded-full border border-gray-200/40 px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-xs">{business.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No businesses available.</p>
          )}
        </div>
        <div className="mt-3">
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-full border border-gray-200/40 px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            <Plus size={13} />
            <span className="text-xs">Add another business</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBusiness;

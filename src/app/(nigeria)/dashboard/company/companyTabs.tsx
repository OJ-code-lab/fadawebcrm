"use client";

import { BookAlert, SquareText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface CompanyTabsProps {
  information: React.ReactNode;
  mydocument: React.ReactNode;
}

export default function CompanyTabs({
  information,
  mydocument,
}: CompanyTabsProps) {
  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "mydocument" ? "mydocument" : "information";

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <nav className="mb-2 flex shrink-0 gap-6 bg-primary pb-1 pt-1">
        <Link
          href="/dashboard/company?tab=information"
          className={`pb-1 ${activeTab === "information" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
        >
          <div className="flex gap-2 items-center">
            <span>
              {" "}
              <BookAlert size={15} />{" "}
            </span>
            Information{" "}
          </div>
        </Link>
        <Link
          href="/dashboard/company?tab=mydocument"
          className={`pb-1 ${activeTab === "mydocument" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
        >
          <div className="flex gap-2 items-center">
            <span>
              {" "}
              <SquareText size={15} />{" "}
            </span>
            My Documents{" "}
          </div>
        </Link>
      </nav>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeTab === "mydocument" ? mydocument : information}
      </div>
    </div>
  );
}

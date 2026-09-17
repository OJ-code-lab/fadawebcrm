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
    <>
      <nav className="mb-6 flex gap-6 pb-2 mt-8">
        <Link
          href="/nigeria/nigeria-dashboard/company?tab=information"
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
          href="/nigeria/nigeria-dashboard/company?tab=mydocument"
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

      <main>{activeTab === "mydocument" ? mydocument : information}</main>
    </>
  );
}

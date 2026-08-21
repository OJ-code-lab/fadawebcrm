"use client";

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
      <nav className="mb-6 flex gap-4 border-b pb-2 mt-8">
        <Link
          href="/nigeria/company?tab=information"
          className={`pb-1 ${activeTab === "information" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
        >
          Information
        </Link>
        <Link
          href="/nigeria/company?tab=mydocument"
          className={`pb-1 ${activeTab === "mydocument" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
        >
          My Documents
        </Link>
      </nav>

      <main>{activeTab === "mydocument" ? mydocument : information}</main>
    </>
  );
}

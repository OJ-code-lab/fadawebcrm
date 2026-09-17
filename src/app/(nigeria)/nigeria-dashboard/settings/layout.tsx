// import DashboardErrorMessage from "@/components/ui/dashboardErrorMessage";
"use client";
// import { BookAlert, SquareText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface CompanyLayoutProps {
  general_setting: React.ReactNode;
  security_setting: React.ReactNode;
}

function SettingsContent({
  general_setting,
  security_setting,
}: CompanyLayoutProps) {
  const searchParams = useSearchParams();
  const activeTab =
    searchParams.get("tab") === "security_setting"
      ? "security_setting"
      : "general_setting";
  return (
    <div className=" lg:p-6 ">
      <nav className="mb-6 flex gap-6 pb-2 mt-8">
        <Link
          href="/nigeria/nigeria-dashboard/settings?tab=general_setting"
          className={`pb-1 ${activeTab === "general_setting" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
        >
          General
        </Link>
        <Link
          href="/nigeria/nigeria-dashboard/settings?tab=security_setting"
          className={`pb-1 ${activeTab === "security_setting" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"}`}
        >
          Security
        </Link>
      </nav>

      <main>
        {activeTab === "security_setting" ? security_setting : general_setting}
      </main>
    </div>
  );
}

export default function SettingsLayout(props: CompanyLayoutProps) {
  return (
    <Suspense fallback={<main>{props.general_setting}</main>}>
      <SettingsContent {...props} />
    </Suspense>
  );
}

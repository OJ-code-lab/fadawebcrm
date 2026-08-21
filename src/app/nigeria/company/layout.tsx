import DashboardErrorMessage from "@/components/ui/dashboardErrorMessage";
import CompanyTabs from "./companyTabs";
import { Suspense } from "react";

interface CompanyLayoutProps {
  information: React.ReactNode;
  mydocument: React.ReactNode;
}

export default function CompanyLayout({
  information,
  mydocument,
}: CompanyLayoutProps) {
  return (
    <div className="p-6 ">
      <DashboardErrorMessage />

      <Suspense fallback={<main>{information}</main>}>
        <CompanyTabs information={information} mydocument={mydocument} />
      </Suspense>
    </div>
  );
}

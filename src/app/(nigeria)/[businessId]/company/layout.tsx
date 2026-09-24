import CompanyTabs from "./companyTabs";
import { Suspense } from "react";
import ContinueBusinessReg from "@/components/ui/continueBusinessReg";

interface CompanyLayoutProps {
  information: React.ReactNode;
  mydocument: React.ReactNode;
}

export default function CompanyLayout({
  information,
  mydocument,
}: CompanyLayoutProps) {
  return (
    <div className="  ">
      <ContinueBusinessReg />

      <Suspense fallback={<main>{information}</main>}>
        <CompanyTabs information={information} mydocument={mydocument} />
      </Suspense>
    </div>
  );
}

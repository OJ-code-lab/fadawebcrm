import CompanyTabs from "./companyTabs";
import { Suspense } from "react";
import ContinueBusinessReg from "@/components/ui/continueBusinessReg";

interface CompanyLayoutProps {
  information: React.ReactNode;
  mydocument: React.ReactNode;
  params: Promise<{ businessId: string }>;
}

export default async function CompanyLayout({
  information,
  mydocument,
  params,
}: CompanyLayoutProps) {
  const { businessId } = await params;

  return (
    <div className="  ">
      <ContinueBusinessReg />

      <Suspense fallback={<main>{information}</main>}>
        <CompanyTabs
          information={information}
          mydocument={mydocument}
          businessId={businessId}
        />
      </Suspense>
    </div>
  );
}

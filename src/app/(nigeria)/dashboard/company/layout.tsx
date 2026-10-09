import CompanyTabs from "./companyTabs";
import { Suspense } from "react";
import ContinueBusinessReg from "@/components/ui/continueBusinessReg";
import { getActiveBusinessId } from "@/lib/business";
import { notFound, redirect } from "next/navigation";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";

interface CompanyLayoutProps {
  information: React.ReactNode;
  mydocument: React.ReactNode;
  // businessId: string;
}

export default async function CompanyLayout({
  information,
  mydocument,
}: CompanyLayoutProps) {
  const businessId = await getActiveBusinessId();

  if (!businessId) {
    redirect("/");
  }
  const [business] = await Promise.all([
    getBusinessDetails(businessId),
    // getBusinessDocuments(businessId),
  ]);
  if (!business) {
    notFound();
  }
  const isSetupIncomplete =
    business.members.length === 0 || !business.entity_type;
  return (
    <div className="  ">
      <Suspense>
        {isSetupIncomplete && <ContinueBusinessReg businessId={businessId} />}
      </Suspense>

      <Suspense fallback={<main>{information}</main>}>
        <CompanyTabs information={information} mydocument={mydocument} />
      </Suspense>
    </div>
  );
}

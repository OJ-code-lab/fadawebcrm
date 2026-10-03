import ContinueBusinessReg from "@/components/ui/continueBusinessReg";
import { getActiveBusinessId } from "@/lib/business";
// import { redirect } from "next/navigation";

async function companyPage() {
  const businessId = await getActiveBusinessId();

  // if (!businessId) {
  //   redirect("/business/new");
  // }

  return (
    <div>
      <ContinueBusinessReg businessId={businessId} />
    </div>
  );
}

export default companyPage;

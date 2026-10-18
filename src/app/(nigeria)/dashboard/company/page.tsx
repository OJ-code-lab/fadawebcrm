import ContinueBusinessReg from "@/components/ui/continueBusinessReg";
import { getActiveBusinessId } from "@/lib/business";

async function companyPage() {
  const businessId = await getActiveBusinessId();

  return (
    <div>
      <ContinueBusinessReg businessId={businessId} />
    </div>
  );
}

export default companyPage;

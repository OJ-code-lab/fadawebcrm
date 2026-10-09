import { TriangleAlert } from "lucide-react";
// import GetStartedModal, { type BusinessInitial } from "./CompleteReg";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";
// import { BusinessDetails } from "@/src/types/businessTypes";
import GetStartedModal, { BusinessDetailsInitial } from "./CompleteReg";
import GetStartedUSModal from "./CompleteUsReg";
// import GetStartedUSModal from "./getStartedUSModal";

interface ContinueBusinessRegProps {
  businessId?: string;
}

async function ContinueBusinessReg({ businessId }: ContinueBusinessRegProps) {
  if (!businessId) return null;

  const business = await getBusinessDetails(businessId);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  const lookupHeaders = {
    "X-API-KEY": process.env.API_KEY || "",
    Authorization: `Bearer ${accessToken}`,
  };
  const [countryResult, industryResult] = await Promise.all([
    apiFetch("/country", { headers: lookupHeaders }).catch(() => null),
    apiFetch("/industries", { headers: lookupHeaders }).catch(() => null),
  ]);
  const countries: { id: string; code: string; country?: string }[] =
    Array.isArray(countryResult?.data?.data) ? countryResult.data.data : [];
  const industries: { id?: string; name: string }[] = Array.isArray(
    industryResult?.data?.data,
  )
    ? industryResult.data.data
    : [];
  // The API may return the business country as a code or a country name.
  const businessCountryValue = business?.business_country?.trim().toLowerCase();
  const countryId = countries.find((country) => {
    const code = country.code.trim().toLowerCase();
    const name = country.country?.trim().toLowerCase();
    return (
      code === businessCountryValue ||
      name === businessCountryValue ||
      (businessCountryValue === "nigeria" && ["ng", "ngn"].includes(code)) ||
      (["united states", "united states of america", "usa"].includes(
        businessCountryValue ?? "",
      ) &&
        code === "us")
    );
  });
  const industryName = business?.industry ?? "";
  const industryId =
    industries.find(
      (industry) =>
        industry.name?.trim().toLowerCase() ===
        industryName.trim().toLowerCase(),
    )?.id ?? "";

  // Map the raw API shape to exactly what the modal needs
  const initial: BusinessDetailsInitial = {
    companyName: business?.name ?? "",
    entityType: business?.entity_type ?? "",
    industryName,
    industryId,
    businessCountryId: countryId?.id ?? "",
    citizenship: business?.citizenship ?? "NG",
  };

  return (
    <div className="bg-red-100/50 py-6 px-8 flex flex-col justify-between items-center gap-6 rounded-[16px] lg:flex-row">
      <div className="flex flex-row gap-6">
        <span className="text-red-700 h-8 w-8 p-2">
          <TriangleAlert size={28} />
        </span>

        <div>
          <p className="text-sm lg:text-lg font-normal lg:text-start">
            Please provide your company details to access our services
            seamlessly, whether forming a new company or adding existing
            information.{" "}
          </p>
        </div>
      </div>

      {countryId && ["NG", "NGN"].includes(countryId.code) && (
        <div>
          <GetStartedModal businessId={businessId} initial={initial} />
        </div>
      )}
      {countryId?.code === "US" && (
        <div>
          <GetStartedUSModal businessId={businessId} />
        </div>
      )}
    </div>
  );
}

export default ContinueBusinessReg;

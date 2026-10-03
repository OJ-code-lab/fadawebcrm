import { TriangleAlert } from "lucide-react";
// import GetStartedModal, { type BusinessInitial } from "./CompleteReg";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import { getBusinessDetails } from "@/src/app/business-details/businessDetails";
// import { BusinessDetails } from "@/src/types/businessTypes";
import GetStartedModal, { BusinessDetailsInitial } from "./CompleteReg";

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
  const countries: { id: string; code: string }[] = Array.isArray(
    countryResult?.data?.data,
  )
    ? countryResult.data.data
    : [];
  const industries: { id?: string; name: string }[] = Array.isArray(
    industryResult?.data?.data,
  )
    ? industryResult.data.data
    : [];
  const businessCountryId =
    //  countries.find((country) => country.code === "NGN")?.id ?? "";
    countries.find((country) => ["NG", "NGN"].includes(country.code))?.id ?? "";
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
    businessCountryId,
    citizenship: business?.citizenship ?? "NG",
  };

  return (
    <div className="bg-red-100/50 py-6 px-8 flex flex-col justify-between items-center gap-6 lg:gap-11.5 rounded-[16px] lg:flex-row">
      <span className="text-red-700 h-8 w-8 p-2">
        <TriangleAlert size={28} />
      </span>

      <p className="text-sm lg:text-lg font-normal lg:text-start">
        Please provide your company details to access our services seamlessly,
        whether forming a new company or adding existing information.{" "}
        <span>{business?.name ?? ""}</span>
      </p>

      <div>
        <GetStartedModal businessId={businessId} initial={initial} />
      </div>
    </div>
  );
}

export default ContinueBusinessReg;

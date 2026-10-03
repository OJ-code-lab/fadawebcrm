import CompanyTabs from "./companyTabs";
import { Suspense } from "react";
import ContinueBusinessReg from "@/components/ui/continueBusinessReg";
import { getActiveBusinessId } from "@/lib/business";
import { redirect } from "next/navigation";
// import { BusinessDetails } from "@/src/types/businessTypes";
// import { cookies } from "next/headers";
// import { apiFetch } from "@/lib/api";

interface CompanyLayoutProps {
  information: React.ReactNode;
  mydocument: React.ReactNode;
  // businessId: string;
}

// export async function getBusinessMembers(
//   businessId: string,
// ): Promise<BusinessDetails | null> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("access_token")?.value;

//   if (!token) return null;

//   try {
//     const { data } = await apiFetch(`/business/${businessId}`, {
//       headers: {
//         "X-API-KEY": process.env.API_KEY || "",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (data?.status && data.data) {
//       return data.data;
//     }
//     return null;
//   } catch (error) {
//     console.error(`Error fetching business ${businessId}:`, error);
//     return null;
//   }
// }

export default async function CompanyLayout({
  information,
  mydocument,
}: CompanyLayoutProps) {
  const businessId = await getActiveBusinessId();

  if (!businessId) {
    redirect("/business/new");
  }

  return (
    <div className="  ">
      {/* <ContinueBusinessReg businessId={businessId} /> */}
      <ContinueBusinessReg businessId={businessId} />

      <Suspense fallback={<main>{information}</main>}>
        <CompanyTabs information={information} mydocument={mydocument} />
      </Suspense>
    </div>
  );
}

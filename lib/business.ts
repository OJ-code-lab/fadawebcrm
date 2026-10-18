import { cookies } from "next/headers";
import { cache } from "react";
import { getAllBusinesses } from "@/src/app/business-details/businessDetails";

export const getActiveBusinessContext = cache(async () => {
  const [cookieStore, businesses] = await Promise.all([
    cookies(),
    getAllBusinesses(),
  ]);
  const requestedBusinessId = cookieStore.get("last_active_business")?.value;
  const activeBusiness =
    businesses.find((business) => business.id === requestedBusinessId) ??
    businesses[0];

  return { businessId: activeBusiness?.id, businesses };
});

export async function getActiveBusinessId() {
  return (await getActiveBusinessContext()).businessId;
}

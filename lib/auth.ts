import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBusinesses } from "@/src/app/business-details/businessDetails";

export async function redirectIfUserHasBusiness() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) return;

  const businesses = await getAllBusinesses();
  if (businesses.some((business) => business.id)) {
    redirect("/dashboard");
  }
}

// app/dashboard/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllBusinesses } from "../../business-details/businessDetails";
// import { getAllBusinesses } from '@/lib/business-api';
// import { getAllBusinesses } from "@/src/app/api/business-details/route";

export default async function DashboardRedirectPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  // 1. If not authenticated, send back to login
  if (!token) {
    redirect("/auth/sign-in"); // Adjust path to match your login route
  }

  // 2. Fetch all businesses associated with this account
  const businesses = await getAllBusinesses();

  // 3. If the user has no businesses registered yet
  if (!businesses || businesses.length === 0) {
    redirect("/business/new"); // Send to onboarding/business creation
  }

  // 4. Check for 'last_active_business' cookie
  const lastActiveId = cookieStore.get("last_active_business")?.value;

  // Verify the business ID in cookie is valid and belongs to the user
  const validBusiness = businesses.find((b) => b.id === lastActiveId);

  // Default to last active business ID, or fall back to the first business
  const targetBusinessId = validBusiness ? validBusiness.id : businesses[0].id;

  // 5. Forward to the dynamic business dashboard
  redirect(`/${targetBusinessId}/dashboard`);
}

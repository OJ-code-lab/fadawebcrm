import { BusinessDetails, BusinessListItem } from "@/src/types/businessTypes";
import BusinessDropdown from "./BusinessDropdown";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";

interface HeaderProps {
  userName?: string;
  currentBusiness?: BusinessDetails;
  businesses?: BusinessListItem[];
}

export default async function Headers({
  currentBusiness,
  businesses = [],
}: HeaderProps) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const { data } = await apiFetch("/auth/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-API-KEY": process.env.API_KEY || "",
    },
  });
  return (
    <header className="flex justify-between items-center p-4 bg-white">
      <h1 className="text-2xl font-bold ">Hello {data.user?.first_name}</h1>

      {/* Passing props down to the child dropdown */}
      <BusinessDropdown
        currentBusiness={currentBusiness}
        businesses={businesses}
      />
    </header>
  );
}

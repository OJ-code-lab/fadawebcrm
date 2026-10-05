import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
// import { getServicesOffered } from "@/src/app/api/business-details/route";
import ServicesClient from "./services";
import { ServicesOffer } from "@/src/types/businessTypes";

export default async function ServicesPage() {
  async function getServicesOffered(): Promise<ServicesOffer[]> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("access_token")?.value;

    if (!token) return [];

    try {
      const { data } = await apiFetch("/services", {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
      });
      if (data?.status && Array.isArray(data.data)) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching List if services: ", error);
      return [];
    }
  }

  const services = await getServicesOffered();

  return <ServicesClient allServices={services} />;
}

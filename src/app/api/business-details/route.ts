import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import {
  BusinessDetails,
  BusinessListItem,
  Orderlist,
} from "@/src/types/businessTypes";

// get all registered business
export async function getAllBusinesses(): Promise<BusinessListItem[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return [];

  try {
    const { data } = await apiFetch("/business", {
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${token}`,
      },
    });

    // Your endpoint returns: { status: true, data: [ ...businesses ] }
    if (data?.status && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching business list:", error);
    return [];
  }
}

// get business details by id
export async function getBusinessDetails(
  businessId: string,
): Promise<BusinessDetails | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const { data } = await apiFetch(`/business/${businessId}`, {
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${token}`,
      },
    });
    if (data?.status && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching business ${businessId}:`, error);
    return null;
  }
}

// get orderlist
export async function getAllOrders(): Promise<Orderlist[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return [];

  try {
    const { data } = await apiFetch("/orders", {
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
    console.error("Error fetching business list:", error);
    return [];
  }
}

// get orders by ID
export async function getOrdersById(
  orderId: string,
): Promise<Orderlist | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  try {
    const { data } = await apiFetch(`/business/${orderId}`, {
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${token}`,
      },
    });

    if (data?.status && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching business ${orderId}:`, error);
    return null;
  }
}

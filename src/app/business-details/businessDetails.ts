// "use server";
import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api";
import {
  BusinessDetails,
  BusinessListItem,
  Orderlist,
  // ServicesOffer,
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

// import { NextResponse } from "next/server";

// const messageFrom = (json: unknown): string => {
//   if (json && typeof json === "object" && "message" in json) {
//     const m = (json as { message?: unknown }).message;
//     if (typeof m === "string" && m) return m;
//   }
//   return "";
// };

// export async function PUT(
//   request: Request,
//   { params }: { params: Promise<{ businessId: string }> },
// ) {
//   const { businessId } = await params;
//   const token = (await cookies()).get("access_token")?.value;
//   if (!token) {
//     return NextResponse.json(
//       { message: "You are not signed in. Please sign in again." },
//       { status: 401 },
//     );
//   }

//   try {
//     const body = await request.json();
//     const { response: upstream, data: json } = await apiFetch(
//       `/business/${encodeURIComponent(businessId)}/edithNg`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "X-API-KEY": process.env.API_KEY || "",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//         cache: "no-store",
//       },
//     );

//     if (!upstream.ok) {
//       return NextResponse.json(
//         {
//           message:
//             messageFrom(json) ||
//             `Registration failed (${upstream.status}). Please try again.`,
//         },
//         { status: upstream.status },
//       );
//     }

//     return NextResponse.json(json ?? { ok: true });
//   } catch (error) {
//     console.error(`Error updating business ${businessId}:`, error);
//     return NextResponse.json(
//       { message: "Could not reach the server. Please try again." },
//       { status: 502 },
//     );
//   }
// }

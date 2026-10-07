import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const { searchParams } = new URL(req.url);
  const businessId = searchParams.get("businessId");
  const planId = searchParams.get("planId");

  if (!businessId || !planId) {
    return NextResponse.json(
      {
        status: false,
        message: "businessId and planId are required",
        data: null,
      },
      { status: 400 },
    );
  }

  try {
    const { response, data } = await apiFetch(
      `/business/${businessId}/plans/${planId}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // const { response, data } = await apiFetch(
    //   `/business/01a0a4ee-d51d-7102-ad51-72de5268dea4/plans/01a0967d-de6b-70c7-971b-bd3580ccaad9`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "X-API-KEY": process.env.API_KEY || "",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // );

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("order summary fetch error:", error);
    return NextResponse.json(
      { status: false, message: "Unable to load order summary.", data: null },
      { status: 500 },
    );
  }
}

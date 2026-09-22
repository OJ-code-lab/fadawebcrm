import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      {
        status: false,
        message: "Authentication is required to load business details.",
        error_code: "missing_access_token",
        data: null,
      },
      { status: 401 },
    );
  }

  try {
    const { response, data } = await apiFetch(`/business`, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("business details fetch errors:", error);
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load business details.",
        error_code: "business_details_fetch_failed",
        data: null,
      },
      { status: 500 },
    );
  }
}

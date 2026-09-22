import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api";

import { cookies } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;

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
    const endpoint = `/${path.join("/")}`;

    const { response, data } = await apiFetch(endpoint, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("GET request error:", error);

    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to complete GET request.",
        error_code: "get_request_failed",
        data: null,
      },
      { status: 500 },
    );
  }
}

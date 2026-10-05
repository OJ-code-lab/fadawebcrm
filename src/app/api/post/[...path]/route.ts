import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api";

import { cookies } from "next/headers";

export async function POST(
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
        message: "Authentication is required.",
        error_code: "missing_access_token",
        data: null,
      },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const endpoint = `/${path.join("/")}`;

    const { response, data } = await apiFetch(endpoint, {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("POST request error:", error);
    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "POST request failed.",
        error_code: "post_request_failed",
        data: null,
      },
      { status: 500 },
    );
  }
}

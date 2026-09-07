import { apiFetch } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { response, data } = await apiFetch("/auth/verify", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("OTP verification error:", error);

    return NextResponse.json(
      {
        status: false,
        message: "something went wrong.",
        error_code: "server_eror",
        data: null,
      },
      { status: 500 },
    );
  }
}

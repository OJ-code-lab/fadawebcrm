import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { response, data } = await apiFetch("/auth/resend", {
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
    console.error("Resend OTP error:", error);

    return NextResponse.json(
      {
        status: false,
        message: "Something went wrong.",
        error_code: "server_error",
        data: null,
      },
      { status: 500 },
    );
  }
}

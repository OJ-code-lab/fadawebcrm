import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { response, data } = await apiFetch("/auth/forget-password", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        data && typeof data === "object" ? data : {
          status: false,
          message: "Unable to reset password.",
          data: null,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Forget password error:", error);

    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
        error_code: "server_error",
        data: null,
      },
      { status: 500 },
    );
  }
}

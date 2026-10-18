import { NextRequest, NextResponse } from "next/server";

import { apiFetch } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { response, data } = await apiFetch("/auth/login", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        data && typeof data === "object"
          ? data
          : {
              status: false,

              message: "Login failed.",

              data: null,
            },

        {
          status: response.status,
        },
      );
    }

    const accessToken = data.data?.login.access_token;

    if (!accessToken) {
      return NextResponse.json(
        {
          status: false,

          message: "Login succeeded but no access token was returned.",

          error_code: "missing_access_token",

          data: null,
        },

        { status: 500 },
      );
    }

    // Create the response

    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    // Store access token in an HTTP-only cookie

    nextResponse.cookies.set("access_token", accessToken, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: "lax",

      path: "/",

      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error) {
    console.error("Login error:", error);

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

import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    // 1. Extract search query parameters sent back from Google (like code/state)
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // 2. Forward the callback query data to your backend API
    const { response, data } = await apiFetch(
      `/auth/google/callback?${queryString}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
        },
      },
    );

    if (!response.ok) {
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=google_auth_failed", request.url),
      );
    }

    // 3. Extract access token from response
    const accessToken = data?.data?.access_token;

    // 4. Create a redirect response to the user's dashboard
    const nextResponse = NextResponse.redirect(
      new URL("/nigeria-dashboard", request.url),
    );

    // 5. Store access token safely in an HTTP-only cookie
    if (accessToken) {
      nextResponse.cookies.set("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    return nextResponse;
  } catch (error) {
    console.error("Google Callback Error:", error);
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=server_error", request.url),
    );
  }
}

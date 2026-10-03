/*import { NextRequest, NextResponse } from "next/server";
const GOOGLE_URL = process.env.GOOGLE_URL;

export async function GoogleCallback(request: NextRequest) {
  try {
    // 1. Extract search query parameters sent back from Google (like code/state)
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // 2. Forward the callback query data to your backend API
    const { response, data } = await fetch(
      `${GOOGLE_URL}/auth/google/callback?${queryString}`,
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
} */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const googleBaseUrl = process.env.GOOGLE_URL;
    if (!googleBaseUrl) {
      throw new Error("GOOGLE_URL environment variable is not defined.");
    }

    // Forward incoming query params from Google callback (code, state, etc.)
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // Direct native fetch to GOOGLE_URL callback
    const res = await fetch(
      `${googleBaseUrl.replace(/\/$/, "")}/auth/google/callback?${queryString}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google Callback Backend Error:", res.status, errorText);
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=google_auth_failed", request.url),
      );
    }

    const data = await res.json();

    // Extract access token from response
    const accessToken =
      data?.data?.login?.access_token ||
      data?.data?.access_token ||
      data?.access_token;

    if (!accessToken) {
      console.error("Missing access token in callback payload:", data);
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=missing_access_token", request.url),
      );
    }

    // Redirect user to dashboard and attach secure HTTP-only cookie
    const nextResponse = NextResponse.redirect(
      new URL("/nigeria-dashboard", request.url),
    );

    nextResponse.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return nextResponse;
  } catch (error) {
    console.error("Google Callback Error:", error);
    return NextResponse.redirect(
      new URL("/auth/sign-in?error=server_error", request.url),
    );
  }
}

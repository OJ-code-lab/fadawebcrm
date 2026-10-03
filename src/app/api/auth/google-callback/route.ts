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

    // Direct native fetch to backend GOOGLE_URL callback
    const res = await fetch(
      `${googleBaseUrl.replace(/\/$/, "")}/auth/google/callback?${queryString}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Accept: "application/json",
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

    // Extract access token based on backend structure: data.token or nested values
    const accessToken =
      data?.token ||
      data?.access_token ||
      data?.data?.login?.access_token ||
      data?.data?.access_token;

    if (!accessToken) {
      console.error("Missing access token in callback payload:", data);
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=missing_access_token", request.url),
      );
    }

    // Redirect user to dashboard and set secure HTTP-only cookie
    const nextResponse = NextResponse.redirect(
      new URL("/dashboard", request.url),
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

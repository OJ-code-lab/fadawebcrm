/*import { NextResponse } from "next/server";
const GOOGLE_URL = process.env.GOOGLE_URL;

export async function Google() {
  try {
    // 1. Call your backend's  authentication endpoint
    const { data } = await fetch(`${GOOGLE_URL}/auth/`, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
    });

    // 2. If backend gives a redirect URL, send the user to Googlehjjiii
    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    // 3. Fallback: redirect directly to your backend endpoint if no custom URL returned
    const backendUrl = process.env.BASE_API_URL;
    if (!backendUrl) {
      throw new Error("BASE_API_URL is not configured.");
    }

    const fallbackUrl = new URL(`${backendUrl.replace(/\/$/, "")}/auth/google`);
    return NextResponse.redirect(fallbackUrl);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return NextResponse.redirect(
      new URL(
        "/auth/sign-in?error=google_failed",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      ),
    );
  }
}
*/

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const googleBaseUrl = process.env.GOOGLE_URL;
    if (!googleBaseUrl) {
      throw new Error("GOOGLE_URL environment variable is not defined.");
    }

    const authUrl = new URL(`${googleBaseUrl.replace(/\/$/, "")}/auth/google`);
    const res = await fetch(authUrl, {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
      cache: "no-store",
      redirect: "manual",
    });

    const location = res.headers.get("location");
    if (location) {
      return NextResponse.redirect(new URL(location, authUrl));
    }

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google Auth Request Failed:", res.status, errorText);
      return NextResponse.redirect(
        new URL(
          "/auth/sign-in?error=google_failed",
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        ),
      );
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Google Auth Request returned no redirect or JSON response:", contentType);
      return NextResponse.redirect(
        new URL(
          "/auth/sign-in?error=google_failed",
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        ),
      );
    }

    const data = await res.json();

    // 1. If backend returns redirect URL directly in JSON payload
    const redirectUrl = data?.url || data?.data?.url;
    if (redirectUrl) {
      return NextResponse.redirect(redirectUrl);
    }

    // 2. Fallback: redirect to backend endpoint directly
    const fallbackUrl = `${googleBaseUrl.replace(/\/$/, "")}/auth/google`;
    return NextResponse.redirect(fallbackUrl);
  } catch (error) {
    console.error("Google Auth Route Error:", error);
    return NextResponse.redirect(
      new URL(
        "/auth/sign-in?error=google_failed",
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      ),
    );
  }
}

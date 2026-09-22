import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

export async function GET() {
  try {
    // 1. Call your backend's Google authentication endpoint
    const { data } = await apiFetch("/auth/google", {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
    });

    // 2. If backend gives a redirect URL, send the user to Google
    if (data?.url) {
      return NextResponse.redirect(data.url);
    }

    // 3. Fallback: redirect directly to your backend endpoint if no custom URL returned
    const backendUrl = process.env.BASE_API_URL;
    if (!backendUrl) {
      throw new Error("BASE_API_URL is not configured.");
    }

    const fallbackUrl = new URL(
      `${backendUrl.replace(/\/$/, "")}/auth/google`,
    );
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

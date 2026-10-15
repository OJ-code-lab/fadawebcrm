import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";

interface GoogleCallbackPayload {
  token?: string;
  access_token?: string;
  user?: {
    email?: string;
    email_verified_at?: string | null;
  };
  data?: {
    access_token?: string;
    user?: {
      email?: string;
      email_verified_at?: string | null;
    };
    login?: {
      access_token?: string;
      user?: {
        email?: string;
        email_verified_at?: string | null;
      };
    };
  };
}

interface BusinessListResponse {
  status: boolean;
  data: unknown;
}

function hasBusinessId(businesses: unknown[]): boolean {
  return businesses.some(
    (business) =>
      typeof business === "object" &&
      business !== null &&
      "id" in business &&
      typeof business.id === "string" &&
      business.id.length > 0,
  );
}

export async function GET(request: NextRequest) {
  try {
    const googleBaseUrl = process.env.GOOGLE_URL;
    if (!googleBaseUrl) {
      throw new Error("GOOGLE_URL environment variable is not defined.");
    }

    const { searchParams } = request.nextUrl;
    const code = searchParams.get("code");
    if (searchParams.has("error") || !code) {
      console.error(
        "Google redirected back without an authorization code.",
        searchParams.get("error"),
      );
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=google_auth_failed", request.url),
      );
    }

    const res = await fetch(
      `${googleBaseUrl.replace(/\/$/, "")}/auth/google/callback`,
      {
        method: "POST",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
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

    const data: GoogleCallbackPayload = await res.json();

    const accessToken =
      data?.token ||
      data?.access_token ||
      data?.data?.login?.access_token ||
      data?.data?.access_token;

    if (!accessToken) {
      console.error("Google callback response did not contain an access token.");
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=missing_access_token", request.url),
      );
    }

    const user = data.user ?? data.data?.user ?? data.data?.login?.user;
    if (!user?.email) {
      console.error("Google callback response did not contain user email.");
      return NextResponse.redirect(
        new URL("/auth/sign-in?error=missing_user_data", request.url),
      );
    }

    let destination: string;
    if (!user.email_verified_at) {
      destination = `/auth/verify-email?email=${encodeURIComponent(user.email)}`;
    } else {
      const { response: businessesResponse, data: businessesResult } =
        await apiFetch("/business", {
          method: "GET",
          headers: {
            "X-API-KEY": process.env.API_KEY || "",
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

      const businessList =
        businessesResult as BusinessListResponse | null | undefined;
      if (
        !businessesResponse.ok ||
        businessList?.status !== true ||
        !Array.isArray(businessList.data)
      ) {
        console.error(
          "Google sign-in could not verify the user's business list:",
          businessesResponse.status,
        );
        return NextResponse.redirect(
          new URL("/auth/sign-in?error=business_lookup_failed", request.url),
        );
      }

      destination = hasBusinessId(businessList.data)
        ? "/dashboard"
        : "/auth/country";
    }

    const nextResponse = NextResponse.redirect(new URL(destination, request.url));

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

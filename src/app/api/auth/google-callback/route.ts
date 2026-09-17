import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token =
    searchParams.get("access_token") ?? searchParams.get("token");
  const error = searchParams.get("error");

  const baseUrl = request.nextUrl.origin;

  if (error || !token) {
    return NextResponse.redirect(
      `${baseUrl}/auth/sign-in?error=google_auth_failed`,
    );
  }

  const response = NextResponse.redirect(
    `${baseUrl}/nigeria/nigeria-dashboard`,
  );
  response.cookies.set("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

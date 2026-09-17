import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.BASE_API_URL?.replace(/\/$/, "");

  if (!apiUrl) {
    return NextResponse.json(
      { message: "BASE_API_URL is not configured" },
      { status: 500 },
    );
  }

  return NextResponse.redirect(`${apiUrl}/auth/google`);
}

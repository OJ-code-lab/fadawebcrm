import { NextResponse } from "next/server";

import { apiFetch } from "@/lib/api";

export async function GET() {
  try {
    const { response, data } = await apiFetch("/country", {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
      },
    });

    if (!response.ok) {
      console.error(`Country API returned ${response.status}`);
      console.log("Country API error:", data);

      return NextResponse.json(
        data && typeof data === "object"
          ? data
          : {
              status: false,
              message: "Unable to fetch countries.",
              data: [],
            },
        { status: response.status },
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Countries fetch failed:", error);

    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error
            ? error.message
            : "Countries are temporarily unavailable.",
        data: [],
      },
      { status: 500 },
    );
  }
}

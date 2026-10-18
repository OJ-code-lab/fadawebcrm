import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accesstoken = cookieStore.get("access_token")?.value;
  try {
    const body = await req.json();

    const { response, data } = await apiFetch("/business/createNg", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accesstoken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        data && typeof data === "object"
          ? data
          : {
              status: false,
              message: "Unable to fetch registration type.",
              data: [],
            },
        { status: response.status },
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Registration types fetch failed:", error);

    return NextResponse.json(
      {
        status: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration types are temporarily unavailable.",
        data: [],
      },
      { status: 500 },
    );
  }
}

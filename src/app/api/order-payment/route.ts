import { NextResponse } from "next/server";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  try {
    const { gateway_id, order_id } = await req.json();

    const { response, data } = await apiFetch(`/pay`, {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ gateway_id, order_id }),
    });

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Order Confirmation Error:", error);
    return NextResponse.json(
      { status: false, message: "Order confirmation failed." },
      { status: 500 },
    );
  }
}

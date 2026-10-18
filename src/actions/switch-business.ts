"use server";

import { cookies } from "next/headers";

export async function setLastActiveBusiness(businessId: string) {
  const cookieStore = await cookies();

  // Save active business ID in cookies for 30 days
  cookieStore.set("last_active_business", businessId, {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

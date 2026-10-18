import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default async function PaymentConfirmation({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  if (!reference) {
    return <div>Missing payment reference.</div>;
  }

  let paymentData = null;
  let errorMsg = null;

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      throw new Error("Unauthenticated.");
    }

    const { response, data } = await apiFetch(
      `/payment/verify?reference=${reference}`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(data?.message || "Payment verification failed");
    }

    if (!data?.status || !data?.data?.status) {
      throw new Error(data?.message || "Payment verification failed");
    }
    paymentData = data;
  } catch (err) {
    console.error(err);
    errorMsg = err instanceof Error ? err.message : "Unable to verify payment.";
  }

  if (errorMsg) {
    return (
      <div className="grid grid-cols-1 place-items-center h-dvh">
        <Card className="min-h-50 flex justify-center items-center p-6">
          <div className="bg-red-300 p-4 rounded-full text-red-600">
            <X size={30} />
          </div>
          <div className="text-base leading-8">{errorMsg}</div>
        </Card>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 place-items-center h-dvh">
      <Card className="min-h-100 w-full sm:w-100 flex justify-center items-center p-6">
        <div className="bg-green-300 p-4 rounded-full text-green-600">
          <Check size={30} />
        </div>
        <div className="text-base leading-8">{paymentData?.data.message}</div>
        <Link
          href={"/dashboard"}
          className="bg-green-500 p-4 w-full text-center hover:bg-emerald-400 text-white rounded-4xl"
        >
          {" "}
          Continue
        </Link>
      </Card>
    </div>
  );
}

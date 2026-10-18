import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";

export default async function PaymentConfirmationPage({
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
    const { response, data } = await apiFetch(
      `/payment/verify?reference=${reference}`,
    );

    if (!response.ok) throw new Error("Payment verification failed");
    paymentData = data;
  } catch (err) {
    console.error(err);
    errorMsg = "Unable to verify payment.";
  }

  if (errorMsg) {
    return <div>{errorMsg}</div>;
  }

  return (
    <div className="grid grid-cols-1 place-items-center">
      <Card>{paymentData?.status}</Card>
    </div>
  );
}

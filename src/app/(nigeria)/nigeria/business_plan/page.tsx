import BusinessPlan, {
  type BusinessPlanItem,
  type PaymentGateway,
} from "@/components/onboardingForm/BusinessPlan";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

type BusinessPlanPageProps = {
  searchParams: Promise<{ businessId?: string }>;
};

export default async function BusinessPlanPage({
  searchParams,
}: BusinessPlanPageProps) {
  const { businessId } = await searchParams;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  let businessPlans: BusinessPlanItem[] = [];
  let paymentGateways: PaymentGateway[] = [];

  // ONLY wrap async data fetching in try/catch
  try {
    // 1. Fetch available business plans dynamically based on the route business ID
    // const { response: planRes, data: planData } = await apiFetch(
    //   `/business/${businessId}/plans`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "X-API-KEY": process.env.API_KEY || "",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   },
    // );
    const { response: planRes, data: planData } = businessId
      ? await apiFetch(`/business/${businessId}/plans`, {
          method: "GET",
          headers: {
            "X-API-KEY": process.env.API_KEY || "",
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : { response: new Response(null, { status: 400 }), data: null };

    console.log("Business Plans:", planData);

    if (planRes.ok && Array.isArray(planData?.data)) {
      businessPlans = planData.data;
    }
    if (!planRes.ok) {
      console.error("Failed to fetch Business Plan:", planRes.status, planData);
    }

    // 2. Fetch active payment gateway options
    const { response: gatewayRes, data: gatewayData } = await apiFetch(
      "/gateway",
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("Payment Types:", gatewayData);
    if (gatewayRes.ok && Array.isArray(gatewayData?.data)) {
      paymentGateways = gatewayData.data;
    }
  } catch (error) {
    console.error("Data Fetching Error:", error);
    // If API fails, businessPlans & paymentGateways will default to empty arrays []
  }

  // Return JSX OUTSIDE the try/catch block
  return (
    <BusinessPlan
      businessPlanType={businessPlans}
      paymentGatewayMethod={paymentGateways}
      businessId={businessId}
    />
  );
}

import { cookies } from "next/headers";
import UsOnBoardingForm from "@/components/onboardingForm/UsOnboardingForm";
import { apiFetch } from "@/lib/api";

interface PageProps {
  searchParams: Promise<{ countryId?: string }>;
}

async function usRegistrationPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const countryId = resolvedParams.countryId || "";

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const { response, data } = await apiFetch("/industries", {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    const industriesType = Array.isArray(data?.data) ? data.data : [];

    if (!response.ok) {
      console.error("Failed to fetch industry types:", response.status, data);
    }

    return (
      <div className="grid place-items-center h-screen">
        <UsOnBoardingForm
          countryId={countryId}
          industriesType={industriesType}
        />
      </div>
    );
  } catch (error) {
    console.error("Industry fetch failed:", error);

    return (
      <div className="grid place-items-center h-screen">
        <UsOnBoardingForm countryId={countryId} industriesType={[]} />
      </div>
    );
  }
}

export default usRegistrationPage;

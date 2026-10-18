import { cookies } from "next/headers";
import OnBoardingForm from "@/components/onboardingForm/OnBoardingForm";
import { apiFetch } from "@/lib/api";

interface PageProps {
  searchParams: Promise<{ countryId?: string }>;
}

async function onboardingFormPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const countryId = resolvedParams.countryId || "";

  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    const { response, data } = await apiFetch("/business/type", {
      method: "GET",
      headers: {
        "X-API-KEY": process.env.API_KEY || "",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // console.log("registration type: ", data);
    const entityTypes = Array.isArray(data?.data) ? data.data : [];

    if (!response.ok) {
      console.error("Failed to fetch entity types:", response.status, data);
    }

    // industries

    const { response: industriesResponse, data: industriesData } =
      await apiFetch("/industries", {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.API_KEY || "",
          Authorization: `Bearer ${accessToken}`,
        },
      });

    const industrieTypes = Array.isArray(industriesData?.data)
      ? industriesData.data
      : [];

    if (!industriesResponse.ok) {
      console.error(
        "Failed to fetch industry types:",
        industriesResponse.status,
        industriesData,
      );
    }

    return (
      <div className="grid place-items-center h-screen">
        <OnBoardingForm
          entityTypes={entityTypes}
          countryId={countryId}
          industriesType={industrieTypes}
        />
      </div>
    );
  } catch (error) {
    console.error("Entity types fetch failed:", error);

    return (
      <div className="grid place-items-center h-screen">
        <OnBoardingForm
          entityTypes={[]}
          countryId={countryId}
          industriesType={[]}
        />
      </div>
    );
  }
}

export default onboardingFormPage;

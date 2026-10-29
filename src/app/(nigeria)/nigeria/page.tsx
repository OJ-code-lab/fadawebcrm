import { cookies } from "next/headers";
import OnBoardingForm from "@/components/onboardingForm/OnBoardingForm";
import { apiFetch } from "@/lib/api";
import { industryOptions } from "@/src/data/industry";

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

    const entityTypes = Array.isArray(data?.data) ? data.data : [];

    if (!response.ok) {
      console.error("Failed to fetch entity types:", response.status, data);
    }

    return (
      <div className="grid min-h-screen place-items-center">
        <OnBoardingForm
          entityTypes={entityTypes}
          countryId={countryId}
          industriesType={industryOptions}
        />
      </div>
    );
  } catch (error) {
    console.error("Entity types fetch failed:", error);

    return (
      <div className="grid min-h-screen place-items-center ">
        <OnBoardingForm
          entityTypes={[]}
          countryId={countryId}
          industriesType={industryOptions}
        />
      </div>
    );
  }
}

export default onboardingFormPage;

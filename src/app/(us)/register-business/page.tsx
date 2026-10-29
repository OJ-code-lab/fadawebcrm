import UsOnBoardingForm from "@/components/onboardingForm/UsOnboardingForm";
import { industryOptions } from "@/src/data/industry";

interface PageProps {
  searchParams: Promise<{ countryId?: string }>;
}

async function usRegistrationPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const countryId = resolvedParams.countryId || "";

  return (
    <div className="grid place-items-center h-screen">
      <UsOnBoardingForm
        countryId={countryId}
        industriesType={industryOptions}
      />
    </div>
  );
}

export default usRegistrationPage;

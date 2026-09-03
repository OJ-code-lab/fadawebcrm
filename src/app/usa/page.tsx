"use client";

import { useState } from "react";

import RegistrationHeader from "@/components/register/RegistrationHeader";
import ProgressBar from "@/components/register/ProgressBar";
import WizardNavigation from "@/components/register/WizardNavigation";

import Step1BusinessGoal from "@/components/register/Step1BusinessGoal";
import Step1EntityType from "@/components/register/Step1EntityType";
import Step2A from "@/components/register/Step2A";
import Step2B from "@/components/register/Step2BLocation";
import Step2C from "@/components/register/Step2CLocation";
import Step2D from "@/components/register/Step2DLocation";
import Step2E from "@/components/register/Step2ELocation";
import Step3BusinessName from "@/components/register/Step3BusinessName";
import Step4Plan from "@/components/register/Step4Plan";
import Step5Plans from "@/components/register/Step5Plans";
import ReviewDetails from "@/components/register/ReviewDetails";
import Step5C from "@/components/register/Step5C";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Controls the two screens inside Step 1
  const [step1Screen, setStep1Screen] = useState<
    "business-goal" | "entity-type"
  >("business-goal");

  const [locationScreen, setLocationScreen] = useState<
    "A" | "B" | "C" | "D" | "E"
  >("A");

  const [selectedPlan, setSelectedPlan] = useState<
    "free" | "plus" | "pro" | null
  >(null);
  const [step5Part, setStep5Part] = useState<"A" | "B" | "C">("A");
  const [reviewConfirmed, setReviewConfirmed] = useState(false);

  const [businessName, setBusinessName] = useState("");

  const [plan, setPlan] = useState("");

  const [businessGoal, setBusinessGoal] = useState<"new" | "existing" | null>(
    null,
  );

  const [entityType, setEntityType] = useState<"LLC" | "C-Corp" | null>(null);
  const [locationValue, setLocationValue] = useState<string | null>(null);

  const handleNext = () => {
    // Step 1A → Step 1B
    if (currentStep === 1 && step1Screen === "business-goal") {
      if (!businessGoal) {
        return;
      }

      setStep1Screen("entity-type");
      return;
    }

    // Step 1B → Step 2
    if (currentStep === 1 && step1Screen === "entity-type") {
      if (!entityType) {
        return;
      }

      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      const screens = ["A", "B", "C", "D", "E"] as const;
      const screenIndex = screens.indexOf(locationScreen);

      if (screenIndex < screens.length - 1) {
        setLocationScreen(screens[screenIndex + 1]);
        return;
      }

      setCurrentStep(3);
      return;
    }

    if (currentStep === 5 && step5Part === "A") {
      if (!selectedPlan) {
        return;
      }

      setStep5Part("B");
      return;
    }

    if (currentStep === 5 && step5Part === "B") {
      if (reviewConfirmed) {
        setStep5Part("C");
      }
      return;
    }

    // Other steps
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    // Step 1B → Step 1A
    if (currentStep === 1 && step1Screen === "entity-type") {
      setStep1Screen("business-goal");
      return;
    }

    if (currentStep === 2) {
      const screens = ["A", "B", "C", "D", "E"] as const;
      const screenIndex = screens.indexOf(locationScreen);

      if (screenIndex > 0) {
        setLocationScreen(screens[screenIndex - 1]);
        return;
      }

      setCurrentStep(1);
      return;
    }

    if (currentStep === 5 && step5Part === "B") {
      setStep5Part("A");
      setReviewConfirmed(false);
      return;
    }

    // Previous main step
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canContinue =
    currentStep === 1
      ? step1Screen === "business-goal"
        ? businessGoal !== null
        : entityType !== null
      : currentStep === 2
        ? locationValue !== null
        : true;

  return (
    <main className="min-h-screen bg-[#f7f7f9]">
      {/* =========================
          MOBILE HEADER
          ========================= */}
      <div className="lg:hidden">
        <RegistrationHeader />
      </div>

      {/* =========================
          DESKTOP REGISTRATION CARD
          ========================= */}
      <div className="flex min-h-screen items-start justify-center px-4 py-8 lg:px-6">
        <div
          className={`
            w-full
            max-w-140
            flex flex-col 
            rounded-[14px]
            px-5
            py-15
            sm:px-8
            sm:py-9
            lg:px-7
            lg:py-8
            ${currentStep === 5 ? "lg:max-w-full bg-transparent shadow-0" : "bg-white shadow-[0_1px_8px_rgba(0,0,0,0.03)]"}
            `}
        >
          {/* Desktop header stays INSIDE the card */}
          <div className="hidden lg:block">
            <RegistrationHeader />
          </div>

          {/* Progress */}
          <section className="lg:w-130 w-85 self-center">
            <ProgressBar currentStep={currentStep} />
          </section>

          {/* Step content */}
          <div className="mt-8">
            {/* =========================
                STEP 1A
                ========================= */}
            {currentStep === 1 && step1Screen === "business-goal" && (
              <Step1BusinessGoal
                value={businessGoal}
                onChange={setBusinessGoal}
              />
            )}

            {/* =========================
                STEP 1B
                ========================= */}
            {currentStep === 1 && step1Screen === "entity-type" && (
              <Step1EntityType value={entityType} onChange={setEntityType} />
            )}

            {currentStep === 2 && locationScreen === "A" && (
              <Step2A
                value={locationValue as "yes" | "no" | null}
                onChange={setLocationValue}
              />
            )}

            {currentStep === 2 && locationScreen === "B" && (
              <Step2B value={locationValue} onChange={setLocationValue} />
            )}

            {currentStep === 2 && locationScreen === "C" && (
              <Step2C value={locationValue} onChange={setLocationValue} />
            )}

            {currentStep === 2 && locationScreen === "D" && (
              <Step2D value={locationValue} onChange={setLocationValue} />
            )}

            {currentStep === 2 && locationScreen === "E" && (
              <Step2E
                value={locationValue ?? ""}
                onChange={setLocationValue}
                onOpenDropdown={() => setLocationScreen("D")}
              />
            )}

            {/* Step3 content here */}
            {currentStep === 3 && (
              <Step3BusinessName
                value={businessName}
                onChange={setBusinessName}
              />
            )}
            {/* Step4 content here */}
            {currentStep === 4 && <Step4Plan value={plan} onChange={setPlan} />}
            {/* Step5 csontent here */}
            {currentStep === 5 && step5Part === "A" && (
              <Step5Plans
                selectedPlan={selectedPlan}
                onSelectPlan={(value) => {
                  setSelectedPlan(value);
                  setPlan(value);
                }}
              />
            )}

            {currentStep === 5 && step5Part === "B" && (
              <ReviewDetails
                businessName={businessName}
                entityType={entityType ?? undefined}
                state={locationValue ?? undefined}
                plan={selectedPlan ?? undefined}
                onConfirmChange={setReviewConfirmed}
              />
            )}
            {currentStep === 5 && step5Part === "C" && (
              <Step5C onBack={handleBack} />
            )}
          </div>

          {/* Navigation */}
          <WizardNavigation
            onBack={handleBack}
            onNext={handleNext}
            canContinue={
              currentStep !== 5
                ? canContinue
                : step5Part === "A"
                  ? canContinue && selectedPlan !== null
                  : step5Part === "B"
                    ? reviewConfirmed
                    : false
            }
            isFirstStep={currentStep === 1}
            alignLeft={currentStep === 5 && step5Part === "B"}
            alignRight={currentStep === 5 && step5Part === "A"}
            alignNone={currentStep === 5 && step5Part === "C"}
          />
        </div>
      </div>
    </main>
  );
}

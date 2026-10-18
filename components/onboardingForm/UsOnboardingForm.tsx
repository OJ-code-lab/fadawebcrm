"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field } from "../ui/field";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Card } from "../ui/card";

// ---------------------------------------------------------------
// Types
// ---------------------------------------------------------------
type StateOption = {
  id: string;
  name: string;
};

type IndustryType = {
  id?: string;
  name: string;
};

type OnBoardingFormProps = {
  countryId: string;
  industriesType: IndustryType[];
};

export interface FormData {
  based_in_us: "yes" | "no" | ""; // UI only, never sent to the backend
  citizenship: string; // country code of where the user resides
  business_state_id: string;
  name: string;
  companySecondName: string;
  entity_type: string;
  industry_id: string;
}

const initialFormData: FormData = {
  based_in_us: "",
  citizenship: "",
  business_state_id: "",
  name: "",
  companySecondName: "",
  entity_type: "",
  industry_id: "",
};

// ---------------------------------------------------------------
// Static options (full name is displayed, code is sent)
// ---------------------------------------------------------------
const RESIDENCE_COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "UAE", name: "United Arab Emirates" },
];

const ENTITY_TYPES = [
  { value: "LLC", label: "LLC" },
  { value: "CORP", label: "CORP" },
];

// ---------------------------------------------------------------
// Steps: named, not numbered. The list changes with the path.
// ---------------------------------------------------------------
type StepKey = "based" | "residence" | "state" | "name" | "entity" | "industry";

function getSteps(basedInUs: FormData["based_in_us"]): StepKey[] {
  return basedInUs === "no"
    ? ["based", "residence", "state", "name", "entity", "industry"]
    : ["based", "state", "name", "entity", "industry"];
}

const isStepValid = (step: StepKey, data: FormData): boolean => {
  switch (step) {
    case "based":
      return data.based_in_us !== "" && data.citizenship !== "";
    case "residence":
      return data.citizenship.trim() !== "";
    case "state":
      return data.business_state_id.trim() !== "";
    case "name":
      return data.name.trim() !== "";
    case "entity":
      return data.entity_type.trim() !== "";
    case "industry":
      return data.industry_id.trim() !== "";
    default:
      return false;
  }
};

// ---------------------------------------------------------------
// Small presentational pieces
// ---------------------------------------------------------------
interface ProgressBarProps {
  currentStep: number; // 1-based
  totalSteps: number;
}

function StepProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-6 flex w-full items-center gap-1 sm:gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const color =
          stepNumber < currentStep
            ? "bg-green-600"
            : stepNumber === currentStep
              ? "bg-blue-600"
              : "bg-gray-50";

        return (
          <div
            key={stepNumber}
            className={`h-0.5 flex-1 rounded-4xl transition-colors sm:h-1 ${color}`}
          />
        );
      })}
    </div>
  );
}

interface RadioOptionProps {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: (value: string) => void;
}

function RadioOption({
  id,
  name,
  value,
  label,
  checked,
  onSelect,
}: RadioOptionProps) {
  return (
    <div className="my-4">
      <label
        htmlFor={id}
        className={`flex items-center gap-3 w-full py-3 px-5 rounded-4xl cursor-pointer transition-all ${
          checked ? "bg-blue-card text-white" : "bg-gray-100"
        }`}
      >
        <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          onChange={() => onSelect(value)}
          className="sr-only"
        />
        <span className={checked ? "text-white" : "text-black"}>{label}</span>
      </label>
    </div>
  );
}

// ---------------------------------------------------------------
// Main form
// ---------------------------------------------------------------
function UsOnBoardingForm({ countryId, industriesType }: OnBoardingFormProps) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState<StateOption[]>([]);

  const steps = getSteps(formData.based_in_us);
  const currentStep = steps[currentIndex];
  const isLastStep = currentIndex === steps.length - 1;
  const currentValid = isStepValid(currentStep, formData);

  useEffect(() => {
    async function getStates() {
      try {
        const response = await fetch("/api/get/business/states");
        if (!response.ok) {
          throw new Error(`Failed to load states (${response.status})`);
        }
        const data: StateOption[] = await response.json();
        // the API returns fees etc. too; we only keep what we need
        setStates(data.map(({ id, name }) => ({ id, name })));
      } catch (error) {
        console.error("Could not load states:", error);
      }
    }

    getStates();
  }, []);

  const updateField = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Step 1: Yes auto-sets citizenship to US; No clears it so the
  // user must pick a country on the next step.
  const handleBasedInUs = (value: string) => {
    if (value === "yes") {
      setFormData((prev) => ({
        ...prev,
        based_in_us: "yes",
        citizenship: "US",
      }));
    } else {
      setFormData((prev) =>
        prev.based_in_us === "no"
          ? prev
          : { ...prev, based_in_us: "no", citizenship: "" },
      );
    }
  };

  const handleNext = () => {
    if (currentValid && !isLastStep) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pressing Enter on an earlier step acts like "Next", not "Submit"
    if (!isLastStep) {
      handleNext();
      return;
    }

    if (!steps.every((step) => isStepValid(step, formData))) {
      return;
    }

    setIsSubmitting(true);

    const businessDatas = {
      business_country_id: countryId,
      name: formData.name,
      companySecondName: formData.companySecondName,
      business_state_id: formData.business_state_id,
      entity_type: formData.entity_type,
      industry_id: formData.industry_id,
      citizenship: formData.citizenship,
    };

    try {
      const response = await fetch("/api/usOnboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessDatas),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Business creation failed:", data);
        return;
      }

      const businessId = data?.data?.id ?? data?.data?.business?.id ?? data?.id;
      if (typeof businessId !== "string" || !businessId) {
        console.error(
          "Business creation response is missing a valid ID:",
          data,
        );
        return;
      }

      router.push(
        `/register-business/business_plan?businessId=${encodeURIComponent(businessId)}`,
      );
    } catch (error) {
      console.error("Business creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-4xl bg-primary p-8">
      <StepProgressBar
        currentStep={currentIndex + 1}
        totalSteps={steps.length}
      />
      <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
        {/* Based in the US? */}
        {currentStep === "based" && (
          <Card className="w-full max-w-2xl px-4 py-8.5 bg-transparent text-center">
            <h4 className="font-bold text-2xl text-black">
              Are you personally based in the US?
            </h4>
            <div>
              <RadioOption
                id="based-yes"
                name="based_in_us"
                value="yes"
                label="Yes"
                checked={formData.based_in_us === "yes"}
                onSelect={handleBasedInUs}
              />
              <RadioOption
                id="based-no"
                name="based_in_us"
                value="no"
                label="No"
                checked={formData.based_in_us === "no"}
                onSelect={handleBasedInUs}
              />
            </div>
          </Card>
        )}

        {/* Country of residence (only when the answer was "No") */}
        {currentStep === "residence" && (
          <Card className="w-full max-w-2xl px-4 py-8.5 bg-transparent text-center">
            <h4 className="font-bold text-2xl text-black">
              Which country do you reside in?
            </h4>
            <div>
              {RESIDENCE_COUNTRIES.map((country) => (
                <RadioOption
                  key={country.code}
                  id={`residence-${country.code}`}
                  name="citizenship"
                  value={country.code}
                  label={country.name}
                  checked={formData.citizenship === country.code}
                  onSelect={(value) => updateField("citizenship", value)}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Business state */}
        {currentStep === "state" && (
          <Card className="w-full max-w-2xl px-4 py-8.5 bg-transparent text-center">
            <div className="space-y-8">
              <h4 className="font-semibold text-2xl text-center">
                What state are you operating from?
              </h4>
              <div className="space-y-4">
                <Field className="w-full">
                  <Select
                    value={formData.business_state_id}
                    onValueChange={(value) =>
                      typeof value === "string" &&
                      updateField("business_state_id", value)
                    }
                  >
                    <SelectTrigger className="w-full p-6">
                      <SelectValue placeholder="Select your state">
                        {states.find((s) => s.id === formData.business_state_id)
                          ?.name ?? "Select your state"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>States</SelectLabel>
                        {states.map((state) => (
                          <SelectItem key={state.id} value={state.id}>
                            {state.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          </Card>
        )}

        {/* Company name */}
        {currentStep === "name" && (
          <Card className="w-full max-w-2xl sm:max-w-lg px-4 py-8.5 bg-transparent text-center">
            <div className="space-y-6">
              <h4 className="font-bold text-2xl text-center">
                What do you want to name your company?
              </h4>

              <p className="font-light text-base text-light-black">
                You can change your name even after paying. We&apos;ll ask you
                for final confirmation later.
              </p>

              <div className="space-y-4">
                <Input
                  id="company_name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Enter Company Name (required)"
                  className="w-full p-6 mb-1 text-center"
                />
                <Label
                  htmlFor="company_name"
                  className="font-medium text-sm text-gray-500"
                >
                  Proposed Company Name 1
                </Label>
              </div>
              <div className="space-y-4">
                <Input
                  id="companySecondName"
                  type="text"
                  value={formData.companySecondName}
                  onChange={(e) =>
                    updateField("companySecondName", e.target.value)
                  }
                  placeholder="Enter Company Name (optional)"
                  className="w-full p-6 mb-1 text-center"
                />
                <Label
                  htmlFor="companySecondName"
                  className="font-medium text-sm text-gray-500"
                >
                  Proposed Company Name 2
                </Label>
              </div>
            </div>
          </Card>
        )}

        {/* Entity type */}
        {currentStep === "entity" && (
          <Card className="w-full max-w-2xl sm:max-w-lg min-w-xs px-4 py-8.5 bg-transparent text-center">
            <h4 className="font-bold text-2xl text-black">
              What entity does your business need?
            </h4>
            <div>
              {ENTITY_TYPES.map((type) => (
                <RadioOption
                  key={type.value}
                  id={`entity-${type.value}`}
                  name="entity_type"
                  value={type.value}
                  label={type.label}
                  checked={formData.entity_type === type.value}
                  onSelect={(value) => updateField("entity_type", value)}
                />
              ))}
            </div>
          </Card>
        )}

        {/* Industry */}
        {currentStep === "industry" && (
          <Card className="w-full max-w-2xl sm:max-w-lg min-w-xs px-4 py-8.5 bg-transparent text-center">
            <div className="space-y-8">
              <h4 className="font-semibold text-2xl text-center">
                Select Line of Business
              </h4>
              <div className="space-y-4">
                <Field className="w-full">
                  <Select
                    value={formData.industry_id}
                    onValueChange={(value) =>
                      typeof value === "string" &&
                      updateField("industry_id", value)
                    }
                  >
                    <SelectTrigger className="w-full p-6">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {industriesType.map((industry) => (
                          <SelectItem
                            key={String(industry.id ?? industry.name)}
                            value={String(industry.id ?? industry.name)}
                          >
                            {industry.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="rounded-4xl text-black bg-amber-500/20 hover:bg-amber-500/70"
          >
            <span>
              <ArrowLeftFromLine />
            </span>
            Back
          </Button>

          {!isLastStep ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!currentValid}
              className={`rounded-4xl text-white border-0 ${
                currentValid ? "bg-blue-card hover:bg-blue-900" : "bg-gray-400"
              }`}
            >
              Next
              <span>
                <ArrowRightFromLine />
              </span>
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!currentValid || isSubmitting}
              className="rounded-4xl text-white bg-green-500 hover:bg-green-600"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default UsOnBoardingForm;

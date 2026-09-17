"use client";

// import {BASE_URL, API_KEY} from "@/"

import { useState } from "react";
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
import { NIGERIAN_STATES } from "@/src/app/(nigeria)/location";

// ----------------------------------------------------------
// const response = await fetch("/api/business/createNg", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(FormData),
// });

// const data = await response.json();
// console.log("onboarding data: ", data);

// const ID_Type = [
//   { label: "ID Type", value: null },
//   { label: "National ID (NIN)", value: "NIN" },
//   { label: "International Passport", value: "international passsport" },
//   { label: "Driver's Licence", value: "driver's licence" },
//   { label: "Voter's Card (PVC)", value: "PVC" },
// ];
// ------------------------------------
type EntityType = {
  price: string;
  symbol: string;
  label: string;
  value: string;
};

type IndustryType = {
  id?: string;
  name: string;
};

type OnBoardingFormProps = {
  entityTypes: EntityType[];
  countryId: string;
  industriesType: IndustryType[];
};

// type countryId = {
//   id: string;
// }
// type countryIdProps = {
//   countryId: countryId[];
// }

// -------------------------------------
export interface FormData {
  business_country_id: string;
  state: string;
  company_name: string;
  companySecondName: string;
  registration_type: string;
  industry_id: string;

  // notifications: boolean;
  // termsAccepted: boolean;
}

const initialFormData: FormData = {
  business_country_id: "",
  state: "",
  company_name: "",
  companySecondName: "",
  registration_type: "",
  industry_id: "",

  // notifications: false,
  // termsAccepted: false,
};

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

function StepProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-6 flex w-full items-center justify-between gap-1 overflow-x-auto pb-1 sm:gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        // const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center flex-1">
            {/* Connecting Line */}
            {stepNumber < totalSteps && (
              <div
                className={`mx-1 h-0.5 min-w-1 flex-1 rounded-4xl transition-colors sm:mx-2 sm:h-1
                  // 
                   ${
                     stepNumber < currentStep
                       ? "bg-green-600"
                       : isCurrent
                         ? "bg-blue-600"
                         : "bg-gray-50"
                   }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

const isStepValid = (step: number, data: FormData): boolean => {
  switch (step) {
    case 1:
      return data.state.trim() !== "";
    case 2:
      return data.company_name.trim() !== "";
    case 3:
      return data.registration_type.trim() !== "";
    case 4:
      return data.industry_id.trim() !== "";
    default:
      return false;
  }
};

function OnBoardingForm({
  entityTypes,
  countryId,
  industriesType,
}: OnBoardingFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   if (countryId) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       business_country_id: countryId,
  //     }));
  //   }
  // }, [countryId]);

  const updateField = (key: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (isStepValid(currentStep, formData) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (isStepValid(currentStep, formData)) {
  //     setIsSubmitting(true);
  //     console.log("Form Submitted Successfully:", formData);
  //     //   setIsOpen(false);
  //     setCurrentStep(1);
  //     setFormData(initialFormData);
  //     router.push("/");
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStepValid(currentStep, formData)) {
      return;
    }

    setIsSubmitting(true);

    // passing countryid props

    const businessDatas = {
      business_country_id: countryId,
      company_name: formData.company_name,
      companySecondName: formData.companySecondName,
      // state: formData.state,
      registration_type: formData.registration_type,
      industry_id: formData.industry_id,
    };

    try {
      console.log("businessDatas being sent:", businessDatas);
      // console.log("countryId:", countryId);
      // console.log("entityTypes:", entityTypes);
      console.log("current formData:", formData);
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(businessDatas),
      });

      const data = await response.json();

      console.log("onboarding data:", data);

      if (!response.ok) {
        console.error("Business creation failed:", data);
        return;
      }

      router.push(`/nigeria/business_plan/${data.id}`);
    } catch (error) {
      console.error("Business creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <div className="border rounded-4xl bg-primary p-8">
        <StepProgressBar currentStep={currentStep} totalSteps={4} />
        <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <Card className="w-full max-w-2xl px-4 py-8.5 bg-transparent  text-center ">
              <div className="space-y-8">
                <h4 className="font-semibold text-2xl text-center">
                  What state are you be operating from?
                </h4>

                <div className=" ">
                  <div className="space-y-4">
                    <Field className="w-full">
                      <Select
                        value={formData.state}
                        onValueChange={(value) =>
                          typeof value === "string" &&
                          updateField("state", value)
                        }
                      >
                        <SelectTrigger className="w-full p-6">
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>States</SelectLabel>
                            {NIGERIAN_STATES.map((state) => (
                              <SelectItem key={state.state} value={state.state}>
                                {state.state}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>
              </div>

              {/* <div>
                {entityTypes.map((type) => (
                  <p key={type.label}>{type.label}</p>
                ))}
              </div> */}
            </Card>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <Card className="w-full max-w-2xl sm:max-w-lg px-4 py-8.5 bg-transparent  text-center">
              <div className="space-y-6">
                <h4 className="font-semibold text-2xl text-center ">
                  what do you want to name your company?
                </h4>

                <p className="font-light text-base text-light-black">
                  You can change your name even after paying. We&apos;ll ask you
                  for final confirmation later.
                </p>

                <div className="space-y-4">
                  <Input
                    id="company_name"
                    type="text"
                    value={formData.company_name}
                    onChange={(e) =>
                      updateField("company_name", e.target.value)
                    }
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
                    className="w-full p-6 mb-1 text-center "
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

          {/* STEP 3 */}
          {currentStep === 3 && (
            <Card className="w-full max-w-2xl sm:max-w-lg min-w-xs  px-4 py-8.5 bg-transparent  text-center ">
              <div className="space-y-8">
                <h4 className="font-semibold text-2xl text-center">
                  Select registration type
                </h4>

                <div className=" ">
                  <div className="space-y-4">
                    <Field className="w-full">
                      <Select
                        value={formData.registration_type}
                        onValueChange={(value) =>
                          typeof value === "string" &&
                          updateField("registration_type", value)
                        }
                      >
                        <SelectTrigger className="w-full p-6">
                          <SelectValue placeholder="Select registration type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {/* <SelectLabel>Select registration type</SelectLabel> */}
                            {entityTypes.map((type) => (
                              <SelectItem
                                key={type.label}
                                value={String(type.value)}
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {/* STEP 4 */}
          {currentStep === 4 && (
            <Card className="w-full max-w-2xl sm:max-w-lg min-w-xs  px-4 py-8.5 bg-transparent  text-center ">
              <div className="space-y-8">
                <h4 className="font-semibold text-2xl text-center">
                  Select registration type
                </h4>

                <div className=" ">
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
              </div>
            </Card>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`rounded-4xl text-black
                 ${
                   !isStepValid(currentStep, formData)
                     ? " bg-amber-500/40 hover:bg-amber-500/70"
                     : "bg-amber-500/20 hover:bg-amber-500/70"
                 }
                `}
            >
              <span>
                <ArrowLeftFromLine />
              </span>
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid(currentStep, formData)}
                className={`rounded-4xl text-white border-0
                 ${
                   !isStepValid(currentStep, formData)
                     ? " bg-gray-400"
                     : "bg-blue-card hover:bg-blue-900"
                 }
                `}
              >
                Next
                <span>
                  <ArrowRightFromLine />
                </span>
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isStepValid(currentStep, formData) || isSubmitting}
                className={`rounded-4xl text-white
                 ${
                   !isStepValid(currentStep, formData)
                     ? " bg-green-500"
                     : "bg-green-500 hover:bg-green-600"
                 }
                `}
              >
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default OnBoardingForm;

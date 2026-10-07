"use client";
import {
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Button } from "./button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { completeUsCompanyReg } from "@/src/actions/complete-companyReg";
import type { BusinessDetailsInitial } from "./CompleteReg";

/* ---------------------------------- types --------------------------------- */

export interface UsBusiness {
  id: string;
  name: string;
  status: string;
  industry: string;
  business_country: string;
  business_country_id: string;
  business_number: string;
  entity_type: string;
  industry_id: string;
  citizenship: string;
  state: string;
  state_fee: string;
  ssn: string;
  ein: string; // NEW
  members: {
    first_name: string;
    last_name: string;
    ownership_percentage: string;
  }[];
  addresses: {
    address: string;
    state: string;
    city: string;
    country: string;
    postal_code: string;
  }[];
}

// NEW: what the user types in for ONE owner (details + address together)
interface Owner {
  first_name: string;
  last_name: string;
  ownership_percentage: string;
  address: string;
  state: string;
  city: string;
  country: string;
  postal_code: string;
}
const emptyOwner: Owner = {
  first_name: "",
  last_name: "",
  ownership_percentage: "",
  address: "",
  state: "",
  city: "",
  country: "",
  postal_code: "",
};

/* ------------------------------ small helpers ------------------------------ */

// One place to change the look of every input
const inputClass =
  "w-full py-3 px-3 border rounded-4xl border-black disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed";

function Field({
  id,
  label,
  className = "",
  ...inputProps
}: { id: string; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`space-y-2 ${className}`}>
      <input id={id} name={id} className={inputClass} {...inputProps} />
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
    </div>
  );
}
function StepProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-6 flex w-full gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        return (
          <div
            key={stepNumber}
            className={`h-1 flex-1 rounded-full transition-colors ${
              stepNumber < currentStep
                ? "bg-green-600"
                : stepNumber === currentStep
                  ? "bg-blue-600"
                  : "bg-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div
      role="status"
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40"
    >
      <div className="flex h-40 w-56 flex-col items-center justify-center gap-3 rounded-xl bg-white shadow-lg">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-slate-800" />
        <p className="text-xs text-purple-700">wait a moment ....</p>
      </div>
    </div>
  );
}

function OwnerFields({
  owner,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  owner: Owner;
  index: number;
  canRemove: boolean;
  onChange: (field: keyof Owner, value: string) => void;
  onRemove: () => void;
}) {
  const id = (field: string) => `owner-${index}-${field}`;

  return (
    <fieldset className="space-y-4 rounded-2xl border p-4">
      <legend className="px-2 font-semibold">Owner {index + 1}</legend>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field
          id={id("first_name")}
          label="First name"
          placeholder="Enter first name"
          value={owner.first_name}
          onChange={(e) => onChange("first_name", e.target.value)}
          required
        />
        <Field
          id={id("last_name")}
          label="Last name"
          placeholder="Enter last name"
          value={owner.last_name}
          onChange={(e) => onChange("last_name", e.target.value)}
          required
        />
        <Field
          id={id("ownership_percentage")}
          label="Ownership percentage"
          type="number"
          min={0}
          max={100}
          step="any"
          placeholder="55.5"
          value={owner.ownership_percentage}
          onChange={(e) => onChange("ownership_percentage", e.target.value)}
          required
        />
      </div>

      <Field
        id={id("address")}
        label="Address"
        placeholder="Enter address"
        value={owner.address}
        onChange={(e) => onChange("address", e.target.value)}
        required
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          id={id("city")}
          label="City"
          placeholder="Enter city"
          value={owner.city}
          onChange={(e) => onChange("city", e.target.value)}
          required
        />
        <Field
          id={id("state")}
          label="State/Province/Region"
          placeholder="Enter state"
          value={owner.state}
          onChange={(e) => onChange("state", e.target.value)}
          required
        />
        <Field
          id={id("postal_code")}
          label="Postal code"
          placeholder="Enter postal code"
          value={owner.postal_code}
          onChange={(e) => onChange("postal_code", e.target.value)}
          required
        />
        <Field
          id={id("country")}
          label="Country"
          placeholder="Enter country"
          value={owner.country}
          onChange={(e) => onChange("country", e.target.value)}
          required
        />
      </div>

      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-red-600 hover:underline"
        >
          Remove owner
        </button>
      )}
    </fieldset>
  );
}

/* -------------------------------- component -------------------------------- */

interface GetStartedUSModalProps {
  businessId?: string;
  initial?: BusinessDetailsInitial;
}

// FIXED: React components must start with a capital letter, otherwise hooks
// inside them throw "invalid hook call". Rename the import where you use it.
export function GetStartedUSModal({
  businessId,
  initial,
}: GetStartedUSModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Data from the API (read-only except the company name)
  const [business, setBusiness] = useState<UsBusiness | null>(null);
  const [companyName, setCompanyName] = useState(initial?.companyName ?? "");
  const [loadError, setLoadError] = useState<string | null>(null);

  const [owners, setOwners] = useState<Owner[]>([{ ...emptyOwner }]);
  const [isOwner, setIsOwner] = useState(false);
  const [ssn, setSsn] = useState("");

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isUS =
    business?.citizenship?.toLowerCase() === "us" ||
    initial?.citizenship?.toLowerCase() === "us";
  const totalSteps = isUS ? 3 : 2;

  const isLastStep = currentStep === totalSteps;

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const id = businessId;
        if (!id) {
          setLoadError(
            "We could not load your business details. Please refresh.",
          );
          return;
        }

        const response = await fetch(`/api/get/business/${id}`);
        if (!response.ok) throw new Error("Request failed");
        const data: UsBusiness = await response.json();
        setBusiness(data);
        setCompanyName((prev) => prev || data.name);
      } catch (err) {
        console.error("Failed to load business:", err);
        setLoadError(
          "We could not load your business details. Please refresh.",
        );
      }
    };

    void loadBusiness();
  }, [businessId]);

  /* ---------------------------- owners handlers ---------------------------- */

  const updateOwner = (index: number, field: keyof Owner, value: string) => {
    setOwners((prev) =>
      prev.map((owner, i) =>
        i === index ? { ...owner, [field]: value } : owner,
      ),
    );
  };

  const addOwner = () => setOwners((prev) => [...prev, { ...emptyOwner }]);

  const removeOwner = (index: number) =>
    setOwners((prev) => prev.filter((_, i) => i !== index));

  const totalPercentage = owners.reduce(
    (sum, owner) => sum + (Number(owner.ownership_percentage) || 0),
    0,
  );
  const percentageIsValid = Math.abs(totalPercentage - 100) < 0.01;

  /* ------------------------------- validation ------------------------------ */

  const isOwnerComplete = (o: Owner) =>
    Object.values(o).every((value) => value.trim() !== "") &&
    Number(o.ownership_percentage) > 0;

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return companyName.trim() !== "";
      case 2:
        return isOwner && owners.every(isOwnerComplete) && percentageIsValid;
      case 3:
        return ssn.trim() !== "";
      default:
        return false;
    }
  };
  const currentValid = isStepValid(currentStep);

  /* ------------------------------ navigation ------------------------------- */

  const handleNext = () => {
    if (currentValid && !isLastStep) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextBusinessId = business?.id ?? businessId;
    if (!nextBusinessId || !isLastStep || !currentValid) return;

    setSubmitError(null);
    setIsSubmitting(true); // shows the loading card

    try {
      const payload = new FormData();
      payload.append("name", companyName);
      payload.append("owners", JSON.stringify(owners));
      payload.append("ssn", isUS ? ssn : "");
      payload.append("is_owner", String(isOwner));

      const result = await completeUsCompanyReg(nextBusinessId, payload);

      if (!result.success) {
        console.error(
          "Business registration response:",
          JSON.stringify({ status: result.status, body: result.body }, null, 2),
        );
        throw new Error(result.error);
      }

      // Success: keep the loading card up while the redirect happens
      setIsOpen(false);
      router.push("/dashboard");
    } catch (err) {
      console.error("Business registration submission failed:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setIsSubmitting(false); // failure: hide loading, keep every answer
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="bg-transparent border rounded-3xl px-4 py-2 hover:bg-primary">
          Get Started
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100dvh-1rem)] min-w-0 overflow-y-auto px-4 py-4 sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100dvh-2rem)] lg:max-w-4xl lg:px-8">
          <StepProgressBar currentStep={currentStep} totalSteps={totalSteps} />

          {loadError && <p className="text-sm text-red-600">{loadError}</p>}

          <form className="min-w-0 space-y-4" onSubmit={handleSubmit}>
            {/* STEP 1: company info (from the API) */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-3xl">Company Information</h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* the only editable field */}
                  <Field
                    id="name"
                    label="Company name"
                    placeholder="Company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                  />
                  <Field
                    id="entity_type"
                    label="Entity type"
                    value={business?.entity_type ?? ""}
                    disabled
                    readOnly
                  />
                  <Field
                    id="state"
                    label="State"
                    value={business?.state ?? ""}
                    disabled
                    readOnly
                  />
                  <Field
                    id="industry"
                    label="Industry"
                    value={business?.industry ?? ""}
                    disabled
                    readOnly
                  />
                </div>

                <Field
                  id="ein"
                  label="EIN"
                  type="password"
                  value={business?.ein ?? ""}
                  disabled
                  readOnly
                />
              </div>
            )}

            {/* STEP 2: owners */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="font-bold text-3xl">Owners Information</h3>

                {owners.map((owner, index) => (
                  <div key={index} className="space-y-3">
                    <OwnerFields
                      owner={owner}
                      index={index}
                      canRemove={index > 0}
                      onChange={(field, value) =>
                        updateOwner(index, field, value)
                      }
                      onRemove={() => removeOwner(index)}
                    />

                    {/* NEW: required checkbox, belongs to the first person */}
                    {index === 0 && (
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={isOwner}
                          onChange={(e) => setIsOwner(e.target.checked)}
                        />
                        This is the owner of the company
                      </label>
                    )}
                  </div>
                ))}

                {/* NEW: add another owner (no maximum) */}
                <button
                  type="button"
                  onClick={addOwner}
                  className="w-full rounded-2xl border border-dashed py-3 text-sm hover:bg-gray-50"
                >
                  + Add other owners
                </button>

                {/* NEW: running total so the user knows why Next is disabled */}
                <p
                  className={`text-sm ${
                    percentageIsValid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Total ownership: {totalPercentage}% (must equal 100%)
                </p>
              </div>
            )}

            {/* STEP 3: SSN/TIN (only exists when citizenship is US) */}
            {isUS && currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-3xl">Input your SSN/TIN</h3>
                <Field
                  id="ssn"
                  label="SSN/TIN"
                  placeholder="Input your SSN/TIN"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  required
                />
              </div>
            )}

            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}

            {/* Navigation controls */}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isSubmitting}
                className="rounded-4xl text-black bg-amber-500/20 hover:bg-amber-500/70"
              >
                <span>
                  <ArrowLeftFromLine />
                </span>
                Back
              </Button>

              {!isLastStep ? (
                <Button
                  key="next"
                  type="button"
                  onClick={handleNext}
                  disabled={!currentValid}
                  className={`rounded-4xl text-white border-0 ${
                    currentValid
                      ? "bg-blue-card hover:bg-blue-900"
                      : "bg-gray-400"
                  }`}
                >
                  Next
                  <span>
                    <ArrowRightFromLine />
                  </span>
                </Button>
              ) : (
                <Button
                  key="submit"
                  type="submit"
                  disabled={!currentValid || isSubmitting}
                  className="rounded-4xl text-white bg-green-500 hover:bg-green-600"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {isSubmitting && <LoadingOverlay />}
    </>
  );
}

export default GetStartedUSModal;

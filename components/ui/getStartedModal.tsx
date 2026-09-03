"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { StepProgressBar } from "./StepProgressBar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "./field";
import { ArrowLeftFromLine, ArrowRightFromLine, Loader2 } from "lucide-react";

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
];
const ID_Type = [
  { label: "ID Type", value: null },
  { label: "National ID (NIN)", value: "NIN" },
  { label: "International Passport", value: "international passsport" },
  { label: "Driver's Licence", value: "driver's licence" },
  { label: "Voter's Card (PVC)", value: "PVC" },
];
const shareHolder_ID_Type = [
  { label: "ID Type", value: null },
  { label: "National ID (NIN)", value: "NIN" },
  { label: "International Passport", value: "international passsport" },
  { label: "Driver's Licence", value: "driver's licence" },
  { label: "Voter's Card (PVC)", value: "PVC" },
];

export interface FormData {
  // Step 1
  companyName: string;
  documentType: string;
  state: string;
  date: string;
  ein: string;
  // Step 2
  businessCategory: string;
  // Step 3
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  signature: string;
  // Step 4
  witnessAddress: string;
  witnessState: string;
  witnessLGA: string;
  witnessCity: string;
  // Step 5
  directorFirstName: string;
  directorLastName: string;
  directorPercentage: string;
  directorTel: string;
  directorEmail: string;
  directorSignature: string;
  anotherOwner: string;
  ownershipComfirmation: boolean;
  // step6
  directorAddress: string;
  directorState: string;
  directorLGA: string;
  directorCity: string;
  // ID
  meansOfIdentification: string;
  identityNumber: string;
  // Step 5
  shareHolderFirstName: string;
  shareHolderLastName: string;
  shareHolderPercentage: string;
  shareHolderTel: string;
  shareHolderEmail: string;
  shareHolderSignature: string;
  anotherShareHolder: string;
  shareHolderComfirmation: boolean;
  // step6
  shareHolderAddress: string;
  shareHolderState: string;
  shareHolderLGA: string;
  shareHolderCity: string;
  // ID
  shareHolderIdentification: string;
  sholderHolderIdentityNumber: string;
  // Step 9
  notifications: boolean;
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  companyName: "",
  documentType: "",
  state: "",
  date: "",
  ein: "",
  businessCategory: "",
  // step 3
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  signature: "",
  // step 4
  witnessAddress: "",
  witnessState: "",
  witnessLGA: "",
  witnessCity: "",
  // step 5
  directorFirstName: "",
  directorLastName: "",
  directorPercentage: "",
  directorTel: "",
  directorEmail: "",
  directorSignature: "",
  anotherOwner: "",
  ownershipComfirmation: false,
  // Step 6
  directorAddress: "",
  directorState: "",
  directorLGA: "",
  directorCity: "",
  // ID
  meansOfIdentification: "",
  identityNumber: "",

  // step 7
  shareHolderFirstName: "",
  shareHolderLastName: "",
  shareHolderPercentage: "",
  shareHolderTel: "",
  shareHolderEmail: "",
  shareHolderSignature: "",
  anotherShareHolder: "",
  shareHolderComfirmation: false,
  // Step 8
  shareHolderAddress: "",
  shareHolderState: "",
  shareHolderLGA: "",
  shareHolderCity: "",
  // ID
  shareHolderIdentification: "",
  sholderHolderIdentityNumber: "",

  // step 9
  notifications: false,
  termsAccepted: false,
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
            {/* Step Circle Indicator */}
            {/* <div
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white transition-colors md:h-8 md:w-8 md:text-sm ${
                isCompleted
                  ? "bg-green-600"
                  : isCurrent
                    ? "bg-blue-600"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {isCompleted ? "✓" : stepNumber}
            </div> */}

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
      return (
        data.companyName.trim() !== "" &&
        data.documentType.trim() !== "" &&
        data.state.trim() !== "" &&
        data.date.trim() !== "" &&
        data.ein.trim() !== ""
      );
    case 2:
      return data.businessCategory.trim() !== "";
    case 3:
      return (
        data.firstName.trim() !== "" &&
        data.lastName.trim() !== "" &&
        data.phoneNumber.trim() !== "" &&
        data.email.trim().includes("@") &&
        data.signature.trim() !== ""
      );
    case 4:
      return (
        data.witnessAddress.trim() !== "" &&
        data.witnessState.trim() !== "" &&
        data.witnessLGA.trim() !== "" &&
        data.witnessCity.trim() !== ""
      );
    case 5:
      return (
        data.directorFirstName.trim() !== "" &&
        data.directorLastName.trim() !== "" &&
        data.directorPercentage.trim() !== "" &&
        data.directorTel.trim() !== "" &&
        data.directorEmail.trim() !== "" &&
        data.directorSignature.trim() !== "" &&
        data.anotherOwner.trim() !== "" &&
        data.ownershipComfirmation === true
      );
    case 6:
      return (
        data.directorAddress.trim() !== "" &&
        data.directorState.trim() !== "" &&
        data.directorLGA.trim() !== "" &&
        data.directorCity.trim() !== ""
      );
    case 7:
      return (
        data.shareHolderFirstName.trim() !== "" &&
        data.shareHolderLastName.trim() !== "" &&
        data.shareHolderPercentage.trim() !== "" &&
        data.shareHolderTel.trim() !== "" &&
        data.shareHolderEmail.trim() !== "" &&
        data.shareHolderSignature.trim() !== "" &&
        data.anotherShareHolder.trim() !== "" &&
        data.shareHolderComfirmation === true
      );
    case 8:
      return (
        data.shareHolderAddress.trim() !== "" &&
        data.shareHolderState.trim() !== "" &&
        data.shareHolderLGA.trim() !== "" &&
        data.shareHolderCity.trim() !== ""
      );
    case 9:
      return data.termsAccepted === true;
    default:
      return false;
  }
};

// identification-----------------------------------
type Errors = Partial<
  Record<"meansOfIdentification" | "identityNumber" | "signature", string>
>;

function validateIdSection(data: FormData): Errors {
  const errors: Errors = {};
  if (!data.meansOfIdentification)
    errors.meansOfIdentification = "Select an ID type";
  if (!data.identityNumber?.trim())
    errors.identityNumber = "ID number is required";
  if (!data.signature?.trim()) errors.signature = "Signature is required";
  return errors;
}
// -------------------------------------
export function GetStartedModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [idModal, setIdModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idErrors, setIdErrors] = useState<Errors>({});

  const updateField = (key: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (isStepValid(currentStep, formData) && currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid(currentStep, formData)) {
      setIsSubmitting(true);
      console.log("Form Submitted Successfully:", formData);
      setIsOpen(false);
      setCurrentStep(1);
      setFormData(initialFormData);
      router.push("/");
    }
  };

  function handleIdDone() {
    const errors = validateIdSection(formData);

    if (Object.keys(errors).length > 0) {
      setIdErrors(errors);
      return; // blocked — same gate pattern as your main Next button
    }

    setIdErrors({});
    setIdModal(false); // closes ONLY this inner dialog, outer modal stays open
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="bg-transparent border rounded-3xl px-4 py-2 hover:bg-primary">
          GetStarted
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100dvh-1rem)] min-w-0 overflow-y-auto px-4 py-4 sm:max-h-[calc(100dvh-2rem)] sm:max-w-[calc(100dvh-2rem)]   lg:max-w-4xl lg:px-8">
          <DialogHeader>
            {/* <DialogTitle>Step {currentStep} of 9</DialogTitle> */}
          </DialogHeader>

          <StepProgressBar currentStep={currentStep} totalSteps={9} />

          <form onSubmit={handleSubmit} className="min-w-0 space-y-4">
            {/* STEP 1 */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <h4 className="font-semibold text-2xl text-center">
                  What is your companys information?
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                  <div className="space-y-4">
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        updateField("companyName", e.target.value)
                      }
                      placeholder="John Doe"
                    />
                    <Label htmlFor="companyName">Full Name</Label>
                  </div>
                  <div className="space-y-4">
                    <Field className="w-full">
                      <Select
                        items={items}
                        onValueChange={(value) =>
                          typeof value === "string" &&
                          updateField("documentType", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {items.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FieldLabel>Fruits</FieldLabel>
                    </Field>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                  <div className="space-y-4">
                    <Field className="w-full">
                      <Select
                        items={items}
                        onValueChange={(value) =>
                          typeof value === "string" &&
                          updateField("state", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            {items.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FieldLabel>Fruits</FieldLabel>
                    </Field>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      placeholder="MM/DD/YY"
                    />
                    <Label htmlFor="date">Date</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input
                    id="ein"
                    value={formData.ein}
                    onChange={(e) => updateField("ein", e.target.value)}
                    placeholder="Enter EIN"
                  />
                  <Label htmlFor="ein">EIN</Label>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <h4 className="font-semibold text-2xl text-center">
                  What is your company doing?
                </h4>
                <div className="space-y-4">
                  <Field className="w-full">
                    <Select
                      items={items}
                      onValueChange={(value) =>
                        typeof value === "string" &&
                        updateField("businessCategory", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Business Categories</SelectLabel>
                          {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FieldLabel>Fruits</FieldLabel>
                  </Field>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {currentStep === 3 && (
              <div className="space-y-6 bg-gray-100/40 p-5 rounded-xl">
                <h4 className="font-semibold text-2xl text-center">
                  Witness information
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                  <div className="space-y-4">
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      placeholder="Enter first name"
                    />
                    <Label htmlFor="firstName">First Name</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      placeholder="Enter last name"
                    />
                    <Label htmlFor="lastName">Last Name</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                    placeholder="000-0000-00"
                  />
                  <Label htmlFor="phoneNumber">Enter Phone Number</Label>
                </div>
                <div className="space-y-4">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="Enter email address"
                  />
                  <Label htmlFor="email">Email</Label>
                </div>
                <div className="space-y-4">
                  <Input
                    id="signature"
                    type="text"
                    value={formData.signature}
                    onChange={(e) => updateField("signature", e.target.value)}
                    placeholder="Enter signature address"
                    className=" border-2 border-black border-dashed text-center"
                  />
                  <Label htmlFor="signature">Signature</Label>
                </div>
                {/* <div className="space-y-4">
                <Input
                  id="signature"
                  type="file"
                  value={formData.signature}
                  onChange={(e) => updateField("signature", e.target.value)}
                  placeholder="Enter signature address"
                  className=" border-2 border-black border-dashed text-center"
                />
                <Label htmlFor="signature">EMAIL</Label>
              </div> */}
              </div>
            )}

            {/* STEP 4 */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h4 className="font-semibold text-2xl text-center">
                  Witness address
                </h4>
                <div className="space-y-4">
                  <Input
                    id="witnessAddress"
                    type="text"
                    value={formData.witnessAddress}
                    onChange={(e) =>
                      updateField("witnessAddress", e.target.value)
                    }
                    placeholder="Enter street address"
                  />
                  <Label htmlFor="witnessAddress">Stree address</Label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
                  <div className="space-y-4">
                    <Input
                      id="witnessState"
                      type="text"
                      value={formData.witnessState}
                      onChange={(e) =>
                        updateField("witnessState", e.target.value)
                      }
                      placeholder="Enter State"
                    />
                    <Label htmlFor="witnessState">State</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="witnessLGA"
                      type="text"
                      value={formData.witnessLGA}
                      onChange={(e) =>
                        updateField("witnessLGA", e.target.value)
                      }
                      placeholder="Enter LGA"
                    />
                    <Label htmlFor="witnessLGA">State/Province/region</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input
                    id="witnessCity"
                    type="text"
                    value={formData.witnessCity}
                    onChange={(e) => updateField("witnessCity", e.target.value)}
                    placeholder="City/Town/Village"
                  />
                  <Label htmlFor="witnessCity">City/Town/Village</Label>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {currentStep === 5 && (
              <div className="space-y-2">
                <div className="space-y-6 bg-gray-100/40 p-5 rounded-xl">
                  <h4 className="font-semibold text-2xl text-center">
                    Director Information
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8">
                    <div className="space-y-4">
                      <Input
                        id="directorFirstName"
                        type="text"
                        value={formData.directorFirstName}
                        onChange={(e) =>
                          updateField("directorFirstName", e.target.value)
                        }
                        placeholder="Enter first name"
                      />
                      <Label htmlFor="directorFirstName">First Name</Label>
                    </div>
                    <div className="space-y-4">
                      <Input
                        id="directorLastName"
                        type="text"
                        value={formData.directorLastName}
                        onChange={(e) =>
                          updateField("directorLastName", e.target.value)
                        }
                        placeholder="Enter last name"
                      />
                      <Label htmlFor="directorLastName">Last Name</Label>
                    </div>
                    <div className="space-y-4">
                      <Input
                        id="directorPercentage"
                        type="text"
                        value={formData.directorPercentage}
                        onChange={(e) =>
                          updateField("directorPercentage", e.target.value)
                        }
                        placeholder="54.25%"
                      />
                      <Label htmlFor="directorPercentage">
                        Owership percentage
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="directorTel"
                      type="tel"
                      value={formData.directorTel}
                      onChange={(e) =>
                        updateField("directorTel", e.target.value)
                      }
                      placeholder="000-0000-000"
                    />
                    <Label htmlFor="directorTel">Enter Phone Number</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="directorEmail"
                      type="email"
                      value={formData.directorEmail}
                      onChange={(e) =>
                        updateField("directorEmail", e.target.value)
                      }
                      placeholder="example@example.com"
                    />
                    <Label htmlFor="directorEmail">Email Address</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="directorSignature"
                      type="text"
                      value={formData.directorSignature}
                      onChange={(e) =>
                        updateField("directorSignature", e.target.value)
                      }
                      placeholder="Upload Signature "
                      className=" border-2 border-black border-dashed text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 ">
                  <Input
                    type="checkbox"
                    id="ownershipComfirmation"
                    checked={formData.ownershipComfirmation}
                    onChange={(e) =>
                      updateField("ownershipComfirmation", e.target.checked)
                    }
                    className=" w-4 p-0 m-0"
                  />
                  <Label htmlFor="ownershipComfirmation">
                    This is the owner of the company
                  </Label>
                </div>

                <div className="space-y">
                  <Input
                    id="anotherOwner"
                    type="text"
                    value={formData.anotherOwner}
                    onChange={(e) =>
                      updateField("anotherOwner", e.target.value)
                    }
                    placeholder="Add other owners"
                    className=" border-2 border-black border-dashed text-center"
                  />
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h4 className="font-semibold text-2xl text-center">
                  Director address
                </h4>
                <div className="space-y-4">
                  <Input
                    id="directorAddress"
                    type="text"
                    value={formData.directorAddress}
                    onChange={(e) =>
                      updateField("directorAddress", e.target.value)
                    }
                    placeholder="Enter street address"
                  />
                  <Label htmlFor="directorAddress">Stree address</Label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
                  <div className="space-y-4">
                    <Input
                      id="directorState"
                      type="text"
                      value={formData.directorState}
                      onChange={(e) =>
                        updateField("directorState", e.target.value)
                      }
                      placeholder="Enter State"
                    />
                    <Label htmlFor="directorState">State</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="directorLGA"
                      type="text"
                      value={formData.directorLGA}
                      onChange={(e) =>
                        updateField("directorLGA", e.target.value)
                      }
                      placeholder="Enter LGA"
                    />
                    <Label htmlFor="directorLGA">State/Province/region</Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input
                    id="directorCity"
                    type="text"
                    value={formData.directorCity}
                    onChange={(e) =>
                      updateField("directorCity", e.target.value)
                    }
                    placeholder="City/Town/Village"
                  />
                  <Label htmlFor="directorCity">City/Town/Village</Label>
                </div>

                <div className="space-y-4  ">
                  <Dialog open={idModal} onOpenChange={setIdModal}>
                    <DialogTrigger className="border-2 border-black border-dashed p-4 w-full rounded-4xl text-center">
                      IDN
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Means of identification</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Field className="w-full">
                          <Select
                            items={ID_Type}
                            value={formData.meansOfIdentification}
                            onValueChange={(value) =>
                              typeof value === "string" &&
                              updateField("meansOfIdentification", value)
                            }
                          >
                            <SelectTrigger className="w-full px-6 rounded-4xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {/* <SelectLabel>ID Type</SelectLabel> */}
                                {ID_Type.map((ID) => (
                                  <SelectItem key={ID.value} value={ID.value}>
                                    {ID.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {/* <FieldLabel>Fruits</FieldLabel> */}
                          {idErrors.meansOfIdentification && (
                            <p className="text-sm text-red-500 mt-1">
                              {idErrors.meansOfIdentification}
                            </p>
                          )}
                        </Field>

                        <Field>
                          <Input
                            id="identityNumber"
                            type="text"
                            value={formData.identityNumber}
                            onChange={(e) =>
                              updateField("identityNumber", e.target.value)
                            }
                            placeholder="Input your identity Number"
                          />
                          {idErrors.identityNumber && (
                            <p className="text-sm text-red-500 mt-1">
                              {idErrors.identityNumber}
                            </p>
                          )}
                        </Field>

                        <Field>
                          <Input
                            id="signature"
                            type="text"
                            value={formData.signature}
                            onChange={(e) =>
                              updateField("signature", e.target.value)
                            }
                            placeholder="Enter signature address"
                            className=" border-2 border-black border-dashed text-center"
                          />
                          {/* <Label htmlFor="signature">Signature</Label> */}
                          {idErrors.signature && (
                            <p className="text-sm text-red-500 mt-1">
                              {idErrors.signature}
                            </p>
                          )}
                        </Field>
                      </div>

                      <DialogFooter>
                        <Button
                          onClick={handleIdDone}
                          className="bg-green-500 hover:bg-green-600 text-white w-full"
                        >
                          Done
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/* <Input
                  id="directorCity"
                  type="text"
                  value={formData.directorCity}
                  onChange={(e) => updateField("directorCity", e.target.value)}
                  placeholder="City/Town/Village"
                />
                <Label htmlFor="directorCity">City/Town/Village</Label> */}
                </div>
              </div>
            )}

            {/* STEP 7 */}
            {currentStep === 7 && (
              <div className="space-y-2">
                <div className="space-y-6 bg-gray-100/40 p-5 rounded-xl">
                  <h4 className="font-semibold text-2xl text-center">
                    Shareholder&apos;s Information
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8">
                    <div className="space-y-4">
                      <Input
                        id="shareHolderFirstName"
                        type="text"
                        value={formData.shareHolderFirstName}
                        onChange={(e) =>
                          updateField("shareHolderFirstName", e.target.value)
                        }
                        placeholder="Enter first name"
                      />
                      <Label htmlFor="shareHolderFirstName">First Name</Label>
                    </div>
                    <div className="space-y-4">
                      <Input
                        id="shareHolderLastName"
                        type="text"
                        value={formData.shareHolderLastName}
                        onChange={(e) =>
                          updateField("shareHolderLastName", e.target.value)
                        }
                        placeholder="Enter last name"
                      />
                      <Label htmlFor="shareHolderLastName">Last Name</Label>
                    </div>
                    <div className="space-y-4">
                      <Input
                        id="shareHolderPercentage"
                        type="text"
                        value={formData.shareHolderPercentage}
                        onChange={(e) =>
                          updateField("shareHolderPercentage", e.target.value)
                        }
                        placeholder="54.25%"
                      />
                      <Label htmlFor="shareHolderPercentage">
                        Shareholder&apos;s percentage
                      </Label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="shareHolderTel"
                      type="tel"
                      value={formData.shareHolderTel}
                      onChange={(e) =>
                        updateField("shareHolderTel", e.target.value)
                      }
                      placeholder="000-0000-000"
                    />
                    <Label htmlFor="shareHolderTel">Enter Phone Number</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="shareHolderEmail"
                      type="email"
                      value={formData.shareHolderEmail}
                      onChange={(e) =>
                        updateField("shareHolderEmail", e.target.value)
                      }
                      placeholder="example@example.com"
                    />
                    <Label htmlFor="shareHolderEmail">Email Address</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="shareHolderSignature"
                      type="text"
                      value={formData.shareHolderSignature}
                      onChange={(e) =>
                        updateField("shareHolderSignature", e.target.value)
                      }
                      placeholder="Upload Signature "
                      className=" border-2 border-black border-dashed text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 ">
                  <Input
                    type="checkbox"
                    id="shareHolderComfirmation"
                    checked={formData.shareHolderComfirmation}
                    onChange={(e) =>
                      updateField("shareHolderComfirmation", e.target.checked)
                    }
                    className=" w-4 p-0 m-0"
                  />
                  <Label htmlFor="shareHolderComfirmation">
                    This is the owner of the company
                  </Label>
                </div>

                <div className="space-y">
                  <Input
                    id="anotherShareHolder"
                    type="text"
                    value={formData.anotherShareHolder}
                    onChange={(e) =>
                      updateField("anotherShareHolder", e.target.value)
                    }
                    placeholder="Add other shareHoldes"
                    className=" border-2 border-black border-dashed text-center"
                  />
                </div>
              </div>
            )}

            {/* STEP 8 */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <h4 className="font-semibold text-2xl text-center">
                  ShareHolder address
                </h4>
                <div className="space-y-4">
                  <Input
                    id="shareHolderAddress"
                    type="text"
                    value={formData.shareHolderAddress}
                    onChange={(e) =>
                      updateField("shareHolderAddress", e.target.value)
                    }
                    placeholder="Enter street address"
                  />
                  <Label htmlFor="shareHolderAddress">Stree address</Label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-8">
                  <div className="space-y-4">
                    <Input
                      id="shareHolderState"
                      type="text"
                      value={formData.shareHolderState}
                      onChange={(e) =>
                        updateField("shareHolderState", e.target.value)
                      }
                      placeholder="Enter State"
                    />
                    <Label htmlFor="shareHolderState">State</Label>
                  </div>
                  <div className="space-y-4">
                    <Input
                      id="shareHolderLGA"
                      type="text"
                      value={formData.shareHolderLGA}
                      onChange={(e) =>
                        updateField("shareHolderLGA", e.target.value)
                      }
                      placeholder="Enter LGA"
                    />
                    <Label htmlFor="shareHolderLGA">
                      State/Province/region
                    </Label>
                  </div>
                </div>
                <div className="space-y-4">
                  <Input
                    id="shareHolderCity"
                    type="text"
                    value={formData.shareHolderCity}
                    onChange={(e) =>
                      updateField("shareHolderCity", e.target.value)
                    }
                    placeholder="City/Town/Village"
                  />
                  <Label htmlFor="shareHolderCity">City/Town/Village</Label>
                </div>

                <div className="space-y-4  ">
                  <Dialog open={idModal} onOpenChange={setIdModal}>
                    <DialogTrigger className="border-2 border-black border-dashed p-4 w-full rounded-4xl text-center">
                      IDN
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Means of identification</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Field className="w-full">
                          <Select
                            items={shareHolder_ID_Type}
                            value={formData.meansOfIdentification}
                            onValueChange={(value) =>
                              typeof value === "string" &&
                              updateField("meansOfIdentification", value)
                            }
                          >
                            <SelectTrigger className="w-full px-6 rounded-4xl">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {/* <SelectLabel>ID Type</SelectLabel> */}
                                {shareHolder_ID_Type.map((ID) => (
                                  <SelectItem key={ID.value} value={ID.value}>
                                    {ID.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {/* <FieldLabel>Fruits</FieldLabel> */}
                          {idErrors.meansOfIdentification && (
                            <p className="text-sm text-red-500 mt-1">
                              {idErrors.meansOfIdentification}
                            </p>
                          )}
                        </Field>

                        <Field>
                          <Input
                            id="identityNumber"
                            type="text"
                            value={formData.identityNumber}
                            onChange={(e) =>
                              updateField("identityNumber", e.target.value)
                            }
                            placeholder="Input your identity Number"
                          />
                          {idErrors.identityNumber && (
                            <p className="text-sm text-red-500 mt-1">
                              {idErrors.identityNumber}
                            </p>
                          )}
                        </Field>

                        <Field>
                          <Input
                            id="signature"
                            type="text"
                            value={formData.signature}
                            onChange={(e) =>
                              updateField("signature", e.target.value)
                            }
                            placeholder="Enter signature address"
                            className=" border-2 border-black border-dashed text-center"
                          />
                          {/* <Label htmlFor="signature">Signature</Label> */}
                          {idErrors.signature && (
                            <p className="text-sm text-red-500 mt-1">
                              {idErrors.signature}
                            </p>
                          )}
                        </Field>
                      </div>

                      <DialogFooter>
                        <Button
                          onClick={handleIdDone}
                          className="bg-green-500 hover:bg-green-600 text-white w-full"
                        >
                          Done
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  {/* <Input
                  id="directorCity"
                  type="text"
                  value={formData.directorCity}
                  onChange={(e) => updateField("directorCity", e.target.value)}
                  placeholder="City/Town/Village"
                />
                <Label htmlFor="directorCity">City/Town/Village</Label> */}
                </div>
              </div>
            )}

            {/* STEP 9 */}
            {currentStep === 9 && (
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      updateField("termsAccepted", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 shrink-0"
                  />
                  <Label htmlFor="terms">
                    {" "}
                    I accept the terms and conditions
                  </Label>
                </div>
              </div>
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

              {currentStep < 9 ? (
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
        </DialogContent>
      </Dialog>

      <Dialog open={isSubmitting}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Loader2 className="mb-4 h-10 w-10 animate-spin" />

            <h2 className="text-lg font-semibold">Submitting...</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Please wait while we process your information.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// function GetStartedModal({ children }: { children: ReactElement }) {
//   return (
//     <Dialog>
//       <DialogTrigger render={children} />
//       <DialogContent className="sm:max-w-2xl lg:max-w-3xl px-8 py-6 lg:px-16 lg:py-8">
//         <DialogHeader>
//           <DialogTitle>Get started</DialogTitle>
//           <DialogDescription>
//             Provide your company details to access our services.
//           </DialogDescription>
//         </DialogHeader>
//         <GetStartedForm />
//       </DialogContent>
//     </Dialog>
//  );
// }

export default GetStartedModal;

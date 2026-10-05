"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Lightbulb,
  Loader2,
} from "lucide-react";

// types for selecting business plain (GET)
export type BusinessPlanItem = {
  id: string;
  name: string;
  description: string;
  total_price: string;
  formation_price: string;
  servicePrice: string;
  service: BusinessPlanService[];
};
type BusinessPlanService = {
  id: string;
  title: string;
};

// types to display business summary (GET)
type BusinessSummary = {
  id: string;
  name: string;
  sort_order: string;
  business: Business;
};

type Business = {
  id: string;
  name: string;
  entity_type: string;
  state: string;
  citizenship: string;
  state_fee: string;
};

// types for payment gatway (GET)
export type PaymentGateway = {
  id: string;
  name: string;
};

// types for props
type BusinessPlanProps = {
  businessPlanType?: BusinessPlanItem[];
  paymentGatewayMethod?: PaymentGateway[];
  businessId?: string;
};

// type for postig order details to database
type OrderResult = {
  id: string;
  total: string;
  formattedTotal: string;
};

// progress bar for wizard form state
function StepProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="mb-6 flex max-w-6xl mx-auto w-full items-center justify-between gap-1 overflow-x-auto pb-1 sm:gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="flex items-center flex-1">
            <div
              className={`h-1 flex-1 rounded-full transition-colors ${
                stepNumber < currentStep
                  ? "bg-green-600"
                  : isCurrent
                    ? "bg-blue-600"
                    : "bg-gray-200"
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function BusinessPlan({
  businessPlanType = [],
  paymentGatewayMethod = [],
  businessId,
}: BusinessPlanProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [summaryData, setSummaryData] = useState<BusinessSummary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [order, setOrder] = useState<OrderResult | null>(null);
  // const [confirmingOrder, setConfirmingOrder] = useState(false);

  // Validate step progress conditions
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return selectedPlan.trim() !== "";
      case 2:
        return termsAgreed;
      case 3:
        return selectedGateway.trim() !== "";
      default:
        return false;
    }
  };

  const fetchSummary = async (planId: string, businessId: string) => {
    setLoadingSummary(true);
    try {
      const response = await fetch(
        `/api/orderSummary?businessId=${businessId}&planId=${planId}`,
      );
      if (response.ok) {
        const data = await response.json();
        // console.log("Order summary: ", data?.data ?? data);
        setSummaryData(data?.data ?? data);
      } else {
        console.error("Failed fetching summary:", await response.text());
        return false;
      }
      return true;
    } catch (err) {
      console.error("Failed fetching summary:", err);
      return false;
    } finally {
      setLoadingSummary(false);
    }
  };
  const handleNext = async () => {
    if (currentStep === 1 && selectedPlan) {
      if (!businessId) {
        console.error("Cannot fetch order summary without a business ID.");
        return;
      }

      const summaryFetched = await fetchSummary(selectedPlan, businessId);
      if (summaryFetched) setCurrentStep(2);
    } else if (currentStep === 2 && termsAgreed) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(3)) return;

    setIsSubmitting(true);
    try {
      // submiting order and type of payment gateway post

      const confirmRes = await fetch("/api/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: businessId,
          plan_id: selectedPlan,
          payment_gateway_id: selectedGateway,
        }),
      });
      const confirmData = await confirmRes.json();
      if (!confirmRes.ok) {
        console.error("Failed to confirm order:", confirmData);
        return;
      }
      const orderData = confirmData?.data?.order;

      if (!orderData?.id) {
        console.error("Order response is missing a valid ID:", confirmData);
        return;
      }
      // setOrderId(newOrderId);
      const confirmedOrder: OrderResult = {
        id: confirmData?.data?.order?.id,
        total: confirmData?.data?.order?.total,
        formattedTotal: confirmData?.data?.order?.formatted_total,
      };
      setOrder(confirmedOrder);

      // initiate payment
      const payRes = await fetch("/api/order-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gateway_id: selectedGateway,
          order_id: confirmedOrder.id,
        }),
      });

      const payData = await payRes.json();
      const paymentUrl =
        payData?.data?.payment_url ??
        payData?.payment_url ??
        payData?.checkout_url;
      if (payRes.ok && paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("Payment initiation failed:", payData);
      }
    } catch (error) {
      console.error("Checkout initialization failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid place-items-center pt-8  px-4">
      <StepProgressBar currentStep={currentStep} totalSteps={3} />

      <form onSubmit={handleSubmitPayment} className="w-full space-y-6">
        {/* STEP 1: SELECT SUBSCRIPTION PLAN */}
        {currentStep === 1 && (
          <div className="max-w-6xl mx-auto">
            <div className="my-4 text-center">
              <h3 className="font-bold text-3xl">
                Choose your subscription plan
              </h3>
              <p className="text-gray-600">
                Select the plan that works best for your business.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
              {businessPlanType.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const isGrowthPlan = plan.name.toLowerCase() === "growth";

                return (
                  <Card
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-6 cursor-pointer border-2 transition-all flex flex-col justify-between bg-primary ${
                      isSelected ? "border-white " : "border-gray-200"
                    } ${isGrowthPlan ? "bg-blue-card text-white" : ""}`}
                  >
                    <div>
                      <h4 className="text-xl font-bold">{plan.name}</h4>
                      <p
                        className={`text-sm mb-4 ${
                          isGrowthPlan ? "text-gray-50/70" : "text-light-black"
                        }`}
                      >
                        {plan.description}
                      </p>
                      <p className="text-3xl font-bold mb-4">
                        {plan.total_price}{" "}
                        <span className="text-xs font-normal">/ mo</span>
                      </p>
                    </div>
                    <Button
                      type="button"
                      className={`mt-2 w-full rounded-4xl ${
                        isSelected
                          ? "bg-primary hover:bg-gray-500 text-black border-gray-200"
                          : " border-gray-200 text-black hover:bg-gray-200"
                      }`}
                    >
                      {isSelected ? "Selected" : plan.name}
                    </Button>
                    <div>
                      <ul className="space-y-4 text-sm">
                        {plan.service?.map((s) => (
                          <li key={s.id}>✓ {s.title}</li>
                        ))}
                        <li>
                          <h3>
                            <span>✓</span> {""}LLC filed in 1–2 business days
                          </h3>
                          <p className={`pl-4 text-light-black`}>
                            Articles of organization + operating agreement
                            included
                          </p>
                        </li>
                        <li>
                          <h3>
                            <span>✓</span> {""}LLC filed in 1–2 business days
                          </h3>
                          <p className={`pl-4 text-light-black`}>
                            Articles of organization + operating agreement
                            included
                          </p>
                        </li>
                        <li>
                          <h3>
                            <span>✓</span> {""}LLC filed in 1–2 business days
                          </h3>
                          <p className={`pl-4 text-light-black`}>
                            Articles of organization + operating agreement
                            included
                          </p>
                        </li>
                        <li>
                          <h3>
                            <span>✓</span> {""}LLC filed in 1–2 business days
                          </h3>
                          <p className={`pl-4 text-light-black`}>
                            Articles of organization + operating agreement
                            included
                          </p>
                        </li>
                      </ul>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: OVERVIEW & TERMS */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h4 className="font-bold text-2xl text-center">
              Review Order Summary
            </h4>
            {loadingSummary ? (
              <div className="flex justify-center p-12">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
              </div>
            ) : (
              summaryData && (
                <div className=" p-6 space-y-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    {/* box1 */}
                    <div className="flex-1  bg-blue-100/80  p-8 rounded-[32px] font-normal text-base leading-7 text-black space-y-2">
                      <h2 className="font-bold text-2xl mb-5 capitalize">
                        Company
                      </h2>
                      <div className="flex justify-between gap-16 pb-2">
                        <span>Business Name:</span>
                        <span>{summaryData.business?.name}</span>
                      </div>
                      <div className="flex justify-between gap-16 pb-2">
                        <span>Entity Type:</span>
                        <span>{summaryData.business?.entity_type}</span>
                      </div>
                      <div className="flex justify-between gap-16 pb-2">
                        <span>State:</span>
                        <span>{summaryData.business?.state}</span>
                      </div>
                      <div className="flex justify-between gap-16 pb-2">
                        <span>Package Total:</span>
                        {/* <span className="font-bold">{summaryData.formatted}</span> */}
                      </div>
                    </div>
                    {/* box2 */}
                    <div className="flex-1 space-y-6 ">
                      <div className=" bg-gray-200/40  p-8 rounded-[32px] font-normal text-base leading-7 text-black space-y-2">
                        <h2 className="font-bold text-2xl mb-5 capitalize">
                          Subscription
                        </h2>
                        <div className="flex justify-between gap-16 pb-2">
                          <span>Package Plan</span>
                          <span>{summaryData.name}</span>
                        </div>
                        <div className="flex justify-between gap-16 pb-2">
                          <span>Price</span>
                          <span>{summaryData.business?.entity_type}</span>
                        </div>
                        <div className="flex justify-between gap-16 pb-2">
                          <span>Billing</span>
                          <span>{summaryData.business?.state}</span>
                        </div>
                        {/* <div className="flex justify-between gap-16 pb-2">
                        <span>Package Total:</span>
                        <span className="font-bold">{summaryData.formatted}</span>
                      </div> */}
                      </div>
                      <div className=" hidden pt-4 lg:flex items-center gap-2 ">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={termsAgreed}
                          onChange={(e) => setTermsAgreed(e.target.checked)}
                          className="h-4 w-4"
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm cursor-pointer"
                        >
                          I agree to the Terms and Conditions and confirm
                          details above are accurate.
                        </label>
                      </div>
                    </div>
                    {/* box3 */}
                    <div className="flex-1 space-y-6">
                      <div className="bg-blue-100/80  p-8 rounded-[32px] font-normal text-base leading-7 text-black space-y-2">
                        <h2 className="font-bold text-2xl mb-5 capitalize">
                          your plan
                        </h2>
                        <div className="flex justify-between gap-16 pb-2">
                          <span>Tax and Compliance</span>
                          <span>{summaryData.business?.name}</span>
                        </div>
                        <div className="flex justify-between gap-16 pb-2">
                          <span>State Fee</span>
                          <span>{summaryData.business?.state_fee}</span>
                        </div>
                        <div className="flex justify-between gap-16 pb-2">
                          <span>Discount (20%)</span>
                          <span>{summaryData.business?.state}</span>
                        </div>
                      </div>
                      <div className="bg-gray-200/40  p-8 rounded-[32px] font-normal text-base leading-7 text-black ">
                        <span>
                          <Lightbulb className="text-blue-500 mb-6" />
                        </span>
                        <p>
                          {
                            "After confirming, we'll gather additional details about your company, such as company members, registered address, ownership breakdown, and more."
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-2 lg:hidden">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm cursor-pointer mt-2"
                    >
                      I agree to the Terms and Conditions and confirm details
                      above are accurate.
                    </label>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* STEP 3: PAYMENT GATEWAY SELECTION */}
        {currentStep === 3 && (
          <Card className="p-6 max-w-xl mx-auto">
            <h4 className="font-bold text-2xl text-center mb-4">
              Select Payment Gateway
            </h4>
            <div className="space-y-3">
              {paymentGatewayMethod.map((gateway) => (
                <label
                  key={gateway.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-blue-card ${
                    selectedGateway === gateway.id
                      ? " bg-blue-card text-white border-blue-card"
                      : "border-gray-200"
                  }`}
                >
                  <span className="font-medium">{gateway.name}</span>
                  <input
                    type="radio"
                    name="gateway"
                    value={gateway.id}
                    checked={selectedGateway === gateway.id}
                    onChange={(e) => setSelectedGateway(e.target.value)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </Card>
        )}

        {/* CONTROLS */}
        <div className="flex justify-between pt-6 mb-6 max-w-6xl mx-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeftFromLine className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
            >
              Next
              <ArrowRightFromLine className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isStepValid(3) || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Processing..." : "Complete Order"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

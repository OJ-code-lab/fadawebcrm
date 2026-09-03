"use client";

import { Pencil } from "lucide-react";
import { Lightbulb } from "lucide-react";

interface ReviewDetailsProps {
  businessName?: string;
  entityType?: string;
  state?: string;
  plan?: string;
  price?: string;
  billing?: string;
  onEditCompany?: () => void;
  onEditSubscription?: () => void;
  onConfirmChange?: (confirmed: boolean) => void;
}

export default function ReviewDetails({
  entityType = "LLC",
  state = "California",
  plan = "Tax Compliance",
  price = "$1,990.00",
  billing = "Annual",
  onEditCompany,
  onEditSubscription,
  onConfirmChange,
}: ReviewDetailsProps) {
  return (
    <div className="relative left-1/2 w-[calc(100vw-2rem)] max-w-346 -translate-x-1/2">
      {/* Step heading */}
      <div className="text-center">
        <p className="text-sm text-[#000000] font-normal">Step 4: Plan</p>

        <h1 className="mt-3 text-[36px] font-bold tracking-tight text-[#000000]">
          Review your details
        </h1>

        <p className="mx-auto mt-3 max-w-615 text-sm leading-6 text-[#6D717F] font-normal sm:text-base">
          You&apos;ll be able to change your company name after payment.
        </p>
      </div>

      {/* Review cards */}
      <div className="mt-7 mx-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Company */}
        <section className="rounded-[32px] bg-[#EFF6FF] p-6 sm:p-7 lg:h-[70%] shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#000000] lg:text-[24px]">
              Company
            </h2>
          </div>

          <div className="mt-7 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Preferred name
              </span>

              <span className="text-sm text-[#000000] lg:text-[18px] font-normal">
                Febtem
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Entity Type
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                {entityType}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                State
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                {state}
              </span>
            </div>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={onEditCompany}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-[#111827]
                shadow-sm
                transition
                hover:bg-gray-50
              "
            >
              Edit
              <Pencil size={16} strokeWidth={2} />
            </button>
          </div>
        </section>

        {/* Subscription */}
        <section className="rounded-[32px] shadow bg-[#F3F4F6] p-6 sm:p-7 lg:h-[70%]">
          <h2 className="text-lg font-bold text-[#000000] lg:text-[24px]">
            Subscription
          </h2>

          <div className="mt-7 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Package
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                {plan}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Price
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                {price}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Billing
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                {billing}
              </span>
            </div>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="button"
              onClick={onEditSubscription}
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-[#111827]
                shadow-sm
                transition
                hover:bg-gray-50
              "
            >
              Edit
              <Pencil size={16} strokeWidth={2} />
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-2">
          {/* Your Plan */}
          <section className="rounded-[32px] bg-[#eef4ff] shadow p-6 sm:p-7 lg:h-[70%]">
            <h2 className="text-lg font-bold text-[#000000] lg:text-[24px]">
              Your Plan
            </h2>

            <div className="mt-7 space-y-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                  Tax and Compliance
                </span>

                <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                  $1990.00
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                  State Fee
                </span>

                <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                  $170.00
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#2563EB] sm:text-base lg:text-[18px] font-normal">
                  Discount (20%)
                </span>

                <span className="text-right text-sm text-[#2563EB] sm:text-base lg:text-[18px] font-normal">
                  -$399.80
                </span>
              </div>
            </div>
          </section>

          {/* Note */}
          <section className="rounded-[32px] shadow bg-[#F3F4F6] p-6 lg:col-span-1 lg:h-[80%] mt-3">
            <Lightbulb color="#1455D9" />
            <p className="text-xs leading-6 text-[#000000] lg:text-[16px] font-normal mt-2">
              After confirming, we&apos;ll gather additional details about your
              company, such as company members, registered address, ownership
              breakdown, and more.
            </p>
          </section>
        </div>

        {/* State Fee */}
        <section className="rounded-[32px] shadow bg-[#f3f3f5] p-6 sm:p-7 lg:mt-[-30%] lg:h-[167%]">
          <h2 className="text-lg font-bold text-[#000000] text-[24px]">
            State Fee
          </h2>

          <div className="mt-7 space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                State
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                {state}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Price
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                $70.00
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                Billing
              </span>

              <span className="text-right text-sm text-[#000000] sm:text-base lg:text-[18px] font-normal">
                One-time
              </span>
            </div>
          </div>

          <div className="mt-7 flex justify-end">
            <button
              type="button"
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-6
                py-3
                text-sm
                font-medium
                text-[#111827]
                shadow-sm
              "
            >
              Edit
              <Pencil size={16} strokeWidth={2} />
            </button>
          </div>
        </section>

        <div className="flex flex-col gap-4 lg:mt-[-30%]">
          {/* Confirmation */}
          <section className="rounded-[32px] shadow bg-[#eef4ff] p-3 px-5 lg:col-span-1 lg:h-[25%]">
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                onChange={(event) => onConfirmChange?.(event.target.checked)}
                className="
                mt-1
                h-4
                w-4
                shrink-0
                accent-blue-600
              "
              />

              <span className="text-sm leading-6 text-[#000000] lg:text-[12px] font-normal">
                By checking the box, I confirm the accuracy of the provided
                information.
              </span>
            </label>
          </section>

          {/* Notification */}
          <section className="rounded-[32px] shadow bg-[#FFD88A] p-6 lg:col-span-1 lg:h-[70%]">
            <p className="text-xs leading-6 text-[#000000] lg:text-[12px] font-normal">
              <strong>Note:</strong> Companies formed in California in 2024 or
              later must pay a minimum $800 tax to the California Franchise Tax
              Board each year. For more information, click here for Corporations
              or here for LLCs. Within 90 days of formation, California requires
              a $20 fee for the “Statement of Information”; we&apos;ve included
              this extra fee in the state fee.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

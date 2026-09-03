"use client";

import { useState } from "react";
import { Info, LockKeyhole } from "lucide-react";

interface Step5CProps {
  onBack?: () => void;
}

export default function Step5C({ onBack }: Step5CProps) {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [cardType, setCardType] = useState<"mastercard" | "visa" | "amex">(
    "mastercard",
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmOrder = () => {
    setIsSubmitting(true);

    // Payment processing will be connected later.
    console.log({
      cardType,
      cardholderName,
      cardNumber,
      expiryDate,
      cvv,
    });
  };

  return (
    <div className="w-full">
      {/* =========================
          HEADING
          ========================= */}
      <div className="text-center">
        <p className="text-xs text-[#000000] font-normal text-[14px] sm:text-sm">
          Step 4: Plan
        </p>

        <h1
          className="
            mx-auto
            mt-3
            max-w-125
            text-[36px]            
            font-bold
            leading-tight
            tracking-tight
            text-[#111827]
            sm:text-3xl
          "
        >
          From dreamer to Do&apos;er —
          <br />
          Make it official!
        </h1>

        <p
          className="
            mx-auto
            mt-3
            max-w-110
            text-[18px]
            text-sm
            leading-6
            text-[#6D717F]
            sm:text-base
          "
        >
          Get your EIN, US Bank Account, US Business Address, Registered Agent
          Services, and more.
        </p>
      </div>

      {/* =========================
          MAIN CONTENT
          ========================= */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-8
          lg:grid-cols-[1fr_1fr]
          lg:items-center
          lg:w-[70%]
          mx-auto
        "
      >
        {/* =========================
            SUMMARY
            ========================= */}
        <section className="w-full">
          <h2 className="text-[24px] font-bold text-[#071A33]">Summary</h2>

          <div className="mt-3 h-px w-full bg-gray-300" />

          <div className="mt-6 space-y-5">
            {/* Tax and Compliance */}
            <div className="flex items-center justify-between gap-4">
              <span className=" text-[#000000] text-base sm:text-base">
                Tax and Compliance
              </span>

              <span className="text-[19px] font-semibold text-[#000000] sm:text-base">
                $1990.00
              </span>
            </div>

            {/* LLC Formation */}
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#000000] text-base sm:text-base">
                LLC Formation
              </span>

              <span className="text-[19px] font-semibold text-[#000000] sm:text-base">
                $100.00
              </span>
            </div>

            {/* Discount */}
            <div className="rounded-[16px] bg-[#EFF6FF] px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#6D717F] text[12px]">
                    20% Off - Annual Premium Plans
                  </p>

                  <p className="mt-2 text-xs text-gray-400">20% off a year</p>
                </div>

                <span className="text-sm font-medium text-[#111827]">
                  $100.00
                </span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-7 h-px w-full bg-gray-300" />

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-[#111827]">
              Total due for today
            </span>

            <span className="text-lg font-semibold text-[#000000] text-[19px]">
              $2100.20
            </span>
          </div>
        </section>

        {/* =========================
            PAYMENT METHOD
            ========================= */}
        <section
          className="
            w-full
            rounded-[20px]
            border
            border-gray-300
            bg-transparent
            p-5
            sm:p-6
          "
        >
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] font-semibold text-[#334155]">
              Payment method
            </h2>
          </div>

          {/* Card brands */}
          <div className="mt-5 flex items-center gap-2">
            {/* Mastercard */}
            <button
              type="button"
              onClick={() => setCardType("mastercard")}
              className={`
                relative
                flex
                h-9
                w-14
                items-center
                justify-center
                rounded-md
                border
                bg-white
                transition
                ${
                  cardType === "mastercard"
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-200"
                }
              `}
            >
              <div className="flex items-center">
                <span className="h-4 w-4 rounded-full bg-red-500" />
                <span className="-ml-2 h-4 w-4 rounded-full bg-orange-400" />
              </div>

              {cardType === "mastercard" && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[9px] text-white">
                  ✓
                </span>
              )}
            </button>

            {/* Visa */}
            <button
              type="button"
              onClick={() => setCardType("visa")}
              className={`
                flex
                h-9
                w-14
                items-center
                justify-center
                rounded-md
                border
                bg-white
                text-xs
                font-bold
                text-blue-700
                ${
                  cardType === "visa"
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-200"
                }
              `}
            >
              VISA
            </button>

            {/* Amex */}
            <button
              type="button"
              onClick={() => setCardType("amex")}
              className={`
                flex
                h-9
                w-14
                items-center
                justify-center
                rounded-md
                border
                bg-white
                text-[10px]
                font-semibold
                text-blue-500
                ${
                  cardType === "amex"
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-200"
                }
              `}
            >
              AMEX
            </button>
          </div>

          {/* Cardholder */}
          <div className="mt-5">
            <label
              htmlFor="cardholder"
              className="mb-1 block text-[14px] font-semibold text-[#334155]"
            >
              Cardholder name
            </label>

            <input
              id="cardholder"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="Simon Petrikov"
              className="
                h-11
                w-full
                rounded-md
                border
                border-gray-200
                bg-white
                px-3
                text-[14px]
                text-[#111827]
                outline-none
                placeholder:text-gray-400
                focus:border-blue-500
                focus:ring-1
                focus:ring-blue-500
              "
            />
          </div>
          <div className="grid w-full lg:grid-cols-[2fr_1fr_1fr] gap-3">
            {/* Card number */}
            <div className="mt-4 min-w-0">
              <label
                htmlFor="card-number"
                className="block text-[14px] font-semibold text-[#334155]"
              >
                Card number
              </label>
              <input
                id="card-number"
                type="text"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5874 2585 2496"
                className="
                  mt-1
                  h-11
                  w-full
                  rounded-md
                  border
                  border-gray-200
                  bg-white
                  px-3
                  text-[14px]
                  text-[#000000]
                  outline-none
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              />
            </div>

            {/* Expiry */}
            <div className="mt-4 min-w-0">
              <label
                htmlFor="expiry"
                className="block text-[14px] font-semibold text-[#334155]"
              >
                Date
              </label>

              <input
                id="expiry"
                type="text"
                inputMode="numeric"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="10/25"
                className="
                  mt-1
                  h-11
                  w-full
                  rounded-md
                  border
                  border-gray-200
                  px-3
                  text-[14px]
                  outline-none
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                  bg-white
                "
              />
            </div>

            {/* CCV */}
            <div className="mt-4 min-w-0">
              <label
                htmlFor="cvv"
                className=" block text-[14px] font-semibold text-[#334155]"
              >
                CCV
              </label>

              <input
                id="cvv"
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="000"
                className="
                  mt-1
                  h-11
                  w-full
                  rounded-md
                  border
                  border-gray-200
                  px-3
                  text-[14px]
                  outline-none
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                  bg-white
                "
              />
            </div>
          </div>

          {/* Information */}
          <div className="mt-4 flex items-start gap-2">
            <Info size={14} className="mt-0.5 shrink-0 text-blue-500" />

            <p className="text-[11px] leading-5 text-gray-500">
              Credit Card payments may take up to 24h to be processed
            </p>
          </div>

          {/* Confirm */}
          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="
              mt-5
              flex
              h-11
              w-full
              items-center
              justify-center
              gap-2
              rounded-full
              bg-[#a3a7b3]
              px-5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#9499a6]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <LockKeyhole size={14} />

            {isSubmitting ? "Processing..." : "Confirm your order"}
          </button>

          {/* Terms */}
          <p className="mt-3 text-[10px] leading-4 text-gray-400">
            By subscribing, you authorize doola to charge you according to the
            terms until you cancel.
          </p>
        </section>
      </div>

      {/* =========================
          MOBILE BACK
          ========================= */}
      {/* {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="
            mt-7
            text-sm
            font-medium
            text-[#111827]
            lg:hidden
          "
        >
          ← Back
        </button>
      )} */}
    </div>
  );
}

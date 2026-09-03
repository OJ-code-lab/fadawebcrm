"use client";

interface Plan {
  id: "free" | "plus" | "pro";
  name: string;
  description: string;
  price: string;
  buttonText: string;
  features: {
    title: string;
    description: string;
  }[];
}

interface Step5PlansProps {
  selectedPlan: "free" | "plus" | "pro" | null;
  onSelectPlan: (plan: "free" | "plus" | "pro") => void;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description:
      "For first-time founders who need the basics to launch with confidence.",
    price: "$250",
    buttonText: "Use Qanun for free",
    features: [
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
    ],
  },

  {
    id: "plus",
    name: "Plus",
    description: "Stay 100% compliant with tax, legal, and regulatory rules.",
    price: "$3000",
    buttonText: "Get plus plan",
    features: [
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
    ],
  },

  {
    id: "pro",
    name: "Pro",
    description:
      "For founders who want full legal + compliance, plus a dedicated bookkeeper.",
    price: "$3500",
    buttonText: "Use Qanun for free",
    features: [
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
      {
        title: "LLC filed in 1–2 business days",
        description: "Articles of organization + operating agreement included",
      },
    ],
  },
];

export default function Step5Plans({
  selectedPlan,
  onSelectPlan,
}: Step5PlansProps) {
  return (
    <section className="relative left-1/2 w-[calc(100vw-2rem)] max-w-[1200px] -translate-x-1/2">
      {/* Step heading */}
      <div className="text-center">
        <p className="text-xs font-normal text-[#111827] sm:text-sm">
          Step 5: Your Plan
        </p>

        <h2 className="mt-4 text-2xl font-bold tracking-[-0.03em] text-[#111827] sm:text-[28px]">
          Let&apos;s make it official.
        </h2>

        <p className="mx-auto mt-2 max-w-125 text-sm leading-6 text-[#6B7280] sm:text-base">
          Get your EIN, US Bank Account, US Business Address,
          <br className="hidden sm:block" />
          Registered Agent Services, and more.
        </p>
      </div>

      {/* Plans */}
      <div
        className="
          mt-8
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          lg:grid-cols-3
          lg:gap-6
          lg:items-stretch
        "
      >
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isPlus = plan.id === "plus";

          return (
            <div
              key={plan.id}
              className={`
                relative
                flex
                flex-col
                overflow-hidden
                rounded-[10px]
                border
                p-5
                transition-all
                duration-200
                sm:p-6
                ${
                  isSelected || isPlus ? "border-[#0047AB]" : "border-[#E5E7EB]"
                }
                ${
                  isPlus ? "bg-[#0047AB] text-white" : "bg-white text-[#202938]"
                }
              `}
            >
              {/* Plan name */}
              <h3 className="text-xl font-semibold sm:text-2xl">{plan.name}</h3>

              {/* Description */}
              <p
                className={`
                  mt-2
                  min-h-13
                  text-sm
                  leading-5
                  ${isPlus ? "text-white/75" : "text-[#6B7280]"}
                `}
              >
                {plan.description}
              </p>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-[-0.04em] sm:text-[42px]">
                  {plan.price}
                </span>

                <span
                  className={`
                    text-xs
                    ${isPlus ? "text-white/80" : "text-[#6B7280]"}
                  `}
                >
                  USD / Month
                </span>
              </div>

              {/* Select button */}
              <button
                type="button"
                onClick={() => onSelectPlan(plan.id)}
                className={`
                  mt-5
                  h-11
                  w-full
                  rounded-full
                  border
                  px-4
                  text-sm
                  font-medium
                  transition
                  ${
                    isPlus
                      ? "border-white bg-white text-[#111827] hover:bg-white/90"
                      : isSelected
                        ? "border-[#0047AB] bg-[#0047AB] text-white"
                        : "border-[#D1D5DB] bg-white text-[#202938] hover:border-[#0047AB]"
                  }
                `}
              >
                {plan.buttonText}
              </button>

              {/* Features */}
              <div className="mt-6 space-y-5">
                {plan.features.map((feature, index) => (
                  <div key={`${plan.id}-${index}`}>
                    <div className="flex items-start gap-2">
                      <span
                        className={`
                          mt-0.5
                          text-base
                          leading-none
                          ${isPlus ? "text-white" : "text-[#202938]"}
                        `}
                      >
                        ✓
                      </span>

                      <p className="text-sm font-medium leading-5 sm:text-[15px]">
                        {feature.title}
                      </p>
                    </div>

                    <p
                      className={`
                        ml-6
                        mt-1
                        text-xs
                        leading-5
                        ${isPlus ? "text-white/70" : "text-[#6B7280]"}
                      `}
                    >
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mobile "See all features" */}
              {plan.id === "free" && (
                <button
                  type="button"
                  className="
                    mt-8
                    self-start
                    text-sm
                    font-semibold
                    text-[#0047AB]
                    lg:hidden
                  "
                >
                  See all features
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

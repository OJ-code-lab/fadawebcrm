interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps = 5,
}: ProgressBarProps) {
  return (
    <div
      className="flex w-full items-center gap-2"
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex flex-1 items-center">
            {/* Step indicator */}
            <div
              className={`
                h-1
                w-full
                rounded-full
                transition-colors
                duration-300

                ${isCompleted ? "bg-[#43B75D]" : isCurrent ? "bg-[#2563EB]" : "bg-white"}
              `}
            />
          </div>
        );
      })}
    </div>
  );
}

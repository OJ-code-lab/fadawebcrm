import Image from "next/image";
import BackBtnIcon from "../../src/assets/images/theLeftArrow.png";
import NextBtnIcon from "../../src/assets/images/theRightArrow.png";

interface WizardNavigationProps {
  onBack: () => void;
  onNext: () => void;
  canContinue: boolean;
  isFirstStep?: boolean;
  alignRight?: boolean;
  alignLeft?: boolean;
  nextLabel?: string;
  backLabel?: string;
  alignNone?: boolean;
}

export default function WizardNavigation({
  onBack,
  onNext,
  canContinue,
  alignRight = false,
  alignLeft = false,
  alignNone = false,
  //   isFirstStep = false,
  nextLabel = "NEXT",
  backLabel = "BACK",
}: WizardNavigationProps) {
  if (alignNone) {
    return null;
  }

  return (
    <div
      className={`mt-8 flex w-full items-center gap-5 ${
        alignRight
          ? "justify-end ml-[-2%]"
          : alignLeft
            ? "justify-start ml-[-2%]"
            : "justify-center"
      }`}
    >
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        // disabled={isFirstStep}
        className="
          min-w-37
          lg:max-w-fit
          lg:min-w-62
            rounded-[30px]        
          bg-[#ebb02671]
          px-5
          py-4
          text-sm
          font-semibold
          text-[#344054]
          transition
          duration-200
          hover:bg-[#F8F9FA]
          disabled:cursor-not-allowed
          disabled:border-transparent
          disabled:bg-transparent
          disabled:text-transparent
          sm:px-6
        "
      >
        <Image
          src={BackBtnIcon}
          alt="Back"
          width={16}
          height={16}
          className="mr-2 inline-block"
        />
        {backLabel}
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={onNext}
        disabled={!canContinue}
        className="
            min-w-37
            lg:max-w-fit
          lg:min-w-62
          rounded-[30px]
          bg-[#0047AB]
          px-5
          py-4
          text-sm
          font-semibold
          text-white
          transition
          duration-200
          hover:bg-[#0047AB]
          disabled:cursor-not-allowed
          disabled:bg-[#a3a3a3]
          disabled:text-white
          sm:px-6
        "
      >
        {nextLabel}
        <Image
          src={NextBtnIcon}
          alt="Next"
          width={16}
          height={16}
          className="ml-2 inline-block"
        />
      </button>
    </div>
  );
}

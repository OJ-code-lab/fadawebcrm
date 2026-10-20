import { BusinessDetails, BusinessListItem } from "@/src/types/businessTypes";
import BusinessDropdown from "./BusinessDropdown";
// import { cookies } from "next/headers";
// import { apiFetch } from "@/lib/api";
import { MobileMenu } from "./mobileMenu";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface HeaderProps {
  userName?: string;
  currentBusiness?: BusinessDetails;
  businesses?: BusinessListItem[];
  className?: string;
}

export default async function MobileHeaders({
  currentBusiness,
  businesses = [],
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "flex justify-between gap-6 items-center bg-white",
        className,
      )}
    >
      <div>
        <MobileMenu />
      </div>

      <div className="px-4 py-3 font-bold text-lg text-gray-800 tracking-wide">
        <Image
          src="/img/Fadawebs.png"
          alt="company logo"
          width={120}
          height={40}
          loading="eager"
          className="h-auto max-w-full"
        />
      </div>

      {/* Passing props down to the child dropdown */}
      <BusinessDropdown
        currentBusiness={currentBusiness}
        businesses={businesses}
        showBusinessName={false}
      />
    </header>
  );
}

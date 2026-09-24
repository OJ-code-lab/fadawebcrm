// import AddBusiness from "./AddBusiness";

// function Headers() {
//   return (
//     <div className="flex justify-between gap-4">
//       <div className="font-bold text-2xl">
//         Hello <span>UserName</span>
//       </div>
//       <div className="flex gap-2 font-semibold text-base">
//         <AddBusiness />
//       </div>
//     </div>
//   );
// }

// export default Headers;

// components/Header.tsx
// import BusinessDropdown from '@/components/BusinessDropdown';
// import { BusinessListItem, BusinessDetails } from '@/lib/business-api';
// import { BusinessListItem, BusinessDetails } from '@/src/app/api/business-details/route';
import { BusinessDetails, BusinessListItem } from "@/src/types/businessTypes";
import BusinessDropdown from "./BusinessDropdown";

interface HeaderProps {
  userName: string;
  currentBusiness: BusinessDetails;
  businesses: BusinessListItem[];
}

export default function Headers({
  userName,
  currentBusiness,
  businesses,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-6 bg-white">
      <h1 className="text-2xl font-bold ">Hello {userName}</h1>

      {/* Passing props down to the child dropdown */}
      <BusinessDropdown
        currentBusiness={currentBusiness}
        businesses={businesses}
      />
    </header>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  ReceiptText,
  ShoppingBag,
  Settings,
  Gift,
  LogOut,
} from "lucide-react";
// function Navbar() {
//   const pathname = usePathname();
//   return (
//     <nav className="flex flex-col gap-8 bg-transparent">
//       <div className="px-4">
//         <Link href="/">LOGO</Link>
//       </div>

//       <div className="flex flex-col gap-12 *:text-light-black font-normal text-[16px]">
//         <div className="flex flex-col gap-2 ">
//           <Link
//             href="/nigeria-dash-board"
//             className={`border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white ${pathname === "/nigeria-dashboard" ? "bg-blue-card text-white" : ""} `}
//           >
//             <span></span> <span>Dashboard</span>
//           </Link>
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
//           >
//             <span></span> <span>Company</span>
//           </Link>
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
//           >
//             <span></span> <span>Services</span>
//           </Link>
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
//           >
//             <span></span> <span>Tax Compliance </span>
//           </Link>
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
//           >
//             <span></span> <span>My Order</span>
//           </Link>
//         </div>

//         <div className="border-t flex flex-col gap-2 py-3">
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
//           >
//             <span></span> <span>Setting</span>
//           </Link>
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] hover:bg-blue-card hover:text-white "
//           >
//             <span></span> <span>Refer & Earn </span>
//           </Link>
//           <Link
//             href="/"
//             className="border py-2.5 px-4 rounded-[8px] text-red-600 hover:bg-blue-card "
//           >
//             <span></span> <span> Logout</span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

const mainLinks = [
  {
    name: "Dashboard",
    href: "/nigeria/nigeria-dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Company",
    href: "/nigeria/company",
    icon: Building2,
  },
  {
    name: "Services",
    href: "/service",
    icon: BriefcaseBusiness,
  },
  {
    name: "Tax Compliance",
    href: "tax",
    icon: ReceiptText,
  },
  {
    name: "My Order",
    href: "order",
    icon: ShoppingBag,
  },
];

const bottomLinks = [
  {
    name: "Settings",
    href: "settings",
    icon: Settings,
  },
  {
    name: "Refer & Earn",
    href: "refer",
    icon: Gift,
  },
  {
    name: "Logout",
    href: "logout",
    icon: LogOut,
  },
];

function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-row gap-2 bg-transparent lg:flex-col lg:gap-8">
      <div className="hidden px-4 lg:block">
        <Link href="/">LOGO</Link>
      </div>

      <div className="flex min-w-0 flex-1 flex-row gap-2 overflow-x-auto font-normal text-xs lg:text-base *:text-light-black lg:flex-col lg:gap-12 lg:overflow-visible">
        <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-[8px] px-3 py-2.5 transition-all duration-400 ease-in-out hover:bg-blue-card hover:text-white lg:px-4 ${
                pathname === link.href ? "bg-blue-card text-white" : ""
              }`}
            >
              <div className="flex gap-2 justify-start items-center">
                <span>
                  <link.icon size={20} />
                </span>
                <span>{link.name}</span>
              </div>
            </Link>
          ))}
        </div>
        {/* Bottom Links */}
        <div className="flex shrink-0 flex-row gap-2 border-l py-0 pl-2 lg:flex-col lg:gap-2 lg:border-l-0 lg:border-t lg:py-3 lg:pl-0">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.name === "Refer & Earn" || link.name === "Logout"
                  ? "hidden lg:block"
                  : ""
              } 
              ${link.name === "Logout" || link.icon === LogOut ? "text-red-500" : ""} whitespace-nowrap rounded-[8px] px-3 py-2.5 transition-all duration-400 ease hover:bg-blue-card hover:text-white lg:px-4 ${
                pathname === link.href ? "bg-blue-card text-white" : ""
              }`}
            >
              <div className="flex gap-2 justify-start items-center">
                <span>
                  <link.icon size={20} />
                </span>
                <span>{link.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

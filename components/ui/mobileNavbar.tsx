"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { House, Search, ChartPie, CircleUserRound, Clock4, Building, Layou, BuildingtDashboard } from "lucide-react";
import {
  LayoutDashboard,
  Building,
  Clock4,
  Briefcase,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrdersDrawer } from "@/src/app/@context/my_order_context";

interface NavbarProps {
  className?: string;
  country: "nigeria" | "usa";
}
function MobileNavbar({ className, country }: NavbarProps) {
  const pathname = usePathname();
  const { isOrdersOpen, openOrders } = useOrdersDrawer();
  const dashboardPath = `/${country}/${country === "nigeria" ? "nigeria-dashboard" : "usa-dashboard"}`;
  return (
    <nav className={cn("flex flex-col bg-transparent", className)}>
      <div className="flex flex-col gap-4 py-2 px-4 *:text-light-black font-normal text-xs">
        <div className="flex justify-around gap-2 ">
          <Link
            href={dashboardPath}
            className={`  flex flex-col gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] ${pathname === "/nigeria-dashboard" ? " text-white" : ""} `}
          >
            <span>
              {" "}
              <LayoutDashboard size={26} />{" "}
            </span>{" "}
            <span>Home</span>
          </Link>
          <Link
            href={`${dashboardPath}/company`}
            className=" flex flex-col gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] "
          >
            <span>
              {" "}
              <Building size={26} />{" "}
            </span>{" "}
            <span>Company</span>
          </Link>
          <Link
            href={`${dashboardPath}/services`}
            className=" flex flex-col  gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] "
          >
            <span>
              {" "}
              <Briefcase size={26} />{" "}
            </span>{" "}
            <span>Services</span>
          </Link>
          {/* <Link
            href="/"
            className=" flex flex-col  gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] "
          >
            <span></span> <span>Tax Compliance </span>
          </Link> */}
          <button
            onClick={openOrders}
            // className={cn(
            //   "flex flex-col  gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] transition-colors w-full",
            //   isOrdersOpen
            //     ? " text-[#6610F2] "
            //     : "text-light-black",
            // )}
            className={` flex flex-col  gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] "
              ${isOrdersOpen ? " text-[#6610F2] " : "text-light-black"}
            `}
          >
            <span>
              {" "}
              <Clock4 size={26} />
            </span>
            <span>My Orders</span>
          </button>
          <Link
            href={`${dashboardPath}/settings`}
            className=" flex flex-col  gap-1.5 justify-center items-center px-0.5 rounded-[8px]  hover:text-[#6610F2] "
          >
            <span>
              {" "}
              <Settings size={26} />{" "}
            </span>{" "}
            <span>Setting</span>
          </Link>
        </div>

        {/* <div className="border-t flex flex-col gap-2 py-3">
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px]  hover:text-white "
          >
            <span></span> <span>Setting</span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px]  hover:text-white "
          >
            <span></span> <span>Refer & Earn </span>
          </Link>
          <Link
            href="/"
            className="border py-2.5 px-4 rounded-[8px] text-red-600 hover:bg-blue-card "
          >
            <span></span> <span> Logout</span>
          </Link>
        </div> */}
      </div>
    </nav>
  );
}

// interface NavbarProps {
//   className?: string;
// }

// const mainLinks = [
//   {
//     name: "Home",
//     href: "/nigeria/nigeria-dashboard",
//     icon: House,
//   },
//   {
//     name: "Company",
//     href: "/nigeria/company",
//     icon: Search,
//   },
//   {
//     name: "Services",
//     href: "/nigeria/services",
//     icon: ChartPie,
//   },
//   {
//     name: "Settings",
//     href: "settings",
//     icon: CircleUserRound,
//   },
// ];

// function MobileNavbar({ className }: NavbarProps) {
//   const pathname = usePathname();
//   const { isOrdersOpen, openOrders } = useOrdersDrawer();
//   return (
//     <nav
//       className={cn(
//         "flex flex-row gap-2 bg-transparent lg:flex-col lg:gap-8 justify-center items-center",
//         className,
//       )}
//     >
//       <div className="flex min-w-0 flex-1 flex-row gap-2 font-normal text-xs *:text-light-black">
//         <div className="flex shrink-0 flex-row gap-2 items-center justify-center">
//           {mainLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`whitespace-nowrap rounded-[8px] px-3 py-2.5 transition-all duration-400 ease-in-out hover:text-[#6610F2]  lg:px-4 ${
//                 pathname === link.href ? "text-[#6610F2] " : ""
//               }`}
//             >
//               <div className="flex flex-col gap-2 justify-start items-center">
//                 <span>
//                   <link.icon size={10} />
//                 </span>
//                 <span>{link.name}</span>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div>
//           <button
//             onClick={openOrders}
//             className={cn(
//               "flex flex-col lg:flex-row items-center bg-transparent gap-3 px-4 py-3 rounded-lg text-xs lg:text-sm font-medium transition-colors w-full",
//               isOrdersOpen
//                 ? " text-[#6610F2] "
//                 : "text-light-black hover:text-[#6610F2]",
//             )}
//           >
//             <Clock4 size={15} />
//             My Orders
//           </button>
//         </div>
//         {/* Bottom Links */}
//         {/* <div className="flex shrink-0 flex-row gap-2 border-l py-0 pl-2 lg:flex-col lg:mt-12 lg:gap-2 lg:border-l-0 lg:border-t lg:py-3 lg:pl-0">
//           {bottomLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`${
//                 link.name === "Refer & Earn" || link.name === "Logout"
//                   ? "hidden lg:block"
//                   : ""
//               }
//               ${link.name === "Logout" || link.icon === LogOut ? "text-red-500" : ""} whitespace-nowrap rounded-[8px] px-3 py-2.5 transition-all duration-400 ease hover:bg-blue-card hover:text-white lg:px-4 ${
//                 pathname === link.href ? "bg-blue-card text-white" : ""
//               }`}
//             >
//               <div className="flex gap-2 justify-start items-center">
//                 <span>
//                   <link.icon size={20} />
//                 </span>
//                 <span>{link.name}</span>
//               </div>
//             </Link>
//           ))}
//         </div> */}
//       </div>
//     </nav>
//   );
// }

export default MobileNavbar;

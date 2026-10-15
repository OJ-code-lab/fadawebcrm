"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { House, Search, ChartPie, CircleUserRound, Clock4, Building, Layou, BuildingtDashboard } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Settings,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrdersDrawer } from "@/src/app/@context/my_order_context";

interface NavbarProps {
  className?: string;
  country: "nigeria" | "usa";
}

function MobileNavbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const { isOrdersOpen, openOrders } = useOrdersDrawer();
  const isActive = (path: string) => pathname === path;

  // Main top section
  const mainNavItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    { label: "Company", href: "/dashboard/company", icon: Building2 },
    {
      label: "Services",
      href: "/dashboard/services",
      icon: BriefcaseBusiness,
    },
    { label: "Orders", href: "/dashboard/my-orders", icon: Package },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <nav className={cn("flex flex-col bg-transparent", className)}>
      <div className="w-full py-2 px-1 *:text-light-black font-normal text-xs">
        <div className="flex w-full items-center">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            if (item.href === "/dashboard/my-orders") {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={openOrders}
                  className={`flex flex-1 flex-col items-center justify-center rounded-lg px-1 py-2.5 font-medium transition ${
                    isOrdersOpen
                      ? "bg-blue-card text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <span className="flex flex-col items-center justify-center">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-1 items-center justify-center rounded-lg px-1 py-2.5 font-medium transition ${
                  active
                    ? "bg-blue-card text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="flex flex-col justify-center items-center">
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MobileNavbar;

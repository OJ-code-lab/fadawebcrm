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
  businessId?: string;
}

function MobileNavbar({ className, businessId }: NavbarProps) {
  const pathname = usePathname();
  const { isOrdersOpen, openOrders } = useOrdersDrawer();
  const isActive = (path: string) => pathname === path;

  // Main top section
  const mainNavItems = [
    {
      label: "Dashboard",
      href: `/${businessId}/dashboard`,
      icon: LayoutDashboard,
    },
    { label: "Company", href: `/${businessId}/company`, icon: Building2 },
    {
      label: "Services",
      href: `/${businessId}/services`,
      icon: BriefcaseBusiness,
    },
    { label: "My Orders", href: `/${businessId}/my-orders`, icon: Package },
    { label: "Settings", href: `/${businessId}/settings`, icon: Settings },
  ];

  return (
    <nav className={cn("flex flex-col bg-transparent", className)}>
      <div className="py-2 px-4 *:text-light-black font-normal text-xs">
        <div className="flex gap-4 justify-center items-center">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            if (item.label === "My Orders") {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={openOrders}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left font-medium transition ${
                    isOrdersOpen
                      ? "bg-blue-card text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition ${
                  active
                    ? "bg-blue-card text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default MobileNavbar;

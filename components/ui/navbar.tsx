"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  ReceiptText,
  Settings,
  Gift,
  LogOut,
  Package,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOrdersDrawer } from "@/src/app/@context/my_order_context";

interface NavbarProps {
  className?: string;
  country: "nigeria" | "usa";
  businessId?: string;
}

export default function Sidebar({ className, businessId }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
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
    {
      label: "Tax Compliance",
      href: `/${businessId}/tax-compliance`,
      icon: ReceiptText,
      isLocked: true,
    },
    { label: "My Orders", href: `/${businessId}/my-orders`, icon: Package },
  ];

  //  bottom section
  const secondaryNavItems = [
    { label: "Settings", href: `/${businessId}/settings`, icon: Settings },
    {
      label: "Refer & Earn",
      href: `/${businessId}/refer-and-earn`,
      icon: Gift,
      isLocked: true,
    },
  ];

  async function handleLogout() {
    router.push("/");
  }

  return (
    <nav
      className={cn(
        "flex flex-row gap-2 bg-transparent lg:flex-col lg:gap-18",
        className,
      )}
    >
      <div>
        <div className="px-4 py-3 font-bold text-lg text-gray-800 tracking-wide">
          LOGO
        </div>

        {/* Top Navigation List */}
        <div className="mt-4 space-y-1">
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
                href={item.isLocked ? "#" : item.href}
                tabIndex={item.isLocked ? -1 : undefined}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition",
                  active
                    ? "bg-blue-card text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  item.isLocked &&
                    "pointer-events-none cursor-not-allowed opacity-50 hover:bg-transparent",
                )}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
                {item.isLocked && <Lock size={14} className="text-gray-400" />}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation & Logout */}
      <div className="space-y-1 border-t border-gray-100 pt-4">
        {secondaryNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              href={item.isLocked ? "#" : item.href}
              tabIndex={item.isLocked ? -1 : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition",
                active
                  ? "bg-blue-card text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                item.isLocked &&
                  "pointer-events-none cursor-not-allowed opacity-50 hover:bg-transparent",
              )}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
              {item.isLocked && <Lock size={14} className="text-gray-400" />}
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-red-500 hover:bg-red-50 transition text-left"
        >
          <span>
            <LogOut size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

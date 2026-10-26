"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BriefcaseBusiness,
  Building2,
  Gift,
  LayoutDashboard,
  Lock,
  LogOut,
  Package,
  ReceiptText,
  Settings,
  TextAlignJustify,
} from "lucide-react";
import { useOrdersDrawer } from "@/src/app/@context/my_order_context";

export function MobileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { isOrdersOpen, openOrders } = useOrdersDrawer();
  const [isOpen, setIsOpen] = useState(false);

  const mainNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Company", href: "/dashboard/company", icon: Building2 },
    { label: "Services", href: "/dashboard/services", icon: BriefcaseBusiness },
    {
      label: "Tax Compliance",
      href: "/dashboard/tax-compliance",
      icon: ReceiptText,
      isLocked: true,
    },
    { label: "My Orders", href: "/dashboard/my-orders", icon: Package },
  ];

  const secondaryNavItems = [
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
    {
      label: "Refer & Earn",
      href: "/dashboard/refer-and-earn",
      icon: Gift,
      isLocked: true,
    },
  ];

  const itemClass = (active: boolean, isLocked = false) =>
    `flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition ${
      isLocked
        ? "cursor-not-allowed text-gray-400 opacity-60"
        : active
          ? "bg-blue-card text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className="flex flex-wrap gap-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <button type="button" aria-label="Open navigation menu">
              <TextAlignJustify size={25} />
            </button>
          }
        />
        <SheetContent
          side="left"
          className="w-4/5 max-w-sm"
        >
          <SheetHeader className="border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-4">
            {mainNavItems.map((item) => {
              const active =
                item.href === "/dashboard/my-orders"
                  ? isOrdersOpen
                  : pathname === item.href;
              const contents = (
                <>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {item.isLocked && (
                    <Lock size={14} className="ml-auto text-gray-400" />
                  )}
                </>
              );

              if (item.href === "/dashboard/my-orders") {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      openOrders();
                      setIsOpen(false);
                    }}
                    className={itemClass(active)}
                  >
                    {contents}
                  </button>
                );
              }

              if (item.isLocked) {
                return (
                  <div
                    key={item.label}
                    aria-disabled="true"
                    className={itemClass(false, true)}
                  >
                    {contents}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={itemClass(active)}
                >
                  {contents}
                </Link>
              );
            })}

            <div className="my-3 border-t border-gray-200" />

            {secondaryNavItems.map((item) => {
              const active = pathname === item.href;
              const contents = (
                <>
                  <item.icon size={18} />
                  <span>{item.label}</span>
                  {item.isLocked && (
                    <Lock size={14} className="ml-auto text-gray-400" />
                  )}
                </>
              );

              return item.isLocked ? (
                <div
                  key={item.label}
                  aria-disabled="true"
                  className={itemClass(false, true)}
                >
                  {contents}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={itemClass(active)}
                >
                  {contents}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push("/");
              }}
              className="mt-auto flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-red-500 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

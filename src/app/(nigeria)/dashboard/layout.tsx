import Headers from "@/components/ui/headers";
import Navbar from "@/components/ui/navbar";
import MobileNavbar from "@/components/ui/mobileNavbar";
import MyOrder from "@/components/ui/my_order";
import { OrdersDrawerProvider } from "../../@context/my_order_context";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  getAllOrders,
  getBusinessDetails,
} from "../../business-details/businessDetails";
import { getActiveBusinessContext } from "@/lib/business";
import MobileHeaders from "@/components/ui/mobileHeader";
// import { apiFetch } from "@/lib/api";

// import {
//   getAllBusinesses,
//   getAllOrders,
//   getBusinessDetails,
// } from "@/src/app/api/business-details/route";

interface LayoutProps {
  children: React.ReactNode;
  userName?: string;
}

export default async function DashboardLayout({
  children,
  userName = "User",
}: LayoutProps) {
  const [cookieStore, activeBusiness] = await Promise.all([
    cookies(),
    getActiveBusinessContext(),
  ]);
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/auth/sign-in");
  }

  const { businessId, businesses } = activeBusiness;

  if (!businessId) {
    redirect("/business/new");
  }

  const [currentBusiness, orders] = await Promise.all([
    getBusinessDetails(businessId),
    getAllOrders(),
  ]);

  if (
    !currentBusiness ||
    !businesses.some((business) => business.id === businessId)
  ) {
    notFound();
  }

  return (
    <OrdersDrawerProvider>
      <div className="h-dvh min-h-0 w-full max-w-8xl mx-auto flex flex-col justify-center overflow-hidden lg:h-auto lg:min-h-screen lg:overflow-visible lg:px-16 lg:py-1">
        <div className="grid h-full min-h-0 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] lg:h-auto lg:grid-cols-[208px_3fr] lg:grid-rows-[auto_1fr] lg:gap-10">
          <aside className="order-3 fixed inset-x-0 bottom-0 z-50 bg-primary p-2 lg:order-0 lg:sticky lg:top-6 lg:self-start lg:row-span-2 lg:max-h-163.5 lg:flex lg:flex-col lg:justify-between lg:gap-8 lg:rounded-[12px] lg:pt-12 lg:pb-8 lg:pl-4 lg:pr-2 lg:mt-6">
            {" "}
            <Navbar className="hidden lg:block" country="nigeria" />
            <MobileNavbar
              className="lg:hidden flex flex-col justify-center items-center  "
              country="nigeria"
            />
          </aside>
          <header className="sticky top-0 z-50 order-1 w-full lg:rounded-[12px] border border-primary bg-primary p-2 lg:static lg:order-0 lg:mt-6 lg:p-4">
            {" "}
            <Headers
              userName={userName}
              currentBusiness={currentBusiness}
              businesses={businesses}
              className="hidden lg:flex"
            />{" "}
            <MobileHeaders
              // userName={userName}
              currentBusiness={currentBusiness}
              businesses={businesses}
              className="lg:hidden"
            />
          </header>
          <main className="order-2 min-h-0 overflow-hidden rounded-[12px] bg-primary mx-4 lg:mx-0 p-6 mb-10 pb-8 mt-4 lg:mt-0 lg:order-0 lg:h-auto lg:min-h-0 lg:overflow-visible lg:px-8 lg:py-6 lg:pb-6">
            {children}
          </main>
        </div>
        <MyOrder orders={orders} />
      </div>
    </OrdersDrawerProvider>
  );
}

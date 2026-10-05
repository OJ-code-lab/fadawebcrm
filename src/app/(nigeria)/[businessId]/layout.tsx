import Headers from "@/components/ui/headers";
import Navbar from "@/components/ui/navbar";
import MobileNavbar from "@/components/ui/mobileNavbar";
import MyOrder from "@/components/ui/my_order";
import { OrdersDrawerProvider } from "../../@context/my_order_context";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  getAllBusinesses,
  getAllOrders,
  getBusinessDetails,
} from "../../business-details/businessDetails";

// import {
//   getAllBusinesses,
//   getAllOrders,
//   getBusinessDetails,
// } from "@/src/app/api/business-details/route";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ businessId: string }>;
  userName?: string;
}

export default async function DashboardLayout({
  children,
  params,
  userName = "User",
}: LayoutProps) {
  const { businessId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    redirect("/");
  }

  // Parallel data fetching on the server
  const [currentBusiness, userBusinesses, orders] = await Promise.all([
    getBusinessDetails(businessId),
    getAllBusinesses(),
    getAllOrders(),
  ]);

  if (!currentBusiness) {
    notFound();
  }

  return (
    <OrdersDrawerProvider>
      <div className="min-h-screen w-full max-w-8xl mx-auto lg:px-16 lg:py-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[208px_3fr] lg:grid-rows-[auto_1fr] lg:gap-10">
          <aside className="order-3 fixed inset-x-0 bottom-0 z-50 bg-primary p-2 lg:order-0 lg:sticky lg:top-6 lg:self-start lg:row-span-2 lg:max-h-163.5 lg:flex lg:flex-col lg:justify-between lg:gap-8 lg:rounded-[12px] lg:pt-18.25 lg:pb-8 lg:pl-4 lg:pr-2 lg:mt-6">
            {" "}
            <Navbar
              className="hidden lg:block"
              country="nigeria"
              businessId={businessId}
            />
            <MobileNavbar
              className="lg:hidden"
              country="nigeria"
              businessId={businessId}
            />
          </aside>
          <header className="order-1 lg:mt-6 rounded-[12px] border border-primary bg-primary p-6 lg:order-0">
            {" "}
            <Headers
              userName={userName}
              currentBusiness={currentBusiness}
              businesses={userBusinesses}
            />{" "}
          </header>
          <main className="order-2 rounded-[12px] bg-primary mx-4 lg:mx-0 p-6  lg:px-8 lg:py-6 pb-24 mt-8 lg:mt-0 lg:order-0 lg:pb-6">
            {children}
          </main>
        </div>
        <MyOrder orders={orders} />
      </div>
    </OrdersDrawerProvider>
  );
}

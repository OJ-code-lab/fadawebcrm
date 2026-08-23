import Headers from "@/components/ui/headers";
import Navbar from "@/components/ui/navbar";
import MyOrder from "@/components/ui/my_order";
import { OrdersDrawerProvider } from "@/src/app/nigeria/@context/my_order_context";

export default function DashLayout({ children }: LayoutProps<"/">) {
  return (
    <OrdersDrawerProvider>
      <div className="min-h-screen w-full max-w-8xl mx-auto lg:px-16 lg:py-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-[208px_3fr] lg:grid-rows-[auto_1fr] lg:gap-10">
          <aside className="order-3 fixed inset-x-0 bottom-0 z-50 bg-primary p-2 lg:order-0 lg:sticky lg:top-6 lg:self-start lg:row-span-2 lg:max-h-163.5 lg:flex lg:flex-col lg:justify-between lg:rounded-[12px] lg:pt-18.25 lg:pb-8 lg:pl-4 lg:pr-2">
            {" "}
            <Navbar />{" "}
          </aside>
          <header className="order-1 lg:mt-6 rounded-[12px] border border-primary bg-primary p-6 lg:order-0">
            {" "}
            <Headers />{" "}
          </header>
          <main className="order-2 rounded-[12px] bg-primary mx-4 lg:mx-0  px-8 py-6 pb-24 mt-8 lg:mt-0 lg:order-0 lg:pb-6">
            {children}
          </main>
        </div>
      </div>
      <MyOrder />
    </OrdersDrawerProvider>
  );
}

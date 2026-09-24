"use client";

import { CircleDollarSign, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import Image from "next/image";
import { Card } from "./card";
import { useOrdersDrawer } from "@/src/app/@context/my_order_context";
import { Orderlist } from "@/src/types/businessTypes";

// const documents = [];

interface MyOrderProps {
  orders: Orderlist[];
}
function MyOrder({ orders }: MyOrderProps) {
  const { isOrdersOpen, setIsOrdersOpen } = useOrdersDrawer();

  return (
    <Drawer open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
      <DrawerContent className="flex flex-col p-6 h-dvh w-full max-h-dvh rounded-none lg:max-w-120 lg:rounded-l-[12px] lg:rounded-r-none ">
        <DrawerHeader className="flex flex-row items-center justify-between mt-8">
          <DrawerTitle>My Order</DrawerTitle>
          <DrawerClose>
            <X size={25} />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col gap-6 mt-8 px-4 overflow-y-auto flex-1 min-h-0">
          {orders.length === 0 ? (
            <div className="mt-8">
              <div>
                <Image
                  src="/img/undraw_file-searching_yska.png"
                  alt="A person searching through a folder"
                  width={160}
                  height={120}
                  className="mx-auto"
                />
              </div>
              <div className="text-center space-y-4 mt-4">
                <p className="font-medium text-xl text-gray-700">
                  No documents available
                </p>
                <p className="font-medium text-base text-light-black">
                  There are no documents available in this category. As
                  documents are added to this section, they will appear here.
                </p>
              </div>
            </div>
          ) : (
            orders.map((order) => (
              <Card
                key={order.id}
                className="flex-row items-center justify-between gap-8 py-8 px-4 bg-gray-200/20"
              >
                <div className="flex gap-4 items-center bg">
                  <span className="shrink-0">
                    <CircleDollarSign className="text-black" size={20} />
                  </span>
                  <span className="font-medium text-base text-black">
                    {order.name}
                  </span>
                </div>
                <span className="text-green-500/90 bg-green-100/60 px-2 py-0.5 rounded-3xl text-sm font-medium">
                  {order.status}
                </span>
              </Card>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MyOrder;

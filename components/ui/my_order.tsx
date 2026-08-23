"use client";

import { CircleDollarSign, Download, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import Image from "next/image";
import { Card } from "./card";
import { useOrdersDrawer } from "@/src/app/nigeria/@context/my_order_context";
// import { useOrdersDrawer } from "@/context/orders-drawer-context";

const documents = [
  {
    id: "order-1",
    name: "Logo Design",
    type: "PDF",
    createdAt: "2026-01-15",
  },
  {
    id: "order-2",
    name: "Logo Design",
    type: "PDF",
    createdAt: "2026-01-15",
  },
  {
    id: "order-3",
    name: "Logo Design",
    type: "PDF",
    createdAt: "2026-01-15",
  },
  {
    id: "order-4",
    name: "Logo Design",
    type: "PDF",
    createdAt: "2026-01-15",
  },
];

function MyOrder() {
  const { isOrdersOpen, setIsOrdersOpen } = useOrdersDrawer();

  return (
    <Drawer open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
      <DrawerContent className="p-6">
        <DrawerHeader className="flex flex-row items-center justify-between mt-8">
          <DrawerTitle>My Order</DrawerTitle>
          <DrawerClose>
            <X size={25} />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col gap-4 mt-8 px-4">
          {documents.length === 0 ? (
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
            documents.map((document) => (
              <Card
                key={document.id}
                className="flex-row items-center justify-between gap-8 px-4"
              >
                <div className="flex gap-4 items-center">
                  <span className="shrink-0">
                    <CircleDollarSign className="text-light-black" size={20} />
                  </span>
                  <span className="font-medium text-base">{document.name}</span>
                </div>
                <span className="text-green-500/90 bg-green-100/60 px-2 py-0.5 rounded-3xl text-sm font-medium">
                  successful
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

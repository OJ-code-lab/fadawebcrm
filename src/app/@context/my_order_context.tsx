"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type OrdersDrawerContextType = {
  isOrdersOpen: boolean;
  openOrders: () => void;
  closeOrders: () => void;
  setIsOrdersOpen: (open: boolean) => void;
};

const OrdersDrawerContext = createContext<OrdersDrawerContextType | undefined>(
  undefined,
);

export function OrdersDrawerProvider({ children }: { children: ReactNode }) {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  const openOrders = () => setIsOrdersOpen(true);
  const closeOrders = () => setIsOrdersOpen(false);

  return (
    <OrdersDrawerContext.Provider
      value={{ isOrdersOpen, openOrders, closeOrders, setIsOrdersOpen }}
    >
      {children}
    </OrdersDrawerContext.Provider>
  );
}

export function useOrdersDrawer() {
  const context = useContext(OrdersDrawerContext);
  if (!context) {
    throw new Error(
      "useOrdersDrawer must be used within an OrdersDrawerProvider",
    );
  }
  return context;
}

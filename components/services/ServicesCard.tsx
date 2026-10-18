"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ServicesOffer } from "@/src/types/businessTypes";
import Image from "next/image";

interface ServiceProps {
  services: ServicesOffer[];
  onBuy: (id: string) => void;
}

export default function ServicesCard({ services, onBuy }: ServiceProps) {
  if (!services || services.length === 0) {
    return (
      <div className="mt-8">
        <Image
          src="/img/undraw_file-searching_yska.png"
          alt="A person searching through a folder"
          width={160}
          height={120}
          className="mx-auto"
        />
        <div className="text-center space-y-4 mt-4">
          <p className="font-medium text-xl text-gray-700">
            No services available
          </p>
          <p className="font-medium text-base text-light-black">
            There are no services available in this category. As services are
            added to this section, they will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {services.map((service) => (
        <Card
          key={service.id}
          className="px-8 py-6 flex flex-col justify-between"
        >
          <div>
            <CardHeader className="font-semibold text-xl text-black p-0 mb-4">
              {service.name}
            </CardHeader>
            <div
              className="font-normal text-sm text-light-black mb-6"
              dangerouslySetInnerHTML={{
                __html: service.description
                  ? service.description.slice(0, 100) + " ..."
                  : "",
              }}
            />
          </div>

          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:justify-between lg:items-center mt-4">
            <div className="flex gap-4 items-center">
              <p className="font-bold text-3xl text-black">
                {service.price?.formatted}
              </p>
              <span className="font-medium text-sm text-light-black">
                {service.price?.base}
              </span>
            </div>

            <Button
              onClick={() => onBuy(service.id)}
              className="bg-blue-card text-sm text-white hover:bg-blue-900 rounded-3xl w-full lg:w-auto"
            >
              Buy now
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
